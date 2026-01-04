/**
 * Test Suite for Challenge 5: Sequential vs Parallel Execution
 * =============================================================
 * 
 * Run this file with: node _5_test_example.js
 */

const {
    fetchUser,
    fetchPosts,
    fetchComments,
    fetchAllSequential,
    fetchAllParallel,
    measureExecutionTime
} = require('./_5_example.js');

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
    console.log('🧪 Running Sequential vs Parallel Execution Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: fetchAllSequential()
    // =========================================================================
    console.log('\n📋 TASK 1: fetchAllSequential()');
    console.log('-'.repeat(40));

    // Test 1.1: Returns a Promise
    const seqResult = fetchAllSequential();
    assertTrue(seqResult instanceof Promise, 'Returns a Promise');

    // Test 1.2: Returns correct data structure
    const seqData = await fetchAllSequential();
    assertTrue(
        seqData.hasOwnProperty('user') && 
        seqData.hasOwnProperty('posts') && 
        seqData.hasOwnProperty('comments'),
        'Returns object with user, posts, comments'
    );

    // Test 1.3: User data is correct
    assertDeepEqual(seqData.user, { id: 1, name: "John" }, 'User data is correct');

    // Test 1.4: Posts data is correct
    assertDeepEqual(seqData.posts, ["Post 1", "Post 2"], 'Posts data is correct');

    // Test 1.5: Comments data is correct
    assertDeepEqual(seqData.comments, ["Comment 1", "Comment 2"], 'Comments data is correct');

    // Test 1.6: Takes ~300ms (sequential - 3 x 100ms)
    const seqStart = Date.now();
    await fetchAllSequential();
    const seqTime = Date.now() - seqStart;
    assertTrue(
        seqTime >= 280 && seqTime <= 450,
        `Sequential takes ~300ms (actual: ${seqTime}ms)`
    );

    // =========================================================================
    // Task 2 Tests: fetchAllParallel()
    // =========================================================================
    console.log('\n📋 TASK 2: fetchAllParallel()');
    console.log('-'.repeat(40));

    // Test 2.1: Returns a Promise
    const parResult = fetchAllParallel();
    assertTrue(parResult instanceof Promise, 'Returns a Promise');

    // Test 2.2: Returns correct data structure
    const parData = await fetchAllParallel();
    assertTrue(
        parData.hasOwnProperty('user') && 
        parData.hasOwnProperty('posts') && 
        parData.hasOwnProperty('comments'),
        'Returns object with user, posts, comments'
    );

    // Test 2.3: User data is correct
    assertDeepEqual(parData.user, { id: 1, name: "John" }, 'User data is correct');

    // Test 2.4: Posts data is correct
    assertDeepEqual(parData.posts, ["Post 1", "Post 2"], 'Posts data is correct');

    // Test 2.5: Comments data is correct
    assertDeepEqual(parData.comments, ["Comment 1", "Comment 2"], 'Comments data is correct');

    // Test 2.6: Takes ~100ms (parallel - all run at once)
    const parStart = Date.now();
    await fetchAllParallel();
    const parTime = Date.now() - parStart;
    assertTrue(
        parTime >= 90 && parTime <= 200,
        `Parallel takes ~100ms (actual: ${parTime}ms)`
    );

    // Test 2.7: Parallel is significantly faster than sequential
    assertTrue(
        parTime < seqTime * 0.7,  // Parallel should be at least 30% faster
        `Parallel (${parTime}ms) is faster than Sequential (${seqTime}ms)`
    );

    // =========================================================================
    // Task 3 Tests: measureExecutionTime()
    // =========================================================================
    console.log('\n📋 TASK 3: measureExecutionTime()');
    console.log('-'.repeat(40));

    // Test 3.1: Returns a Promise
    const measureResult = measureExecutionTime(async () => "test");
    assertTrue(measureResult instanceof Promise, 'Returns a Promise');

    // Test 3.2: Returns correct structure
    const measured = await measureExecutionTime(async () => "result");
    assertTrue(
        measured.hasOwnProperty('result') && measured.hasOwnProperty('timeMs'),
        'Returns object with result and timeMs'
    );

    // Test 3.3: Returns function result correctly
    assertEqual(measured.result, "result", 'Returns correct function result');

    // Test 3.4: timeMs is a number
    assertTrue(typeof measured.timeMs === 'number', 'timeMs is a number');

    // Test 3.5: Measures time accurately (100ms delay)
    const timedResult = await measureExecutionTime(async () => {
        await new Promise(r => setTimeout(r, 100));
        return "delayed";
    });
    assertTrue(
        timedResult.timeMs >= 90 && timedResult.timeMs <= 200,
        `Measures 100ms delay accurately (got ${timedResult.timeMs}ms)`
    );

    // Test 3.6: Works with sequential function
    const seqMeasured = await measureExecutionTime(fetchAllSequential);
    assertTrue(
        seqMeasured.timeMs >= 280,
        `Correctly measures sequential (~300ms): ${seqMeasured.timeMs}ms`
    );

    // Test 3.7: Works with parallel function
    const parMeasured = await measureExecutionTime(fetchAllParallel);
    assertTrue(
        parMeasured.timeMs < 200,
        `Correctly measures parallel (~100ms): ${parMeasured.timeMs}ms`
    );

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
