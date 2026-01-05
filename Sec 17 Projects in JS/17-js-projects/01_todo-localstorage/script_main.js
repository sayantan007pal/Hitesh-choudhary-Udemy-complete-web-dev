document.addEventListener("DOMContentLoaded", () => {

  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    
    const taskText = todoInput.value.trim();

    if (taskText === "") return;

    const newTask = {
      id: Date.now(),           
      text: taskText,       
      completed: false,     
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);

    todoInput.value = ""; //to clear the input field

    console.log(tasks);
  });


  function renderTask(task) {
    const li = document.createElement("li");

    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");
   //for li.innerHTML we are using template literals to insert the task text and button
    li.innerHTML = `
    <span>${task.text}</span> 
    <button>delete</button>
    `;
    li.addEventListener("click", (e) => {
      

      if (e.target.tagName === "BUTTON") return;

      task.completed = !task.completed;

      li.classList.toggle("completed");

      saveTasks();
    });


    li.querySelector("button").addEventListener("click", (e) => {

      e.stopPropagation();

      tasks = tasks.filter((t) => t.id !== task.id);

      li.remove();

      saveTasks();
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks)); //as setItem takes key value pair where key  and value is a string, so we need to convert tasks to string
  }
  
}); 
