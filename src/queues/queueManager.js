import queueModule from "./queue.js";

const { createQueueForClient } = queueModule;

const queues = {};

export const getQueueForClient = (clientId) => {
  if (!queues[clientId]) {
    queues[clientId] = createQueueForClient(clientId);
  }
  return queues[clientId];
};

export const removeQueueForClient = (clientId) => {
  if (queues[clientId]) {
    queues[clientId].close();
    delete queues[clientId];
  }
};
