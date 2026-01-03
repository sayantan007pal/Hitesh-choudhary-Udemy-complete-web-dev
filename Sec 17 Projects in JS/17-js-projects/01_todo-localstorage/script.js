/**
 * ============================================================================
 * @concept TODO APP with LOCAL STORAGE - Interview Revision Guide
 * ============================================================================
 * 
 * @summary
 * This code builds a To-Do List app that REMEMBERS your tasks even after 
 * you close the browser. It uses three key JavaScript concepts:
 *   1. DOM Manipulation - Changing what you see on the webpage
 *   2. Event Handling   - Responding to user clicks
 *   3. LocalStorage     - Saving data in the browser (like a mini-database)
 * 
 * ============================================================================
 * @analogy - Think of it like a STICKY NOTES APP
 * ============================================================================
 * 
 *   📝 YOUR BROWSER = Your desk
 *   📦 localStorage = A drawer in your desk (data stays even if you leave)
 *   🖥️ DOM          = The sticky notes you see on your monitor
 *   👆 Events       = You pressing buttons/clicking things
 * 
 * ============================================================================
 * @key_concepts EXPLAINED
 * ============================================================================
 * 
 * 1️⃣ DOMContentLoaded Event:
 *    - Waits for HTML to fully load before running JavaScript.
 *    - WHY? You can't grab elements that don't exist yet!
 *    - Like waiting for the restaurant to open before ordering food.
 * 
 * 2️⃣ document.getElementById():
 *    - Grabs an HTML element by its "id" attribute.
 *    - Returns ONE element (IDs are unique).
 *    - Example: document.getElementById("todo-input") → <input id="todo-input">
 * 
 * 3️⃣ localStorage (The Browser's Mini-Database):
 *    - localStorage.setItem("key", "value") → SAVES data
 *    - localStorage.getItem("key")          → RETRIEVES data
 *    - Data is stored as STRINGS only, so we use JSON.stringify/JSON.parse.
 * 
 * 4️⃣ JSON.parse() & JSON.stringify():
 *    - JavaScript objects can't be stored directly in localStorage.
 *    - JSON.stringify(obj) → Converts object to string: {a:1} → '{"a":1}'
 *    - JSON.parse(str)     → Converts string to object: '{"a":1}' → {a:1}
 * 
 * 5️⃣ Event Delegation with e.target:
 *    - When you click, `e.target` tells you WHAT was clicked.
 *    - Useful when you have many buttons but one listener.
 * 
 * 6️⃣ e.stopPropagation():
 *    - Stops the event from "bubbling up" to parent elements.
 *    - Example: Clicking delete button shouldn't also toggle the task.
 * 
 * ============================================================================
 * @flow HOW THE APP WORKS (Step-by-Step)
 * ============================================================================
 * 
 *   ┌─────────────────────────────────────────────────────────────────────┐
 *   │  PAGE LOADS                                                         │
 *   │    │                                                                │
 *   │    ▼                                                                │
 *   │  DOMContentLoaded fires → Load tasks from localStorage              │
 *   │    │                                                                │
 *   │    ▼                                                                │
 *   │  renderTask() called for each saved task → Tasks appear on screen  │
 *   └─────────────────────────────────────────────────────────────────────┘
 * 
 *   ┌─────────────────────────────────────────────────────────────────────┐
 *   │  USER ADDS A TASK                                                   │
 *   │    │                                                                │
 *   │    ▼                                                                │
 *   │  Click "Add" → Create task object → Push to array                  │
 *   │    │                                                                │
 *   │    ▼                                                                │
 *   │  saveTasks() → Save array to localStorage                          │
 *   │    │                                                                │
 *   │    ▼                                                                │
 *   │  renderTask() → Show new task on screen                            │
 *   └─────────────────────────────────────────────────────────────────────┘
 * 
 * ============================================================================
 * @interview_tip COMMON QUESTIONS
 * ============================================================================
 * 
 * Q: What's the difference between localStorage and sessionStorage?
 * A: localStorage persists FOREVER (until cleared manually).
 *    sessionStorage is cleared when the browser TAB is closed.
 * 
 * Q: Why use Date.now() for IDs?
 * A: It gives a unique timestamp in milliseconds. Simple way to ensure 
 *    each task has a unique identifier.
 * 
 * Q: What is event bubbling?
 * A: When you click a child element, the event "bubbles up" to parents.
 *    Example: Clicking <button> inside <li> triggers both their listeners.
 *    Use e.stopPropagation() to prevent this.
 * 
 * ============================================================================
 */

