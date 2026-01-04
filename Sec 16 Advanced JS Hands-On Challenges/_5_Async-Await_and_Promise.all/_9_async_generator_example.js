/**
 * Async Generators and for-await-of
 * ==================================
 * 
 * INTERVIEW IMPORTANCE: ⭐⭐⭐⭐ (High - Advanced Pattern)
 * 
 * Async generators combine:
 * - Generator functions (yield values one at a time)
 * - Async/await (handle promises)
 * 
 * Use for-await-of to iterate over async iterables.
 * Perfect for: Paginated APIs, streaming data, lazy loading.
 */


// =============================================================================
// Challenge: Paginated Data Fetcher
// =============================================================================
/**
 * Build an async generator that fetches pages of data one at a time.
 * 
 * TASK 1: Implement fetchPage(pageNumber, totalPages)
 *   - Simulates fetching a page of data (delay 50ms)
 *   - Returns { page: pageNumber, data: ["item1", "item2"], hasMore: boolean }
 *   - hasMore is true if pageNumber < totalPages
 * 
 * TASK 2: Implement createPageGenerator(totalPages)
 *   - Returns an async generator function
 *   - Yields pages one by one until all pages are fetched
 *   - Each yield returns: { page: n, data: [...], hasMore: boolean }
 * 
 * TASK 3: Implement collectAllPages(generator)
 *   - Uses for-await-of to iterate the generator
 *   - Collects all yielded pages into an array
 *   - Returns array of page results
 * 
 * TASK 4: Implement collectUntilCondition(generator, stopCondition)
 *   - Uses for-await-of but stops early based on condition
 *   - stopCondition is a function: (pageResult) => boolean
 *   - Return pages collected before stop condition became true
 * 
 * Example Usage:
 *   const pageGen = createPageGenerator(3);
 *   
 *   for await (const page of pageGen()) {
 *       console.log(page);
 *       // { page: 1, data: [...], hasMore: true }
 *       // { page: 2, data: [...], hasMore: true }
 *       // { page: 3, data: [...], hasMore: false }
 *   }
 *   
 *   // Collect all
 *   const allPages = await collectAllPages(createPageGenerator(5));
 *   console.log(allPages.length); // 5
 *   
 *   // Stop early
 *   const firstTwo = await collectUntilCondition(
 *       createPageGenerator(10),
 *       (page) => page.page >= 2
 *   );
 *   console.log(firstTwo.length); // 2
 */


async function fetchPage(pageNumber, totalPages) {
    // ==================== YOUR CODE HERE ====================
    // Simulate fetching a page with 50ms delay
    // Return { page, data, hasMore }
    
    
    
    // ========================================================
}


function createPageGenerator(totalPages) {
    // ==================== YOUR CODE HERE ====================
    // Return an async generator function that yields pages
    // Use async function* syntax
    
    
    
    // ========================================================
}


async function collectAllPages(generatorFn) {
    // ==================== YOUR CODE HERE ====================
    // Use for-await-of to collect all yielded pages
    
    
    
    // ========================================================
}


async function collectUntilCondition(generatorFn, stopCondition) {
    // ==================== YOUR CODE HERE ====================
    // Collect pages until stopCondition returns true
    // Use break to exit the for-await-of loop early
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    fetchPage,
    createPageGenerator,
    collectAllPages,
    collectUntilCondition
};
