/**
 * Closures in JavaScript
 * =======================
 * 
 * Closures are functions that remember and can access variables from their
 * outer (enclosing) scope, even after the outer function has finished executing.
 */


// =============================================================================
// Task 1: Creating a Counter Using Closures
// =============================================================================
/**
 * Create a function createCounter() that returns a function which increments
 * and returns a counter value each time it is called.
 * 
 * The counter should start at 0 and increment by 1 on each call.
 * 
 * Example Usage:
 *   const counter = createCounter();
 *   console.log(counter()); // 1
 *   console.log(counter()); // 2
 *   console.log(counter()); // 3
 * 
 * Each counter instance should be independent:
 *   const counter1 = createCounter();
 *   const counter2 = createCounter();
 *   console.log(counter1()); // 1
 *   console.log(counter2()); // 1 (separate counter)
 */

function createCounter() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Rate Limiter Function
// =============================================================================
/**
 * Create a function rateLimiter(fn, limit) that returns a new function.
 * 
 * The returned function allows calling fn only once within a 'limit' time
 * in milliseconds. If it is called again before the limit is reached,
 * it should return "Rate limit exceeded".
 * 
 * Parameters:
 *   - fn: The function to rate limit
 *   - limit: Time in milliseconds before the function can be called again
 * 
 * Example Usage:
 *   const limitedFn = rateLimiter(() => "Success!", 1000);
 *   console.log(limitedFn()); // "Success!"
 *   console.log(limitedFn()); // "Rate limit exceeded" (if called within 1 second)
 *   // Wait 1 second...
 *   console.log(limitedFn()); // "Success!" (after 1 second)
 */

function rateLimiter(fn, limit) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Memoization Function
// =============================================================================
/**
 * Write a function memoize(fn) that returns a memoized version of fn.
 * 
 * The memoized function should cache the results of function calls,
 * and return the cached result if the same inputs are provided again.
 * 
 * For simplicity, assume the function takes a single argument.
 * 
 * Example Usage:
 *   const slowSquare = (n) => {
 *       console.log('Computing...');
 *       return n * n;
 *   };
 *   const memoizedSquare = memoize(slowSquare);
 *   
 *   console.log(memoizedSquare(5)); // Logs "Computing...", returns 25
 *   console.log(memoizedSquare(5)); // Returns 25 (no "Computing..." - cached!)
 *   console.log(memoizedSquare(6)); // Logs "Computing...", returns 36
 */

function memoize(fn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createCounter,
    rateLimiter,
    memoize
};