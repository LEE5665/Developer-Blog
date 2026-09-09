import assert from 'node:assert/strict';
import { test } from 'node:test';
import { randomUUID } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { Client } from 'pg';
import { createClient } from 'redis';
import { encode } from '@auth/core/jwt';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

test('friends-only chat and Redis events across two application servers', { timeout: 120000 }, async () => {
  const admin = new Client({ connectionString: process.env.DATABASE_URL });
  await admin.connect();
  const databaseName = 'developer_blog_chat_test_' + randomUUID().replaceAll('-', '');
  assert.match(databaseName, /^developer_blog_chat_test_[a-f0-9]{32}$/);
  await admin.query(`CREATE DATABASE "${databaseName}"`);
  const databaseUrl = new URL(process.env.DATABASE_URL);
  databaseUrl.pathname = '/' + databaseName;
  const db = new Client({ connectionString: databaseUrl.toString() });
  const redis = createClient({ url: process.env.REDIS_URL || 'redis://127.0.0.1:6379', socket: { reconnectStrategy: false } });
  redis.on('error', () => {});
  const servers = [], streams = [];
  const secret = randomUUID(), channelPrefix = 'chat-test-' + randomUUID();
  let log = '';
  try {
    await db.connect(); await redis.connect();
    for (const directory of (await readdir('prisma/migrations')).sort()) if (/^\d/.test(directory)) await db.query(await readFile(`prisma/migrations/${directory}/migration.sql`, 'utf8'));
    const a = randomUUID(), b = randomUUID(), outsider = randomUUID();
    for (const [id, name] of [[a, 'Alice'], [b, 'Bob'], [outsider, 'Outsider']]) await db.query('INSERT INTO "User" (id,name,"updatedAt") VALUES ($1,$2,NOW())', [id, name]);
    for (const port of [3116, 3117]) {
      const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', String(port)], { windowsHide: true, env: { ...process.env, DATABASE_URL: databaseUrl.toString(), AUTH_SECRET: secret, AUTH_URL: `http://localhost:${port}`, AUTH_TRUST_HOST: 'true', REDIS_CHANNEL_PREFIX: channelPrefix }, stdio: ['ignore', 'pipe', 'pipe'] });
      servers.push(server);
      server.stdout.on('data', (data) => { log += data; }); server.stderr.on('data', (data) => { log += data; });
      let ready = false;
      for (let i = 0; i < 80; i++) {
        try { if ((await fetch(`http://localhost:${port}/login`)).status === 200) { ready = true; break; } } catch {}
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      assert.ok(ready, log);
    }
    const cookies = new Map();
    for (const id of [a, b, outsider]) cookies.set(id, 'authjs.session-token=' + await encode({ token: { id, sub: id, name: 'ChatTest' }, secret, salt: 'authjs.session-token', maxAge: 3600 }));
    const call = async (path, user = a, method = 'GET', body, port = 3117) => {
      const response = await fetch(`http://localhost:${port}${path}`, { method, headers: { ...(user ? { cookie: cookies.get(user) } : {}), ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
      return { status: response.status, body: await response.json() };
    };
    const connect = async (user) => {
      const abort = new AbortController();
      const response = await fetch('http://localhost:3116/api/events?userId=' + outsider, { headers: { cookie: cookies.get(user) }, signal: abort.signal });
      assert.equal(response.status, 200);
      const reader = response.body.getReader();
      const events = [];
      let buffer = '';
      const decoder = new TextDecoder();
      const pump = (async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            let boundary;
            while ((boundary = buffer.indexOf('\n\n')) >= 0) {
              const frame = buffer.slice(0, boundary); buffer = buffer.slice(boundary + 2);
              const event = frame.match(/event: (.+)/)?.[1], data = frame.match(/data: (.+)/)?.[1];
              if (event && data) events.push({ event, data: JSON.parse(data) });
            }
          }
        } catch { /* Abort during teardown. */ }
      })();
      const wait = async (predicate, from = 0) => {
        for (let i = 0; i < 100; i++) {
          const result = events.slice(from).find(predicate);
          if (result) return result;
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        assert.fail('Expected realtime event was not received: ' + JSON.stringify(events));
      };
      const stream = { events, wait, close: async () => { abort.abort(); await pump; } };
      streams.push(stream);
      await wait((event) => event.event === 'ready');
      return stream;
    };
    assert.equal((await call('/api/events', null)).status, 401);
    assert.equal((await call('/api/chat', null)).status, 401);
    const streamA = await connect(a), streamB = await connect(b);
    await redis.publish(`${channelPrefix}:user:${outsider}`, JSON.stringify({ type: 'chat', conversationId: 'private-outsider' }));
    await redis.publish(`${channelPrefix}:user:${a}`, JSON.stringify({ type: 'chat', conversationId: 'direct-publish' }));
    await streamA.wait((event) => event.data.conversationId === 'direct-publish');
    assert.ok(!streamA.events.some((event) => event.data.conversationId === 'private-outsider'), 'client cannot choose another user channel');
    assert.equal((await call('/api/chat', a, 'POST', { userId: b })).status, 403);
    const request = await call('/api/friends/' + b, a, 'POST', {});
    assert.equal(request.status, 200);
    await streamB.wait((event) => event.data.type === 'friends');
    assert.equal((await call('/api/chat', a, 'POST', { userId: b })).status, 403, 'pending requests cannot chat');
    assert.equal((await call('/api/friend-requests/' + request.body.friendship.id, b, 'PATCH', { action: 'accept' })).status, 200);
    const opened = await Promise.all([call('/api/chat', a, 'POST', { userId: b }), call('/api/chat', b, 'POST', { userId: a })]);
    assert.equal(opened[0].status, 200); assert.equal(opened[1].status, 200);
    const id = opened[0].body.conversation.id;
    assert.equal(opened[1].body.conversation.id, id, 'both users share a single room');
    const url = '/api/chat/' + id;
    assert.equal((await call(url, outsider)).status, 404);
    assert.equal((await call(url, outsider, 'POST', { content: 'forbidden', clientId: randomUUID() })).status, 404);
    assert.equal((await call(url, a, 'POST', { content: ' ', clientId: randomUUID() })).status, 400);
    assert.equal((await call(url, a, 'POST', { content: 'x'.repeat(2001), clientId: randomUUID() })).status, 400);
    const start = streamB.events.length;
    const payload = { content: 'Hello Bob', clientId: randomUUID() };
    const sent = await call(url, a, 'POST', payload);
    assert.equal(sent.status, 201, JSON.stringify(sent));
    await streamB.wait((event) => event.data.type === 'chat' && event.data.conversationId === id, start);
    const duplicate = await call(url, a, 'POST', payload);
    assert.equal(duplicate.body.message.id, sent.body.message.id, 'retry does not duplicate messages');
    assert.equal((await call(url, a, 'POST', { ...payload, content: 'different' })).status, 409);
    assert.equal((await call('/api/chat', b)).body.conversations[0].unread, 1);
    assert.equal((await call('/api/chat', a)).body.conversations[0].unread, 0);
    const firstId = sent.body.message.id;
    assert.equal((await call(url, outsider, 'PATCH', { messageId: firstId })).status, 404);
    assert.equal((await call(url, b, 'PATCH', { messageId: firstId })).status, 200);
    assert.equal((await call('/api/chat', b)).body.conversations[0].unread, 0);
    assert.equal((await call(url, a)).body.peerRead, firstId);
    // Seed a history large enough to cover initial, older, and reconnect pages.
    for (let i = 0; i < 55; i++) await db.query('INSERT INTO "Message" ("conversationId","senderId","clientId",content) VALUES ($1,$2,$3,$4)', [id, a, randomUUID(), 'History ' + i]);
    const latest = (await call(url, b)).body;
    assert.equal(latest.messages.length, 50); assert.equal(latest.hasMore, true);
    const older = (await call(url + '?before=' + latest.messages[0].id, b)).body;
    assert.equal(older.messages.length, 6); assert.equal(older.hasMore, false);
    const allIds = [...older.messages, ...latest.messages].map((message) => message.id);
    assert.deepEqual(allIds, [...new Set(allIds)].sort((a, b) => a - b));
    const missed = (await call(url + '?after=' + firstId, b)).body;
    assert.equal(missed.messages.length, 50); assert.equal(missed.hasMore, true);
    const rest = (await call(url + '?after=' + missed.messages.at(-1).id, b)).body;
    assert.equal(rest.messages.length, 5);
    await call(url, b, 'PATCH', { messageId: latest.messages.at(-1).id });
    await call(url, b, 'PATCH', { messageId: firstId });
    assert.equal((await call('/api/chat', b)).body.conversations[0].unread, 0, 'stale read requests never regress');
    const postId = randomUUID();
    await db.query('INSERT INTO "Post" (id,title,content,"authorId","updatedAt") VALUES ($1,$2,$3,$4,NOW())', [postId, 'Realtime comments', 'Test post', b]);
    const noticeStart = streamB.events.length;
    assert.equal((await call(`/api/posts/${postId}/comments`, a, 'POST', { content: 'New comment' })).status, 201);
    await streamB.wait((event) => event.data.type === 'notifications', noticeStart);
    assert.equal((await call('/api/notifications', b)).body.comments.length, 1);
    const deleteStart = streamB.events.length;
    await call('/api/notifications', b, 'DELETE', { all: true });
    await streamB.wait((event) => event.data.type === 'notifications', deleteStart);
    assert.equal((await call('/api/friends/' + b, a, 'DELETE', {})).status, 200);
    assert.equal((await call(url, a, 'POST', { content: 'No longer friends', clientId: randomUUID() })).status, 403);
    assert.equal((await call('/api/chat', a, 'POST', { userId: b })).status, 403);
    const history = await call(url, b);
    assert.equal(history.status, 200); assert.equal(history.body.canSend, false, 'past participants retain history but cannot send');
    assert.equal((await call('/api/chat', outsider)).body.conversations.length, 0);
  } catch (error) { console.error(log); throw error; }
  finally {
    await Promise.all(streams.map((stream) => stream.close()));
    if (redis.isOpen) redis.destroy();
    for (const server of servers) { server.kill(); if (server.exitCode === null) await Promise.race([once(server, 'exit'), new Promise((resolve) => setTimeout(resolve, 3000))]); }
    await db.end();
    await admin.query(`DROP DATABASE "${databaseName}" WITH (FORCE)`);
    await admin.end();
  }
});
