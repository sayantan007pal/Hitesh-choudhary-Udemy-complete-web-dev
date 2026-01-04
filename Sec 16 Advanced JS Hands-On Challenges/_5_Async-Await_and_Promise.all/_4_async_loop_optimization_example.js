/**
 * Async Loop Optimization - Avoid await in Loops
 * ===============================================
 * 
 * INTERVIEW IMPORTANCE: ⭐⭐⭐⭐⭐ (VERY HIGH - Common Interview Question!)
 * 
 * ❌ BAD: Using await inside a for loop
 *    for (const id of ids) {
 *        await fetch(id);  // SLOW! Each waits for previous
 *    }
 * 
 * ✅ GOOD: Using Promise.all with map
 *    await Promise.all(ids.map(id => fetch(id)));  // FAST! All run together
 * 
 * This is a MAJOR performance optimization that interviewers love to ask about!
 */


// =============================================================================
// Challenge: Optimize Batch Data Processing
// =============================================================================
/**
 * You have a list of user IDs and need to fetch details for each user.
 * 
 * TASK 1: Implement processItem(id)
 *   - Returns a promise that resolves after 100ms
 *   - Resolves with: { id: id, processed: true, timestamp: Date.now() }
 * 
 * TASK 2: Implement processSequentially(ids)
 *   - Process each ID one after another using a for loop with await
 *   - This is the SLOW way (for comparison)
 *   - Returns array of processed results
 * 
 * TASK 3: Implement processInParallel(ids)
 *   - Process ALL IDs at the same time using Promise.all + map
 *   - This is the FAST way (use this!)
 *   - Returns array of processed results
 * 
 * TASK 4: Implement processWithForEach(ids)
 *   - TRICKY! Many developers think forEach with async works...
 *   - Implement using ids.forEach with async callback
 *   - This is BROKEN - demonstrate why forEach doesn't wait
 *   - Return the results array (it will be empty or wrong!)
 * 
 * Performance Comparison (4 items, 100ms each):
 *   - Sequential: ~400ms (100 + 100 + 100 + 100)
 *   - Parallel:   ~100ms (all start together, done when slowest finishes)
 * 
 * Example Usage:
 *   const ids = [1, 2, 3, 4];
 *   
 *   // Sequential - SLOW
 *   const seqResult = await processSequentially(ids);
 *   
 *   // Parallel - FAST
 *   const parResult = await processInParallel(ids);
 */


function processItem(id) {
    // ==================== YOUR CODE HERE ====================
    // Return a promise that resolves after 100ms with the processed item
    
    
    
    // ========================================================
}


async function processSequentially(ids) {
    // ==================== YOUR CODE HERE ====================
    // Process items ONE BY ONE using for...of loop with await
    // This is intentionally slow - for comparison
    
    
    
    // ========================================================
}


async function processInParallel(ids) {
    // ==================== YOUR CODE HERE ====================
    // Process ALL items at once using Promise.all + map
    // This is the optimized version!
    
    
    
    // ========================================================
}


async function processWithForEach(ids) {
    // ==================== YOUR CODE HERE ====================
    // TRY to use forEach with async callback
    // This will NOT work as expected - demonstrate the bug!
    // Hint: forEach doesn't wait for async callbacks
    
    const results = [];
    
    // Your forEach code here...
    
    return results; // This will likely be empty or incomplete!
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    processItem,
    processSequentially,
    processInParallel,
    processWithForEach
};
