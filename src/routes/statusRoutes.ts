import express from "express";
import { getImageStatus } from "../controllers/statusController";


const router = express.Router();


router.get(
    "/images/:id",
    getImageStatus
);


export default router;