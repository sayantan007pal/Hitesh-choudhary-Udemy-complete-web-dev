/**
 * Challenge 3: Promise Rejection and Error Handling
 * ==================================================
 * 
 * This challenge tests your understanding of Promise rejection,
 * error handling with try/catch, and the .catch() method.
 */


// =============================================================================
// Task 1: Create a Rejecting Promise
// =============================================================================
/**
 * Create a function createRejectedPromise(errorMessage) that:
 * - Returns a Promise that immediately rejects with an Error containing the message
 * 
 * Example:
 *   createRejectedPromise("Something went wrong!")
 *     .catch(err => console.log(err.message)); // "Something went wrong!"
 */

function createRejectedPromise(errorMessage) {
    // ==================== YOUR CODE HERE ====================
    return new Promise((resolve, reject)=>{
        reject(new Error(errorMessage))
    })
    
    
    
    // ========================================================
}


// function createRejectedPromise(errorMessage) {
//     // ==================== YOUR CODE HERE ====================
//     return new Promise((resolve, reject)=>{
//         try {
            
//         } catch (errorMessage) {
//             reject(errorMessage)
//         } 
//     })
    
    
    
//     // ========================================================
// }

// =============================================================================
// Task 2: Conditional Resolve/Reject
// =============================================================================
/**
 * Create a function validateNumber(num) that:
 * - Returns a Promise
 * - If num is a positive number (> 0), resolves with "Valid number: [num]"
 * - If num is zero or negative, rejects with Error "Invalid: number must be positive"
 * - If num is not a number, rejects with Error "Invalid: not a number"
 * 
 * Examples:
 *   validateNumber(5).then(msg => console.log(msg));  // "Valid number: 5"
 *   validateNumber(-3).catch(e => console.log(e.message));  // "Invalid: number must be positive"
 *   validateNumber("abc").catch(e => console.log(e.message));  // "Invalid: not a number"
 */

function validateNumber(num) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Safe Async Wrapper with Error Handling
// =============================================================================
/**
 * Create a function safeAsyncCall(asyncFn) that:
 * - Takes an async function as an argument
 * - Returns a Promise that:
 *   - Resolves with { success: true, data: result } if asyncFn succeeds
 *   - Resolves with { success: false, error: errorMessage } if asyncFn fails
 * - The wrapper should NEVER reject - it always resolves with a result object
 * 
 * This pattern is useful for handling errors gracefully without try/catch everywhere!
 * 
 * Examples:
 *   const successFn = async () => "data";
 *   const failFn = async () => { throw new Error("failed!"); };
 *   
 *   safeAsyncCall(successFn).then(r => console.log(r)); // { success: true, data: "data" }
 *   safeAsyncCall(failFn).then(r => console.log(r)); // { success: false, error: "failed!" }
 */

function safeAsyncCall(asyncFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createRejectedPromise,
    validateNumber,
    safeAsyncCall
};
