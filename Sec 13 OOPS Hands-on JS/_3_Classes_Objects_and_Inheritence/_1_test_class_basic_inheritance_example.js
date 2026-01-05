/**
 * Test Suite for Classes, Objects, and Basic Inheritance
 * =======================================================
 * 
 * Run this file with: node _1_test_class_basic_inheritance_example.js
 * 
 * This test file tests your implementations of:
 *   - Vehicle class
 *   - Car class (extends Vehicle)
 *   - Motorcycle class (extends Vehicle)
 *   - Static methods
 */

const {
    Vehicle,
    Car,
    Motorcycle
} = require('./_1_class_basic_inheritance_example.js');

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
        console.log(`   Expected: "${expected}"`);
        console.log(`   Actual:   "${actual}"`);
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
        console.log(`   Expected function to throw an error`);
        testsFailed++;
        return false;
    } catch (e) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    }
}

function assertType(value, expectedType, testName) {
    totalTests++;
    const actualType = typeof value;
    if (actualType === expectedType) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: "${expectedType}"`);
        console.log(`   Actual type:   "${actualType}"`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Classes, Objects & Inheritance Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: Vehicle and Car Classes
    // =========================================================================
    console.log('\n📋 TASK 1: Vehicle and Car Classes');
    console.log('-'.repeat(40));

    // Test 1.1: Vehicle class exists and is a function (class)
    assertType(Vehicle, 'function', 'Vehicle is a class/constructor function');

    // Test 1.2: Car class exists and is a function (class)
    assertType(Car, 'function', 'Car is a class/constructor function');

    // Test 1.3: Create Vehicle instance
    const vehicle1 = new Vehicle("Generic", "Model");
    assertTrue(vehicle1 instanceof Vehicle, 'vehicle1 is instanceof Vehicle');

    // Test 1.4: Vehicle getDetails()
    assertEqual(
        vehicle1.getDetails(),
        "Make: Generic, Model: Model",
        'Vehicle.getDetails() returns correct string'
    );

    // Test 1.5: Create Car instance
    const car1 = new Car("Toyota", "Camry", 4);
    assertTrue(car1 instanceof Car, 'car1 is instanceof Car');

    // Test 1.6: Car is also instance of Vehicle (inheritance)
    assertTrue(car1 instanceof Vehicle, 'car1 is also instanceof Vehicle (inheritance works)');

    // Test 1.7: Car inherits getDetails() from Vehicle
    assertEqual(
        car1.getDetails(),
        "Make: Toyota, Model: Camry",
        'Car inherits getDetails() from Vehicle'
    );

    // Test 1.8: Car has startEngine()
    assertEqual(
        car1.startEngine(),
        "Engine started",
        'Car.startEngine() returns "Engine started"'
    );

    // Test 1.9: Car has getCarDetails()
    assertEqual(
        car1.getCarDetails(),
        "Make: Toyota, Model: Camry, Doors: 4",
        'Car.getCarDetails() returns correct string with doors'
    );

    // Test 1.10: Car properties are set correctly
    assertEqual(car1.make, "Toyota", 'Car.make is set correctly');
    assertEqual(car1.model, "Camry", 'Car.model is set correctly');
    assertEqual(car1.numDoors, 4, 'Car.numDoors is set correctly');

    // Test 1.11: Multiple instances are independent
    const car2 = new Car("Honda", "Civic", 2);
    assertEqual(car1.make, "Toyota", 'car1.make unchanged after creating car2');
    assertEqual(car2.make, "Honda", 'car2.make is different from car1');

    // =========================================================================
    // Task 2 Tests: Method Overriding (Polymorphism)
    // =========================================================================
    console.log('\n📋 TASK 2: Method Overriding (Polymorphism)');
    console.log('-'.repeat(40));

    // Test 2.1: Vehicle has move() method
    assertType(vehicle1.move, 'function', 'Vehicle has move() method');

    // Test 2.2: Vehicle.move() returns correct string
    assertEqual(
        vehicle1.move(),
        "The vehicle is moving",
        'Vehicle.move() returns "The vehicle is moving"'
    );

    // Test 2.3: Car overrides move()
    assertEqual(
        car1.move(),
        "The car is driving on the road",
        'Car.move() is overridden correctly'
    );

    // Test 2.4: Motorcycle class exists
    assertType(Motorcycle, 'function', 'Motorcycle is a class/constructor function');

    // Test 2.5: Create Motorcycle instance
    const bike1 = new Motorcycle("Harley", "Davidson", false);
    assertTrue(bike1 instanceof Motorcycle, 'bike1 is instanceof Motorcycle');

    // Test 2.6: Motorcycle extends Vehicle
    assertTrue(bike1 instanceof Vehicle, 'Motorcycle extends Vehicle');

    // Test 2.7: Motorcycle inherits getDetails()
    assertEqual(
        bike1.getDetails(),
        "Make: Harley, Model: Davidson",
        'Motorcycle inherits getDetails() from Vehicle'
    );

    // Test 2.8: Motorcycle overrides move()
    assertEqual(
        bike1.move(),
        "The motorcycle is speeding on the highway",
        'Motorcycle.move() is overridden correctly'
    );

    // Test 2.9: Motorcycle hasSidecar property (false)
    const bike2 = new Motorcycle("Yamaha", "R1", true);
    assertEqual(bike1.hasSidecar, false, 'Motorcycle hasSidecar is false');
    assertEqual(bike2.hasSidecar, true, 'Motorcycle hasSidecar can be true');

    // Test 2.10: Motorcycle getSidecarStatus()
    if (typeof bike1.getSidecarStatus === 'function') {
        assertEqual(
            bike1.getSidecarStatus(),
            "No sidecar",
            'Motorcycle.getSidecarStatus() returns "No sidecar" when false'
        );
        assertEqual(
            bike2.getSidecarStatus(),
            "Has sidecar",
            'Motorcycle.getSidecarStatus() returns "Has sidecar" when true'
        );
    } else {
        console.log('⚠️ SKIP: getSidecarStatus() not implemented (optional)');
    }

    // Test 2.11: Polymorphism in action - array of vehicles
    const vehicles = [vehicle1, car1, bike1];
    const moveResults = vehicles.map(v => v.move());
    assertEqual(
        moveResults[0],
        "The vehicle is moving",
        'Polymorphism: vehicle.move() works correctly'
    );
    assertEqual(
        moveResults[1],
        "The car is driving on the road",
        'Polymorphism: car.move() works correctly'
    );
    assertEqual(
        moveResults[2],
        "The motorcycle is speeding on the highway",
        'Polymorphism: motorcycle.move() works correctly'
    );

    // =========================================================================
    // Task 3 Tests: Static Methods
    // =========================================================================
    console.log('\n📋 TASK 3: Static Methods');
    console.log('-'.repeat(40));

    // Test 3.1: isVehicle is a static method
    assertType(Vehicle.isVehicle, 'function', 'Vehicle.isVehicle is a static method');

    // Test 3.2: isVehicle returns true for Vehicle
    assertTrue(
        Vehicle.isVehicle(vehicle1),
        'Vehicle.isVehicle(vehicle) returns true'
    );

    // Test 3.3: isVehicle returns true for Car (subclass)
    assertTrue(
        Vehicle.isVehicle(car1),
        'Vehicle.isVehicle(car) returns true'
    );

    // Test 3.4: isVehicle returns true for Motorcycle (subclass)
    assertTrue(
        Vehicle.isVehicle(bike1),
        'Vehicle.isVehicle(motorcycle) returns true'
    );

    // Test 3.5: isVehicle returns false for plain object
    assertFalse(
        Vehicle.isVehicle({ make: "Fake", model: "Object" }),
        'Vehicle.isVehicle(plainObject) returns false'
    );

    // Test 3.6: isVehicle returns false for string
    assertFalse(
        Vehicle.isVehicle("not a vehicle"),
        'Vehicle.isVehicle("string") returns false'
    );

    // Test 3.7: isVehicle returns false for number
    assertFalse(
        Vehicle.isVehicle(123),
        'Vehicle.isVehicle(number) returns false'
    );

    // Test 3.8: isVehicle returns false for null
    assertFalse(
        Vehicle.isVehicle(null),
        'Vehicle.isVehicle(null) returns false'
    );

    // Test 3.9: isVehicle returns false for undefined
    assertFalse(
        Vehicle.isVehicle(undefined),
        'Vehicle.isVehicle(undefined) returns false'
    );

    // Test 3.10: compareByMake is a static method
    assertType(Vehicle.compareByMake, 'function', 'Vehicle.compareByMake is a static method');

    // Test 3.11: compareByMake returns true for same make
    const toyotaCar = new Car("Toyota", "Camry", 4);
    const toyotaCar2 = new Car("Toyota", "Corolla", 4);
    assertTrue(
        Vehicle.compareByMake(toyotaCar, toyotaCar2),
        'compareByMake returns true for same make'
    );

    // Test 3.12: compareByMake returns false for different make
    const hondaBike = new Motorcycle("Honda", "CBR", false);
    assertFalse(
        Vehicle.compareByMake(toyotaCar, hondaBike),
        'compareByMake returns false for different make'
    );

    // Test 3.13: compareByMake works across different vehicle types
    const toyotaBike = new Motorcycle("Toyota", "Electric", false);
    assertTrue(
        Vehicle.compareByMake(toyotaCar, toyotaBike),
        'compareByMake works across Car and Motorcycle with same make'
    );

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test E1: Vehicle with empty strings
    const emptyVehicle = new Vehicle("", "");
    assertEqual(
        emptyVehicle.getDetails(),
        "Make: , Model: ",
        'Vehicle handles empty strings'
    );

    // Test E2: Car with 0 doors
    const zeroDoorCar = new Car("Smart", "ForTwo", 0);
    assertEqual(zeroDoorCar.numDoors, 0, 'Car handles 0 doors');

    // Test E3: Prototype chain is correct
    assertTrue(
        Object.getPrototypeOf(Car.prototype) === Vehicle.prototype,
        'Car.prototype inherits from Vehicle.prototype'
    );

    assertTrue(
        Object.getPrototypeOf(Motorcycle.prototype) === Vehicle.prototype,
        'Motorcycle.prototype inherits from Vehicle.prototype'
    );

    // Test E4: Constructor names
    assertEqual(vehicle1.constructor.name, 'Vehicle', 'vehicle1.constructor.name is "Vehicle"');
    assertEqual(car1.constructor.name, 'Car', 'car1.constructor.name is "Car"');
    assertEqual(bike1.constructor.name, 'Motorcycle', 'bike1.constructor.name is "Motorcycle"');

    // =========================================================================
    // Print Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));

    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉');
        console.log('You have mastered Classes, Objects, and Inheritance!\n');
    } else {
        console.log('\n💪 Keep going! Review the failed tests and try again.\n');
    }
}

// Run the tests
runTests();
