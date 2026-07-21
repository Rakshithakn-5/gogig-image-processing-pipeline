import { Request, Response } from "express";
import prisma from "../config/database";

export const getStatus = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;

    const image = await prisma.image.findUnique({
      where: {
        id: id,
      },
      include: {
        analysis: true,
      },
    });

    if (!image) {
      res.status(404).json({
        message: "Image not found",
      });
      return;
    }

    res.status(200).json({
      id: image.id,
      status: image.status,
      filename: image.filename,
      analysis: image.analysis,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};