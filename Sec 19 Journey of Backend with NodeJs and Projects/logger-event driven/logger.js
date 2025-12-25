/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📌 NODE.JS EVENT-DRIVEN LOGGER - Understanding EventEmitter
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * @summary
 * This is an event-driven logging system using Node.js's EventEmitter.
 * It demonstrates the Observer Pattern - a core concept in Node.js!
 * Events are emitted (published) and listeners (subscribers) react to them.
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 🎯 KEY CONCEPTS COVERED
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * 1️⃣ EVENT EMITTER (Node.js Core)
 *    - `EventEmitter` is a class that allows objects to emit and listen to events
 *    - `emit('eventName', data)` → Triggers an event with optional data
 *    - `on('eventName', callback)` → Listens for an event, runs callback when fired
 *    
 *    📖 Analogy: Like a radio station (emitter) and radios (listeners).
 *               Station broadcasts (emit), all tuned radios receive the signal.
 * 
 * 2️⃣ OBSERVER PATTERN
 *    ┌─────────────┐                    ┌─────────────┐
 *    │   EMITTER   │ ──── event ──────▶ │  LISTENER   │
 *    │ (Publisher) │                    │ (Subscriber)│
 *    └─────────────┘                    └─────────────┘
 *    
 *    - One emitter can have MULTIPLE listeners
 *    - Listeners don't need to know about each other
 *    - Decouples code: Emitter doesn't care WHO is listening
 * 
 * 3️⃣ EXTENDING EventEmitter
 *    - We create our own `Logger` class that EXTENDS EventEmitter
 *    - This gives Logger all EventEmitter powers (emit, on, once, etc.)
 *    - Logger.log() internally calls this.emit() to fire events
 * 
 * 4️⃣ OS MODULE (Operating System Info)
 *    - `os.freemem()` → Returns free memory in bytes
 *    - `os.totalmem()` → Returns total memory in bytes
 *    - `os.EOL` → End Of Line character (\n on Unix, \r\n on Windows)
 *    - Used here to log system memory usage
 * 
 * 5️⃣ setInterval() - Periodic Execution
 *    - Runs a function repeatedly at fixed time intervals
 *    - `setInterval(callback, milliseconds)`
 *    - 3000ms = 3 seconds
 *    - Used here to log memory usage every 3 seconds
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️ CRITICAL: WHY "message" SHOWED [object Object] BUT "event.message" WORKS!
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * This is the MOST IMPORTANT concept to understand!
 * 
 * WHAT WE EMIT:
 * ```
 * this.emit("messageLogged", {id: 1, message: message});
 *                            └────────────────────────┘
 *                            This ENTIRE OBJECT is passed to listener!
 * ```
 * 
 * WHAT THE LISTENER RECEIVES:
 * ```
 * logger.on('messageLogged', (event) => { ... });
 *                             ↑
 *                     event = {id: 1, message: "Application started"}
 *                     (The WHOLE object, not just the message!)
 * ```
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * ❌ WRONG: Using the parameter directly in template literal
 * ```
 * const logToFile = (message) => {
 *     const logEntry = `${new Date().toISOString()} - ${message}`;
 *                                                     ↑
 *                                    message = {id: 1, message: "..."}
 *                                    This is an OBJECT, not a string!
 * }
 * ```
 * OUTPUT: "2025-12-25T18:04:13.003Z - [object Object]"
 * 
 * WHY? JavaScript converts objects to string as "[object Object]"
 *      when you use them in template literals directly!
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * ✅ CORRECT: Access the property inside the object
 * ```
 * const logToFile = (event) => {
 *     const logEntry = `${new Date().toISOString()} - ${event.message}`;
 *                                                     ↑
 *                                    event.message = "Memory usage: 0.33"
 *                                    This extracts the STRING value!
 * }
 * ```
 * OUTPUT: "2025-12-25T18:13:08.601Z - Memory usage: 0.3321965535481771"
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * ALTERNATIVE: Destructuring (cleaner syntax)
 * ```
 * const logToFile = ({ message }) => {
 *                    ↑
 *                    Extracts 'message' property directly!
 *     const logEntry = `${new Date().toISOString()} - ${message}`;
 * }
 * ```
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 📊 EVENT FLOW DIAGRAM
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 *    logger.log("Application started")
 *           │
 *           ▼
 *    ┌──────────────────────────────────────────────────────────────────────┐
 *    │  this.emit("messageLogged", {id: 1, message: "Application started"})│
 *    └──────────────────────────────────┬───────────────────────────────────┘
 *                                       │
 *                                       ▼
 *    ┌──────────────────────────────────────────────────────────────────────┐
 *    │  EVENT SYSTEM finds all listeners registered for "messageLogged"    │
 *    └──────────────────────────────────┬───────────────────────────────────┘
 *                                       │
 *                                       ▼
 *    ┌──────────────────────────────────────────────────────────────────────┐
 *    │  logToFile(event) is called with event = {id:1, message: "App..."}  │
 *    └──────────────────────────────────┬───────────────────────────────────┘
 *                                       │
 *                                       ▼
 *    ┌──────────────────────────────────────────────────────────────────────┐
 *    │  Console output + File write to eventlog.txt                         │
 *    └──────────────────────────────────────────────────────────────────────┘
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 💡 INTERVIEW CHEAT SHEET
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 * Q: What is EventEmitter?
 * A: A Node.js class that implements the Observer pattern. It allows objects
 *    to emit named events and register listener functions that respond to them.
 * 
 * Q: What is the difference between emit() and on()?
 * A: emit('event', data) → FIRES an event and passes data to all listeners
 *    on('event', fn) → REGISTERS a listener function for that event
 * 
 * Q: Why did I get [object Object] instead of my message?
 * A: You passed an OBJECT to emit(), but tried to use it directly in a string.
 *    JavaScript converts objects to "[object Object]" when stringifying.
 *    SOLUTION: Access the property (event.message) or use destructuring.
 * 
 * Q: What is the Observer Pattern?
 * A: A design pattern where "subjects" (emitters) maintain a list of
 *    "observers" (listeners) and notify them automatically of state changes.
 *    It decouples the sender from the receiver.
 * 
 * Q: Why extend EventEmitter instead of using it directly?
 * A: Extending allows us to add custom methods (like log()) while keeping
 *    all EventEmitter functionality. It creates a reusable, specialized class.
 * 
 * Q: What is setInterval vs setTimeout?
 * A: setInterval → Runs REPEATEDLY every N milliseconds (forever until cleared)
 *    setTimeout → Runs ONCE after N milliseconds delay
 * 
 * Q: What does os.EOL do?
 * A: Returns the operating system's End-Of-Line character.
 *    Unix/Mac = "\n" (LF), Windows = "\r\n" (CRLF)
 *    Ensures file writes work correctly across platforms.
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 🔧 COMMON EventEmitter METHODS
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 *    ┌─────────────────────┬──────────────────────────────────────────────────┐
 *    │      METHOD         │              DESCRIPTION                         │
 *    ├─────────────────────┼──────────────────────────────────────────────────┤
 *    │ emit(event, data)   │ Fires an event, passing data to all listeners   │
 *    │ on(event, fn)       │ Adds a listener (runs every time event fires)   │
 *    │ once(event, fn)     │ Adds a one-time listener (auto-removed after)   │
 *    │ off(event, fn)      │ Removes a specific listener                      │
 *    │ removeAllListeners()│ Removes all listeners for an event              │
 *    │ listenerCount(event)│ Returns number of listeners for an event        │
 *    └─────────────────────┴──────────────────────────────────────────────────┘
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * 🌍 REAL-WORLD USES OF EventEmitter
 * ─────────────────────────────────────────────────────────────────────────────
 * 
 *    1. HTTP Server → Emits 'request' event for each incoming request
 *    2. Streams → Emit 'data', 'end', 'error' events
 *    3. Child Processes → Emit 'exit', 'error', 'message' events
 *    4. WebSockets → Emit 'connection', 'message', 'close' events
 *    5. Database connections → Emit 'connected', 'error' events
 *    
 *    Node.js is fundamentally EVENT-DRIVEN. Almost everything uses EventEmitter!
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
/**
 * ─────────────────────────────────────────────────────────────────────────────
 * 📝 CODE WALKTHROUGH - LINE BY LINE EXPLANATION
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ═══════════════════════════════════════════════════════════════════════════
// STEP 1: IMPORTS - Bring in the modules we need
// ═══════════════════════════════════════════════════════════════════════════

import  fs from "fs";       
// 📦 fs (File System) module - Used to read/write files
//    We use fs.appendFileSync() to add log entries to eventlog.txt

import os from "os";         
// 📦 os (Operating System) module - Provides system information
//    os.freemem() → Free memory in bytes
//    os.totalmem() → Total memory in bytes
//    os.EOL → End-of-line character ("\n" on Mac/Linux, "\r\n" on Windows)

import { EventEmitter } from "events";  
// 📦 EventEmitter class from 'events' module (Node.js built-in)
//    This is DESTRUCTURED import: we only grab EventEmitter from the module
//    EventEmitter is the foundation of event-driven programming in Node.js


// ═══════════════════════════════════════════════════════════════════════════
// STEP 2: CREATE CUSTOM LOGGER CLASS
// ═══════════════════════════════════════════════════════════════════════════

class Logger extends EventEmitter{
    // 🔷 Logger inherits ALL methods from EventEmitter:
    //    - emit()  → Fire an event
    //    - on()    → Register a listener
    //    - once()  → Register a one-time listener
    //    - off()   → Remove a listener
    
    log(message){
        // 🔹 Custom method: When log() is called, it EMITS an event
        //    
        //    WHAT HAPPENS HERE:
        //    1. this.emit() fires the "messageLogged" event
        //    2. An object { message: message } is passed as event data
        //    3. ALL registered listeners for "messageLogged" will run
        //    
        //    WHY AN OBJECT? We could emit just the string:
        //       this.emit("messageLogged", message);  
        //    But objects are more flexible - you can add more properties later:
        //       { id: 1, message: message, timestamp: Date.now(), level: "info" }
        
        this.emit("messageLogged", { "message": message});
    }
}


// ═══════════════════════════════════════════════════════════════════════════
// STEP 3: CREATE INSTANCES AND CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

let logger = new Logger();      
// 🔷 Create an instance of our Logger class
//    logger now has: .log(), .emit(), .on(), .once(), .off(), etc.

let logFile = './eventlog.txt'; 
// 🔷 Path to the log file (relative to current directory)
//    Events will be written to this file


// ═══════════════════════════════════════════════════════════════════════════
// STEP 4: DEFINE THE LISTENER FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

const logToFile = (event) => {
    // 🔹 This function runs EVERY TIME "messageLogged" event is emitted
    //    
    //    PARAMETER 'event':
    //    - This is the OBJECT we passed in emit(): { message: "..." }
    //    - To get the string, we access: event.message
    //    
    //    ⚠️ COMMON MISTAKE:
    //    - If you do ${event} directly, you get "[object Object]"
    //    - You must access the property: ${event.message}
    
    const logEntry = `${new Date().toISOString()} - ${event.message}`;
    // 🔹 Create a formatted log entry with timestamp
    //    new Date().toISOString() → "2025-12-25T18:12:53.597Z"
    //    Result: "2025-12-25T18:12:53.597Z - Application started"
    
    console.log(logEntry);
    // 🔹 Print to terminal for immediate feedback
    
    fs.appendFileSync(logFile, logEntry + os.EOL);
    // 🔹 APPEND the log entry to file (doesn't overwrite existing content)
    //    appendFileSync = Synchronous, blocks until write completes
    //    os.EOL = Adds proper newline for the OS
 }


// ═══════════════════════════════════════════════════════════════════════════
// STEP 5: REGISTER THE LISTENER (Connect event to handler)
// ═══════════════════════════════════════════════════════════════════════════

 logger.on('messageLogged', logToFile);
// 🔷 CRITICAL: This CONNECTS the event to the listener!
//    
//    "When 'messageLogged' event is emitted, run logToFile function"
//    
//    HOW IT WORKS:
//    ┌─────────────────────┐          ┌─────────────────────┐
//    │ logger.log("Hi")    │ ───────▶ │ logToFile(event)    │
//    │ (emits event)       │          │ (listener runs)     │
//    └─────────────────────┘          └─────────────────────┘
//    
//    You can register MULTIPLE listeners for the same event:
//    logger.on('messageLogged', logToFile);
//    logger.on('messageLogged', sendEmail);
//    logger.on('messageLogged', alertAdmin);


// ═══════════════════════════════════════════════════════════════════════════
// STEP 6: PERIODIC LOGGING WITH setInterval
// ═══════════════════════════════════════════════════════════════════════════

 setInterval(() => {
    // 🔷 setInterval runs this arrow function EVERY 3000ms (3 seconds)
    //    Unlike setTimeout (runs ONCE), setInterval runs FOREVER
    //    To stop it: const id = setInterval(...); clearInterval(id);
    
    const memoryUse = (os.freemem()/ os.totalmem()) * 100;
    // 🔹 Calculate memory usage as a percentage
    //    os.freemem() = Free memory in bytes (e.g., 4294967296 = 4GB)
    //    os.totalmem() = Total memory in bytes (e.g., 17179869184 = 16GB)
    //    (free / total) * 100 = Percentage of FREE memory
    //    Example: (4GB / 16GB) * 100 = 25% free memory
    
    logger.log(`Memory usage: ${memoryUse}`);
    // 🔹 Log the memory usage - this triggers the event!
    
 },3000)
 // 🔷 3000 milliseconds = 3 seconds between each log


// ═══════════════════════════════════════════════════════════════════════════
// STEP 7: INITIAL LOG (Runs immediately when script starts)
// ═══════════════════════════════════════════════════════════════════════════

 logger.log("Application started")
// 🔷 First log entry - runs IMMEDIATELY when script starts
//    
//    EXECUTION ORDER:
//    1. Script starts
//    2. logger.log("Application started") runs immediately
//    3. setInterval starts, but first execution is AFTER 3 seconds
//    4. After 3s: memory log #1
//    5. After 6s: memory log #2
//    6. ... continues forever until Ctrl+C
//    
//    OUTPUT TIMELINE:
//    t=0s  → "Application started"
//    t=3s  → "Memory usage: 0.43%"
//    t=6s  → "Memory usage: 0.52%"
//    t=9s  → "Memory usage: 0.41%"
//    ... forever ...