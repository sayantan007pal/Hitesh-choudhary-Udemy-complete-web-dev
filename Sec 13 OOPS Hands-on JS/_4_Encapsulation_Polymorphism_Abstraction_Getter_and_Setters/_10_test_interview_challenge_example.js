/**
 * Test Suite for Interview Challenge #10
 * =======================================
 * 
 * Run this file with: node _10_test_interview_challenge_example.js
 * 
 * Tests your understanding of:
 *   - Prototype chains
 *   - this binding
 *   - Singleton pattern
 *   - Mixins
 *   - Factory vs Constructor
 *   - Observer pattern
 *   - Method borrowing
 *   - Composition over inheritance
 *   - Private field patterns
 */

const {
    Animal,
    Dog,
    prototypeChainAnswers,
    Timer,
    Database,
    Person,
    RectangleConstructor,
    createRectangle,
    RectangleClass,
    patternDifferences,
    EventEmitter,
    demonstrateMethodBorrowing,
    createRobot,
    createFish,
    createBird,
    createAquaBot,
    SecretKeeperModern,
    SecretKeeperWeakMap,
    trickyPrototypeQuestion
} = require('./_10_interview_challenge_example.js');

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
console.log('  INTERVIEW CHALLENGE #10 - TEST SUITE');
console.log('═'.repeat(70) + '\n');

// -----------------------------------------------------------------------------
// Test Section 1: Prototype Chain Understanding
// -----------------------------------------------------------------------------
console.log('🔗 Section 1: Prototype Chain Understanding');
console.log('─'.repeat(50));

const dog = new Dog('Buddy', 'Labrador');

assertEqual(dog.speak(), prototypeChainAnswers.speak, 'Dog.speak() returns correct value');
assertEqual(dog instanceof Dog, prototypeChainAnswers.instanceOfDog, 'instanceof Dog');
assertEqual(dog instanceof Animal, prototypeChainAnswers.instanceOfAnimal, 'instanceof Animal');
assertEqual(dog.hasOwnProperty('name'), prototypeChainAnswers.hasOwnPropertyName, 'hasOwnProperty name');
assertEqual(dog.hasOwnProperty('speak'), prototypeChainAnswers.hasOwnPropertySpeak, 'hasOwnProperty speak');
assertEqual(dog.breed, 'Labrador', 'Dog has breed property');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 2: this Binding - Timer
// -----------------------------------------------------------------------------
console.log('⏱️ Section 2: this Binding - Timer');
console.log('─'.repeat(50));

const timer = new Timer('TestTimer');
assertEqual(timer.name, 'TestTimer', 'Timer has name');
assertEqual(timer.getSeconds(), 0, 'Timer starts at 0');

// Test callback version
const callbackResult = timer.getSecondsCallback();
assertEqual(callbackResult, 0, 'getSecondsCallback returns correct value');

// Note: We can't easily test async behavior in sync tests
// But we verify the methods exist and work synchronously
assertEqual(typeof timer.start, 'function', 'Timer has start method');
assertEqual(typeof timer.stop, 'function', 'Timer has stop method');
assertEqual(typeof timer.reset, 'function', 'Timer has reset method');
assertEqual(typeof timer.onTick, 'function', 'Timer has onTick method');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 3: Singleton Pattern - Database
// -----------------------------------------------------------------------------
console.log('🗄️ Section 3: Singleton Pattern - Database');
console.log('─'.repeat(50));

Database.resetInstance();

const db1 = Database.getInstance('mysql://localhost');
const db2 = Database.getInstance('postgres://localhost');

assertTrue(db1 === db2, 'getInstance returns same instance');

assertThrows(
    () => new Database('new://connection'),
    'already exists',
    'new Database() throws after getInstance'
);

assertFalse(db1.isConnected(), 'Database starts disconnected');
db1.connect();
assertTrue(db1.isConnected(), 'Database connected after connect()');
assertTrue(db2.isConnected(), 'Same instance, so db2 is also connected');

const queryResult = db1.query('SELECT * FROM users');
assertEqual(queryResult.sql, 'SELECT * FROM users', 'Query returns sql');
assertTrue(queryResult.result !== undefined, 'Query returns result');

db1.disconnect();
assertThrows(
    () => db1.query('SELECT 1'),
    'Not connected',
    'Query throws when disconnected'
);

Database.resetInstance();

console.log('');

// -----------------------------------------------------------------------------
// Test Section 4: Mixin Pattern - Person
// -----------------------------------------------------------------------------
console.log('🧬 Section 4: Mixin Pattern - Person');
console.log('─'.repeat(50));

