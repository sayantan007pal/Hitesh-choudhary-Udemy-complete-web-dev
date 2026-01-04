/**
 * Test Suite for Lazy Evaluation - Challenge 9
 * =============================================
 * Run: node _9_lazy_evaluation_test_example.js
 */

const { lazyMap, lazyFilter, lazyTake, pipeline } = require('./_9_lazy_evaluation_example.js');

let testsPassed = 0, testsFailed = 0, totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) { console.log(`✅ PASS: ${testName}`); testsPassed++; }
    else { console.log(`❌ FAIL: ${testName}\n   Expected: ${JSON.stringify(expected)}\n   Actual: ${JSON.stringify(actual)}`); testsFailed++; }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Lazy Evaluation Tests');
    console.log('='.repeat(60) + '\n');

    // Task 1: lazyMap
    console.log('\n📋 TASK 1: lazyMap\n' + '-'.repeat(40));
    assertEqual([...lazyMap([1, 2, 3], x => x * 2)], [2, 4, 6], 'Doubles [1,2,3] to [2,4,6]');
    assertEqual([...lazyMap(['a', 'b'], s => s.toUpperCase())], ['A', 'B'], 'Uppercase strings');
    assertEqual([...lazyMap([], x => x)], [], 'Empty array gives empty');
    assertEqual([...lazyMap([5], x => x * x)], [25], 'Single element [25]');

    // Task 2: lazyFilter
    console.log('\n📋 TASK 2: lazyFilter\n' + '-'.repeat(40));
    assertEqual([...lazyFilter([1, 2, 3, 4, 5], x => x % 2 === 0)], [2, 4], 'Filters evens');
    assertEqual([...lazyFilter([1, 2, 3], x => x > 5)], [], 'No matches gives empty');
    assertEqual([...lazyFilter([1, 2, 3], x => true)], [1, 2, 3], 'All match gives all');
    assertEqual([...lazyFilter([], x => true)], [], 'Empty stays empty');

    // Task 3: lazyTake
    console.log('\n📋 TASK 3: lazyTake\n' + '-'.repeat(40));
    assertEqual([...lazyTake([1, 2, 3, 4, 5], 3)], [1, 2, 3], 'Takes first 3');
    assertEqual([...lazyTake([1, 2], 5)], [1, 2], 'Takes all if n > length');
    assertEqual([...lazyTake([1, 2, 3], 0)], [], 'Take 0 gives empty');
    assertEqual([...lazyTake('hello', 3)], ['h', 'e', 'l'], 'Works with strings');

    // Test with infinite generator
    function* infinite() { let i = 1; while (true) yield i++; }
    assertEqual([...lazyTake(infinite(), 5)], [1, 2, 3, 4, 5], 'Takes 5 from infinite');

    // Task 4: pipeline
    console.log('\n📋 TASK 4: pipeline\n' + '-'.repeat(40));
    const result = pipeline(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        iter => lazyFilter(iter, x => x % 2 === 0),
        iter => lazyMap(iter, x => x * 10),
        iter => lazyTake(iter, 3)
    );
    assertEqual([...result], [20, 40, 60], 'Pipeline: filter evens, *10, take 3');

    const result2 = pipeline(
        [1, 2, 3, 4, 5],
        iter => lazyMap(iter, x => x * 2)
    );
    assertEqual([...result2], [2, 4, 6, 8, 10], 'Single step pipeline');

    const result3 = pipeline([1, 2, 3]);
    assertEqual([...result3], [1, 2, 3], 'No transforms returns original');

    // Results
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Total: ${totalTests} | ✅ ${testsPassed} | ❌ ${testsFailed}`);
    console.log('='.repeat(60));
    if (testsFailed === 0) console.log('\n🎉 All tests passed! 🎉\n');
    else console.log(`\n⚠️ ${testsFailed} test(s) failed.\n`);
    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
