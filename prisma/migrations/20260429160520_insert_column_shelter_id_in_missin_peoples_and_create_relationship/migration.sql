-- AlterTable
ALTER TABLE "missing_people" ADD COLUMN     "shelterId" TEXT;

-- AddForeignKey
ALTER TABLE "missing_people" ADD CONSTRAINT "missing_people_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "shelters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
