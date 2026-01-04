/**
 * Test Suite for Async/Await Deep Dive
 * ======================================
 * 
 * Run: node _7_async_await_test_example.js
 */

const {
    fetchWithTimeout,
    parallelLimit,
    asyncQueue,
    delay
} = require('./_7_async_await_example.js');

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
    console.log('🧪 Running Async/Await Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // PART A: fetchWithTimeout
    // =========================================================================
    console.log('\n📋 PART A: fetchWithTimeout');
    console.log('-'.repeat(40));

    // Fast promise succeeds
    const fastResult = await fetchWithTimeout(
        () => Promise.resolve('quick'),
        1000
    );
    assertEqual(fastResult, 'quick', 'Fast promise resolves normally');

    // Promise that resolves just in time
    const justInTime = await fetchWithTimeout(
        () => delay(50).then(() => 'made it'),
        200
    );
    assertEqual(justInTime, 'made it', 'Promise just within timeout succeeds');

    // Timeout error
    try {
        await fetchWithTimeout(
            () => delay(500).then(() => 'too slow'),
            100
        );
        console.log(`❌ FAIL: Should timeout`);
        testsFailed++;
    } catch (err) {
        assertTrue(
            err.message.includes('100') && err.message.includes('timed out'),
            'Timeout error includes duration'
        );
    }

    // Original promise rejection propagates
    try {
        await fetchWithTimeout(
            () => Promise.reject(new Error('original error')),
            1000
        );
        console.log(`❌ FAIL: Should propagate rejection`);
        testsFailed++;
    } catch (err) {
        assertEqual(err.message, 'original error', 'Original rejection propagated');
    }

    // =========================================================================
    // PART B: parallelLimit
    // =========================================================================
    console.log('\n📋 PART B: parallelLimit');
    console.log('-'.repeat(40));

    // Basic parallel execution with limit
    const startTime = Date.now();
    const results = await parallelLimit([
        () => delay(100).then(() => 'A'),
        () => delay(100).then(() => 'B'),
        () => delay(100).then(() => 'C'),
        () => delay(100).then(() => 'D'),
    ], 2);
    const duration = Date.now() - startTime;

    assertEqual(results, ['A', 'B', 'C', 'D'], 'Results in correct order');
    assertTrue(
        duration >= 180 && duration < 350,
        `Respects concurrency limit (took ${duration}ms, expected ~200ms)`
    );

    // Limit of 1 = sequential
    const seqStart = Date.now();
    const seqResults = await parallelLimit([
        () => delay(50).then(() => 1),
        () => delay(50).then(() => 2),
        () => delay(50).then(() => 3),
    ], 1);
    const seqDuration = Date.now() - seqStart;

    assertEqual(seqResults, [1, 2, 3], 'Sequential results correct');
    assertTrue(
        seqDuration >= 140,
        `Limit=1 is sequential (took ${seqDuration}ms)`
    );

    // Limit higher than task count
    const highLimitResults = await parallelLimit([
        () => delay(20).then(() => 'x'),
        () => delay(10).then(() => 'y'),
    ], 10);
    assertEqual(highLimitResults, ['x', 'y'], 'Works when limit > task count');

    // Empty array
    const emptyResults = await parallelLimit([], 5);
    assertEqual(emptyResults, [], 'Empty input returns empty array');

    // =========================================================================
    // PART C: asyncQueue
    // =========================================================================
    console.log('\n📋 PART C: asyncQueue');
    console.log('-'.repeat(40));

    const queue = asyncQueue(2);

    // Initial state
    assertEqual(queue.size(), 0, 'Empty queue has size 0');
    assertEqual(queue.running(), 0, 'Empty queue has 0 running');

    // Add tasks
    const promise1 = queue.add(() => delay(100).then(() => 'first'));
    const promise2 = queue.add(() => delay(80).then(() => 'second'));
    const promise3 = queue.add(() => delay(50).then(() => 'third'));
    const promise4 = queue.add(() => delay(30).then(() => 'fourth'));

    // Check state immediately after adding
    assertEqual(queue.running(), 2, 'Two tasks running immediately');
    assertEqual(queue.size(), 2, 'Two tasks waiting');

    // Wait for all to complete
    const queueResults = await Promise.all([promise1, promise2, promise3, promise4]);
    assertEqual(
        queueResults,
        ['first', 'second', 'third', 'fourth'],
        'All tasks complete with correct results'
    );

    // After completion
    assertEqual(queue.running(), 0, 'No tasks running after completion');
    assertEqual(queue.size(), 0, 'No tasks waiting after completion');

    // Queue handles errors
    const errorQueue = asyncQueue(1);
    const errorPromise = errorQueue.add(() => Promise.reject('queue error'));
    try {
        await errorPromise;
        console.log(`❌ FAIL: Should reject`);
        testsFailed++;
    } catch (err) {
        assertEqual(err, 'queue error', 'Queue propagates task errors');
    }

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
