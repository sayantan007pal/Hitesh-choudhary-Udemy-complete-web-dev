/**
 * Partial Application with Closures
 * ==================================
 * 
 * Partial application is pre-filling some arguments to create specialized functions.
 * This is a powerful pattern for creating reusable, configurable functions.
 */

// =============================================================================
// Task: Implement Partial Application
// =============================================================================
/**
 * Create a function partial(fn, ...presetArgs) that returns a new function
 * with some arguments pre-filled.
 * 
 * The returned function accepts the remaining arguments and calls fn
 * with ALL arguments (preset + remaining).
 * 
 * Parameters:
 *   - fn: The function to partially apply
 *   - ...presetArgs: Arguments to preset
 * 
 * Example Usage:
 *   const add = (a, b, c) => a + b + c;
 *   
 *   const add5 = partial(add, 5);
 *   console.log(add5(10, 20));     // 35 (5 + 10 + 20)
 *   
 *   const add5and10 = partial(add, 5, 10);
 *   console.log(add5and10(20));    // 35 (5 + 10 + 20)
 *   
 *   const greet = (greeting, name) => `${greeting}, ${name}!`;
 *   const sayHello = partial(greet, "Hello");
 *   console.log(sayHello("Alice")); // "Hello, Alice!"
 * 
 * 💡 Interview Tip: Similar to Function.prototype.bind but more flexible.
 */

function partial(fn, ...presetArgs) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}

module.exports = { partial };
