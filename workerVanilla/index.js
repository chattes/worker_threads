const { hrtime } = require("process");
const { Worker } = require("worker_threads");
const { chunk, flatten } = require("lodash");
const data = new Array(100).fill(10);

const chunkedData = chunk(data, 25);
const runService = (data) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./script.js", { workerData: data });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
};
// let mappedData = data.map((num) => {
//   return mySlowFunction(num);
// });

const run = async () => {
  let timeStart = hrtime.bigint();
  const processPromise = chunkedData.map((data) => {
    return runService(data);
  });
  const result = await Promise.all(processPromise);
  const resultAll = flatten(result);
  console.log("CONSOLIDATED RESULTS::", resultAll.length);
  console.log(
    "Time Taken in Seconds",
    (hrtime.bigint() - timeStart) / BigInt(1e9)
  );
};

run().catch((err) => console.log(err));
