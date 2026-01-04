/**
 * Real-World Callback Scenarios
 * ==============================
 * 
 * This challenge covers the most common real-world scenarios where
 * `this` binding is critical: event handlers, setTimeout, array methods.
 */

// =============================================================================
// Task: Fix Real-World `this` Problems
// =============================================================================
/**
 * Create:
 * 
 * 1. A `Button` class/constructor with:
 *    - this.label = label
 *    - this.clicks = 0
 *    - handleClick() - increments clicks, returns "{label} clicked {clicks} times"
 *    - getHandler() - returns a BOUND handler for use as callback
 * 
 * 2. A `DataProcessor` object with:
 *    - data: [1, 2, 3, 4, 5]
 *    - multiplier: 2
 *    - processWithArrow() - uses arrow in map, multiplies by this.multiplier
 *    - processWithBind() - uses bind in map to preserve this
 *    - Both should return [2, 4, 6, 8, 10]
 * 
 * 3. A `DelayedLogger` object with:
 *    - message: "Hello"
 *    - getDelayedLog() - returns a function that returns this.message
 *      (use arrow or bind to preserve this)
 * 
 * 4. A `simulateCallback` function that:
 *    - Takes an object and a method name
 *    - Simulates passing the method as a callback (extracts and calls it)
 *    - Returns { broken: result1, fixed: result2 }
 *    - broken = calling without context, fixed = calling with bind
 */

function Button(label) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

const DataProcessor = {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
};

const DelayedLogger = {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
};

function simulateCallback(obj, methodName) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

module.exports = { Button, DataProcessor, DelayedLogger, simulateCallback };
