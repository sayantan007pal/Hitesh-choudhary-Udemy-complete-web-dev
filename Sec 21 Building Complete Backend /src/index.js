import dotenv from "dotenv";
import express from "express";
dotenv.config({
    path: "./.env"
});

const app = express()

app.get('/', (req, res)=>{
    res.send(`Hello world`)
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`listenting to port http://localhost:${PORT}`)
})

console.log("starting the server...");
