/**
 * Iterators and Generators in JavaScript
 * =======================================
 * 
 * Generators are special functions that can pause execution and resume later.
 * They use the yield keyword to produce values on-demand.
 * Iterators are objects with a next() method that returns { value, done }.
 */


// =============================================================================
// Task 1: Creating a Simple Generator
// =============================================================================
/**
 * Create a generator function numberGenerator() that yields numbers from 1 to 3.
 * 
 * Example Usage:
 *   const gen = numberGenerator();
 *   console.log(gen.next()); // { value: 1, done: false }
 *   console.log(gen.next()); // { value: 2, done: false }
 *   console.log(gen.next()); // { value: 3, done: false }
 *   console.log(gen.next()); // { value: undefined, done: true }
 */

function* numberGenerator() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Create a Custom Iterator
// =============================================================================
/**
 * Create a custom iterator called rangeIterator(start, end) that returns
 * an object that iterates over numbers from start to end (inclusive).
 * 
 * Each call to .next() should return the next number in the range
 * until it reaches end.
 * 
 * The iterator object should have a next() method that returns:
 *   - { value: currentNumber, done: false } while in range
 *   - { value: undefined, done: true } when complete
 * 
 * Example Usage:
 *   const iter = rangeIterator(1, 3);
 *   console.log(iter.next()); // { value: 1, done: false }
 *   console.log(iter.next()); // { value: 2, done: false }
 *   console.log(iter.next()); // { value: 3, done: false }
 *   console.log(iter.next()); // { value: undefined, done: true }
 */

function rangeIterator(start, end) {
    // ==================== YOUR CODE HERE ====================
    // Return an object with a next() method
    
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Generator Function for Fibonacci Sequence
// =============================================================================
/**
 * Create a generator function fibonacciGenerator() that yields numbers
 * from the Fibonacci sequence indefinitely (1, 1, 2, 3, 5, 8, 13, ...).
 * 
 * The Fibonacci sequence starts with 1, 1, and each subsequent number
 * is the sum of the two preceding ones.
 * 
 * Example Usage:
 *   const fib = fibonacciGenerator();
 *   console.log(fib.next().value); // 1
 *   console.log(fib.next().value); // 1
 *   console.log(fib.next().value); // 2
 *   console.log(fib.next().value); // 3
 *   console.log(fib.next().value); // 5
 *   console.log(fib.next().value); // 8
 *   // Can continue indefinitely...
 */

function* fibonacciGenerator() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    numberGenerator,
    rangeIterator,
    fibonacciGenerator
};