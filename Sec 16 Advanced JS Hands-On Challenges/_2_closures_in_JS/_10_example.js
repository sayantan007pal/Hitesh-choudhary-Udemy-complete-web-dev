/**
 * Pipeline/Compose - Advanced Function Composition
 * =================================================
 * 
 * This is the most advanced closure pattern - chaining multiple functions.
 * Essential for functional programming and data transformation pipelines.
 */

// =============================================================================
// Task: Implement Pipe and Compose
// =============================================================================
/**
 * PART A: pipe(...fns)
 * --------------------
 * Create a function that returns a new function.
 * The returned function pipes data through all fns left-to-right.
 * 
 * Example:
 *   const addOne = x => x + 1;
 *   const double = x => x * 2;
 *   const square = x => x * x;
 *   
 *   const process = pipe(addOne, double, square);
 *   console.log(process(2)); // ((2+1)*2)² = 36
 * 
 * 
 * PART B: compose(...fns)
 * -----------------------
 * Same as pipe, but right-to-left (mathematical composition order).
 * 
 * Example:
 *   const process = compose(square, double, addOne);
 *   console.log(process(2)); // same as pipe example = 36
 * 
 * 
 * 💡 Interview Tip: pipe is more readable, compose matches math notation.
 */

function pipe(...fns) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}

function compose(...fns) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}

module.exports = { pipe, compose };
