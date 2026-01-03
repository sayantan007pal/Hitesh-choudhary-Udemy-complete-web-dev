import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});


console.log(process.env.PORT);

const PORT = process.env.PORT || 3000;

console.log("starting the server...");
