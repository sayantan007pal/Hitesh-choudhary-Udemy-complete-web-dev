/**
 * Promise.any - First Successful Resolution
 * ==========================================
 * 
 * INTERVIEW IMPORTANCE: ⭐⭐⭐⭐ (High)
 * 
 * Promise.any() returns the first promise that FULFILLS (succeeds).
 * It ignores rejections unless ALL promises reject.
 * 
 * Comparison:
 * - Promise.race: First to SETTLE (resolve OR reject)
 * - Promise.any:  First to FULFILL (resolve only)
 * 
 * Use Case: Load from fastest server, fallback mirrors, etc.
 */


// =============================================================================
// Challenge: Fastest Server Selector
// =============================================================================
/**
 * You have multiple servers that can serve the same content.
 * You want to get data from whichever responds first with success.
 * 
 * TASK 1: Implement fetchFromServer(serverId, delay, shouldFail)
 *   - Returns a promise that settles after 'delay' milliseconds
 *   - If shouldFail is true, reject with Error("Server serverId failed")
 *   - If shouldFail is false, resolve with { server: serverId, data: "Response from serverId" }
 * 
 * TASK 2: Implement getFastestResponse(serverConfigs)
 *   - Takes array of { id: string, delay: number, shouldFail: boolean }
 *   - Uses Promise.any to get the first successful response
 *   - If ALL servers fail, return { error: "All servers failed", failures: [error messages] }
 *   - Otherwise return the first successful server response
 * 
 * TASK 3: Implement raceWithFallback(primaryPromise, fallbackPromise, timeout)
 *   - First try the primary promise
 *   - If primary fails OR takes longer than timeout, use fallback
 *   - Uses Promise.any with a timeout wrapper
 *   - Returns the first successful result or { error: "Both failed" }
 * 
 * Example Usage:
 *   const servers = [
 *     { id: "slow", delay: 500, shouldFail: false },
 *     { id: "fast", delay: 100, shouldFail: false },
 *     { id: "medium", delay: 200, shouldFail: false }
 *   ];
 *   
 *   const result = await getFastestResponse(servers);
 *   console.log(result); // { server: "fast", data: "Response from fast" }
 */


function fetchFromServer(serverId, delay, shouldFail) {
    // ==================== YOUR CODE HERE ====================
    // Return a promise that resolves or rejects after the specified delay
    
    
    
    // ========================================================
}


async function getFastestResponse(serverConfigs) {
    // ==================== YOUR CODE HERE ====================
    // Use Promise.any to get the first successful response
    // Handle AggregateError when all promises fail
    
    
    
    // ========================================================
}


async function raceWithFallback(primaryPromise, fallbackPromise, timeout) {
    // ==================== YOUR CODE HERE ====================
    // Race primary against timeout, with fallback as backup
    // Use Promise.any to handle the race
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    fetchFromServer,
    getFastestResponse,
    raceWithFallback
};
