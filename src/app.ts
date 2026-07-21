import express from "express";

import imageRoutes from "./routes/imageRoutes";
import statusRoutes from "./routes/statusRoutes";

const app = express();

app.use(express.json());

// Upload API
app.use("/api", imageRoutes);

// Status API
app.use("/api", statusRoutes);

export default app;