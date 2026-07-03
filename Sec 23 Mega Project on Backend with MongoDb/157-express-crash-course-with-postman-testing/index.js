import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json()); // Parse JSON request bodies

const __filename = fileURLToPath(import.meta.url);// here
const __dirname = path.dirname(__filename);

const PORT = 3000;

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