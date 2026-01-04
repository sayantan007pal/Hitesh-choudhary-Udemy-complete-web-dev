/**
 * Test Suite for Challenge 4: async/await Fundamentals
 * =====================================================
 * 
 * Run this file with: node _4_test_example.js
 */

const {
    getUserById,
    getUserPosts,
    delay,
    fetchUserWithAsyncAwait,
    getFullUserProfile,
    processData
} = require('./_4_example.js');

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
    console.log('🧪 Running async/await Fundamentals Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: fetchUserWithAsyncAwait()
    // =========================================================================
    console.log('\n📋 TASK 1: fetchUserWithAsyncAwait()');
    console.log('-'.repeat(40));

    // Test 1.1: Returns a Promise (async functions always do)
    const result1 = fetchUserWithAsyncAwait(1);
    assertTrue(result1 instanceof Promise, 'Returns a Promise');

    // Test 1.2: Resolves with correct user object
    const user1 = await fetchUserWithAsyncAwait(1);
    assertDeepEqual(user1, { id: 1, name: "User_1" }, 'Returns correct user object for id=1');

    // Test 1.3: Works with different user IDs
    const user42 = await fetchUserWithAsyncAwait(42);
    assertDeepEqual(user42, { id: 42, name: "User_42" }, 'Returns correct user for id=42');

    // Test 1.4: Has async behavior (takes ~100ms)
    const startTime1 = Date.now();
    await fetchUserWithAsyncAwait(1);
    const elapsed1 = Date.now() - startTime1;
    assertTrue(elapsed1 >= 90 && elapsed1 <= 200, `Has async delay (took ${elapsed1}ms)`);

    // =========================================================================
    // Task 2 Tests: getFullUserProfile()
    // =========================================================================
    console.log('\n📋 TASK 2: getFullUserProfile()');
    console.log('-'.repeat(40));

    // Test 2.1: Returns a Promise
    const profileResult = getFullUserProfile(1);
    assertTrue(profileResult instanceof Promise, 'Returns a Promise');

    // Test 2.2: Returns correct structure
    const profile1 = await getFullUserProfile(1);
    assertTrue(profile1.hasOwnProperty('user') && profile1.hasOwnProperty('posts'), 
        'Returns object with user and posts properties');

    // Test 2.3: User data is correct
    assertDeepEqual(profile1.user, { id: 1, name: "User_1" }, 'User data is correct');

    // Test 2.4: Posts data is correct
    assertDeepEqual(profile1.posts, [
        { postId: 1, title: "Post 1 by 1" },
        { postId: 2, title: "Post 2 by 1" }
    ], 'Posts data is correct');

    // Test 2.5: Sequential execution (should take ~200ms, not ~100ms)
    const startTime2 = Date.now();
    await getFullUserProfile(1);
    const elapsed2 = Date.now() - startTime2;
    assertTrue(elapsed2 >= 180 && elapsed2 <= 350, 
        `Executes sequentially (took ${elapsed2}ms, should be ~200ms)`);

    // Test 2.6: Works with different user IDs
    const profile5 = await getFullUserProfile(5);
    assertEqual(profile5.user.id, 5, 'Works with different user ID');
    assertTrue(profile5.posts[0].title.includes("5"), 'Posts reference correct user');

    // =========================================================================
    // Task 3 Tests: processData()
    // =========================================================================
    console.log('\n📋 TASK 3: processData()');
    console.log('-'.repeat(40));

    // Test 3.1: Returns a Promise
    const processResult = processData("test");
    assertTrue(processResult instanceof Promise, 'Returns a Promise');

    // Test 3.2: Processes string correctly
    const processed1 = await processData("hello");
    assertEqual(processed1, "Processed: HELLO", 'Processes "hello" correctly');

    // Test 3.3: Works with different inputs
    const processed2 = await processData("world");
    assertEqual(processed2, "Processed: WORLD", 'Processes "world" correctly');

    // Test 3.4: Works with mixed case input
    const processed3 = await processData("HeLLo WoRLd");
    assertEqual(processed3, "Processed: HELLO WORLD", 'Processes mixed case correctly');

    // Test 3.5: Has async delay (~50ms)
    const startTime3 = Date.now();
    await processData("test");
    const elapsed3 = Date.now() - startTime3;
    assertTrue(elapsed3 >= 40 && elapsed3 <= 150, `Has async delay (took ${elapsed3}ms)`);

    // Test 3.6: Works with empty string
    const processed4 = await processData("");
    assertEqual(processed4, "Processed: ", 'Handles empty string');

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
