/**
 * Test Suite for Static Methods and Properties
 * =============================================
 * 
 * Run this file with: node _5_test_static_methods_properties_example.js
 */

const {
    MathUtils,
    User,
    Car,
    DatabaseConnection
} = require('./_5_static_methods_properties_example.js');

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

function assertThrows(fn, expectedMessage, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected function to throw an error`);
        testsFailed++;
        return false;
    } catch (e) {
        if (expectedMessage && !e.message.includes(expectedMessage)) {
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Expected message to include: "${expectedMessage}"`);
            console.log(`   Actual message:   "${e.message}"`);
            testsFailed++;
            return false;
        }
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    }
}

function assertNull(value, testName) {
    totalTests++;
    if (value === null) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: null`);
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
    console.log('🧪 Running Static Methods & Properties Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: MathUtils
    // =========================================================================
    console.log('\n📋 TASK 1: MathUtils Utility Class');
    console.log('-'.repeat(40));

    // Test 1.1: Basic arithmetic
    assertEqual(MathUtils.add(5, 3), 8, 'MathUtils.add(5, 3) = 8');
    assertEqual(MathUtils.add(-5, 3), -2, 'MathUtils.add(-5, 3) = -2');
    assertEqual(MathUtils.subtract(10, 4), 6, 'MathUtils.subtract(10, 4) = 6');
    assertEqual(MathUtils.multiply(6, 7), 42, 'MathUtils.multiply(6, 7) = 42');
    assertEqual(MathUtils.divide(20, 4), 5, 'MathUtils.divide(20, 4) = 5');

    // Test 1.2: Division by zero
    assertThrows(
        () => MathUtils.divide(10, 0),
        "Cannot divide by zero",
        'MathUtils.divide(10, 0) throws error'
    );

    // Test 1.3: Power
    assertEqual(MathUtils.power(2, 3), 8, 'MathUtils.power(2, 3) = 8');
    assertEqual(MathUtils.power(5, 0), 1, 'MathUtils.power(5, 0) = 1');
    assertEqual(MathUtils.power(10, 1), 10, 'MathUtils.power(10, 1) = 10');

    // Test 1.4: Factorial
    assertEqual(MathUtils.factorial(0), 1, 'MathUtils.factorial(0) = 1');
    assertEqual(MathUtils.factorial(1), 1, 'MathUtils.factorial(1) = 1');
    assertEqual(MathUtils.factorial(5), 120, 'MathUtils.factorial(5) = 120');
    assertEqual(MathUtils.factorial(6), 720, 'MathUtils.factorial(6) = 720');

    // Test 1.5: Negative factorial throws
    assertThrows(
        () => MathUtils.factorial(-1),
        "Cannot factorial negative",
        'MathUtils.factorial(-1) throws error'
    );

    // Test 1.6: isPrime
    assertTrue(MathUtils.isPrime(2), 'MathUtils.isPrime(2) = true');
    assertTrue(MathUtils.isPrime(3), 'MathUtils.isPrime(3) = true');
    assertTrue(MathUtils.isPrime(7), 'MathUtils.isPrime(7) = true');
    assertTrue(MathUtils.isPrime(11), 'MathUtils.isPrime(11) = true');
    assertFalse(MathUtils.isPrime(1), 'MathUtils.isPrime(1) = false');
    assertFalse(MathUtils.isPrime(4), 'MathUtils.isPrime(4) = false');
    assertFalse(MathUtils.isPrime(9), 'MathUtils.isPrime(9) = false');
    assertFalse(MathUtils.isPrime(0), 'MathUtils.isPrime(0) = false');

    // Test 1.7: Fibonacci
    assertEqual(MathUtils.fibonacci(0), 0, 'MathUtils.fibonacci(0) = 0');
    assertEqual(MathUtils.fibonacci(1), 1, 'MathUtils.fibonacci(1) = 1');
    assertEqual(MathUtils.fibonacci(2), 1, 'MathUtils.fibonacci(2) = 1');
    assertEqual(MathUtils.fibonacci(6), 8, 'MathUtils.fibonacci(6) = 8');
    assertEqual(MathUtils.fibonacci(10), 55, 'MathUtils.fibonacci(10) = 55');

    // =========================================================================
    // Task 2 Tests: User with Instance Tracking
    // =========================================================================
    console.log('\n📋 TASK 2: User Instance Tracking');
    console.log('-'.repeat(40));

    // Reset state for testing
    User.totalUsers = 0;
    User.activeUsers = [];

    // Test 2.1: Initial state
    assertEqual(User.getTotalCount(), 0, 'Initially getTotalCount() = 0');
    assertEqual(User.getActiveCount(), 0, 'Initially getActiveCount() = 0');

    // Test 2.2: Create users
    const user1 = new User("john", "john@test.com");
    assertEqual(User.getTotalCount(), 1, 'After 1 user: getTotalCount() = 1');
    assertEqual(User.getActiveCount(), 1, 'After 1 user: getActiveCount() = 1');

    const user2 = new User("jane", "jane@test.com");
    assertEqual(User.getTotalCount(), 2, 'After 2 users: getTotalCount() = 2');
    assertEqual(User.getActiveCount(), 2, 'After 2 users: getActiveCount() = 2');

    // Test 2.3: User properties
    assertEqual(user1.username, "john", 'user1.username is correct');
    assertEqual(user1.email, "john@test.com", 'user1.email is correct');
    assertTrue(user1.isActive, 'user1.isActive is true initially');
    assertTrue(user1.createdAt instanceof Date, 'user1.createdAt is a Date');

    // Test 2.4: getInfo
    assertEqual(
        user1.getInfo(),
        "Username: john, Email: john@test.com, Active: yes",
        'user1.getInfo() returns correct string'
    );

    // Test 2.5: Deactivate user
    user1.deactivate();
    assertFalse(user1.isActive, 'After deactivate: user1.isActive is false');
    assertEqual(User.getActiveCount(), 1, 'After deactivate: getActiveCount() = 1');
    assertEqual(User.getTotalCount(), 2, 'After deactivate: getTotalCount still 2');

    // Test 2.6: getInfo after deactivate
    assertEqual(
        user1.getInfo(),
        "Username: john, Email: john@test.com, Active: no",
        'user1.getInfo() shows Active: no after deactivate'
    );

    // Test 2.7: findByUsername
    assertEqual(User.findByUsername("jane"), user2, 'findByUsername("jane") returns user2');
    assertNull(User.findByUsername("bob"), 'findByUsername("bob") returns null');

    // Test 2.8: Activate user
    user1.activate();
    assertTrue(user1.isActive, 'After activate: user1.isActive is true');
    assertEqual(User.getActiveCount(), 2, 'After activate: getActiveCount() = 2');

    // Test 2.9: getAllActiveUsers returns copy
    const activeList = User.getAllActiveUsers();
    assertTrue(Array.isArray(activeList), 'getAllActiveUsers() returns array');
    assertEqual(activeList.length, 2, 'getAllActiveUsers() has 2 users');

    // Test 2.10: deactivateAll
    User.deactivateAll();
    assertEqual(User.getActiveCount(), 0, 'After deactivateAll: getActiveCount() = 0');
    assertFalse(user1.isActive, 'After deactivateAll: user1.isActive is false');
    assertFalse(user2.isActive, 'After deactivateAll: user2.isActive is false');

    // =========================================================================
    // Task 3 Tests: Car Factory Pattern
    // =========================================================================
    console.log('\n📋 TASK 3: Car Factory Pattern');
    console.log('-'.repeat(40));

    // Test 3.1: Basic constructor
    const car1 = new Car("Honda", "Civic", 2020, "Gasoline");
    assertEqual(car1.make, "Honda", 'Car.make is correct');
    assertEqual(car1.model, "Civic", 'Car.model is correct');
    assertEqual(car1.year, 2020, 'Car.year is correct');
    assertEqual(car1.fuelType, "Gasoline", 'Car.fuelType is correct');

    // Test 3.2: getDescription
    assertEqual(
        car1.getDescription(),
        "2020 Honda Civic (Gasoline)",
        'Car.getDescription() works'
    );

    // Test 3.3: getAge (using 2026 as current year from context)
    assertEqual(car1.getAge(), new Date().getFullYear() - 2020, 'Car.getAge() calculates correctly');

    // Test 3.4: Factory - createElectric
    const tesla = Car.createElectric("Tesla", "Model 3", 2023);
    assertEqual(tesla.fuelType, "Electric", 'createElectric sets fuelType to "Electric"');
    assertEqual(
        tesla.getDescription(),
        "2023 Tesla Model 3 (Electric)",
        'Electric car description is correct'
    );

    // Test 3.5: Factory - createHybrid
    const prius = Car.createHybrid("Toyota", "Prius", 2022);
    assertEqual(prius.fuelType, "Hybrid", 'createHybrid sets fuelType to "Hybrid"');

    // Test 3.6: Factory - createGasoline
    const mustang = Car.createGasoline("Ford", "Mustang", 2024);
    assertEqual(mustang.fuelType, "Gasoline", 'createGasoline sets fuelType to "Gasoline"');

    // Test 3.7: Factory - createFromObject
    const fromObj = Car.createFromObject({
        make: "BMW",
        model: "X5",
        year: 2023,
        fuelType: "Hybrid"
    });
    assertEqual(fromObj.make, "BMW", 'createFromObject: make is correct');
    assertEqual(fromObj.fuelType, "Hybrid", 'createFromObject: fuelType is correct');

    // Test 3.8: Factory - createFromString
    const fromStr = Car.createFromString("Audi|A4|2021|Gasoline");
    assertEqual(fromStr.make, "Audi", 'createFromString: make is correct');
    assertEqual(fromStr.model, "A4", 'createFromString: model is correct');
    assertEqual(fromStr.year, 2021, 'createFromString: year is correct');
    assertEqual(fromStr.fuelType, "Gasoline", 'createFromString: fuelType is correct');

    // =========================================================================
    // Task 4 Tests: Singleton Pattern
    // =========================================================================
    console.log('\n📋 TASK 4: DatabaseConnection Singleton');
    console.log('-'.repeat(40));

    // Reset singleton for testing
    if (DatabaseConnection.resetInstance) {
        DatabaseConnection.resetInstance();
    }

    // Test 4.1: Direct construction throws
    assertThrows(
        () => new DatabaseConnection("localhost", 5432),
        "getInstance",
        'new DatabaseConnection() throws error'
    );

    // Test 4.2: getInstance creates instance
    assertFalse(DatabaseConnection.hasInstance(), 'Initially hasInstance() = false');
    const db1 = DatabaseConnection.getInstance("localhost", 5432);
    assertTrue(DatabaseConnection.hasInstance(), 'After getInstance: hasInstance() = true');

    // Test 4.3: Singleton returns same instance
    const db2 = DatabaseConnection.getInstance();
    assertTrue(db1 === db2, 'getInstance() returns same instance (singleton)');

    // Test 4.4: Properties are set
    assertEqual(db1.host, "localhost", 'Singleton host is correct');
    assertEqual(db1.port, 5432, 'Singleton port is correct');
    assertFalse(db1.isConnected, 'Initially isConnected = false');

    // Test 4.5: connect
    assertEqual(
        db1.connect(),
        "Connected to localhost:5432",
        'connect() returns correct message'
    );
    assertTrue(db1.isConnected, 'After connect: isConnected = true');

    // Test 4.6: query when connected
    assertEqual(
        db1.query("SELECT * FROM users"),
        "Executing: SELECT * FROM users",
        'query() works when connected'
    );

    // Test 4.7: disconnect
    assertEqual(db1.disconnect(), "Disconnected", 'disconnect() works');
    assertFalse(db1.isConnected, 'After disconnect: isConnected = false');

    // Test 4.8: query when not connected throws
    assertThrows(
        () => db1.query("SELECT 1"),
        "Not connected",
        'query() throws when not connected'
    );

    // Test 4.9: resetInstance
    DatabaseConnection.resetInstance();
    assertFalse(DatabaseConnection.hasInstance(), 'After reset: hasInstance() = false');

    // Test 4.10: New instance after reset
    const db3 = DatabaseConnection.getInstance("newhost", 3306);
    assertEqual(db3.host, "newhost", 'After reset: new host is set');
    assertEqual(db3.port, 3306, 'After reset: new port is set');
    assertTrue(db1 !== db3, 'After reset: different instance');

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test E1: MathUtils edge cases
    assertEqual(MathUtils.fibonacci(1), 1, 'fibonacci(1) = 1');
    assertEqual(MathUtils.power(0, 5), 0, 'power(0, 5) = 0');
    assertTrue(MathUtils.isPrime(2), 'isPrime(2) = true (smallest prime)');

    // Test E2: Large numbers
    assertTrue(MathUtils.isPrime(97), 'isPrime(97) = true');
    assertFalse(MathUtils.isPrime(100), 'isPrime(100) = false');

    // Test E3: Double activate does not duplicate
    User.totalUsers = 0;
    User.activeUsers = [];
    const testUser = new User("test", "test@test.com");
    testUser.activate();  // Already active
    assertEqual(User.getActiveCount(), 1, 'Double activate does not duplicate');

    // Test E4: Double deactivate is safe
    testUser.deactivate();
    testUser.deactivate();  // Already deactivated
    assertEqual(User.getActiveCount(), 0, 'Double deactivate is safe');

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
        console.log('You have mastered Static Methods and Properties!\n');
    } else {
        console.log('\n💪 Keep going! Review the failed tests and try again.\n');
    }
}

// Run the tests
runTests();
