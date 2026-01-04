/**
 * Function Factory Pattern with Closures
 * =======================================
 * 
 * This challenge tests your understanding of creating "factory functions"
 * that use closures to produce specialized functions.
 * 
 * This is a very common pattern in interviews and real-world code!
 */


// =============================================================================
// Task: Create Function Factories
// =============================================================================
/**
 * PART A: createMultiplier(factor)
 * --------------------------------
 * Create a function factory that returns a new function.
 * The returned function multiplies any input by the preset 'factor'.
 * 
 * Parameters:
 *   - factor: The number to multiply by
 * 
 * Example Usage:
 *   const double = createMultiplier(2);
 *   const triple = createMultiplier(3);
 *   
 *   console.log(double(5));    // 10
 *   console.log(triple(5));    // 15
 *   console.log(double(10));   // 20
 * 
 * 
 * PART B: createGreeter(greeting)
 * -------------------------------
 * Create a function factory that returns a greeting function.
 * The returned function takes a name and returns a personalized greeting.
 * 
 * Parameters:
 *   - greeting: The greeting word/phrase to use
 * 
 * Example Usage:
 *   const sayHello = createGreeter("Hello");
 *   const sayGoodbye = createGreeter("Goodbye");
 *   
 *   console.log(sayHello("Alice"));     // "Hello, Alice!"
 *   console.log(sayGoodbye("Bob"));     // "Goodbye, Bob!"
 * 
 * 
 * PART C: createRangeTester(min, max)
 * -----------------------------------
 * Create a function factory that returns a range testing function.
 * The returned function checks if a number is within the preset range (inclusive).
 * 
 * Parameters:
 *   - min: Minimum value of the range
 *   - max: Maximum value of the range
 * 
 * Example Usage:
 *   const isTeenager = createRangeTester(13, 19);
 *   const isValidPercentage = createRangeTester(0, 100);
 *   
 *   console.log(isTeenager(15));           // true
 *   console.log(isTeenager(25));           // false
 *   console.log(isValidPercentage(50));    // true
 *   console.log(isValidPercentage(150));   // false
 * 
 * 
 * 💡 Interview Tip:
 *    Function factories are everywhere in JavaScript:
 *    - Redux action creators
 *    - Express middleware factories
 *    - React higher-order components
 */

function createMultiplier(factor) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}

function createGreeter(greeting) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}

function createRangeTester(min, max) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createMultiplier,
    createGreeter,
    createRangeTester
};
