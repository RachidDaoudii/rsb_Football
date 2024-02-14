/*
  Warnings:

  - You are about to drop the column `id_` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_id__key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "id_",
DROP COLUMN "name",
ADD COLUMN     "fullname" TEXT;
