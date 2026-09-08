import assert from 'node:assert/strict';
import { test } from 'node:test';
import { randomUUID } from 'node:crypto';
import { mkdtemp, readdir, readFile, unlink, rmdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { Client } from 'pg';
import { encode } from '@auth/core/jwt';
import sharp from 'sharp';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const prefix = 'DB_RICH_TEXT_V1:';
const content = (url, text = 'Integration post') => prefix + JSON.stringify({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text }] }, ...(url ? [{ type: 'image', attrs: { src: url, alt: 'test' } }] : [])] });

test('post, draft, permission, category and image lifecycle', { timeout: 120000 }, async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'developer-blog-lifecycle-'));
  const admin = new Client({ connectionString: process.env.DATABASE_URL });
  await admin.connect();
  const databaseName = 'developer_blog_test_' + randomUUID().replaceAll('-', '');
  assert.match(databaseName, /^developer_blog_test_[a-f0-9]{32}$/);
  await admin.query('CREATE DATABASE "' + databaseName + '"');
  const databaseUrl = new URL(process.env.DATABASE_URL);
  databaseUrl.pathname = '/' + databaseName;
  const db = new Client({ connectionString: databaseUrl.toString() });
  try {
    await db.connect();
    for (const migration of (await readdir('prisma/migrations')).sort()) {
      if (!/^\d/.test(migration)) continue;
      await db.query(await readFile(path.join('prisma/migrations', migration, 'migration.sql'), 'utf8'));
    }
  } catch (error) {
    await db.end();
    await admin.query('DROP DATABASE "' + databaseName + '" WITH (FORCE)');
    await admin.end();
    await rmdir(directory);
    throw error;
  }
  const owner = randomUUID(), other = randomUUID(), friend = randomUUID();
  const catA = randomUUID(), catB = randomUUID(), divider = randomUUID();
  const secret = randomUUID();
  const authSecret = randomUUID();
  const base = 'http://localhost:3114';
  let log = '';
  const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3114'], { cwd: process.cwd(), windowsHide: true, env: { ...process.env, DATABASE_URL: databaseUrl.toString(), AUTH_SECRET: authSecret, AUTH_URL: base, AUTH_TRUST_HOST: 'true', UPLOAD_DIR: directory, CRON_SECRET: secret }, stdio: ['ignore', 'pipe', 'pipe'] });
  server.stdout.on('data', data => { log += data; }); server.stderr.on('data', data => { log += data; });
  try {
    for (const [id, name] of [[owner, 'LifecycleAuthor'], [other, 'LifecycleOther'], [friend, 'LifecycleFriend']]) await db.query('INSERT INTO "User" (id,name,"updatedAt") VALUES ($1,$2,NOW())', [id, name]);
    await db.query('UPDATE "User" SET image=$1 WHERE id=$2',['https://example.com/lifecycle-avatar.png',owner]);
    await db.query('INSERT INTO "Friendship" (id,"userId","friendId",status) VALUES ($1,$2,$3,\'ACCEPTED\')', [randomUUID(), owner, friend]);
    for (const [id, name, order, isDivider] of [[catA, 'First category', 0, false], [divider, '--', 1, true], [catB, 'Second category', 2, false]]) await db.query('INSERT INTO "Category" (id,name,"order","isDivider","userId","updatedAt") VALUES ($1,$2,$3,$4,$5,NOW())', [id,name,order,isDivider,owner]);
    let ready = false;
    for (let i=0;i<80;i++) { try { if ((await fetch(base+'/login')).status===200) {ready=true;break;} } catch {} await new Promise(resolve=>setTimeout(resolve,200)); }
    assert.ok(ready,'Server failed to start: '+log);
    const cookie = async id => 'authjs.session-token=' + await encode({ token: { id, sub:id, name:'LifecycleUser' }, secret:authSecret, salt:'authjs.session-token', maxAge:3600 });
    const ownerCookie=await cookie(owner), otherCookie=await cookie(other), friendCookie=await cookie(friend);
    const call = async (url, method='GET', body, session=ownerCookie) => {
      const response=await fetch(base+url,{method,headers:{...(session?{cookie:session}:{}),...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});
      return {status:response.status,body:await response.json().catch(()=>null)};
    };
    const bytes=await sharp({create:{width:32,height:24,channels:3,background:'#446699'}}).png().toBuffer();
    const upload=async()=>{ const form=new FormData();form.append('file',new File([bytes],'test.png',{type:'image/png'}));const r=await fetch(base+'/api/images',{method:'POST',headers:{cookie:ownerCookie},body:form});assert.equal(r.status,201,await r.clone().text());return (await r.json()).url; };
    const image=await upload();
    const name=image.split('/').at(-1);
    assert.equal((await fetch(base+image)).status,404,'unpublished image private');
    assert.equal((await fetch(base+image,{headers:{cookie:ownerCookie}})).status,200);
    let draft=await call('/api/drafts','PUT',{key:'new',title:'Draft title',content:content(image),categoryId:catA,visibility:'PRIVATE',version:null});
    assert.equal(draft.status,200,JSON.stringify(draft));
    let version=draft.body.draft.version;
    assert.equal((await call('/api/drafts?key=new')).body.draft.title,'Draft title');
    assert.equal((await call('/api/drafts?key=new','GET',undefined,otherCookie)).body.draft,null);
    assert.equal((await call('/api/drafts','PUT',{key:'new',title:'Stale',content:content(image),categoryId:catA,visibility:'PRIVATE',version:null})).status,409);
    // A live draft protects an image even if its orphan timestamp is stale.
    await db.query('UPDATE "ImageAsset" SET "orphanedAt"=NOW()-INTERVAL \'2 days\' WHERE name=$1',[name]);
    const cleanup=async()=>{const r=await fetch(base+'/api/maintenance/images',{method:'POST',headers:{authorization:'Bearer '+secret}});assert.equal(r.status,200,await r.clone().text());return r.json();};
    await cleanup();
    assert.equal((await fetch(base+image,{headers:{cookie:ownerCookie}})).status,200);
    const published=await call('/api/posts','POST',{title:'Private lifecycle post',content:content(image),categoryId:catA,visibility:'PRIVATE',draftVersion:version});
    assert.equal(published.status,201,JSON.stringify(published));
    let post=published.body.post;
    assert.equal((await call('/api/drafts?key=new')).body.draft,null);
    assert.equal((await fetch(base+'/posts/'+post.id)).status,404);
    assert.equal((await fetch(base+'/posts/'+post.id,{headers:{cookie:ownerCookie}})).status,200);
    assert.equal((await fetch(base+'/posts/'+post.id+'/edit',{headers:{cookie:otherCookie}})).status,404);
    assert.equal((await call('/api/posts/'+post.id,'PATCH',{title:'Tampered'},otherCookie)).status,404);
    let edited=await call('/api/posts/'+post.id,'PATCH',{title:'Friends lifecycle post',content:content(image),categoryId:catB,visibility:'FRIENDS',updatedAt:post.updatedAt});
    assert.equal(edited.status,200,JSON.stringify(edited));post=edited.body.post;
    assert.equal((await fetch(base+'/posts/'+post.id,{headers:{cookie:friendCookie}})).status,200);
    assert.equal((await fetch(base+image,{headers:{cookie:friendCookie}})).status,200);
    assert.equal((await fetch(base+image,{headers:{cookie:otherCookie}})).status,404);
    edited=await call('/api/posts/'+post.id,'PATCH',{title:'Public lifecycle post',content:content(image),categoryId:catB,visibility:'PUBLIC',updatedAt:post.updatedAt});
    assert.equal(edited.status,200);post=edited.body.post;
    assert.equal((await fetch(base+'/posts/'+post.id)).status,200);
    assert.equal((await fetch(base+image)).status,200);
    const blog=await (await fetch(base+'/blog/'+owner+'?category='+catB)).text();
    assert.ok(blog.includes('Public lifecycle post'));
    assert.ok(blog.indexOf('First category')<blog.indexOf('Second category'),'category order retained');
    assert.ok(blog.includes('https://example.com/lifecycle-avatar.png'),'author photo reaches blog');
    const mypage=await (await fetch(base+'/mypage?tab=posts',{headers:{cookie:ownerCookie}})).text();
    assert.ok(mypage.includes('Public lifecycle post'));
    assert.equal((await call('/api/posts','POST',{title:'Reuse',content:content(image),categoryId:null,visibility:'PUBLIC'},otherCookie)).status,400);
    const shared=await call('/api/posts','POST',{title:'Shared image',content:content(image),categoryId:catA,visibility:'PRIVATE'});
    assert.equal(shared.status,201);
    const outlineContent=prefix+JSON.stringify({type:'doc',attrs:{toc:'shown',tocDepth:3},content:[{type:'heading',attrs:{level:2},content:[{type:'text',text:'First heading'}]},{type:'heading',attrs:{level:3},content:[{type:'text',text:'First heading'}]},{type:'heading',attrs:{level:4},content:[{type:'text',text:'Detailed heading'}]}]});
    const outlinePost=await call('/api/posts','POST',{title:'Outline test',content:outlineContent,categoryId:catB,visibility:'PUBLIC'});
    assert.equal(outlinePost.status,201);
    const outlineId=outlinePost.body.post.id;
    const detail=await (await fetch(base+'/posts/'+outlineId)).text();
    assert.ok(detail.includes('https://example.com/lifecycle-avatar.png'));
    assert.ok(detail.includes('id="post-start"'));
    assert.ok(detail.includes('href="#post-'+outlineId+'-section-1"'));
    assert.ok(detail.includes('href="#post-'+outlineId+'-section-2"'));
    assert.ok(!detail.includes('href="#post-'+outlineId+'-section-3"'));
    assert.ok(detail.includes('id="post-'+outlineId+'-section-3"'));
    const embedded=await (await fetch(base+'/mypage?tab=posts&post='+outlineId+'&category='+catB,{headers:{cookie:ownerCookie}})).text();
    assert.ok(embedded.includes('id="post-start"'));
    const hiddenContent=outlineContent.replace('"toc":"shown"','"toc":"hidden"');
    const hidden=await call('/api/posts/'+outlineId,'PATCH',{title:'Outline hidden',content:hiddenContent,categoryId:catB,visibility:'PUBLIC',updatedAt:outlinePost.body.post.updatedAt});
    assert.equal(hidden.status,200);
    const hiddenPage=await (await fetch(base+'/posts/'+outlineId)).text();
    assert.ok(!hiddenPage.includes('aria-label="글 목차"'));
    const draftOutline=await call('/api/drafts','PUT',{key:outlineId,title:'Saved outline',content:hiddenContent,categoryId:catB,visibility:'PUBLIC',version:null});
    assert.equal(draftOutline.status,200);
    assert.equal(JSON.parse((await call('/api/drafts?key='+outlineId)).body.draft.content.slice(prefix.length)).attrs.toc,'hidden');
    await call('/api/posts/'+outlineId,'DELETE');
    const originalDate=post.createdAt;
    edited=await call('/api/posts/'+post.id,'PATCH',{title:'Without image',content:content(null),categoryId:catB,visibility:'PUBLIC',updatedAt:post.updatedAt});
    assert.equal(edited.status,200);post=edited.body.post;assert.equal(post.createdAt,originalDate);
    assert.equal((await db.query('SELECT "orphanedAt" FROM "ImageAsset" WHERE name=$1',[name])).rows[0].orphanedAt,null,'another post keeps shared image');
    assert.equal((await call('/api/posts/'+shared.body.post.id,'DELETE')).status,200);
    assert.ok((await db.query('SELECT "orphanedAt" FROM "ImageAsset" WHERE name=$1',[name])).rows[0].orphanedAt);
    await cleanup();assert.equal((await fetch(base+image,{headers:{cookie:ownerCookie}})).status,200,'24h undo grace');
    // Undo: a new server draft reattaches the removed image and prevents deletion.
    draft=await call('/api/drafts','PUT',{key:post.id,title:post.title,content:content(image),categoryId:catB,visibility:'PUBLIC',version:null});
    assert.equal(draft.status,200);version=draft.body.draft.version;
    assert.equal((await db.query('SELECT "orphanedAt" FROM "ImageAsset" WHERE name=$1',[name])).rows[0].orphanedAt,null);
    const discarded=await call('/api/drafts','DELETE',{key:post.id,version}); assert.equal(discarded.status,200,JSON.stringify(discarded));
    await db.query('UPDATE "ImageAsset" SET "orphanedAt"=NOW()-INTERVAL \'25 hours\' WHERE name=$1',[name]);
    const cleaned=await cleanup();assert.equal(cleaned.deleted,1);assert.equal((await fetch(base+image,{headers:{cookie:ownerCookie}})).status,404);
    assert.equal((await db.query('SELECT name FROM "ImageAsset" WHERE name=$1',[name])).rowCount,0);
    assert.equal((await call('/api/posts/'+post.id,'DELETE',undefined,otherCookie)).status,404);
    assert.equal((await call('/api/posts/'+post.id,'DELETE')).status,200);
    assert.equal((await fetch(base+'/posts/'+post.id)).status,404);
    assert.equal((await fetch(base+'/api/maintenance/images',{method:'POST'})).status,401);
    console.log('PASS: draft restore/conflict, publish/edit/delete, private/friend/public access, category order, my posts, image ownership, undo retention and expiry cleanup');
  } catch (error) {
    console.error(log);
    throw error;
  } finally {
    server.kill();
    if(server.exitCode===null) await Promise.race([once(server,'exit'),new Promise(resolve=>setTimeout(resolve,3000))]);
    await db.query('DELETE FROM "User" WHERE id=ANY($1::text[])',[[owner,other,friend]]);
    await db.end();
    await admin.query('DROP DATABASE "' + databaseName + '" WITH (FORCE)');
    await admin.end();
    for (const name of await readdir(directory)) await unlink(path.join(directory,name));
    await rmdir(directory);
  }
});
