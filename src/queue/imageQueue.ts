import { Queue } from "bullmq";
import connection from "./redis";

const imageQueue = new Queue("image-processing", {
  connection,
});

export default imageQueue;