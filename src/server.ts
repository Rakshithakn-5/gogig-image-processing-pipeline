import "./queue/redis";
import "./workers/imageWorker";   // <-- ADD THIS LINE

import app from "./app";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});