const person1 = new Person('Alice', 30);
const person2 = new Person('Bob', 25);

// Test Serializable mixin
const json = person1.toJSON();
assertTrue(json.includes('Alice'), 'toJSON includes name');
assertTrue(json.includes('30'), 'toJSON includes age');

// Test Comparable mixin
assertTrue(person1.greaterThan(person2), 'Alice (30) > Bob (25)');
assertFalse(person1.lessThan(person2), 'Alice not less than Bob');
assertEqual(person1.compareTo(person2), 1, 'compareTo returns 1 for greater');

const person3 = new Person('Charlie', 30);
assertTrue(person1.equals(person3), 'Same age means equals');

// Test Cloneable mixin
const cloned = person1.clone();
assertEqual(cloned.name, person1.name, 'Clone has same name');
assertEqual(cloned.age, person1.age, 'Clone has same age');
assertFalse(cloned === person1, 'Clone is different object');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 5: Factory vs Constructor vs Class
// -----------------------------------------------------------------------------
console.log('🏗️ Section 5: Factory vs Constructor vs Class Patterns');
console.log('─'.repeat(50));

// Constructor pattern
const rectConst = new RectangleConstructor(10, 5);
assertEqual(rectConst.area(), 50, 'Constructor rectangle area');
assertEqual(rectConst.perimeter(), 30, 'Constructor rectangle perimeter');
assertTrue(rectConst.getType() === 'rectangle', 'Constructor has type');

// Factory pattern
const rectFactory = createRectangle(10, 5);
assertEqual(rectFactory.area(), 50, 'Factory rectangle area');
assertEqual(rectFactory.perimeter(), 30, 'Factory rectangle perimeter');
assertTrue(rectFactory.getType() === 'rectangle', 'Factory has type');

// ES6 Class pattern
const rectClass = new RectangleClass(10, 5);
assertEqual(rectClass.area(), 50, 'Class rectangle area');
assertEqual(rectClass.perimeter(), 30, 'Class rectangle perimeter');
assertTrue(rectClass.getType() === 'rectangle', 'Class has type');

// Verify patternDifferences object exists
assertTrue(Object.keys(patternDifferences).length === 3, 'patternDifferences has 3 patterns');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 6: EventEmitter (Observer Pattern)
// -----------------------------------------------------------------------------
console.log('📡 Section 6: EventEmitter (Observer Pattern)');
console.log('─'.repeat(50));

const emitter = new EventEmitter();
const results = [];

const handler1 = (data) => results.push(`handler1: ${data}`);
const handler2 = (data) => results.push(`handler2: ${data}`);

emitter.on('test', handler1);
emitter.on('test', handler2);

assertEqual(emitter.listenerCount('test'), 2, 'Two listeners registered');

emitter.emit('test', 'hello');
assertEqual(results.length, 2, 'Both handlers called');
assertTrue(results.includes('handler1: hello'), 'Handler1 received data');
assertTrue(results.includes('handler2: hello'), 'Handler2 received data');

emitter.off('test', handler1);
assertEqual(emitter.listenerCount('test'), 1, 'One listener after off');

results.length = 0;
emitter.emit('test', 'world');
assertEqual(results.length, 1, 'Only one handler called');

// Test once
let onceCount = 0;
emitter.once('special', () => onceCount++);
emitter.emit('special');
emitter.emit('special');
assertEqual(onceCount, 1, 'once handler called only once');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 7: Method Borrowing
// -----------------------------------------------------------------------------
console.log('🤝 Section 7: Method Borrowing');
console.log('─'.repeat(50));

const borrowResult = demonstrateMethodBorrowing();

assertEqual(borrowResult.arrayLikeToArray, ['a', 'b', 'c'], 'Array-like converted to array');
assertEqual(borrowResult.mappedArrayLike, ['A', 'B', 'C'], 'Array-like mapped with borrowed method');
assertEqual(borrowResult.typeChecks.array, '[object Array]', 'Type check for array');
assertEqual(borrowResult.typeChecks.object, '[object Object]', 'Type check for object');
assertEqual(borrowResult.typeChecks.null, '[object Null]', 'Type check for null');
assertEqual(borrowResult.borrowedMethodResult, 150, 'Borrowed method modified object');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 8: Composition Over Inheritance
// -----------------------------------------------------------------------------
console.log('🧩 Section 8: Composition Over Inheritance');
console.log('─'.repeat(50));

const robot = createRobot('R2D2');
const fish = createFish('Nemo');
const bird = createBird('Tweety');
const aquaBot = createAquaBot('AquaBot');

