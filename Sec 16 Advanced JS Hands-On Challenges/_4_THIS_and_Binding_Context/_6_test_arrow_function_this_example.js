/**
 * Test Suite for Arrow Functions and Lexical this
 * ================================================
 * Run: node _6_test_arrow_function_this_example.js
 */

const { eventHandler, timer, fixWithBind, Counter } = require('./_6_arrow_function_this_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: ${expected}\n   Actual: ${actual}`); testsFailed++; }
}
function assertTypeOf(value, type, testName) {
    totalTests++;
    if (typeof value === type) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}`); testsFailed++; }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Arrow Function this Tests');
    console.log('='.repeat(60) + '\n');

    // eventHandler tests
    console.log('\n📋 EVENT HANDLER');
    console.log('-'.repeat(40));
    assertEqual(eventHandler.eventName, "click", 'eventHandler.eventName is "click"');
    assertEqual(eventHandler.count, 0, 'eventHandler.count starts at 0');
    assertTypeOf(eventHandler.handleRegular, 'function', 'handleRegular is a function');
    
    assertEqual(eventHandler.handleRegular(), "click handled 1 times", 'handleRegular increments and returns');
    assertEqual(eventHandler.handleRegular(), "click handled 2 times", 'handleRegular increments again');
    assertEqual(eventHandler.count, 2, 'count is now 2');

    // Arrow function loses this when called as method (returns undefined for this.eventName)
    assertTypeOf(eventHandler.handleArrow, 'function', 'handleArrow is a function');
    
    // timer tests
    console.log('\n📋 TIMER OBJECT');
    console.log('-'.repeat(40));
    assertEqual(timer.label, "Timer", 'timer.label is "Timer"');
    assertEqual(timer.seconds, 0, 'timer.seconds is 0');
    
    const regularCallback = timer.startRegular();
    assertTypeOf(regularCallback, 'function', 'startRegular returns a function');
    // Regular callback loses this
    assertEqual(regularCallback(), undefined, 'Regular callback loses this (returns undefined)');
    
    const arrowCallback = timer.startArrow();
    assertTypeOf(arrowCallback, 'function', 'startArrow returns a function');
    assertEqual(arrowCallback(), "Timer: 0s", 'Arrow callback preserves this');

    // fixWithBind tests
    console.log('\n📋 FIX WITH BIND');
    console.log('-'.repeat(40));
    const fixedCallback = fixWithBind(timer);
    assertTypeOf(fixedCallback, 'function', 'fixWithBind returns a function');
    assertEqual(fixedCallback(), "Timer: 0s", 'Fixed callback works with bind');

    // Counter tests
    console.log('\n📋 COUNTER CONSTRUCTOR');
    console.log('-'.repeat(40));
    const counter = new Counter();
    assertEqual(counter.value, 0, 'Counter starts at 0');
    assertTypeOf(counter.incrementArrow, 'function', 'incrementArrow is a function');
    assertEqual(counter.incrementArrow([1, 2, 3]), 6, 'incrementArrow([1,2,3]) returns 6');
    assertEqual(counter.incrementArrow([4, 5]), 15, 'incrementArrow([4,5]) returns 15');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Total: ${totalTests} | ✅ Passed: ${testsPassed} | ❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}
runTests();
