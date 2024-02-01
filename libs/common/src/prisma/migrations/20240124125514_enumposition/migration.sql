-- CreateEnum
CREATE TYPE "Position" AS ENUM ('Null', 'GK', 'LB', 'CB', 'RB', 'LWR', 'RWR', 'DM', 'LM', 'CM', 'RM', 'LW', 'RW', 'AM', 'ST', 'CF');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "position" "Position" NOT NULL DEFAULT 'Null';

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isdeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
