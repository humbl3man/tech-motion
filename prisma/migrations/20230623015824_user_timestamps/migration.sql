/*
  Warnings:

  - Added the required column `CreatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UpdatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "UpdatedAt" TIMESTAMP(3) NOT NULL;
