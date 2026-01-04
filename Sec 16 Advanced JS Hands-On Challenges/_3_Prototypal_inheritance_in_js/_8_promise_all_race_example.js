/**
 * Promise.all, Promise.race, allSettled, any
 * ===========================================
 * 
 * Mastering concurrent promise execution patterns.
 * Understanding when to use each static method.
 */


// =============================================================================
// Task: Implement Promise Combinators
// =============================================================================
/**
 * PART A: fetchAllWithFallback(primaryUrls, fallbackUrls)
 * --------------------------------------------------------
 * Try to fetch all primary URLs. If ANY primary fails, 
 * fetch from fallback URLs instead.
 * 
 * Use the simulateFetch helper provided.
 * Returns array of results (from primary or fallback, not mixed).
 * 
 * Example:
 *   await fetchAllWithFallback(
 *     ['/api/1', '/api/2'],              // primary
 *     ['/backup/1', '/backup/2']          // fallback
 *   );
 *   // If all primary succeed: ['Data from /api/1', 'Data from /api/2']
 *   // If any primary fails: ['Data from /backup/1', 'Data from /backup/2']
 * 
 * 
 * PART B: raceWithMinimum(promises, minimumMs)
 * --------------------------------------------
 * Race promises but ensure at least minimumMs has passed.
 * Even if promise resolves immediately, wait until minimumMs.
 * Useful for showing loading spinners for minimum time.
 * 
 * Example:
 *   const fast = Promise.resolve('instant');
 *   await raceWithMinimum([fast], 1000);  
 *   // Returns 'instant' but takes at least 1000ms
 * 
 * 
 * PART C: getFirstSuccessful(promises)
 * ------------------------------------
 * Similar to Promise.any(), return the first promise to RESOLVE.
 * Ignore rejected promises unless ALL reject.
 * If all reject, reject with an array of all errors.
 * 
 * Example:
 *   await getFirstSuccessful([
 *     Promise.reject('error1'),
 *     delay(100).then(() => 'slow success'),
 *     delay(50).then(() => 'fast success')
 *   ]);
 *   // Returns: 'fast success' (first to resolve)
 * 
 * 
 * PART D: executeWithStatus(promises)
 * ------------------------------------
 * Similar to Promise.allSettled(), execute all promises
 * and return status for each.
 * 
 * Returns array of objects:
 *   { status: 'fulfilled', value: result }
 *   { status: 'rejected', reason: error }
 * 
 * Example:
 *   await executeWithStatus([
 *     Promise.resolve('ok'),
 *     Promise.reject('fail')
 *   ]);
 *   // [
 *   //   { status: 'fulfilled', value: 'ok' },
 *   //   { status: 'rejected', reason: 'fail' }
 *   // ]
 */

// Helper functions - DO NOT MODIFY
function simulateFetch(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url.includes('error')) {
                reject(new Error(`Failed to fetch ${url}`));
            } else {
                resolve(`Data from ${url}`);
            }
        }, 10);
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function fetchAllWithFallback(primaryUrls, fallbackUrls) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    // ========================================================
}


async function raceWithMinimum(promises, minimumMs) {
    // ==================== YOUR CODE HERE ====================
    // Hint: Race the promises, then ensure minimum time has passed
    
    
    
    
    
    // ========================================================
}


function getFirstSuccessful(promises) {
    // ==================== YOUR CODE HERE ====================
    // Hint: Track rejected promises, resolve on first success
    
    
    
    
    
    
    
    // ========================================================
}


function executeWithStatus(promises) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    
    
    // ========================================================
}


module.exports = {
    fetchAllWithFallback,
    raceWithMinimum,
    getFirstSuccessful,
    executeWithStatus,
    simulateFetch,
    delay
};
