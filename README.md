## Node Worker Threads

This is a experiment to measure performance of a NodeJS script/service for High
computational work.

## Test

Here we create an Array of 100 items and on each item perform some `CPU Intensive`
task.

## Results

At first we can run the file

`node serialProcessing.js`
This will run the task using a single Core. This a blocking task and we end up
requiring around 90 seconds to complete the task.

Then we run the same task using worker threads in which we are batching the data. The batching here is done basically on the number of virtual core available to us.
The work is then divide between these cores.

In my case , using multiple cores(12) we were able to complete the same task in 16 seconds.

This can be run

```
node ./workerVanila/index.js
```

The **workerPoolImpl.js** is basically using an npm library to create and manage a worker pool, under the hood it does essentially the same as the vanilla worker_threads but manages the number of worker_thread pools that are created and kept open for running tasks.

## More on Worker Threads

[Worker Threads](https://nodejs.org/api/worker_threads.html)
