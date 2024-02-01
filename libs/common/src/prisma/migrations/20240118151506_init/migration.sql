/*
  Warnings:

  - A unique constraint covering the columns `[id_]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "id_" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_id__key" ON "User"("id_");
