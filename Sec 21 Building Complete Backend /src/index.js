import dotenv from "dotenv";
import app from './app.js'
import connectDb from './db/dbConnectionFile.js'
dotenv.config({
    path: "./.env"
});





const PORT = process.env.PORT || 3000;
try {
    await connectDb()
    app.listen(PORT, ()=>{
        console.log(`listenting to port http://localhost:${PORT}`)
    })
    
    console.log("starting the server...");
    
} catch (error) {
    console.error("MONGO db connection failed !!! ", error);
    process.exit(1)
    
}
