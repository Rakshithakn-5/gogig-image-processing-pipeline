import express from "express";
import imageRoutes from "./routes/imageRoutes";

const app = express();

app.use(express.json());

app.use("/api", imageRoutes);

export default app;