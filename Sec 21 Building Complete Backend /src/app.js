import express from 'express'
import cors from 'cors'

const app = express()

//basic configuration to resolve cors error like json limit, static files etc
app.use(express.json({limit:'16kb'}))
app.use(express.static("public"))
app.use(express.urlencoded({extended:true,limit:'16kb'}))

//cors config 
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',')|| "http://localhost:5173",
    credentials: true,
    methods:['GET', 'POST', 'PATCH', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


export default app