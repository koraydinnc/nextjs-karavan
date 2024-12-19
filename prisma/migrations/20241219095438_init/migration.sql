-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "person" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "caravanId" INTEGER,
    "caravanParkId" INTEGER,
    "tinyHouseId" INTEGER,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Caravan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "photos" TEXT[],
    "person" INTEGER NOT NULL,
    "smoking" BOOLEAN,
    "refrigerator" BOOLEAN,
    "shower" BOOLEAN,
    "externalTent" BOOLEAN,
    "gasDetector" BOOLEAN,
    "solarEnergy" BOOLEAN,
    "heatingSystem" BOOLEAN,
    "gelBattery" BOOLEAN,
    "kitchen" BOOLEAN,
    "hotWater" BOOLEAN,
    "toilet" BOOLEAN,
    "webasto" BOOLEAN,
    "inverter" BOOLEAN,
    "vehicleAC" BOOLEAN,
    "cdPlayer" BOOLEAN,
    "rearViewCamera" BOOLEAN,
    "foldableTable" BOOLEAN,
    "foldableChairs" BOOLEAN,
    "multimedia" BOOLEAN,
    "insectScreen" BOOLEAN,
    "tv" BOOLEAN,
    "livingAreaAC" BOOLEAN,

    CONSTRAINT "Caravan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaravanPark" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "photos" TEXT[],
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,

    CONSTRAINT "CaravanPark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TinyHouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "photos" TEXT[],

    CONSTRAINT "TinyHouse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_caravanId_fkey" FOREIGN KEY ("caravanId") REFERENCES "Caravan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_caravanParkId_fkey" FOREIGN KEY ("caravanParkId") REFERENCES "CaravanPark"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_tinyHouseId_fkey" FOREIGN KEY ("tinyHouseId") REFERENCES "TinyHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
