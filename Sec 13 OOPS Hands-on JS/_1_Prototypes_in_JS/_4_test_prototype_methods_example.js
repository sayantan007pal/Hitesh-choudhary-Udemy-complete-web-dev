/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║          TEST SUITE: Prototype Methods Challenge                             ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _4_test_prototype_methods_example.js
 */

const {
    getDirectPrototype,
    setNewPrototype,
    isInPrototypeChain,
    getPrototypeDepth,
    findCommonPrototype,
    cloneWithSamePrototype
} = require('./_4_prototype_methods_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${JSON.stringify(expected)}`);
        console.log(`   Actual:   ${JSON.stringify(actual)}`);
        testsFailed++;
        return false;
    }
}

function assertTrue(condition, testName) {
    totalTests++;
    if (condition === true) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: true`);
        console.log(`   Actual:   ${condition}`);
        testsFailed++;
        return false;
    }
}

function assertFalse(condition, testName) {
    totalTests++;
    if (condition === false) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: false`);
        console.log(`   Actual:   ${condition}`);
        testsFailed++;
        return false;
    }
}

function printSectionHeader(title) {
    console.log('\n' + '='.repeat(70));
    console.log(`📋 ${title}`);
    console.log('='.repeat(70));
}

function printFinalResults() {
    console.log('\n' + '═'.repeat(70));
    console.log('📊 FINAL RESULTS');
    console.log('═'.repeat(70));
    console.log(`   Total Tests:  ${totalTests}`);
    console.log(`   ✅ Passed:    ${testsPassed}`);
    console.log(`   ❌ Failed:    ${testsFailed}`);
    console.log(`   Success Rate: ${((testsPassed / totalTests) * 100).toFixed(1)}%`);
    console.log('═'.repeat(70));
    
    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉\n');
    } else {
        console.log('\n💪 Keep trying! Review the failed tests and try again.\n');
    }
}

// =============================================================================
// TEST SUITE
// =============================================================================

