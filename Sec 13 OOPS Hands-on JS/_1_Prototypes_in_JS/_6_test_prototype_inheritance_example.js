/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║        TEST SUITE: Prototype-Based Inheritance Patterns Challenge            ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Run this file with: node _6_test_prototype_inheritance_example.js
 */

const {
    Shape,
    Rectangle,
    Square,
    inheritPrototype,
    createMixin
} = require('./_6_prototype_inheritance_example.js');

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

console.log('\n🧪 Running Prototype-Based Inheritance Tests...\n');

// -----------------------------------------------------------------------------
// Section 1: Shape Tests
// -----------------------------------------------------------------------------
printSectionHeader('SHAPE TESTS');

// Test 1.1: Shape constructor
const shape1 = new Shape('Circle');
assertEqual(shape1.name, 'Circle', 'Shape stores name property');

// Test 1.2: Shape describe method
assertEqual(shape1.describe(), 'A shape called Circle', 'describe() returns correct string');

// Test 1.3: Shape prototype has describe
assertTypeOf(Shape.prototype.describe, 'function', 'describe is on Shape.prototype');

// Test 1.4: Shape instance checks
assertTrue(shape1 instanceof Shape, 'shape1 is instanceof Shape');
assertTrue(shape1 instanceof Object, 'shape1 is instanceof Object');


// -----------------------------------------------------------------------------
// Section 2: Rectangle Tests
// -----------------------------------------------------------------------------
printSectionHeader('RECTANGLE TESTS');

// Test 2.1: Rectangle constructor
const rect1 = new Rectangle(5, 10);
assertEqual(rect1.width, 5, 'Rectangle stores width');
assertEqual(rect1.height, 10, 'Rectangle stores height');
assertEqual(rect1.name, 'Rectangle', 'Rectangle has name from Shape');

// Test 2.2: Rectangle area
assertEqual(rect1.area(), 50, 'area() returns width * height');

// Test 2.3: Rectangle perimeter
assertEqual(rect1.perimeter(), 30, 'perimeter() returns 2 * (width + height)');

// Test 2.4: Rectangle inherits describe from Shape
assertEqual(rect1.describe(), 'A shape called Rectangle', 'Rectangle inherits describe()');

// Test 2.5: Rectangle instanceof checks
assertTrue(rect1 instanceof Rectangle, 'rect1 is instanceof Rectangle');
assertTrue(rect1 instanceof Shape, 'rect1 is instanceof Shape (inheritance)');
assertTrue(rect1 instanceof Object, 'rect1 is instanceof Object');

// Test 2.6: Rectangle constructor property
assertEqual(Rectangle.prototype.constructor, Rectangle, 'Rectangle.prototype.constructor is Rectangle');

// Test 2.7: Different rectangles
const rect2 = new Rectangle(3, 7);
assertEqual(rect2.area(), 21, 'Different rectangle has different area');


// -----------------------------------------------------------------------------
// Section 3: Square Tests
// -----------------------------------------------------------------------------
printSectionHeader('SQUARE TESTS');

// Test 3.1: Square constructor
const sq1 = new Square(5);
assertEqual(sq1.width, 5, 'Square has width equal to side');
assertEqual(sq1.height, 5, 'Square has height equal to side');

// Test 3.2: Square area (inherited from Rectangle)
assertEqual(sq1.area(), 25, 'Square area() works (inherited)');

// Test 3.3: Square perimeter (inherited from Rectangle)
assertEqual(sq1.perimeter(), 20, 'Square perimeter() works (inherited)');

// Test 3.4: Square diagonal
assertApproxEqual(sq1.diagonal(), 5 * Math.sqrt(2), 0.0001, 'diagonal() returns side * sqrt(2)');

// Test 3.5: Square describe (inherited through chain)
assertEqual(sq1.describe(), 'A shape called Rectangle', 'Square inherits describe through chain');

// Test 3.6: Square instanceof checks (full chain)
assertTrue(sq1 instanceof Square, 'sq1 is instanceof Square');
assertTrue(sq1 instanceof Rectangle, 'sq1 is instanceof Rectangle (parent)');
assertTrue(sq1 instanceof Shape, 'sq1 is instanceof Shape (grandparent)');
assertTrue(sq1 instanceof Object, 'sq1 is instanceof Object');

// Test 3.7: Square constructor property
assertEqual(Square.prototype.constructor, Square, 'Square.prototype.constructor is Square');


