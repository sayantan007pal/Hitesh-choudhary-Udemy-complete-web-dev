/**
 * Test Suite for Partial Application
 * ====================================
 * Run: node _9_test_example.js
 */

const { partial } = require('./_9_example.js');

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
    console.log('🧪 Running Partial Application Tests');
    console.log('='.repeat(60) + '\n');

    // Basic
    console.log('📋 BASIC FUNCTIONALITY\n' + '-'.repeat(40));
    assertEqual(typeof partial, 'function', 'partial is a function');
    
    const add = (a, b, c) => a + b + c;
    assertEqual(typeof partial(add, 1), 'function', 'Returns a function');

    // Partial with one arg
    console.log('\n📋 PARTIAL WITH ONE ARGUMENT\n' + '-'.repeat(40));
    
    const add5 = partial(add, 5);
    assertEqual(add5(10, 20), 35, 'partial(add, 5)(10, 20) = 35');
    assertEqual(add5(1, 2), 8, 'partial(add, 5)(1, 2) = 8');

    // Partial with multiple args
    console.log('\n📋 PARTIAL WITH MULTIPLE ARGUMENTS\n' + '-'.repeat(40));
    
    const add5and10 = partial(add, 5, 10);
    assertEqual(add5and10(20), 35, 'partial(add, 5, 10)(20) = 35');
    assertEqual(add5and10(0), 15, 'partial(add, 5, 10)(0) = 15');

    // Complete partial (all args)
    console.log('\n📋 COMPLETE PARTIAL\n' + '-'.repeat(40));
    
    const addAllPreset = partial(add, 1, 2, 3);
    assertEqual(addAllPreset(), 6, 'All args preset returns result');

    // String example
    console.log('\n📋 STRING FUNCTIONS\n' + '-'.repeat(40));
    
    const greet = (greeting, name) => `${greeting}, ${name}!`;
    const sayHello = partial(greet, "Hello");
    const sayBye = partial(greet, "Goodbye");
    
    assertEqual(sayHello("Alice"), "Hello, Alice!", 'sayHello works');
    assertEqual(sayHello("Bob"), "Hello, Bob!", 'sayHello reusable');
    assertEqual(sayBye("Charlie"), "Goodbye, Charlie!", 'sayBye works');

    // No preset args
    console.log('\n📋 EDGE CASES\n' + '-'.repeat(40));
    
    const noPreset = partial(add);
    assertEqual(noPreset(1, 2, 3), 6, 'No preset args works');

    // Independence
    const mult = (a, b) => a * b;
    const double = partial(mult, 2);
    const triple = partial(mult, 3);
    assertEqual(double(5), 10, 'double(5) = 10');
    assertEqual(triple(5), 15, 'triple(5) = 15');
    assertEqual(double(5), 10, 'double still works');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Results: ${testsPassed}/${totalTests} passed`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed!\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
