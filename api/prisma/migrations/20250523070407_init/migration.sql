-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('COMPLETED', 'PENDING', 'ERROR');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "products" TEXT[],
    "quantity" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
