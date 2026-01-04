/**
 * Explicit Binding with apply() - Array Arguments
 * ================================================
 * 
 * apply() works like call(), but takes arguments as an ARRAY.
 * This is especially useful when you have arguments in an array format
 * or need to spread array elements as function arguments.
 * 
 * Remember: Apply = Array (A for A!)
 */


// =============================================================================
// Task: Create a Statistics Calculator Using apply()
// =============================================================================
/**
 * Build a statistics calculator that works on arrays of numbers using apply().
 * 
 * Create:
 * 
 * 1. A `calculator` object with:
 *    - A property `precision` set to 2 (decimal places for rounding)
 *    - A method `round(num)` that rounds to `this.precision` decimal places
 * 
 * 2. A `findMax` function that:
 *    - Uses Math.max with apply() to find the maximum value in an array
 *    - Takes an array of numbers as argument
 *    - Returns the maximum value
 *    
 *    Example: findMax([5, 2, 9, 1]) → 9
 * 
 * 3. A `findMin` function that:
 *    - Uses Math.min with apply() to find the minimum value in an array
 *    - Takes an array of numbers as argument
 *    - Returns the minimum value
 * 
 * 4. A `computeStats` function that:
 *    - Uses `this.precision` for rounding (needs to be called with calculator context)
 *    - Takes an array of numbers
 *    - Returns an object with: { min, max, sum, average, range }
 *    - All values should be rounded using `this.precision`
 * 
 *    Example: computeStats.apply(calculator, [[10, 20, 30]]) 
 *             → { min: 10, max: 30, sum: 60, average: 20, range: 20 }
 * 
 * 5. A `mergeAndCompute` function that:
 *    - Takes multiple arrays as separate arguments
 *    - Merges all arrays into one
 *    - Computes stats on the merged array (using apply with calculator context)
 *    - Returns the stats object
 *    
 *    Example: mergeAndCompute.apply(calculator, [[1, 2], [3, 4], [5]])
 *             → stats for [1, 2, 3, 4, 5]
 */

const calculator = {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
};


function findMax(arr) {
    // ==================== YOUR CODE HERE ====================
    // Use Math.max with apply()
    
    
    
    // ========================================================
}


function findMin(arr) {
    // ==================== YOUR CODE HERE ====================
    // Use Math.min with apply()
    
    
    
    // ========================================================
}


function computeStats(numbers) {
    // ==================== YOUR CODE HERE ====================
    // Use this.precision for rounding, compute min, max, sum, average, range
    
    
    
    // ========================================================
}


function mergeAndCompute(...arrays) {
    // ==================== YOUR CODE HERE ====================
    // Merge all arrays and compute stats using this context
    
    
    
    // ========================================================
}


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    calculator,
    findMax,
    findMin,
    computeStats,
    mergeAndCompute
};
