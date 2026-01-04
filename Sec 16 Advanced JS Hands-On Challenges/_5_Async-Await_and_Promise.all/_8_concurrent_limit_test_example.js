/**
 * Test Suite: Concurrent Limit
 * =============================
 * 
 * Run this file with: node _8_concurrent_limit_test_example.js
 */

const {
    createConcurrencyTracker,
    processWithLimit,
    processBatched,
    delay
} = require('./_8_concurrent_limit_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${JSON.stringify(expected)}`);
        console.log(`   Actual:   ${JSON.stringify(actual)}`);
        testsFailed++;
        return false;
    }
}

function assertDeepEqual(actual, expected, testName) {
    totalTests++;
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
        return false;
    }
}

function assertTypeOf(value, expectedType, testName) {
    totalTests++;
    if (typeof value === expectedType) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${expectedType}`);
        console.log(`   Actual type:   ${typeof value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Concurrent Limit Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test createConcurrencyTracker
    // =========================================================================
    console.log('\n📋 SECTION 1: createConcurrencyTracker');
    console.log('-'.repeat(40));

    assertTypeOf(createConcurrencyTracker, 'function', 'createConcurrencyTracker is a function');

    const tracker = createConcurrencyTracker();
    assertTypeOf(tracker.start, 'function', 'tracker has start method');
    assertTypeOf(tracker.end, 'function', 'tracker has end method');
    assertTypeOf(tracker.getCurrent, 'function', 'tracker has getCurrent method');
    assertTypeOf(tracker.getMax, 'function', 'tracker has getMax method');

    // Test tracking
    assertEqual(tracker.getCurrent(), 0, 'Initial current is 0');
    assertEqual(tracker.getMax(), 0, 'Initial max is 0');

    tracker.start();
    assertEqual(tracker.getCurrent(), 1, 'After start: current is 1');
    assertEqual(tracker.getMax(), 1, 'After start: max is 1');

    tracker.start();
    assertEqual(tracker.getCurrent(), 2, 'After second start: current is 2');
    assertEqual(tracker.getMax(), 2, 'After second start: max is 2');

    tracker.end();
    assertEqual(tracker.getCurrent(), 1, 'After end: current is 1');
    assertEqual(tracker.getMax(), 2, 'After end: max stays 2');

    tracker.end();
    assertEqual(tracker.getCurrent(), 0, 'After second end: current is 0');

    // =========================================================================
    // Test processWithLimit - Results Order
    // =========================================================================
    console.log('\n📋 SECTION 2: processWithLimit - Results');
    console.log('-'.repeat(40));

    assertTypeOf(processWithLimit, 'function', 'processWithLimit is a function');

    // Simple transformation
    const simpleItems = [1, 2, 3, 4, 5];
    const simpleResults = await processWithLimit(simpleItems, 2, async (item) => {
        await delay(10);
        return item * 2;
    });
    assertDeepEqual(simpleResults, [2, 4, 6, 8, 10], 'Results are transformed correctly');

    // Order preserved with varying delays
    const items = [1, 2, 3];
    const results = await processWithLimit(items, 3, async (item) => {
        // Item 1 takes longest, item 3 fastest
        await delay((4 - item) * 30);
        return `item-${item}`;
    });
    assertDeepEqual(results, ['item-1', 'item-2', 'item-3'], 'Results maintain input order');

    // =========================================================================
    // Test processWithLimit - Concurrency Control
    // =========================================================================
    console.log('\n📋 SECTION 3: processWithLimit - Concurrency');
    console.log('-'.repeat(40));

    // Verify concurrency limit is respected
    const concurrencyTracker = createConcurrencyTracker();
    const testItems = [1, 2, 3, 4, 5, 6];
    const limit = 2;

    await processWithLimit(testItems, limit, async (item) => {
        concurrencyTracker.start();
        await delay(50);
        concurrencyTracker.end();
        return item;
    });

    totalTests++;
    if (concurrencyTracker.getMax() <= limit) {
        console.log(`✅ PASS: Concurrency limited to ${limit} (max was ${concurrencyTracker.getMax()})`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Concurrency exceeded limit of ${limit} (max was ${concurrencyTracker.getMax()})`);
        testsFailed++;
    }

    // Test with limit = 1 (sequential)
    const seqTracker = createConcurrencyTracker();
    await processWithLimit([1, 2, 3], 1, async (item) => {
        seqTracker.start();
        await delay(20);
        seqTracker.end();
        return item;
    });
    assertEqual(seqTracker.getMax(), 1, 'limit=1 processes sequentially (max 1)');

    // =========================================================================
    // Test processBatched
    // =========================================================================
    console.log('\n📋 SECTION 4: processBatched');
    console.log('-'.repeat(40));

    assertTypeOf(processBatched, 'function', 'processBatched is a function');

    // Test results
    const batchedItems = [1, 2, 3, 4, 5, 6];
    const batchedResults = await processBatched(batchedItems, 2, async (item) => {
        await delay(10);
        return item * 3;
    });
    assertDeepEqual(batchedResults, [3, 6, 9, 12, 15, 18], 'Batched results are correct');

    // Test batch timing - should process in batches
    const batchTracker = createConcurrencyTracker();
    const startTime = Date.now();
    
    await processBatched([1, 2, 3, 4], 2, async (item) => {
        batchTracker.start();
        await delay(50);
        batchTracker.end();
        return item;
    });
    
    const elapsed = Date.now() - startTime;
    
    // 4 items, batch of 2, each 50ms -> 2 batches = ~100ms
    totalTests++;
    if (elapsed >= 90 && elapsed < 200) {
        console.log(`✅ PASS: Batched processing time correct (${elapsed}ms for 2 batches)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Batched timing unexpected (${elapsed}ms, expected ~100ms)`);
        testsFailed++;
    }

    assertEqual(batchTracker.getMax(), 2, 'Batch concurrency matched batch size');

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 SECTION 5: Edge Cases');
    console.log('-'.repeat(40));

    // Empty array
    const emptyLimit = await processWithLimit([], 3, async x => x);
    assertDeepEqual(emptyLimit, [], 'processWithLimit handles empty array');

    const emptyBatch = await processBatched([], 3, async x => x);
    assertDeepEqual(emptyBatch, [], 'processBatched handles empty array');

    // Single item
    const singleLimit = await processWithLimit([42], 3, async x => x * 2);
    assertDeepEqual(singleLimit, [84], 'processWithLimit handles single item');

    // Limit larger than items
    const largeLimit = await processWithLimit([1, 2], 10, async x => x);
    assertDeepEqual(largeLimit, [1, 2], 'Works when limit > items');

    // Items not evenly divisible by batch size
    const unevenBatch = await processBatched([1, 2, 3, 4, 5], 2, async x => x);
    assertDeepEqual(unevenBatch, [1, 2, 3, 4, 5], 'Handles uneven batch sizes');

    // =========================================================================
    // Final Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));

    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests().catch(error => {
    console.error('Error running tests:', error);
    process.exit(1);
});
