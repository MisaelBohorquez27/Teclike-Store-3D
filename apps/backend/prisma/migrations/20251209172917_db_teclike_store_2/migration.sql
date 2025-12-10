/*
  Warnings:

  - You are about to drop the column `documentNumber` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `documentType` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `priceCents` to the `cart_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `cart_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."RoleType" AS ENUM ('ADMIN', 'CUSTOMER');

-- DropForeignKey
ALTER TABLE "public"."cart_products" DROP CONSTRAINT "cart_products_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."cart_products" DROP CONSTRAINT "cart_products_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."carts" DROP CONSTRAINT "carts_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_roleId_fkey";

-- AlterTable
ALTER TABLE "public"."cart_products" ADD COLUMN     "priceCents" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "documentNumber",
DROP COLUMN "documentType",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "roleId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role" "public"."RoleType" NOT NULL DEFAULT 'CUSTOMER',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."roles";

-- CreateIndex
CREATE INDEX "cart_products_cartId_idx" ON "public"."cart_products"("cartId");

-- CreateIndex
CREATE INDEX "carts_userId_idx" ON "public"."carts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- AddForeignKey
ALTER TABLE "public"."carts" ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cart_products" ADD CONSTRAINT "cart_products_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "public"."carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cart_products" ADD CONSTRAINT "cart_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
