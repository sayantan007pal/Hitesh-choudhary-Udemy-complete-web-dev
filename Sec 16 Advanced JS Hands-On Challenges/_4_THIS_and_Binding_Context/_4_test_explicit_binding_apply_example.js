/**
 * Test Suite for Explicit Binding with apply() Challenge
 * =======================================================
 * 
 * Run this file with: node _4_test_explicit_binding_apply_example.js
 */

const {
    calculator,
    findMax,
    findMin,
    computeStats,
    mergeAndCompute
} = require('./_4_explicit_binding_apply_example.js');

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

function assertObjectEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
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

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Explicit Binding with apply() Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test calculator object
    // =========================================================================
    console.log('\n📋 CALCULATOR OBJECT');
    console.log('-'.repeat(40));

    // Test 1: calculator exists
    assertTypeOf(calculator, 'object', 'calculator is an object');

    // Test 2: calculator has precision property
    assertEqual(calculator.precision, 2, 'calculator.precision is 2');

    // Test 3: calculator has round method
    assertTypeOf(calculator.round, 'function', 'calculator.round is a function');

    // Test 4: round method works correctly
    assertEqual(calculator.round(3.14159), 3.14, 'calculator.round(3.14159) returns 3.14');
    assertEqual(calculator.round(2.5), 2.5, 'calculator.round(2.5) returns 2.5');

    // =========================================================================
    // Test findMax with apply()
    // =========================================================================
    console.log('\n📋 FIND MAX WITH APPLY()');
    console.log('-'.repeat(40));

    // Test 5: findMax function exists
    assertTypeOf(findMax, 'function', 'findMax is a function');

    // Test 6: findMax works with positive numbers
    assertEqual(findMax([5, 2, 9, 1, 7]), 9, 'findMax([5, 2, 9, 1, 7]) returns 9');

    // Test 7: findMax works with negative numbers
    assertEqual(findMax([-5, -2, -9, -1]), -1, 'findMax([-5, -2, -9, -1]) returns -1');

    // Test 8: findMax with single element
    assertEqual(findMax([42]), 42, 'findMax([42]) returns 42');

    // Test 9: findMax with mixed numbers
    assertEqual(findMax([-10, 0, 10, 5]), 10, 'findMax([-10, 0, 10, 5]) returns 10');

    // =========================================================================
    // Test findMin with apply()
    // =========================================================================
    console.log('\n📋 FIND MIN WITH APPLY()');
    console.log('-'.repeat(40));

    // Test 10: findMin function exists
    assertTypeOf(findMin, 'function', 'findMin is a function');

    // Test 11: findMin works with positive numbers
    assertEqual(findMin([5, 2, 9, 1, 7]), 1, 'findMin([5, 2, 9, 1, 7]) returns 1');

    // Test 12: findMin works with negative numbers
    assertEqual(findMin([-5, -2, -9, -1]), -9, 'findMin([-5, -2, -9, -1]) returns -9');

    // Test 13: findMin with single element
    assertEqual(findMin([42]), 42, 'findMin([42]) returns 42');

    // =========================================================================
    // Test computeStats with apply()
    // =========================================================================
    console.log('\n📋 COMPUTE STATS WITH APPLY()');
    console.log('-'.repeat(40));

    // Test 14: computeStats function exists
    assertTypeOf(computeStats, 'function', 'computeStats is a function');

    // Test 15: computeStats with basic array
    assertObjectEqual(
        computeStats.apply(calculator, [[10, 20, 30]]),
        { min: 10, max: 30, sum: 60, average: 20, range: 20 },
        'computeStats.apply(calculator, [[10, 20, 30]]) returns correct stats'
    );

    // Test 16: computeStats with decimals (tests precision)
    assertObjectEqual(
        computeStats.apply(calculator, [[1, 2, 3, 4, 5]]),
        { min: 1, max: 5, sum: 15, average: 3, range: 4 },
        'computeStats with [1, 2, 3, 4, 5] returns correct stats'
    );

    // Test 17: computeStats with single element
    assertObjectEqual(
        computeStats.apply(calculator, [[5]]),
        { min: 5, max: 5, sum: 5, average: 5, range: 0 },
        'computeStats with single element returns correct stats'
    );

    // Test 18: computeStats with precision rounding
    assertObjectEqual(
        computeStats.apply(calculator, [[1, 2, 4]]),
        { min: 1, max: 4, sum: 7, average: 2.33, range: 3 },
        'computeStats rounds average to 2 decimal places'
    );

    // =========================================================================
    // Test mergeAndCompute
    // =========================================================================
    console.log('\n📋 MERGE AND COMPUTE WITH APPLY()');
    console.log('-'.repeat(40));

    // Test 19: mergeAndCompute function exists
    assertTypeOf(mergeAndCompute, 'function', 'mergeAndCompute is a function');

    // Test 20: mergeAndCompute with multiple arrays
    assertObjectEqual(
        mergeAndCompute.apply(calculator, [[1, 2], [3, 4], [5]]),
        { min: 1, max: 5, sum: 15, average: 3, range: 4 },
        'mergeAndCompute merges arrays and computes stats correctly'
    );

    // Test 21: mergeAndCompute with single array
    assertObjectEqual(
        mergeAndCompute.apply(calculator, [[10, 20]]),
        { min: 10, max: 20, sum: 30, average: 15, range: 10 },
        'mergeAndCompute works with single array'
    );

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test 22: Different precision
    const preciseCalculator = { precision: 4, round: calculator.round };
    assertObjectEqual(
        computeStats.apply(preciseCalculator, [[1, 2, 3]]),
        { min: 1, max: 3, sum: 6, average: 2, range: 2 },
        'computeStats works with different precision context'
    );

    // Test 23: Large numbers
    assertEqual(findMax([1000000, 2000000, 500000]), 2000000, 'findMax works with large numbers');

    // Test 24: Decimal numbers
    assertEqual(findMax([1.5, 2.7, 0.3]), 2.7, 'findMax works with decimal numbers');
    assertEqual(findMin([1.5, 2.7, 0.3]), 0.3, 'findMin works with decimal numbers');

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

runTests();
