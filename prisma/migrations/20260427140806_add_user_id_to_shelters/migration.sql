/*
  Warnings:

  - Added the required column `userId` to the `shelters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shelters" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "shelters" ADD CONSTRAINT "shelters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
