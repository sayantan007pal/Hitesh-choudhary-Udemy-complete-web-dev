/**
 * Lazy Evaluation - Challenge 9
 * ==============================
 * Topic: Memory-efficient pipelines with generators
 */


// =============================================================================
// Task 1: Lazy Map Generator
// =============================================================================
/**
 * Create lazyMap(iterable, mapFn) that:
 *   - Takes any iterable and a transform function
 *   - Lazily yields transformed values (doesn't create intermediate array)
 * 
 * Example:
 *   const doubled = lazyMap([1, 2, 3], x => x * 2);
 *   [...doubled] // [2, 4, 6]
 */

function* lazyMap(iterable, mapFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Lazy Filter Generator
// =============================================================================
/**
 * Create lazyFilter(iterable, predicateFn) that:
 *   - Takes any iterable and a predicate function
 *   - Lazily yields only values where predicateFn returns true
 */

function* lazyFilter(iterable, predicateFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Lazy Take Generator
// =============================================================================
/**
 * Create lazyTake(iterable, n) that:
 *   - Takes any iterable and a count n
 *   - Yields only the first n items, then stops
 *   - Important for infinite generators!
 */

function* lazyTake(iterable, n) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Compose Pipeline
// =============================================================================
/**
 * Create pipeline(iterable, ...generators) that:
 *   - Chains multiple generator functions together
 *   - Each generator wraps the previous one
 *   - Returns final generator
 * 
 * Example:
 *   const result = pipeline(
 *     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
 *     iter => lazyFilter(iter, x => x % 2 === 0),
 *     iter => lazyMap(iter, x => x * 10),
 *     iter => lazyTake(iter, 3)
 *   );
 *   [...result] // [20, 40, 60]
 */

function pipeline(iterable, ...generators) {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}


module.exports = { lazyMap, lazyFilter, lazyTake, pipeline };
