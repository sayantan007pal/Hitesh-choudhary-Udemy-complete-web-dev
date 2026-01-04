/**
 * Yield Delegation (yield*) - Challenge 5
 * ========================================
 * 
 * Topic: Composing generators using yield*
 * 
 * The yield* expression delegates to another iterable or generator.
 * It's like saying "yield each value from this other thing".
 * This allows you to compose generators together!
 */


// =============================================================================
// Task 1: Combine Multiple Generators with yield*
// =============================================================================
/**
 * Create three generators and one main generator:
 *   - frontendGen(): yields 'HTML', 'CSS', 'JavaScript'
 *   - backendGen(): yields 'Node.js', 'Python', 'Java'
 *   - databaseGen(): yields 'MongoDB', 'PostgreSQL', 'MySQL'
 *   - fullStackGen(): uses yield* to delegate to all three generators
 * 
 * Example Usage:
 *   const stack = fullStackGen();
 *   console.log([...stack]); 
 *   // ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Python', 'Java', 'MongoDB', 'PostgreSQL', 'MySQL']
 */

function* frontendGen() {
    // ==================== YOUR CODE HERE ====================
    
    // ========================================================
}

function* backendGen() {
    // ==================== YOUR CODE HERE ====================
    
    // ========================================================
}

function* databaseGen() {
    // ==================== YOUR CODE HERE ====================
    
    // ========================================================
}

function* fullStackGen() {
    // ==================== YOUR CODE HERE ====================
    // Use yield* to delegate to the other generators
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Flatten Nested Arrays with yield*
// =============================================================================
/**
 * Create a generator function flattenArray(arr) that takes a nested array
 * and yields each individual element (flattening it completely).
 * 
 * Use yield* to recursively delegate to nested arrays.
 * 
 * Example Usage:
 *   const nested = [1, [2, 3], [4, [5, 6]], 7];
 *   console.log([...flattenArray(nested)]); // [1, 2, 3, 4, 5, 6, 7]
 *   
 *   console.log([...flattenArray([1, [2, [3, [4]]]])]); // [1, 2, 3, 4]
 */

function* flattenArray(arr) {
    // ==================== YOUR CODE HERE ====================
    // Hint: Check if each element is an array (Array.isArray())
    // If it is, use yield* to recursively flatten it
    // If not, just yield the element
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Interleave Two Iterables
// =============================================================================
/**
 * Create a generator function interleave(iter1, iter2) that alternately
 * yields values from two iterables. If one iterable ends before the other,
 * continue yielding remaining values from the longer one.
 * 
 * Example Usage:
 *   console.log([...interleave([1, 2, 3], ['a', 'b', 'c'])]); 
 *   // [1, 'a', 2, 'b', 3, 'c']
 *   
 *   console.log([...interleave([1, 2], ['a', 'b', 'c', 'd'])]);
 *   // [1, 'a', 2, 'b', 'c', 'd']
 *   
 *   console.log([...interleave([1, 2, 3, 4], ['x'])]);
 *   // [1, 'x', 2, 3, 4]
 */

function* interleave(iter1, iter2) {
    // ==================== YOUR CODE HERE ====================
    // Hint: Get iterators from both iterables using Symbol.iterator
    // Then alternate between them until both are done
    
    
    
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    frontendGen,
    backendGen,
    databaseGen,
    fullStackGen,
    flattenArray,
    interleave
};
