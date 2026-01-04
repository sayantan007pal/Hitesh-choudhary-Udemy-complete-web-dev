/**
 * Test Suite for Bind Polyfill Challenge
 * =======================================
 * Run: node _9_test_bind_polyfill_example.js
 */

const { myBind, testMyBind, testPartialApplication } = require('./_9_bind_polyfill_example.js');

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
    console.log('🧪 Running Bind Polyfill Tests');
    console.log('='.repeat(60) + '\n');

    // myBind function tests
    console.log('\n📋 MYBIND STANDALONE FUNCTION');
    console.log('-'.repeat(40));
    assertTypeOf(myBind, 'function', 'myBind is a function');

    function greet(greeting, punct) { return `${greeting}, ${this.name}${punct}`; }
    const obj = { name: "Alice" };
    
    const bound = myBind(greet, obj);
    assertTypeOf(bound, 'function', 'myBind returns a function');
    assertEqual(bound("Hello", "!"), "Hello, Alice!", 'myBind works with all args');

    const boundPartial = myBind(greet, obj, "Hi");
    assertEqual(boundPartial("?"), "Hi, Alice?", 'myBind works with partial args');

    // Function.prototype.myBind tests
    console.log('\n📋 FUNCTION.PROTOTYPE.MYBIND');
    console.log('-'.repeat(40));
    assertTypeOf(Function.prototype.myBind, 'function', 'myBind added to prototype');

    const protobound = greet.myBind(obj);
    assertEqual(protobound("Hey", "!!"), "Hey, Alice!!", 'prototype myBind works');

    const protoBoundPartial = greet.myBind(obj, "Yo");
    assertEqual(protoBoundPartial("~"), "Yo, Alice~", 'prototype partial works');

    // Different context
    const bob = { name: "Bob" };
    const boundBob = myBind(greet, bob, "Howdy");
    assertEqual(boundBob("."), "Howdy, Bob.", 'myBind with different context');

    // Test functions
    console.log('\n📋 TEST FUNCTIONS');
    console.log('-'.repeat(40));
    assertEqual(testMyBind(), true, 'testMyBind returns true');
    assertEqual(testPartialApplication(), true, 'testPartialApplication returns true');

    // Edge cases
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));
    function sum(a, b, c) { return a + b + c; }
    const boundSum = myBind(sum, null, 1, 2);
    assertEqual(boundSum(3), 6, 'myBind works without this context');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Total: ${totalTests} | ✅ Passed: ${testsPassed} | ❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}
runTests();
