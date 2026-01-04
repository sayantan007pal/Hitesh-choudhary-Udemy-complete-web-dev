/**
 * Async/Await Deep Dive
 * ======================
 * 
 * Mastering async/await, error handling with try/catch,
 * parallel vs sequential execution, and common patterns.
 */


// =============================================================================
// Task: Implement Async/Await Patterns
// =============================================================================
/**
 * PART A: fetchWithTimeout(promiseFn, timeoutMs)
 * ----------------------------------------------
 * Execute a promise-returning function with a timeout.
 * If the promise doesn't resolve within timeoutMs, reject with error:
 *   "Operation timed out after {timeoutMs}ms"
 * 
 * If the promise resolves in time, return its value.
 * If the promise rejects, propagate that rejection.
 * 
 * Example:
 *   const slow = () => new Promise(r => setTimeout(() => r('done'), 5000));
 *   await fetchWithTimeout(slow, 1000); // Rejects: "Operation timed out after 1000ms"
 *   
 *   const fast = () => Promise.resolve('quick');
 *   await fetchWithTimeout(fast, 1000); // Returns: 'quick'
 * 
 * 
 * PART B: parallelLimit(tasks, limit)
 * -----------------------------------
 * Execute an array of promise-returning functions with a concurrency limit.
 * At most 'limit' promises should be running at any time.
 * Return results in the same order as the input tasks.
 * 
 * Example:
 *   const tasks = [
 *     () => delay(100).then(() => 'A'),
 *     () => delay(50).then(() => 'B'),
 *     () => delay(75).then(() => 'C'),
 *   ];
 *   await parallelLimit(tasks, 2); // ['A', 'B', 'C'] (max 2 running at once)
 * 
 * 
 * PART C: asyncQueue(concurrency)
 * -------------------------------
 * Create an async task queue that processes tasks with limited concurrency.
 * Returns an object with:
 *   - add(taskFn): Adds a task to the queue, returns a promise for its result
 *   - size(): Returns number of tasks waiting (not including running)
 *   - running(): Returns number of currently running tasks
 * 
 * Example:
 *   const queue = asyncQueue(2);  // Max 2 concurrent
 *   
 *   const result1 = queue.add(() => delay(100).then(() => 'first'));
 *   const result2 = queue.add(() => delay(50).then(() => 'second'));
 *   const result3 = queue.add(() => delay(25).then(() => 'third'));
 *   
 *   queue.running(); // 2 (first two are running)
 *   queue.size();    // 1 (third is waiting)
 *   
 *   await result1;   // 'first'
 *   await result3;   // 'third' (started after one of first two completed)
 */

// Helper function - DO NOT MODIFY
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function fetchWithTimeout(promiseFn, timeoutMs) {
    // ==================== YOUR CODE HERE ====================
    // Hint: Use Promise.race() with a timeout promise
    
    
    
    
    
    
    // ========================================================
}


async function parallelLimit(tasks, limit) {
    // ==================== YOUR CODE HERE ====================
    // Hint: Track running promises, start new ones as others complete
    
    
    
    
    
    
    
    
    // ========================================================
}


function asyncQueue(concurrency) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    
    // ========================================================
}


module.exports = {
    fetchWithTimeout,
    parallelLimit,
    asyncQueue,
    delay  // Export for testing
};
