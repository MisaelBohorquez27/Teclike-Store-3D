/*
  Warnings:

  - Added the required column `phone` to the `ContactMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ContactMessage" ADD COLUMN     "phone" TEXT NOT NULL;
