-- Reconcile profile fields that existed in the schema before they had a migration.
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "nickname" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "tag" TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS "User_nickname_tag_key" ON "User"("nickname", "tag");
