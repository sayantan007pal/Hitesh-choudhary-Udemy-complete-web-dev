/**
 * Test Suite for Abstraction Challenge #3
 * ========================================
 * 
 * Run this file with: node _3_test_abstraction_example.js
 * 
 * Tests your CoffeeMachine and PaymentProcessor implementations for:
 *   - Hidden complexity (private methods)
 *   - Simple public interface
 *   - Proper state management
 */

const { CoffeeMachine, PaymentProcessor } = require('./_3_abstraction_example.js');

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

function assertThrows(fn, expectedMessage, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to throw: "${expectedMessage}"`);
        testsFailed++;
        return false;
    } catch (error) {
        if (error.message === expectedMessage) {
            console.log(`✅ PASS: ${testName}`);
            testsPassed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Expected error: "${expectedMessage}"`);
            console.log(`   Actual error:   "${error.message}"`);
            testsFailed++;
            return false;
        }
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

function assertArrayLength(array, expectedLength, testName) {
    totalTests++;
    if (array.length === expectedLength) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected length: ${expectedLength}`);
        console.log(`   Actual length:   ${array.length}`);
        testsFailed++;
        return false;
    }
}

function assertUndefined(value, testName) {
    totalTests++;
    if (value === undefined) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: undefined`);
        console.log(`   Actual:   ${value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Sections
// =============================================================================

console.log('\n' + '═'.repeat(70));
console.log('  ABSTRACTION CHALLENGE #3 - TEST SUITE');
console.log('═'.repeat(70) + '\n');

// -----------------------------------------------------------------------------
// Test Section 1: CoffeeMachine Initial State
// -----------------------------------------------------------------------------
console.log('☕ Section 1: CoffeeMachine Initial State');
console.log('─'.repeat(50));

const machine = new CoffeeMachine();
const status = machine.getStatus();

assertEqual(status.isOn, false, 'Machine should start turned off');
assertEqual(status.waterLevel, 0, 'Water level should start at 0');
assertEqual(status.beanLevel, 0, 'Bean level should start at 0');
assertEqual(status.temperature, 20, 'Temperature should start at 20°C');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 2: CoffeeMachine Power Control
// -----------------------------------------------------------------------------
console.log('🔌 Section 2: CoffeeMachine Power Control');
console.log('─'.repeat(50));

const powerMachine = new CoffeeMachine();

assertEqual(powerMachine.turnOn(), 'Machine is on', 'turnOn should return correct message');
assertTrue(powerMachine.getStatus().isOn, 'Machine should be on after turnOn()');

assertEqual(powerMachine.turnOff(), 'Machine is off', 'turnOff should return correct message');
assertFalse(powerMachine.getStatus().isOn, 'Machine should be off after turnOff()');
assertEqual(powerMachine.getStatus().temperature, 20, 'Temperature should reset to 20°C when off');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 3: Adding Resources
// -----------------------------------------------------------------------------
console.log('💧 Section 3: Adding Resources');
console.log('─'.repeat(50));

const resourceMachine = new CoffeeMachine();

assertEqual(resourceMachine.addWater(500), 'Water added: 500ml', 'addWater should return correct message');
assertEqual(resourceMachine.getStatus().waterLevel, 500, 'Water level should be 500');

assertEqual(resourceMachine.addBeans(200), 'Beans added: 200g', 'addBeans should return correct message');
assertEqual(resourceMachine.getStatus().beanLevel, 200, 'Bean level should be 200');

// Test overflow protection
assertThrows(
    () => resourceMachine.addWater(600),
    'Water tank overflow',
    'Should throw on water overflow'
);

assertThrows(
    () => resourceMachine.addBeans(400),
    'Bean container overflow',
    'Should throw on bean overflow'
);

// Test negative amounts
assertThrows(
    () => resourceMachine.addWater(-100),
    'Water amount must be positive',
    'Should throw on negative water'
);

assertThrows(
    () => resourceMachine.addBeans(0),
    'Bean amount must be positive',
    'Should throw on zero beans'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 4: Making Coffee - Abstraction in Action
// -----------------------------------------------------------------------------
console.log('☕ Section 4: Making Coffee - Abstraction in Action');
console.log('─'.repeat(50));

const coffeeMachine = new CoffeeMachine();
coffeeMachine.addWater(500);
coffeeMachine.addBeans(200);
coffeeMachine.turnOn();

const espressoSteps = coffeeMachine.makeCoffee('espresso');
assertArrayLength(espressoSteps, 4, 'makeCoffee should return 4 steps');
assertTrue(espressoSteps[0].includes('heated'), 'Step 1 should mention heating');
assertTrue(espressoSteps[1].includes('ground'), 'Step 2 should mention grinding');
assertTrue(espressoSteps[2].includes('brewed'), 'Step 3 should mention brewing');
assertTrue(espressoSteps[3].includes('dispensed'), 'Step 4 should mention dispensing');

// Check resource consumption (espresso: 30ml water, 20g beans)
const afterEspresso = coffeeMachine.getStatus();
assertEqual(afterEspresso.waterLevel, 470, 'Water should decrease by 30ml');
assertEqual(afterEspresso.beanLevel, 180, 'Beans should decrease by 20g');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 5: Making Different Coffee Types
// -----------------------------------------------------------------------------
console.log('🥛 Section 5: Different Coffee Types');
console.log('─'.repeat(50));

const typeMachine = new CoffeeMachine();
typeMachine.addWater(500);
typeMachine.addBeans(200);
typeMachine.turnOn();

// Make americano (60ml water, 20g beans)
typeMachine.makeCoffee('americano');
assertEqual(typeMachine.getStatus().waterLevel, 440, 'Americano uses 60ml water');
assertEqual(typeMachine.getStatus().beanLevel, 180, 'Americano uses 20g beans');

// Make latte (45ml water, 20g beans)
typeMachine.makeCoffee('latte');
assertEqual(typeMachine.getStatus().waterLevel, 395, 'Latte uses 45ml water');
assertEqual(typeMachine.getStatus().beanLevel, 160, 'Latte uses 20g beans');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 6: Error Handling
// -----------------------------------------------------------------------------
console.log('⚠️ Section 6: Error Handling');
console.log('─'.repeat(50));

const errorMachine = new CoffeeMachine();
errorMachine.addWater(100);
errorMachine.addBeans(100);

// Try to make coffee while off
assertThrows(
    () => errorMachine.makeCoffee('espresso'),
    'Machine is off',
    'Should throw if machine is off'
);

errorMachine.turnOn();

// Try unknown coffee type
assertThrows(
    () => errorMachine.makeCoffee('mocha'),
    'Unknown coffee type',
    'Should throw for unknown coffee type'
);

// Use up resources
const lowWaterMachine = new CoffeeMachine();
lowWaterMachine.addWater(20);
lowWaterMachine.addBeans(100);
lowWaterMachine.turnOn();

assertThrows(
    () => lowWaterMachine.makeCoffee('espresso'),
    'Not enough water',
    'Should throw if not enough water'
);

const lowBeanMachine = new CoffeeMachine();
lowBeanMachine.addWater(100);
lowBeanMachine.addBeans(10);
lowBeanMachine.turnOn();

assertThrows(
    () => lowBeanMachine.makeCoffee('espresso'),
    'Not enough beans',
    'Should throw if not enough beans'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 7: Private Method Protection (Abstraction Verification)
// -----------------------------------------------------------------------------
console.log('🔒 Section 7: Private Method Protection');
console.log('─'.repeat(50));

const privateMachine = new CoffeeMachine();

// Verify private methods are not accessible
assertUndefined(privateMachine.heatWater, 'heatWater should not be accessible');
assertUndefined(privateMachine.grindBeans, 'grindBeans should not be accessible');
assertUndefined(privateMachine.brew, 'brew should not be accessible');
assertUndefined(privateMachine.dispense, 'dispense should not be accessible');

// Verify private properties are not accessible
assertUndefined(privateMachine.waterLevel, 'waterLevel should not be directly accessible');
assertUndefined(privateMachine.beanLevel, 'beanLevel should not be directly accessible');
assertUndefined(privateMachine.temperature, 'temperature should not be directly accessible');
assertUndefined(privateMachine.isOn, 'isOn should not be directly accessible');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 8: PaymentProcessor Abstraction
// -----------------------------------------------------------------------------
console.log('💳 Section 8: PaymentProcessor Abstraction');
console.log('─'.repeat(50));

const processor = new PaymentProcessor();

// Valid payment
const validPayment = processor.pay('1234567890123456', 100);
assertTrue(validPayment.success, 'Valid payment should succeed');
assertEqual(validPayment.message, 'Payment successful', 'Should return success message');
assertTrue(validPayment.transactionId !== null, 'Should generate transaction ID');
assertTrue(validPayment.transactionId.startsWith('TXN'), 'Transaction ID should start with TXN');

// Invalid card number
const invalidCard = processor.pay('1234', 100);
assertFalse(invalidCard.success, 'Invalid card should fail');
assertEqual(invalidCard.message, 'Invalid card number', 'Should return invalid card message');
assertEqual(invalidCard.transactionId, null, 'Failed payment should have null transaction ID');

// Card with spaces (should work after cleaning)
const spacedCard = processor.pay('1234 5678 9012 3456', 100);
assertTrue(spacedCard.success, 'Card with spaces should work');

// Card with dashes (should work after cleaning)
const dashedCard = processor.pay('1234-5678-9012-3456', 100);
assertTrue(dashedCard.success, 'Card with dashes should work');

// Fraud detection
const fraudPayment = processor.pay('1234567890123456', 15000);
assertFalse(fraudPayment.success, 'Suspicious amount should be flagged');
assertEqual(fraudPayment.message, 'Transaction flagged for review', 'Should flag for review');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 9: PaymentProcessor Private Methods
// -----------------------------------------------------------------------------
console.log('🔐 Section 9: PaymentProcessor Private Methods');
console.log('─'.repeat(50));

// Verify private methods are hidden
assertUndefined(processor.validateCard, 'validateCard should not be accessible');
assertUndefined(processor.checkFraud, 'checkFraud should not be accessible');
assertUndefined(processor.connectToBank, 'connectToBank should not be accessible');
assertUndefined(processor.processTransaction, 'processTransaction should not be accessible');

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
    console.log('You have successfully demonstrated ABSTRACTION in JavaScript!');
    console.log('\n📖 Key Takeaways:');
    console.log('   • Complex operations are hidden behind simple public methods');
    console.log('   • Users call makeCoffee() without knowing the steps');
    console.log('   • Private methods (#) prevent access to implementation details');
    console.log('   • Changes to internal logic don\'t affect the public interface\n');
} else {
    console.log('\n⚠️  Some tests failed. Review the errors above and try again!');
    console.log('💡 Tip: Make sure private methods are marked with # prefix.\n');
}

process.exit(testsFailed > 0 ? 1 : 0);
