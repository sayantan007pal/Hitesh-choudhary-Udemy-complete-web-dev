/**
 * Debounce Implementation with Closures
 * ======================================
 * 
 * Debounce is a real-world pattern used in search inputs, resize handlers,
 * and scroll events. It delays function execution until after a pause.
 */

// =============================================================================
// Task: Implement Debounce Function
// =============================================================================
/**
 * Create a function debounce(fn, delay) that returns a debounced version.
 * 
 * The debounced function delays calling fn until delay ms have passed
 * without any new calls. Each new call resets the timer.
 * 
 * Parameters:
 *   - fn: The function to debounce
 *   - delay: Milliseconds to wait before executing
 * 
 * The debounced function should:
 *   - Pass all arguments to the original function
 *   - Reset the timer on each call
 *   - Only execute fn after delay ms of "silence"
 * 
 * Example Usage:
 *   let callCount = 0;
 *   const debouncedFn = debounce(() => callCount++, 100);
 *   
 *   debouncedFn(); // Starts timer
 *   debouncedFn(); // Resets timer
 *   debouncedFn(); // Resets timer again
 *   // After 100ms of no calls, fn executes ONCE
 *   // callCount === 1
 * 
 * 💡 Interview Tip: Used in search-as-you-type to avoid API calls on every keystroke.
 */

function debounce(fn, delay) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}

module.exports = { debounce };
