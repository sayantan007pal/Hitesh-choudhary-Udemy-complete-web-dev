/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║     TEST SUITE: Understanding the 'new' Keyword Internals                    ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _2_test_new_keyword_internals_example.js
 */

const {
    customNew,
    Car,
    SpecialCar,
    whatNewDoes,
    compareNewVsNoNew
} = require('./_2_new_keyword_internals_example.js');

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

function assertInstanceOf(obj, constructor, testName) {
    totalTests++;
    if (obj instanceof constructor) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: instanceof ${constructor.name}`);
        console.log(`   Actual:   not an instance`);
        testsFailed++;
        return false;
    }
}

function assertNotInstanceOf(obj, constructor, testName) {
    totalTests++;
    if (!(obj instanceof constructor)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: NOT instanceof ${constructor.name}`);
        console.log(`   Actual:   is an instance`);
        testsFailed++;
        return false;
    }
}

function assertHasProperty(obj, prop, testName) {
    totalTests++;
    if (prop in obj) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: object to have property "${prop}"`);
        console.log(`   Actual:   property not found`);
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

console.log('\n🧪 Running "new" Keyword Internals Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: Car Constructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('CAR CONSTRUCTOR TESTS');

const car1 = new Car('Toyota', 'Camry');
assertEqual(car1.brand, 'Toyota', 'Car stores brand property');
assertEqual(car1.model, 'Camry', 'Car stores model property');
assertInstanceOf(car1, Car, 'Car instance is instanceof Car');

// Car prototype method
assertTypeOf(Car.prototype.getInfo, 'function', 'getInfo exists on Car.prototype');
assertEqual(car1.getInfo(), 'Toyota Camry', 'getInfo() returns correct format');

const car2 = new Car('Honda', 'Accord');
assertEqual(car2.getInfo(), 'Honda Accord', 'getInfo() works for different instances');

// -----------------------------------------------------------------------------
// Section 2: customNew Basic Tests
// -----------------------------------------------------------------------------
printSectionHeader('CUSTOM NEW - BASIC TESTS');

const customCar1 = customNew(Car, 'BMW', 'M3');
assertTypeOf(customCar1, 'object', 'customNew returns an object');
assertEqual(customCar1.brand, 'BMW', 'customNew sets properties correctly');
assertEqual(customCar1.model, 'M3', 'customNew sets all properties');

// -----------------------------------------------------------------------------
// Section 3: customNew Prototype Chain
// -----------------------------------------------------------------------------
printSectionHeader('CUSTOM NEW - PROTOTYPE CHAIN');

const customCar2 = customNew(Car, 'Mercedes', 'S-Class');

// Check prototype chain
assertTrue(
    Object.getPrototypeOf(customCar2) === Car.prototype,
    'customNew sets __proto__ to Constructor.prototype'
);

assertInstanceOf(customCar2, Car, 'customNew creates proper instanceof');

// Prototype methods work
assertTypeOf(customCar2.getInfo, 'function', 'customNew enables prototype method access');
assertEqual(customCar2.getInfo(), 'Mercedes S-Class', 'Prototype methods work correctly');

// Compare with real 'new'
const realCar = new Car('Audi', 'A4');
assertEqual(
    Object.getPrototypeOf(customCar2) === Object.getPrototypeOf(realCar),
    true,
    'customNew and real new have same prototype'
);

// -----------------------------------------------------------------------------
// Section 4: customNew with Constructor Returning Object
// -----------------------------------------------------------------------------
printSectionHeader('CUSTOM NEW - EXPLICIT RETURN');

// SpecialCar returns a custom object
const specialReal = new SpecialCar('Tesla');
assertEqual(specialReal.type, 'special', 'SpecialCar returns custom object with type');
assertEqual(specialReal.brand, 'Tesla', 'SpecialCar returns custom object with brand');

// customNew should behave the same
const specialCustom = customNew(SpecialCar, 'Rivian');
assertEqual(specialCustom.type, 'special', 'customNew respects explicit object return');
assertEqual(specialCustom.brand, 'Rivian', 'customNew passes args for explicit return');

// When constructor returns object, it's NOT instanceof the constructor
// (Because the returned object wasn't created with that prototype)
assertFalse(
    Object.getPrototypeOf(specialReal) === SpecialCar.prototype,
    'Explicit return object has different prototype'
);

// -----------------------------------------------------------------------------
// Section 5: customNew Edge Cases
// -----------------------------------------------------------------------------
printSectionHeader('CUSTOM NEW - EDGE CASES');

// Constructor with no parameters
function NoParams() {
    this.value = 'default';
}
const noParamsInstance = customNew(NoParams);
assertEqual(noParamsInstance.value, 'default', 'customNew works with no-param constructor');

// Constructor that returns primitive (should be ignored)
function ReturnsPrimitive(x) {
    this.x = x;
    return 42; // Primitives are ignored by 'new'
}
const primitiveTest = customNew(ReturnsPrimitive, 10);
assertEqual(primitiveTest.x, 10, 'customNew ignores primitive return values');
assertInstanceOf(primitiveTest, ReturnsPrimitive, 'Instance created despite primitive return');

// Constructor that returns null (should be ignored)
function ReturnsNull(x) {
    this.x = x;
    return null;
}
const nullTest = customNew(ReturnsNull, 20);
assertEqual(nullTest.x, 20, 'customNew ignores null return');
assertInstanceOf(nullTest, ReturnsNull, 'Instance created despite null return');

// Constructor with multiple prototype methods
function MultiMethod() {
    this.data = [];
}
MultiMethod.prototype.add = function(item) { this.data.push(item); };
MultiMethod.prototype.get = function() { return this.data; };

const multiInstance = customNew(MultiMethod);
multiInstance.add('test');
assertEqual(multiInstance.get()[0], 'test', 'customNew works with multiple prototype methods');

// -----------------------------------------------------------------------------
// Section 6: whatNewDoes Tests
// -----------------------------------------------------------------------------
printSectionHeader('WHAT NEW DOES - DESCRIPTION');

const description = whatNewDoes(Car, ['Toyota', 'Camry']);

assertTypeOf(description, 'object', 'whatNewDoes returns an object');
assertHasProperty(description, 'step1', 'Description has step1');
assertHasProperty(description, 'step2', 'Description has step2');
assertHasProperty(description, 'step3', 'Description has step3');
assertHasProperty(description, 'step4', 'Description has step4');

assertTypeOf(description.step1, 'string', 'step1 is a string');
assertTypeOf(description.step2, 'string', 'step2 is a string');
assertTypeOf(description.step3, 'string', 'step3 is a string');
assertTypeOf(description.step4, 'string', 'step4 is a string');

// Check that descriptions mention key concepts
assertTrue(
    description.step1.toLowerCase().includes('object') || 
    description.step1.toLowerCase().includes('create'),
    'step1 mentions object creation'
);

assertTrue(
    description.step2.toLowerCase().includes('proto') || 
    description.step2.toLowerCase().includes('prototype'),
    'step2 mentions prototype'
);

assertTrue(
    description.step3.toLowerCase().includes('this') || 
    description.step3.toLowerCase().includes('call') ||
    description.step3.toLowerCase().includes('execute'),
    'step3 mentions this/call/execute'
);

assertTrue(
    description.step4.toLowerCase().includes('return'),
    'step4 mentions return'
);

// -----------------------------------------------------------------------------
// Section 7: compareNewVsNoNew Tests
// -----------------------------------------------------------------------------
printSectionHeader('COMPARE NEW VS NO NEW');

// Test with Car constructor
function StrictCar(brand) {
    'use strict';
    this.brand = brand;
}

const comparison = compareNewVsNoNew(StrictCar, 'Ford');

assertTypeOf(comparison, 'object', 'compareNewVsNoNew returns an object');
assertHasProperty(comparison, 'withNew', 'Result has withNew property');
assertHasProperty(comparison, 'withoutNew', 'Result has withoutNew property');

assertEqual(comparison.withNew.brand, 'Ford', 'withNew creates object correctly');

// withoutNew in strict mode should error or return undefined
assertTrue(
    comparison.withoutNew === undefined || 
    comparison.withoutNew instanceof Error ||
    (typeof comparison.withoutNew === 'object' && comparison.withoutNew !== null && 'error' in comparison.withoutNew),
    'withoutNew returns undefined, Error, or error object in strict mode'
);

// -----------------------------------------------------------------------------
// Section 8: Prototype Methods Shared (Memory Efficiency)
// -----------------------------------------------------------------------------
printSectionHeader('PROTOTYPE METHOD SHARING');

const customCar3 = customNew(Car, 'Porsche', '911');
const customCar4 = customNew(Car, 'Ferrari', '488');

assertTrue(
    customCar3.getInfo === customCar4.getInfo,
    'Different instances share the same prototype method (memory efficient)'
);

assertTrue(
    customCar3.getInfo === Car.prototype.getInfo,
    'Instance method is the prototype method'
);

// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
