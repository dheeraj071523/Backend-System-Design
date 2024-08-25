import express, { json } from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";

import {
  getQueueForClient,
  removeQueueForClient,
} from "./queues/queueManager.js";
import { startWorker } from "./workers/requestWorker.js";
import auth from "./middleware/auth.js";

config();

const app = express();

app.use(json());

app.post("/enqueue", auth, (req, res) => {
  const clientId = req.user._id.toString(); // Assuming client ID is user's ID
  const queue = getQueueForClient(clientId);

  startWorker(clientId);

  queue.add(req.body); // Add the request data to the queue

  res.status(200).json({ message: "Request enqueued" });
});

app.delete("/dequeue", auth, (req, res) => {
  const clientId = req.user._id.toString();
  removeQueueForClient(clientId);
  res.status(200).json({ message: "Queue removed" });
});

// Connect to MongoDB
connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
