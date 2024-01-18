/*
  Warnings:

  - Added the required column `address` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