// -----------------------------------------------------------------------------
// Section 4: inheritPrototype Tests
// -----------------------------------------------------------------------------
printSectionHeader('INHERIT PROTOTYPE FUNCTION TESTS');

// Test 4.1: Setup test constructors
function Parent(value) {
    this.parentValue = value;
}
Parent.prototype.getParentValue = function() {
    return this.parentValue;
};

function Child(value, extra) {
    Parent.call(this, value);
    this.childExtra = extra;
}

// Test 4.2: Apply inheritPrototype
inheritPrototype(Child, Parent);

// Test 4.3: Add child method after inheritance setup
Child.prototype.getChildExtra = function() {
    return this.childExtra;
};

// Test 4.4: Create instance and test
const childInstance = new Child('parentVal', 'childVal');
assertEqual(childInstance.parentValue, 'parentVal', 'Child has parent property');
assertEqual(childInstance.childExtra, 'childVal', 'Child has own property');

// Test 4.5: Inherited method works
assertEqual(childInstance.getParentValue(), 'parentVal', 'Child can use inherited method');

// Test 4.6: Own method works
assertEqual(childInstance.getChildExtra(), 'childVal', 'Child own method works');

// Test 4.7: Prototype chain is correct
assertTrue(childInstance instanceof Child, 'instance is instanceof Child');
assertTrue(childInstance instanceof Parent, 'instance is instanceof Parent');

// Test 4.8: Constructor property is correct
assertEqual(Child.prototype.constructor, Child, 'Child.prototype.constructor is Child');


// -----------------------------------------------------------------------------
// Section 5: createMixin Tests
// -----------------------------------------------------------------------------
printSectionHeader('CREATE MIXIN TESTS');

// Test 5.1: Setup base class
function Vehicle(type) {
    this.type = type;
}
Vehicle.prototype.getType = function() {
    return this.type;
};

// Test 5.2: Define mixins
const flyable = {
    fly: function() { return `${this.type} is flying!`; },
    land: function() { return `${this.type} landed.`; }
};

const swimmable = {
    swim: function() { return `${this.type} is swimming!`; },
    dive: function() { return `${this.type} dived.`; }
};

// Test 5.3: Apply mixins
const result = createMixin(Vehicle, flyable, swimmable);
assertEqual(result, Vehicle, 'createMixin returns target');

// Test 5.4: Mixin methods are on prototype
assertTypeOf(Vehicle.prototype.fly, 'function', 'fly is on Vehicle.prototype');
assertTypeOf(Vehicle.prototype.swim, 'function', 'swim is on Vehicle.prototype');

// Test 5.5: Instance can use mixin methods
const plane = new Vehicle('Airplane');
assertEqual(plane.fly(), 'Airplane is flying!', 'Instance can use fly()');
assertEqual(plane.swim(), 'Airplane is swimming!', 'Instance can use swim()');

// Test 5.6: Original methods still work
assertEqual(plane.getType(), 'Airplane', 'Original method still works');


// -----------------------------------------------------------------------------
// Section 6: Edge Cases and Advanced Tests
// -----------------------------------------------------------------------------
printSectionHeader('EDGE CASES AND ADVANCED TESTS');

// Test 6.1: Prototype chain length
let proto = Object.getPrototypeOf(sq1);
let chainLength = 0;
while (proto !== null) {
    chainLength++;
    proto = Object.getPrototypeOf(proto);
}
assertEqual(chainLength, 4, 'Square has 4-level chain: Square.proto → Rectangle.proto → Shape.proto → Object.proto');

// Test 6.2: Methods are on prototype, not instance
assertFalse(rect1.hasOwnProperty('area'), 'area is not own property');
assertFalse(rect1.hasOwnProperty('describe'), 'describe is not own property');

// Test 6.3: Instance properties are own properties
assertTrue(rect1.hasOwnProperty('width'), 'width is own property');
assertTrue(rect1.hasOwnProperty('height'), 'height is own property');
assertTrue(rect1.hasOwnProperty('name'), 'name is own property');

// Test 6.4: Square can override inherited method
Square.prototype.describe = function() {
    return `A square with side ${this.width}`;
};
assertEqual(sq1.describe(), 'A square with side 5', 'Square can override inherited method');

// Rectangle instances still use original
assertEqual(rect1.describe(), 'A shape called Rectangle', 'Rectangle unaffected by Square override');


// =============================================================================
// FINAL RESULTS
// =============================================================================
printFinalResults();
