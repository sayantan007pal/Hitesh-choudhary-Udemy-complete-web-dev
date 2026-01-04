/**
 * Test Suite for Prototypal Inheritance in JavaScript
 * ====================================================
 * 
 * Run this file with: node _1_test_example.js
 */

const {
    Animal,
    Dog,
    Shape,
    Rectangle
} = require('./_1_example.js');

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

function assertTypeOf(value, expectedType, testName) {
    totalTests++;
    if (typeof value === expectedType) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${expectedType}`);
        console.log(`   Actual type:   ${typeof value}`);
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
        console.log(`   Expected instance of: ${constructor.name}`);
        console.log(`   Actual: not an instance`);
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

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Prototypal Inheritance Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: Animal and Dog
    // =========================================================================
    console.log('\n📋 TASK 1: Animal and Dog Inheritance');
    console.log('-'.repeat(40));

    // Test 1.1: Animal constructor exists
    assertTypeOf(Animal, 'function', 'Animal is a constructor function');

    // Test 1.2: Dog constructor exists
    assertTypeOf(Dog, 'function', 'Dog is a constructor function');

    // Test 1.3: Can create an Animal instance
    const animal = new Animal("Generic Animal");
    assertTypeOf(animal, 'object', 'Can create Animal instance');

    // Test 1.4: Animal has name property
    assertEqual(animal.name, "Generic Animal", 'Animal stores name property');

    // Test 1.5: Animal has makeSound method
    assertTypeOf(animal.makeSound, 'function', 'Animal has makeSound method');

    // Test 1.6: Animal.makeSound returns correct value
    assertEqual(animal.makeSound(), "Some generic sound", 'Animal.makeSound() returns "Some generic sound"');

    // Test 1.7: Can create a Dog instance
    const dog = new Dog("Buddy", "Golden Retriever");
    assertTypeOf(dog, 'object', 'Can create Dog instance');

    // Test 1.8: Dog has name property
    assertEqual(dog.name, "Buddy", 'Dog stores name property');

    // Test 1.9: Dog has breed property
    assertEqual(dog.breed, "Golden Retriever", 'Dog stores breed property');

    // Test 1.10: Dog is instance of Dog
    assertInstanceOf(dog, Dog, 'Dog instance is instanceof Dog');

    // Test 1.11: Dog is instance of Animal (inheritance)
    assertInstanceOf(dog, Animal, 'Dog instance is instanceof Animal (inheritance works)');

    // Test 1.12: Dog has bark method
    assertTypeOf(dog.bark, 'function', 'Dog has bark method');

    // Test 1.13: Dog.bark returns correct value
    assertEqual(dog.bark(), "Woof! Woof!", 'Dog.bark() returns "Woof! Woof!"');

    // Test 1.14: Dog inherits makeSound from Animal
    assertTypeOf(dog.makeSound, 'function', 'Dog inherits makeSound method');

    // Test 1.15: Dog.makeSound works (inherited)
    assertEqual(dog.makeSound(), "Some generic sound", 'Dog.makeSound() works (inherited from Animal)');

    // Test 1.16: makeSound is on Animal.prototype, not Dog
    assertTrue(Animal.prototype.hasOwnProperty('makeSound'), 'makeSound is on Animal.prototype');

    // Test 1.17: bark is on Dog.prototype
    assertTrue(Dog.prototype.hasOwnProperty('bark'), 'bark is on Dog.prototype');

    // =========================================================================
    // Task 2 Tests: Shape and Rectangle
    // =========================================================================
    console.log('\n📋 TASK 2: Shape and Rectangle Inheritance');
    console.log('-'.repeat(40));

    // Test 2.1: Shape constructor exists
    assertTypeOf(Shape, 'function', 'Shape is a constructor function');

    // Test 2.2: Rectangle constructor exists
    assertTypeOf(Rectangle, 'function', 'Rectangle is a constructor function');

    // Test 2.3: Can create a Shape instance
    const shape = new Shape("red");
    assertTypeOf(shape, 'object', 'Can create Shape instance');

    // Test 2.4: Shape has color property
    assertEqual(shape.color, "red", 'Shape stores color property');

    // Test 2.5: Shape has getColor method
    assertTypeOf(shape.getColor, 'function', 'Shape has getColor method');

    // Test 2.6: Shape.getColor returns correct value
    assertEqual(shape.getColor(), "red", 'Shape.getColor() returns the color');

    // Test 2.7: Can create a Rectangle instance
    const rect = new Rectangle("blue", 10, 5);
    assertTypeOf(rect, 'object', 'Can create Rectangle instance');

    // Test 2.8: Rectangle has color property
    assertEqual(rect.color, "blue", 'Rectangle stores color property');

    // Test 2.9: Rectangle has width property
    assertEqual(rect.width, 10, 'Rectangle stores width property');

    // Test 2.10: Rectangle has height property
    assertEqual(rect.height, 5, 'Rectangle stores height property');

    // Test 2.11: Rectangle is instance of Rectangle
    assertInstanceOf(rect, Rectangle, 'Rectangle instance is instanceof Rectangle');

    // Test 2.12: Rectangle is instance of Shape (inheritance)
    assertInstanceOf(rect, Shape, 'Rectangle instance is instanceof Shape (inheritance works)');

    // Test 2.13: Rectangle has getArea method
    assertTypeOf(rect.getArea, 'function', 'Rectangle has getArea method');

    // Test 2.14: Rectangle.getArea calculates correctly
    assertEqual(rect.getArea(), 50, 'Rectangle.getArea() returns width * height (10 * 5 = 50)');

    // Test 2.15: Rectangle inherits getColor from Shape
    assertTypeOf(rect.getColor, 'function', 'Rectangle inherits getColor method');

    // Test 2.16: Rectangle.getColor works (inherited)
    assertEqual(rect.getColor(), "blue", 'Rectangle.getColor() works (inherited from Shape)');

    // Test 2.17: Different rectangles have different areas
    const rect2 = new Rectangle("green", 3, 7);
    assertEqual(rect2.getArea(), 21, 'Different rectangle has correct area (3 * 7 = 21)');

    // Test 2.18: Edge case - zero dimensions
    const zeroRect = new Rectangle("black", 0, 10);
    assertEqual(zeroRect.getArea(), 0, 'Rectangle with zero width has area 0');

    // Test 2.19: getArea is on Rectangle.prototype
    assertTrue(Rectangle.prototype.hasOwnProperty('getArea'), 'getArea is on Rectangle.prototype');

    // Test 2.20: getColor is on Shape.prototype, not Rectangle
    assertTrue(Shape.prototype.hasOwnProperty('getColor'), 'getColor is on Shape.prototype');

    // =========================================================================
    // Final Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));

    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
