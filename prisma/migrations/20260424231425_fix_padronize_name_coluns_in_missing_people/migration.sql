/*
  Warnings:

  - You are about to drop the column `contactName` on the `missing_people` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `missing_people` table. All the data in the column will be lost.
  - Added the required column `contact_name` to the `missing_people` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_phone` to the `missing_people` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "missing_people" DROP COLUMN "contactName",
DROP COLUMN "contactPhone",
ADD COLUMN     "contact_name" TEXT NOT NULL,
ADD COLUMN     "contact_phone" TEXT NOT NULL;
