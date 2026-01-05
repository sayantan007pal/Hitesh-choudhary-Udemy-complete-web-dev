/**
 * Test Suite for Polymorphism Challenge #2
 * =========================================
 * 
 * Run this file with: node _2_test_polymorphism_example.js
 * 
 * Tests your Shape hierarchy implementation for:
 *   - Method overriding
 *   - Polymorphic behavior
 *   - Duck typing
 *   - Inheritance chain
 */

const { Shape, Circle, Rectangle, Triangle, calculateTotalArea } = require('./_2_polymorphism_example.js');

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

function assertCloseTo(actual, expected, tolerance, testName) {
    totalTests++;
    if (Math.abs(actual - expected) <= tolerance) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expected} (±${tolerance})`);
        console.log(`   Actual:   ${actual}`);
        testsFailed++;
        return false;
    }
}

function assertInstanceOf(obj, className, testName) {
    totalTests++;
    if (obj instanceof className) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected instance of: ${className.name}`);
        testsFailed++;
        return false;
    }
}

function assertTrue(value, testName) {
    totalTests++;
    if (value === true) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: true`);
        console.log(`   Actual:   ${value}`);
        testsFailed++;
        return false;
    }
}

function assertFalse(value, testName) {
    totalTests++;
    if (value === false) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: false`);
        console.log(`   Actual:   ${value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Sections
// =============================================================================

console.log('\n' + '═'.repeat(70));
console.log('  POLYMORPHISM CHALLENGE #2 - TEST SUITE');
console.log('═'.repeat(70) + '\n');

// -----------------------------------------------------------------------------
// Test Section 1: Base Shape Class
// -----------------------------------------------------------------------------
console.log('📐 Section 1: Base Shape Class');
console.log('─'.repeat(50));

const baseShape = new Shape('BaseShape');
assertEqual(baseShape.name, 'BaseShape', 'Shape should store name');
assertEqual(baseShape.area(), 0, 'Base shape area should return 0');
assertEqual(baseShape.perimeter(), 0, 'Base shape perimeter should return 0');
assertEqual(baseShape.describe(), 'BaseShape: Area = 0.00, Perimeter = 0.00', 'describe() should format correctly');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 2: Circle Class
// -----------------------------------------------------------------------------
console.log('⭕ Section 2: Circle Class');
console.log('─'.repeat(50));

const circle = new Circle(5);
assertInstanceOf(circle, Shape, 'Circle should be instance of Shape');
assertInstanceOf(circle, Circle, 'Circle should be instance of Circle');
assertEqual(circle.name, 'Circle', 'Circle name should be "Circle"');
assertEqual(circle.radius, 5, 'Circle should store radius');

assertCloseTo(circle.area(), Math.PI * 25, 0.01, 'Circle area should be πr² (≈78.54)');
assertCloseTo(circle.perimeter(), 2 * Math.PI * 5, 0.01, 'Circle perimeter should be 2πr (≈31.42)');
assertEqual(circle.getDiameter(), 10, 'Circle diameter should be 2r');

const unitCircle = new Circle(1);
assertCloseTo(unitCircle.area(), Math.PI, 0.01, 'Unit circle area should be π');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 3: Rectangle Class
// -----------------------------------------------------------------------------
console.log('🔲 Section 3: Rectangle Class');
console.log('─'.repeat(50));

const rectangle = new Rectangle(4, 6);
assertInstanceOf(rectangle, Shape, 'Rectangle should be instance of Shape');
assertInstanceOf(rectangle, Rectangle, 'Rectangle should be instance of Rectangle');
assertEqual(rectangle.name, 'Rectangle', 'Rectangle name should be "Rectangle"');
assertEqual(rectangle.width, 4, 'Rectangle should store width');
assertEqual(rectangle.height, 6, 'Rectangle should store height');

assertEqual(rectangle.area(), 24, 'Rectangle area should be width × height');
assertEqual(rectangle.perimeter(), 20, 'Rectangle perimeter should be 2(w+h)');
assertFalse(rectangle.isSquare(), 'Rectangle 4×6 should not be a square');

const square = new Rectangle(5, 5);
assertTrue(square.isSquare(), 'Rectangle 5×5 should be a square');
assertEqual(square.area(), 25, 'Square 5×5 area should be 25');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 4: Triangle Class
// -----------------------------------------------------------------------------
console.log('🔺 Section 4: Triangle Class');
console.log('─'.repeat(50));

const triangle = new Triangle(6, 4, 5, 5, 6);
assertInstanceOf(triangle, Shape, 'Triangle should be instance of Shape');
assertInstanceOf(triangle, Triangle, 'Triangle should be instance of Triangle');
assertEqual(triangle.name, 'Triangle', 'Triangle name should be "Triangle"');

assertEqual(triangle.area(), 12, 'Triangle area should be (base × height) / 2');
assertEqual(triangle.perimeter(), 16, 'Triangle perimeter should be sum of sides');
assertFalse(triangle.isEquilateral(), 'Isosceles triangle should not be equilateral');

const equilateral = new Triangle(5, 4.33, 5, 5, 5);
assertTrue(equilateral.isEquilateral(), 'Equilateral triangle should return true');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 5: Polymorphism - describe() Method
// -----------------------------------------------------------------------------
console.log('🎭 Section 5: Polymorphism - describe() Method');
console.log('─'.repeat(50));

// The describe() method in the base class calls this.area() and this.perimeter()
// These calls should resolve to the overridden methods in each subclass

const circle2 = new Circle(10);
assertTrue(
    circle2.describe().includes('Circle'),
    'Circle describe() should include "Circle"'
);
assertTrue(
    circle2.describe().includes('314.16'),
    'Circle describe() should include correct area'
);

const rect2 = new Rectangle(3, 7);
assertTrue(
    rect2.describe().includes('Rectangle'),
    'Rectangle describe() should include "Rectangle"'
);
assertTrue(
    rect2.describe().includes('21.00'),
    'Rectangle describe() should include correct area'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 6: Polymorphism - calculateTotalArea Function
// -----------------------------------------------------------------------------
console.log('📊 Section 6: Polymorphism - calculateTotalArea Function');
console.log('─'.repeat(50));

const shapes = [
    new Circle(2),          // Area ≈ 12.57
    new Rectangle(3, 4),    // Area = 12
    new Triangle(6, 4, 5, 5, 6)  // Area = 12
];

// Total should be approximately 36.57
const totalArea = calculateTotalArea(shapes);
assertCloseTo(totalArea, 36.57, 0.1, 'Total area should be sum of all shape areas');

const emptyTotal = calculateTotalArea([]);
assertEqual(emptyTotal, 0, 'Empty array should return 0');

const singleShape = calculateTotalArea([new Rectangle(10, 10)]);
assertEqual(singleShape, 100, 'Single shape array should return that shape\'s area');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 7: Duck Typing
// -----------------------------------------------------------------------------
console.log('🦆 Section 7: Duck Typing');
console.log('─'.repeat(50));

// Any object with an area() method can be used with calculateTotalArea
const duckTypedShape = {
    area: () => 50
};

const mixedShapes = [
    new Circle(1),      // Area ≈ 3.14
    duckTypedShape      // Area = 50
];

assertCloseTo(
    calculateTotalArea(mixedShapes),
    53.14,
    0.1,
    'Duck typed object should work with calculateTotalArea'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 8: Inheritance Chain
// -----------------------------------------------------------------------------
console.log('🔗 Section 8: Inheritance Chain');
console.log('─'.repeat(50));

const testCircle = new Circle(1);
assertTrue(testCircle instanceof Circle, 'Circle instance of Circle');
assertTrue(testCircle instanceof Shape, 'Circle instance of Shape');
assertTrue(testCircle instanceof Object, 'Circle instance of Object');

const testRect = new Rectangle(1, 1);
assertTrue(testRect instanceof Rectangle, 'Rectangle instance of Rectangle');
assertTrue(testRect instanceof Shape, 'Rectangle instance of Shape');

assertFalse(testCircle instanceof Rectangle, 'Circle is NOT instance of Rectangle');
assertFalse(testRect instanceof Circle, 'Rectangle is NOT instance of Circle');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 9: Edge Cases
// -----------------------------------------------------------------------------
console.log('🔍 Section 9: Edge Cases');
console.log('─'.repeat(50));

// Very small values
const tinyCircle = new Circle(0.001);
assertCloseTo(tinyCircle.area(), Math.PI * 0.000001, 0.0000001, 'Should handle tiny radius');

// Very large values
const hugeRect = new Rectangle(1000000, 1000000);
assertEqual(hugeRect.area(), 1000000000000, 'Should handle large dimensions');

// Zero dimensions
const zeroRect = new Rectangle(0, 100);
assertEqual(zeroRect.area(), 0, 'Zero width should give zero area');
assertEqual(zeroRect.perimeter(), 200, 'Zero width rectangle perimeter');

console.log('');

// =============================================================================
// Test Results Summary
// =============================================================================

console.log('═'.repeat(70));
console.log('  TEST RESULTS SUMMARY');
console.log('═'.repeat(70));
console.log(`  Total Tests: ${totalTests}`);
console.log(`  ✅ Passed:   ${testsPassed}`);
console.log(`  ❌ Failed:   ${testsFailed}`);
console.log('═'.repeat(70));

if (testsFailed === 0) {
    console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉');
    console.log('You have successfully demonstrated POLYMORPHISM in JavaScript!');
    console.log('\n📖 Key Takeaways:');
    console.log('   • Method overriding allows different behaviors for same method name');
    console.log('   • The correct method is called based on the actual object type');
    console.log('   • Duck typing enables flexible polymorphism without strict inheritance');
    console.log('   • One interface (area()) works for multiple implementations\n');
} else {
    console.log('\n⚠️  Some tests failed. Review the errors above and try again!');
    console.log('💡 Tip: Make sure all methods are properly overridden in subclasses.\n');
}

process.exit(testsFailed > 0 ? 1 : 0);
