/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║     TEST SUITE: Constructor Inheritance with call() and apply()              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _4_test_constructor_inheritance_call_apply_example.js
 */

const {
    Shape,
    Rectangle,
    Circle,
    inheritFrom,
    callVsApplyDemo
} = require('./_4_constructor_inheritance_call_apply_example.js');

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

function assertHasProperty(obj, prop, testName) {
    totalTests++;
    if (prop in obj) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: object to have property "${prop}"`);
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

console.log('\n🧪 Running Constructor Inheritance Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: Shape Constructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('SHAPE CONSTRUCTOR TESTS');

const shape1 = new Shape('red');

assertEqual(shape1.color, 'red', 'Shape stores color property');
assertTypeOf(Shape.prototype.getColor, 'function', 'getColor exists on Shape.prototype');
assertTypeOf(Shape.prototype.describe, 'function', 'describe exists on Shape.prototype');

assertEqual(shape1.getColor(), 'red', 'getColor() returns color');
assertEqual(shape1.describe(), 'A red shape', 'describe() returns correct string');

const shape2 = new Shape('blue');
assertEqual(shape2.describe(), 'A blue shape', 'describe() works for different colors');

// -----------------------------------------------------------------------------
// Section 2: Rectangle Constructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('RECTANGLE CONSTRUCTOR TESTS');

const rect1 = new Rectangle('green', 10, 5);

// Check properties
assertEqual(rect1.color, 'green', 'Rectangle inherits color via call()');
assertEqual(rect1.width, 10, 'Rectangle has width property');
assertEqual(rect1.height, 5, 'Rectangle has height property');

// Check own methods
assertTypeOf(Rectangle.prototype.getArea, 'function', 'getArea exists on Rectangle.prototype');
assertEqual(rect1.getArea(), 50, 'getArea() returns width * height');

// Check inherited methods
assertTypeOf(rect1.getColor, 'function', 'Rectangle inherits getColor');
assertEqual(rect1.getColor(), 'green', 'Inherited getColor() works');

// Check overridden method
assertEqual(
    rect1.describe(), 
    'A green rectangle 10x5', 
    'describe() is overridden correctly'
);

// -----------------------------------------------------------------------------
// Section 3: Circle Constructor Tests
// -----------------------------------------------------------------------------
printSectionHeader('CIRCLE CONSTRUCTOR TESTS');

const circle1 = new Circle('yellow', 7);

// Check properties
assertEqual(circle1.color, 'yellow', 'Circle inherits color via apply()');
assertEqual(circle1.radius, 7, 'Circle has radius property');

// Check own methods
assertTypeOf(Circle.prototype.getArea, 'function', 'getArea exists on Circle.prototype');
assertApproxEqual(circle1.getArea(), Math.PI * 49, 0.001, 'getArea() returns π * r²');

// Check inherited methods
assertTypeOf(circle1.getColor, 'function', 'Circle inherits getColor');
assertEqual(circle1.getColor(), 'yellow', 'Inherited getColor() works');

// Check overridden method
assertEqual(
    circle1.describe(), 
    'A yellow circle with radius 7', 
    'describe() is overridden correctly'
);

// -----------------------------------------------------------------------------
// Section 4: Inheritance Chain Tests
// -----------------------------------------------------------------------------
printSectionHeader('INHERITANCE CHAIN TESTS');

const rect2 = new Rectangle('purple', 4, 6);
const circle2 = new Circle('orange', 3);

// instanceof checks
assertInstanceOf(rect2, Rectangle, 'Rectangle is instanceof Rectangle');
assertInstanceOf(rect2, Shape, 'Rectangle is instanceof Shape');
assertInstanceOf(circle2, Circle, 'Circle is instanceof Circle');
assertInstanceOf(circle2, Shape, 'Circle is instanceof Shape');

// Constructor property
assertEqual(
    Rectangle.prototype.constructor, 
    Rectangle, 
    'Rectangle.prototype.constructor is Rectangle'
);
assertEqual(
    Circle.prototype.constructor, 
    Circle, 
    'Circle.prototype.constructor is Circle'
);

// Prototype chain
assertTrue(
    Object.getPrototypeOf(Rectangle.prototype) === Shape.prototype,
    'Rectangle.prototype.__proto__ is Shape.prototype'
);
assertTrue(
    Object.getPrototypeOf(Circle.prototype) === Shape.prototype,
    'Circle.prototype.__proto__ is Shape.prototype'
);

// -----------------------------------------------------------------------------
// Section 5: Method Lookup Chain
// -----------------------------------------------------------------------------
printSectionHeader('METHOD LOOKUP CHAIN');

// Rectangle has own describe, so it doesn't use Shape's
assertTrue(
    Rectangle.prototype.hasOwnProperty('describe'),
    'Rectangle has its own describe method'
);

// But Shape's describe still exists
assertTrue(
    Shape.prototype.hasOwnProperty('describe'),
    'Shape still has describe method'
);

// getColor is inherited (not own property of Rectangle)
assertTrue(
    !Rectangle.prototype.hasOwnProperty('getColor'),
    'getColor is not own property of Rectangle.prototype'
);

// -----------------------------------------------------------------------------
// Section 6: inheritFrom Function Tests
// -----------------------------------------------------------------------------
printSectionHeader('INHERIT FROM FUNCTION TESTS');

function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    return this.name + ' speaks';
};

function Dog(name, breed) {
    Animal.call(this, name);
    this.breed = breed;
}

// Use inheritFrom to set up inheritance
const result = inheritFrom(Dog, Animal);

assertEqual(result, Dog, 'inheritFrom returns Child constructor');

// Test that inheritance works
const dog = new Dog('Rex', 'German Shepherd');
assertEqual(dog.name, 'Rex', 'Dog inherits name via call()');
assertEqual(dog.breed, 'German Shepherd', 'Dog has own breed');
assertTypeOf(dog.speak, 'function', 'Dog inherits speak method');
assertEqual(dog.speak(), 'Rex speaks', 'Inherited method works');
assertInstanceOf(dog, Dog, 'Dog is instanceof Dog');
assertInstanceOf(dog, Animal, 'Dog is instanceof Animal');
assertEqual(Dog.prototype.constructor, Dog, 'Constructor property is correct');

// -----------------------------------------------------------------------------
// Section 7: callVsApplyDemo Tests
// -----------------------------------------------------------------------------
printSectionHeader('CALL VS APPLY DEMO');

const demo = callVsApplyDemo(Shape, {}, 'red');

assertTypeOf(demo, 'object', 'callVsApplyDemo returns an object');
assertHasProperty(demo, 'usingCall', 'Demo has usingCall property');
assertHasProperty(demo, 'usingApply', 'Demo has usingApply property');
assertTypeOf(demo.usingCall, 'string', 'usingCall is a string');
assertTypeOf(demo.usingApply, 'string', 'usingApply is a string');

// Check that the strings mention the key differences
assertTrue(
    demo.usingCall.includes('call') || demo.usingCall.includes('Call'),
    'usingCall mentions call'
);
assertTrue(
    demo.usingApply.includes('apply') || demo.usingApply.includes('Apply'),
    'usingApply mentions apply'
);

// -----------------------------------------------------------------------------
// Section 8: Multiple Inheritance Levels
// -----------------------------------------------------------------------------
printSectionHeader('MULTIPLE SHAPES TEST');

const shapes = [
    new Shape('white'),
    new Rectangle('black', 3, 4),
    new Circle('gray', 5)
];

// All can call getColor
assertTrue(
    shapes.every(s => typeof s.getColor === 'function'),
    'All shapes have getColor method'
);

// All have describe
assertTrue(
    shapes.every(s => typeof s.describe === 'function'),
    'All shapes have describe method'
);

// Only Rectangle and Circle have getArea
assertTrue(
    typeof shapes[1].getArea === 'function' && typeof shapes[2].getArea === 'function',
    'Rectangle and Circle have getArea method'
);

assertEqual(shapes[0].getArea, undefined, 'Shape does not have getArea');

// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
