/**
 * Promise.allSettled - Handle Mixed Success/Failure
 * ==================================================
 * 
 * INTERVIEW IMPORTANCE: ⭐⭐⭐⭐⭐ (Very High)
 * 
 * Key Difference:
 * - Promise.all: Fails FAST if ANY promise rejects (all or nothing)
 * - Promise.allSettled: Waits for ALL promises, returns status for each
 * 
 * Use Promise.allSettled when you need results from ALL promises,
 * even if some fail!
 */


// =============================================================================
// Challenge: Resilient Multi-API Fetcher
// =============================================================================
/**
 * You're building a dashboard that fetches data from multiple APIs.
 * Some APIs may be down or return errors, but you still want to
 * display data from the APIs that succeeded.
 * 
 * TASK 1: Implement fetchFromAPI(apiName, shouldFail)
 *   - Returns a promise that resolves after 100ms
 *   - If shouldFail is true, reject with Error("API_NAME failed")
 *   - If shouldFail is false, resolve with { source: apiName, data: "Data from API_NAME" }
 * 
 * TASK 2: Implement fetchAllAPIs(apiConfigs)
 *   - Takes an array of { name: string, shouldFail: boolean }
 *   - Uses Promise.allSettled to fetch from all APIs
 *   - Returns an object with:
 *     {
 *       successful: [ { source: "api1", data: "..." }, ... ],
 *       failed: [ { source: "api2", error: "api2 failed" }, ... ]
 *     }
 * 
 * TASK 3: Implement getSuccessRate(results)
 *   - Takes the result from fetchAllAPIs
 *   - Returns the success rate as a percentage (0-100)
 *   - Formula: (successful.length / total) * 100
 * 
 * Example Usage:
 *   const configs = [
 *     { name: "users", shouldFail: false },
 *     { name: "orders", shouldFail: true },
 *     { name: "products", shouldFail: false }
 *   ];
 *   
 *   const results = await fetchAllAPIs(configs);
 *   console.log(results);
 *   // {
 *   //   successful: [
 *   //     { source: "users", data: "Data from users" },
 *   //     { source: "products", data: "Data from products" }
 *   //   ],
 *   //   failed: [
 *   //     { source: "orders", error: "orders failed" }
 *   //   ]
 *   // }
 *   
 *   console.log(getSuccessRate(results)); // 66.67 (2/3 succeeded)
 */


function fetchFromAPI(apiName, shouldFail) {
    // ==================== YOUR CODE HERE ====================
    // Return a promise that resolves or rejects after 100ms based on shouldFail
    
    
    
    // ========================================================
}


async function fetchAllAPIs(apiConfigs) {
    // ==================== YOUR CODE HERE ====================
    // Use Promise.allSettled to fetch from all APIs
    // Separate results into successful and failed arrays
    
    
    
    // ========================================================
}


function getSuccessRate(results) {
    // ==================== YOUR CODE HERE ====================
    // Calculate success rate as percentage
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    fetchFromAPI,
    fetchAllAPIs,
    getSuccessRate
};
