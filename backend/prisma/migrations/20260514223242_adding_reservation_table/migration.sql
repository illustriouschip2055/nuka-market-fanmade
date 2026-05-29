-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('SCHOOL', 'ORGANIZATION', 'COMPANY', 'PERSONAL_FAMILY');

-- CreateEnum
CREATE TYPE "Place" AS ENUM ('NUKA_PLANT', 'NUKA_WORLD');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'APPROVED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "entity" "EntityType" NOT NULL,
    "place" "Place" NOT NULL,
    "responsibleName" TEXT NOT NULL,
    "responsibleEmail" TEXT NOT NULL,
    "visitDate" TIMESTAMP(3) NOT NULL,
    "peopleCount" INTEGER NOT NULL,
    "status" "ReservationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
