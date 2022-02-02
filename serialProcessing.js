const { hrtime } = require("process");
const data = new Array(100).fill(10);

let startTime = hrtime.bigint();
function mySlowFunction(number) {
  let result = 0;
  for (var i = Math.pow(number, 7); i >= 0; i--) {
    result += Math.atan(i) * Math.tan(i);
  }
  return result;
}
let mappedData = data.map((num) => {
  return mySlowFunction(num);
});

console.log("Consolidated Result::", mappedData.length);

console.log(
  "Slow Processing Time:",
  (hrtime.bigint() - startTime) / BigInt(1e9)
);
