/**
 * Test Suite for Constructor Function Inheritance
 * =================================================
 * 
 * Run: node _3_constructor_inheritance_test_example.js
 */

const { Vehicle, Car, ElectricCar } = require('./_3_constructor_inheritance_example.js');

let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${JSON.stringify(expected)}`);
        console.log(`   Actual:   ${JSON.stringify(actual)}`);
        testsFailed++;
    }
}

function assertTrue(condition, testName) {
    if (condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
    }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Constructor Inheritance Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Vehicle Tests
    // =========================================================================
    console.log('\n📋 VEHICLE TESTS');
    console.log('-'.repeat(40));

    const vehicle = new Vehicle("Generic", 2020);
    
    assertEqual(vehicle.make, "Generic", 'Vehicle stores make');
    assertEqual(vehicle.year, 2020, 'Vehicle stores year');
    assertEqual(vehicle.isRunning, false, 'Vehicle isRunning defaults to false');
    
    assertEqual(vehicle.start(), "Vehicle started", 'start() returns correct message');
    assertEqual(vehicle.isRunning, true, 'start() sets isRunning to true');
    
    assertEqual(vehicle.stop(), "Vehicle stopped", 'stop() returns correct message');
    assertEqual(vehicle.isRunning, false, 'stop() sets isRunning to false');
    
    assertEqual(vehicle.getAge(2025), 5, 'getAge calculates correctly');

    assertTrue(
        Vehicle.prototype.hasOwnProperty('start'),
        'start is on Vehicle.prototype'
    );

    // =========================================================================
    // Car Tests
    // =========================================================================
    console.log('\n📋 CAR TESTS');
    console.log('-'.repeat(40));

    const car = new Car("Toyota", 2022, 4);
    
    assertEqual(car.make, "Toyota", 'Car stores make (inherited setup)');
    assertEqual(car.year, 2022, 'Car stores year (inherited setup)');
    assertEqual(car.numDoors, 4, 'Car stores numDoors');
    assertEqual(car.isRunning, false, 'Car has isRunning from Vehicle');
    
    assertEqual(car.honk(), "Beep beep!", 'Car.honk() works');
    assertEqual(
        car.getInfo(), 
        "Make: Toyota, Year: 2022, Doors: 4", 
        'Car.getInfo() returns correct format'
    );
    
    assertEqual(car.start(), "Vehicle started", 'Car inherits start()');
    assertEqual(car.getAge(2025), 3, 'Car inherits getAge()');

    assertTrue(car instanceof Car, 'car instanceof Car');
    assertTrue(car instanceof Vehicle, 'car instanceof Vehicle (inheritance)');

    assertTrue(
        Car.prototype.hasOwnProperty('honk'),
        'honk is on Car.prototype'
    );
    assertTrue(
        !Car.prototype.hasOwnProperty('start'),
        'start is NOT on Car.prototype (inherited)'
    );

    // =========================================================================
    // ElectricCar Tests
    // =========================================================================
    console.log('\n📋 ELECTRICCAR TESTS');
    console.log('-'.repeat(40));

    const tesla = new ElectricCar("Tesla", 2023, 4, 75);
    
    assertEqual(tesla.make, "Tesla", 'ElectricCar stores make');
    assertEqual(tesla.year, 2023, 'ElectricCar stores year');
    assertEqual(tesla.numDoors, 4, 'ElectricCar stores numDoors');
    assertEqual(tesla.batteryCapacity, 75, 'ElectricCar stores batteryCapacity');
    assertEqual(tesla.batteryLevel, 100, 'ElectricCar batteryLevel defaults to 100');

    assertEqual(tesla.getBatteryStatus(), "Battery: 100%", 'getBatteryStatus works');
    
    assertEqual(tesla.drive(100), 80, 'drive(100) returns 80 (100 - 20)');
    assertEqual(tesla.batteryLevel, 80, 'batteryLevel is now 80');
    
    assertEqual(tesla.drive(500), 0, 'drive(500) returns 0 (cannot go negative)');
    assertEqual(tesla.batteryLevel, 0, 'batteryLevel stays at 0');
    
    assertEqual(tesla.charge(), "Fully charged!", 'charge() returns message');
    assertEqual(tesla.batteryLevel, 100, 'charge() resets to 100');

    // Inheritance chain
    assertEqual(tesla.honk(), "Beep beep!", 'ElectricCar inherits honk() from Car');
    assertEqual(tesla.start(), "Vehicle started", 'ElectricCar inherits start() from Vehicle');

    assertTrue(tesla instanceof ElectricCar, 'tesla instanceof ElectricCar');
    assertTrue(tesla instanceof Car, 'tesla instanceof Car');
    assertTrue(tesla instanceof Vehicle, 'tesla instanceof Vehicle');

    // Edge cases
    const lowBattery = new ElectricCar("Rivian", 2024, 2, 50);
    lowBattery.drive(250);  // 100 - 50 = 50
    assertEqual(lowBattery.batteryLevel, 50, 'Partial drain works correctly');
    lowBattery.drive(300);  // 50 - 60 = should be 0, not negative
    assertEqual(lowBattery.batteryLevel, 0, 'Battery cannot go negative');

    // =========================================================================
    // Prototype Chain Verification
    // =========================================================================
    console.log('\n📋 PROTOTYPE CHAIN VERIFICATION');
    console.log('-'.repeat(40));

    assertTrue(
        Object.getPrototypeOf(Car.prototype) === Vehicle.prototype,
        'Car.prototype inherits from Vehicle.prototype'
    );
    assertTrue(
        Object.getPrototypeOf(ElectricCar.prototype) === Car.prototype,
        'ElectricCar.prototype inherits from Car.prototype'
    );

    // =========================================================================
    // Final Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${testsPassed + testsFailed}`);
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
