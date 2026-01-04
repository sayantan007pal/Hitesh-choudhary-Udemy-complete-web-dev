/**
 * Test Suite: Sequential vs Parallel Execution
 * =============================================
 * 
 * Run this file with: node _2_sequential_vs_parallel_test_example.js
 */

const {
    fetchUserProfile,
    fetchUserPosts,
    fetchUserFriends,
    fetchUserDataSequential,
    fetchUserDataParallel
} = require('./_2_sequential_vs_parallel_example.js');

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
    console.log('🧪 Running Sequential vs Parallel Execution Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Test Individual Fetch Functions
    // =========================================================================
    console.log('\n📋 SECTION 1: Individual Fetch Functions');
    console.log('-'.repeat(40));

    // Test fetchUserProfile
    assertTypeOf(fetchUserProfile, 'function', 'fetchUserProfile is a function');
    const profilePromise = fetchUserProfile(42);
    assertInstanceOf(profilePromise, Promise, 'fetchUserProfile returns a Promise');
    
    const profile = await profilePromise;
    assertDeepEqual(profile, { 
        id: 42, 
        name: "User_42", 
        email: "42@example.com" 
    }, 'fetchUserProfile resolves with correct profile object');

    // Test fetchUserPosts
    assertTypeOf(fetchUserPosts, 'function', 'fetchUserPosts is a function');
    const postsPromise = fetchUserPosts(42);
    assertInstanceOf(postsPromise, Promise, 'fetchUserPosts returns a Promise');
    
    const posts = await postsPromise;
    assertDeepEqual(posts, ["Post 1 by 42", "Post 2 by 42"], 
        'fetchUserPosts resolves with correct posts array');

    // Test fetchUserFriends
    assertTypeOf(fetchUserFriends, 'function', 'fetchUserFriends is a function');
    const friendsPromise = fetchUserFriends(42);
    assertInstanceOf(friendsPromise, Promise, 'fetchUserFriends returns a Promise');
    
    const friends = await friendsPromise;
    assertDeepEqual(friends, ["Friend_A", "Friend_B", "Friend_C"], 
        'fetchUserFriends resolves with correct friends array');

    // =========================================================================
    // Test Sequential Function
    // =========================================================================
    console.log('\n📋 SECTION 2: Sequential Fetch (Slow Path)');
    console.log('-'.repeat(40));

    assertTypeOf(fetchUserDataSequential, 'function', 'fetchUserDataSequential is a function');

    const seqStartTime = Date.now();
    const seqResult = await fetchUserDataSequential(99);
    const seqElapsed = Date.now() - seqStartTime;

    // Check data correctness
    assertDeepEqual(seqResult.profile, { 
        id: 99, 
        name: "User_99", 
        email: "99@example.com" 
    }, 'Sequential: profile data is correct');

    assertDeepEqual(seqResult.posts, ["Post 1 by 99", "Post 2 by 99"], 
        'Sequential: posts data is correct');

    assertDeepEqual(seqResult.friends, ["Friend_A", "Friend_B", "Friend_C"], 
        'Sequential: friends data is correct');

    // Check that it's actually sequential (should take ~900ms)
    totalTests++;
    if (seqElapsed >= 800) {
        console.log(`✅ PASS: Sequential execution is actually sequential (took ${seqElapsed}ms >= 800ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Sequential execution seems parallel (took ${seqElapsed}ms, expected >= 800ms)`);
        testsFailed++;
    }

    // =========================================================================
    // Test Parallel Function
    // =========================================================================
    console.log('\n📋 SECTION 3: Parallel Fetch (Fast Path)');
    console.log('-'.repeat(40));

    assertTypeOf(fetchUserDataParallel, 'function', 'fetchUserDataParallel is a function');

    const parStartTime = Date.now();
    const parResult = await fetchUserDataParallel(77);
    const parElapsed = Date.now() - parStartTime;

    // Check data correctness
    assertDeepEqual(parResult.profile, { 
        id: 77, 
        name: "User_77", 
        email: "77@example.com" 
    }, 'Parallel: profile data is correct');

    assertDeepEqual(parResult.posts, ["Post 1 by 77", "Post 2 by 77"], 
        'Parallel: posts data is correct');

    assertDeepEqual(parResult.friends, ["Friend_A", "Friend_B", "Friend_C"], 
        'Parallel: friends data is correct');

    // Check that it's actually parallel (should take ~400ms, not ~900ms)
    totalTests++;
    if (parElapsed < 600) {
        console.log(`✅ PASS: Parallel execution is actually parallel (took ${parElapsed}ms < 600ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Parallel execution seems sequential (took ${parElapsed}ms, expected < 600ms)`);
        testsFailed++;
    }

    // =========================================================================
    // Performance Comparison
    // =========================================================================
    console.log('\n📋 SECTION 4: Performance Comparison');
    console.log('-'.repeat(40));

    totalTests++;
    const speedup = seqElapsed / parElapsed;
    if (speedup >= 1.5) {
        console.log(`✅ PASS: Parallel is significantly faster (${speedup.toFixed(2)}x speedup)`);
        console.log(`   Sequential: ${seqElapsed}ms`);
        console.log(`   Parallel:   ${parElapsed}ms`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Parallel should be faster than sequential`);
        console.log(`   Sequential: ${seqElapsed}ms`);
        console.log(`   Parallel:   ${parElapsed}ms`);
        console.log(`   Speedup:    ${speedup.toFixed(2)}x (expected >= 1.5x)`);
        testsFailed++;
    }

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 SECTION 5: Edge Cases');
    console.log('-'.repeat(40));

    // Different user IDs
    const user0Result = await fetchUserDataParallel(0);
    assertDeepEqual(user0Result.profile.id, 0, 'Works with userId = 0');

    const userNegResult = await fetchUserDataParallel(-1);
    assertDeepEqual(userNegResult.profile.id, -1, 'Works with negative userId');

    // Multiple concurrent calls
    const [result1, result2] = await Promise.all([
        fetchUserDataParallel(1),
        fetchUserDataParallel(2)
    ]);
    assertEqual(result1.profile.id, 1, 'Concurrent call 1 returns correct user');
    assertEqual(result2.profile.id, 2, 'Concurrent call 2 returns correct user');

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
