/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║     TEST SUITE: new.target and Constructor Safety                            ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _5_test_new_target_safety_example.js
 */

const {
    StrictPerson,
    FlexiblePerson,
    AbstractShape,
    ConcreteSquare,
    detectCallingMethod
} = require('./_5_new_target_safety_example.js');

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

function assertThrows(fn, errorType, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${errorType ? errorType.name : 'Error'} to be thrown`);
        console.log(`   Actual:   No error thrown`);
        testsFailed++;
        return false;
    } catch (error) {
        if (!errorType || error instanceof errorType) {
            console.log(`✅ PASS: ${testName}`);
            testsPassed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Expected: ${errorType.name}`);
            console.log(`   Actual:   ${error.constructor.name}: ${error.message}`);
            testsFailed++;
            return false;
        }
    }
}

function assertThrowsWithMessage(fn, expectedMessage, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: Error with message "${expectedMessage}"`);
        console.log(`   Actual:   No error thrown`);
        testsFailed++;
        return false;
    } catch (error) {
        if (error.message === expectedMessage) {
            console.log(`✅ PASS: ${testName}`);
            testsPassed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Expected message: "${expectedMessage}"`);
            console.log(`   Actual message:   "${error.message}"`);
            testsFailed++;
            return false;
        }
    }
}

