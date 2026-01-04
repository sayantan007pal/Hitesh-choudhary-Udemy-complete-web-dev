/**
 * Async Generators - Challenge 8
 * ===============================
 * Topic: async function* and for await...of
 */


// =============================================================================
// Task 1: Basic Async Generator
// =============================================================================
/**
 * Create asyncCounter(max, delayMs) that:
 *   - Yields numbers 1 to max
 *   - Waits delayMs between each yield
 *   - Use async function* and await
 * 
 * Example:
 *   for await (const num of asyncCounter(3, 100)) {
 *     console.log(num); // 1, 2, 3 (with 100ms delay between)
 *   }
 */

async function* asyncCounter(max, delayMs) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Async Data Fetcher Generator
// =============================================================================
/**
 * Create asyncDataFetcher(urls) that:
 *   - Takes an array of URLs (simulated as strings)
 *   - Yields each URL's "data" after a delay (simulate fetch)
 *   - Format: { url: string, data: `Data from ${url}` }
 */

async function* asyncDataFetcher(urls) {
    // ==================== YOUR CODE HERE ====================
    // Simulate fetch with: await new Promise(r => setTimeout(r, 50));
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Async Paginator
// =============================================================================
/**
 * Create asyncPaginator(items, pageSize) that:
 *   - Takes array of items and page size
 *   - Yields pages (arrays) of items
 *   - Each page has at most pageSize items
 *   - Small delay between pages (simulate API)
 */

async function* asyncPaginator(items, pageSize) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


module.exports = { asyncCounter, asyncDataFetcher, asyncPaginator };
