/*
  Warnings:

  - Made the column `id_` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id_" SET NOT NULL;
