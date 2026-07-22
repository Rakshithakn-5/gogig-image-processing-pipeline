/*
  Warnings:

  - Added the required column `averageBrightness` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Analysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "averageBrightness" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "width" INTEGER NOT NULL;
