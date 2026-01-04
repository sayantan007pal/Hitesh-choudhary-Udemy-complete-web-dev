/**
 * Challenge 10: Advanced Async Patterns (Retry, Timeout, Debounce)
 * =================================================================
 * 
 * Real-world patterns you'll use in production code!
 */


// Task 1: Retry on Failure
// Create retry(asyncFn, maxRetries) that:
// - Calls asyncFn
// - If it fails, retries up to maxRetries times
// - Returns result on success, throws after all retries exhausted
// Example: retry(() => fetchData(), 3) - tries up to 3 times
async function retry(asyncFn, maxRetries) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Task 2: Promise with Timeout
// Create withTimeout(promise, timeoutMs) that:
// - Races the promise against a timeout
// - Resolves with promise result if fast enough
// - Rejects with Error("Timeout") if too slow
async function withTimeout(promise, timeoutMs) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Task 3: Debounced Async Function
// Create debounceAsync(fn, delayMs) that:
// - Returns a debounced version of fn
// - Only executes fn after delayMs of no calls
// - Returns a Promise that resolves with fn's result
function debounceAsync(fn, delayMs) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


module.exports = { retry, withTimeout, debounceAsync };
