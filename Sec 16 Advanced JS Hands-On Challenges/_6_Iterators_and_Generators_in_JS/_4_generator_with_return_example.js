/**
 * Generator Return vs Yield - Challenge 4
 * ========================================
 * 
 * Topic: Understanding return vs yield and early termination
 * 
 * In generators:
 * - yield: pauses and returns a value, can resume later
 * - return: terminates the generator immediately with done: true
 * - .return(value): forces generator to terminate with given value
 */


// =============================================================================
// Task 1: Generator with Final Return Value
// =============================================================================
/**
 * Create a generator function countdownWithMessage(start) that:
 *   - Yields numbers from start down to 1
 *   - Returns the string "Liftoff! 🚀" when countdown completes
 * 
 * Note: The return value will only appear when done is true!
 * 
 * Example Usage:
 *   const countdown = countdownWithMessage(3);
 *   console.log(countdown.next()); // { value: 3, done: false }
 *   console.log(countdown.next()); // { value: 2, done: false }
 *   console.log(countdown.next()); // { value: 1, done: false }
 *   console.log(countdown.next()); // { value: "Liftoff! 🚀", done: true }
 */

function* countdownWithMessage(start) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Early Termination with .return()
// =============================================================================
/**
 * Create a generator function resourceGenerator() that:
 *   - Yields strings: "Resource 1", "Resource 2", "Resource 3", etc.
 *   - Has a finally block that yields "Cleanup complete" when terminated
 * 
 * The finally block should execute whether the generator ends naturally
 * or is terminated early with .return().
 * 
 * Example Usage:
 *   const resources = resourceGenerator();
 *   console.log(resources.next().value); // "Resource 1"
 *   console.log(resources.next().value); // "Resource 2"
 *   console.log(resources.return('Stopped').value); // "Cleanup complete"
 *   console.log(resources.next().value); // "Stopped" (done: true)
 * 
 * Hint: Use try...finally with a yield inside finally!
 */

function* resourceGenerator() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Conditional Generator with Early Exit
// =============================================================================
/**
 * Create a generator function processItems(items, shouldStop) that:
 *   - Takes an array of items and a callback function shouldStop
 *   - Yields each item one by one
 *   - If shouldStop(item) returns true, immediately RETURN with message
 *     "Stopped at: {item}"
 *   - If all items processed, return "All items processed"
 * 
 * Example Usage:
 *   const gen = processItems([1, 2, 3, 4, 5], (item) => item === 3);
 *   console.log(gen.next()); // { value: 1, done: false }
 *   console.log(gen.next()); // { value: 2, done: false }
 *   console.log(gen.next()); // { value: "Stopped at: 3", done: true }
 *   
 *   const gen2 = processItems(['a', 'b'], () => false);
 *   console.log([...gen2]); // ['a', 'b'] (return value not captured by spread)
 */

function* processItems(items, shouldStop) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    countdownWithMessage,
    resourceGenerator,
    processItems
};
