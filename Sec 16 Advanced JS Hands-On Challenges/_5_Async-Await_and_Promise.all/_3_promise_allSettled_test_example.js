/**
 * Test Suite: Promise.allSettled
 * ===============================
 * 
 * Run this file with: node _3_promise_allSettled_test_example.js
 */

const {
    fetchFromAPI,
    fetchAllAPIs,
    getSuccessRate
} = require('./_3_promise_allSettled_example.js');

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

function assertApproxEqual(actual, expected, tolerance, testName) {
    totalTests++;
    if (Math.abs(actual - expected) <= tolerance) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ~${expected} (±${tolerance})`);
        console.log(`   Actual:   ${actual}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Promise.allSettled Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test fetchFromAPI Function
    // =========================================================================
    console.log('\n📋 SECTION 1: fetchFromAPI Function');
    console.log('-'.repeat(40));

    assertTypeOf(fetchFromAPI, 'function', 'fetchFromAPI is a function');

    // Test successful API call
    const successResult = await fetchFromAPI("users", false);
    assertDeepEqual(successResult, { 
        source: "users", 
        data: "Data from users" 
    }, 'Successful API returns correct data');

    // Test failed API call
    try {
        await fetchFromAPI("orders", true);
        totalTests++;
        console.log('❌ FAIL: Failed API should throw error');
        testsFailed++;
    } catch (error) {
        assertEqual(error.message, "orders failed", 'Failed API throws correct error');
    }

    // =========================================================================
    // Test fetchAllAPIs Function
    // =========================================================================
    console.log('\n📋 SECTION 2: fetchAllAPIs Function');
    console.log('-'.repeat(40));

    assertTypeOf(fetchAllAPIs, 'function', 'fetchAllAPIs is a function');

    // All succeed
    const allSuccessConfigs = [
        { name: "api1", shouldFail: false },
        { name: "api2", shouldFail: false }
    ];
    const allSuccessResult = await fetchAllAPIs(allSuccessConfigs);
    
    assertEqual(allSuccessResult.successful.length, 2, 'All success: 2 successful results');
    assertEqual(allSuccessResult.failed.length, 0, 'All success: 0 failed results');

    // All fail
    const allFailConfigs = [
        { name: "api1", shouldFail: true },
        { name: "api2", shouldFail: true }
    ];
    const allFailResult = await fetchAllAPIs(allFailConfigs);
    
    assertEqual(allFailResult.successful.length, 0, 'All fail: 0 successful results');
    assertEqual(allFailResult.failed.length, 2, 'All fail: 2 failed results');

    // Mixed results
    const mixedConfigs = [
        { name: "users", shouldFail: false },
        { name: "orders", shouldFail: true },
        { name: "products", shouldFail: false },
        { name: "analytics", shouldFail: true }
    ];
    const mixedResult = await fetchAllAPIs(mixedConfigs);
    
    assertEqual(mixedResult.successful.length, 2, 'Mixed: 2 successful results');
    assertEqual(mixedResult.failed.length, 2, 'Mixed: 2 failed results');

    // Check successful data structure
    const usersEntry = mixedResult.successful.find(s => s.source === "users");
    assertDeepEqual(usersEntry, { 
        source: "users", 
        data: "Data from users" 
    }, 'Successful entry has correct structure');

    // Check failed data structure
    const ordersEntry = mixedResult.failed.find(f => f.source === "orders");
    assertDeepEqual(ordersEntry, { 
        source: "orders", 
        error: "orders failed" 
    }, 'Failed entry has correct structure');

    // =========================================================================
    // Test getSuccessRate Function
    // =========================================================================
    console.log('\n📋 SECTION 3: getSuccessRate Function');
    console.log('-'.repeat(40));

    assertTypeOf(getSuccessRate, 'function', 'getSuccessRate is a function');

    // 100% success rate
    assertEqual(getSuccessRate(allSuccessResult), 100, '100% success rate calculated correctly');

    // 0% success rate
    assertEqual(getSuccessRate(allFailResult), 0, '0% success rate calculated correctly');

    // 50% success rate (2 out of 4)
    assertApproxEqual(getSuccessRate(mixedResult), 50, 0.01, '50% success rate calculated correctly');

    // 66.67% success rate
    const twoThirdsConfigs = [
        { name: "a", shouldFail: false },
        { name: "b", shouldFail: false },
        { name: "c", shouldFail: true }
    ];
    const twoThirdsResult = await fetchAllAPIs(twoThirdsConfigs);
    assertApproxEqual(getSuccessRate(twoThirdsResult), 66.67, 0.01, '66.67% success rate calculated correctly');

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 SECTION 4: Edge Cases');
    console.log('-'.repeat(40));

    // Empty array
    const emptyResult = await fetchAllAPIs([]);
    assertEqual(emptyResult.successful.length, 0, 'Empty config: 0 successful');
    assertEqual(emptyResult.failed.length, 0, 'Empty config: 0 failed');

    // Single success
    const singleSuccessResult = await fetchAllAPIs([{ name: "only", shouldFail: false }]);
    assertEqual(singleSuccessResult.successful.length, 1, 'Single success works');

    // Single failure
    const singleFailResult = await fetchAllAPIs([{ name: "only", shouldFail: true }]);
    assertEqual(singleFailResult.failed.length, 1, 'Single failure works');

    // Verify Promise.allSettled behavior (doesn't short-circuit)
    const startTime = Date.now();
    await fetchAllAPIs([
        { name: "fast", shouldFail: true },
        { name: "slow", shouldFail: false }
    ]);
    const elapsed = Date.now() - startTime;
    
    totalTests++;
    if (elapsed >= 90) { // Should wait for all, not short-circuit
        console.log(`✅ PASS: Promise.allSettled waits for all (took ${elapsed}ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: May have short-circuited (took ${elapsed}ms, expected >= 90ms)`);
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
