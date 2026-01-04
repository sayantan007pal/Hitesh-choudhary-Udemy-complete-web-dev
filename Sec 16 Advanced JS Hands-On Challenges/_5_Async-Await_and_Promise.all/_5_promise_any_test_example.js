/**
 * Test Suite: Promise.any - First Successful Resolution
 * ======================================================
 * 
 * Run this file with: node _5_promise_any_test_example.js
 */

const {
    fetchFromServer,
    getFastestResponse,
    raceWithFallback
} = require('./_5_promise_any_example.js');

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
    console.log('🧪 Running Promise.any Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test fetchFromServer Function
    // =========================================================================
    console.log('\n📋 SECTION 1: fetchFromServer Function');
    console.log('-'.repeat(40));

    assertTypeOf(fetchFromServer, 'function', 'fetchFromServer is a function');
    
    const serverPromise = fetchFromServer("server1", 50, false);
    assertInstanceOf(serverPromise, Promise, 'fetchFromServer returns a Promise');

    // Test successful server
    const successResult = await fetchFromServer("primary", 50, false);
    assertDeepEqual(successResult, { 
        server: "primary", 
        data: "Response from primary" 
    }, 'Successful server returns correct response');

    // Test failed server
    try {
        await fetchFromServer("backup", 50, true);
        totalTests++;
        console.log('❌ FAIL: Failed server should throw');
        testsFailed++;
    } catch (error) {
        assertEqual(error.message, "Server backup failed", 'Failed server throws correct error');
    }

    // =========================================================================
    // Test getFastestResponse Function
    // =========================================================================
    console.log('\n📋 SECTION 2: getFastestResponse Function');
    console.log('-'.repeat(40));

    assertTypeOf(getFastestResponse, 'function', 'getFastestResponse is a function');

    // Test: Fast server wins
    const fastWinsConfig = [
        { id: "slow", delay: 300, shouldFail: false },
        { id: "fast", delay: 50, shouldFail: false },
        { id: "medium", delay: 150, shouldFail: false }
    ];
    const fastWinsResult = await getFastestResponse(fastWinsConfig);
    assertEqual(fastWinsResult.server, "fast", 'Fastest server wins');
    assertEqual(fastWinsResult.data, "Response from fast", 'Fastest server data is correct');

    // Test: Skip failed servers, get next fastest
    const skipFailedConfig = [
        { id: "broken1", delay: 50, shouldFail: true },
        { id: "working", delay: 100, shouldFail: false },
        { id: "broken2", delay: 75, shouldFail: true }
    ];
    const skipFailedResult = await getFastestResponse(skipFailedConfig);
    assertEqual(skipFailedResult.server, "working", 'Skips failed servers, gets first working');

    // Test: All servers fail
    const allFailConfig = [
        { id: "fail1", delay: 50, shouldFail: true },
        { id: "fail2", delay: 100, shouldFail: true }
    ];
    const allFailResult = await getFastestResponse(allFailConfig);
    assertEqual(allFailResult.error, "All servers failed", 'Returns error when all fail');
    assertEqual(Array.isArray(allFailResult.failures), true, 'Returns failures array');
    assertEqual(allFailResult.failures.length, 2, 'Failures array has all errors');

    // Test: Single server succeeds
    const singleSuccessConfig = [{ id: "only", delay: 50, shouldFail: false }];
    const singleResult = await getFastestResponse(singleSuccessConfig);
    assertEqual(singleResult.server, "only", 'Single server works');

    // Test: Single server fails
    const singleFailConfig = [{ id: "only", delay: 50, shouldFail: true }];
    const singleFailResult = await getFastestResponse(singleFailConfig);
    assertEqual(singleFailResult.error, "All servers failed", 'Single failed server returns error');

    // =========================================================================
    // Test raceWithFallback Function
    // =========================================================================
    console.log('\n📋 SECTION 3: raceWithFallback Function');
    console.log('-'.repeat(40));

    assertTypeOf(raceWithFallback, 'function', 'raceWithFallback is a function');

    // Test: Primary succeeds quickly
    const fastPrimary = new Promise(resolve => 
        setTimeout(() => resolve({ source: "primary", data: "fast" }), 50)
    );
    const slowFallback = new Promise(resolve => 
        setTimeout(() => resolve({ source: "fallback", data: "slow" }), 200)
    );
    const primaryWinsResult = await raceWithFallback(fastPrimary, slowFallback, 500);
    assertEqual(primaryWinsResult.source, "primary", 'Fast primary wins');

    // Test: Primary fails, fallback used
    const failingPrimary = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Primary down")), 50)
    );
    const workingFallback = new Promise(resolve => 
        setTimeout(() => resolve({ source: "fallback", data: "backup" }), 100)
    );
    const fallbackWinsResult = await raceWithFallback(failingPrimary, workingFallback, 500);
    assertEqual(fallbackWinsResult.source, "fallback", 'Fallback used when primary fails');

    // Test: Primary too slow, timeout triggers fallback
    const slowPrimary = new Promise(resolve => 
        setTimeout(() => resolve({ source: "primary", data: "too slow" }), 300)
    );
    const fastFallback = new Promise(resolve => 
        setTimeout(() => resolve({ source: "fallback", data: "quick" }), 50)
    );
    const timeoutResult = await raceWithFallback(slowPrimary, fastFallback, 100);
    assertEqual(timeoutResult.source, "fallback", 'Fallback wins when primary times out');

    // Test: Both fail
    const bothFailPrimary = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Primary fail")), 50)
    );
    const bothFailFallback = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Fallback fail")), 100)
    );
    const bothFailResult = await raceWithFallback(bothFailPrimary, bothFailFallback, 500);
    assertEqual(bothFailResult.error, "Both failed", 'Returns error when both fail');

    // =========================================================================
    // Timing Tests
    // =========================================================================
    console.log('\n📋 SECTION 4: Timing Verification');
    console.log('-'.repeat(40));

    // Verify Promise.any returns as soon as first resolves
    const timingConfig = [
        { id: "verySlow", delay: 500, shouldFail: false },
        { id: "fastest", delay: 50, shouldFail: false },
        { id: "slow", delay: 200, shouldFail: false }
    ];
    
    const startTime = Date.now();
    await getFastestResponse(timingConfig);
    const elapsed = Date.now() - startTime;

    totalTests++;
    if (elapsed < 100) {
        console.log(`✅ PASS: Promise.any returns early (took ${elapsed}ms, not 500ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Promise.any should return when first resolves (took ${elapsed}ms)`);
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
