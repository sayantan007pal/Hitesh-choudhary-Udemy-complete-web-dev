/**
 * Binding Priority - Which Rule Wins?
 * ====================================
 * 
 * Priority order: new > explicit (call/apply/bind) > implicit > default
 * 
 * This challenge tests your understanding of binding precedence!
 */

// =============================================================================
// Task: Predict and Verify Binding Priority
// =============================================================================
/**
 * Create:
 * 
 * 1. A `testDefaultVsImplicit` function that:
 *    - Returns an object showing both default and implicit binding results
 *    - { defaultResult: "...", implicitResult: "..." }
 * 
 * 2. A `testImplicitVsExplicit` function that:
 *    - Creates an object with a getName method using this.name
 *    - Shows that call() can override the implicit binding
 *    - Returns { implicitResult, explicitResult }
 * 
 * 3. A `testExplicitVsBind` function that:
 *    - Shows that once a function is bound, call() CANNOT override it
 *    - Returns { boundResult, callOnBoundResult } (should be same!)
 * 
 * 4. A `testAllPriorities` function that:
 *    - Returns an object with all binding results for comparison
 *    - { default, implicit, explicit, bound }
 */

function getName() {
    return this.name;
}

function testDefaultVsImplicit() {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

function testImplicitVsExplicit() {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

function testExplicitVsBind() {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

function testAllPriorities() {
    // ==================== YOUR CODE HERE ====================
    
    
    // ========================================================
}

module.exports = { getName, testDefaultVsImplicit, testImplicitVsExplicit, testExplicitVsBind, testAllPriorities };
