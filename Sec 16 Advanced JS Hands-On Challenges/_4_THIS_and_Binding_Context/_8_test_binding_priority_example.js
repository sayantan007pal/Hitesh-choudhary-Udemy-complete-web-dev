/**
 * Test Suite for Binding Priority Challenge
 * ==========================================
 * Run: node _8_test_binding_priority_example.js
 */

const { getName, testDefaultVsImplicit, testImplicitVsExplicit, testExplicitVsBind, testAllPriorities } = require('./_8_binding_priority_example.js');

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
    console.log('🧪 Running Binding Priority Tests');
    console.log('='.repeat(60) + '\n');

    // Default vs Implicit
    console.log('\n📋 DEFAULT VS IMPLICIT');
    console.log('-'.repeat(40));
    const result1 = testDefaultVsImplicit();
    assertTypeOf(result1, 'object', 'testDefaultVsImplicit returns object');
    assertEqual(result1.defaultResult, undefined, 'Default binding returns undefined (no global.name)');
    assertEqual(result1.implicitResult, "ObjectName", 'Implicit binding returns object name');

    // Implicit vs Explicit
    console.log('\n📋 IMPLICIT VS EXPLICIT');
    console.log('-'.repeat(40));
    const result2 = testImplicitVsExplicit();
    assertTypeOf(result2, 'object', 'testImplicitVsExplicit returns object');
    assertEqual(result2.implicitResult, "ImplicitObj", 'Implicit gives ImplicitObj');
    assertEqual(result2.explicitResult, "ExplicitObj", 'Explicit (call) overrides to ExplicitObj');

    // Explicit vs Bind
    console.log('\n📋 EXPLICIT VS BIND (BOUND CANNOT BE OVERRIDDEN)');
    console.log('-'.repeat(40));
    const result3 = testExplicitVsBind();
    assertTypeOf(result3, 'object', 'testExplicitVsBind returns object');
    assertEqual(result3.boundResult, "BoundObj", 'Bound function returns BoundObj');
    assertEqual(result3.callOnBoundResult, "BoundObj", 'call() on bound function STILL returns BoundObj');

    // All Priorities
    console.log('\n📋 ALL PRIORITIES');
    console.log('-'.repeat(40));
    const result4 = testAllPriorities();
    assertTypeOf(result4, 'object', 'testAllPriorities returns object');
    assertEqual(result4.default, undefined, 'default is undefined');
    assertEqual(result4.implicit, "ImplicitName", 'implicit uses object name');
    assertEqual(result4.explicit, "ExplicitName", 'explicit overrides');
    assertEqual(result4.bound, "BoundName", 'bound is permanent');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Total: ${totalTests} | ✅ Passed: ${testsPassed} | ❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}
runTests();
