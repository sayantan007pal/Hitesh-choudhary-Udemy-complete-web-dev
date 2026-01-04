/**
 * Test Suite for Real-World Callbacks Challenge
 * ==============================================
 * Run: node _10_test_realworld_callbacks_example.js
 */

const { Button, DataProcessor, DelayedLogger, simulateCallback } = require('./_10_realworld_callbacks_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: ${expected}\n   Actual: ${actual}`); testsFailed++; }
}
function assertArrayEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: ${JSON.stringify(expected)}\n   Actual: ${JSON.stringify(actual)}`); testsFailed++; }
}
function assertTypeOf(value, type, testName) {
    totalTests++;
    if (typeof value === type) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}`); testsFailed++; }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Real-World Callbacks Tests');
    console.log('='.repeat(60) + '\n');

    // Button tests
    console.log('\n📋 BUTTON CONSTRUCTOR');
    console.log('-'.repeat(40));
    const btn = new Button("Submit");
    assertEqual(btn.label, "Submit", 'Button has label');
    assertEqual(btn.clicks, 0, 'Button starts with 0 clicks');
    assertEqual(btn.handleClick(), "Submit clicked 1 times", 'handleClick works');
    assertEqual(btn.handleClick(), "Submit clicked 2 times", 'handleClick increments');
    
    const handler = btn.getHandler();
    assertTypeOf(handler, 'function', 'getHandler returns function');
    assertEqual(handler(), "Submit clicked 3 times", 'Returned handler preserves this');

    // DataProcessor tests
    console.log('\n📋 DATA PROCESSOR');
    console.log('-'.repeat(40));
    assertArrayEqual(DataProcessor.data, [1, 2, 3, 4, 5], 'DataProcessor has data');
    assertEqual(DataProcessor.multiplier, 2, 'DataProcessor has multiplier');
    assertArrayEqual(DataProcessor.processWithArrow(), [2, 4, 6, 8, 10], 'processWithArrow works');
    assertArrayEqual(DataProcessor.processWithBind(), [2, 4, 6, 8, 10], 'processWithBind works');

    // DelayedLogger tests
    console.log('\n📋 DELAYED LOGGER');
    console.log('-'.repeat(40));
    assertEqual(DelayedLogger.message, "Hello", 'DelayedLogger has message');
    const logFn = DelayedLogger.getDelayedLog();
    assertTypeOf(logFn, 'function', 'getDelayedLog returns function');
    assertEqual(logFn(), "Hello", 'Delayed log preserves this');

    // simulateCallback tests
    console.log('\n📋 SIMULATE CALLBACK');
    console.log('-'.repeat(40));
    const testObj = { name: "TestObj", getName: function() { return this.name; } };
    const result = simulateCallback(testObj, "getName");
    assertEqual(result.broken, undefined, 'Broken callback loses this');
    assertEqual(result.fixed, "TestObj", 'Fixed callback preserves this');

    // Edge cases
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));
    const btn2 = new Button("");
    assertEqual(btn2.handleClick(), " clicked 1 times", 'Empty label works');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Total: ${totalTests} | ✅ Passed: ${testsPassed} | ❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}
runTests();
