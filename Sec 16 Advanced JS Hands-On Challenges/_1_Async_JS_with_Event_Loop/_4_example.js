/**
 * Challenge 4: async/await Fundamentals
 * ======================================
 * 
 * This challenge tests your understanding of async functions,
 * the await keyword, and how they work with Promises.
 */


// =============================================================================
// Task 1: Convert Promise Chain to Async/Await
// =============================================================================
/**
 * The following function uses Promise chains. Your task is to create
 * an equivalent function using async/await syntax.
 * 
 * Original (for reference):
 * function fetchUserDataWithPromise(userId) {
 *     return new Promise((resolve) => {
 *         setTimeout(() => resolve({ id: userId, name: "User_" + userId }), 100);
 *     });
 * }
 * 
 * Create: fetchUserWithAsyncAwait(userId) that:
 * - Is an async function
 * - Awaits the helper function getUserById (provided below)
 * - Returns the user object directly (not a Promise chain)
 * 
 * Helper function (already implemented for you):
 */

function getUserById(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: userId, name: "User_" + userId }), 100);
    });
}

async function fetchUserWithAsyncAwait(userId) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Sequential Async Operations
// =============================================================================
/**
 * Create a function getFullUserProfile(userId) that:
 * - Fetches user data using getUserById(userId)
 * - Then fetches user posts using getUserPosts(userId) (provided below)
 * - Returns a combined object: { user: {...}, posts: [...] }
 * - These operations should happen SEQUENTIALLY (one after another)
 * 
 * Helper functions (already implemented):
 */

function getUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve([
            { postId: 1, title: "Post 1 by " + userId },
            { postId: 2, title: "Post 2 by " + userId }
        ]), 100);
    });
}

async function getFullUserProfile(userId) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Async Function Return Value
// =============================================================================
/**
 * Create a function processData(data) that:
 * - Is an async function
 * - Simulates processing by waiting 50ms (use the delay helper provided)
 * - Returns the processed result: "Processed: " + data.toUpperCase()
 * 
 * Remember: async functions ALWAYS return a Promise!
 * 
 * Helper function:
 */

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function processData(data) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    getUserById,
    getUserPosts,
    delay,
    fetchUserWithAsyncAwait,
    getFullUserProfile,
    processData
};
