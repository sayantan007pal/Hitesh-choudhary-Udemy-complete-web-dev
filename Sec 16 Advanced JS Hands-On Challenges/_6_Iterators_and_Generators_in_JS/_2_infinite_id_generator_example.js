/**
 * Infinite ID Generator - Challenge 2
 * =====================================
 * 
 * Topic: Creating infinite generators for unique ID generation
 * 
 * Generators can run indefinitely using while(true) loops because they
 * PAUSE at each yield. This makes them perfect for generating unique IDs
 * on-demand without memory issues.
 */


// =============================================================================
// Task 1: Simple Infinite Counter Generator
// =============================================================================
/**
 * Create a generator function infiniteCounter() that yields incrementing
 * numbers starting from 1, indefinitely.
 * 
 * Example Usage:
 *   const counter = infiniteCounter();
 *   console.log(counter.next().value); // 1
 *   console.log(counter.next().value); // 2
 *   console.log(counter.next().value); // 3
 *   // Can continue forever...
 */

function* infiniteCounter() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: ID Generator with Custom Prefix
// =============================================================================
/**
 * Create a generator function idGeneratorWithPrefix(prefix) that yields
 * unique IDs in the format: `${prefix}-${number}`.
 * 
 * The number should start from 1 and increment with each call.
 * 
 * Example Usage:
 *   const userIdGen = idGeneratorWithPrefix('USER');
 *   console.log(userIdGen.next().value); // "USER-1"
 *   console.log(userIdGen.next().value); // "USER-2"
 *   
 *   const orderIdGen = idGeneratorWithPrefix('ORDER');
 *   console.log(orderIdGen.next().value); // "ORDER-1"
 */

function* idGeneratorWithPrefix(prefix) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Configurable ID Generator
// =============================================================================
/**
 * Create a generator function configurableIdGenerator(options) that yields
 * unique IDs based on the provided configuration object.
 * 
 * Options object:
 *   - prefix: string (default: 'ID')
 *   - startFrom: number (default: 1)
 *   - step: number - increment by this amount (default: 1)
 *   - padLength: number - pad numbers with leading zeros (default: 0, no padding)
 * 
 * Example Usage:
 *   const gen1 = configurableIdGenerator({ prefix: 'TICKET', startFrom: 100, step: 10 });
 *   console.log(gen1.next().value); // "TICKET-100"
 *   console.log(gen1.next().value); // "TICKET-110"
 *   console.log(gen1.next().value); // "TICKET-120"
 *   
 *   const gen2 = configurableIdGenerator({ prefix: 'INV', padLength: 5 });
 *   console.log(gen2.next().value); // "INV-00001"
 *   console.log(gen2.next().value); // "INV-00002"
 */

function* configurableIdGenerator(options = {}) {
    // ==================== YOUR CODE HERE ====================
    // Hint: Use String.prototype.padStart() for zero-padding
    
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    infiniteCounter,
    idGeneratorWithPrefix,
    configurableIdGenerator
};
