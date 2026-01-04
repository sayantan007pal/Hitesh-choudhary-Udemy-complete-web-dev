/**
 * Challenge 8: Microtask vs Macrotask Queue
 * ==========================================
 * 
 * Deep dive into the TWO queues that power async JavaScript!
 * Microtasks (Promises) have PRIORITY over Macrotasks (setTimeout)
 */


// Task 1: Microtask Priority
// Create queueMicrotaskDemo() that demonstrates microtask priority
// Add "macro" via setTimeout(0), "micro" via queueMicrotask, "sync" synchronously
// Return order array - Expected: ["sync", "micro", "macro"]
async function queueMicrotaskDemo() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Task 2: Multiple Microtasks Before Macrotask
// Create multiMicrotaskDemo() showing multiple microtasks run before ANY macrotask
// Queue: setTimeout("macro"), then 3 Promise.resolve microtasks
// Return execution order array
// Expected: ["sync", "micro1", "micro2", "micro3", "macro"]
async function multiMicrotaskDemo() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Task 3: Interleaved Queues
// Create interleavedDemo() that queues tasks in this order:
// 1. setTimeout (macro1)
// 2. Promise (micro1) - inside micro1, queue another Promise (micro2)
// 3. setTimeout (macro2)
// 4. log "sync"
// Return the execution order
// Expected: ["sync", "micro1", "micro2", "macro1", "macro2"]
async function interleavedDemo() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


module.exports = { queueMicrotaskDemo, multiMicrotaskDemo, interleavedDemo };
