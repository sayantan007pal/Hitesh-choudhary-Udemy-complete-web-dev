/**
 * Passing Values to Generators - Challenge 6
 * ==========================================
 * 
 * Topic: Two-way communication with generators via .next(value)
 */


// =============================================================================
// Task 1: Simple Echo Generator
// =============================================================================
/**
 * Create a generator function echoGenerator() that:
 *   - On first .next(), yields "Ready"
 *   - On subsequent calls, yields whatever value was passed to .next()
 * 
 * Example:
 *   const echo = echoGenerator();
 *   echo.next().value        // "Ready"
 *   echo.next('Hello').value // "Hello"
 */

function* echoGenerator() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Running Total Generator
// =============================================================================
/**
 * Create a generator function runningTotal() that:
 *   - Keeps a running sum
 *   - Each .next(number) adds the number and yields new total
 *   - First .next() yields 0
 * 
 * Example:
 *   const total = runningTotal();
 *   total.next().value    // 0
 *   total.next(5).value   // 5
 *   total.next(3).value   // 8
 */

function* runningTotal() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: State Machine Generator
// =============================================================================
/**
 * Create trafficLight() that simulates a traffic light.
 * States: 'RED' -> 'GREEN' -> 'YELLOW' -> 'RED' -> ...
 * 
 * - Starts in 'RED'
 * - 'NEXT' transitions to next state
 * - 'RESET' goes back to 'RED'
 * - Other input: stay in current state
 */

function* trafficLight() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    echoGenerator,
    runningTotal,
    trafficLight
};
