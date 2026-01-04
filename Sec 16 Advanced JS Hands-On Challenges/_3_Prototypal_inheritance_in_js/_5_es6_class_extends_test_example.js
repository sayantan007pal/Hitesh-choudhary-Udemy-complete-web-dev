/**
 * Test Suite for ES6 Classes and Extends
 * ========================================
 * 
 * Run: node _5_es6_class_extends_test_example.js
 */

const { User, Admin, Guest } = require('./_5_es6_class_extends_example.js');

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

function assertFalse(condition, testName) {
    if (!condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
    }
}

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running ES6 Classes Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // User Tests
    // =========================================================================
    console.log('\n📋 USER CLASS TESTS');
    console.log('-'.repeat(40));

    const user = new User("john", "john@example.com");
    
    assertEqual(user.username, "john", 'User stores username');
    assertEqual(user.email, "john@example.com", 'User stores email');
    assertTrue(typeof user.createdAt === 'number', 'User has createdAt timestamp');
    
    assertEqual(
        user.getInfo(), 
        "User: john (john@example.com)", 
        'User.getInfo() returns correct format'
    );
    
    assertTrue(user.isActive(), 'User.isActive() returns true');
    
    // Static method
    assertTrue(User.validateEmail("test@example.com"), 'Valid email passes');
    assertFalse(User.validateEmail("invalid"), 'Invalid email without @ fails');
    assertFalse(User.validateEmail("test@com"), 'Invalid email without . fails');
    assertTrue(User.validateEmail("a@b.c"), 'Minimal valid email passes');
    
    // Getter
    assertTrue(
        typeof user.joinDate === 'string' && user.joinDate.includes('T'),
        'joinDate getter returns ISO string'
    );

    // =========================================================================
    // Admin Tests
    // =========================================================================
    console.log('\n📋 ADMIN CLASS TESTS');
    console.log('-'.repeat(40));

    const admin = new Admin("sarah", "sarah@admin.com", 3);
    
    assertEqual(admin.username, "sarah", 'Admin inherits username');
    assertEqual(admin.email, "sarah@admin.com", 'Admin inherits email');
    assertEqual(admin.accessLevel, 3, 'Admin stores accessLevel');
    assertTrue(Array.isArray(admin.permissions), 'Admin has permissions array');
    
    assertEqual(
        admin.getInfo(),
        "Admin: sarah (sarah@admin.com) [Level 3]",
        'Admin.getInfo() overrides with correct format'
    );
    
    // Permission methods
    const returned = admin.addPermission("delete");
    assertTrue(returned === admin, 'addPermission returns this for chaining');
    
    admin.addPermission("edit").addPermission("create");
    assertTrue(admin.hasPermission("delete"), 'hasPermission finds delete');
    assertTrue(admin.hasPermission("edit"), 'hasPermission finds edit');
    assertFalse(admin.hasPermission("admin"), 'hasPermission returns false for missing');
    
    // Access level
    assertTrue(admin.canAccess(3), 'canAccess with equal level');
    assertTrue(admin.canAccess(1), 'canAccess with lower level');
    assertFalse(admin.canAccess(5), 'canAccess fails for higher level');
    
    // Static method
    const superAdmin = Admin.createSuperAdmin("root", "root@admin.com");
    assertEqual(superAdmin.accessLevel, 5, 'createSuperAdmin creates level 5');
    assertTrue(superAdmin instanceof Admin, 'createSuperAdmin returns Admin instance');
    
    // Inheritance
    assertTrue(admin instanceof Admin, 'admin instanceof Admin');
    assertTrue(admin instanceof User, 'admin instanceof User');
    assertTrue(admin.isActive(), 'Admin inherits isActive()');

    // =========================================================================
    // Guest Tests
    // =========================================================================
    console.log('\n📋 GUEST CLASS TESTS');
    console.log('-'.repeat(40));

    const guest = new Guest("abc123");
    
    assertEqual(guest.username, "guest_abc123", 'Guest generates username');
    assertEqual(guest.email, null, 'Guest email is null');
    assertEqual(guest.sessionId, "abc123", 'Guest stores sessionId');
    
    assertEqual(
        guest.getInfo(),
        "Guest: guest_abc123 (Session: abc123)",
        'Guest.getInfo() returns correct format'
    );
    
    // Session timing
    assertTrue(guest.isActive(), 'New guest is active');
    assertTrue(guest.remainingTime > 0, 'remainingTime is positive');
    assertTrue(guest.remainingTime <= 3600000, 'remainingTime is at most 1 hour');
    
    // Extend session
    const beforeExtend = guest.expiresAt;
    guest.extendSession(1000);
    assertEqual(guest.expiresAt, beforeExtend + 1000, 'extendSession adds time');
    
    // Expired guest simulation
    const expiredGuest = new Guest("expired");
    expiredGuest.expiresAt = Date.now() - 1000; // Set to past
    assertFalse(expiredGuest.isActive(), 'Expired guest is not active');
    assertEqual(expiredGuest.remainingTime, 0, 'Expired guest has 0 remainingTime');
    
    // Inheritance
    assertTrue(guest instanceof Guest, 'guest instanceof Guest');
    assertTrue(guest instanceof User, 'guest instanceof User');
    assertTrue(typeof guest.joinDate === 'string', 'Guest inherits joinDate getter');

    // =========================================================================
    // Prototype Chain Verification
    // =========================================================================
    console.log('\n📋 INHERITANCE CHAIN TESTS');
    console.log('-'.repeat(40));

    assertTrue(
        Object.getPrototypeOf(Admin.prototype) === User.prototype,
        'Admin.prototype inherits from User.prototype'
    );
    assertTrue(
        Object.getPrototypeOf(Guest.prototype) === User.prototype,
        'Guest.prototype inherits from User.prototype'
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
