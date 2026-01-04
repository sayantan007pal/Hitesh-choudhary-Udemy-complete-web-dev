/**
 * Retry Mechanism with Async/Await
 * =================================
 * 
 * INTERVIEW IMPORTANCE: ⭐⭐⭐⭐⭐ (Very High - Real-World Pattern!)
 * 
 * Network requests can fail temporarily. A good retry mechanism:
 * - Retries a configurable number of times
 * - Uses exponential backoff (wait longer between each retry)
 * - Eventually gives up and throws the final error
 * 
 * Exponential Backoff: delay = baseDelay * (2 ^ attemptNumber)
 * Example: 100ms → 200ms → 400ms → 800ms → ...
 */


// =============================================================================
// Challenge: Resilient API Caller with Retry
// =============================================================================
/**
 * Implement a retry mechanism that handles transient failures gracefully.
 * 
 * TASK 1: Implement delay(ms)
 *   - Returns a promise that resolves after 'ms' milliseconds
 *   - Simple utility for waiting
 * 
 * TASK 2: Implement retryWithBackoff(asyncFn, options)
 *   - asyncFn: An async function that might fail
 *   - options: { maxRetries: number, baseDelay: number, onRetry?: function }
 *   - Retry the function up to maxRetries times
 *   - Use exponential backoff: delay = baseDelay * (2 ^ attempt)
 *   - Call onRetry(attempt, error) before each retry if provided
 *   - If all retries fail, throw the last error
 *   - If it succeeds, return the result
 * 
 * TASK 3: Implement createUnreliableAPI(failCount)
 *   - Returns an async function that fails the first 'failCount' times
 *   - After failing 'failCount' times, it succeeds with { success: true, attempt: n }
 *   - Each failure throws Error("API Error: Attempt N failed")
 * 
 * Example Usage:
 *   // API that fails 2 times then succeeds
 *   const unreliableAPI = createUnreliableAPI(2);
 *   
 *   const result = await retryWithBackoff(unreliableAPI, {
 *       maxRetries: 3,
 *       baseDelay: 100,
 *       onRetry: (attempt, err) => console.log(`Retry ${attempt}: ${err.message}`)
 *   });
 *   
 *   console.log(result); // { success: true, attempt: 3 }
 *   
 *   // Console output:
 *   // Retry 1: API Error: Attempt 1 failed
 *   // Retry 2: API Error: Attempt 2 failed
 */


function delay(ms) {
    // ==================== YOUR CODE HERE ====================
    // Return a promise that resolves after ms milliseconds
    
    
    
    // ========================================================
}


async function retryWithBackoff(asyncFn, options) {
    // ==================== YOUR CODE HERE ====================
    // Implement retry logic with exponential backoff
    // options = { maxRetries, baseDelay, onRetry? }
    
    
    
    // ========================================================
}


function createUnreliableAPI(failCount) {
    // ==================== YOUR CODE HERE ====================
    // Return an async function that fails failCount times, then succeeds
    // Use closure to track attempt count
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    delay,
    retryWithBackoff,
    createUnreliableAPI
};
