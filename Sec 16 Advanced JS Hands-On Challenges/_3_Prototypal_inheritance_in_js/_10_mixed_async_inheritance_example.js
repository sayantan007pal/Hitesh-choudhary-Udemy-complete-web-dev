/**
 * Mixed Async + Inheritance Challenge
 * =====================================
 * 
 * Final boss challenge combining prototypal inheritance with async patterns.
 * Tests comprehensive understanding of both topics together.
 */


// =============================================================================
// Task: Build an Async Data Service with Inheritance
// =============================================================================
/**
 * Create a class hierarchy for data services:
 * 
 * DataService (Base Class):
 *   - Constructor: (baseUrl)
 *   - Properties: baseUrl, cache (empty Map)
 *   - Methods:
 *     - async fetch(endpoint): Simulates API call, returns `Data from ${baseUrl}${endpoint}`
 *                              Should delay 50ms to simulate network
 *     - async fetchWithCache(endpoint): Returns cached value if exists,
 *                                       otherwise fetches, caches, and returns
 *     - clearCache(): Clears the cache Map
 *     - getCacheSize(): Returns number of cached items
 * 
 * 
 * UserService (extends DataService):
 *   - Constructor: (baseUrl) - calls super, sets baseUrl to `${baseUrl}/users`
 *   - Methods:
 *     - async getUser(id): Fetches `/${id}` and returns parsed "user" object
 *                          Returns: { id, data: fetchResult }
 *     - async getUsers(ids): Fetches all users in PARALLEL, returns array of user objects
 *     - async getUserSequential(ids): Fetches all users SEQUENTIALLY
 * 
 * 
 * CachedUserService (extends UserService):
 *   - Constructor: (baseUrl, ttlMs) - ttlMs is cache time-to-live in milliseconds
 *   - Properties: ttlMs, timestamps (Map to track when items were cached)
 *   - Methods:
 *     - async getUser(id): Override - uses cache with TTL
 *                          If cached AND not expired, return cached
 *                          Otherwise fetch, cache with timestamp, return
 *     - isExpired(id): Returns true if cached item is older than ttlMs
 *     - async refreshUser(id): Force-fetches and updates cache regardless of TTL
 * 
 * 
 * Example Usage:
 *   const service = new CachedUserService('https://api.example.com', 5000);
 *   
 *   // First call fetches from "network"
 *   const user1 = await service.getUser(1);
 *   // { id: 1, data: 'Data from https://api.example.com/users/1' }
 *   
 *   // Second call within 5 seconds returns cached
 *   const user1Again = await service.getUser(1);  // Instant, from cache
 *   
 *   // getUsers fetches in parallel
 *   const users = await service.getUsers([1, 2, 3]);
 *   // Three user objects, fetched concurrently
 */

// Helper function - DO NOT MODIFY
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


class DataService {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ========================================================
}


class UserService extends DataService {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    
    // ========================================================
}


class CachedUserService extends UserService {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    
    
    
    // ========================================================
}


module.exports = {
    DataService,
    UserService,
    CachedUserService,
    delay
};
