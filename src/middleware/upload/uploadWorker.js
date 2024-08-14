import { Worker } from 'worker_threads';
import path from 'path';

export const uploadWorker = (file) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      path.join(
        process.cwd(),
        '/src/middleware/upload/imgUploadProcessWorker.js'
      ),
      {
        workerData: {
          file,
        },
      }
    );
    worker.on('message', (message) => {
      console.log('message', message);
      resolve(message);
    });
    worker.on('error', (err) => {
      reject(err);
    });
  });
};
