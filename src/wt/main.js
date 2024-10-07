import { Worker } from 'worker_threads';
import { cpus } from 'os';
import path from 'path';

const performCalculations = async () => {
    const numberOfCores = cpus().length;
    const workerPromises = [];

    const createWorker = (index, numberToCalculate) => {
        return new Promise((resolve) => {
            const worker = new Worker(path.resolve('./src/wt/worker.js'), {
                workerData: numberToCalculate
            });

        worker.on('message', (result) => {
            resolve({ status: 'resolved', data: result });
        });

        worker.on('error', () => {
            resolve({ status: 'error', data: null });
        });
    });
};

for (let i = 0; i < numberOfCores; i++) {
    const numberToCalculate = 10 + i;
    workerPromises.push(createWorker(i, numberToCalculate));
}

const workerResults = await Promise.all(workerPromises);
console.log(workerResults);
};

await performCalculations();