-- DropIndex
DROP INDEX "countries_id_key";

-- AlterTable
ALTER TABLE "countries" ADD CONSTRAINT "countries_pkey" PRIMARY KEY ("id");
