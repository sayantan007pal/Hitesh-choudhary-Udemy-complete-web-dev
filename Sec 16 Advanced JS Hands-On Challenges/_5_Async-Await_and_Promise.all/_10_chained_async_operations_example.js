/**
 * Chained Async Operations
 * =========================
 * 
 * INTERVIEW IMPORTANCE: ⭐⭐⭐⭐⭐ (Very High - Real World Pattern!)
 * 
 * Many real apps require chaining dependent async operations:
 * 1. Fetch user → 2. Fetch user's orders → 3. Fetch order details
 * 
 * Key Skills:
 * - Sequential dependent operations
 * - Parallel independent operations within a chain
 * - Combining Promise.all with sequential awaits
 */


// =============================================================================
// Challenge: E-Commerce Data Fetcher
// =============================================================================
/**
 * Build a data pipeline that fetches related e-commerce data.
 * 
 * TASK 1: Implement fetchUser(userId)
 *   - Delay 50ms
 *   - Returns { id: userId, name: "User_" + userId }
 * 
 * TASK 2: Implement fetchUserOrders(userId)
 *   - Delay 50ms
 *   - Returns array of order objects:
 *     [{ orderId: 1, userId, total: 100 }, { orderId: 2, userId, total: 200 }]
 * 
 * TASK 3: Implement fetchOrderDetails(orderId)
 *   - Delay 50ms
 *   - Returns { orderId, items: ["Item A", "Item B"], status: "shipped" }
 * 
 * TASK 4: Implement fetchCompleteUserData(userId)
 *   - Chain: fetchUser → fetchUserOrders → fetchOrderDetails (for each order)
 *   - Use Promise.all to fetch all order details in parallel
 *   - Return combined object:
 *     {
 *       user: { id, name },
 *       orders: [
 *         { orderId, total, items, status },
 *         ...
 *       ]
 *     }
 * 
 * TASK 5: Implement fetchMultipleUsersData(userIds)
 *   - Fetches complete data for multiple users
 *   - Uses Promise.all to fetch users in parallel
 *   - Returns array of complete user data
 * 
 * Example Usage:
 *   const data = await fetchCompleteUserData(42);
 *   console.log(data);
 *   // {
 *   //   user: { id: 42, name: "User_42" },
 *   //   orders: [
 *   //     { orderId: 1, total: 100, items: [...], status: "shipped" },
 *   //     { orderId: 2, total: 200, items: [...], status: "shipped" }
 *   //   ]
 *   // }
 */


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function fetchUser(userId) {
    // ==================== YOUR CODE HERE ====================
    // Fetch user by ID with 50ms delay
    
    
    
    // ========================================================
}


async function fetchUserOrders(userId) {
    // ==================== YOUR CODE HERE ====================
    // Fetch orders for user with 50ms delay
    // Return 2 orders per user
    
    
    
    // ========================================================
}


async function fetchOrderDetails(orderId) {
    // ==================== YOUR CODE HERE ====================
    // Fetch order details with 50ms delay
    
    
    
    // ========================================================
}


async function fetchCompleteUserData(userId) {
    // ==================== YOUR CODE HERE ====================
    // Chain: user → orders → order details (parallel)
    // Combine into single complete object
    
    
    
    // ========================================================
}


async function fetchMultipleUsersData(userIds) {
    // ==================== YOUR CODE HERE ====================
    // Fetch complete data for multiple users in parallel
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    fetchUser,
    fetchUserOrders,
    fetchOrderDetails,
    fetchCompleteUserData,
    fetchMultipleUsersData
};
