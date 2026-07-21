import { Request, Response } from "express";
import prisma from "../config/database";


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

        console.error(error);


        res.status(500).json({
            message:"Internal server error"
        });

    }

};