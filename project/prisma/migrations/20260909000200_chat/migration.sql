CREATE TABLE "Conversation" (
  "id" TEXT PRIMARY KEY,
  "userAId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "userBId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "readA" INTEGER NOT NULL DEFAULT 0,
  "readB" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Conversation_ordered_pair" CHECK ("userAId" < "userBId")
);
CREATE UNIQUE INDEX "Conversation_userAId_userBId_key" ON "Conversation"("userAId", "userBId");
CREATE INDEX "Conversation_userAId_updatedAt_idx" ON "Conversation"("userAId", "updatedAt");
CREATE INDEX "Conversation_userBId_updatedAt_idx" ON "Conversation"("userBId", "updatedAt");
CREATE TABLE "Message" (
  "id" SERIAL PRIMARY KEY,
  "conversationId" TEXT NOT NULL REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "senderId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "clientId" TEXT NOT NULL,
  "content" VARCHAR(2000) NOT NULL,
  "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "Message_senderId_clientId_key" ON "Message"("senderId", "clientId");
CREATE INDEX "Message_conversationId_id_idx" ON "Message"("conversationId", "id");
