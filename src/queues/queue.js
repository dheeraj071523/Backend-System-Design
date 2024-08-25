import Queue from "bull";
import { createClient } from "redis";

// Connect to Redis
const redisClient = createClient({
  url: process.env.QUEUE_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Function to create a queue for each client
const createQueueForClient = (clientId) => {
  return new Queue(clientId, process.env.QUEUE_URL);
};

export default { createQueueForClient };
