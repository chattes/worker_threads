const workerpool = require("workerpool");

const { hrtime } = require("process");
const { chunk, flatten } = require("lodash");
const input = new Array(100).fill(10);

console.log("CPUs::", workerpool.cpus);
const chunkedData = chunk(input, workerpool.cpus);

const processChunkedData = (chunkedData) => {
  function mySlowFunction(number) {
    let result = 0;
    for (var i = Math.pow(number, 7); i >= 0; i--) {
      result += Math.atan(i) * Math.tan(i);
    }
    return result;
  }
  console.log("Data Received in Worker...");
  const resultDataFromWorker = chunkedData.map((data) => mySlowFunction(data));
  return resultDataFromWorker;
};

const processData = async () => {
  try {
    console.log("DATA BEFORE PROCESSING", input.length);
    const startTime = hrtime.bigint();
    const pool = workerpool.pool();
    const workerProcessPromise = chunkedData.map((data) => {
      return pool.exec(processChunkedData, [data]);
    });
    const resultOfWorkers = await Promise.all(workerProcessPromise);
    pool.terminate();
    console.log("Time Taken::", (hrtime.bigint() - startTime) / BigInt(1e9));
    console.log("Consolidated Result::", flatten(resultOfWorkers).length);
  } catch (error) {
    console.log("Errror in worker pool", error);
  }
};

processData().catch((error) => console.error(error));
