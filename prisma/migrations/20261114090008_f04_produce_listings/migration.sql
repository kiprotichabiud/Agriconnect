-- CreateEnum
CREATE TYPE "ProduceUnit" AS ENUM ('KG', 'CRATE', 'BAG', 'BUNCH');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('ACTIVE', 'PAUSED', 'SOLD_OUT', 'EXPIRED', 'CLOSED');

-- CreateTable
CREATE TABLE "ProduceListing" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "produceName" VARCHAR(100) NOT NULL,
    "variety" VARCHAR(100),
    "description" VARCHAR(1000),
    "quantity" DECIMAL(12,3) NOT NULL,
    "unit" "ProduceUnit" NOT NULL,
    "pricePerUnit" DECIMAL(12,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'KES',
    "county" VARCHAR(80) NOT NULL,
    "collectionArea" VARCHAR(120) NOT NULL,
    "availableFrom" DATE NOT NULL,
    "availableUntil" DATE,
    "status" "ListingStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProduceListing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProduceListing_farmerId_createdAt_idx" ON "ProduceListing"("farmerId", "createdAt");

-- CreateIndex
CREATE INDEX "ProduceListing_status_availableFrom_availableUntil_idx" ON "ProduceListing"("status", "availableFrom", "availableUntil");

-- AddForeignKey
ALTER TABLE "ProduceListing" ADD CONSTRAINT "ProduceListing_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
