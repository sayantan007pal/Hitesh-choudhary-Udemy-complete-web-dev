/**
 * Arrow Functions and Lexical `this`
 * ===================================
 * 
 * Arrow functions DON'T have their own `this` binding!
 * They INHERIT `this` from the surrounding scope.
 */

// =============================================================================
// Task: Understand Arrow vs Regular Function `this` Behavior
// =============================================================================
/**
 * Create:
 * 
 * 1. An `eventHandler` object with:
 *    - eventName: "click", count: 0
 *    - handleRegular() - increments this.count, returns "{eventName} handled {count} times"
 *    - handleArrow (arrow function) - tries to do the same (won't work as method!)
 * 
 * 2. A `timer` object with:
 *    - label: "Timer", seconds: 0
 *    - startRegular() - returns a regular function (demonstrates lost this)
 *    - startArrow() - returns an arrow function (preserves this!)
 * 
 * 3. fixWithBind(timerObj) - returns a bound callback from startRegular
 * 
 * 4. Counter constructor - incrementArrow uses arrow in forEach, works correctly
 */

const eventHandler = {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
};

const timer = {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
};

function fixWithBind(timerObj) {
    // ==================== YOUR CODE HERE ====================
    
    // ========================================================
}

function Counter() {
    // ==================== YOUR CODE HERE ====================
    
    // ========================================================
}

module.exports = { eventHandler, timer, fixWithBind, Counter };
