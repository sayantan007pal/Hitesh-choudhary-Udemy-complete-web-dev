/**
 * Challenge 7: Event Loop & Execution Order
 * ==========================================
 * 
 * This is THE MOST COMMON async interview question!
 * You MUST understand how the Event Loop determines execution order.
 */


// Task 1: Predict the Output Order
// Create predictOrder() that returns the ARRAY of log order for this code:
//   console.log("1");
//   setTimeout(() => console.log("2"), 0);
//   Promise.resolve().then(() => console.log("3"));
//   console.log("4");
// Return: ["1", "4", "3", "2"] - Explain WHY in your solution!
function predictOrder() {
    // ==================== YOUR CODE HERE ====================
    // Return the array representing the order of execution
    
    
    
    // ========================================================
}


// Task 2: Create Execution Demonstrator
// Create demonstrateEventLoop() that:
// - Uses an array to collect logs in order
// - Executes sync code, setTimeout, Promise in specific order
// - Returns the collected array showing actual execution order
// Expected return: ["sync1", "sync2", "microtask", "macrotask"]
async function demonstrateEventLoop() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Task 3: Nested Async Execution Order
// Create nestedAsyncOrder() that demonstrates nested callbacks
// Execute: sync → promise1 → nested promise → setTimeout
// Return the execution order array
async function nestedAsyncOrder() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


module.exports = { predictOrder, demonstrateEventLoop, nestedAsyncOrder };
