/**
 * Test Suite for Encapsulation and Private Fields
 * ================================================
 * 
 * Run this file with: node _6_test_encapsulation_private_fields_example.js
 */

const {
    SecureBankAccount,
    PasswordEntry,
    GameCharacter,
    Observable
} = require('./_6_encapsulation_private_fields_example.js');

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

function assertArrayLength(arr, length, testName) {
    totalTests++;
    if (arr.length === length) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected length: ${length}`);
        console.log(`   Actual length:   ${arr.length}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Encapsulation & Private Fields Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: SecureBankAccount
    // =========================================================================
    console.log('\n📋 TASK 1: SecureBankAccount');
    console.log('-'.repeat(40));

    // Test 1.1: Create account
    const account = new SecureBankAccount("John Doe", 1000, 1234);
    assertTrue(typeof account.getAccountNumber() === 'string', 'Account number is a string');
    assertTrue(account.getAccountNumber().startsWith('ACC'), 'Account number starts with ACC');
    assertEqual(account.getAccountNumber().length, 9, 'Account number is 9 chars (ACC + 6 digits)');

    // Test 1.2: Get balance with correct pin
    assertEqual(account.getBalance(1234), 1000, 'getBalance with correct PIN returns balance');

    // Test 1.3: Get balance with wrong pin
    assertThrows(
        () => account.getBalance(0000),
        "Invalid PIN",
        'getBalance with wrong PIN throws error'
    );

    // Test 1.4: Deposit
    assertEqual(account.deposit(500), 1500, 'deposit(500) returns new balance 1500');
    assertEqual(account.getBalance(1234), 1500, 'Balance after deposit is 1500');

    // Test 1.5: Withdraw with correct pin
    assertEqual(account.withdraw(200, 1234), 200, 'withdraw(200, pin) returns 200');
    assertEqual(account.getBalance(1234), 1300, 'Balance after withdrawal is 1300');

    // Test 1.6: Withdraw with wrong pin
    assertThrows(
        () => account.withdraw(100, 9999),
        "Invalid PIN",
        'withdraw with wrong PIN throws error'
    );

    // Test 1.7: Withdraw more than balance
    assertThrows(
        () => account.withdraw(5000, 1234),
        undefined,  // Any error message
        'withdraw more than balance throws error'
    );

    // Test 1.8: Transaction history
    const history = account.getTransactionHistory(1234);
    assertTrue(Array.isArray(history), 'Transaction history is an array');
    assertTrue(history.length >= 2, 'History has at least 2 transactions');
    assertEqual(history[0].type, 'deposit', 'First transaction is deposit');

    // Test 1.9: History is a copy (not the original)
    const history2 = account.getTransactionHistory(1234);
    assertTrue(history !== history2, 'getTransactionHistory returns a copy');

    // Test 1.10: Change PIN
    account.changePin(1234, 5678);
    assertEqual(account.getBalance(5678), 1300, 'After changePin, new PIN works');
    assertThrows(
        () => account.getBalance(1234),
        "Invalid PIN",
        'After changePin, old PIN fails'
    );

    // Test 1.11: Invalid PIN format
    assertThrows(
        () => new SecureBankAccount("Jane", 100, 12345),  // 5 digits
        undefined,
        'Constructor rejects 5-digit PIN'
    );

    // Test 1.12: Negative initial deposit
    assertThrows(
        () => new SecureBankAccount("Jane", -100, 1234),
        undefined,
        'Constructor rejects negative initial deposit'
    );

    // =========================================================================
    // Task 2 Tests: PasswordEntry
    // =========================================================================
    console.log('\n📋 TASK 2: PasswordEntry');
    console.log('-'.repeat(40));

    // Test 2.1: Create password entry
    const entry = new PasswordEntry("github.com", "john", "secret123", "masterkey");
    assertEqual(entry.getWebsite(), "github.com", 'getWebsite() returns correct website');
    assertEqual(entry.getUsername(), "john", 'getUsername() returns correct username');

    // Test 2.2: Get password with correct key
    assertEqual(entry.getPassword("masterkey"), "secret123", 'getPassword with correct key works');

    // Test 2.3: Get password with wrong key
    assertThrows(
        () => entry.getPassword("wrongkey"),
        "Invalid master key",
        'getPassword with wrong key throws error'
    );

    // Test 2.4: getInfo does not reveal password
    const info = entry.getInfo();
    assertTrue(info.includes("github.com"), 'getInfo includes website');
    assertTrue(info.includes("john"), 'getInfo includes username');
    assertFalse(info.includes("secret123"), 'getInfo does NOT include password');

    // Test 2.5: Update password
    entry.updatePassword("newpassword", "masterkey");
    assertEqual(entry.getPassword("masterkey"), "newpassword", 'updatePassword works');

    // Test 2.6: Last accessed updates
    const lastAccessed1 = entry.getLastAccessed();
    setTimeout(() => {
        entry.getPassword("masterkey");
        // Can't reliably test timing in sync test, but structure is there
    }, 10);

    // =========================================================================
    // Task 3 Tests: GameCharacter
    // =========================================================================
    console.log('\n📋 TASK 3: GameCharacter');
    console.log('-'.repeat(40));

    // Test 3.1: Create character
    const hero = new GameCharacter("Aragorn", "Warrior");
    assertEqual(hero.name, "Aragorn", 'Character name is correct');
    assertEqual(hero.characterClass, "Warrior", 'Character class is correct');

    // Test 3.2: Initial stats
    const stats = hero.getStats();
    assertEqual(stats.health, 100, 'Initial health is 100');
    assertEqual(stats.mana, 50, 'Initial mana is 50');
    assertEqual(stats.level, 1, 'Initial level is 1');
    assertEqual(stats.experience, 0, 'Initial experience is 0');
    assertEqual(stats.isAlive, true, 'Initially isAlive is true');

    // Test 3.3: Take damage
    hero.takeDamage(30);
    assertEqual(hero.getStats().health, 70, 'After takeDamage(30), health is 70');

    // Test 3.4: Heal
    hero.heal(50);
    assertEqual(hero.getStats().health, 100, 'Heal does not exceed max (100)');

    // Test 3.5: Use mana
    assertTrue(hero.useMana(20), 'useMana(20) returns true when enough mana');
    assertEqual(hero.getStats().mana, 30, 'After useMana(20), mana is 30');
    assertFalse(hero.useMana(50), 'useMana(50) returns false when not enough');

    // Test 3.6: Restore mana
    hero.restoreMana(100);
    assertEqual(hero.getStats().mana, 50, 'restoreMana does not exceed max (50)');

    // Test 3.7: Gain experience and level up
    hero.gainExperience(100);  // Level up at 100 (level * 100)
    assertEqual(hero.getStats().level, 2, 'After gaining 100 exp at level 1, level is 2');
    assertEqual(hero.getStats().experience, 0, 'Experience resets after level up');

    // Test 3.8: Death
    hero.takeDamage(200);
    assertEqual(hero.getStats().health, 0, 'Health cannot go below 0');
    assertFalse(hero.getStats().isAlive, 'isAlive is false when health is 0');

    // Test 3.9: Revive
    hero.revive();
    assertTrue(hero.getStats().isAlive, 'After revive, isAlive is true');
    assertEqual(hero.getStats().health, 50, 'After revive, health is 50');
    assertEqual(hero.getStats().mana, 25, 'After revive, mana is 25');

    // Test 3.10: Inventory
    hero.addToInventory("Sword");
    hero.addToInventory("Shield");
    const inventory = hero.getInventory();
    assertArrayLength(inventory, 2, 'Inventory has 2 items');
    assertTrue(inventory.includes("Sword"), 'Inventory contains Sword');

    // Test 3.11: Remove from inventory
    assertTrue(hero.removeFromInventory("Sword"), 'removeFromInventory returns true');
    assertFalse(hero.removeFromInventory("Bow"), 'removeFromInventory returns false for missing item');
    assertArrayLength(hero.getInventory(), 1, 'Inventory has 1 item after removal');

    // =========================================================================
    // Task 4 Tests: Observable
    // =========================================================================
    console.log('\n📋 TASK 4: Observable (Event System)');
    console.log('-'.repeat(40));

    const obs = new Observable();
    let receivedData = null;
    let callCount = 0;

    // Test 4.1: Subscribe and emit
    const unsub = obs.subscribe("test", (data) => {
        receivedData = data;
        callCount++;
    });
    obs.emit("test", "hello");
    assertEqual(receivedData, "hello", 'Subscriber receives emitted data');
    assertEqual(callCount, 1, 'Callback called once');

    // Test 4.2: Subscriber count
    assertEqual(obs.getSubscriberCount("test"), 1, 'getSubscriberCount returns 1');

    // Test 4.3: Unsubscribe using returned function
    unsub();
    assertEqual(obs.getSubscriberCount("test"), 0, 'After unsubscribe, count is 0');
    obs.emit("test", "ignored");
    assertEqual(callCount, 1, 'Callback not called after unsubscribe');

    // Test 4.4: Multiple subscribers
    let count1 = 0, count2 = 0;
    obs.subscribe("multi", () => count1++);
    obs.subscribe("multi", () => count2++);
    obs.emit("multi", {});
    assertEqual(count1, 1, 'First subscriber called');
    assertEqual(count2, 1, 'Second subscriber called');
    assertEqual(obs.getSubscriberCount("multi"), 2, 'Two subscribers for "multi"');

    // Test 4.5: once - auto-unsubscribe after first call
    let onceCount = 0;
    obs.once("login", () => onceCount++);
    obs.emit("login", {});
    obs.emit("login", {});
    assertEqual(onceCount, 1, 'once callback only called once');

    // Test 4.6: Event history
    obs.emit("tracked", { id: 1 });
    obs.emit("tracked", { id: 2 });
    const history3 = obs.getEventHistory();
    assertTrue(Array.isArray(history3), 'getEventHistory returns array');
    assertTrue(history3.length >= 2, 'History contains events');

    // Test 4.7: Clear history
    obs.clearHistory();
    assertArrayLength(obs.getEventHistory(), 0, 'After clearHistory, history is empty');

    // Test 4.8: Unsubscribe specific callback
    const callback = () => {};
    obs.subscribe("specific", callback);
    assertEqual(obs.getSubscriberCount("specific"), 1, 'Subscribed callback');
    obs.unsubscribe("specific", callback);
    assertEqual(obs.getSubscriberCount("specific"), 0, 'After unsubscribe, count is 0');

    // =========================================================================
    // Edge Cases & Privacy Tests
    // =========================================================================
    console.log('\n📋 EDGE CASES & PRIVACY');
    console.log('-'.repeat(40));

    // Test E1: Private fields are truly private (can't access directly)
    // Note: We can't directly test for SyntaxError in runtime, but we verify
    // that private data is not exposed through normal property access
    const testAccount = new SecureBankAccount("Test", 500, 4321);
    assertTrue(
        testAccount.balance === undefined,
        'account.balance is undefined (private #balance not exposed)'
    );
    assertTrue(
        testAccount.pin === undefined,
        'account.pin is undefined (private #pin not exposed)'
    );

    // Test E2: History returns copy, not reference
    const acc2 = new SecureBankAccount("Test2", 100, 1111);
    acc2.deposit(50);
    const h1 = acc2.getTransactionHistory(1111);
    h1.push({ fake: true });  // Try to modify
    const h2 = acc2.getTransactionHistory(1111);
    assertFalse(
        h2.some(t => t.fake),
        'Modifying history copy does not affect original'
    );

    // Test E3: Inventory returns copy
    const char = new GameCharacter("Test", "Mage");
    char.addToInventory("Wand");
    const inv1 = char.getInventory();
    inv1.push("Hacked Item");
    const inv2 = char.getInventory();
    assertFalse(
        inv2.includes("Hacked Item"),
        'Modifying inventory copy does not affect original'
    );

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
        console.log('You have mastered Encapsulation and Private Fields!\n');
    } else {
        console.log('\n💪 Keep going! Review the failed tests and try again.\n');
    }
}

// Run the tests
runTests();
