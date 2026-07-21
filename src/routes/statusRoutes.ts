import express from "express";
import { getImageStatus } from "../controllers/statusController";

const router = express.Router();

// GET /api/status/:id
router.get("/status/:id", getImageStatus);

export default router;