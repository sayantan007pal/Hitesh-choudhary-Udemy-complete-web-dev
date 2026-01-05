/**
 * Test Suite for Getters and Setters
 * ===================================
 * 
 * Run this file with: node _7_test_getters_setters_example.js
 */

const {
    Temperature,
    Person,
    ShoppingCart,
    DataLoader,
    ExpensiveComputation
} = require('./_7_getters_setters_example.js');

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

function assertApproxEqual(actual, expected, testName, tolerance = 0.01) {
    totalTests++;
    if (Math.abs(actual - expected) < tolerance) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ~${expected}`);
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
    console.log('🧪 Running Getters and Setters Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: Temperature
    // =========================================================================
    console.log('\n📋 TASK 1: Temperature Converter');
    console.log('-'.repeat(40));

    // Test 1.1: Default temperature (0°C)
    const temp = new Temperature();
    assertApproxEqual(temp.celsius, 0, 'Default temperature is 0°C');
    assertApproxEqual(temp.kelvin, 273.15, 'Default in Kelvin is 273.15');
    assertApproxEqual(temp.fahrenheit, 32, 'Default in Fahrenheit is 32');

    // Test 1.2: Set Celsius, get others
    temp.celsius = 25;
    assertApproxEqual(temp.celsius, 25, 'Set celsius to 25');
    assertApproxEqual(temp.kelvin, 298.15, 'Kelvin is 298.15 for 25°C');
    assertApproxEqual(temp.fahrenheit, 77, 'Fahrenheit is 77 for 25°C');

    // Test 1.3: Set Fahrenheit, get others
    temp.fahrenheit = 212;
    assertApproxEqual(temp.fahrenheit, 212, 'Set fahrenheit to 212');
    assertApproxEqual(temp.celsius, 100, 'Celsius is 100 for 212°F (boiling)');
    assertApproxEqual(temp.kelvin, 373.15, 'Kelvin is 373.15 for 212°F');

    // Test 1.4: Set Kelvin directly
    temp.kelvin = 0;
    assertApproxEqual(temp.kelvin, 0, 'Set kelvin to 0 (absolute zero)');
    assertApproxEqual(temp.celsius, -273.15, 'Celsius is -273.15 at absolute zero');
    assertApproxEqual(temp.fahrenheit, -459.67, 'Fahrenheit is -459.67 at absolute zero');

    // Test 1.5: Validation - below absolute zero
    assertThrows(
        () => { temp.celsius = -300; },
        "Temperature below absolute zero",
        'Setting celsius below absolute zero throws'
    );
    assertThrows(
        () => { temp.kelvin = -1; },
        "Temperature below absolute zero",
        'Setting negative kelvin throws'
    );
    assertThrows(
        () => { temp.fahrenheit = -500; },
        "Temperature below absolute zero",
        'Setting fahrenheit below absolute zero throws'
    );

    // Test 1.6: Static compare
    const t1 = new Temperature();
    const t2 = new Temperature();
    t1.celsius = 20;
    t2.celsius = 30;
    assertEqual(Temperature.compare(t1, t2), -1, 'compare: 20°C < 30°C = -1');
    assertEqual(Temperature.compare(t2, t1), 1, 'compare: 30°C > 20°C = 1');
    t2.celsius = 20;
    assertEqual(Temperature.compare(t1, t2), 0, 'compare: 20°C = 20°C = 0');

    // =========================================================================
    // Task 2 Tests: Person
    // =========================================================================
    console.log('\n📋 TASK 2: Person with Validated Properties');
    console.log('-'.repeat(40));

    // Test 2.1: Create person
    const person = new Person("John", "Doe", 1990, "john@example.com");
    assertEqual(person.firstName, "John", 'firstName is John');
    assertEqual(person.lastName, "Doe", 'lastName is Doe');
    assertEqual(person.fullName, "John Doe", 'fullName is "John Doe"');
    assertEqual(person.email, "john@example.com", 'email is correct');

    // Test 2.2: Age calculation
    const currentYear = new Date().getFullYear();
    const expectedAge = currentYear - 1990;
    assertEqual(person.age, expectedAge, `age is ${expectedAge} (born 1990)`);

    // Test 2.3: Set fullName
    person.fullName = "Jane Smith";
    assertEqual(person.firstName, "Jane", 'After setting fullName, firstName is Jane');
    assertEqual(person.lastName, "Smith", 'After setting fullName, lastName is Smith');

    // Test 2.4: Validate firstName
    assertThrows(
        () => { person.firstName = ""; },
        undefined,
        'Empty firstName throws error'
    );

    // Test 2.5: Validate email
    assertThrows(
        () => { person.email = "invalid"; },
        "Invalid email",
        'Email without @ throws'
    );
    assertThrows(
        () => { person.email = "invalid@nodot"; },
        "Invalid email",
        'Email without . after @ throws'
    );

    // Test 2.6: Validate birthYear
    assertThrows(
        () => { person.birthYear = 1800; },
        undefined,
        'birthYear before 1900 throws'
    );
    assertThrows(
        () => { person.birthYear = currentYear + 1; },
        undefined,
        'birthYear in future throws'
    );

    // Test 2.7: Trimming
    person.firstName = "  Mike  ";
    assertEqual(person.firstName, "Mike", 'firstName is trimmed');

    // Test 2.8: Static fromObject
    const p2 = Person.fromObject({
        firstName: "Alice",
        lastName: "Wonder",
        birthYear: 1985,
        email: "alice@wonderland.com"
    });
    assertEqual(p2.fullName, "Alice Wonder", 'fromObject creates Person correctly');

    // =========================================================================
    // Task 3 Tests: ShoppingCart
    // =========================================================================
    console.log('\n📋 TASK 3: ShoppingCart with Computed Totals');
    console.log('-'.repeat(40));

    // Test 3.1: Empty cart
    const cart = new ShoppingCart();
    assertEqual(cart.itemCount, 0, 'Empty cart has 0 items');
    assertEqual(cart.subtotal, 0, 'Empty cart subtotal is 0');
    assertEqual(cart.total, 0, 'Empty cart total is 0');
    assertNull(cart.discountCode, 'No discount code initially');

    // Test 3.2: Add items
    cart.addItem("Apple", 1.50, 3);
    cart.addItem("Banana", 0.75, 2);
    assertEqual(cart.itemCount, 5, 'itemCount is 5 (3 + 2)');
    assertApproxEqual(cart.subtotal, 6.00, 'subtotal is 6.00');

    // Test 3.3: Add more of same item
    cart.addItem("Apple", 1.50, 2);  // Now 5 apples
    assertEqual(cart.itemCount, 7, 'itemCount is 7 after adding more apples');
    assertApproxEqual(cart.subtotal, 9.00, 'subtotal is 9.00');

    // Test 3.4: Apply discount
    cart.discountCode = "SAVE10";
    assertEqual(cart.discountCode, "SAVE10", 'discountCode is set');
    assertApproxEqual(cart.discount, 0.90, 'discount is 0.90 (10% of 9.00)');
    assertApproxEqual(cart.total, 8.10, 'total is 8.10 after discount');

    // Test 3.5: Invalid discount code
    assertThrows(
        () => { cart.discountCode = "INVALID"; },
        "Invalid discount code",
        'Invalid discount code throws'
    );

    // Test 3.6: Remove discount
    cart.discountCode = null;
    assertNull(cart.discountCode, 'discountCode removed');
    assertEqual(cart.discount, 0, 'discount is 0 without code');
    assertApproxEqual(cart.total, 9.00, 'total equals subtotal without discount');

    // Test 3.7: Update quantity
    cart.updateQuantity("Apple", 2);
    assertEqual(cart.itemCount, 4, 'itemCount is 4 after reducing apples to 2');

    // Test 3.8: Remove item
    cart.removeItem("Banana");
    assertApproxEqual(cart.subtotal, 3.00, 'subtotal after removing bananas');

    // Test 3.9: Update quantity to 0 removes item
    cart.updateQuantity("Apple", 0);
    assertEqual(cart.itemCount, 0, 'Cart empty after setting quantity to 0');

    // Test 3.10: Register custom discount
    cart.addItem("Expensive", 100, 1);
    cart.registerDiscount("VIP50", 0.5);
    cart.discountCode = "VIP50";
    assertApproxEqual(cart.discount, 50, 'Custom VIP50 discount is 50%');
    assertApproxEqual(cart.total, 50, 'Total with VIP50 is 50');

    // Test 3.11: Clear cart
    cart.clearCart();
    assertEqual(cart.itemCount, 0, 'clearCart empties items');
    assertNull(cart.discountCode, 'clearCart removes discount');

    // Test 3.12: Items returns copy
    cart.addItem("Test", 10, 1);
    const items = cart.items;
    items.push({ name: "Hacked", price: 0, quantity: 100 });
    assertEqual(cart.itemCount, 1, 'Modifying items copy does not affect cart');

    // =========================================================================
    // Task 4 Tests: DataLoader & ExpensiveComputation
    // =========================================================================
    console.log('\n📋 TASK 4: Lazy Loading');
    console.log('-'.repeat(40));

    // Test 4.1: DataLoader - initial state
    const loader = new DataLoader();
    assertFalse(loader.isLoaded, 'Initially not loaded');
    assertEqual(loader.loadCount, 0, 'loadCount is 0 initially');

    // Test 4.2: First access loads data
    const data1 = loader.data;
    assertTrue(loader.isLoaded, 'After accessing data, isLoaded is true');
    assertEqual(loader.loadCount, 1, 'loadCount is 1 after first access');
    assertTrue(data1 !== null && data1 !== undefined, 'data is not null/undefined');

    // Test 4.3: Second access uses cache
    const data2 = loader.data;
    assertEqual(loader.loadCount, 1, 'loadCount still 1 after second access (cached)');
    assertEqual(data1, data2, 'Same data returned (cached)');

    // Test 4.4: reload() forces new load
    loader.reload();
    const data3 = loader.data;
    assertEqual(loader.loadCount, 2, 'loadCount is 2 after reload');

    // Test 4.5: clear()
    loader.clear();
    assertFalse(loader.isLoaded, 'After clear, isLoaded is false');

    // Test 4.6: ExpensiveComputation - factorial caching
    const comp = new ExpensiveComputation(5);
    assertEqual(comp.input, 5, 'input is 5');
    assertEqual(comp.result, 120, 'result is 120 (5!)');
    
    // Access again - should be cached
    const result2 = comp.result;
    assertEqual(result2, 120, 'result still 120 (cached)');

    // Test 4.7: Changing input clears cache
    comp.input = 6;
    assertEqual(comp.input, 6, 'input changed to 6');
    assertEqual(comp.result, 720, 'result is 720 (6!, recomputed)');

    // Test 4.8: More factorial tests
    const comp2 = new ExpensiveComputation(0);
    assertEqual(comp2.result, 1, 'factorial(0) = 1');

    const comp3 = new ExpensiveComputation(1);
    assertEqual(comp3.result, 1, 'factorial(1) = 1');

    const comp4 = new ExpensiveComputation(10);
    assertEqual(comp4.result, 3628800, 'factorial(10) = 3628800');

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test E1: Temperature conversions at freezing point
    const freezing = new Temperature();
    freezing.celsius = 0;
    assertApproxEqual(freezing.fahrenheit, 32, 'Freezing: 0°C = 32°F');

    // Test E2: Temperature conversions at boiling point
    freezing.celsius = 100;
    assertApproxEqual(freezing.fahrenheit, 212, 'Boiling: 100°C = 212°F');

    // Test E3: Multiple fullName changes
    const p = new Person("A", "B", 2000, "a@b.com");
    p.fullName = "First Last";
    p.fullName = "Second Name";
    assertEqual(p.fullName, "Second Name", 'fullName can be changed multiple times');

    // Test E4: Cart with zero-price items
    const freeCart = new ShoppingCart();
    freeCart.addItem("Free Sample", 0, 5);
    assertEqual(freeCart.subtotal, 0, 'Free items have 0 subtotal');
    freeCart.discountCode = "SAVE10";
    assertEqual(freeCart.total, 0, '10% of 0 is still 0');

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
        console.log('You have mastered Getters and Setters!\n');
    } else {
        console.log('\n💪 Keep going! Review the failed tests and try again.\n');
    }
}

// Run the tests
runTests();
