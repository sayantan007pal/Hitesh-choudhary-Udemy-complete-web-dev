/**
 * Test Suite: Async Loop Optimization
 * ====================================
 * 
 * Run this file with: node _4_async_loop_optimization_test_example.js
 */

const {
    processItem,
    processSequentially,
    processInParallel,
    processWithForEach
} = require('./_4_async_loop_optimization_example.js');

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

function assertInstanceOf(obj, constructor, testName) {
    totalTests++;
    if (obj instanceof constructor) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected instance of: ${constructor.name}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Async Loop Optimization Tests');
    console.log('='.repeat(60) + '\n');

    const testIds = [1, 2, 3, 4];

    // =========================================================================
    // Test processItem Function
    // =========================================================================
    console.log('\n📋 SECTION 1: processItem Function');
    console.log('-'.repeat(40));

    assertTypeOf(processItem, 'function', 'processItem is a function');
    
    const itemPromise = processItem(42);
    assertInstanceOf(itemPromise, Promise, 'processItem returns a Promise');
    
    const item = await itemPromise;
    assertEqual(item.id, 42, 'processItem returns correct id');
    assertEqual(item.processed, true, 'processItem sets processed to true');
    assertTypeOf(item.timestamp, 'number', 'processItem includes timestamp');

    // =========================================================================
    // Test processSequentially Function
    // =========================================================================
    console.log('\n📋 SECTION 2: processSequentially (Slow Path)');
    console.log('-'.repeat(40));

    assertTypeOf(processSequentially, 'function', 'processSequentially is a function');

    const seqStartTime = Date.now();
    const seqResults = await processSequentially(testIds);
    const seqElapsed = Date.now() - seqStartTime;

    assertEqual(Array.isArray(seqResults), true, 'Sequential returns an array');
    assertEqual(seqResults.length, 4, 'Sequential returns 4 results');
    
    // Check all IDs are present
    const seqIds = seqResults.map(r => r.id);
    assertDeepEqual(seqIds.sort((a,b) => a-b), [1, 2, 3, 4], 'Sequential has all IDs');

    // Check timing - should be ~400ms for 4 items
    totalTests++;
    if (seqElapsed >= 350) {
        console.log(`✅ PASS: Sequential is actually sequential (took ${seqElapsed}ms >= 350ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Sequential seems parallel (took ${seqElapsed}ms, expected >= 350ms)`);
        testsFailed++;
    }

    // =========================================================================
    // Test processInParallel Function
    // =========================================================================
    console.log('\n📋 SECTION 3: processInParallel (Fast Path)');
    console.log('-'.repeat(40));

    assertTypeOf(processInParallel, 'function', 'processInParallel is a function');

    const parStartTime = Date.now();
    const parResults = await processInParallel(testIds);
    const parElapsed = Date.now() - parStartTime;

    assertEqual(Array.isArray(parResults), true, 'Parallel returns an array');
    assertEqual(parResults.length, 4, 'Parallel returns 4 results');
    
    // Check all IDs are present
    const parIds = parResults.map(r => r.id);
    assertDeepEqual(parIds.sort((a,b) => a-b), [1, 2, 3, 4], 'Parallel has all IDs');

    // Check timing - should be ~100ms (parallel execution)
    totalTests++;
    if (parElapsed < 200) {
        console.log(`✅ PASS: Parallel is actually parallel (took ${parElapsed}ms < 200ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Parallel seems sequential (took ${parElapsed}ms, expected < 200ms)`);
        testsFailed++;
    }

    // =========================================================================
    // Performance Comparison
    // =========================================================================
    console.log('\n📋 SECTION 4: Performance Comparison');
    console.log('-'.repeat(40));

    totalTests++;
    const speedup = seqElapsed / parElapsed;
    if (speedup >= 2) {
        console.log(`✅ PASS: Parallel is ${speedup.toFixed(2)}x faster than sequential`);
        console.log(`   Sequential: ${seqElapsed}ms`);
        console.log(`   Parallel:   ${parElapsed}ms`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Parallel should be at least 2x faster`);
        console.log(`   Sequential: ${seqElapsed}ms`);
        console.log(`   Parallel:   ${parElapsed}ms`);
        console.log(`   Speedup:    ${speedup.toFixed(2)}x (expected >= 2x)`);
        testsFailed++;
    }

    // =========================================================================
    // Test forEach Bug Demonstration
    // =========================================================================
    console.log('\n📋 SECTION 5: forEach Bug Demonstration');
    console.log('-'.repeat(40));

    assertTypeOf(processWithForEach, 'function', 'processWithForEach is a function');

    const forEachResult = await processWithForEach(testIds);
    
    // forEach with async callbacks doesn't wait - results should be empty or incomplete
    totalTests++;
    if (forEachResult.length === 0 || forEachResult.length < testIds.length) {
        console.log(`✅ PASS: forEach bug demonstrated - only got ${forEachResult.length} results (expected < 4)`);
        console.log(`   💡 This shows why forEach doesn't work with async/await!`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: forEach somehow worked? Got ${forEachResult.length} results`);
        console.log(`   Note: forEach should NOT wait for async callbacks`);
        testsFailed++;
    }

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 SECTION 6: Edge Cases');
    console.log('-'.repeat(40));

    // Empty array
    const emptySeq = await processSequentially([]);
    assertEqual(emptySeq.length, 0, 'Sequential handles empty array');

    const emptyPar = await processInParallel([]);
    assertEqual(emptyPar.length, 0, 'Parallel handles empty array');

    // Single item
    const singleSeq = await processSequentially([99]);
    assertEqual(singleSeq.length, 1, 'Sequential handles single item');
    assertEqual(singleSeq[0].id, 99, 'Sequential single item has correct id');

    const singlePar = await processInParallel([99]);
    assertEqual(singlePar.length, 1, 'Parallel handles single item');
    assertEqual(singlePar[0].id, 99, 'Parallel single item has correct id');

    // Large array (8 items)
    const largeIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const largeStart = Date.now();
    const largeResult = await processInParallel(largeIds);
    const largeElapsed = Date.now() - largeStart;
    
    assertEqual(largeResult.length, 8, 'Large parallel processes all 8 items');
    
    totalTests++;
    if (largeElapsed < 200) {
        console.log(`✅ PASS: 8 items in parallel took ${largeElapsed}ms (should be ~100ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: 8 items took ${largeElapsed}ms (expected < 200ms for parallel)`);
        testsFailed++;
    }

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
