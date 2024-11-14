import express from "express";

const PORT = process.env.PORT || 8000;
const app = express();

app.get('/', (req, res)=>{
    res.send("I am on the home page hahaha!!!");
})

app.get("/heavy/",(req, res)=>{
    let total = 0;
    for(let i=0; i< 50_000_000; i++){
        total++;
    }
    res.send(`The result of the CPU intensive task is ${total}\n`);

})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(`Worker pid= ${process.pid}`);
})