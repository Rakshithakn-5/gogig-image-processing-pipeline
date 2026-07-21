import express from "express";
import upload from "../middleware/upload";

import {
    uploadImage,
    getImageStatus
} from "../controllers/imageController";


const router = express.Router();



router.post(
    "/upload",
    upload.single("image"),
    uploadImage
);



router.get(
    "/images/:id",
    getImageStatus
);



export default router;