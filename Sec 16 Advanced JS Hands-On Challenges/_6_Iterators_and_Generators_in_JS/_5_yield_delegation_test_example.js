/**
 * Test Suite for Yield Delegation (yield*) - Challenge 5
 * =======================================================
 * 
 * Run this file with: node _5_yield_delegation_test_example.js
 */

const {
    frontendGen,
    backendGen,
    databaseGen,
    fullStackGen,
    flattenArray,
    interleave
} = require('./_5_yield_delegation_example.js');

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

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Yield Delegation (yield*) Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: Combined Generators
    // =========================================================================
    console.log('\n📋 TASK 1: Combined Generators with yield*');
    console.log('-'.repeat(40));

    // Test 1.1: frontendGen works
    assertTypeOf(frontendGen, 'function', 'frontendGen is a function');
    assertDeepEqual([...frontendGen()], ['HTML', 'CSS', 'JavaScript'], 'frontendGen yields frontend techs');

    // Test 1.2: backendGen works
    assertTypeOf(backendGen, 'function', 'backendGen is a function');
    assertDeepEqual([...backendGen()], ['Node.js', 'Python', 'Java'], 'backendGen yields backend techs');

    // Test 1.3: databaseGen works
    assertTypeOf(databaseGen, 'function', 'databaseGen is a function');
    assertDeepEqual([...databaseGen()], ['MongoDB', 'PostgreSQL', 'MySQL'], 'databaseGen yields database techs');

    // Test 1.4: fullStackGen combines all three
    assertTypeOf(fullStackGen, 'function', 'fullStackGen is a function');
    const fullStack = [...fullStackGen()];
    assertDeepEqual(fullStack, [
        'HTML', 'CSS', 'JavaScript',
        'Node.js', 'Python', 'Java',
        'MongoDB', 'PostgreSQL', 'MySQL'
    ], 'fullStackGen combines all generators');

    // Test 1.5: fullStackGen has correct length
    assertEqual(fullStack.length, 9, 'fullStackGen yields 9 items');

    // Test 1.6: Individual generators still work after fullStack
    assertDeepEqual([...frontendGen()], ['HTML', 'CSS', 'JavaScript'], 'frontendGen still works independently');

    // Test 1.7: Order is correct in fullStack
    assertEqual(fullStack[0], 'HTML', 'First item is HTML');
    assertEqual(fullStack[3], 'Node.js', 'Fourth item is Node.js');
    assertEqual(fullStack[6], 'MongoDB', 'Seventh item is MongoDB');

    // =========================================================================
    // Task 2 Tests: flattenArray
    // =========================================================================
    console.log('\n📋 TASK 2: flattenArray with yield*');
    console.log('-'.repeat(40));

    // Test 2.1: flattenArray is a function
    assertTypeOf(flattenArray, 'function', 'flattenArray is a function');

    // Test 2.2: Flatten simple nested array
    assertDeepEqual([...flattenArray([1, [2, 3], 4])], [1, 2, 3, 4], 'Flattens [1, [2, 3], 4]');

    // Test 2.3: Deeply nested array
    assertDeepEqual(
        [...flattenArray([1, [2, [3, [4, [5]]]]])],
        [1, 2, 3, 4, 5],
        'Flattens deeply nested array'
    );

    // Test 2.4: Multiple nested at same level
    assertDeepEqual(
        [...flattenArray([[1, 2], [3, 4], [5, 6]])],
        [1, 2, 3, 4, 5, 6],
        'Flattens multiple sibling arrays'
    );

    // Test 2.5: Already flat array
    assertDeepEqual([...flattenArray([1, 2, 3])], [1, 2, 3], 'Already flat array unchanged');

    // Test 2.6: Empty nested arrays
    assertDeepEqual([...flattenArray([[], 1, [], 2, []])], [1, 2], 'Handles empty nested arrays');

    // Test 2.7: Empty array
    assertDeepEqual([...flattenArray([])], [], 'Empty array gives empty result');

    // Test 2.8: Mixed types
    assertDeepEqual(
        [...flattenArray([1, ['a', 'b'], [true, null]])],
        [1, 'a', 'b', true, null],
        'Handles mixed types'
    );

    // Test 2.9: Complex example from problem
    assertDeepEqual(
        [...flattenArray([1, [2, 3], [4, [5, 6]], 7])],
        [1, 2, 3, 4, 5, 6, 7],
        'Complex example: [1, [2, 3], [4, [5, 6]], 7]'
    );

    // Test 2.10: Single deeply nested value
    assertDeepEqual([...flattenArray([[[[42]]]])], [42], 'Single deeply nested value');

    // =========================================================================
    // Task 3 Tests: interleave
    // =========================================================================
    console.log('\n📋 TASK 3: interleave');
    console.log('-'.repeat(40));

    // Test 3.1: interleave is a function
    assertTypeOf(interleave, 'function', 'interleave is a function');

    // Test 3.2: Equal length arrays
    assertDeepEqual(
        [...interleave([1, 2, 3], ['a', 'b', 'c'])],
        [1, 'a', 2, 'b', 3, 'c'],
        'Equal length: [1,2,3] + [a,b,c]'
    );

    // Test 3.3: First longer
    assertDeepEqual(
        [...interleave([1, 2, 3, 4], ['x'])],
        [1, 'x', 2, 3, 4],
        'First longer: [1,2,3,4] + [x]'
    );

    // Test 3.4: Second longer
    assertDeepEqual(
        [...interleave([1, 2], ['a', 'b', 'c', 'd'])],
        [1, 'a', 2, 'b', 'c', 'd'],
        'Second longer: [1,2] + [a,b,c,d]'
    );

    // Test 3.5: First empty
    assertDeepEqual(
        [...interleave([], [1, 2, 3])],
        [1, 2, 3],
        'First empty: [] + [1,2,3]'
    );

    // Test 3.6: Second empty
    assertDeepEqual(
        [...interleave([1, 2, 3], [])],
        [1, 2, 3],
        'Second empty: [1,2,3] + []'
    );

    // Test 3.7: Both empty
    assertDeepEqual(
        [...interleave([], [])],
        [],
        'Both empty: [] + []'
    );

    // Test 3.8: Single element each
    assertDeepEqual(
        [...interleave([1], ['a'])],
        [1, 'a'],
        'Single each: [1] + [a]'
    );

    // Test 3.9: Works with strings (iterables)
    assertDeepEqual(
        [...interleave('AB', 'xy')],
        ['A', 'x', 'B', 'y'],
        'Works with strings: AB + xy'
    );

    // Test 3.10: Works with different iterables
    assertDeepEqual(
        [...interleave([1, 2, 3], 'abc')],
        [1, 'a', 2, 'b', 3, 'c'],
        'Array + string: [1,2,3] + abc'
    );

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
