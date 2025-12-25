/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📌 NODE.JS CLI TODO APPLICATION - A Backend Fundamentals Primer
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * @summary
 * This is a Command-Line Interface (CLI) TODO application built with Node.js.
 * It demonstrates core backend concepts: File I/O, JSON data persistence,
 * command-line argument parsing, and CRUD operations.
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 🎯 KEY CONCEPTS COVERED
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * 1️⃣ FILE SYSTEM (fs module)
 *    - Node.js built-in module to read/write files
 *    - `fs.readFileSync()` → Reads file content (synchronous, blocks execution)
 *    - `fs.writeFileSync()` → Writes data to file (synchronous)
 *    
 *    📖 Analogy: Like opening a notebook, reading/writing, then closing it.
 * 
 * 2️⃣ process.argv (Command-Line Arguments)
 *    - `process.argv` is an array containing CLI arguments
 *    - Index breakdown:
 *        [0] = Path to Node.js executable (e.g., /usr/bin/node)
 *        [1] = Path to your script (e.g., /path/to/todo.js)
 *        [2] = First user argument (COMMAND: add/list/remove)
 *        [3] = Second user argument (DATA: task text or task ID)
 *    
 *    📖 Example: `node todo.js add "Buy milk"`
 *        process.argv[2] = "add"
 *        process.argv[3] = "Buy milk"
 * 
 * 3️⃣ JSON DATA PERSISTENCE
 *    - Data stored in `todo.json` file (acts as a simple database)
 *    - `JSON.parse()` → Converts JSON string → JavaScript object
 *    - `JSON.stringify()` → Converts JavaScript object → JSON string
 *    
 *    📖 Analogy: Like translating between English and Hindi - 
 *               parse = read Hindi (JSON) and understand in English (JS object)
 *               stringify = speak English (JS object) and write in Hindi (JSON)
 * 
 * 4️⃣ ASYNC/AWAIT PATTERN
 *    - Functions marked `async` can use `await` to handle promises
 *    - Makes asynchronous code look synchronous and readable
 *    - Even though we use sync file operations here, the pattern is used
 *      to demonstrate how real-world apps handle async operations
 * 
 * 5️⃣ CRUD OPERATIONS
 *    - CREATE → addTask() - Adds new task to the list
 *    - READ   → listTask() - Displays all tasks
 *    - UPDATE → (not implemented, but would modify existing task)
 *    - DELETE → removeTask() - Removes task by ID
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 📊 APPLICATION FLOW DIAGRAM
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 *    User runs command
 *          │
 *          ▼
 *   ┌──────────────────┐
 *   │  process.argv    │  ← Parse command & argument
 *   │  [2] = command   │
 *   │  [3] = argument  │
 *   └────────┬─────────┘
 *            │
 *            ▼
 *   ┌──────────────────┐
 *   │  if/else logic   │  ← Route to correct function
 *   └────────┬─────────┘
 *            │
 *     ┌──────┼──────┬────────┐
 *     ▼      ▼      ▼        ▼
 *   add    list   remove   error
 *     │      │      │
 *     ▼      ▼      ▼
 *   ┌──────────────────┐
 *   │   loadFile()     │  ← Read from todo.json
 *   └────────┬─────────┘
 *            │
 *            ▼
 *   ┌──────────────────┐
 *   │  Modify data     │  ← push/filter array
 *   └────────┬─────────┘
 *            │
 *            ▼
 *   ┌──────────────────┐
 *   │   saveFile()     │  ← Write back to todo.json
 *   └──────────────────┘
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 🚀 HOW TO USE (Terminal Commands)
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 *   node todo.js add "Learn Node.js"    → Adds a new task
 *   node todo.js list                   → Shows all tasks
 *   node todo.js remove 1735123456789   → Removes task with that ID
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 💡 INTERVIEW CHEAT SHEET
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * Q: What is process.argv?
 * A: An array in Node.js containing command-line arguments. Index 0 is the
 *    Node executable path, index 1 is the script path, and index 2+ are
 *    user-provided arguments.
 * 
 * Q: Difference between readFileSync vs readFile?
 * A: readFileSync is BLOCKING (waits until file is read completely).
 *    readFile is NON-BLOCKING (uses callback, doesn't block event loop).
 *    Use sync for scripts/CLIs, async for servers.
 * 
 * Q: Why use JSON for data storage here?
 * A: JSON is human-readable, easy to parse in JS, and perfect for small
 *    datasets. For production apps, use databases like MongoDB/PostgreSQL.
 * 
 * Q: What does Date.now() return?
 * A: A unique timestamp in milliseconds since Jan 1, 1970 (Unix epoch).
 *    Used here as a simple unique ID generator.
 * 
 * Q: Why parseInt() in removeTask?
 * A: process.argv values are always STRINGS. We need to convert the ID
 *    to a NUMBER for proper comparison with the stored numeric IDs.
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️ COMMON MISTAKES & GOTCHAS (Why Things Don't Work!)
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * ❌ MISTAKE 1: Using process.argv[0] or process.argv[1] for user input
 * ────────────────────────────────────────────────────────────────────────
 * 
 *    WHY IT DOESN'T WORK:
 *    process.argv[0] and [1] are RESERVED by Node.js itself!
 *    
 *    When you run: node todo.js add "Buy milk"
 *    
 *    process.argv = [
 *      "/usr/local/bin/node",     ← [0] ALWAYS the Node executable path
 *      "/path/to/todo.js",        ← [1] ALWAYS the script file path
 *      "add",                     ← [2] YOUR first argument starts here!
 *      "Buy milk"                 ← [3] YOUR second argument
 *    ]
 *    
 *    📖 Analogy: Imagine a bus with reserved seats. Seats 0 and 1 are 
 *               always for the driver (Node) and conductor (your script).
 *               Passengers (your arguments) start from seat 2 onwards!
 *    
 *    ✅ CORRECT: Use process.argv[2] for command, process.argv[3] for data
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * ❌ MISTAKE 2: Using fs.readFile() / fs.writeFile() with async/await
 * ────────────────────────────────────────────────────────────────────────
 * 
 *    WHY IT DOESN'T WORK:
 *    fs.readFile() and fs.writeFile() use CALLBACKS, not Promises!
 *    async/await ONLY works with Promises.
 *    
 *    ❌ WRONG CODE (This will NOT work as expected):
 *    ```
 *    const loadFile = async() => {
 *        let data = await fs.readFile(filePath);  // ❌ Returns undefined!
 *        return JSON.parse(data);                 // ❌ Crashes!
 *    }
 *    ```
 *    
 *    WHY? fs.readFile() doesn't return a Promise. It uses old-school 
 *    callbacks like: fs.readFile(path, (err, data) => { ... })
 *    
 *    When you await something that isn't a Promise, await just passes 
 *    through undefined (because readFile returns undefined immediately).
 *    
 *    ─────────────────────────────────────────────────────────────────────
 *    
 *    THREE SOLUTIONS:
 *    
 *    ✅ SOLUTION 1: Use Sync versions (what we did here)
 *       fs.readFileSync() and fs.writeFileSync() are BLOCKING.
 *       They wait until file operation completes and return the result directly.
 *       No Promise needed, no callback needed - just returns the data!
 *       
 *       Pros: Simple, works reliably
 *       Cons: Blocks the event loop (bad for servers with many users)
 *       Best for: CLI tools, scripts, small applications
 *    
 *    ✅ SOLUTION 2: Use fs.promises (Modern way)
 *       ```
 *       const fs = require('fs').promises;  // or: import fs from 'fs/promises'
 *       const data = await fs.readFile(filePath, 'utf8');  // ✅ Works!
 *       ```
 *       fs.promises returns Promise-based versions of all fs methods.
 *    
 *    ✅ SOLUTION 3: Promisify the callback (Old way)
 *       ```
 *       const { promisify } = require('util');
 *       const readFileAsync = promisify(fs.readFile);
 *       const data = await readFileAsync(filePath);  // ✅ Works!
 *       ```
 *    
 *    📖 Analogy: 
 *       - Callback = Ordering food and waiting for waiter to call your name
 *       - Promise = Ordering food and getting a buzzer that vibrates when ready
 *       - Sync = Standing at counter until food is made (blocking others)
 *       
 *       async/await is designed to work with buzzers (Promises), not 
 *       with the waiter-calling-your-name system (callbacks)!
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 🔄 CALLBACKS vs PROMISES - DEEP DIVE
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * Both are ways to handle ASYNCHRONOUS operations (tasks that take time,
 * like reading files, fetching data from APIs, database queries, etc.)
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 📞 CALLBACKS (The Old Way - Node.js Original Pattern)                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 *    DEFINITION: A callback is a function you pass as an argument to 
 *                another function. It gets "called back" when the task 
 *                is complete.
 *    
 *    SYNTAX PATTERN:
 *    ```
 *    doSomething(input, function(error, result) {
 *        // This runs AFTER doSomething completes
 *        if (error) {
 *            console.log("Something went wrong:", error);
 *        } else {
 *            console.log("Success:", result);
 *        }
 *    });
 *    ```
 *    
 *    REAL EXAMPLE with fs.readFile:
 *    ```
 *    fs.readFile('./todo.json', 'utf8', function(err, data) {
 *        if (err) {
 *            console.log("Error reading file");
 *            return;
 *        }
 *        console.log("File contents:", data);
 *    });
 *    console.log("This prints FIRST!");  // ← Runs before file is read!
 *    ```
 *    
 *    OUTPUT ORDER:
 *    > "This prints FIRST!"
 *    > "File contents: [...]"     ← Appears later, when file read completes
 *    
 *    WHY? Node.js doesn't wait. It starts reading the file, then 
 *    immediately moves to the next line. When reading finishes,
 *    it "calls back" your function.
 *    
 *    THE PROBLEM - "CALLBACK HELL" (Pyramid of Doom):
 *    ```
 *    fs.readFile('file1.txt', function(err, data1) {
 *        fs.readFile('file2.txt', function(err, data2) {
 *            fs.readFile('file3.txt', function(err, data3) {
 *                fs.writeFile('output.txt', data1+data2+data3, function(err) {
 *                    console.log("Done!");
 *                    // 😵 Deeply nested, hard to read, hard to debug!
 *                });
 *            });
 *        });
 *    });
 *    ```
 *    
 *    RETURN VALUE: Functions using callbacks return NOTHING useful.
 *    They just return `undefined` immediately.
 *    
 *    ```
 *    const result = fs.readFile('./file.txt', callback);
 *    console.log(result);  // undefined! The actual data comes in callback
 *    ```
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🤝 PROMISES (The Modern Way - ES6+)                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 *    DEFINITION: A Promise is an OBJECT that represents a future value.
 *                It's like a receipt/token that says "I promise to give
 *                you the result later."
 *    
 *    THREE STATES:
 *    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
 *    │   PENDING    │───▶│  FULFILLED  │    │   REJECTED   │
 *    │  (waiting)   │    │  (success)  │    │   (error)    │
 *    └──────────────┘    └─────────────┘    └──────────────┘
 *           │                                      ▲
 *           └──────────────────────────────────────┘
 *    
 *    SYNTAX PATTERN with .then() and .catch():
 *    ```
 *    doSomething(input)
 *        .then(function(result) {
 *            console.log("Success:", result);
 *        })
 *        .catch(function(error) {
 *            console.log("Error:", error);
 *        });
 *    ```
 *    
 *    REAL EXAMPLE with fs.promises:
 *    ```
 *    const fs = require('fs').promises;
 *    
 *    fs.readFile('./todo.json', 'utf8')
 *        .then(data => console.log("File contents:", data))
 *        .catch(err => console.log("Error:", err));
 *    ```
 *    
 *    CHAINING (No more callback hell!):
 *    ```
 *    fs.readFile('file1.txt')
 *        .then(data1 => fs.readFile('file2.txt'))
 *        .then(data2 => fs.readFile('file3.txt'))
 *        .then(data3 => fs.writeFile('output.txt', data3))
 *        .then(() => console.log("Done!"))
 *        .catch(err => console.log("Error:", err));  // Catches ANY error above
 *    ```
 *    
 *    RETURN VALUE: Functions using promises RETURN a Promise object.
 *    This is why they work with await!
 *    
 *    ```
 *    const promise = fs.promises.readFile('./file.txt');
 *    console.log(promise);  // Promise { <pending> } ← An actual object!
 *    ```
 * 
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ ⚡ async/await (Syntactic Sugar for Promises)                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 *    async/await is just a CLEANER WAY to write Promise code.
 *    It makes async code LOOK like synchronous code.
 *    
 *    ```
 *    // Promise with .then()
 *    fs.promises.readFile('./file.txt')
 *        .then(data => console.log(data));
 *    
 *    // Same thing with async/await (cleaner!)
 *    async function readFile() {
 *        const data = await fs.promises.readFile('./file.txt');
 *        console.log(data);
 *    }
 *    ```
 *    
 *    WHAT await DOES:
 *    1. Pauses the async function execution
 *    2. Waits for the Promise to resolve
 *    3. Unwraps the Promise and returns the actual value
 *    
 *    ⚠️ CRITICAL: await ONLY works on Promises!
 *    
 *    ```
 *    await somePromise;        // ✅ Works - waits and returns result
 *    await notAPromise;        // ❌ Returns immediately (no waiting)
 *    await fs.readFile(...);   // ❌ Returns undefined (uses callbacks!)
 *    await fs.promises.read(); // ✅ Works - returns Promise
 *    ```
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 📊 VISUAL: EXECUTION FLOW COMPARISON
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 *    CALLBACK (what happens):
 *    ┌────────────────────────────────────────────────────────────────────┐
 *    │ Code: fs.readFile('./file', (err, data) => console.log(data));   │
 *    │       console.log("Next line");                                   │
 *    └────────────────────────────────────────────────────────────────────┘
 *           │
 *           ▼
 *    TIME ─────────────────────────────────────────────────────────────▶
 *    
 *    [Start readFile]──[Print "Next line"]──────────[Callback runs]
 *         │                    │                           │
 *         │                    │                    (data available)
 *         │                    │
 *       (file reading          (this runs
 *        starts, returns       immediately,
 *        undefined)            doesn't wait)
 *    
 *    
 *    PROMISE + await (what happens):
 *    ┌────────────────────────────────────────────────────────────────────┐
 *    │ Code: const data = await fs.promises.readFile('./file');          │
 *    │       console.log("Next line");                                   │
 *    └────────────────────────────────────────────────────────────────────┘
 *           │
 *           ▼
 *    TIME ─────────────────────────────────────────────────────────────▶
 *    
 *    [Start readFile]───────────────────────────[Print "Next line"]
 *         │                                              │
 *         │◄─────── WAITS until complete ───────►│
 *         │                                     (data is now available,
 *       (file reading                            then continues to next)
 *        starts, returns
 *        Promise)
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 🎯 SUMMARY TABLE
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 *    ┌────────────────┬─────────────────────────┬────────────────────────┐
 *    │    ASPECT      │      CALLBACK           │       PROMISE          │
 *    ├────────────────┼─────────────────────────┼────────────────────────┤
 *    │ Return value   │ undefined               │ Promise object         │
 *    │ Error handling │ err as first param      │ .catch() or try/catch  │
 *    │ Chaining       │ Nested (callback hell)  │ Flat .then() chains    │
 *    │ async/await    │ ❌ Does NOT work        │ ✅ Works perfectly     │
 *    │ Readability    │ Hard to follow          │ Clean, sequential      │
 *    │ Node.js fs     │ fs.readFile()           │ fs.promises.readFile() │
 *    └────────────────┴─────────────────────────┴────────────────────────┘
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const fs = require("fs");
const filePath = "./todo.json";

const loadFile = async() => {
    try {
        let dataBuffer = fs.readFileSync(filePath) // returns buffer 
        let dataJSON = dataBuffer.toString() // returns string
        return JSON.parse(dataJSON)
        
    } catch (err) {
        return []
    }
}

const saveFile = async(data) => {
    const dataJSON = JSON.stringify(data) // returns string
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