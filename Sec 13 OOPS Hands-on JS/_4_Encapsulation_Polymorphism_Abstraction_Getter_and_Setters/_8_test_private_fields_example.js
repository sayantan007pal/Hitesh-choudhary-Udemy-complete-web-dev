/**
 * Test Suite for Private Fields & Methods Challenge #8
 * =====================================================
 * 
 * Run this file with: node _8_test_private_fields_example.js
 * 
 * Tests your SecureVault and PrivateCounter implementations for:
 *   - True private field protection
 *   - Private method functionality
 *   - Static private fields
 *   - Security features
 */

const { SecureVault, PrivateCounter, ImmutablePerson } = require('./_8_private_fields_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
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
        if (error.message.includes(expectedMessage)) {
            console.log(`✅ PASS: ${testName}`);
            testsPassed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Expected error containing: "${expectedMessage}"`);
            console.log(`   Actual error: "${error.message}"`);
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
        console.log(`   Expected: true, Actual: ${value}`);
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
        console.log(`   Expected: false, Actual: ${value}`);
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
        console.log(`   Expected: undefined, Actual: ${value}`);
        testsFailed++;
        return false;
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
        console.log(`   Expected: null, Actual: ${value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Sections
// =============================================================================

console.log('\n' + '═'.repeat(70));
console.log('  PRIVATE FIELDS & METHODS CHALLENGE #8 - TEST SUITE');
console.log('═'.repeat(70) + '\n');

// Reset PrivateCounter before tests
PrivateCounter.clearRegistry();

// -----------------------------------------------------------------------------
// Test Section 1: SecureVault Basic Operations
// -----------------------------------------------------------------------------
console.log('🔐 Section 1: SecureVault Basic Operations');
console.log('─'.repeat(50));

const vault = new SecureVault('mySecretPassword');

// Store and retrieve
vault.store('apiKey', 'abc123', 'mySecretPassword');
assertEqual(vault.retrieve('apiKey', 'mySecretPassword'), 'abc123', 'Store and retrieve string');

vault.store('config', { debug: true, port: 3000 }, 'mySecretPassword');
const config = vault.retrieve('config', 'mySecretPassword');
assertEqual(config.debug, true, 'Store and retrieve object - debug');
assertEqual(config.port, 3000, 'Store and retrieve object - port');

vault.store('numbers', [1, 2, 3], 'mySecretPassword');
const nums = vault.retrieve('numbers', 'mySecretPassword');
assertEqual(nums.length, 3, 'Store and retrieve array');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 2: SecureVault Authentication
// -----------------------------------------------------------------------------
console.log('🔑 Section 2: SecureVault Authentication');
console.log('─'.repeat(50));

const authVault = new SecureVault('correctPassword');
authVault.store('secret', 'data', 'correctPassword');

// Wrong password
assertThrows(
    () => authVault.retrieve('secret', 'wrongPassword'),
    'Authentication failed',
    'Wrong password should fail'
);

// Correct password after failure
assertEqual(
    authVault.retrieve('secret', 'correctPassword'),
    'data',
    'Correct password should work after failure'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 3: SecureVault Lockout
// -----------------------------------------------------------------------------
console.log('🚫 Section 3: SecureVault Lockout (3 Failed Attempts)');
console.log('─'.repeat(50));

const lockVault = new SecureVault('thePassword');
lockVault.store('key', 'value', 'thePassword');

assertFalse(lockVault.isLocked(), 'Vault starts unlocked');

// 3 wrong attempts
try { lockVault.retrieve('key', 'wrong1'); } catch (e) {}
assertFalse(lockVault.isLocked(), 'Still unlocked after 1 failure');

try { lockVault.retrieve('key', 'wrong2'); } catch (e) {}
assertFalse(lockVault.isLocked(), 'Still unlocked after 2 failures');

try { lockVault.retrieve('key', 'wrong3'); } catch (e) {}
assertTrue(lockVault.isLocked(), 'Locked after 3 failures');

// Should stay locked even with correct password via retrieve
assertThrows(
    () => lockVault.retrieve('key', 'thePassword'),
    'Vault is locked',
    'Locked vault rejects operations'
);

// Unlock with correct password
assertTrue(lockVault.unlock('thePassword'), 'unlock() with correct password');
assertFalse(lockVault.isLocked(), 'Vault unlocked after unlock()');
assertEqual(lockVault.retrieve('key', 'thePassword'), 'value', 'Can access after unlock');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 4: SecureVault Private Fields Protection
// -----------------------------------------------------------------------------
console.log('🛡️ Section 4: Private Fields Protection');
console.log('─'.repeat(50));

const privateVault = new SecureVault('secret');

// Private fields should not be accessible
assertUndefined(privateVault.data, 'data should not be accessible');
assertUndefined(privateVault._data, '_data should not be accessible');
assertUndefined(privateVault.masterPassword, 'masterPassword should not be accessible');
assertUndefined(privateVault.accessLog, 'accessLog should not be accessible');

// Private methods should not be accessible
assertUndefined(privateVault.authenticate, 'authenticate should not be accessible');
assertUndefined(privateVault.encrypt, 'encrypt should not be accessible');
assertUndefined(privateVault.decrypt, 'decrypt should not be accessible');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 5: SecureVault Delete & Change Password
// -----------------------------------------------------------------------------
console.log('✏️ Section 5: Delete & Change Password');
console.log('─'.repeat(50));

const modVault = new SecureVault('oldPass');
modVault.store('deleteMe', 'temp', 'oldPass');

assertTrue(modVault.delete('deleteMe', 'oldPass'), 'delete returns true for existing key');
assertFalse(modVault.delete('nonexistent', 'oldPass'), 'delete returns false for nonexistent key');

assertThrows(
    () => modVault.retrieve('deleteMe', 'oldPass'),
    'Key not found',
    'Deleted key should not be found'
);

// Change password
assertTrue(modVault.changePassword('oldPass', 'newPass'), 'changePassword returns true');

// Old password should fail
assertThrows(
    () => modVault.store('test', 'value', 'oldPass'),
    'Authentication failed',
    'Old password should not work after change'
);

// New password should work
modVault.store('test', 'value', 'newPass');
assertEqual(modVault.retrieve('test', 'newPass'), 'value', 'New password works');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 6: PrivateCounter Instance Management
// -----------------------------------------------------------------------------
console.log('🔢 Section 6: PrivateCounter Instance Management');
console.log('─'.repeat(50));

PrivateCounter.clearRegistry();

const counter1 = new PrivateCounter('Counter A', 10);
const counter2 = new PrivateCounter('Counter B', 20);

assertEqual(PrivateCounter.getTotalInstances(), 2, 'Total instances should be 2');

assertEqual(counter1.getName(), 'Counter A', 'Counter 1 name');
assertEqual(counter1.getCount(), 10, 'Counter 1 initial count');
assertEqual(counter1.getId(), 1, 'Counter 1 ID should be 1');

assertEqual(counter2.getName(), 'Counter B', 'Counter 2 name');
assertEqual(counter2.getCount(), 20, 'Counter 2 initial count');
assertEqual(counter2.getId(), 2, 'Counter 2 ID should be 2');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 7: PrivateCounter Operations
// -----------------------------------------------------------------------------
console.log('➕ Section 7: PrivateCounter Operations');
console.log('─'.repeat(50));

const opCounter = new PrivateCounter('OpTest', 5);

assertEqual(opCounter.increment(), 6, 'increment returns new value');
assertEqual(opCounter.increment(), 7, 'increment again');
assertEqual(opCounter.decrement(), 6, 'decrement returns new value');
assertEqual(opCounter.getCount(), 6, 'getCount after operations');
assertEqual(opCounter.reset(), 0, 'reset returns 0');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 8: PrivateCounter Static Operations
// -----------------------------------------------------------------------------
console.log('📊 Section 8: PrivateCounter Static Operations');
console.log('─'.repeat(50));

PrivateCounter.clearRegistry();

const a = new PrivateCounter('A', 100);
const b = new PrivateCounter('B', 200);
const c = new PrivateCounter('C', 300);

const foundA = PrivateCounter.getInstanceById(1);
assertEqual(foundA.getName(), 'A', 'getInstanceById finds correct counter');

assertNull(PrivateCounter.getInstanceById(999), 'getInstanceById returns null for invalid ID');

const all = PrivateCounter.getAllInstances();
assertEqual(all.length, 3, 'getAllInstances returns all counters');

// Reset all
PrivateCounter.resetAll();
assertEqual(a.getCount(), 0, 'resetAll resets counter A');
assertEqual(b.getCount(), 0, 'resetAll resets counter B');
assertEqual(c.getCount(), 0, 'resetAll resets counter C');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 9: PrivateCounter Private Field Protection
// -----------------------------------------------------------------------------
console.log('🔒 Section 9: PrivateCounter Private Field Protection');
console.log('─'.repeat(50));

const privateCounter = new PrivateCounter('Private', 50);

assertUndefined(privateCounter.id, 'id should not be accessible');
assertUndefined(privateCounter.count, 'count should not be accessible');
assertUndefined(privateCounter._count, '_count should not be accessible');

// Static private fields also protected
assertUndefined(PrivateCounter.totalInstances, 'static totalInstances not accessible');
assertUndefined(PrivateCounter.instanceRegistry, 'static instanceRegistry not accessible');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 10: ImmutablePerson
// -----------------------------------------------------------------------------
console.log('👤 Section 10: ImmutablePerson');
console.log('─'.repeat(50));

const person = new ImmutablePerson('John', 'Doe', '1990-05-15');

assertEqual(person.firstName, 'John', 'firstName getter works');
assertEqual(person.lastName, 'Doe', 'lastName getter works');
assertEqual(person.fullName, 'John Doe', 'fullName computed property');

// birthDate should return a copy
const bday = person.birthDate;
const bday2 = person.birthDate;
totalTests++;
if (bday !== bday2 && bday.getTime() === bday2.getTime()) {
    console.log('✅ PASS: birthDate returns a new copy each time');
    testsPassed++;
} else {
    console.log('❌ FAIL: birthDate should return a new copy');
    testsFailed++;
}

// No setters
assertUndefined(Object.getOwnPropertyDescriptor(ImmutablePerson.prototype, 'firstName')?.set, 'firstName has no setter');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 11: SecureVault Access Log
// -----------------------------------------------------------------------------
console.log('📋 Section 11: SecureVault Access Log');
console.log('─'.repeat(50));

const logVault = new SecureVault('logPass');
logVault.store('key1', 'value1', 'logPass');
logVault.retrieve('key1', 'logPass');
try { logVault.retrieve('key1', 'wrongPass'); } catch (e) {}

const log = logVault.getAccessLog('logPass');
assertTrue(log.length >= 4, 'Access log should have entries'); // store, retrieve, failed retrieve, getAccessLog
assertTrue(log.every(entry => entry.timestamp), 'Each log entry has timestamp');
assertTrue(log.every(entry => entry.action), 'Each log entry has action');
assertTrue(log.every(entry => typeof entry.success === 'boolean'), 'Each log entry has success boolean');

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
    console.log('You have mastered PRIVATE FIELDS & METHODS in JavaScript!');
    console.log('\n📖 Key Takeaways:');
    console.log('   • # prefix creates truly private fields/methods');
    console.log('   • Private fields must be declared at class level');
    console.log('   • Static private fields use: static #field');
    console.log('   • Private members are not accessible from outside\n');
} else {
    console.log('\n⚠️  Some tests failed. Review the errors above and try again!');
    console.log('💡 Tip: Make sure all private fields are declared with #.\n');
}

process.exit(testsFailed > 0 ? 1 : 0);
