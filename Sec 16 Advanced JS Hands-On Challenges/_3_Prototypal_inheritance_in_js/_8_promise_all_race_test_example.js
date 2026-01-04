/**
 * Test Suite for Promise Combinators
 * ====================================
 * 
 * Run: node _8_promise_all_race_test_example.js
 */

const {
    fetchAllWithFallback,
    raceWithMinimum,
    getFirstSuccessful,
    executeWithStatus,
    delay
} = require('./_8_promise_all_race_example.js');

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
    console.log('🧪 Running Promise Combinator Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // PART A: fetchAllWithFallback
    // =========================================================================
    console.log('\n📋 PART A: fetchAllWithFallback');
    console.log('-'.repeat(40));

    // All primary succeed
    const primaryResult = await fetchAllWithFallback(
        ['/api/1', '/api/2'],
        ['/backup/1', '/backup/2']
    );
    assertEqual(
        primaryResult,
        ['Data from /api/1', 'Data from /api/2'],
        'Returns primary results when all succeed'
    );

    // Primary fails, use fallback
    const fallbackResult = await fetchAllWithFallback(
        ['/api/1', '/error/fail'],
        ['/backup/1', '/backup/2']
    );
    assertEqual(
        fallbackResult,
        ['Data from /backup/1', 'Data from /backup/2'],
        'Falls back when any primary fails'
    );

    // Single URL each
    const singleResult = await fetchAllWithFallback(
        ['/single'],
        ['/fallback']
    );
    assertEqual(singleResult, ['Data from /single'], 'Works with single URLs');

    // Empty primary (edge case - should try fallback)
    const emptyPrimary = await fetchAllWithFallback([], ['/backup']);
    assertEqual(emptyPrimary, [], 'Empty primary returns empty array');

    // =========================================================================
    // PART B: raceWithMinimum
    // =========================================================================
    console.log('\n📋 PART B: raceWithMinimum');
    console.log('-'.repeat(40));

    // Fast promise, ensure minimum wait
    const minStart = Date.now();
    const minResult = await raceWithMinimum(
        [Promise.resolve('instant')],
        200
    );
    const minDuration = Date.now() - minStart;

    assertEqual(minResult, 'instant', 'Returns correct value');
    assertTrue(
        minDuration >= 190,
        `Waited minimum time (${minDuration}ms >= 200ms)`
    );

    // Slow promise, already exceeds minimum
    const slowStart = Date.now();
    const slowResult = await raceWithMinimum(
        [delay(300).then(() => 'slow')],
        100
    );
    const slowDuration = Date.now() - slowStart;

    assertEqual(slowResult, 'slow', 'Returns slow result');
    assertTrue(
        slowDuration >= 280 && slowDuration < 350,
        `Took promise time when > minimum (${slowDuration}ms)`
    );

    // Multiple promises, first wins
    const raceResult = await raceWithMinimum(
        [
            delay(100).then(() => 'fast'),
            delay(200).then(() => 'slow')
        ],
        50
    );
    assertEqual(raceResult, 'fast', 'First to resolve wins in race');

    // =========================================================================
    // PART C: getFirstSuccessful
    // =========================================================================
    console.log('\n📋 PART C: getFirstSuccessful');
    console.log('-'.repeat(40));

    // First success wins
    const firstSuccess = await getFirstSuccessful([
        delay(100).then(() => 'slow'),
        delay(50).then(() => 'fast'),
        delay(75).then(() => 'medium')
    ]);
    assertEqual(firstSuccess, 'fast', 'Returns first to resolve');

    // Ignores rejections if one succeeds
    const withRejections = await getFirstSuccessful([
        Promise.reject('error1'),
        Promise.reject('error2'),
        delay(50).then(() => 'success!')
    ]);
    assertEqual(withRejections, 'success!', 'Ignores rejections when one succeeds');

    // All reject
    try {
        await getFirstSuccessful([
            Promise.reject('e1'),
            Promise.reject('e2'),
            Promise.reject('e3')
        ]);
        console.log(`❌ FAIL: Should reject when all fail`);
        testsFailed++;
    } catch (errors) {
        assertEqual(errors, ['e1', 'e2', 'e3'], 'Rejects with all errors');
    }

    // Single successful
    const singleSuccess = await getFirstSuccessful([
        Promise.resolve('only one')
    ]);
    assertEqual(singleSuccess, 'only one', 'Works with single promise');

    // =========================================================================
    // PART D: executeWithStatus
    // =========================================================================
    console.log('\n📋 PART D: executeWithStatus');
    console.log('-'.repeat(40));

    const statusResult = await executeWithStatus([
        Promise.resolve('success1'),
        Promise.reject('error1'),
        Promise.resolve('success2'),
        Promise.reject('error2')
    ]);

    assertEqual(statusResult.length, 4, 'Returns status for all promises');
    assertEqual(
        statusResult[0],
        { status: 'fulfilled', value: 'success1' },
        'First fulfilled correctly'
    );
    assertEqual(
        statusResult[1],
        { status: 'rejected', reason: 'error1' },
        'First rejected correctly'
    );
    assertEqual(
        statusResult[2],
        { status: 'fulfilled', value: 'success2' },
        'Second fulfilled correctly'
    );
    assertEqual(
        statusResult[3],
        { status: 'rejected', reason: 'error2' },
        'Second rejected correctly'
    );

    // All succeed
    const allSucceed = await executeWithStatus([
        Promise.resolve('a'),
        Promise.resolve('b')
    ]);
    assertTrue(
        allSucceed.every(r => r.status === 'fulfilled'),
        'All fulfilled when all succeed'
    );

    // All fail
    const allFail = await executeWithStatus([
        Promise.reject('x'),
        Promise.reject('y')
    ]);
    assertTrue(
        allFail.every(r => r.status === 'rejected'),
        'All rejected when all fail'
    );

    // Empty array
    const emptyStatus = await executeWithStatus([]);
    assertEqual(emptyStatus, [], 'Empty input returns empty array');

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
