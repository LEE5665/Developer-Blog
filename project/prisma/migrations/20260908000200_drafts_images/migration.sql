-- CreateTable
CREATE TABLE "PostDraft" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "postId" TEXT,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL,
    "categoryId" TEXT,
    "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC',
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "PostDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageAsset" (
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orphanedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImageAsset_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "PostImage" (
    "postId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PostImage_pkey" PRIMARY KEY ("postId","name")
);

-- CreateTable
CREATE TABLE "DraftImage" (
    "draftId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DraftImage_pkey" PRIMARY KEY ("draftId","name")
);

-- CreateIndex
CREATE INDEX "PostDraft_postId_idx" ON "PostDraft"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "PostDraft_userId_key_key" ON "PostDraft"("userId", "key");

-- CreateIndex
CREATE INDEX "ImageAsset_orphanedAt_idx" ON "ImageAsset"("orphanedAt");

-- CreateIndex
CREATE INDEX "PostImage_name_idx" ON "PostImage"("name");

-- CreateIndex
CREATE INDEX "DraftImage_name_idx" ON "DraftImage"("name");

-- AddForeignKey
ALTER TABLE "PostDraft" ADD CONSTRAINT "PostDraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostDraft" ADD CONSTRAINT "PostDraft_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageAsset" ADD CONSTRAINT "ImageAsset_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostImage" ADD CONSTRAINT "PostImage_name_fkey" FOREIGN KEY ("name") REFERENCES "ImageAsset"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftImage" ADD CONSTRAINT "DraftImage_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "PostDraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftImage" ADD CONSTRAINT "DraftImage_name_fkey" FOREIGN KEY ("name") REFERENCES "ImageAsset"("name") ON DELETE CASCADE ON UPDATE CASCADE;
