import assert from "node:assert/strict";
import { test } from "node:test";
import { parseFriendHandle } from "../lib/friend-handle.ts";

test("friend handle preserves leading zeros and supports nicknames containing #", () => {
  assert.deepEqual(parseFriendHandle(" 개발자#0001 "), { nickname: "개발자", tag: "0001" });
  assert.deepEqual(parseFriendHandle("C# 개발자#1234"), { nickname: "C# 개발자", tag: "1234" });
});
test("friend handle rejects missing nicknames and malformed tags", () => {
  for (const value of [null, {}, "", "#1234", "   #1234", "개발자", "개발자#123", "개발자#12345", "개발자#abcd", "a".repeat(101)]) assert.equal(parseFriendHandle(value), null);
});
