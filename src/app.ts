import express from "express";
import cors from "cors";

import imageRoutes from "./routes/imageRoutes";
import statusRoutes from "./routes/statusRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", imageRoutes);
app.use("/api", statusRoutes);

export default app;