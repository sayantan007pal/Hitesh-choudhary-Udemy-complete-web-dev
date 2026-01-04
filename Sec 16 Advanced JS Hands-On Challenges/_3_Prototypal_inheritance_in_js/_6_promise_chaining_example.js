/**
 * Promise Chaining Mastery
 * =========================
 * 
 * Deep understanding of Promise chains, .then() return values,
 * error propagation, and chained transformations.
 */


// =============================================================================
// Task: Build Promise Chain Utilities
// =============================================================================
/**
 * PART A: chainedFetch(urls)
 * --------------------------
 * Given an array of URLs (simulated), fetch them sequentially (not parallel).
 * Each "fetch" should use the simulateFetch function provided below.
 * Return a promise that resolves with an array of all results in order.
 * 
 * If any fetch fails, the entire chain should reject with that error.
 * 
 * Example:
 *   await chainedFetch(['/api/1', '/api/2', '/api/3']);
 *   // Returns: ['Data from /api/1', 'Data from /api/2', 'Data from /api/3']
 * 
 * 
 * PART B: retryPromise(promiseFn, maxRetries)
 * -------------------------------------------
 * Create a function that retries a promise-returning function up to maxRetries times.
 * Returns a promise that:
 *   - Resolves with the value if any attempt succeeds
 *   - Rejects with the last error if all attempts fail
 * 
 * Example:
 *   let attempts = 0;
 *   const flaky = () => {
 *     attempts++;
 *     if (attempts < 3) return Promise.reject('Failed');
 *     return Promise.resolve('Success!');
 *   };
 *   await retryPromise(flaky, 5); // 'Success!' (succeeds on 3rd try)
 * 
 * 
 * PART C: promisePipeline(...transformFns)
 * ----------------------------------------
 * Create a function that returns a new function.
 * The returned function takes an initial value and pipes it through
 * all transform functions (which may be sync or async).
 * 
 * Each transform receives the result of the previous one.
 * 
 * Example:
 *   const addOne = x => x + 1;
 *   const double = x => Promise.resolve(x * 2);
 *   const toString = x => `Result: ${x}`;
 *   
 *   const pipeline = promisePipeline(addOne, double, toString);
 *   await pipeline(5);  // "Result: 12" -- (5+1)*2 = 12
 */

// Helper function - DO NOT MODIFY
function simulateFetch(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url.includes('error')) {
                reject(new Error(`Failed to fetch ${url}`));
            } else {
                resolve(`Data from ${url}`);
            }
        }, 10);
    });
}


function chainedFetch(urls) {
    // ==================== YOUR CODE HERE ====================
    // Hint: Use .reduce() with promise chaining
    
    
    
    
    
    // ========================================================
}


function retryPromise(promiseFn, maxRetries) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    // ========================================================
}


function promisePipeline(...transformFns) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}


module.exports = {
    chainedFetch,
    retryPromise,
    promisePipeline,
    simulateFetch  // Export for testing
};
