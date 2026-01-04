/**
 * Async Error Propagation
 * ========================
 * 
 * INTERVIEW IMPORTANCE: ⭐⭐⭐⭐⭐ (Very High)
 * 
 * Understanding how errors propagate through async function chains is crucial.
 * 
 * Key Concepts:
 * - Errors bubble up through await calls
 * - try-catch at any level can intercept errors
 * - Unhandled rejections crash Node.js!
 * - Re-throwing allows partial handling + propagation
 */


// =============================================================================
// Challenge: Multi-Level Error Handling
// =============================================================================
/**
 * You have a chain of async functions: fetchData → processData → saveData
 * Each function can fail, and you need to handle errors appropriately.
 * 
 * TASK 1: Implement fetchData(shouldFail)
 *   - If shouldFail is true, reject with FetchError("Network error")
 *   - If shouldFail is false, resolve with { raw: "fetched data" }
 * 
 * TASK 2: Implement processData(data, shouldFail)
 *   - If shouldFail is true, reject with ProcessError("Processing failed")
 *   - If shouldFail is false, resolve with { ...data, processed: true }
 * 
 * TASK 3: Implement saveData(data, shouldFail)
 *   - If shouldFail is true, reject with SaveError("Save failed")
 *   - If shouldFail is false, resolve with { ...data, saved: true, id: 123 }
 * 
 * TASK 4: Implement executeWithErrorInfo(fetchFail, processFail, saveFail)
 *   - Chains: fetchData → processData → saveData
 *   - Catches errors at each step
 *   - Returns { success: true, data: {...} } on success
 *   - Returns { success: false, stage: "fetch|process|save", error: "message" } on failure
 * 
 * TASK 5: Implement executeWithRecovery(fetchFail, processFail, saveFail)
 *   - Same chain as above
 *   - If fetch fails, use fallback data: { raw: "fallback data" }
 *   - If process fails, return data as-is without processing
 *   - If save fails, return data with { saved: false } instead
 *   - Should ALWAYS return some result (graceful degradation)
 * 
 * Example Usage:
 *   // All succeed
 *   const result = await executeWithErrorInfo(false, false, false);
 *   // { success: true, data: { raw: "...", processed: true, saved: true, id: 123 } }
 *   
 *   // Fetch fails
 *   const failed = await executeWithErrorInfo(true, false, false);
 *   // { success: false, stage: "fetch", error: "Network error" }
 */


// Custom Error Classes
class FetchError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FetchError';
    }
}

class ProcessError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProcessError';
    }
}

class SaveError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SaveError';
    }
}


async function fetchData(shouldFail) {
    // ==================== YOUR CODE HERE ====================
    // Resolve with { raw: "fetched data" } or reject with FetchError
    
    
    
    // ========================================================
}


async function processData(data, shouldFail) {
    // ==================== YOUR CODE HERE ====================
    // Resolve with { ...data, processed: true } or reject with ProcessError
    
    
    
    // ========================================================
}


async function saveData(data, shouldFail) {
    // ==================== YOUR CODE HERE ====================
    // Resolve with { ...data, saved: true, id: 123 } or reject with SaveError
    
    
    
    // ========================================================
}


async function executeWithErrorInfo(fetchFail, processFail, saveFail) {
    // ==================== YOUR CODE HERE ====================
    // Chain the operations and catch errors at each stage
    // Return success/failure with stage info
    
    
    
    // ========================================================
}


async function executeWithRecovery(fetchFail, processFail, saveFail) {
    // ==================== YOUR CODE HERE ====================
    // Chain with recovery strategies at each stage
    // Should always return some result (graceful degradation)
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    FetchError,
    ProcessError,
    SaveError,
    fetchData,
    processData,
    saveData,
    executeWithErrorInfo,
    executeWithRecovery
};
