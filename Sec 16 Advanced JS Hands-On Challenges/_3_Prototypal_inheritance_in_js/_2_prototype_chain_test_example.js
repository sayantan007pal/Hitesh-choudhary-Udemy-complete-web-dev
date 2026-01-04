/**
 * Test Suite for Prototype Chain
 * ===============================
 * 
 * Run: node _2_prototype_chain_test_example.js
 */

const {
    getPrototypeChainLength,
    getOwnAndInheritedKeys,
    findPropertyOrigin
} = require('./_2_prototype_chain_example.js');

let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
    }
}

function assertStrictEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expected}`);
        console.log(`   Actual:   ${actual}`);
        testsFailed++;
    }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Prototype Chain Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // PART A: getPrototypeChainLength
    // =========================================================================
    console.log('\n📋 PART A: getPrototypeChainLength');
    console.log('-'.repeat(40));

    assertStrictEqual(
        getPrototypeChainLength({}), 
        1, 
        'Plain object has chain length 1 (Object.prototype)'
    );

    assertStrictEqual(
        getPrototypeChainLength([]), 
        2, 
        'Array has chain length 2 (Array.prototype -> Object.prototype)'
    );

    assertStrictEqual(
        getPrototypeChainLength(function() {}), 
        2, 
        'Function has chain length 2'
    );

    const grandparent = { a: 1 };
    const parent = Object.create(grandparent);
    const child = Object.create(parent);
    assertStrictEqual(
        getPrototypeChainLength(child), 
        3, 
        'Custom 3-level chain has length 3'
    );

    const nullProto = Object.create(null);
    assertStrictEqual(
        getPrototypeChainLength(nullProto), 
        0, 
        'Object with null prototype has chain length 0'
    );

    // =========================================================================
    // PART B: getOwnAndInheritedKeys
    // =========================================================================
    console.log('\n📋 PART B: getOwnAndInheritedKeys');
    console.log('-'.repeat(40));

    const parentObj = { inherited1: 1, inherited2: 2 };
    const childObj = Object.create(parentObj);
    childObj.own1 = 'a';
    childObj.own2 = 'b';

    const result = getOwnAndInheritedKeys(childObj);
    assertEqual(
        result.own.sort(), 
        ['own1', 'own2'], 
        'Returns own keys correctly'
    );
    assertEqual(
        result.inherited.sort(), 
        ['inherited1', 'inherited2'], 
        'Returns inherited keys correctly'
    );

    const emptyChild = Object.create(parentObj);
    const emptyResult = getOwnAndInheritedKeys(emptyChild);
    assertEqual(
        emptyResult.own, 
        [], 
        'Empty object returns empty own keys'
    );
    assertEqual(
        emptyResult.inherited.sort(), 
        ['inherited1', 'inherited2'], 
        'Empty object still gets inherited keys'
    );

    const plainObj = { a: 1, b: 2 };
    const plainResult = getOwnAndInheritedKeys(plainObj);
    assertEqual(
        plainResult.own.sort(), 
        ['a', 'b'], 
        'Plain object has only own keys'
    );
    assertEqual(
        plainResult.inherited, 
        [], 
        'Plain object has no enumerable inherited keys'
    );

    // =========================================================================
    // PART C: findPropertyOrigin
    // =========================================================================
    console.log('\n📋 PART C: findPropertyOrigin');
    console.log('-'.repeat(40));

    const arr = [1, 2, 3];
    assertStrictEqual(
        findPropertyOrigin(arr, 'length'), 
        arr, 
        'length is own property of array'
    );
    assertStrictEqual(
        findPropertyOrigin(arr, 'push'), 
        Array.prototype, 
        'push is from Array.prototype'
    );
    assertStrictEqual(
        findPropertyOrigin(arr, 'toString'), 
        Array.prototype, 
        'toString is from Array.prototype (overrides Object)'
    );
    assertStrictEqual(
        findPropertyOrigin(arr, 'hasOwnProperty'), 
        Object.prototype, 
        'hasOwnProperty is from Object.prototype'
    );
    assertStrictEqual(
        findPropertyOrigin(arr, 'nonExistent'), 
        null, 
        'Non-existent property returns null'
    );

    const customParent = { parentProp: true };
    const customChild = Object.create(customParent);
    customChild.childProp = true;
    
    assertStrictEqual(
        findPropertyOrigin(customChild, 'childProp'), 
        customChild, 
        'Own property returns the object itself'
    );
    assertStrictEqual(
        findPropertyOrigin(customChild, 'parentProp'), 
        customParent, 
        'Inherited property returns parent object'
    );

    // =========================================================================
    // Final Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${testsPassed + testsFailed}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));

    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
