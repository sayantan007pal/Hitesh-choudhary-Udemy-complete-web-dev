/**
 * Event Handler State with Closures
 * ==================================
 * 
 * This challenge tests your understanding of how closures preserve state
 * across multiple function calls - essential for event handlers and callbacks.
 * 
 * In real applications, this pattern is used for:
 *   - Click counters
 *   - Form validation state
 *   - User session tracking
 */


// =============================================================================
// Task: Create a Click Tracker
// =============================================================================
/**
 * Create a function createClickTracker() that returns an object for tracking
 * click events with persistent state.
 * 
 * The returned object should have these methods:
 * 
 *   click()
 *   - Records a click with the current timestamp
 *   - Returns the total click count after this click
 * 
 *   getClickCount()
 *   - Returns the total number of clicks recorded
 * 
 *   getLastClickTime()
 *   - Returns the timestamp of the most recent click
 *   - Returns null if no clicks have been recorded
 * 
 *   getTimeBetweenClicks()
 *   - Returns the time difference (in ms) between last two clicks
 *   - Returns null if fewer than 2 clicks recorded
 * 
 *   reset()
 *   - Resets all tracking data to initial state
 *   - Returns nothing (undefined)
 * 
 * 
 * Example Usage:
 *   const tracker = createClickTracker();
 *   
 *   console.log(tracker.getClickCount());      // 0
 *   console.log(tracker.getLastClickTime());   // null
 *   
 *   tracker.click();                           // Returns 1
 *   console.log(tracker.getClickCount());      // 1
 *   console.log(tracker.getLastClickTime());   // (timestamp)
 *   
 *   tracker.click();                           // Returns 2
 *   console.log(tracker.getTimeBetweenClicks()); // (ms between clicks)
 *   
 *   tracker.reset();
 *   console.log(tracker.getClickCount());      // 0
 * 
 * 
 * 💡 Interview Tip:
 *    This pattern is used in:
 *    - React's useState (simplified version)
 *    - Analytics tracking
 *    - Debounce/throttle implementations
 */

function createClickTracker() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createClickTracker
};
