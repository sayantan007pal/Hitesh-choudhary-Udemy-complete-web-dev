/**
 * Async-Await and Promise.all in JavaScript
 * ==========================================
 * 
 * async/await provides a cleaner way to work with Promises.
 * Promise.all runs multiple promises concurrently and waits for all to complete.
 * Promise.race returns the result of the first promise to settle.
 */


// =============================================================================
// Task 1: Async-Await with Promise.all
// =============================================================================
/**
 * Create two functions:
 *   - fetchUser(): Returns a promise that resolves with { id: 1, name: "John" } after 1 second
 *   - fetchPosts(): Returns a promise that resolves with ["Post 1", "Post 2"] after 1 second
 * 
 * Then create fetchAllData() that:
 *   - Uses async/await and Promise.all to fetch both simultaneously
 *   - Returns an object: { user: {...}, posts: [...] }
 * 
 * Example Usage:
 *   const result = await fetchAllData();
 *   console.log(result);
 *   // { user: { id: 1, name: "John" }, posts: ["Post 1", "Post 2"] }
 */

function fetchUser() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

function fetchPosts() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function fetchAllData() {
    // ==================== YOUR CODE HERE ====================
    // Use Promise.all to fetch both user and posts simultaneously
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Error Handling in Async/Await with Promise.all
// =============================================================================
/**
 * Write two functions:
 *   - fetchSuccess(): Returns a promise that resolves with "Data loaded" after 1 second
 *   - fetchFailure(): Returns a promise that rejects with Error("Failed to fetch") after 1 second
 * 
 * Create a function handlePromises() that:
 *   - Calls both functions using Promise.all
 *   - Returns "All succeeded: Data loaded" if all promises succeed
 *   - Returns "Error: Failed to fetch" if any promise fails
 * 
 * Note: When called with fetchSuccess and fetchSuccess, it should succeed.
 *       When called with fetchSuccess and fetchFailure, it should catch the error.
 */

function fetchSuccess() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

function fetchFailure() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function handlePromises(promise1, promise2) {
    // ==================== YOUR CODE HERE ====================
    // Use try/catch with Promise.all to handle success and failure
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Timeout with Async/Await and Promise.race
// =============================================================================
/**
 * Create a function fetchWithTimeout(promise, timeout) that:
 *   - Takes a promise and a timeout value in milliseconds
 *   - Uses Promise.race() to race the promise against a timeout
 *   - If the promise resolves within the timeout, return its result
 *   - If the timeout expires first, return "Timeout exceeded"
 * 
 * Example Usage:
 *   const slowPromise = new Promise(resolve => setTimeout(() => resolve("Done!"), 5000));
 *   const result = await fetchWithTimeout(slowPromise, 1000);
 *   console.log(result); // "Timeout exceeded" (because 5s > 1s timeout)
 *   
 *   const fastPromise = new Promise(resolve => setTimeout(() => resolve("Fast!"), 500));
 *   const result2 = await fetchWithTimeout(fastPromise, 1000);
 *   console.log(result2); // "Fast!" (completed before timeout)
 */

async function fetchWithTimeout(promise, timeout) {
    // ==================== YOUR CODE HERE ====================
    // Use Promise.race with the main promise and a timeout promise
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    fetchUser,
    fetchPosts,
    fetchAllData,
    fetchSuccess,
    fetchFailure,
    handlePromises,
    fetchWithTimeout
};