/**
 * Challenge 5: Sequential vs Parallel Execution
 * ==============================================
 * 
 * This challenge tests your understanding of when to run async operations
 * sequentially (one after another) vs in parallel (all at once).
 * This is a VERY IMPORTANT interview topic!
 */


// =============================================================================
// Helper Functions (provided - do not modify)
// =============================================================================

function fetchUser() {
    return new Promise(resolve => setTimeout(() => resolve({ id: 1, name: "John" }), 100));
}

function fetchPosts() {
    return new Promise(resolve => setTimeout(() => resolve(["Post 1", "Post 2"]), 100));
}

function fetchComments() {
    return new Promise(resolve => setTimeout(() => resolve(["Comment 1", "Comment 2"]), 100));
}


// =============================================================================
// Task 1: Sequential Fetch (Slow but Safe)
// =============================================================================
/**
 * Create a function fetchAllSequential() that:
 * - Fetches user, posts, and comments SEQUENTIALLY (one after another)
 * - Returns an object: { user, posts, comments }
 * - Total time should be ~300ms (100ms + 100ms + 100ms)
 * 
 * Use case: When each request depends on the previous one's result
 */

async function fetchAllSequential() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Parallel Fetch with Promise.all (Fast!)
// =============================================================================
/**
 * Create a function fetchAllParallel() that:
 * - Fetches user, posts, and comments IN PARALLEL (all at once)
 * - Returns an object: { user, posts, comments }
 * - Total time should be ~100ms (all run simultaneously!)
 * 
 * Use case: When requests are independent of each other
 */

async function fetchAllParallel() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Measure and Compare Execution Time
// =============================================================================
/**
 * Create a function measureExecutionTime(asyncFn) that:
 * - Takes an async function as an argument
 * - Executes the function
 * - Returns an object with: { result: <function result>, timeMs: <execution time in ms> }
 * 
 * This is useful for comparing sequential vs parallel performance!
 * 
 * Example:
 *   const { result, timeMs } = await measureExecutionTime(fetchAllParallel);
 *   console.log(`Took ${timeMs}ms`);
 */

async function measureExecutionTime(asyncFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    fetchUser,
    fetchPosts,
    fetchComments,
    fetchAllSequential,
    fetchAllParallel,
    measureExecutionTime
};
