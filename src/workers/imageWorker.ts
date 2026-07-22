import { Worker } from "bullmq";

import connection from "../queue/redis";

import prisma from "../config/database";

import sharp from "sharp";

import { createWorker } from "tesseract.js";

import fs from "fs";

import { imageSize } from "image-size";

import * as exifr from "exifr";



const worker = new Worker(

  "image-processing",

  async (job) => {


    const { imageId } = job.data;


    console.log("📷 Processing Image:", imageId);



    try {


      await prisma.image.update({

        where: { id: imageId },

        data: {

          status: "processing",

        },

      });



      const image = await prisma.image.findUnique({

        where: {

          id: imageId,

        },

      });



      if (!image) return;



      const filePath = image.path;



      /*
        ==========================
        IMAGE DIMENSIONS
        ==========================
      */


      const dimensions = imageSize(

        fs.readFileSync(filePath)

      );


      const width = dimensions.width || 0;

      const height = dimensions.height || 0;




      /*
        ==========================
        IMAGE QUALITY ANALYSIS
        ==========================
      */


      const stats = await sharp(filePath)

        .stats();



      const brightness =

        (

          stats.channels[0].mean +

          stats.channels[1].mean +

          stats.channels[2].mean

        ) / 3;



      const lowLight = brightness < 80;




      // Blur estimation

      const sharpness =

        Math.abs(

          stats.channels[0].stdev +

          stats.channels[1].stdev +

          stats.channels[2].stdev

        ) / 3;



      const blurry = sharpness < 35;




      /*
        ==========================
        EXIF METADATA EXTRACTION
        ==========================
      */


      const exif = await exifr.parse(filePath);



      const hasExif = !!exif;



      const cameraModel =

        exif?.Model ||

        exif?.model ||

        "Unknown";



      const software =

        exif?.Software ||

        "Unknown";



      const dateTaken =

        exif?.DateTimeOriginal

          ? exif.DateTimeOriginal.toString()

          : "Unknown";



      const gpsLatitude =

        exif?.latitude ?? null;



      const gpsLongitude =

        exif?.longitude ?? null;




      /*
        ==========================
        OCR PROCESSING
        ==========================
      */


      const tesseract = await createWorker("eng");



      const result = await tesseract.recognize(

        filePath

      );



      await tesseract.terminate();




      /*
        ==========================
        SAVE ANALYSIS
        ==========================
      */


      await prisma.analysis.create({

        data: {


          imageId,


          width,

          height,


          blurry,

          lowLight,


          duplicate: false,


          averageBrightness: brightness,


          ocrText: result.data.text,


          confidence:

            result.data.confidence / 100,



          // EXIF DATA

          hasExif,


          cameraModel,


          software,


          dateTaken,


          gpsLatitude,


          gpsLongitude,


        },

      });





      await prisma.image.update({

        where: {

          id: imageId,

        },

        data: {

          status: "completed",

        },

      });



      console.log(

        "✅ Processing Finished Successfully"

      );



    } catch (error) {



      console.error(

        "❌ Image Processing Failed:",

        error

      );



      await prisma.image.update({

        where: {

          id: imageId,

        },

        data: {

          status: "failed",

        },

      });



      throw error;

    }


  },

  {

    connection,

  }

);





worker.on("completed", (job) => {


  console.log(

    `🎉 Job ${job.id} completed`

  );


});




worker.on("failed", (job, err) => {


  console.log(

    `❌ Job ${job?.id} failed:`,

    err

  );


});