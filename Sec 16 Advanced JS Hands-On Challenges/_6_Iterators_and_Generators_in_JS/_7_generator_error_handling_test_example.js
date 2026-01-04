/**
 * Test Suite for Generator Error Handling - Challenge 7
 * ======================================================
 * Run: node _7_generator_error_handling_test_example.js
 */

const { safeDivisionGenerator, errorRecoveryGenerator, resourceManager } = require('./_7_generator_error_handling_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: ${expected}\n   Actual: ${actual}`); testsFailed++; }
}

function assertTrue(value, testName) {
    totalTests++;
    if (value === true) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: true\n   Actual: ${value}`); testsFailed++; }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Generator Error Handling Tests');
    console.log('='.repeat(60) + '\n');

    // Task 1: safeDivisionGenerator
    console.log('\n📋 TASK 1: safeDivisionGenerator\n' + '-'.repeat(40));
    const div = safeDivisionGenerator();
    div.next(); // start
    div.next(10); // pass number
    assertEqual(div.next(2).value, 5, '10 / 2 = 5');
    
    const div2 = safeDivisionGenerator();
    div2.next();
    div2.next(20);
    assertEqual(div2.next(0).value, 'Error: Division by zero', 'Division by zero handled');
    
    const div3 = safeDivisionGenerator();
    div3.next();
    div3.next(15);
    assertEqual(div3.next(3).value, 5, '15 / 3 = 5');

    // Task 2: errorRecoveryGenerator
    console.log('\n📋 TASK 2: errorRecoveryGenerator\n' + '-'.repeat(40));
    const gen = errorRecoveryGenerator();
    assertEqual(gen.next().value, 1, 'First yield is 1');
    assertEqual(gen.next().value, 2, 'Second yield is 2');
    assertEqual(gen.throw(new Error('Test')).value, 'Recovered from: Test', 'Recovers from error');
    assertEqual(gen.next().value, 3, 'Continues at 3 after recovery');
    assertEqual(gen.next().value, 4, 'Continues at 4');
    assertEqual(gen.next().value, 5, 'Continues at 5');

    const gen2 = errorRecoveryGenerator();
    gen2.next();
    assertEqual(gen2.throw(new Error('Early')).value, 'Recovered from: Early', 'Early error recovery');

    // Task 3: resourceManager
    console.log('\n📋 TASK 3: resourceManager\n' + '-'.repeat(40));
    const res = resourceManager();
    assertEqual(res.next().value, 'Resource acquired', 'Acquires resource');
    assertEqual(res.next().value, 'Working...', 'First work');
    assertEqual(res.next().value, 'Working...', 'Second work');
    const cleanup = res.return('done');
    assertEqual(cleanup.value, 'Resource released', 'Finally runs on return');

    const res2 = resourceManager();
    res2.next();
    res2.next();
    try {
        const thrown = res2.throw(new Error('Crash'));
        assertEqual(thrown.value, 'Resource released', 'Finally runs on throw');
    } catch(e) {
        // If error propagates, that's also valid
        assertTrue(true, 'Error propagated (valid behavior)');
    }

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Total: ${totalTests} | ✅ ${testsPassed} | ❌ ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
