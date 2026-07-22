-- AlterTable
ALTER TABLE "Analysis" ADD COLUMN     "cameraModel" TEXT,
ADD COLUMN     "dateTaken" TEXT,
ADD COLUMN     "gpsLatitude" DOUBLE PRECISION,
ADD COLUMN     "gpsLongitude" DOUBLE PRECISION,
ADD COLUMN     "hasExif" BOOLEAN,
ADD COLUMN     "software" TEXT;
