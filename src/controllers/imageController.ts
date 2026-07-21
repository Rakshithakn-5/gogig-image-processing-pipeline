import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import prisma from "../config/database";
import imageQueue from "../queue/imageQueue";


// Upload Image Controller

export const uploadImage = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        if (!req.file) {

            res.status(400).json({
                message: "No image uploaded"
            });

            return;
        }


        const processingId = uuidv4();


        const image = await prisma.image.create({

            data: {

                id: processingId,

                filename: req.file.filename,

                originalName: req.file.originalname,

                path: req.file.path,

                mimeType: req.file.mimetype,

                size: req.file.size,

                status: "pending"

            }

        });



        await imageQueue.add(
            "analyze-image",
            {
                imageId: image.id,
                filename: image.filename,
                path: image.path
            }
        );



        res.status(200).json({

            message: "Image uploaded successfully",

            processingId: image.id,

            status: image.status

        });



    } catch(error){

        console.log(error);


        res.status(500).json({

            message:"Internal Server Error"

        });

    }

};




// Get Image Status Controller

export const getImageStatus = async (

    req: Request,

    res: Response

): Promise<void> => {


    try {


        const id = String(req.params.id);



        const image = await prisma.image.findUnique({

            where:{
                id:id
            },

            include:{
                analysis:true
            }

        });



        if(!image){

            res.status(404).json({

                message:"Image not found"

            });

            return;

        }



        res.status(200).json({

            processingId:image.id,

            status:image.status,

            image:{

                filename:image.filename,

                originalName:image.originalName,

                uploadedAt:image.createdAt

            },


            analysis:image.analysis

        });



    }catch(error){


        console.log(error);


        res.status(500).json({

            message:"Internal Server Error"

        });


    }

};