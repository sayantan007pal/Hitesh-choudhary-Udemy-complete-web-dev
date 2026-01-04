/**
 * Test Suite for Complete Iterator Protocol - Challenge 10
 * =========================================================
 * Run: node _10_symbol_iterator_protocol_test_example.js
 */

const { createRangeIterator, createFullIterator, LinkedList } = require('./_10_symbol_iterator_protocol_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: ${JSON.stringify(expected)}\n   Actual: ${JSON.stringify(actual)}`); testsFailed++; }
}

function assertTrue(value, testName) {
    totalTests++;
    if (value === true) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: true\n   Actual: ${value}`); testsFailed++; }
}

function assertFalse(value, testName) {
    totalTests++;
    if (value === false) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: false\n   Actual: ${value}`); testsFailed++; }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Complete Iterator Protocol Tests');
    console.log('='.repeat(60) + '\n');

    // Task 1: createRangeIterator
    console.log('\n📋 TASK 1: createRangeIterator\n' + '-'.repeat(40));
    const range = createRangeIterator(1, 3);
    assertEqual(range.next(), { value: 1, done: false }, 'First: {value:1, done:false}');
    assertEqual(range.next(), { value: 2, done: false }, 'Second: {value:2, done:false}');
    assertEqual(range.next(), { value: 3, done: false }, 'Third: {value:3, done:false}');
    assertEqual(range.next(), { value: undefined, done: true }, 'Fourth: done');
    assertEqual(range.next(), { value: undefined, done: true }, 'Stays done');

    const single = createRangeIterator(5, 5);
    assertEqual(single.next(), { value: 5, done: false }, 'Single element');
    assertTrue(single.next().done, 'Single done after one');

    // Task 2: createFullIterator
    console.log('\n📋 TASK 2: createFullIterator\n' + '-'.repeat(40));
    const full = createFullIterator(['a', 'b', 'c']);
    assertEqual(full.next().value, 'a', 'First value is a');
    assertEqual(full.next().value, 'b', 'Second value is b');
    
    // Test return()
    const fullReturn = createFullIterator([1, 2, 3, 4]);
    fullReturn.next();
    const returnResult = fullReturn.return('stopped');
    assertEqual(returnResult, { value: 'stopped', done: true }, 'return() works');
    assertTrue(fullReturn.cleaned, 'cleaned property set');
    assertTrue(fullReturn.next().done, 'Done after return');

    // Test throw()
    const fullThrow = createFullIterator([1, 2]);
    fullThrow.next();
    try {
        fullThrow.throw(new Error('Test error'));
    } catch (e) {
        assertEqual(e.message, 'Test error', 'throw() throws error');
    }

    // Task 3: LinkedList
    console.log('\n📋 TASK 3: LinkedList\n' + '-'.repeat(40));
    const list = new LinkedList();
    list.add(1).add(2).add(3);
    assertEqual([...list], [1, 2, 3], 'Spread works: [1,2,3]');

    const loopResults = [];
    for (const val of list) { loopResults.push(val); }
    assertEqual(loopResults, [1, 2, 3], 'for...of works');

    const emptyList = new LinkedList();
    assertEqual([...emptyList], [], 'Empty list spreads to []');

    const singleList = new LinkedList();
    singleList.add('only');
    assertEqual([...singleList], ['only'], 'Single item list');

    // Multiple iterations
    const multiList = new LinkedList();
    multiList.add('a').add('b');
    assertEqual([...multiList], ['a', 'b'], 'First iteration');
    assertEqual([...multiList], ['a', 'b'], 'Second iteration works');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Total: ${totalTests} | ✅ ${testsPassed} | ❌ ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
