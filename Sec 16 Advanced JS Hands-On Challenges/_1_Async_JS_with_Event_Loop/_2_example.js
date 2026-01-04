/**
 * Challenge 2: Promise Creation and Resolution
 * =============================================
 * 
 * This challenge tests your understanding of creating Promises
 * and resolving them with values.
 */


// =============================================================================
// Task 1: Create a Promise that Resolves Immediately
// =============================================================================
/**
 * Create a function createResolvedPromise(value) that:
 * - Returns a Promise that immediately resolves with the given value
 * 
 * Example:
 *   createResolvedPromise("hello").then(data => console.log(data)); // "hello"
 */

async function createResolvedPromise(value) {
    // ==================== YOUR CODE HERE ====================
    
    return new Promise((resolve, reject)=>{
        resolve(value)
    })
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Create a Promise with Delayed Resolution
// =============================================================================
/**
 * Create a function delayedResolve(value, delayMs) that:
 * - Returns a Promise that resolves with the given value after delayMs milliseconds
 * 
 * Example:
 *   delayedResolve("delayed!", 1000).then(data => console.log(data)); 
 *   // After 1 second: "delayed!"
 */

function delayedResolve(value, delayMs) {
    // ==================== YOUR CODE HERE ====================
    
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(value)
        }, delayMs);
    })
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Promise-based Data Transformation
// =============================================================================
/**
 * Create a function transformAsync(inputValue, transformFn) that:
 * - Takes an input value and a transformation function
 * - Returns a Promise that resolves with the transformed value after 100ms
 * 
 * Example:
 *   transformAsync(5, x => x * 2).then(result => console.log(result)); // 10
 *   transformAsync("hello", s => s.toUpperCase()).then(r => console.log(r)); // "HELLO"
 */

function transformAsync(inputValue, transformFn) {
    // ==================== YOUR CODE HERE ====================
    
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(transformFn(inputValue))
            
        }, 100);
    })
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createResolvedPromise,
    delayedResolve,
    transformAsync
};
