import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import logger from './logger.js';
import morgan from 'morgan';

dotenv.config(); // loads variables from .env into process.env

const app = express();
app.use(express.json()); // Parse JSON request bodies

const __filename = fileURLToPath(import.meta.url);// here
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const morganFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {
            // morgan passes a string like: "GET /teas 200 45 - 1.234 ms"
            const parts = message.trim().split(' ');
            const logObject = {
                method: parts[0],
                url: parts[1],
                status: parts[2],
                contentLength: parts[3],
                responseTime: parts[5],
            };
            logger.info(JSON.stringify(logObject));
        },
    },
}));

let teaData = [];
let nextId = 1;

app.post('/teas', (req, res) => {
    const {name, price} = req.body;
    const newTea = {
        id: nextId++,
        name,
        price
    };
    teaData.push(newTea);
    logger.info(`Tea created: ${JSON.stringify(newTea)}`);
    res.status(201).send(newTea);
});

app.put('/teas/:id', (req,res)=>{
    const tea = teaData.find(tea=>tea.id === parseInt(req.params.id));
    if(tea){
        tea.name = req.body.name;
        tea.price = req.body.price;
        logger.info(`Tea updated: ${JSON.stringify(tea)}`);
        res.status(200).send(tea);
    }
    else{
        logger.warn(`Tea not found for update: id=${req.params.id}`);
        res.status(404).send("Tea not found");
    }

})

app.delete('/teas/:id', (req, res) => {
    const tea = teaData.find(tea=>tea.id === parseInt(req.params.id));
    if(tea){
        teaData = teaData.filter(tea=>tea.id !== parseInt(req.params.id));
        logger.info(`Tea deleted: id=${req.params.id}`);
        res.status(200).send("Tea deleted");
    }
    else{
        logger.warn(`Tea not found for delete: id=${req.params.id}`);
        res.status(404).send("Tea not found");
    }
})

app.get('/teas', (req, res) => {
    logger.info(`Fetched all teas: count=${teaData.length}`);
    res.status(200).send(teaData);
})

app.get('/teas/:id', (req, res) => {
    const teas =teaData.find(tea=>tea.id === parseInt(req.params.id))
    if(teas){
        logger.info(`Fetched tea: ${JSON.stringify(teas)}`);
        res.status(200).send(teas);
    }
    else{
        logger.warn(`Tea not found: id=${req.params.id}`);
        res.status(404).send("Tea not found");
    }
    })
app.get('/', (req, res) => { 
    logger.info('Root route hit');
    res.send("Hellow World")
});

app.get('/ice-tea', (req, res) => { 
    logger.info('Ice tea route hit');
    res.send("what kind of ice tea do you want?")
})
app.listen(PORT, ()=>{
    logger.info(`listenting to port http://localhost:${PORT}`)
})