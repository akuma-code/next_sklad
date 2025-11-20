/*
  Warnings:

  - You are about to drop the `okna` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endsAt` to the `production` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `sklad` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "okna" DROP CONSTRAINT "okna_skladId_fkey";

-- AlterTable
ALTER TABLE "production" ADD COLUMN     "endsAt" TEXT NOT NULL,
ADD COLUMN     "isReady" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "sklad" ADD COLUMN     "img" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "okna";

-- CreateTable
CREATE TABLE "Info" (
    "uuid" TEXT NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Info_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_InfoToSklad" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_InfoToSklad_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Info_uuid_key" ON "Info"("uuid");

-- CreateIndex
CREATE INDEX "_InfoToSklad_B_index" ON "_InfoToSklad"("B");

-- AddForeignKey
ALTER TABLE "_InfoToSklad" ADD CONSTRAINT "_InfoToSklad_A_fkey" FOREIGN KEY ("A") REFERENCES "Info"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InfoToSklad" ADD CONSTRAINT "_InfoToSklad_B_fkey" FOREIGN KEY ("B") REFERENCES "sklad"("id") ON DELETE CASCADE ON UPDATE CASCADE;
