/**
 * Test Suite for Promise Chaining
 * =================================
 * 
 * Run: node _6_promise_chaining_test_example.js
 */

const {
    chainedFetch,
    retryPromise,
    promisePipeline
} = require('./_6_promise_chaining_example.js');

let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
    }
}

function assertTrue(condition, testName) {
    if (condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
    }
}

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Promise Chaining Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // PART A: chainedFetch
    // =========================================================================
    console.log('\n📋 PART A: chainedFetch');
    console.log('-'.repeat(40));

    // Basic sequential fetch
    const result1 = await chainedFetch(['/api/1', '/api/2', '/api/3']);
    assertEqual(
        result1,
        ['Data from /api/1', 'Data from /api/2', 'Data from /api/3'],
        'Fetches URLs sequentially and returns results in order'
    );

    // Single URL
    const result2 = await chainedFetch(['/single']);
    assertEqual(result2, ['Data from /single'], 'Works with single URL');

    // Empty array
    const result3 = await chainedFetch([]);
    assertEqual(result3, [], 'Returns empty array for empty input');

    // Error handling
    try {
        await chainedFetch(['/api/1', '/error/fail', '/api/3']);
        console.log(`❌ FAIL: Should reject on fetch error`);
        testsFailed++;
    } catch (err) {
        assertTrue(
            err.message.includes('error'),
            'Rejects with error when fetch fails'
        );
    }

    // =========================================================================
    // PART B: retryPromise
    // =========================================================================
    console.log('\n📋 PART B: retryPromise');
    console.log('-'.repeat(40));

    // Succeeds on first try
    const immediateSuccess = await retryPromise(
        () => Promise.resolve('instant'),
        3
    );
    assertEqual(immediateSuccess, 'instant', 'Returns immediately on success');

    // Succeeds after retries
    let attempts1 = 0;
    const eventualSuccess = await retryPromise(() => {
        attempts1++;
        if (attempts1 < 3) return Promise.reject('not yet');
        return Promise.resolve('finally!');
    }, 5);
    assertEqual(eventualSuccess, 'finally!', 'Succeeds after multiple attempts');
    assertEqual(attempts1, 3, 'Stopped after success (3 attempts)');

    // Fails after max retries
    let attempts2 = 0;
    try {
        await retryPromise(() => {
            attempts2++;
            return Promise.reject('always fails');
        }, 3);
        console.log(`❌ FAIL: Should reject after max retries`);
        testsFailed++;
    } catch (err) {
        assertEqual(err, 'always fails', 'Rejects with last error');
        assertEqual(attempts2, 3, 'Tried exactly maxRetries times');
    }

    // Zero retries means try once
    let attempts3 = 0;
    try {
        await retryPromise(() => {
            attempts3++;
            return Promise.reject('fail');
        }, 1);
    } catch (err) {
        assertEqual(attempts3, 1, 'maxRetries=1 means one attempt');
    }

    // =========================================================================
    // PART C: promisePipeline
    // =========================================================================
    console.log('\n📋 PART C: promisePipeline');
    console.log('-'.repeat(40));

    // Sync functions only
    const syncPipeline = promisePipeline(
        x => x + 1,
        x => x * 2,
        x => x.toString()
    );
    const syncResult = await syncPipeline(5);
    assertEqual(syncResult, '12', 'Handles sync functions: (5+1)*2="12"');

    // Async functions only
    const asyncPipeline = promisePipeline(
        x => Promise.resolve(x * 10),
        x => Promise.resolve(x + 5)
    );
    const asyncResult = await asyncPipeline(3);
    assertEqual(asyncResult, 35, 'Handles async functions: 3*10+5=35');

    // Mixed sync and async
    const mixedPipeline = promisePipeline(
        x => x + 1,                         // sync
        x => Promise.resolve(x * 2),        // async
        x => `Value: ${x}`,                 // sync
        x => Promise.resolve(x.toUpperCase()) // async
    );
    const mixedResult = await mixedPipeline(4);
    assertEqual(mixedResult, 'VALUE: 10', 'Mixed pipeline: (4+1)*2="VALUE: 10"');

    // Single function
    const singlePipeline = promisePipeline(x => x * 100);
    const singleResult = await singlePipeline(7);
    assertEqual(singleResult, 700, 'Single function works');

    // No functions (identity)
    const emptyPipeline = promisePipeline();
    const emptyResult = await emptyPipeline('unchanged');
    assertEqual(emptyResult, 'unchanged', 'Empty pipeline returns input unchanged');

    // =========================================================================
    // Final Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${testsPassed + testsFailed}`);
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

runTests();
