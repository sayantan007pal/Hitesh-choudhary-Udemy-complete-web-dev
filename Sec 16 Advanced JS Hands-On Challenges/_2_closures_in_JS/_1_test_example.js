/**
 * Test Suite for Closures in JavaScript Challenges
 * =================================================
 * 
 * Run this file with: node _1_test_example.js
 */

const {
    createCounter,
    rateLimiter,
    memoize
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

function assertStrictEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expected}`);
        console.log(`   Actual:   ${actual}`);
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// =============================================================================
// Test Cases
// =============================================================================

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Closures in JavaScript Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: createCounter()
    // =========================================================================
    console.log('\n📋 TASK 1: createCounter()');
    console.log('-'.repeat(40));

    // Test 1.1: Function exists
    assertTypeOf(createCounter, 'function', 'createCounter is a function');

    // Test 1.2: Returns a function
    const counter = createCounter();
    assertTypeOf(counter, 'function', 'createCounter() returns a function');

    // Test 1.3: First call returns 1
    const firstCall = counter();
    assertEqual(firstCall, 1, 'First call returns 1');

    // Test 1.4: Second call returns 2
    const secondCall = counter();
    assertEqual(secondCall, 2, 'Second call returns 2');

    // Test 1.5: Third call returns 3
    const thirdCall = counter();
    assertEqual(thirdCall, 3, 'Third call returns 3');

    // Test 1.6: Independent counters - each starts fresh
    const counter1 = createCounter();
    const counter2 = createCounter();
    assertEqual(counter1(), 1, 'Independent counter1 starts at 1');
    assertEqual(counter2(), 1, 'Independent counter2 also starts at 1');
    assertEqual(counter1(), 2, 'counter1 increments independently');
    assertEqual(counter2(), 2, 'counter2 increments independently');

    // Test 1.7: Counter preserves state across many calls
    const counter3 = createCounter();
    for (let i = 0; i < 10; i++) counter3();
    assertEqual(counter3(), 11, 'Counter preserves state across many calls');

    // =========================================================================
    // Task 2 Tests: rateLimiter()
    // =========================================================================
    console.log('\n📋 TASK 2: rateLimiter()');
    console.log('-'.repeat(40));

    // Test 2.1: Function exists
    assertTypeOf(rateLimiter, 'function', 'rateLimiter is a function');

    // Test 2.2: Returns a function
    const testFn = () => "Success!";
    const limitedFn = rateLimiter(testFn, 500);
    assertTypeOf(limitedFn, 'function', 'rateLimiter() returns a function');

    // Test 2.3: First call succeeds
    const firstResult = limitedFn();
    assertEqual(firstResult, "Success!", 'First call returns function result');

    // Test 2.4: Immediate second call is rate limited
    const secondResult = limitedFn();
    assertEqual(secondResult, "Rate limit exceeded", 'Immediate second call is rate limited');

    // Test 2.5: Third immediate call is also rate limited
    const thirdResult = limitedFn();
    assertEqual(thirdResult, "Rate limit exceeded", 'Third immediate call is also rate limited');

    // Test 2.6: After waiting, calling succeeds again
    await delay(550);
    const afterWaitResult = limitedFn();
    assertEqual(afterWaitResult, "Success!", 'After waiting, call succeeds again');

    // Test 2.7: Rate limit resets after successful call
    const limitedAfterReset = limitedFn();
    assertEqual(limitedAfterReset, "Rate limit exceeded", 'Rate limit resets after successful call');

    // Test 2.8: Different rate limited functions are independent
    const limitedFn1 = rateLimiter(() => "A", 100);
    const limitedFn2 = rateLimiter(() => "B", 100);
    assertEqual(limitedFn1(), "A", 'First limited function works');
    assertEqual(limitedFn2(), "B", 'Second limited function works independently');

    // Test 2.9: Function with arguments works
    const addFn = (a, b) => a + b;
    const limitedAdd = rateLimiter(addFn, 100);
    assertEqual(limitedAdd(2, 3), 5, 'Rate limited function with arguments works');

    await delay(150);

    // =========================================================================
    // Task 3 Tests: memoize()
    // =========================================================================
    console.log('\n📋 TASK 3: memoize()');
    console.log('-'.repeat(40));

    // Test 3.1: Function exists
    assertTypeOf(memoize, 'function', 'memoize is a function');

    // Test 3.2: Returns a function
    const square = (n) => n * n;
    const memoizedSquare = memoize(square);
    assertTypeOf(memoizedSquare, 'function', 'memoize() returns a function');

    // Test 3.3: Returns correct result
    assertEqual(memoizedSquare(5), 25, 'memoized function returns correct result (5²=25)');

    // Test 3.4: Returns correct result for different input
    assertEqual(memoizedSquare(6), 36, 'memoized function returns correct result (6²=36)');

    // Test 3.5: Cached result is returned (check with call counter)
    let callCount = 0;
    const expensiveFn = (n) => {
        callCount++;
        return n * 2;
    };
    const memoizedExpensive = memoize(expensiveFn);
    
    memoizedExpensive(10);
    memoizedExpensive(10);
    memoizedExpensive(10);
    assertEqual(callCount, 1, 'Function is only called once for same input (caching works)');

    // Test 3.6: Different inputs call the function
    memoizedExpensive(20);
    assertEqual(callCount, 2, 'Different input calls the function again');

    // Test 3.7: String arguments work
    const toUpper = (str) => str.toUpperCase();
    const memoizedUpper = memoize(toUpper);
    assertEqual(memoizedUpper("hello"), "HELLO", 'Memoize works with string arguments');
    assertEqual(memoizedUpper("hello"), "HELLO", 'Cached string result is returned');

    // Test 3.8: Edge case - memoize with 0
    const double = memoize((n) => n * 2);
    assertEqual(double(0), 0, 'Memoize works with 0 as argument');

    // Test 3.9: Edge case - memoize with negative numbers
    assertEqual(double(-5), -10, 'Memoize works with negative numbers');

    // Test 3.10: Edge case - memoize with undefined/null
    const identity = memoize((x) => x);
    assertEqual(identity(undefined), undefined, 'Memoize works with undefined');
    assertEqual(identity(null), null, 'Memoize works with null');

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
