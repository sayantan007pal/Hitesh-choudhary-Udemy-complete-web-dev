import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config(); // loads variables from .env into process.env

const app = express();
app.use(express.json()); // Parse JSON request bodies

const __filename = fileURLToPath(import.meta.url);// here
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

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
    res.status(201).send(newTea);
});

app.put('/teas/:id', (req,res)=>{
    const tea = teaData.find(tea=>tea.id === parseInt(req.params.id));
    if(tea){
        tea.name = req.body.name;
        tea.price = req.body.price;
        
        res.status(200).send(tea);
    }
    else{
        res.status(404).send("Tea not found");
    }

})

app.delete('/teas/:id', (req, res) => {
    const tea = teaData.find(tea=>tea.id === parseInt(req.params.id));
    if(tea){
        teaData = teaData.filter(tea=>tea.id !== parseInt(req.params.id));
        res.status(200).send("Tea deleted");
    }
    else{
        res.status(404).send("Tea not found");
    }
})

app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
})

app.get('/teas/:id', (req, res) => {
    const teas =teaData.find(tea=>tea.id === parseInt(req.params.id))
    if(teas){
        res.status(200).send(teas);
    }
    else{
        res.status(404).send("Tea not found");
    }
    })
app.get('/', (req, res) => { 
    res.send("Hellow World")
});

app.get('/ice-tea', (req, res) => { 
    res.send("what kind of ice tea do you want?")
})
app.listen(PORT, ()=>{
    console.log(`listenting to port http://localhost:${PORT}`)
})