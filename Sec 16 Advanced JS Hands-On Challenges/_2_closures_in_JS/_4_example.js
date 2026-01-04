/**
 * Loop Closure Problem - The Classic Interview Question!
 * =======================================================
 * 
 * This is THE most commonly asked closure interview question.
 * Understanding this problem shows you truly understand how closures work.
 * 
 * The Problem:
 *   When using 'var' in a loop with setTimeout/callbacks, all callbacks
 *   share the same variable and get the final value instead of each iteration's value.
 */


// =============================================================================
// Task: Fix the Loop Closure Problem
// =============================================================================
/**
 * PART A: createFunctionArray(n)
 * ------------------------------
 * Create a function that returns an array of n functions.
 * Each function should return its creation index (0 to n-1).
 * 
 * ❌ WRONG BEHAVIOR (the bug to avoid):
 *   const fns = createFunctionArray(3);
 *   console.log(fns[0]()); // 3 (wrong!)
 *   console.log(fns[1]()); // 3 (wrong!)
 *   console.log(fns[2]()); // 3 (wrong!)
 * 
 * ✅ CORRECT BEHAVIOR (what you must achieve):
 *   const fns = createFunctionArray(3);
 *   console.log(fns[0]()); // 0
 *   console.log(fns[1]()); // 1
 *   console.log(fns[2]()); // 2
 * 
 * Parameters:
 *   - n: Number of functions to create
 * 
 * Requirements:
 *   - Must work correctly (each function returns its index)
 *   - You can use let, IIFE, or any closure technique
 * 
 * 
 * PART B: createDelayedLoggers(messages)
 * --------------------------------------
 * Create a function that takes an array of messages and returns an array
 * of functions. Each function, when called, returns its corresponding message.
 * 
 * Example Usage:
 *   const loggers = createDelayedLoggers(["first", "second", "third"]);
 *   console.log(loggers[0]()); // "first"
 *   console.log(loggers[1]()); // "second"
 *   console.log(loggers[2]()); // "third"
 * 
 * 
 * PART C: createCountdownFunctions(start)
 * ---------------------------------------
 * Create a function that returns an array of (start + 1) functions.
 * Each function returns the countdown value at that position.
 * 
 * Example Usage:
 *   const countdown = createCountdownFunctions(3);
 *   console.log(countdown[0]()); // 3
 *   console.log(countdown[1]()); // 2
 *   console.log(countdown[2]()); // 1
 *   console.log(countdown[3]()); // 0
 * 
 * 
 * 💡 Interview Tip:
 *    There are THREE common solutions to the loop closure problem:
 *    1. Use 'let' instead of 'var' (creates block scope)
 *    2. Use an IIFE (Immediately Invoked Function Expression)
 *    3. Use forEach or map (each callback gets its own scope)
 */

function createFunctionArray(n) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}

function createDelayedLoggers(messages) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}

function createCountdownFunctions(start) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createFunctionArray,
    createDelayedLoggers,
    createCountdownFunctions
};
