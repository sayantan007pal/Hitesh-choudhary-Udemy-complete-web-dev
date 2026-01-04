/**
 * Test Suite for Passing Values to Generators - Challenge 6
 * ==========================================================
 * Run: node _6_passing_values_to_generator_test_example.js
 */

const { echoGenerator, runningTotal, trafficLight } = require('./_6_passing_values_to_generator_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: ${expected}\n   Actual: ${actual}`); testsFailed++; }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Passing Values to Generators Tests');
    console.log('='.repeat(60) + '\n');

    // Task 1: echoGenerator
    console.log('\n📋 TASK 1: echoGenerator\n' + '-'.repeat(40));
    const echo = echoGenerator();
    assertEqual(echo.next().value, 'Ready', 'First call returns Ready');
    assertEqual(echo.next('Hello').value, 'Hello', 'Echoes Hello');
    assertEqual(echo.next(42).value, 42, 'Echoes 42');
    assertEqual(echo.next(true).value, true, 'Echoes true');
    assertEqual(echo.next(null).value, null, 'Echoes null');
    assertEqual(echo.next({ a: 1 }).value?.a, 1, 'Echoes objects');

    // Task 2: runningTotal
    console.log('\n📋 TASK 2: runningTotal\n' + '-'.repeat(40));
    const total = runningTotal();
    assertEqual(total.next().value, 0, 'Initial total is 0');
    assertEqual(total.next(5).value, 5, 'After adding 5: total is 5');
    assertEqual(total.next(3).value, 8, 'After adding 3: total is 8');
    assertEqual(total.next(10).value, 18, 'After adding 10: total is 18');
    assertEqual(total.next(-5).value, 13, 'After adding -5: total is 13');
    assertEqual(total.next(0).value, 13, 'After adding 0: total stays 13');

    const total2 = runningTotal();
    assertEqual(total2.next().value, 0, 'New instance starts at 0');
    assertEqual(total2.next(100).value, 100, 'New instance: 100');

    // Task 3: trafficLight
    console.log('\n📋 TASK 3: trafficLight\n' + '-'.repeat(40));
    const light = trafficLight();
    assertEqual(light.next().value, 'RED', 'Initial state is RED');
    assertEqual(light.next('NEXT').value, 'GREEN', 'NEXT: RED -> GREEN');
    assertEqual(light.next('NEXT').value, 'YELLOW', 'NEXT: GREEN -> YELLOW');
    assertEqual(light.next('NEXT').value, 'RED', 'NEXT: YELLOW -> RED');
    assertEqual(light.next('NEXT').value, 'GREEN', 'NEXT: RED -> GREEN again');
    assertEqual(light.next('RESET').value, 'RED', 'RESET: back to RED');
    assertEqual(light.next('INVALID').value, 'RED', 'INVALID: stays RED');
    assertEqual(light.next('NEXT').value, 'GREEN', 'NEXT after invalid works');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Total: ${totalTests} | ✅ ${testsPassed} | ❌ ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
