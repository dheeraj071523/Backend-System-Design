import Queue from "bull";
import { getQueueForClient } from "../queues/queueManager.js";

// Function to process a job from the queue
export const processJob = async (job) => {
  try {
    console.log(`Processing job for client: ${job.queue.name}`);
    // Simulate some work with the job data
    console.log("Job data:", job.data);

    // Add your actual task processing logic here

    // Mark job as completed
    return Promise.resolve();
  } catch (error) {
    console.error(`Failed to process job: ${error.message}`);
    return Promise.reject(error);
  }
};

// Start the worker for each client
export const startWorker = (clientId) => {
  const queue = getQueueForClient(clientId);
  queue.process(async (job) => await processJob(job));
};

//export default { startWorker };
