/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║        TEST SUITE: Prototype Pollution and Security Challenge                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _9_test_prototype_pollution_security_example.js
 */

const {
    isPrototypePolluted,
    safeObjectMerge,
    deepSafeMerge,
    freezePrototype,
    createSecureObject,
    sanitizeKey
} = require('./_9_prototype_pollution_security_example.js');

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

function assertThrows(fn, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected function to throw`);
        testsFailed++;
        return false;
    } catch (e) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
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

console.log('\n🧪 Running Prototype Pollution and Security Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: isPrototypePolluted Tests
// -----------------------------------------------------------------------------
printSectionHeader('IS PROTOTYPE POLLUTED TESTS');

// Test 1.1: Own property - not polluted
const obj1 = { name: 'test' };
assertFalse(isPrototypePolluted(obj1, 'name'), 'Own property is not polluted');

// Test 1.2: Inherited from Object.prototype - polluted
const obj2 = {};
assertTrue(isPrototypePolluted(obj2, 'toString'), 'toString from Object.prototype is polluted');

// Test 1.3: Non-existent property - not polluted
assertFalse(isPrototypePolluted(obj2, 'nonExistent'), 'Non-existent property is not polluted');

// Test 1.4: Custom prototype inheritance
const proto = { inherited: 'value' };
const child = Object.create(proto);
assertTrue(isPrototypePolluted(child, 'inherited'), 'Inherited from custom proto is polluted');

// Test 1.5: Shadowed property - not polluted
const shadowed = Object.create(proto);
shadowed.inherited = 'shadowed';
assertFalse(isPrototypePolluted(shadowed, 'inherited'), 'Shadowed property is not polluted');

// Test 1.6: Null prototype object
const nullProto = Object.create(null);
nullProto.data = 'test';
assertFalse(isPrototypePolluted(nullProto, 'data'), 'Null-proto own property not polluted');
assertFalse(isPrototypePolluted(nullProto, 'toString'), 'Null-proto has no toString pollution');


// -----------------------------------------------------------------------------
// Section 2: safeObjectMerge Tests
// -----------------------------------------------------------------------------
printSectionHeader('SAFE OBJECT MERGE TESTS');

// Test 2.1: Normal merge works
const target1 = { a: 1 };
const source1 = { b: 2, c: 3 };
const result1 = safeObjectMerge(target1, source1);
assertEqual(result1.a, 1, 'Safe merge keeps target properties');
assertEqual(result1.b, 2, 'Safe merge adds source properties');
assertEqual(result1.c, 3, 'Safe merge adds all source properties');

// Test 2.2: Blocks __proto__
const target2 = { safe: true };
const malicious1 = { __proto__: { hacked: true } };
safeObjectMerge(target2, malicious1);
assertEqual(({}).hacked, undefined, '__proto__ attack blocked - Object.prototype not modified');

// Test 2.3: Blocks prototype
const target3 = { safe: true };
const malicious2 = { prototype: { evil: true } };
const result3 = safeObjectMerge(target3, malicious2);
assertEqual(result3.prototype, undefined, 'prototype key blocked');

// Test 2.4: Blocks constructor
const target4 = { safe: true };
const malicious3 = { constructor: 'hacked' };
const result4 = safeObjectMerge(target4, malicious3);
assertEqual(result4.constructor, Object, 'constructor key blocked');

// Test 2.5: Returns target
const target5 = {};
const result5 = safeObjectMerge(target5, { x: 1 });
assertTrue(result5 === target5, 'Returns the target object');


// -----------------------------------------------------------------------------
// Section 3: deepSafeMerge Tests
// -----------------------------------------------------------------------------
printSectionHeader('DEEP SAFE MERGE TESTS');

// Test 3.1: Deep merge works
const deepTarget1 = { a: { b: 1 } };
const deepSource1 = { a: { c: 2 }, d: 3 };
const deepResult1 = deepSafeMerge(deepTarget1, deepSource1);
assertEqual(deepResult1.a.b, 1, 'Deep merge preserves nested target');
assertEqual(deepResult1.a.c, 2, 'Deep merge adds nested source');
assertEqual(deepResult1.d, 3, 'Deep merge adds top-level source');

// Test 3.2: Blocks __proto__ at nested level
const deepTarget2 = { outer: {} };
const deepMalicious = { outer: { __proto__: { hacked: true } } };
deepSafeMerge(deepTarget2, deepMalicious);
assertEqual(({}).hacked, undefined, 'Nested __proto__ attack blocked');

// Test 3.3: Blocks prototype at nested level
const deepTarget3 = { config: {} };
const deepMal2 = { config: { prototype: { bad: true } } };
deepSafeMerge(deepTarget3, deepMal2);
assertEqual(deepTarget3.config.prototype, undefined, 'Nested prototype blocked');

// Test 3.4: Handles deep nesting
const deepTarget4 = { a: { b: { c: { d: 1 } } } };
const deepSource4 = { a: { b: { c: { e: 2 } } } };
deepSafeMerge(deepTarget4, deepSource4);
assertEqual(deepTarget4.a.b.c.d, 1, 'Deep nested original preserved');
assertEqual(deepTarget4.a.b.c.e, 2, 'Deep nested source added');


// -----------------------------------------------------------------------------
// Section 4: freezePrototype Tests
// -----------------------------------------------------------------------------
printSectionHeader('FREEZE PROTOTYPE TESTS');

// Test 4.1: Returns the constructor
function TestConstructor() {}
const returned = freezePrototype(TestConstructor);
assertEqual(returned, TestConstructor, 'Returns the constructor');

// Test 4.2: Prototype is frozen
assertTrue(Object.isFrozen(TestConstructor.prototype), 'Prototype is frozen');

// Test 4.3: Cannot add properties to frozen prototype
assertThrows(() => {
    'use strict';
    TestConstructor.prototype.newMethod = function() {};
}, 'Cannot add to frozen prototype (strict mode)');

// Test 4.4: Cannot modify existing properties
const origConstructor = TestConstructor.prototype.constructor;
try {
    TestConstructor.prototype.constructor = null;
} catch (e) {}
assertEqual(
    TestConstructor.prototype.constructor,
    origConstructor,
    'Cannot modify frozen prototype properties'
);


// -----------------------------------------------------------------------------
// Section 5: createSecureObject Tests
// -----------------------------------------------------------------------------
printSectionHeader('CREATE SECURE OBJECT TESTS');

// Test 5.1: Has null prototype
const secure1 = createSecureObject({ data: 'test' });
assertEqual(Object.getPrototypeOf(secure1), null, 'Has null prototype');

// Test 5.2: Has properties
assertEqual(secure1.data, 'test', 'Has provided properties');

// Test 5.3: No Object.prototype methods
assertEqual(secure1.toString, undefined, 'No toString method');
assertEqual(secure1.hasOwnProperty, undefined, 'No hasOwnProperty method');

// Test 5.4: Multiple properties
const secure2 = createSecureObject({ a: 1, b: 2, c: 3 });
assertEqual(secure2.a, 1, 'Multiple props - a');
assertEqual(secure2.b, 2, 'Multiple props - b');
assertEqual(secure2.c, 3, 'Multiple props - c');

// Test 5.5: Empty props
const secure3 = createSecureObject({});
assertEqual(Object.keys(secure3).length, 0, 'Empty props creates empty object');
assertEqual(Object.getPrototypeOf(secure3), null, 'Empty still has null proto');


// -----------------------------------------------------------------------------
// Section 6: sanitizeKey Tests
// -----------------------------------------------------------------------------
printSectionHeader('SANITIZE KEY TESTS');

// Test 6.1: Normal keys are safe
assertTrue(sanitizeKey('name'), 'name is safe');
assertTrue(sanitizeKey('data'), 'data is safe');
assertTrue(sanitizeKey('user'), 'user is safe');

// Test 6.2: __proto__ is dangerous
assertFalse(sanitizeKey('__proto__'), '__proto__ is dangerous');

// Test 6.3: prototype is dangerous
assertFalse(sanitizeKey('prototype'), 'prototype is dangerous');

// Test 6.4: constructor is dangerous
assertFalse(sanitizeKey('constructor'), 'constructor is dangerous');

// Test 6.5: Similar but safe keys
assertTrue(sanitizeKey('proto'), 'proto (without underscores) is safe');
assertTrue(sanitizeKey('_prototype'), '_prototype is safe');
assertTrue(sanitizeKey('constructors'), 'constructors (plural) is safe');


// -----------------------------------------------------------------------------
// Section 7: Security Scenario Tests
// -----------------------------------------------------------------------------
printSectionHeader('SECURITY SCENARIO TESTS');

// Test 7.1: Simulate JSON injection attack
const userInput = JSON.parse('{"__proto__": {"isAdmin": true}}');
const safeTarget = {};
safeObjectMerge(safeTarget, userInput);
assertEqual(({}).isAdmin, undefined, 'JSON injection attack prevented');

// Test 7.2: Multiple dangerous keys in one object
const multiMalicious = {
    name: 'legit',
    __proto__: { x: 1 },
    prototype: { y: 2 },
    constructor: { z: 3 }
};
const safeTarget2 = {};
safeObjectMerge(safeTarget2, multiMalicious);
assertEqual(safeTarget2.name, 'legit', 'Safe key is merged');
assertEqual(Object.keys(safeTarget2).length, 1, 'Only safe key is merged');

// Test 7.3: Secure object immune to prototype pollution
// First simulate pollution on Object.prototype (we'll clean up)
const originalTest = Object.prototype.testPollution;
Object.prototype.testPollution = 'polluted!';

const secureObj = createSecureObject({ myData: 'safe' });
assertEqual(secureObj.testPollution, undefined, 'Secure object immune to Object.prototype pollution');

// Clean up
if (originalTest === undefined) {
    delete Object.prototype.testPollution;
} else {
    Object.prototype.testPollution = originalTest;
}


// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
