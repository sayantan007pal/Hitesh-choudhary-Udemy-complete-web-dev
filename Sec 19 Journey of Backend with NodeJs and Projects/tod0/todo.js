const fs = require("fs");
const filePath = "./todo.json";

const loadFile = async() => {
    try {
        let dataBuffer = fs.readFileSync(filePath)
        let dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
        
    } catch (err) {
        return []
    }
}

const saveFile = async(data) => {
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync(filePath,dataJSON)
}

const addTask = async(task) => {
    const data = await loadFile()
    data.push({task, id: Date.now()})
    await saveFile(data)
    console.log("task added", task)
}

const listTask = async() => {
    const data = await loadFile()
    console.log("list of tasks", data)
}

const removeTask = async(id) => {
    const data = await loadFile()
    const newData = data.filter((item,index) => {
        return item.id !== id
    })
    await saveFile(newData)
    console.log("task removed", id)
}




const command = process.argv[2];
const argument = process.argv[3];





if(command === "add")
{
    addTask(argument)
}
else if (command === "list")
{
    listTask()
}
else if (command === "remove")
{
    removeTask(parseInt(argument))
}else {
    console.log("command not found")
}