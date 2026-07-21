import { Worker } from "bullmq";
import connection from "../queue/redis";
import prisma from "../config/database";

const worker = new Worker(
  "image-processing",
  async (job) => {

    const { imageId } = job.data;

    console.log("📷 Processing Image:", imageId);

    // Update status to processing
    await prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        status: "processing",
      },
    });

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Save analysis
    await prisma.analysis.create({
      data: {
        imageId,
        blurry: false,
        lowLight: false,
        duplicate: false,
        ocrText: "Hello World",
        confidence: 0.96,
      },
    });

    // Update status to completed
    await prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        status: "completed",
      },
    });

    console.log("✅ Processing Finished");
  },
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`🎉 Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`❌ Job ${job?.id} failed`);
  console.log(err);
});