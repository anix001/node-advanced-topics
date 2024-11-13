const express = require('express');
const { Worker } = require("worker_threads");

const PORT = process.env.PORT || 8000;
const app = express();
const THREAD_COUNT = 4;

app.get('/', (req, res)=>{
    res.send("I am on the home page hahaha!!!");
})

app.get("/non-blocking/",(req, res)=>{
    res.status(200).send("This page is non-blocking");
});


function createWorker(){
    return new Promise((resolve, reject)=>{
       const worker = new Worker("./four-workers.js", {
        workerData: {thread_count:THREAD_COUNT}
       }) ;

       worker.on("message", (data)=>{    
        resolve(data);
        });

        worker.on("error", (error)=>{
            reject("An error occurred: ${error}");
        })

    })
}

app.get("/blocking/", async(req, res)=>{
    const workerPromises = [];

    for(let i=0; i< THREAD_COUNT; i++){
        workerPromises.push(createWorker());
    }

    const thread_result = await Promise.all(workerPromises);
    console.log("🚀 ~ app.get ~ thread_result:", thread_result);
    const total = thread_result[0] +thread_result[1] + thread_result[2] + thread_result[3];
    res.status(200).send(`Result is ${total}`);
;})



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})