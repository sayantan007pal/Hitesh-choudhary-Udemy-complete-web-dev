/**
 * Implicit Binding - The Left of the Dot Rule
 * ============================================
 * 
 * When a function is called as a method of an object, `this` refers to
 * the object that is LEFT of the dot (.) when the function is called.
 * 
 * This is one of the most common ways `this` gets its value.
 */


// =============================================================================
// Task: Create a Nested Object Method Caller
// =============================================================================
/**
 * Create an object structure with nested objects where methods use `this`.
 * 
 * You need to:
 * 1. Create an `outer` object with:
 *    - A property `name` set to "Outer"
 *    - A nested `inner` object with:
 *      - A property `name` set to "Inner"
 *      - A method `getName()` that returns `this.name`
 *    - A method `getOuterName()` that returns `this.name`
 * 
 * 2. Create a function `extractAndCall(obj, methodPath)` that:
 *    - Takes an object and a dot-separated method path (e.g., "inner.getName")
 *    - Extracts the method and calls it without any object context
 *    - Returns the result (which demonstrates the "lost this" problem)
 * 
 * 3. Create a function `safeExtractAndCall(obj, methodPath)` that:
 *    - Does the same as above but correctly binds the context
 *    - Returns the expected result with proper `this` binding
 * 
 * Example:
 *   outer.inner.getName()           // "Inner" (this = inner)
 *   outer.getOuterName()            // "Outer" (this = outer)
 *   
 *   extractAndCall(outer, "inner.getName")  // undefined (this lost!)
 *   safeExtractAndCall(outer, "inner.getName") // "Inner" (this preserved!)
 * 
 * Hint: Use split('.') to parse the path and reduce to traverse the object.
 */

const outer = {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
};


function extractAndCall(obj, methodPath) {
    // ==================== YOUR CODE HERE ====================
    // Navigate to the method using the path, then call it without context
    
    
    
    // ========================================================
}


function safeExtractAndCall(obj, methodPath) {
    // ==================== YOUR CODE HERE ====================
    // Navigate to the method, properly bind it to its parent object, then call
    
    
    
    // ========================================================
}


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    outer,
    extractAndCall,
    safeExtractAndCall
};