console.log('\n🧪 Running Prototype Methods Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: getDirectPrototype Tests
// -----------------------------------------------------------------------------
printSectionHeader('GET DIRECT PROTOTYPE TESTS');

// Test 1.1: Plain object's prototype
const plainObj = {};
assertEqual(
    getDirectPrototype(plainObj),
    Object.prototype,
    'Plain object prototype is Object.prototype'
);

// Test 1.2: Array's prototype
const arr = [];
assertEqual(
    getDirectPrototype(arr),
    Array.prototype,
    'Array prototype is Array.prototype'
);

// Test 1.3: Custom prototype chain
const parent = { name: 'parent' };
const child = Object.create(parent);
assertEqual(getDirectPrototype(child), parent, 'Child prototype is parent');

// Test 1.4: Null prototype object
const nullProtoObj = Object.create(null);
assertEqual(getDirectPrototype(nullProtoObj), null, 'Null prototype object returns null');

// Test 1.5: Null input
assertEqual(getDirectPrototype(null), null, 'Null input returns null');

// Test 1.6: Undefined input
assertEqual(getDirectPrototype(undefined), null, 'Undefined input returns null');


// -----------------------------------------------------------------------------
// Section 2: setNewPrototype Tests
// -----------------------------------------------------------------------------
printSectionHeader('SET NEW PROTOTYPE TESTS');

// Test 2.1: Successfully set prototype
const objToModify = { a: 1 };
const newProto = { b: 2 };
const result1 = setNewPrototype(objToModify, newProto);
assertTrue(result1, 'Returns true on success');
assertEqual(Object.getPrototypeOf(objToModify), newProto, 'Prototype is set correctly');
assertEqual(objToModify.b, 2, 'Can access inherited property');

// Test 2.2: Set to null prototype
const obj2 = { x: 10 };
setNewPrototype(obj2, null);
assertEqual(Object.getPrototypeOf(obj2), null, 'Can set prototype to null');

// Test 2.3: Invalid input - null
const result2 = setNewPrototype(null, {});
assertFalse(result2, 'Returns false for null input');

// Test 2.4: Invalid input - primitive
const result3 = setNewPrototype(42, {});
assertFalse(result3, 'Returns false for primitive input');


// -----------------------------------------------------------------------------
// Section 3: isInPrototypeChain Tests
// -----------------------------------------------------------------------------
printSectionHeader('IS IN PROTOTYPE CHAIN TESTS');

// Test 3.1: Direct prototype
const protoA = { level: 'A' };
const childA = Object.create(protoA);
assertTrue(
    isInPrototypeChain(protoA, childA),
    'Direct prototype is in chain'
);

// Test 3.2: Indirect prototype
const protoB = { level: 'B' };
const protoC = Object.create(protoB);
const childC = Object.create(protoC);
assertTrue(
    isInPrototypeChain(protoB, childC),
    'Indirect prototype is in chain'
);

// Test 3.3: Object.prototype is in most chains
const regularObj = { data: 'test' };
assertTrue(
    isInPrototypeChain(Object.prototype, regularObj),
    'Object.prototype is in regular object chain'
);

// Test 3.4: Not in chain
const unrelatedObj = { other: 'data' };
assertFalse(
    isInPrototypeChain(protoA, unrelatedObj),
    'Unrelated object is not in chain'
);

// Test 3.5: Null prototype - Object.prototype not in chain
const nullProto = Object.create(null);
assertFalse(
    isInPrototypeChain(Object.prototype, nullProto),
    'Object.prototype not in null-proto chain'
);


// -----------------------------------------------------------------------------
// Section 4: getPrototypeDepth Tests
// -----------------------------------------------------------------------------
printSectionHeader('GET PROTOTYPE DEPTH TESTS');

// Test 4.1: Plain object depth (Object.prototype only)
const simpleObj = {};
assertEqual(getPrototypeDepth(simpleObj), 1, 'Plain object has depth 1');

// Test 4.2: One level deep
const level1 = Object.create({});
assertEqual(getPrototypeDepth(level1), 2, 'One level inheritance has depth 2');

// Test 4.3: Two levels deep
const level2 = Object.create(Object.create({}));
assertEqual(getPrototypeDepth(level2), 3, 'Two levels inheritance has depth 3');

// Test 4.4: Null prototype object
const noProtoDepth = Object.create(null);
assertEqual(getPrototypeDepth(noProtoDepth), 0, 'Null prototype has depth 0');

// Test 4.5: Array depth
const arrDepth = [];
assertEqual(getPrototypeDepth(arrDepth), 2, 'Array has depth 2 (Array.prototype + Object.prototype)');


// -----------------------------------------------------------------------------
// Section 5: findCommonPrototype Tests
// -----------------------------------------------------------------------------
printSectionHeader('FIND COMMON PROTOTYPE TESTS');

// Test 5.1: Two plain objects share Object.prototype
const obj1 = { a: 1 };
const obj2 = { b: 2 };
assertEqual(
    findCommonPrototype(obj1, obj2),
    Object.prototype,
    'Plain objects share Object.prototype'
);

// Test 5.2: Objects with same custom prototype
const sharedProto = { shared: true };
const sibling1 = Object.create(sharedProto);
const sibling2 = Object.create(sharedProto);
assertEqual(
    findCommonPrototype(sibling1, sibling2),
    sharedProto,
    'Siblings share custom prototype'
);

// Test 5.3: Nested chains with common ancestor
const ancestor = { ancestral: true };
const branch1 = Object.create(ancestor);
const branch2 = Object.create(ancestor);
const leaf1 = Object.create(branch1);
const leaf2 = Object.create(branch2);
assertEqual(
    findCommonPrototype(leaf1, leaf2),
    ancestor,
    'Different branches share common ancestor'
);

// Test 5.4: Both null prototype - no common
const nullProto1 = Object.create(null);
const nullProto2 = Object.create(null);
assertEqual(
    findCommonPrototype(nullProto1, nullProto2),
    null,
    'Null-proto objects have no common prototype'
);


// -----------------------------------------------------------------------------
// Section 6: cloneWithSamePrototype Tests
// -----------------------------------------------------------------------------
printSectionHeader('CLONE WITH SAME PROTOTYPE TESTS');

// Test 6.1: Clone has same prototype
const originalProto = { inherited: 'value' };
const original = Object.create(originalProto);
original.own = 'property';
const cloned = cloneWithSamePrototype(original);

assertEqual(
    Object.getPrototypeOf(cloned),
    originalProto,
    'Clone has same prototype as original'
);

// Test 6.2: Clone has own properties
assertEqual(cloned.own, 'property', 'Clone has own properties');

// Test 6.3: Clone can access inherited properties
assertEqual(cloned.inherited, 'value', 'Clone can access inherited properties');

// Test 6.4: Clone is not the same object
assertTrue(cloned !== original, 'Clone is different object');

// Test 6.5: Modifying clone doesn't affect original
cloned.own = 'modified';
assertEqual(original.own, 'property', 'Modifying clone does not affect original');

// Test 6.6: Clone with null prototype
const nullOriginal = Object.create(null);
nullOriginal.data = 'test';
const nullClone = cloneWithSamePrototype(nullOriginal);
assertEqual(Object.getPrototypeOf(nullClone), null, 'Clone of null-proto has null proto');
assertEqual(nullClone.data, 'test', 'Clone has copied properties');


// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
