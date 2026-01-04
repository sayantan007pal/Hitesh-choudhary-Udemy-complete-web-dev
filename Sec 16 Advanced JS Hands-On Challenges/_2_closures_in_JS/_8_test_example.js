/**
 * Test Suite for Once Function
 * =============================
 * Run: node _8_test_example.js
 */

const { once } = require('./_8_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName} - Expected: ${expected}, Got: ${actual}`);
        testsFailed++;
    }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Once Function Tests');
    console.log('='.repeat(60) + '\n');

    // Basic
    console.log('📋 BASIC FUNCTIONALITY\n' + '-'.repeat(40));
    assertEqual(typeof once, 'function', 'once is a function');
    assertEqual(typeof once(() => {}), 'function', 'Returns a function');

    // Once behavior
    console.log('\n📋 ONCE BEHAVIOR\n' + '-'.repeat(40));
    
    let callCount = 0;
    const onceIncrement = once(() => {
        callCount++;
        return "result";
    });
    
    assertEqual(onceIncrement(), "result", 'First call returns result');
    assertEqual(callCount, 1, 'Function called once');
    
    assertEqual(onceIncrement(), "result", 'Second call returns cached result');
    assertEqual(callCount, 1, 'Function NOT called again');
    
    assertEqual(onceIncrement(), "result", 'Third call returns cached result');
    assertEqual(callCount, 1, 'Function still NOT called again');

    // With arguments
    console.log('\n📋 ARGUMENTS\n' + '-'.repeat(40));
    
    const onceAdd = once((a, b) => a + b);
    assertEqual(onceAdd(2, 3), 5, 'First call with args returns result');
    assertEqual(onceAdd(10, 20), 5, 'Second call ignores new args, returns cached');

    // Edge cases
    console.log('\n📋 EDGE CASES\n' + '-'.repeat(40));
    
    const onceNull = once(() => null);
    assertEqual(onceNull(), null, 'Works with null return');
    assertEqual(onceNull(), null, 'Caches null correctly');
    
    const onceUndefined = once(() => undefined);
    assertEqual(onceUndefined(), undefined, 'Works with undefined return');
    assertEqual(onceUndefined(), undefined, 'Caches undefined correctly');
    
    const onceZero = once(() => 0);
    assertEqual(onceZero(), 0, 'Works with zero return');
    assertEqual(onceZero(), 0, 'Caches zero correctly');

    // Independence
    console.log('\n📋 INDEPENDENCE\n' + '-'.repeat(40));
    
    let countA = 0, countB = 0;
    const onceA = once(() => ++countA);
    const onceB = once(() => ++countB);
    
    assertEqual(onceA(), 1, 'Once A works');
    assertEqual(onceB(), 1, 'Once B works independently');
    assertEqual(onceA(), 1, 'Once A still cached');
    assertEqual(countA, 1, 'A called once');
    assertEqual(countB, 1, 'B called once');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Results: ${testsPassed}/${totalTests} passed`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed!\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