function assertDoesNotThrow(fn, testName) {
    totalTests++;
    try {
        fn();
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } catch (error) {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: No error`);
        console.log(`   Actual:   ${error.constructor.name}: ${error.message}`);
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

console.log('\n🧪 Running new.target and Constructor Safety Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: StrictPerson Tests
// -----------------------------------------------------------------------------
printSectionHeader('STRICT PERSON - THROWS WITHOUT NEW');

// Works with 'new'
assertDoesNotThrow(() => new StrictPerson('Alice'), 'StrictPerson works with new');

const strictPerson = new StrictPerson('Bob');
assertEqual(strictPerson.name, 'Bob', 'StrictPerson stores name');
assertInstanceOf(strictPerson, StrictPerson, 'StrictPerson creates proper instance');

// Throws without 'new'
assertThrows(
    () => StrictPerson('Charlie'),
    Error,
    'StrictPerson throws Error without new'
);

assertThrowsWithMessage(
    () => StrictPerson('Charlie'),
    "StrictPerson must be called with 'new'",
    'StrictPerson throws with correct message'
);

// -----------------------------------------------------------------------------
// Section 2: FlexiblePerson Tests
// -----------------------------------------------------------------------------
printSectionHeader('FLEXIBLE PERSON - AUTO-CORRECTS');

// Works with 'new'
assertDoesNotThrow(() => new FlexiblePerson('Diana'), 'FlexiblePerson works with new');

const flexWithNew = new FlexiblePerson('Eve');
assertEqual(flexWithNew.name, 'Eve', 'FlexiblePerson with new stores name');
assertInstanceOf(flexWithNew, FlexiblePerson, 'FlexiblePerson with new creates instance');

// Works WITHOUT 'new' - auto-corrects!
assertDoesNotThrow(() => FlexiblePerson('Frank'), 'FlexiblePerson works without new');

const flexWithoutNew = FlexiblePerson('Grace');
assertTypeOf(flexWithoutNew, 'object', 'FlexiblePerson without new returns object');
assertEqual(flexWithoutNew.name, 'Grace', 'FlexiblePerson without new stores name');
assertInstanceOf(flexWithoutNew, FlexiblePerson, 'FlexiblePerson without new creates proper instance');

// Both ways produce equivalent results
const person1 = new FlexiblePerson('Test');
const person2 = FlexiblePerson('Test');
assertEqual(
    person1.constructor === person2.constructor,
    true,
    'Both calling methods produce same constructor'
);

// -----------------------------------------------------------------------------
// Section 3: AbstractShape Tests
// -----------------------------------------------------------------------------
printSectionHeader('ABSTRACT SHAPE - CANNOT INSTANTIATE DIRECTLY');

// Cannot instantiate directly
assertThrows(
    () => new AbstractShape('generic'),
    Error,
    'AbstractShape throws when instantiated directly'
);

assertThrowsWithMessage(
    () => new AbstractShape('generic'),
    'AbstractShape cannot be instantiated directly',
    'AbstractShape throws with correct message'
);

// -----------------------------------------------------------------------------
// Section 4: ConcreteSquare Tests
// -----------------------------------------------------------------------------
printSectionHeader('CONCRETE SQUARE - INHERITS FROM ABSTRACT');

// Can instantiate ConcreteSquare
assertDoesNotThrow(
    () => new ConcreteSquare(5),
    'ConcreteSquare can be instantiated'
);

const square = new ConcreteSquare(4);

// Check properties
assertEqual(square.size, 4, 'ConcreteSquare stores size');
assertEqual(square.type, 'square', 'ConcreteSquare has type from AbstractShape');

// Check method
assertTypeOf(square.getArea, 'function', 'ConcreteSquare has getArea method');
assertEqual(square.getArea(), 16, 'getArea() returns size * size');

// Check inheritance
assertInstanceOf(square, ConcreteSquare, 'Square is instanceof ConcreteSquare');
assertInstanceOf(square, AbstractShape, 'Square is instanceof AbstractShape');

// Different sizes
const smallSquare = new ConcreteSquare(2);
const largeSquare = new ConcreteSquare(10);
assertEqual(smallSquare.getArea(), 4, 'Small square area is correct');
assertEqual(largeSquare.getArea(), 100, 'Large square area is correct');

// -----------------------------------------------------------------------------
// Section 5: detectCallingMethod Tests
// -----------------------------------------------------------------------------
printSectionHeader('DETECT CALLING METHOD');

// StrictPerson - only works with 'new'
assertEqual(
    detectCallingMethod(StrictPerson, 'Test'),
    'with-new',
    'StrictPerson detected as with-new only'
);

// FlexiblePerson - works both ways
assertEqual(
    detectCallingMethod(FlexiblePerson, 'Test'),
    'both',
    'FlexiblePerson detected as both'
);

// Regular function - works without new
function regularFunction(x) {
    return { value: x };
}
assertEqual(
    detectCallingMethod(regularFunction, 5),
    'without-new',
    'Regular function detected as without-new'
);

// -----------------------------------------------------------------------------
// Section 6: Prototype Chain with Abstract Pattern
// -----------------------------------------------------------------------------
printSectionHeader('PROTOTYPE CHAIN WITH ABSTRACT PATTERN');

const sq = new ConcreteSquare(3);

// Verify prototype chain
assertTrue(
    Object.getPrototypeOf(sq) === ConcreteSquare.prototype,
    'Square __proto__ is ConcreteSquare.prototype'
);

assertTrue(
    Object.getPrototypeOf(ConcreteSquare.prototype) === AbstractShape.prototype,
    'ConcreteSquare.prototype __proto__ is AbstractShape.prototype'
);

assertEqual(
    ConcreteSquare.prototype.constructor,
    ConcreteSquare,
    'ConcreteSquare.prototype.constructor is correct'
);

// -----------------------------------------------------------------------------
// Section 7: Multiple ConcreteSquare Instances
// -----------------------------------------------------------------------------
printSectionHeader('MULTIPLE INSTANCES');

const squares = [
    new ConcreteSquare(1),
    new ConcreteSquare(2),
    new ConcreteSquare(3)
];

assertEqual(squares[0].getArea(), 1, 'First square area correct');
assertEqual(squares[1].getArea(), 4, 'Second square area correct');
assertEqual(squares[2].getArea(), 9, 'Third square area correct');

// All share prototype method
assertTrue(
    squares[0].getArea === squares[1].getArea &&
    squares[1].getArea === squares[2].getArea,
    'All squares share same getArea method (prototype)'
);

// -----------------------------------------------------------------------------
// Section 8: Edge Cases
// -----------------------------------------------------------------------------
printSectionHeader('EDGE CASES');

// Empty name
assertDoesNotThrow(
    () => new StrictPerson(''),
    'StrictPerson accepts empty string name'
);

// Zero size square
const zeroSquare = new ConcreteSquare(0);
assertEqual(zeroSquare.getArea(), 0, 'Zero size square has zero area');

// Negative size (no validation - just testing it works)
const negSquare = new ConcreteSquare(-3);
assertEqual(negSquare.getArea(), 9, 'Negative size squared is positive');

// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
