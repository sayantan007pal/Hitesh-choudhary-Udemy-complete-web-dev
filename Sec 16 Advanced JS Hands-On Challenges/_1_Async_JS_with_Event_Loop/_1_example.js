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
    
     console.log('Task started');
  setTimeout(() => {
    console.log('Task finished');
  }, 2000);
    
    
    
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

function simulateMultipleTasks() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
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