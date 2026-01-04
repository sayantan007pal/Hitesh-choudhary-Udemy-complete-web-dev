/**
 * Challenge 9: Promise Chaining & Error Propagation
 * ==================================================
 * 
 * Learn how errors propagate through Promise chains and how to handle them.
 */


// Task 1: Chain Multiple Transformations
// Create chainTransform(value) that chains transformations:
// value → double → add 10 → convert to string "Result: X"
// Each step should be in a .then() call. Return the final Promise.
// Example: chainTransform(5) → "Result: 20" (5*2=10, 10+10=20)
function chainTransform(value) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Task 2: Error Recovery in Chain
// Create recoverableChain(shouldFail) that:
// - If shouldFail is true: rejects with "Step 2 failed"
// - Uses .catch() to recover and return "Recovered from error"
// - If shouldFail is false: returns "Success: Step 2 completed"
// The Promise should NEVER reject - always recover!
function recoverableChain(shouldFail) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Task 3: Error Propagation
// Create propagatingChain() that demonstrates:
// Step 1 → Step 2 (throws "Error at step 2") → Step 3 (should be skipped)
// Return: { reachedStep3: false, error: "Error at step 2" }
async function propagatingChain() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


module.exports = { chainTransform, recoverableChain, propagatingChain };
