/**
 * Polyfill for bind() - Interview Classic!
 * =========================================
 * 
 * Implementing your own bind() is a VERY common interview question.
 * It tests your understanding of how bind actually works under the hood.
 */

// =============================================================================
// Task: Implement Custom Bind Polyfill
// =============================================================================
/**
 * Create:
 * 
 * 1. A `myBind` function that works like Function.prototype.bind:
 *    - Takes a function, context, and optional pre-filled arguments
 *    - Returns a new function that:
 *      - Has `this` set to the provided context
 *      - Has pre-filled arguments followed by new arguments
 *    
 *    Example: 
 *      function greet(greeting, punct) { return `${greeting}, ${this.name}${punct}`; }
 *      const obj = { name: "Alice" };
 *      const bound = myBind(greet, obj, "Hello");
 *      bound("!"); // "Hello, Alice!"
 * 
 * 2. Add it to Function.prototype as `myBind`:
 *    Function.prototype.myBind = function(context, ...args) { ... }
 * 
 * 3. Create test functions:
 *    - `testMyBind()` - returns true if myBind works correctly
 *    - `testPartialApplication()` - returns true if partial args work
 */

// Standalone myBind function
function myBind(fn, context, ...preArgs) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

// Add to Function.prototype
// ==================== YOUR CODE HERE ====================


// ========================================================

function testMyBind() {
    // ==================== YOUR CODE HERE ====================
    // Test myBind and return true if working
    
    
    // ========================================================
}

function testPartialApplication() {
    // ==================== YOUR CODE HERE ====================
    // Test partial application and return true if working
    
    
    // ========================================================
}

module.exports = { myBind, testMyBind, testPartialApplication };
