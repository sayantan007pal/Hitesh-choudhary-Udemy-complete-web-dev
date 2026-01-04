/**
 * Test Suite for Challenge 2: Promise Creation and Resolution
 * ============================================================
 * 
 * Run this file with: node _2_test_example.js
 */

const {
    createResolvedPromise,
    delayedResolve,
    transformAsync
} = require('./_2_example.js');

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
        console.log(`   Expected: "${expected}"`);
        console.log(`   Actual:   "${actual}"`);
        testsFailed++;
        return false;
    }
}

function assertDeepEqual(actual, expected, testName) {
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

function assertTrue(condition, testName) {
    totalTests++;
    if (condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Promise Creation and Resolution Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: createResolvedPromise()
    // =========================================================================
    console.log('\n📋 TASK 1: createResolvedPromise()');
    console.log('-'.repeat(40));

    // Test 1.1: Returns a Promise
    const result1 = createResolvedPromise("test");
    assertTrue(result1 instanceof Promise, 'Returns a Promise');

    // Test 1.2: Resolves with string value
    const stringResult = await createResolvedPromise("hello world");
    assertEqual(stringResult, "hello world", 'Resolves with string value');

    // Test 1.3: Resolves with number value
    const numberResult = await createResolvedPromise(42);
    assertEqual(numberResult, 42, 'Resolves with number value');

    // Test 1.4: Resolves with object value
    const objResult = await createResolvedPromise({ name: "test" });
    assertDeepEqual(objResult, { name: "test" }, 'Resolves with object value');

    // Test 1.5: Resolves with null
    const nullResult = await createResolvedPromise(null);
    assertEqual(nullResult, null, 'Resolves with null value');

    // Test 1.6: Resolves with undefined
    const undefinedResult = await createResolvedPromise(undefined);
    assertEqual(undefinedResult, undefined, 'Resolves with undefined value');

    // =========================================================================
    // Task 2 Tests: delayedResolve()
    // =========================================================================
    console.log('\n📋 TASK 2: delayedResolve()');
    console.log('-'.repeat(40));

    // Test 2.1: Returns a Promise
    const delayedResult1 = delayedResolve("test", 100);
    assertTrue(delayedResult1 instanceof Promise, 'Returns a Promise');

    // Test 2.2: Resolves with correct value after delay
    const delayedValue = await delayedResolve("delayed value", 100);
    assertEqual(delayedValue, "delayed value", 'Resolves with correct value');

    // Test 2.3: Respects delay timing (should take at least delayMs)
    const startTime = Date.now();
    await delayedResolve("timing test", 200);
    const elapsed = Date.now() - startTime;
    assertTrue(elapsed >= 190 && elapsed <= 350, `Respects delay timing (took ${elapsed}ms)`);

    // Test 2.4: Works with 0ms delay
    const immediateStart = Date.now();
    await delayedResolve("zero delay", 0);
    const immediateElapsed = Date.now() - immediateStart;
    assertTrue(immediateElapsed < 100, 'Works with 0ms delay');

    // Test 2.5: Works with different data types
    const numDelayed = await delayedResolve(123, 50);
    assertEqual(numDelayed, 123, 'Works with number value');

    // =========================================================================
    // Task 3 Tests: transformAsync()
    // =========================================================================
    console.log('\n📋 TASK 3: transformAsync()');
    console.log('-'.repeat(40));

    // Test 3.1: Returns a Promise
    const transformResult1 = transformAsync(5, x => x);
    assertTrue(transformResult1 instanceof Promise, 'Returns a Promise');

    // Test 3.2: Applies transformation function (multiply)
    const multiplyResult = await transformAsync(5, x => x * 2);
    assertEqual(multiplyResult, 10, 'Applies multiply transformation');

    // Test 3.3: Applies transformation function (string manipulation)
    const upperResult = await transformAsync("hello", s => s.toUpperCase());
    assertEqual(upperResult, "HELLO", 'Applies string transformation');

    // Test 3.4: Works with arrow function returning object
    const objTransform = await transformAsync({ value: 10 }, obj => ({ value: obj.value + 5 }));
    assertDeepEqual(objTransform, { value: 15 }, 'Transforms object correctly');

    // Test 3.5: Identity transformation
    const identityResult = await transformAsync("same", x => x);
    assertEqual(identityResult, "same", 'Identity transformation works');

    // Test 3.6: Has async behavior (takes ~100ms)
    const asyncStart = Date.now();
    await transformAsync(1, x => x);
    const asyncElapsed = Date.now() - asyncStart;
    assertTrue(asyncElapsed >= 90 && asyncElapsed <= 200, `Has async delay (took ${asyncElapsed}ms)`);

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
