/**
 * Test Suite for Custom Iterable Objects - Challenge 3
 * =====================================================
 * 
 * Run this file with: node _3_custom_iterable_object_test_example.js
 */

const {
    createIterableRange,
    IterableCollection,
    makeReversedIterable
} = require('./_3_custom_iterable_object_example.js');

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

function assertTrue(value, testName) {
    totalTests++;
    if (value === true) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: true`);
        console.log(`   Actual:   ${value}`);
        testsFailed++;
        return false;
    }
}

function assertInstanceOf(value, constructor, testName) {
    totalTests++;
    if (value instanceof constructor) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected instance of: ${constructor.name}`);
        console.log(`   Actual:   ${typeof value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Custom Iterable Objects Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: createIterableRange
    // =========================================================================
    console.log('\n📋 TASK 1: createIterableRange');
    console.log('-'.repeat(40));

    // Test 1.1: createIterableRange is a function
    assertTypeOf(createIterableRange, 'function', 'createIterableRange is a function');

    // Test 1.2: Returns an object
    const range1 = createIterableRange(1, 5);
    assertTypeOf(range1, 'object', 'Returns an object');

    // Test 1.3: Object has Symbol.iterator
    assertTypeOf(range1[Symbol.iterator], 'function', 'Object has Symbol.iterator method');

    // Test 1.4: Spread operator works
    assertDeepEqual([...range1], [1, 2, 3, 4, 5], 'Spread operator gives [1, 2, 3, 4, 5]');

    // Test 1.5: for...of loop works
    const loopResults = [];
    for (const num of createIterableRange(3, 6)) {
        loopResults.push(num);
    }
    assertDeepEqual(loopResults, [3, 4, 5, 6], 'for...of loop works correctly');

    // Test 1.6: Single element range
    assertDeepEqual([...createIterableRange(42, 42)], [42], 'Single element range [42] works');

    // Test 1.7: Negative numbers
    assertDeepEqual([...createIterableRange(-3, 1)], [-3, -2, -1, 0, 1], 'Negative range works');

    // Test 1.8: Large range
    const largeRange = createIterableRange(1, 100);
    const largeResult = [...largeRange];
    assertEqual(largeResult.length, 100, 'Large range has 100 elements');
    assertEqual(largeResult[0], 1, 'Large range starts at 1');
    assertEqual(largeResult[99], 100, 'Large range ends at 100');

    // Test 1.9: Object has start and end properties
    const rangeWithProps = createIterableRange(5, 10);
    assertEqual(rangeWithProps.start, 5, 'Object has start property');
    assertEqual(rangeWithProps.end, 10, 'Object has end property');

    // Test 1.10: Can iterate multiple times
    const reusableRange = createIterableRange(1, 3);
    assertDeepEqual([...reusableRange], [1, 2, 3], 'First iteration works');
    assertDeepEqual([...reusableRange], [1, 2, 3], 'Second iteration works (reusable)');

    // =========================================================================
    // Task 2 Tests: IterableCollection
    // =========================================================================
    console.log('\n📋 TASK 2: IterableCollection');
    console.log('-'.repeat(40));

    // Test 2.1: IterableCollection is a class/function
    assertTypeOf(IterableCollection, 'function', 'IterableCollection is a constructor');

    // Test 2.2: Can create instance
    const collection = new IterableCollection(['a', 'b', 'c']);
    assertInstanceOf(collection, IterableCollection, 'Creates IterableCollection instance');

    // Test 2.3: Has Symbol.iterator
    assertTypeOf(collection[Symbol.iterator], 'function', 'Has Symbol.iterator method');

    // Test 2.4: Spread operator works
    assertDeepEqual([...collection], ['a', 'b', 'c'], 'Spread operator works');

    // Test 2.5: for...of loop works
    const collectionItems = [];
    for (const item of collection) {
        collectionItems.push(item);
    }
    assertDeepEqual(collectionItems, ['a', 'b', 'c'], 'for...of loop works');

    // Test 2.6: add() method works
    collection.add('d');
    assertDeepEqual([...collection], ['a', 'b', 'c', 'd'], 'add() method adds item');

    // Test 2.7: size getter works
    assertEqual(collection.size, 4, 'size getter returns correct count');

    // Test 2.8: Empty collection
    const emptyCollection = new IterableCollection([]);
    assertEqual(emptyCollection.size, 0, 'Empty collection has size 0');
    assertDeepEqual([...emptyCollection], [], 'Empty collection spreads to []');

    // Test 2.9: Adding to empty collection
    emptyCollection.add('first');
    assertEqual(emptyCollection.size, 1, 'Size updates after add()');
    assertDeepEqual([...emptyCollection], ['first'], 'Added item is iterable');

    // Test 2.10: Mixed types in collection
    const mixedCollection = new IterableCollection([1, 'two', { three: 3 }, null]);
    assertEqual(mixedCollection.size, 4, 'Mixed types collection has size 4');

    // Test 2.11: Multiple iterations
    const reusableCollection = new IterableCollection([1, 2, 3]);
    assertDeepEqual([...reusableCollection], [1, 2, 3], 'First iteration');
    assertDeepEqual([...reusableCollection], [1, 2, 3], 'Second iteration (reusable)');

    // =========================================================================
    // Task 3 Tests: makeReversedIterable
    // =========================================================================
    console.log('\n📋 TASK 3: makeReversedIterable');
    console.log('-'.repeat(40));

    // Test 3.1: makeReversedIterable is a function
    assertTypeOf(makeReversedIterable, 'function', 'makeReversedIterable is a function');

    // Test 3.2: Returns an object with Symbol.iterator
    const reversed = makeReversedIterable([1, 2, 3]);
    assertTypeOf(reversed[Symbol.iterator], 'function', 'Returns object with Symbol.iterator');

    // Test 3.3: Iterates in reverse order
    assertDeepEqual([...reversed], [3, 2, 1], 'Iterates in reverse: [3, 2, 1]');

    // Test 3.4: Does not modify original array
    const original = [1, 2, 3, 4, 5];
    const reversedOriginal = makeReversedIterable(original);
    [...reversedOriginal]; // consume the iterator
    assertDeepEqual(original, [1, 2, 3, 4, 5], 'Original array is NOT modified');

    // Test 3.5: Strings in reverse
    assertDeepEqual([...makeReversedIterable(['a', 'b', 'c'])], ['c', 'b', 'a'], 'Strings reverse correctly');

    // Test 3.6: Single element
    assertDeepEqual([...makeReversedIterable([42])], [42], 'Single element [42] stays [42]');

    // Test 3.7: Empty array
    assertDeepEqual([...makeReversedIterable([])], [], 'Empty array gives empty result');

    // Test 3.8: for...of loop works
    const loopReversed = [];
    for (const val of makeReversedIterable(['x', 'y', 'z'])) {
        loopReversed.push(val);
    }
    assertDeepEqual(loopReversed, ['z', 'y', 'x'], 'for...of loop works in reverse');

    // Test 3.9: Large array
    const largeArray = Array.from({ length: 100 }, (_, i) => i + 1);
    const reversedLarge = [...makeReversedIterable(largeArray)];
    assertEqual(reversedLarge[0], 100, 'Large array: first reversed element is 100');
    assertEqual(reversedLarge[99], 1, 'Large array: last reversed element is 1');

    // Test 3.10: Can iterate multiple times
    const reusableReversed = makeReversedIterable([1, 2, 3]);
    assertDeepEqual([...reusableReversed], [3, 2, 1], 'First reverse iteration');
    assertDeepEqual([...reusableReversed], [3, 2, 1], 'Second reverse iteration (reusable)');

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
