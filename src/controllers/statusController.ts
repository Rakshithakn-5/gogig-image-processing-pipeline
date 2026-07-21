import { Request, Response } from "express";
import prisma from "../config/database";

export const getImageStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      res.status(404).json({
        message: "Image not found",
      });
      return;
    }

    const analysis = await prisma.analysis.findUnique({
      where: {
        imageId: id,
      },
    });

    res.json({
      processingId: image.id,
      status: image.status,
      image: {
        filename: image.filename,
        originalName: image.originalName,
        uploadedAt: image.createdAt,
      },
      analysis,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};