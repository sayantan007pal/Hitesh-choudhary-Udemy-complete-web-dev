/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║       TEST SUITE: Advanced Prototype Patterns - Interview Ready!             ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _10_test_advanced_prototype_patterns_example.js
 */

const {
    borrowMethod,
    extendArrayPrototypeSafe,
    createShape,
    getInstanceType,
    implementsInterface,
    createMemoizedConstructor,
    shapeProto,
    circleProto,
    rectangleProto,
    triangleProto
} = require('./_10_advanced_prototype_patterns_example.js');

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

function assertApproxEqual(actual, expected, tolerance, testName) {
    totalTests++;
    if (Math.abs(actual - expected) < tolerance) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ~${expected} (±${tolerance})`);
        console.log(`   Actual:   ${actual}`);
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

function assertDeepEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
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
        console.log('🏆 You are now INTERVIEW READY on JavaScript Prototypes! 🏆\n');
    } else {
        console.log('\n💪 Keep trying! Review the failed tests and try again.\n');
    }
}

// =============================================================================
// TEST SUITE
// =============================================================================

console.log('\n🧪 Running Advanced Prototype Patterns Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: borrowMethod Tests
// -----------------------------------------------------------------------------
printSectionHeader('BORROW METHOD TESTS');

// Test 1.1: Borrow Array join for array-like object
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const joinResult = borrowMethod([1,2,3], 'join', arrayLike, '-');
assertEqual(joinResult, 'a-b-c', 'Borrow join from array');

// Test 1.2: Borrow slice
const sliceResult = borrowMethod([], 'slice', arrayLike, 1);
assertDeepEqual(sliceResult, ['b', 'c'], 'Borrow slice from array');

// Test 1.3: Borrow Object methods
const obj = { a: 1, b: 2 };
const keysResult = borrowMethod(Object, 'keys', null, obj);
assertDeepEqual(keysResult, ['a', 'b'], 'Borrow Object.keys');

// Test 1.4: Borrow with custom object methods
const mathUtils = {
    double: function() { return this.value * 2; }
};
const numObj = { value: 21 };
const doubleResult = borrowMethod(mathUtils, 'double', numObj);
assertEqual(doubleResult, 42, 'Borrow custom method');

// Test 1.5: Borrow String methods
const strLike = { toString: () => 'hello world' };
// Use apply on String.prototype.toUpperCase is tricky, let's test indexOf
const greeting = 'hello';
const indexResult = borrowMethod(greeting, 'indexOf', 'hello world', 'world');
assertEqual(indexResult, 6, 'Borrow indexOf from string');


// -----------------------------------------------------------------------------
// Section 2: extendArrayPrototypeSafe Tests
// -----------------------------------------------------------------------------
printSectionHeader('EXTEND ARRAY PROTOTYPE SAFE TESTS');

// Clean up any test methods from previous runs
delete Array.prototype.testSum;
delete Array.prototype.testFirst;

// Test 2.1: Add new method successfully
const added1 = extendArrayPrototypeSafe('testSum', function() {
    return this.reduce((a, b) => a + b, 0);
});
assertTrue(added1, 'Returns true when method added');

// Test 2.2: Method works
const testArr = [1, 2, 3, 4, 5];
assertEqual(testArr.testSum(), 15, 'Added method works correctly');

// Test 2.3: Cannot add existing method
const added2 = extendArrayPrototypeSafe('testSum', function() { return 'replaced'; });
assertFalse(added2, 'Returns false when method already exists');
assertEqual(testArr.testSum(), 15, 'Original method preserved');

// Test 2.4: Cannot add built-in method
const added3 = extendArrayPrototypeSafe('map', function() { return 'hacked'; });
assertFalse(added3, 'Returns false for built-in method');

// Test 2.5: Added method is non-enumerable
const added4 = extendArrayPrototypeSafe('testFirst', function() { return this[0]; });
const enumerable = Object.getOwnPropertyDescriptor(Array.prototype, 'testFirst').enumerable;
assertFalse(enumerable, 'Added method is non-enumerable');

// Cleanup
delete Array.prototype.testSum;
delete Array.prototype.testFirst;


// -----------------------------------------------------------------------------
// Section 3: createShape Factory Tests
// -----------------------------------------------------------------------------
printSectionHeader('CREATE SHAPE FACTORY TESTS');

// Test 3.1: Circle creation
const circle = createShape('circle', 5);
assertApproxEqual(circle.area(), Math.PI * 25, 0.001, 'Circle area is correct');
assertEqual(circle.describe(), 'circle with radius 5', 'Circle describe is correct');

// Test 3.2: Rectangle creation
const rect = createShape('rectangle', 4, 6);
assertEqual(rect.area(), 24, 'Rectangle area is correct');
assertEqual(rect.describe(), 'rectangle with width 4 and height 6', 'Rectangle describe is correct');

// Test 3.3: Triangle creation
const tri = createShape('triangle', 10, 5);
assertEqual(tri.area(), 25, 'Triangle area is correct (base*height/2)');
assertEqual(tri.describe(), 'triangle with base 10 and height 5', 'Triangle describe is correct');

// Test 3.4: Shapes inherit from shapeProto
assertTrue(shapeProto.isPrototypeOf(circle), 'Circle inherits from shapeProto');
assertTrue(shapeProto.isPrototypeOf(rect), 'Rectangle inherits from shapeProto');
assertTrue(shapeProto.isPrototypeOf(tri), 'Triangle inherits from shapeProto');

// Test 3.5: Specific prototypes
assertTrue(circleProto.isPrototypeOf(circle), 'Circle has circleProto');
assertTrue(rectangleProto.isPrototypeOf(rect), 'Rectangle has rectangleProto');
assertTrue(triangleProto.isPrototypeOf(tri), 'Triangle has triangleProto');

// Test 3.6: Different instances are independent
const circle2 = createShape('circle', 10);
assertEqual(circle.area(), Math.PI * 25, 'First circle unchanged');
assertApproxEqual(circle2.area(), Math.PI * 100, 0.001, 'Second circle has different area');


// -----------------------------------------------------------------------------
// Section 4: getInstanceType Tests
// -----------------------------------------------------------------------------
printSectionHeader('GET INSTANCE TYPE TESTS');

// Test 4.1: Built-in types
assertEqual(getInstanceType([]), 'Array', 'Array type detected');
assertEqual(getInstanceType({}), 'Object', 'Object type detected');
assertEqual(getInstanceType(new Date()), 'Date', 'Date type detected');
assertEqual(getInstanceType(new Map()), 'Map', 'Map type detected');
assertEqual(getInstanceType(/regex/), 'RegExp', 'RegExp type detected');

// Test 4.2: Custom constructors
function Person(name) { this.name = name; }
const person = new Person('John');
assertEqual(getInstanceType(person), 'Person', 'Custom constructor type detected');

// Test 4.3: Null prototype object
const nullProto = Object.create(null);
assertEqual(getInstanceType(nullProto), 'null', 'Null prototype returns "null"');

// Test 4.4: Object.create with custom proto
const customProto = { greet: function() {} };
const customObj = Object.create(customProto);
assertEqual(getInstanceType(customObj), 'Object', 'Object.create returns "Object"');

// Test 4.5: Anonymous constructor
const AnonClass = function() {};
assertEqual(getInstanceType(new AnonClass()), 'AnonClass', 'Anonymous function name detected');


// -----------------------------------------------------------------------------
// Section 5: implementsInterface Tests
// -----------------------------------------------------------------------------
printSectionHeader('IMPLEMENTS INTERFACE TESTS');

// Test 5.1: Object implements interface
const duck = {
    quack: function() { return 'Quack!'; },
    swim: function() { return 'Swimming...'; },
    feathers: 'white'
};
const duckInterface = {
    quack: 'function',
    swim: 'function',
    feathers: 'string'
};
const duckResult = implementsInterface(duck, duckInterface);
assertTrue(duckResult.valid, 'Duck implements interface');
assertEqual(duckResult.missing.length, 0, 'No missing members');

// Test 5.2: Object missing members
const partialDuck = {
    quack: function() { return 'Quack!'; }
};
const partialResult = implementsInterface(partialDuck, duckInterface);
assertFalse(partialResult.valid, 'Partial duck does not implement interface');
assertTrue(partialResult.missing.includes('swim'), 'swim is missing');
assertTrue(partialResult.missing.includes('feathers'), 'feathers is missing');

// Test 5.3: Wrong type
const wrongType = {
    quack: 'not a function',
    swim: function() {},
    feathers: 123  // should be string
};
const wrongResult = implementsInterface(wrongType, duckInterface);
assertFalse(wrongResult.valid, 'Wrong type fails interface check');
assertTrue(wrongResult.missing.includes('quack'), 'quack wrong type is missing');
assertTrue(wrongResult.missing.includes('feathers'), 'feathers wrong type is missing');

// Test 5.4: Empty interface
const emptyResult = implementsInterface({}, {});
assertTrue(emptyResult.valid, 'Empty interface always valid');


// -----------------------------------------------------------------------------
// Section 6: createMemoizedConstructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('CREATE MEMOIZED CONSTRUCTOR TESTS');

// Test 6.1: Basic memoization
function ExpensiveObject(id) {
    this.id = id;
    this.createdAt = Date.now();
}

const MemoizedExpensive = createMemoizedConstructor(ExpensiveObject);

const obj1 = new MemoizedExpensive('key1');
const obj2 = new MemoizedExpensive('key1');
assertTrue(obj1 === obj2, 'Same key returns same instance');

// Test 6.2: Different keys create different instances
const obj3 = new MemoizedExpensive('key2');
assertFalse(obj1 === obj3, 'Different keys create different instances');

// Test 6.3: Instance has correct properties
assertEqual(obj1.id, 'key1', 'Memoized instance has correct properties');

// Test 6.4: Instance is instanceof original constructor
assertTrue(obj1 instanceof ExpensiveObject, 'Instance is instanceof original');

// Test 6.5: Works with another constructor
function User(username) {
    this.username = username;
}
User.prototype.greet = function() { return `Hi, ${this.username}`; };

const MemoizedUser = createMemoizedConstructor(User);
const user1 = new MemoizedUser('alice');
const user2 = new MemoizedUser('alice');
const user3 = new MemoizedUser('bob');

assertTrue(user1 === user2, 'Same username returns same user');
assertFalse(user1 === user3, 'Different usernames create different users');
assertEqual(user1.greet(), 'Hi, alice', 'Prototype methods work');


// -----------------------------------------------------------------------------
// Section 7: Prototype Chain Verification for Shapes
// -----------------------------------------------------------------------------
printSectionHeader('SHAPE PROTOTYPE CHAIN VERIFICATION');

// Test 7.1: circleProto inherits from shapeProto
assertEqual(Object.getPrototypeOf(circleProto), shapeProto, 'circleProto inherits from shapeProto');

// Test 7.2: rectangleProto inherits from shapeProto
assertEqual(Object.getPrototypeOf(rectangleProto), shapeProto, 'rectangleProto inherits from shapeProto');

// Test 7.3: triangleProto inherits from shapeProto
assertEqual(Object.getPrototypeOf(triangleProto), shapeProto, 'triangleProto inherits from shapeProto');

// Test 7.4: shapeProto inherits from Object.prototype
assertEqual(Object.getPrototypeOf(shapeProto), Object.prototype, 'shapeProto inherits from Object.prototype');


// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
