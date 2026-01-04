/**
 * Test Suite for Debounce Function
 * =================================
 * Run: node _7_test_example.js
 */

const { debounce } = require('./_7_example.js');

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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Debounce Tests');
    console.log('='.repeat(60) + '\n');

    // Basic tests
    console.log('📋 BASIC FUNCTIONALITY\n' + '-'.repeat(40));
    assertEqual(typeof debounce, 'function', 'debounce is a function');
    assertEqual(typeof debounce(() => {}, 100), 'function', 'Returns a function');

    // Debounce behavior
    console.log('\n📋 DEBOUNCE BEHAVIOR\n' + '-'.repeat(40));
    
    let callCount = 0;
    const debouncedIncrement = debounce(() => callCount++, 50);
    
    debouncedIncrement();
    debouncedIncrement();
    debouncedIncrement();
    assertEqual(callCount, 0, 'Function not called immediately');
    
    await delay(100);
    assertEqual(callCount, 1, 'Function called once after delay');

    // Reset on new call
    console.log('\n📋 TIMER RESET\n' + '-'.repeat(40));
    
    let resetCount = 0;
    const resetDebounced = debounce(() => resetCount++, 80);
    
    resetDebounced();
    await delay(40);
    resetDebounced(); // Reset timer
    await delay(40);
    assertEqual(resetCount, 0, 'Timer resets on new call');
    
    await delay(100);
    assertEqual(resetCount, 1, 'Executes after full delay from last call');

    // Arguments passed
    console.log('\n📋 ARGUMENT PASSING\n' + '-'.repeat(40));
    
    let receivedArgs = null;
    const argDebounced = debounce((...args) => { receivedArgs = args; }, 50);
    
    argDebounced('a', 'b', 'c');
    await delay(100);
    assertEqual(receivedArgs[0], 'a', 'First argument passed');
    assertEqual(receivedArgs[1], 'b', 'Second argument passed');
    assertEqual(receivedArgs.length, 3, 'All arguments passed');

    // Independence
    console.log('\n📋 INDEPENDENCE\n' + '-'.repeat(40));
    
    let countA = 0, countB = 0;
    const debA = debounce(() => countA++, 50);
    const debB = debounce(() => countB++, 50);
    
    debA();
    debB();
    await delay(100);
    assertEqual(countA, 1, 'Debounced A works independently');
    assertEqual(countB, 1, 'Debounced B works independently');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Results: ${testsPassed}/${totalTests} passed`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed!\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests().catch(e => { console.error(e); process.exit(1); });
