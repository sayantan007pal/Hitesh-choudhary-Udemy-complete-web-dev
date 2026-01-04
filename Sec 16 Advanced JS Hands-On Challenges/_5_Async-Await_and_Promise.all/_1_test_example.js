/**
 * Test Suite for Async-Await and Promise.all in JavaScript
 * =========================================================
 * 
 * Run this file with: node _1_test_example.js
 */

const {
    fetchUser,
    fetchPosts,
    fetchAllData,
    fetchSuccess,
    fetchFailure,
    handlePromises,
    fetchWithTimeout
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
    console.log('🧪 Running Async-Await and Promise.all Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: fetchUser, fetchPosts, fetchAllData
    // =========================================================================
    console.log('\n📋 TASK 1: Promise.all with fetchAllData');
    console.log('-'.repeat(40));

    // Test 1.1: fetchUser is a function
    assertTypeOf(fetchUser, 'function', 'fetchUser is a function');

    // Test 1.2: fetchPosts is a function
    assertTypeOf(fetchPosts, 'function', 'fetchPosts is a function');

    // Test 1.3: fetchAllData is a function
    assertTypeOf(fetchAllData, 'function', 'fetchAllData is a function');

    // Test 1.4: fetchUser returns a Promise
    const userPromise = fetchUser();
    assertInstanceOf(userPromise, Promise, 'fetchUser() returns a Promise');

    // Test 1.5: fetchPosts returns a Promise
    const postsPromise = fetchPosts();
    assertInstanceOf(postsPromise, Promise, 'fetchPosts() returns a Promise');

    // Test 1.6: fetchUser resolves with correct data
    const userData = await userPromise;
    assertDeepEqual(userData, { id: 1, name: "John" }, 'fetchUser resolves with { id: 1, name: "John" }');

    // Test 1.7: fetchPosts resolves with correct data
    const postsData = await postsPromise;
    assertDeepEqual(postsData, ["Post 1", "Post 2"], 'fetchPosts resolves with ["Post 1", "Post 2"]');

    // Test 1.8: fetchAllData returns correct combined data
    const startTime = Date.now();
    const allData = await fetchAllData();
    const elapsed = Date.now() - startTime;
    
    assertDeepEqual(allData, {
        user: { id: 1, name: "John" },
        posts: ["Post 1", "Post 2"]
    }, 'fetchAllData returns combined user and posts data');

    // Test 1.9: fetchAllData runs promises concurrently (should take ~1s, not ~2s)
    totalTests++;
    if (elapsed < 1500) {
        console.log(`✅ PASS: fetchAllData runs concurrently (took ${elapsed}ms, < 1500ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: fetchAllData should run concurrently`);
        console.log(`   Expected: < 1500ms (concurrent execution)`);
        console.log(`   Actual:   ${elapsed}ms (likely sequential)`);
        testsFailed++;
    }

    // =========================================================================
    // Task 2 Tests: Error Handling with handlePromises
    // =========================================================================
    console.log('\n📋 TASK 2: Error Handling with handlePromises');
    console.log('-'.repeat(40));

    // Test 2.1: fetchSuccess is a function
    assertTypeOf(fetchSuccess, 'function', 'fetchSuccess is a function');

    // Test 2.2: fetchFailure is a function
    assertTypeOf(fetchFailure, 'function', 'fetchFailure is a function');

    // Test 2.3: handlePromises is a function
    assertTypeOf(handlePromises, 'function', 'handlePromises is a function');

    // Test 2.4: fetchSuccess returns a Promise that resolves
    const successPromise = fetchSuccess();
    assertInstanceOf(successPromise, Promise, 'fetchSuccess() returns a Promise');
    const successData = await successPromise;
    assertEqual(successData, "Data loaded", 'fetchSuccess resolves with "Data loaded"');

    // Test 2.5: fetchFailure returns a Promise that rejects
    const failurePromise = fetchFailure();
    assertInstanceOf(failurePromise, Promise, 'fetchFailure() returns a Promise');
    try {
        await failurePromise;
        totalTests++;
        console.log('❌ FAIL: fetchFailure should reject');
        testsFailed++;
    } catch (error) {
        totalTests++;
        if (error.message === "Failed to fetch") {
            console.log('✅ PASS: fetchFailure rejects with "Failed to fetch"');
            testsPassed++;
        } else {
            console.log('❌ FAIL: fetchFailure error message incorrect');
            console.log(`   Expected: "Failed to fetch"`);
            console.log(`   Actual:   "${error.message}"`);
            testsFailed++;
        }
    }

    // Test 2.6: handlePromises handles successful case
    const successResult = await handlePromises(fetchSuccess(), fetchSuccess());
    assertEqual(successResult, "All succeeded: Data loaded", 'handlePromises returns success message when all succeed');

    // Test 2.7: handlePromises handles failure case
    const failResult = await handlePromises(fetchSuccess(), fetchFailure());
    assertEqual(failResult, "Error: Failed to fetch", 'handlePromises returns error message when one fails');

    // Test 2.8: handlePromises handles both failing
    const bothFailResult = await handlePromises(fetchFailure(), fetchFailure());
    assertEqual(bothFailResult, "Error: Failed to fetch", 'handlePromises handles both promises failing');

    // =========================================================================
    // Task 3 Tests: fetchWithTimeout using Promise.race
    // =========================================================================
    console.log('\n📋 TASK 3: fetchWithTimeout with Promise.race');
    console.log('-'.repeat(40));

    // Test 3.1: fetchWithTimeout is a function
    assertTypeOf(fetchWithTimeout, 'function', 'fetchWithTimeout is a function');

    // Test 3.2: Fast promise completes before timeout
    const fastPromise = new Promise(resolve => setTimeout(() => resolve("Fast!"), 200));
    const fastResult = await fetchWithTimeout(fastPromise, 1000);
    assertEqual(fastResult, "Fast!", 'Fast promise returns result before timeout');

    // Test 3.3: Slow promise exceeds timeout
    const slowPromise = new Promise(resolve => setTimeout(() => resolve("Slow!"), 2000));
    const slowResult = await fetchWithTimeout(slowPromise, 500);
    assertEqual(slowResult, "Timeout exceeded", 'Slow promise returns "Timeout exceeded"');

    // Test 3.4: Exact timing edge case - promise just makes it
    const edgePromise = new Promise(resolve => setTimeout(() => resolve("Made it!"), 100));
    const edgeResult = await fetchWithTimeout(edgePromise, 200);
    assertEqual(edgeResult, "Made it!", 'Promise that just makes it before timeout succeeds');

    // Test 3.5: Immediate resolution beats timeout
    const immediatePromise = Promise.resolve("Immediate!");
    const immediateResult = await fetchWithTimeout(immediatePromise, 1000);
    assertEqual(immediateResult, "Immediate!", 'Immediately resolving promise returns result');

    // Test 3.6: Zero timeout always times out
    const anyPromise = new Promise(resolve => setTimeout(() => resolve("Data"), 100));
    const zeroTimeoutResult = await fetchWithTimeout(anyPromise, 0);
    // Note: With 0 timeout, the timeout should win or race conditions may occur
    // We just verify it returns something without crashing
    totalTests++;
    if (zeroTimeoutResult === "Timeout exceeded" || zeroTimeoutResult === "Data") {
        console.log(`✅ PASS: Zero timeout handled gracefully (returned "${zeroTimeoutResult}")`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Zero timeout handled incorrectly`);
        console.log(`   Got: ${zeroTimeoutResult}`);
        testsFailed++;
    }

    // Test 3.7: Different data types work
    const objectPromise = new Promise(resolve => setTimeout(() => resolve({ key: "value" }), 100));
    const objectResult = await fetchWithTimeout(objectPromise, 500);
    assertDeepEqual(objectResult, { key: "value" }, 'Promise returning object works');

    // Test 3.8: Array data works
    const arrayPromise = new Promise(resolve => setTimeout(() => resolve([1, 2, 3]), 100));
    const arrayResult = await fetchWithTimeout(arrayPromise, 500);
    assertDeepEqual(arrayResult, [1, 2, 3], 'Promise returning array works');

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
