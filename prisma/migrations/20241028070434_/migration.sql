/*
  Warnings:

  - Added the required column `surname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "caravanParkId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "surname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CaravanPark" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CaravanPark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_caravanParkId_fkey" FOREIGN KEY ("caravanParkId") REFERENCES "CaravanPark"("id") ON DELETE SET NULL ON UPDATE CASCADE;
