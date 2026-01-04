/**
 * Custom Iterable Objects - Challenge 3
 * ======================================
 * 
 * Topic: Making objects iterable using Symbol.iterator
 * 
 * To make any object work with for...of loops and the spread operator,
 * you need to implement the [Symbol.iterator] property which returns
 * an iterator (an object with a next() method).
 */


// =============================================================================
// Task 1: Make a Range Object Iterable
// =============================================================================
/**
 * Create an object called iterableRange that has:
 *   - Properties: start (number), end (number)
 *   - A [Symbol.iterator] method that makes it iterable
 * 
 * The object should be iterable from start to end (inclusive).
 * 
 * Example Usage:
 *   const range = createIterableRange(1, 5);
 *   console.log([...range]); // [1, 2, 3, 4, 5]
 *   
 *   for (const num of createIterableRange(3, 6)) {
 *     console.log(num); // 3, 4, 5, 6
 *   }
 */

function createIterableRange(start, end) {
    // ==================== YOUR CODE HERE ====================
    // Return an object with start, end, and [Symbol.iterator]
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Create Iterable Collection Class
// =============================================================================
/**
 * Create a class IterableCollection that:
 *   - Takes an array in its constructor
 *   - Implements [Symbol.iterator] to iterate over the array items
 *   - Has an add(item) method to add items
 *   - Has a size getter to return the number of items
 * 
 * Example Usage:
 *   const collection = new IterableCollection(['a', 'b', 'c']);
 *   console.log([...collection]); // ['a', 'b', 'c']
 *   
 *   collection.add('d');
 *   console.log(collection.size); // 4
 *   
 *   for (const item of collection) {
 *     console.log(item); // 'a', 'b', 'c', 'd'
 *   }
 */

class IterableCollection {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Create Reversed Iterable
// =============================================================================
/**
 * Create a function makeReversedIterable(array) that returns an object
 * which iterates over the given array IN REVERSE ORDER when used with
 * for...of or spread operator.
 * 
 * Important: Do NOT modify or reverse the original array!
 * 
 * Example Usage:
 *   const reversed = makeReversedIterable([1, 2, 3, 4, 5]);
 *   console.log([...reversed]); // [5, 4, 3, 2, 1]
 *   
 *   for (const val of makeReversedIterable(['a', 'b', 'c'])) {
 *     console.log(val); // 'c', 'b', 'a'
 *   }
 */

function makeReversedIterable(array) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createIterableRange,
    IterableCollection,
    makeReversedIterable
};
