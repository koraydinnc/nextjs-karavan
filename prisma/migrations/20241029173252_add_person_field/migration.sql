/*
  Warnings:

  - Added the required column `person` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "person" INTEGER NOT NULL,
ADD COLUMN     "tinyHouseId" INTEGER;

-- CreateTable
CREATE TABLE "TinyHouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TinyHouse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_tinyHouseId_fkey" FOREIGN KEY ("tinyHouseId") REFERENCES "TinyHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
