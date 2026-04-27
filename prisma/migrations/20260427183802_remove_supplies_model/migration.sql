/*
  Warnings:

  - You are about to drop the `supplies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "supplies" DROP CONSTRAINT "supplies_shelterId_fkey";

-- DropTable
DROP TABLE "supplies";

-- DropEnum
DROP TYPE "suppliesStatus";
