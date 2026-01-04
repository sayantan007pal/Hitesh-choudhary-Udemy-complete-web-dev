/**
 * Generator Error Handling - Challenge 7
 * =======================================
 * Topic: Using .throw() to inject errors and try/catch in generators
 */


// =============================================================================
// Task 1: Generator with Try-Catch
// =============================================================================
/**
 * Create safeDivisionGenerator() that:
 *   - Accepts a number via .next(number)
 *   - Accepts a divisor via .next(divisor)
 *   - Yields the result of number/divisor
 *   - If divisor is 0, yields 'Error: Division by zero'
 *   - Can continue after error
 * 
 * Example:
 *   const div = safeDivisionGenerator();
 *   div.next();          // Start
 *   div.next(10).value   // Pass number
 *   div.next(2).value    // 5 (10/2)
 *   div.next(0).value    // 'Error: Division by zero'
 */

function* safeDivisionGenerator() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Error Recovery Generator
// =============================================================================
/**
 * Create errorRecoveryGenerator() that:
 *   - Yields numbers 1, 2, 3, 4, 5 in sequence
 *   - If .throw(error) is called, catches it and yields 'Recovered from: {error.message}'
 *   - Continues from where it left off after recovery
 * 
 * Example:
 *   const gen = errorRecoveryGenerator();
 *   gen.next().value                           // 1
 *   gen.next().value                           // 2
 *   gen.throw(new Error('Test')).value        // 'Recovered from: Test'
 *   gen.next().value                           // 3
 */

function* errorRecoveryGenerator() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Cleanup with Finally
// =============================================================================
/**
 * Create resourceManager() that:
 *   - Yields 'Resource acquired'
 *   - Then yields 'Working...' in a loop
 *   - Has a finally block that yields 'Resource released'
 *   - Finally runs whether terminated normally or via .throw()/.return()
 */

function* resourceManager() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


module.exports = { safeDivisionGenerator, errorRecoveryGenerator, resourceManager };
