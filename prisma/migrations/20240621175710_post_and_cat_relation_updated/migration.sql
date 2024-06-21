/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `categoryies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categoryies" ADD COLUMN     "postId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "posts_categoryId_key" ON "posts"("categoryId");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categoryies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
