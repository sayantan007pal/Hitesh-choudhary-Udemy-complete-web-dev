/**
 * Asynchronous JavaScript with Event Loop
 * =========================================
 * 
 * These exercises will help you understand how JavaScript handles
 * asynchronous operations using the Event Loop, setTimeout, and callbacks.
 */


// =============================================================================
// Task 1: Simulating Asynchronous Behavior
// =============================================================================
/**
 * Create a function simulateAsyncTask() that:
 * - Logs "Task started" immediately
 * - After 2 seconds, logs "Task finished"
 * 
 * Use setTimeout to simulate this behaviour.
 * 
 * Expected Output:
 *   "Task started"
 *   (2 seconds later)
 *   "Task finished"
 */

function simulateAsyncTask() {
    // ==================== YOUR CODE HERE ====================
    
console.log("Task started")
setTimeout(()=>{
    console.log("Task finished")
},2000)
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Simulate Multiple Async Tasks with Different Delays
// =============================================================================
/**
 * Create a function simulateMultipleTasks() that:
 * - Starts three asynchronous tasks with different delays
 *   - Task 1: completes after 1 second
 *   - Task 2: completes after 2 seconds
 *   - Task 3: completes after 3 seconds
 * - Each task should log "Task [n] finished" where [n] is the task number
 * - All tasks should run asynchronously (not wait for each other)
 * 
 * Expected Output (in order):
 *   "Task 1 finished" (after 1 second)
 *   "Task 2 finished" (after 2 seconds)
 *   "Task 3 finished" (after 3 seconds)
 */

async function simulateMultipleTasks() {
    // ==================== YOUR CODE HERE ====================
    
    const firstTask = async () =>{
        setTimeout(() => {
            return console.log("Task 1 finished")
        }, 1000);
    }
    const secondTask = async () =>{
        setTimeout(() => {
            return console.log("Task 2 finished")
        }, 1000);
    }
    const thirdTask = async () =>{
        setTimeout(() => {
            return console.log("Task 3 finished")
        }, 1000);
    }    

    try {
        let firstExecuted = await firstTask()
        let secondExecuted = await secondTask()
        let thridExecuted = await thirdTask()
        return {firstExecuted, secondExecuted, thridExecuted}

        
    } catch (err) {
        console.log(err)
    }
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Async Task with Callback Function
// =============================================================================
/**
 * Create a function fetchDataWithCallback(callback) that:
 * - Simulates fetching data asynchronously using setTimeout (2 seconds delay)
 * - Once the "data" is fetched, invokes the provided callback function
 * - The callback should receive "Fetched data" as an argument
 * 
 * Example Usage:
 *   fetchDataWithCallback((data) => {
 *       console.log(data); // Should print "Fetched data" after 2 seconds
 *   });
 */

function fetchDataWithCallback(callback) {
    // ==================== YOUR CODE HERE ====================
    setInterval(() => {
        let data = "Fetched data"
        callback(data)
        
    }, 2000);
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    simulateAsyncTask,
    simulateMultipleTasks,
    fetchDataWithCallback
};


// =============================================================================
// 📚 LEARNING NOTE: Why My Original Code Was WRONG (Task 3)
// =============================================================================
/**
 * ❌ MY ORIGINAL (WRONG) CODE:
 * ----------------------------
 * function fetchDataWithCallback(callback) {
 *     setInterval(() => {
 *         let data = "Fetched data"
 *         return console.log(data)   // ❌ PROBLEM HERE!
 *     }, 2000);
 * }
 * 
 * ✅ THE CORRECT CODE:
 * --------------------
 * function fetchDataWithCallback(callback) {
 *     setTimeout(() => {           // ✅ Use setTimeout, not setInterval
 *         let data = "Fetched data"
 *         callback(data)           // ✅ INVOKE the callback with data!
 *     }, 2000);
 * }
 * 
 * 
 * 🔴 WHAT WENT WRONG? (Multiple Issues!)
 * ======================================
 * 
 * ISSUE 1: I NEVER USED THE CALLBACK PARAMETER!
 * ----------------------------------------------
 * The function receives a `callback` parameter, but I completely ignored it!
 * I just did `console.log(data)` instead of `callback(data)`.
 * 
 * ISSUE 2: MISUNDERSTANDING WHAT `return` DOES INSIDE setTimeout/setInterval
 * ---------------------------------------------------------------------------
 * `return console.log(data)` does NOTHING useful here!
 * - `console.log()` returns `undefined`
 * - The arrow function inside `setInterval` returns to NOWHERE
 * - That return value is just thrown away into the void
 * 
 * ISSUE 3: Used setInterval instead of setTimeout
 * ------------------------------------------------
 * - `setInterval` runs REPEATEDLY every 2 seconds (forever!)
 * - `setTimeout` runs ONCE after 2 seconds (what we need here)
 * 
 * 
 * 📖 WHAT IS A CALLBACK? (The Concept I Missed!)
 * ===============================================
 * 
 * A callback is simply a FUNCTION that you pass AS AN ARGUMENT to another function,
 * which will be "called back" (executed) at a later time.
 * 
 * 🍕 PIZZA DELIVERY ANALOGY:
 * --------------------------
 * Imagine you order pizza online:
 * 
 * 1. YOU (the main code) call the pizza shop (an async function)
 * 2. You give them your PHONE NUMBER (the callback function)
 * 3. Pizza shop says "We'll CALL YOU BACK when pizza is ready!"
 * 4. You go do other things (event loop continues)
 * 5. 30 mins later, they CALL YOUR NUMBER (invoke the callback)
 * 6. You receive the message "Your pizza is here!" (callback receives data)
 * 
 * In code terms:
 * ```js
 * // The "phone number" is the callback function
 * const myPhoneNumber = (message) => {
 *     console.log(message);  // "Your pizza is here!"
 * };
 * 
 * // Ordering pizza = calling fetchDataWithCallback
 * // Giving phone number = passing the callback
 * fetchDataWithCallback(myPhoneNumber);
 * ```
 * 
 * 
 * 🎓 THE KEY INSIGHT I MISSED:
 * ============================
 * 
 * When a function accepts a callback, YOUR JOB is to:
 * 1. DO some async work (fetch data, wait for timer, etc.)
 * 2. INVOKE the callback with the result when done: callback(result)
 * 
 * The callback is the "PHONE NUMBER" - you must CALL IT to deliver the data!
 * Just `console.log`-ing inside your function doesn't give the data to whoever
 * called your function. They're waiting for YOU to call THEIR callback!
 * 
 * 
 * 📞 STEP-BY-STEP: How Callbacks Work Under the Hood
 * ===================================================
 * 
 * When you call:
 *   fetchDataWithCallback((data) => { console.log(data); });
 * 
 * Step 1: JavaScript enters fetchDataWithCallback()
 *         The `callback` parameter NOW HOLDS the arrow function you passed!
 *         callback = (data) => { console.log(data); }
 * 
 * Step 2: setTimeout is called and registers the timer with the browser
 *         Main thread is now free (function returns immediately)
 * 
 * Step 3: 2 seconds pass... the timer completes
 *         The arrow function () => { callback(data) } is pushed to the 
 *         CALLBACK QUEUE
 * 
 * Step 4: Event Loop checks: "Is call stack empty? Yes!"
 *         Event Loop moves the arrow function to the CALL STACK
 * 
 * Step 5: Arrow function executes:
 *         - Creates `data = "Fetched data"`
 *         - Calls `callback(data)` which is `callback("Fetched data")`
 *         - This invokes YOUR function with the data!
 * 
 * Step 6: YOUR callback function runs:
 *         (data) => { console.log(data); }
 *         Prints: "Fetched data"
 * 
 * 
 * 🆚 COMPARISON: Wrong vs Right
 * ==============================
 * 
 * WRONG (What I wrote):
 * ----------------------
 * return console.log(data)
 * 
 * Translation: "I'll just print the data myself and return nothing useful"
 * Problem: The caller NEVER receives the data! They passed a callback and
 *          are waiting for you to call it!
 * 
 * RIGHT (What I should write):
 * ----------------------------
 * callback(data)
 * 
 * Translation: "Here's the data you asked for, I'm calling you back!"
 * Result: The caller's callback function receives the data and can use it!
 * 
 * 
 * 💡 REAL-WORLD USAGE:
 * ====================
 * 
 * Callbacks are used everywhere in async JavaScript:
 * 
 * 1. Event Listeners:
 *    button.addEventListener('click', callback)  // callback runs when clicked
 * 
 * 2. Array Methods:
 *    arr.forEach(callback)    // callback runs for each element
 *    arr.map(callback)        // callback transforms each element
 *    arr.filter(callback)     // callback decides which elements to keep
 * 
 * 3. Old-school Async (before Promises):
 *    fs.readFile('file.txt', callback)  // callback runs when file is read
 *    setTimeout(callback, 1000)         // callback runs after 1 second
 * 
 * 
 * 🎯 INTERVIEW TIP:
 * =================
 * "A callback is a function passed as an argument to another function,
 * intended to be executed at a later time. The outer function 'calls back'
 * the inner function when it's ready, usually after an async operation
 * completes. This is how JavaScript handles async tasks in a single-threaded
 * environment - it delegates work and says 'call me back when you're done!'"
 * 
 */