/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║         TEST SUITE: __proto__ vs prototype Challenge                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _2_test_proto_vs_prototype_example.js
 */

const {
    getProtoChain,
    linkPrototypes,
    Person,
    checkProtoRelationship,
    addMethodToPrototype
} = require('./_2_proto_vs_prototype_example.js');

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

function assertDeepEqual(actual, expected, testName) {
    totalTests++;
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
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

function assertTypeOf(value, expectedType, testName) {
    totalTests++;
    const actualType = typeof value;
    if (actualType === expectedType) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${expectedType}`);
        console.log(`   Actual type:   ${actualType}`);
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

console.log('\n🧪 Running __proto__ vs prototype Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: getProtoChain Tests
// -----------------------------------------------------------------------------
printSectionHeader('GET PROTO CHAIN TESTS');

// Test 1.1: Simple object chain
const simpleObj = { a: 1 };
const chain1 = getProtoChain(simpleObj);
assertEqual(chain1.length, 3, 'Simple object has 3 items in chain (obj, Object.prototype, null)');
assertEqual(chain1[0], simpleObj, 'First item is the object itself');
assertEqual(chain1[1], Object.prototype, 'Second item is Object.prototype');
assertEqual(chain1[2], null, 'Last item is null');

// Test 1.2: Object with custom prototype
const parent = { x: 10 };
const child = Object.create(parent);
const chain2 = getProtoChain(child);
assertEqual(chain2.length, 4, 'Child with parent has 4 items in chain');
assertEqual(chain2[0], child, 'First item is child');
assertEqual(chain2[1], parent, 'Second item is parent');
assertEqual(chain2[2], Object.prototype, 'Third item is Object.prototype');
assertEqual(chain2[3], null, 'Last item is null');

// Test 1.3: Object.create(null) - no prototype
const noProtoObj = Object.create(null);
const chain3 = getProtoChain(noProtoObj);
assertEqual(chain3.length, 2, 'Object.create(null) has 2 items in chain');
assertEqual(chain3[0], noProtoObj, 'First item is the object');
assertEqual(chain3[1], null, 'Second item is null (no Object.prototype)');


// -----------------------------------------------------------------------------
// Section 2: linkPrototypes Tests
// -----------------------------------------------------------------------------
printSectionHeader('LINK PROTOTYPES TESTS');

// Test 2.1: Basic linking
const parentObj = { greeting: 'Hello' };
const childObj = { name: 'Child' };
const result = linkPrototypes(childObj, parentObj);

assertEqual(result, childObj, 'Returns the child object');
assertEqual(Object.getPrototypeOf(childObj), parentObj, 'Child prototype is set to parent');
assertEqual(childObj.greeting, 'Hello', 'Child can access parent properties');

// Test 2.2: Chained linking
const grandparent = { level: 'grandparent' };
const middleParent = { level: 'parent' };
const grandchild = { level: 'child' };

linkPrototypes(middleParent, grandparent);
linkPrototypes(grandchild, middleParent);

assertEqual(grandchild.level, 'child', 'Own property takes precedence');
assertEqual(Object.getPrototypeOf(grandchild), middleParent, 'Grandchild prototype is parent');
assertEqual(Object.getPrototypeOf(middleParent), grandparent, 'Parent prototype is grandparent');


// -----------------------------------------------------------------------------
// Section 3: Person Constructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('PERSON CONSTRUCTOR TESTS');

// Test 3.1: Person constructor creates instance
const person1 = new Person('Alice');
assertEqual(person1.name, 'Alice', 'Person constructor assigns name');

// Test 3.2: Person has greet method on prototype
assertTypeOf(Person.prototype.greet, 'function', 'Person.prototype has greet method');

// Test 3.3: greet returns correct message
assertEqual(person1.greet(), "Hello, I'm Alice", 'greet() returns correct message');

// Test 3.4: Different instances have different names
const person2 = new Person('Bob');
assertEqual(person2.greet(), "Hello, I'm Bob", 'Different instances have different greet messages');

// Test 3.5: Prototype relationship
assertTrue(person1 instanceof Person, 'person1 is instanceof Person');
assertEqual(Object.getPrototypeOf(person1), Person.prototype, 'person1.__proto__ is Person.prototype');


// -----------------------------------------------------------------------------
// Section 4: checkProtoRelationship Tests
// -----------------------------------------------------------------------------
printSectionHeader('CHECK PROTO RELATIONSHIP TESTS');

// Test 4.1: Valid relationship
const testPerson = new Person('Test');
assertTrue(
    checkProtoRelationship(testPerson, Person),
    'Person instance has correct proto relationship'
);

// Test 4.2: Invalid relationship
function OtherConstructor() {}
assertFalse(
    checkProtoRelationship(testPerson, OtherConstructor),
    'Person instance does not match OtherConstructor'
);

// Test 4.3: Array and Array constructor
const arr = [1, 2, 3];
assertTrue(
    checkProtoRelationship(arr, Array),
    'Array instance has correct proto relationship with Array'
);

// Test 4.4: Object literal and Object
const plainObj = {};
assertTrue(
    checkProtoRelationship(plainObj, Object),
    'Plain object has correct proto relationship with Object'
);


// -----------------------------------------------------------------------------
// Section 5: addMethodToPrototype Tests
// -----------------------------------------------------------------------------
printSectionHeader('ADD METHOD TO PROTOTYPE TESTS');

// Test 5.1: Add method to constructor
function TestClass() {
    this.value = 42;
}

const returnedConstructor = addMethodToPrototype(TestClass, 'getValue', function() {
    return this.value;
});

assertEqual(returnedConstructor, TestClass, 'Returns the constructor');
assertTypeOf(TestClass.prototype.getValue, 'function', 'Method added to prototype');

// Test 5.2: Method works on instances
const testInstance = new TestClass();
assertEqual(testInstance.getValue(), 42, 'Added method works correctly');

// Test 5.3: Existing instances get the method
const existingInstance = new TestClass();
addMethodToPrototype(TestClass, 'double', function() {
    return this.value * 2;
});
assertEqual(existingInstance.double(), 84, 'Existing instances get new method');

// Test 5.4: Method is on prototype, not instance
assertFalse(existingInstance.hasOwnProperty('double'), 'Method is on prototype, not instance');
assertTrue(TestClass.prototype.hasOwnProperty('double'), 'Method exists on prototype');


// -----------------------------------------------------------------------------
// Section 6: Edge Cases and Interview Questions
// -----------------------------------------------------------------------------
printSectionHeader('EDGE CASES AND INTERVIEW QUESTIONS');

// Test 6.1: Functions have both __proto__ and prototype
function SampleFunc() {}
assertTypeOf(SampleFunc.prototype, 'object', 'Functions have prototype property');
assertTrue(Object.getPrototypeOf(SampleFunc) === Function.prototype, 'Function.__proto__ is Function.prototype');

// Test 6.2: Objects don't have prototype property (only __proto__)
const plainObject = {};
assertEqual(plainObject.prototype, undefined, 'Plain objects do not have prototype property');

// Test 6.3: Constructor.prototype.constructor points back
assertEqual(Person.prototype.constructor, Person, 'prototype.constructor points back to constructor');

// Test 6.4: Modifying prototype affects all instances
Person.prototype.species = 'Human';
const person3 = new Person('Charlie');
assertEqual(person1.species, 'Human', 'Existing instance gets new prototype property');
assertEqual(person3.species, 'Human', 'New instance gets prototype property');


// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
