/**
 * Complete Iterator Protocol - Challenge 10
 * ==========================================
 * Topic: Building iterators from scratch (without generators)
 */


// =============================================================================
// Task 1: Manual Range Iterator
// =============================================================================
/**
 * Create createRangeIterator(start, end) that returns an iterator object.
 * Do NOT use generators - implement next() manually.
 * 
 * Must return object with:
 *   - next() method returning { value, done }
 * 
 * Example:
 *   const iter = createRangeIterator(1, 3);
 *   iter.next() // { value: 1, done: false }
 *   iter.next() // { value: 2, done: false }
 *   iter.next() // { value: 3, done: false }
 *   iter.next() // { value: undefined, done: true }
 */

function createRangeIterator(start, end) {
    // ==================== YOUR CODE HERE ====================
    // Return an object with a next() method
    // Track current position with closure
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Array Iterator with Return and Throw
// =============================================================================
/**
 * Create createFullIterator(array) implementing full protocol:
 *   - next(): returns next value or done
 *   - return(value): terminates, returns { value, done: true }
 *   - throw(error): throws error, returns { done: true }
 * 
 * Plus: Track cleanup by having a 'cleaned' property set to true
 * when return() is called.
 */

function createFullIterator(array) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Make Custom Object Iterable (No Generators)
// =============================================================================
/**
 * Create LinkedList class that:
 *   - Has add(value) to add nodes
 *   - Implements [Symbol.iterator] returning a manual iterator
 *   - Do NOT use generators!
 * 
 * Example:
 *   const list = new LinkedList();
 *   list.add(1).add(2).add(3);
 *   [...list] // [1, 2, 3]
 */

class LinkedList {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    
    
    
    // ========================================================
}


module.exports = { createRangeIterator, createFullIterator, LinkedList };