// ═══════════════════════════════════════════════════════════════════════════
// 📌 STEP 1: WAIT FOR THE PAGE TO LOAD
// ═══════════════════════════════════════════════════════════════════════════
// "DOMContentLoaded" fires when the HTML document is fully loaded and parsed.
// We wrap everything inside this to ensure all HTML elements exist before
// we try to access them with JavaScript.
document.addEventListener("DOMContentLoaded", () => {

  // ═══════════════════════════════════════════════════════════════════════════
  // 📌 STEP 2: GRAB HTML ELEMENTS (DOM Selection)
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Get the text input field where user types their task
  // This grabs: <input type="text" id="todo-input" ...>
  const todoInput = document.getElementById("todo-input");
  
  // Get the "Add Task" button
  // This grabs: <button id="add-task-btn">Add Task</button>
  const addTaskButton = document.getElementById("add-task-btn");
  
  // Get the <ul> list where all tasks will be displayed
  // This grabs: <ul id="todo-list"></ul>
  const todoList = document.getElementById("todo-list");

  // ═══════════════════════════════════════════════════════════════════════════
  // 📌 STEP 3: LOAD SAVED TASKS FROM LOCALSTORAGE
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Try to get previously saved tasks from localStorage.
  // - localStorage.getItem("tasks") returns a STRING (or null if nothing saved)
  // - JSON.parse() converts that string back into a JavaScript array
  // - If nothing is saved (null), we use an empty array [] as default
  // 
  // Example: localStorage has '[ {"id":1, "text":"Buy milk", "completed":false} ]'
  //          JSON.parse converts it to → [ {id:1, text:"Buy milk", completed:false} ]
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // ═══════════════════════════════════════════════════════════════════════════
  // 📌 STEP 4: DISPLAY ALL SAVED TASKS ON PAGE LOAD
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Loop through each task in the array and render it on the page.
  // .forEach() is an array method that runs a function for each element.
  // This ensures that when you refresh the page, old tasks still appear!
  tasks.forEach((task) => renderTask(task));

  // ═══════════════════════════════════════════════════════════════════════════
  // 📌 STEP 5: ADD NEW TASK WHEN "ADD" BUTTON IS CLICKED
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Attach a "click" event listener to the Add button.
  // When clicked, this arrow function runs.
  addTaskButton.addEventListener("click", () => {
    
    // Get the text from the input field and remove extra spaces with .trim()
    // Example: "  Buy groceries  " becomes "Buy groceries"
    const taskText = todoInput.value.trim();
    
    // If the input is empty, stop here (don't add empty tasks!)
    // "return" exits the function early
    if (taskText === "") return;

    // Create a new task object with 3 properties:
    // - id: unique identifier using current timestamp (milliseconds since 1970)
    // - text: the actual task description from the input
    // - completed: boolean flag, starts as false (not done yet)
    const newTask = {
      id: Date.now(),       // Example: 1703673600000 (unique number)
      text: taskText,       // Example: "Buy groceries"
      completed: false,     // Task is not completed when first created
    };
    
    // Add the new task object to our tasks array
    // .push() adds an element to the END of an array
    tasks.push(newTask);
    
    // Save the updated array to localStorage (so it persists after refresh)
    saveTasks();
    
    // Display the new task on the webpage
    renderTask(newTask);
    
    // Clear the input field so user can type a new task
    todoInput.value = "";
    
    // Debug: Print current tasks array to console (for developers)
    console.log(tasks);
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // 📌 FUNCTION: renderTask(task)
  // ═══════════════════════════════════════════════════════════════════════════
  // PURPOSE: Takes a task object and creates an <li> element to display it.
  //          Also attaches event listeners for completing and deleting tasks.
  // ═══════════════════════════════════════════════════════════════════════════
  function renderTask(task) {
    
    // Create a new <li> element in memory (not on page yet)
    // document.createElement() creates an HTML element dynamically
    const li = document.createElement("li");
    
    // Set a custom "data-id" attribute on the <li> to store the task's unique ID
    // This helps us identify which task this <li> represents later
    // Result: <li data-id="1703673600000">
    li.setAttribute("data-id", task.id);
    
    // If the task is already completed, add the "completed" CSS class
    // This might apply styles like strikethrough text
    if (task.completed) li.classList.add("completed");
    
    // Set the inner HTML of the <li> using a template literal (backticks)
    // ${task.text} inserts the task text dynamically
    // Result: <li><span>Buy groceries</span><button>delete</button></li>
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
    
    // ─────────────────────────────────────────────────────────────────────────
    // EVENT: Toggle task completion when clicking the <li> (but not the button)
    // ─────────────────────────────────────────────────────────────────────────
    li.addEventListener("click", (e) => {
      
      // e.target = the EXACT element that was clicked
      // If user clicked the delete button, don't toggle - just return early
      // .tagName gives the HTML tag name in UPPERCASE (e.g., "BUTTON", "SPAN")
      if (e.target.tagName === "BUTTON") return;
      
      // Toggle the completed status: true → false, or false → true
      // The ! operator flips a boolean value
      task.completed = !task.completed;
      
      // Toggle the "completed" CSS class on/off
      // .classList.toggle() adds class if missing, removes if present
      li.classList.toggle("completed");
      
      // Save the updated state to localStorage
      saveTasks();
    });

    // ─────────────────────────────────────────────────────────────────────────
    // EVENT: Delete task when clicking the delete button
    // ─────────────────────────────────────────────────────────────────────────
    
    // Find the <button> inside this <li> and attach a click listener
    li.querySelector("button").addEventListener("click", (e) => {
      
      // IMPORTANT: Stop the click from "bubbling up" to the parent <li>
      // Without this, clicking delete would ALSO trigger the toggle above!
      // Event bubbling = events travel from child → parent → grandparent...
      e.stopPropagation();
      
      // Remove this task from the array using .filter()
      // .filter() creates a NEW array with only elements that pass the test
      // !== means "keep all tasks whose ID is NOT equal to this one"
      tasks = tasks.filter((t) => t.id !== task.id);
      
      // Remove the <li> element from the DOM (webpage)
      // .remove() deletes an element from the page
      li.remove();
      
      // Save the updated array to localStorage
      saveTasks();
    });

    // Finally, add the completed <li> to the <ul> on the webpage
    // .appendChild() inserts an element as the last child of a parent
    todoList.appendChild(li);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 📌 FUNCTION: saveTasks()
  // ═══════════════════════════════════════════════════════════════════════════
  // PURPOSE: Saves the current tasks array to localStorage.
  //          Called whenever tasks are added, deleted, or updated.
  // ═══════════════════════════════════════════════════════════════════════════
  function saveTasks() {
    // Convert the tasks array to a JSON string and save it
    // localStorage can ONLY store strings, so we must convert!
    // JSON.stringify() turns: [{id:1, text:"hi"}] → '[{"id":1,"text":"hi"}]'
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
}); // End of DOMContentLoaded event listener
