/**
 * Test Suite for Iterators and Generators in JavaScript
 * ======================================================
 * 
 * Run this file with: node _1_test_example.js
 */

const {
    numberGenerator,
    rangeIterator,
    fibonacciGenerator
} = require('./_1_example.js');

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

function assertFalse(value, testName) {
    totalTests++;
    if (value === false) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: false`);
        console.log(`   Actual:   ${value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Iterators and Generators Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: numberGenerator
    // =========================================================================
    console.log('\n📋 TASK 1: numberGenerator');
    console.log('-'.repeat(40));

    // Test 1.1: numberGenerator is a generator function
    assertTypeOf(numberGenerator, 'function', 'numberGenerator is a function');

    // Test 1.2: numberGenerator returns an iterator
    const gen = numberGenerator();
    assertTypeOf(gen.next, 'function', 'numberGenerator() returns object with next() method');

    // Test 1.3: First yield returns 1
    const first = gen.next();
    assertEqual(first.value, 1, 'First next() returns value: 1');
    assertFalse(first.done, 'First next() has done: false');

    // Test 1.4: Second yield returns 2
    const second = gen.next();
    assertEqual(second.value, 2, 'Second next() returns value: 2');
    assertFalse(second.done, 'Second next() has done: false');

    // Test 1.5: Third yield returns 3
    const third = gen.next();
    assertEqual(third.value, 3, 'Third next() returns value: 3');
    assertFalse(third.done, 'Third next() has done: false');

    // Test 1.6: Fourth next() is done
    const fourth = gen.next();
    assertEqual(fourth.value, undefined, 'Fourth next() returns value: undefined');
    assertTrue(fourth.done, 'Fourth next() has done: true');

    // Test 1.7: Can iterate with for...of
    const values = [];
    for (const num of numberGenerator()) {
        values.push(num);
    }
    assertDeepEqual(values, [1, 2, 3], 'Can iterate with for...of loop');

    // Test 1.8: Spread operator works
    const spread = [...numberGenerator()];
    assertDeepEqual(spread, [1, 2, 3], 'Spread operator works on generator');

    // =========================================================================
    // Task 2 Tests: rangeIterator
    // =========================================================================
    console.log('\n📋 TASK 2: rangeIterator');
    console.log('-'.repeat(40));

    // Test 2.1: rangeIterator is a function
    assertTypeOf(rangeIterator, 'function', 'rangeIterator is a function');

    // Test 2.2: rangeIterator returns an iterator object
    const iter = rangeIterator(1, 3);
    assertTypeOf(iter.next, 'function', 'rangeIterator() returns object with next() method');

    // Test 2.3: First next() returns start value
    const r1 = iter.next();
    assertEqual(r1.value, 1, 'First next() returns start value: 1');
    assertFalse(r1.done, 'First next() has done: false');

    // Test 2.4: Second next() returns 2
    const r2 = iter.next();
    assertEqual(r2.value, 2, 'Second next() returns value: 2');
    assertFalse(r2.done, 'Second next() has done: false');

    // Test 2.5: Third next() returns end value
    const r3 = iter.next();
    assertEqual(r3.value, 3, 'Third next() returns end value: 3');
    assertFalse(r3.done, 'Third next() has done: false');

    // Test 2.6: Fourth next() is done
    const r4 = iter.next();
    assertEqual(r4.value, undefined, 'Fourth next() returns value: undefined');
    assertTrue(r4.done, 'Fourth next() has done: true');

    // Test 2.7: Different range works
    const iter2 = rangeIterator(5, 7);
    assertEqual(iter2.next().value, 5, 'Different range: first value is 5');
    assertEqual(iter2.next().value, 6, 'Different range: second value is 6');
    assertEqual(iter2.next().value, 7, 'Different range: third value is 7');
    assertTrue(iter2.next().done, 'Different range: done after last value');

    // Test 2.8: Single element range
    const singleIter = rangeIterator(42, 42);
    assertEqual(singleIter.next().value, 42, 'Single element range returns the value');
    assertTrue(singleIter.next().done, 'Single element range is done after one next()');

    // Test 2.9: Range with negative numbers
    const negIter = rangeIterator(-2, 0);
    assertEqual(negIter.next().value, -2, 'Negative range: first value is -2');
    assertEqual(negIter.next().value, -1, 'Negative range: second value is -1');
    assertEqual(negIter.next().value, 0, 'Negative range: third value is 0');

    // Test 2.10: Large range (just test first few)
    const largeIter = rangeIterator(100, 105);
    assertEqual(largeIter.next().value, 100, 'Large range: starts at 100');
    largeIter.next(); largeIter.next(); largeIter.next(); largeIter.next();
    assertEqual(largeIter.next().value, 105, 'Large range: ends at 105');

    // =========================================================================
    // Task 3 Tests: fibonacciGenerator
    // =========================================================================
    console.log('\n📋 TASK 3: fibonacciGenerator');
    console.log('-'.repeat(40));

    // Test 3.1: fibonacciGenerator is a function
    assertTypeOf(fibonacciGenerator, 'function', 'fibonacciGenerator is a function');

    // Test 3.2: fibonacciGenerator returns an iterator
    const fib = fibonacciGenerator();
    assertTypeOf(fib.next, 'function', 'fibonacciGenerator() returns object with next() method');

    // Test 3.3: First Fibonacci number is 1
    assertEqual(fib.next().value, 1, 'First Fibonacci number is 1');

    // Test 3.4: Second Fibonacci number is 1
    assertEqual(fib.next().value, 1, 'Second Fibonacci number is 1');

    // Test 3.5: Third Fibonacci number is 2
    assertEqual(fib.next().value, 2, 'Third Fibonacci number is 2');

    // Test 3.6: Fourth Fibonacci number is 3
    assertEqual(fib.next().value, 3, 'Fourth Fibonacci number is 3');

    // Test 3.7: Fifth Fibonacci number is 5
    assertEqual(fib.next().value, 5, 'Fifth Fibonacci number is 5');

    // Test 3.8: Sixth Fibonacci number is 8
    assertEqual(fib.next().value, 8, 'Sixth Fibonacci number is 8');

    // Test 3.9: Seventh Fibonacci number is 13
    assertEqual(fib.next().value, 13, 'Seventh Fibonacci number is 13');

    // Test 3.10: Generator continues indefinitely (test 10th number)
    fib.next(); fib.next(); // 21, 34
    const tenthFib = fib.next().value; // 55
    assertEqual(tenthFib, 55, 'Tenth Fibonacci number is 55');

    // Test 3.11: New generator starts fresh
    const fib2 = fibonacciGenerator();
    assertEqual(fib2.next().value, 1, 'New generator starts at 1');
    assertEqual(fib2.next().value, 1, 'New generator second value is 1');

    // Test 3.12: Collect first 10 Fibonacci numbers
    const fib3 = fibonacciGenerator();
    const first10 = [];
    for (let i = 0; i < 10; i++) {
        first10.push(fib3.next().value);
    }
    assertDeepEqual(first10, [1, 1, 2, 3, 5, 8, 13, 21, 34, 55], 'First 10 Fibonacci numbers are correct');

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
