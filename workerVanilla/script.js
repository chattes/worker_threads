const { workerData, parentPort } = require("worker_threads");

function mySlowFunction(number) {
  let result = 0;
  for (var i = Math.pow(number, 7); i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i);
  }
  return result;
}

console.log("Received Data from Parent::", workerData);

const resultDataFromWorker = workerData.map((data) => mySlowFunction(data));

console.log("Calculation Done in Worker");
parentPort.postMessage(resultDataFromWorker);
