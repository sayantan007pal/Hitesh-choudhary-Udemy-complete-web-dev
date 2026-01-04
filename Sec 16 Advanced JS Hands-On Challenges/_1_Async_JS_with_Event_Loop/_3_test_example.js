/**
 * Test Suite for Challenge 3: Promise Rejection and Error Handling
 * =================================================================
 * 
 * Run this file with: node _3_test_example.js
 */

const {
    createRejectedPromise,
    validateNumber,
    safeAsyncCall
} = require('./_3_example.js');

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
    console.log('🧪 Running Promise Rejection and Error Handling Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: createRejectedPromise()
    // =========================================================================
    console.log('\n📋 TASK 1: createRejectedPromise()');
    console.log('-'.repeat(40));

    // Test 1.1: Returns a Promise
    const result1 = createRejectedPromise("test error");
    assertTrue(result1 instanceof Promise, 'Returns a Promise');

    // Test 1.2: Promise rejects (not resolves)
    let didReject = false;
    try {
        await createRejectedPromise("test");
    } catch (e) {
        didReject = true;
    }
    assertTrue(didReject, 'Promise rejects instead of resolving');

    // Test 1.3: Rejection contains Error object
    let errorObj = null;
    try {
        await createRejectedPromise("test error");
    } catch (e) {
        errorObj = e;
    }
    assertTrue(errorObj instanceof Error, 'Rejects with Error object');

    // Test 1.4: Error has correct message
    assertEqual(errorObj.message, "test error", 'Error has correct message');

    // Test 1.5: Works with different messages
    try {
        await createRejectedPromise("another error");
    } catch (e) {
        assertEqual(e.message, "another error", 'Works with different messages');
    }

    // =========================================================================
    // Task 2 Tests: validateNumber()
    // =========================================================================
    console.log('\n📋 TASK 2: validateNumber()');
    console.log('-'.repeat(40));

    // Test 2.1: Returns a Promise
    assertTrue(validateNumber(5) instanceof Promise, 'Returns a Promise');

    // Test 2.2: Resolves for positive number
    const validResult = await validateNumber(5);
    assertEqual(validResult, "Valid number: 5", 'Resolves for positive number');

    // Test 2.3: Resolves for different positive numbers
    const validResult2 = await validateNumber(100);
    assertEqual(validResult2, "Valid number: 100", 'Resolves for another positive number');

    // Test 2.4: Rejects for zero
    let zeroError = null;
    try {
        await validateNumber(0);
    } catch (e) {
        zeroError = e;
    }
    assertTrue(zeroError !== null, 'Rejects for zero');
    assertEqual(zeroError.message, "Invalid: number must be positive", 'Zero error message is correct');

    // Test 2.5: Rejects for negative number
    let negError = null;
    try {
        await validateNumber(-5);
    } catch (e) {
        negError = e;
    }
    assertEqual(negError.message, "Invalid: number must be positive", 'Negative number error correct');

    // Test 2.6: Rejects for non-number types
    let typeError = null;
    try {
        await validateNumber("abc");
    } catch (e) {
        typeError = e;
    }
    assertEqual(typeError.message, "Invalid: not a number", 'Rejects string with correct message');

    // Test 2.7: Rejects for null
    let nullError = null;
    try {
        await validateNumber(null);
    } catch (e) {
        nullError = e;
    }
    assertEqual(nullError.message, "Invalid: not a number", 'Rejects null correctly');

    // Test 2.8: Rejects for undefined
    let undefError = null;
    try {
        await validateNumber(undefined);
    } catch (e) {
        undefError = e;
    }
    assertEqual(undefError.message, "Invalid: not a number", 'Rejects undefined correctly');

    // =========================================================================
    // Task 3 Tests: safeAsyncCall()
    // =========================================================================
    console.log('\n📋 TASK 3: safeAsyncCall()');
    console.log('-'.repeat(40));

    // Test 3.1: Returns a Promise
    const safeResult1 = safeAsyncCall(async () => "test");
    assertTrue(safeResult1 instanceof Promise, 'Returns a Promise');

    // Test 3.2: Success case - returns success object
    const successFn = async () => "success data";
    const successResult = await safeAsyncCall(successFn);
    assertDeepEqual(successResult, { success: true, data: "success data" }, 'Success case returns correct object');

    // Test 3.3: Failure case - returns failure object (not rejection!)
    const failFn = async () => { throw new Error("failed"); };
    const failResult = await safeAsyncCall(failFn);
    assertDeepEqual(failResult, { success: false, error: "failed" }, 'Failure case returns error object');

    // Test 3.4: Never rejects - always resolves
    let didNotReject = true;
    try {
        await safeAsyncCall(async () => { throw new Error("test"); });
    } catch (e) {
        didNotReject = false;
    }
    assertTrue(didNotReject, 'Never rejects, always resolves');

    // Test 3.5: Works with different return values
    const numResult = await safeAsyncCall(async () => 42);
    assertDeepEqual(numResult, { success: true, data: 42 }, 'Works with number return');

    // Test 3.6: Works with object return values
    const objResult = await safeAsyncCall(async () => ({ name: "test" }));
    assertDeepEqual(objResult, { success: true, data: { name: "test" } }, 'Works with object return');

    // Test 3.7: Different error messages are captured
    const customError = await safeAsyncCall(async () => { throw new Error("custom error"); });
    assertEqual(customError.error, "custom error", 'Captures error message correctly');

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
