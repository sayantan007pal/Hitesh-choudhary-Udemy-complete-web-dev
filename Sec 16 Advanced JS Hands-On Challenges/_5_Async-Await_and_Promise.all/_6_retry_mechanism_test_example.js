/**
 * Test Suite: Retry Mechanism with Async/Await
 * =============================================
 * 
 * Run this file with: node _6_retry_mechanism_test_example.js
 */

const {
    delay,
    retryWithBackoff,
    createUnreliableAPI
} = require('./_6_retry_mechanism_example.js');

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
    console.log('🧪 Running Retry Mechanism Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test delay Function
    // =========================================================================
    console.log('\n📋 SECTION 1: delay Function');
    console.log('-'.repeat(40));

    assertTypeOf(delay, 'function', 'delay is a function');
    
    const delayPromise = delay(50);
    assertInstanceOf(delayPromise, Promise, 'delay returns a Promise');

    const startTime = Date.now();
    await delay(100);
    const elapsed = Date.now() - startTime;

    totalTests++;
    if (elapsed >= 90 && elapsed < 150) {
        console.log(`✅ PASS: delay waits correct time (${elapsed}ms for 100ms delay)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: delay timing off (took ${elapsed}ms, expected ~100ms)`);
        testsFailed++;
    }

    // =========================================================================
    // Test createUnreliableAPI Function
    // =========================================================================
    console.log('\n📋 SECTION 2: createUnreliableAPI Function');
    console.log('-'.repeat(40));

    assertTypeOf(createUnreliableAPI, 'function', 'createUnreliableAPI is a function');

    // API that fails 0 times (always succeeds)
    const alwaysSuccessAPI = createUnreliableAPI(0);
    const successResult = await alwaysSuccessAPI();
    assertEqual(successResult.success, true, 'API with failCount=0 succeeds immediately');
    assertEqual(successResult.attempt, 1, 'First attempt is attempt 1');

    // API that fails 2 times
    const failTwiceAPI = createUnreliableAPI(2);
    
    // First call should fail
    try {
        await failTwiceAPI();
        totalTests++;
        console.log('❌ FAIL: First call should fail');
        testsFailed++;
    } catch (error) {
        assertEqual(error.message, "API Error: Attempt 1 failed", 'First failure has correct message');
    }

    // Second call should fail
    try {
        await failTwiceAPI();
        totalTests++;
        console.log('❌ FAIL: Second call should fail');
        testsFailed++;
    } catch (error) {
        assertEqual(error.message, "API Error: Attempt 2 failed", 'Second failure has correct message');
    }

    // Third call should succeed
    const thirdResult = await failTwiceAPI();
    assertEqual(thirdResult.success, true, 'Third call succeeds');
    assertEqual(thirdResult.attempt, 3, 'Third call is attempt 3');

    // =========================================================================
    // Test retryWithBackoff Function
    // =========================================================================
    console.log('\n📋 SECTION 3: retryWithBackoff Function');
    console.log('-'.repeat(40));

    assertTypeOf(retryWithBackoff, 'function', 'retryWithBackoff is a function');

    // Test: Function succeeds on first try
    const immediateSuccess = async () => ({ data: "success" });
    const immediateResult = await retryWithBackoff(immediateSuccess, {
        maxRetries: 3,
        baseDelay: 10
    });
    assertDeepEqual(immediateResult, { data: "success" }, 'Immediate success returns result');

    // Test: Function fails twice, succeeds on third
    const failTwiceForRetry = createUnreliableAPI(2);
    const retryLog = [];
    
    const retryResult = await retryWithBackoff(failTwiceForRetry, {
        maxRetries: 5,
        baseDelay: 10,
        onRetry: (attempt, error) => retryLog.push({ attempt, message: error.message })
    });

    assertEqual(retryResult.success, true, 'Retry succeeds after failures');
    assertEqual(retryLog.length, 2, 'onRetry called twice for 2 failures');
    assertEqual(retryLog[0].attempt, 1, 'First retry is attempt 1');
    assertEqual(retryLog[1].attempt, 2, 'Second retry is attempt 2');

    // Test: All retries exhausted
    const alwaysFails = async () => { throw new Error("Permanent failure"); };
    
    try {
        await retryWithBackoff(alwaysFails, {
            maxRetries: 3,
            baseDelay: 10
        });
        totalTests++;
        console.log('❌ FAIL: Should throw after max retries');
        testsFailed++;
    } catch (error) {
        assertEqual(error.message, "Permanent failure", 'Throws last error after max retries');
    }

    // =========================================================================
    // Test Exponential Backoff Timing
    // =========================================================================
    console.log('\n📋 SECTION 4: Exponential Backoff Timing');
    console.log('-'.repeat(40));

    // Create API that fails 3 times
    const failThrice = createUnreliableAPI(3);
    const backoffStart = Date.now();
    
    await retryWithBackoff(failThrice, {
        maxRetries: 5,
        baseDelay: 50  // 50ms, 100ms, 200ms = 350ms minimum
    });
    
    const backoffElapsed = Date.now() - backoffStart;

    // Should take at least 50 + 100 + 200 = 350ms for exponential backoff
    // With some tolerance, check for >= 300ms
    totalTests++;
    if (backoffElapsed >= 250) {
        console.log(`✅ PASS: Exponential backoff timing correct (${backoffElapsed}ms >= 250ms)`);
        console.log(`   Expected delays: 50ms + 100ms + 200ms = 350ms`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Backoff too fast (${backoffElapsed}ms, expected >= 250ms)`);
        testsFailed++;
    }

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 SECTION 5: Edge Cases');
    console.log('-'.repeat(40));

    // maxRetries = 0 (should try once and fail)
    const zeroRetries = createUnreliableAPI(1);
    try {
        await retryWithBackoff(zeroRetries, {
            maxRetries: 0,
            baseDelay: 10
        });
        totalTests++;
        console.log('❌ FAIL: maxRetries=0 should fail if first attempt fails');
        testsFailed++;
    } catch (error) {
        totalTests++;
        console.log('✅ PASS: maxRetries=0 throws on first failure');
        testsPassed++;
    }

    // maxRetries = 1 
    const oneRetry = createUnreliableAPI(1);
    const oneRetryResult = await retryWithBackoff(oneRetry, {
        maxRetries: 1,
        baseDelay: 10
    });
    assertEqual(oneRetryResult.success, true, 'maxRetries=1 allows one retry');

    // No onRetry callback (should not throw)
    const noCallback = createUnreliableAPI(1);
    const noCallbackResult = await retryWithBackoff(noCallback, {
        maxRetries: 2,
        baseDelay: 10
        // No onRetry - should still work
    });
    assertEqual(noCallbackResult.success, true, 'Works without onRetry callback');

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
