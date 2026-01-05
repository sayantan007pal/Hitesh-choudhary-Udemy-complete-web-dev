/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║       TEST SUITE: Constructor Functions and .prototype Challenge             ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _5_test_constructor_prototype_example.js
 */

const {
    Calculator,
    StringBuilder,
    Counter,
    fixConstructor
} = require('./_5_constructor_prototype_example.js');

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

console.log('\n🧪 Running Constructor Functions and .prototype Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: Calculator Tests
// -----------------------------------------------------------------------------
printSectionHeader('CALCULATOR TESTS');

// Test 1.1: Default value
const calc1 = new Calculator();
assertEqual(calc1.getValue(), 0, 'Calculator default value is 0');

// Test 1.2: Initial value
const calc2 = new Calculator(10);
assertEqual(calc2.getValue(), 10, 'Calculator accepts initial value');

// Test 1.3: Add operation
calc1.add(5);
assertEqual(calc1.getValue(), 5, 'add() adds to value');

// Test 1.4: Subtract operation
calc1.subtract(2);
assertEqual(calc1.getValue(), 3, 'subtract() subtracts from value');

// Test 1.5: Multiply operation
calc1.multiply(4);
assertEqual(calc1.getValue(), 12, 'multiply() multiplies value');

// Test 1.6: Divide operation
calc1.divide(3);
assertEqual(calc1.getValue(), 4, 'divide() divides value');

// Test 1.7: Method chaining
const calc3 = new Calculator(10);
calc3.add(5).multiply(2).subtract(10).divide(5);
assertEqual(calc3.getValue(), 4, 'Method chaining works: (10+5)*2-10)/5 = 4');

// Test 1.8: Reset method
calc3.reset();
assertEqual(calc3.getValue(), 0, 'reset() sets value to 0');

// Test 1.9: Reset returns this for chaining
const calc4 = new Calculator(100);
assertEqual(calc4.reset().add(7).getValue(), 7, 'reset() returns this for chaining');

// Test 1.10: Methods are on prototype, not instance
assertFalse(calc1.hasOwnProperty('add'), 'add is on prototype, not instance');
assertTrue(Calculator.prototype.hasOwnProperty('add'), 'add is on Calculator.prototype');

// Test 1.11: Different instances are independent
const calcA = new Calculator(5);
const calcB = new Calculator(10);
calcA.add(5);
assertEqual(calcA.getValue(), 10, 'Instance A has correct value');
assertEqual(calcB.getValue(), 10, 'Instance B unaffected by A');


// -----------------------------------------------------------------------------
// Section 2: StringBuilder Tests
// -----------------------------------------------------------------------------
printSectionHeader('STRING BUILDER TESTS');

// Test 2.1: Default empty string
const sb1 = new StringBuilder();
assertEqual(sb1.toString(), '', 'Default string is empty');

// Test 2.2: Initial string
const sb2 = new StringBuilder('Hello');
assertEqual(sb2.toString(), 'Hello', 'Accepts initial string');

// Test 2.3: Append
sb1.append('Hello');
assertEqual(sb1.toString(), 'Hello', 'append() adds to end');

// Test 2.4: Append chaining
sb1.append(' ').append('World');
assertEqual(sb1.toString(), 'Hello World', 'append() is chainable');

// Test 2.5: Prepend
const sb3 = new StringBuilder('World');
sb3.prepend('Hello ');
assertEqual(sb3.toString(), 'Hello World', 'prepend() adds to beginning');

// Test 2.6: Prepend chaining
const sb4 = new StringBuilder('!');
sb4.prepend('World').prepend('Hello ');
assertEqual(sb4.toString(), 'Hello World!', 'prepend() is chainable');

// Test 2.7: Mixed operations
const sb5 = new StringBuilder('middle');
sb5.prepend('start ').append(' end');
assertEqual(sb5.toString(), 'start middle end', 'prepend and append work together');

// Test 2.8: Clear method
sb5.clear();
assertEqual(sb5.toString(), '', 'clear() resets to empty string');

// Test 2.9: Clear returns this for chaining
const sb6 = new StringBuilder('old');
assertEqual(sb6.clear().append('new').toString(), 'new', 'clear() returns this');

// Test 2.10: Methods are on prototype
assertFalse(sb1.hasOwnProperty('append'), 'append is on prototype');
assertTrue(StringBuilder.prototype.hasOwnProperty('append'), 'append on StringBuilder.prototype');


// -----------------------------------------------------------------------------
// Section 3: Counter Tests (Shared State)
// -----------------------------------------------------------------------------
printSectionHeader('COUNTER TESTS (SHARED STATE)');

// Reset counter for clean tests
Counter.prototype.count = 0;
Counter.totalInstances = 0;

// Test 3.1: Counter starts at 0
const counter1 = new Counter();
assertEqual(counter1.getCount(), 0, 'Counter starts at 0');

// Test 3.2: Increment works
counter1.increment();
assertEqual(counter1.getCount(), 1, 'increment() adds 1');

// Test 3.3: Second instance shares count
const counter2 = new Counter();
assertEqual(counter2.getCount(), 1, 'New instance sees same count');

// Test 3.4: Second instance can increment
counter2.increment();
assertEqual(counter1.getCount(), 2, 'First instance sees incremented count');
assertEqual(counter2.getCount(), 2, 'Second instance sees incremented count');

// Test 3.5: Decrement works
counter1.decrement();
assertEqual(counter1.getCount(), 1, 'decrement() subtracts 1');
assertEqual(counter2.getCount(), 1, 'Both instances see decremented count');

// Test 3.6: Total instances tracked
assertTrue(
    Counter.totalInstances >= 2,
    'Counter.totalInstances tracks number of instances'
);

// Test 3.7: Third instance also shares count
const counter3 = new Counter();
assertEqual(counter3.getCount(), 1, 'Third instance sees shared count');


// -----------------------------------------------------------------------------
// Section 4: fixConstructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('FIX CONSTRUCTOR TESTS');

// Test 4.1: Setup - broken constructor
function TestConstructor() {
    this.value = 42;
}

// Replace prototype (breaks constructor reference)
TestConstructor.prototype = {
    getValue: function() { return this.value; }
};

// Test 4.2: Constructor is broken before fix
assertTrue(
    TestConstructor.prototype.constructor !== TestConstructor,
    'Constructor reference is broken after prototype replacement'
);

// Test 4.3: Fix constructor
const returned = fixConstructor(TestConstructor);
assertEqual(returned, TestConstructor, 'fixConstructor returns the Constructor');

// Test 4.4: Constructor is fixed
assertEqual(
    TestConstructor.prototype.constructor,
    TestConstructor,
    'Constructor reference is restored'
);

// Test 4.5: Instance still works
const testInstance = new TestConstructor();
assertEqual(testInstance.getValue(), 42, 'Instance works after fix');
assertTrue(testInstance instanceof TestConstructor, 'instanceof still works');

// Test 4.6: constructor property is correct on instance's proto
assertEqual(
    Object.getPrototypeOf(testInstance).constructor,
    TestConstructor,
    'Instance proto has correct constructor'
);


// -----------------------------------------------------------------------------
// Section 5: Edge Cases and Interview Questions
// -----------------------------------------------------------------------------
printSectionHeader('EDGE CASES AND INTERVIEW QUESTIONS');

// Test 5.1: Calculator.prototype.constructor is Calculator
assertEqual(
    Calculator.prototype.constructor,
    Calculator,
    'Calculator.prototype.constructor is Calculator'
);

// Test 5.2: Instance constructor reference
assertEqual(
    calc1.constructor,
    Calculator,
    'calc1.constructor is Calculator'
);

// Test 5.3: Prototype is shared (memory efficient)
const calcX = new Calculator();
const calcY = new Calculator();
assertTrue(
    Object.getPrototypeOf(calcX) === Object.getPrototypeOf(calcY),
    'All instances share the same prototype object'
);

// Test 5.4: Adding method to prototype affects existing instances
Calculator.prototype.square = function() {
    this.value = this.value * this.value;
    return this;
};
const calcZ = new Calculator(5);
calcZ.square();
assertEqual(calcZ.getValue(), 25, 'Dynamically added prototype method works');


// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
