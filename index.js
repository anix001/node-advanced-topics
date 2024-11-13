const express = require('express');
const { Worker } = require("worker_threads");

const PORT = process.env.PORT || 8000;
const app = express();

app.get('/', (req, res)=>{
    res.send("I am on the home page hahaha!!!");
})

app.get("/non-blocking/",(req, res)=>{
    res.status(200).send("This page is non-blocking");
})

app.get("/blocking/", async(req, res)=>{
    const worker = new Worker("./worker.js");
    
    worker.on("message", (data)=>{    
        res.status(200).send(`Result is ${data}`);
    });

    worker.on("error", (error)=>{
        res.send(404).send("An error occurred: ${error}");
    })
})



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})