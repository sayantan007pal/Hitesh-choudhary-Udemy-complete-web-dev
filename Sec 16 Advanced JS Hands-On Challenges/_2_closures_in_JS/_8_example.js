/**
 * Once Function - One-Time Execution with Closures
 * =================================================
 * 
 * The once() pattern ensures a function can only be called once.
 * Subsequent calls return the first call's result.
 */

// =============================================================================
// Task: Implement Once Function
// =============================================================================
/**
 * Create a function once(fn) that returns a function that can only call fn once.
 * 
 * - First call: executes fn and returns its result
 * - Subsequent calls: return the cached first result (fn is NOT called again)
 * 
 * Parameters:
 *   - fn: The function to wrap
 * 
 * Example Usage:
 *   let callCount = 0;
 *   const initialize = once(() => {
 *       callCount++;
 *       return "initialized!";
 *   });
 *   
 *   console.log(initialize()); // "initialized!", callCount = 1
 *   console.log(initialize()); // "initialized!", callCount = 1 (cached!)
 *   console.log(initialize()); // "initialized!", callCount = 1 (still cached!)
 * 
 * 💡 Interview Tip: Used for initialization, setup functions, singleton patterns.
 */

function once(fn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}

module.exports = { once };
