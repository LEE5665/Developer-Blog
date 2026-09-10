import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(await readFile(new URL("../app/api/posts/bulk/route.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const updatedAt = "2026-09-10T00:00:00.000Z";
const posts = [{ id: "a", updatedAt }, { id: "b", updatedAt }];

function setup({ user = "owner", owned = 2, category = true, changed = 2 } = {}) {
  const writes = [];
  let rolledBack = false;
  class PostError extends Error { constructor(message, status = 400) { super(message); this.status = status; } }
  const services = {
    PostError,
    postFailure: (error) => Response.json({ error: error.message }, { status: error.status || 400 }),
    mediaTransaction: async (callback) => {
      try { return await callback({
        category: { findFirst: async ({ where }) => { assert.equal(where.userId, "owner"); assert.equal(where.isDivider, false); return category; } },
        post: { count: async ({ where }) => { assert.equal(where.authorId, "owner"); return owned; },
          updateMany: async (args) => { writes.push(args); return { count: changed }; } },
      }); } catch (error) { rolledBack = true; throw error; }
    },
  };
  const exports = {};
  vm.runInNewContext(source, { exports, Response, Date, require: (name) => name === "@/lib/auth" ? { auth: async () => user ? { user: { id: user } } : null } : services });
  return { writes, rolledBack: () => rolledBack, call: (body) => exports.PATCH(new Request("http://localhost/api/posts/bulk", { method: "PATCH", body: JSON.stringify(body) })) };
}

test("bulk updates both settings with owner and version constraints", async () => {
  const api = setup();
  const result = await api.call({ posts, visibility: "FRIENDS", categoryId: "category" });
  assert.equal(result.status, 200);
  assert.equal((await result.json()).count, 2);
  assert.equal(api.writes[0].data.visibility, "FRIENDS");
  assert.equal(api.writes[0].data.categoryId, "category");
  assert.equal(api.writes[0].where.authorId, "owner");
  assert.equal(api.writes[0].where.OR[0].updatedAt.toISOString(), updatedAt);
});

test("category-only update supports uncategorized and preserves visibility", async () => {
  const api = setup();
  assert.equal((await api.call({ posts, categoryId: null })).status, 200);
  assert.equal(api.writes[0].data.categoryId, null);
  assert.equal(Object.hasOwn(api.writes[0].data, "visibility"), false);
});

test("rejects unauthenticated, unowned and unavailable category requests", async () => {
  for (const [options, expected] of [[{ user: null }, 401], [{ owned: 1 }, 404], [{ category: false }, 400]]) {
    const api = setup(options);
    assert.equal((await api.call({ posts, categoryId: "foreign-or-divider" })).status, expected);
    assert.equal(api.writes.length, 0);
  }
});

test("invalid and empty bulk requests never write", async () => {
  for (const body of [null, {}, { posts }, { posts: [], visibility: "PUBLIC" }, { posts, visibility: "INVALID" }, { posts, categoryId: 42 }, { posts: [posts[0], posts[0]], visibility: "PRIVATE" }, { posts: [{ id: "a", updatedAt: "invalid" }], visibility: "PUBLIC" }]) {
    const api = setup();
    assert.equal((await api.call(body)).status, 400);
    assert.equal(api.writes.length, 0);
  }
});

test("version conflicts abort the transaction", async () => {
  const api = setup({ changed: 1 });
  assert.equal((await api.call({ posts, visibility: "PRIVATE" })).status, 409);
  assert.equal(api.rolledBack(), true);
});
