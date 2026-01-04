/**
 * Concurrent Limit - Rate Limiting Promises
 * ==========================================
 * 
 * INTERVIEW IMPORTANCE: ⭐⭐⭐⭐⭐ (Very High - Advanced Pattern!)
 * 
 * Problem: Running too many concurrent operations can:
 * - Overwhelm APIs (rate limits)
 * - Exhaust system resources (memory, file handles)
 * - Cause network congestion
 * 
 * Solution: Process items in batches with a concurrency limit.
 * Instead of all 100 at once, process 5 at a time.
 */


// =============================================================================
// Challenge: Concurrent Promise Limiter
// =============================================================================
/**
 * You need to process many items but limit how many run at once.
 * 
 * TASK 1: Implement processWithLimit(items, limit, asyncFn)
 *   - items: Array of items to process
 *   - limit: Maximum concurrent operations (e.g., 3)
 *   - asyncFn: Async function that takes an item and returns a promise
 *   - Process all items with at most 'limit' running at once
 *   - Return array of results in the SAME ORDER as input
 * 
 * TASK 2: Implement processBatched(items, batchSize, asyncFn)
 *   - Process items in sequential batches
 *   - Each batch runs in parallel (using Promise.all)
 *   - Wait for batch to complete before starting next
 *   - Return array of results in order
 * 
 * TASK 3: Implement createConcurrencyTracker()
 *   - Returns an object to track concurrent operations
 *   - { start: fn, end: fn, getCurrent: fn, getMax: fn }
 *   - start() increments current, updates max if needed
 *   - end() decrements current
 *   - Use this to verify concurrency limits in tests
 * 
 * Example Usage:
 *   const items = [1, 2, 3, 4, 5, 6, 7, 8];
 *   
 *   const results = await processWithLimit(items, 3, async (item) => {
 *       await delay(100);
 *       return item * 2;
 *   });
 *   
 *   console.log(results); // [2, 4, 6, 8, 10, 12, 14, 16]
 *   // At most 3 items were processing at any time!
 */


function createConcurrencyTracker() {
    // ==================== YOUR CODE HERE ====================
    // Create a tracker with start, end, getCurrent, getMax methods
    
    
    
    // ========================================================
}


async function processWithLimit(items, limit, asyncFn) {
    // ==================== YOUR CODE HERE ====================
    // Process items with at most 'limit' concurrent operations
    // Return results in same order as input
    // Hint: Can use a queue-based approach or chunking
    
    
    
    // ========================================================
}


async function processBatched(items, batchSize, asyncFn) {
    // ==================== YOUR CODE HERE ====================
    // Process in sequential batches, each batch runs in parallel
    
    
    
    // ========================================================
}


// Helper function (you can use this)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createConcurrencyTracker,
    processWithLimit,
    processBatched,
    delay
};
