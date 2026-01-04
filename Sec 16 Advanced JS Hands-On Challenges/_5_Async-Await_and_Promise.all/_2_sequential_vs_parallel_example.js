/**
 * Sequential vs Parallel Execution with Async/Await
 * ==================================================
 * 
 * INTERVIEW IMPORTANCE: ⭐⭐⭐⭐⭐ (Very High)
 * 
 * One of the most common mistakes developers make is using sequential await
 * when operations could run in parallel. This can cause massive performance issues!
 * 
 * Key Concept:
 * - Sequential: await A → await B → await C (Total time: A + B + C)
 * - Parallel: await Promise.all([A, B, C]) (Total time: max(A, B, C))
 */


// =============================================================================
// Challenge: Refactor Sequential to Parallel
// =============================================================================
/**
 * You have three data fetching functions:
 *   - fetchUserProfile(userId): Returns user after 300ms
 *   - fetchUserPosts(userId): Returns posts array after 400ms
 *   - fetchUserFriends(userId): Returns friends array after 200ms
 * 
 * TASK 1: Implement the three fetch functions
 *   - fetchUserProfile(userId) → { id: userId, name: "User_" + userId, email: userId + "@example.com" }
 *   - fetchUserPosts(userId) → ["Post 1 by " + userId, "Post 2 by " + userId]
 *   - fetchUserFriends(userId) → ["Friend_A", "Friend_B", "Friend_C"]
 * 
 * TASK 2: Implement fetchUserDataSequential(userId)
 *   - Fetches all three pieces of data SEQUENTIALLY (one after another)
 *   - This is the SLOW way - for demonstration
 *   - Returns: { profile: {...}, posts: [...], friends: [...] }
 * 
 * TASK 3: Implement fetchUserDataParallel(userId)
 *   - Fetches all three pieces of data IN PARALLEL using Promise.all
 *   - This is the FAST way - use this in real apps!
 *   - Returns: { profile: {...}, posts: [...], friends: [...] }
 * 
 * The parallel version should complete in ~400ms (max delay)
 * The sequential version should complete in ~900ms (sum of all delays)
 * 
 * Example Usage:
 *   const result = await fetchUserDataParallel(42);
 *   console.log(result);
 *   // {
 *   //   profile: { id: 42, name: "User_42", email: "42@example.com" },
 *   //   posts: ["Post 1 by 42", "Post 2 by 42"],
 *   //   friends: ["Friend_A", "Friend_B", "Friend_C"]
 *   // }
 */


function fetchUserProfile(userId) {
    // ==================== YOUR CODE HERE ====================
    // Return a promise that resolves after 300ms with user profile object
    
    
    
    // ========================================================
}

function fetchUserPosts(userId) {
    // ==================== YOUR CODE HERE ====================
    // Return a promise that resolves after 400ms with posts array
    
    
    
    // ========================================================
}

function fetchUserFriends(userId) {
    // ==================== YOUR CODE HERE ====================
    // Return a promise that resolves after 200ms with friends array
    
    
    
    // ========================================================
}


async function fetchUserDataSequential(userId) {
    // ==================== YOUR CODE HERE ====================
    // Fetch profile, posts, and friends SEQUENTIALLY (one by one)
    // This is intentionally slow - for comparison purposes
    
    
    
    // ========================================================
}


async function fetchUserDataParallel(userId) {
    // ==================== YOUR CODE HERE ====================
    // Fetch profile, posts, and friends IN PARALLEL using Promise.all
    // This is the optimized version - much faster!
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    fetchUserProfile,
    fetchUserPosts,
    fetchUserFriends,
    fetchUserDataSequential,
    fetchUserDataParallel
};
