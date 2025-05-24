/*
  Warnings:

  - You are about to drop the `UserOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserOrders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserOrder" DROP CONSTRAINT "UserOrder_orderId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrder" DROP CONSTRAINT "UserOrder_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserOrders" DROP CONSTRAINT "_UserOrders_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserOrders" DROP CONSTRAINT "_UserOrders_B_fkey";

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserOrder";

-- DropTable
DROP TABLE "_UserOrders";

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
