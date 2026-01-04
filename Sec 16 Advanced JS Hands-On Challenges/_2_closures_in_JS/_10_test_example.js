/**
 * Test Suite for Pipe and Compose
 * =================================
 * Run: node _10_test_example.js
 */

const { pipe, compose } = require('./_10_example.js');

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
    console.log('🧪 Running Pipe & Compose Tests');
    console.log('='.repeat(60) + '\n');

    // Helper functions
    const addOne = x => x + 1;
    const double = x => x * 2;
    const square = x => x * x;
    const stringify = x => `Result: ${x}`;

    // Pipe tests
    console.log('📋 PIPE FUNCTION\n' + '-'.repeat(40));
    
    assertEqual(typeof pipe, 'function', 'pipe is a function');
    assertEqual(typeof pipe(addOne), 'function', 'pipe returns a function');
    
    const pipeTwo = pipe(addOne, double);
    assertEqual(pipeTwo(5), 12, 'pipe(addOne, double)(5) = 12 (5+1=6, 6*2=12)');
    
    const pipeThree = pipe(addOne, double, square);
    assertEqual(pipeThree(2), 36, 'pipe(addOne, double, square)(2) = 36');
    
    const pipeWithString = pipe(addOne, double, stringify);
    assertEqual(pipeWithString(3), "Result: 8", 'pipe with string output works');

    // Compose tests
    console.log('\n📋 COMPOSE FUNCTION\n' + '-'.repeat(40));
    
    assertEqual(typeof compose, 'function', 'compose is a function');
    assertEqual(typeof compose(addOne), 'function', 'compose returns a function');
    
    const composeTwo = compose(double, addOne);
    assertEqual(composeTwo(5), 12, 'compose(double, addOne)(5) = 12 (right to left)');
    
    const composeThree = compose(square, double, addOne);
    assertEqual(composeThree(2), 36, 'compose(square, double, addOne)(2) = 36');
    
    // Pipe and compose equivalence
    console.log('\n📋 EQUIVALENCE\n' + '-'.repeat(40));
    
    const pipeFn = pipe(addOne, double, square);
    const composeFn = compose(square, double, addOne);
    assertEqual(pipeFn(5), composeFn(5), 'pipe(a,b,c) equals compose(c,b,a)');

    // Edge cases
    console.log('\n📋 EDGE CASES\n' + '-'.repeat(40));
    
    const identity = pipe();
    assertEqual(identity(42), 42, 'Empty pipe returns identity');
    
    const singlePipe = pipe(double);
    assertEqual(singlePipe(5), 10, 'Single function pipe works');
    
    const singleCompose = compose(double);
    assertEqual(singleCompose(5), 10, 'Single function compose works');

    // Independence
    const pipeA = pipe(addOne, double);
    const pipeB = pipe(double, addOne);
    assertEqual(pipeA(5), 12, 'pipeA: (5+1)*2 = 12');
    assertEqual(pipeB(5), 11, 'pipeB: (5*2)+1 = 11');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Results: ${testsPassed}/${totalTests} passed`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed!\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
