import dotenv from "dotenv";
import app from './app.js'

dotenv.config({
    path: "./.env"
});





const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`listenting to port http://localhost:${PORT}`)
})

console.log("starting the server...");