// Robot can walk but not swim
assertEqual(robot.getName(), 'R2D2', 'Robot has name');
assertTrue(typeof robot.walk === 'function', 'Robot can walk');
assertTrue(robot.walk !== undefined, 'Robot has walk method');
assertTrue(robot.swim === undefined, 'Robot cannot swim');

// Fish can swim but not walk
assertTrue(typeof fish.swim === 'function', 'Fish can swim');
assertTrue(fish.walk === undefined, 'Fish cannot walk');

// Bird can walk and fly
assertTrue(typeof bird.walk === 'function', 'Bird can walk');
assertTrue(typeof bird.fly === 'function', 'Bird can fly');

// AquaBot can both walk AND swim (composition magic!)
assertTrue(typeof aquaBot.walk === 'function', 'AquaBot can walk');
assertTrue(typeof aquaBot.swim === 'function', 'AquaBot can swim');
assertEqual(aquaBot.getName(), 'AquaBot', 'AquaBot has correct name');

// Test energy (shared behavior)
assertTrue(typeof robot.energy !== 'undefined', 'Robot has energy');
assertTrue(typeof robot.useEnergy === 'function', 'Robot can use energy');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 9: Private Fields Patterns
// -----------------------------------------------------------------------------
console.log('🔐 Section 9: Private Fields Patterns');
console.log('─'.repeat(50));

// ES6 Private Fields
const secret1 = new SecretKeeperModern('mySecretPassword123');
assertEqual(secret1.getHint(), 'my...', 'Modern: getHint returns hint');
assertNull(secret1.reveal('wrong'), 'Modern: wrong password returns null');
assertEqual(secret1.reveal('opensesame'), 'mySecretPassword123', 'Modern: correct password reveals');

// WeakMap Pattern
const secret2 = new SecretKeeperWeakMap('anotherSecret456');
assertEqual(secret2.getHint(), 'an...', 'WeakMap: getHint returns hint');
assertNull(secret2.reveal('wrong'), 'WeakMap: wrong password returns null');
assertEqual(secret2.reveal('opensesame'), 'anotherSecret456', 'WeakMap: correct password reveals');

// Verify private fields are actually private
assertTrue(secret1.secret === undefined, 'Modern: cannot access #secret');
assertTrue(secret2.secret === undefined, 'WeakMap: cannot access secret');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 10: Tricky Prototype Question
// -----------------------------------------------------------------------------
console.log('🧠 Section 10: Tricky Prototype Question');
console.log('─'.repeat(50));

const trickyResults = trickyPrototypeQuestion();

assertTrue(trickyResults.q1_sameFunction, 'Q1: Prototype methods are shared');
assertEqual(trickyResults.q2_afterPrototypeModify, 84, 'Q2: Prototype is live-updated');
assertEqual(trickyResults.q3_a_instanceMethod, 52, 'Q3a: Instance method shadows prototype');
assertEqual(trickyResults.q3_b_stillPrototype, 84, 'Q3b: Other instance uses prototype');
assertEqual(trickyResults.q4_afterDelete, 84, 'Q4: After delete, back to prototype');
assertEqual(trickyResults.q5_a_oldPrototype, 84, 'Q5a: Old instance keeps old prototype');
assertEqual(trickyResults.q5_c_newPrototype, -1, 'Q5c: New instance gets new prototype');

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
    console.log('\n🎉🎉🎉 CONGRATULATIONS! ALL TESTS PASSED! 🎉🎉🎉');
    console.log('\nYou are now INTERVIEW READY on JavaScript OOP!');
    console.log('\n📖 Key Interview Topics Covered:');
    console.log('   ✓ Prototype Chain & instanceof');
    console.log('   ✓ this binding (call, apply, bind, arrow functions)');
    console.log('   ✓ Singleton Pattern');
    console.log('   ✓ Mixin Pattern for multiple inheritance');
    console.log('   ✓ Factory vs Constructor vs Class patterns');
    console.log('   ✓ Observer/EventEmitter Pattern');
    console.log('   ✓ Method Borrowing');
    console.log('   ✓ Composition over Inheritance');
    console.log('   ✓ Private Fields (# syntax vs WeakMap)');
    console.log('   ✓ Tricky prototype behavior\n');
    
    console.log('💡 Interview Tips:');
    console.log('   • Always explain your thought process');
    console.log('   • Draw prototype chains when asked');
    console.log('   • Know when to use each pattern');
    console.log('   • Understand trade-offs between approaches\n');
} else {
    console.log('\n⚠️  Some tests failed. Review the errors above and try again!');
    console.log('💡 Tip: Focus on understanding WHY each answer is correct.\n');
}

process.exit(testsFailed > 0 ? 1 : 0);
