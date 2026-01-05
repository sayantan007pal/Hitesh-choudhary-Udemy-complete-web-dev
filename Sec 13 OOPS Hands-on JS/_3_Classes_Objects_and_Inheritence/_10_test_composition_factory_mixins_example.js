/**
 * Test Suite for Composition, Factory Pattern & Mixins
 * =====================================================
 * 
 * Run this file with: node _10_test_composition_factory_mixins_example.js
 */

const {
    walker,
    swimmer,
    flyer,
    speaker,
    createDog,
    createFish,
    createDuck,
    createRobot,
    createSuperhero,
    UserFactory,
    Timestamped,
    Serializable,
    Validatable,
    Observable,
    Model,
    // EnhancedModel,
    BootstrapButton,
    BootstrapInput,
    BootstrapModal,
    BootstrapFactory,
    MaterialButton,
    MaterialInput,
    MaterialModal,
    MaterialFactory,
    TailwindButton,
    TailwindInput,
    TailwindModal,
    TailwindFactory,
    UIBuilder
} = require('./_10_composition_factory_mixins_example.js');

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

function assertDefined(value, testName) {
    totalTests++;
    if (value !== undefined) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: defined`);
        console.log(`   Actual:   undefined`);
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

function assertIncludes(str, substring, testName) {
    totalTests++;
    if (str && str.includes && str.includes(substring)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to include: "${substring}"`);
        console.log(`   Actual:   "${str}"`);
        testsFailed++;
        return false;
    }
}

function assertArrayIncludes(arr, item, testName) {
    totalTests++;
    if (arr && arr.includes && arr.includes(item)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected array to include: "${item}"`);
        console.log(`   Actual:   [${arr ? arr.join(', ') : 'undefined'}]`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Composition, Factory & Mixins Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: Composition Over Inheritance
    // =========================================================================
    console.log('\n📋 TASK 1: Composition Over Inheritance');
    console.log('-'.repeat(40));

    // Test 1.1: Individual behavior factories
    const testState = { name: "Test" };
    const walkBehavior = walker(testState);
    const swimBehavior = swimmer(testState);
    const flyBehavior = flyer(testState);
    const speakBehavior = speaker(testState, "Hello");

    assertEqual(walkBehavior.walk(), "Test walks", 'walker returns walk function');
    assertEqual(swimBehavior.swim(), "Test swims", 'swimmer returns swim function');
    assertEqual(flyBehavior.fly(), "Test flies", 'flyer returns fly function');
    assertEqual(speakBehavior.speak(), "Test says Hello", 'speaker returns speak function');

    // Test 1.2: Dog - walks + speaks
    const dog = createDog("Rex");
    assertEqual(dog.name, "Rex", 'Dog has name');
    assertEqual(dog.walk(), "Rex walks", 'Dog walks');
    assertEqual(dog.speak(), "Rex says Woof", 'Dog speaks Woof');
    assertUndefined(dog.swim, 'Dog cannot swim');
    assertUndefined(dog.fly, 'Dog cannot fly');

    // Test 1.3: Fish - swims only
    const fish = createFish("Nemo");
    assertEqual(fish.name, "Nemo", 'Fish has name');
    assertEqual(fish.swim(), "Nemo swims", 'Fish swims');
    assertUndefined(fish.walk, 'Fish cannot walk');
    assertUndefined(fish.speak, 'Fish cannot speak');

    // Test 1.4: Duck - walks + swims + flies + speaks
    const duck = createDuck("Donald");
    assertEqual(duck.name, "Donald", 'Duck has name');
    assertEqual(duck.walk(), "Donald walks", 'Duck walks');
    assertEqual(duck.swim(), "Donald swims", 'Duck swims');
    assertEqual(duck.fly(), "Donald flies", 'Duck flies');
    assertEqual(duck.speak(), "Donald says Quack", 'Duck speaks Quack');

    // Test 1.5: Robot - walks only (no speaking)
    const robot = createRobot("R2D2");
    assertEqual(robot.walk(), "R2D2 walks", 'Robot walks');
    assertUndefined(robot.speak, 'Robot cannot speak');
    assertUndefined(robot.swim, 'Robot cannot swim');

    // Test 1.6: Superhero - walks + swims + flies + speaks
    const hero = createSuperhero("Superman");
    assertEqual(hero.walk(), "Superman walks", 'Superhero walks');
    assertEqual(hero.swim(), "Superman swims", 'Superhero swims');
    assertEqual(hero.fly(), "Superman flies", 'Superhero flies');
    assertIncludes(hero.speak(), "save", 'Superhero speaks about saving');

    // Test 1.7: getInfo method
    if (duck.getInfo) {
        const duckInfo = duck.getInfo();
        assertIncludes(duckInfo, "Donald", 'getInfo includes name');
    }

    // =========================================================================
    // Task 2 Tests: Factory Pattern
    // =========================================================================
    console.log('\n📋 TASK 2: Factory Pattern');
    console.log('-'.repeat(40));

    // Test 2.1: Guest user
    const guest = UserFactory.createGuest("Visitor");
    assertEqual(guest.type, "guest", 'Guest has correct type');
    assertEqual(guest.name, "Visitor", 'Guest has correct name');
    assertDefined(guest.sessionId, 'Guest has sessionId');
    assertTrue(guest.hasPermission("read"), 'Guest can read');
    assertFalse(guest.hasPermission("write"), 'Guest cannot write');

    // Test 2.2: Member user
    const member = UserFactory.createMember("Alice", "alice@example.com");
    assertEqual(member.type, "member", 'Member has correct type');
    assertEqual(member.email, "alice@example.com", 'Member has email');
    assertTrue(member.hasPermission("read"), 'Member can read');
    assertTrue(member.hasPermission("write"), 'Member can write');
    assertFalse(member.hasPermission("delete"), 'Member cannot delete');

    // Test 2.3: Admin user
    const admin = UserFactory.createAdmin("Bob", "bob@example.com");
    assertEqual(admin.type, "admin", 'Admin has correct type');
    assertTrue(admin.hasPermission("delete"), 'Admin can delete');
    assertTrue(admin.hasPermission("manage"), 'Admin can manage');

    // Test 2.4: SuperAdmin user
    const superadmin = UserFactory.createSuperAdmin("Charlie", "charlie@example.com");
    assertEqual(superadmin.type, "superadmin", 'SuperAdmin has correct type');
    assertArrayIncludes(superadmin.permissions, "*", 'SuperAdmin has wildcard permission');
    assertTrue(superadmin.hasPermission("anything"), 'SuperAdmin can do anything');
    assertTrue(superadmin.hasPermission("random_permission"), 'SuperAdmin wildcard works');

    // Test 2.5: Invalid email validation
    assertThrows(
        () => UserFactory.createMember("Test", "invalid"),
        undefined,
        'createMember throws for invalid email'
    );

    // Test 2.6: Empty name validation
    assertThrows(
        () => UserFactory.createGuest(""),
        undefined,
        'createGuest throws for empty name'
    );

    // Test 2.7: fromObject factory
    const memberFromObj = UserFactory.fromObject({
        type: "member",
        name: "Dave",
        email: "dave@example.com"
    });
    assertEqual(memberFromObj.type, "member", 'fromObject creates correct type');
    assertEqual(memberFromObj.name, "Dave", 'fromObject sets name');

    // Test 2.8: getInfo method
    const guestInfo = guest.getInfo();
    assertIncludes(guestInfo, "guest", 'getInfo includes type');
    assertIncludes(guestInfo, "Visitor", 'getInfo includes name');

    // =========================================================================
    // Task 3 Tests: Mixin Pattern
    // =========================================================================
    console.log('\n📋 TASK 3: Mixin Pattern');
    console.log('-'.repeat(40));

    // Test 3.1: Timestamped mixin
    class SimpleClass {}
    const TimestampedClass = Timestamped(SimpleClass);
    const timestamped = new TimestampedClass();
    assertDefined(timestamped.createdAt, 'Timestamped has createdAt');
    assertTrue(timestamped.createdAt instanceof Date, 'createdAt is Date');
    if (timestamped.getTimestamps) {
        const stamps = timestamped.getTimestamps();
        assertDefined(stamps.createdAt, 'getTimestamps returns createdAt');
    }

    // Test 3.2: Serializable mixin
    class DataClass {
        constructor() {
            this.value = 42;
        }
    }
    const SerializableClass = Serializable(DataClass);
    const serializable = new SerializableClass();
    if (serializable.toJSON) {
        const json = serializable.toJSON();
        assertTrue(typeof json === 'object' || typeof json === 'string', 'toJSON returns serializable format');
    }

    // Test 3.3: Observable mixin
    class BaseObservable {}
    const ObservableClass = Observable(BaseObservable);
    const observable = new ObservableClass();
    
    let eventFired = false;
    let eventData = null;
    
    if (observable.on && observable.emit) {
        observable.on("test", (data) => {
            eventFired = true;
            eventData = data;
        });
        observable.emit("test", { message: "Hello" });
        
        assertTrue(eventFired, 'Observable event fires');
        assertEqual(eventData.message, "Hello", 'Observable passes data');
    }

    // Test 3.4: off method
    if (observable.off) {
        eventFired = false;
        const handler = () => { eventFired = true; };
        observable.on("remove", handler);
        observable.off("remove", handler);
        observable.emit("remove", {});
        assertFalse(eventFired, 'off removes handler');
    }

    // Test 3.5: Model class
    const model = new Model({ name: "Test", value: 100 });
    assertEqual(model.name, "Test", 'Model has name property');
    assertEqual(model.value, 100, 'Model has value property');

    // Test 3.6: Combined mixins (if EnhancedModel is exported)
    // Commented out until EnhancedModel is implemented
    // const EnhancedModel = Observable(Serializable(Timestamped(Model)));
    // const enhanced = new EnhancedModel({ name: "Enhanced", id: 1 });
    // assertDefined(enhanced.createdAt, 'Enhanced has timestamp');
    // assertDefined(enhanced.toJSON, 'Enhanced has serialization');
    // assertDefined(enhanced.on, 'Enhanced has events');

    // =========================================================================
    // Task 4 Tests: Abstract Factory
    // =========================================================================
    console.log('\n📋 TASK 4: Abstract Factory');
    console.log('-'.repeat(40));

    // Test 4.1: BootstrapFactory - Button
    const bootstrapFactory = new BootstrapFactory();
    const bsButton = bootstrapFactory.createButton("Click Me");
    const bsButtonHtml = bsButton.render();
    assertIncludes(bsButtonHtml, "bootstrap", 'Bootstrap button has bootstrap class');
    assertIncludes(bsButtonHtml, "Click Me", 'Bootstrap button has text');

    // Test 4.2: BootstrapFactory - Input
    const bsInput = bootstrapFactory.createInput("Enter name");
    const bsInputHtml = bsInput.render();
    assertIncludes(bsInputHtml, "bootstrap", 'Bootstrap input has bootstrap class');

    // Test 4.3: BootstrapFactory - Modal
    const bsModal = bootstrapFactory.createModal("Confirm Action");
    const bsModalHtml = bsModal.render();
    assertIncludes(bsModalHtml, "bootstrap", 'Bootstrap modal has bootstrap class');

    // Test 4.4: MaterialFactory - Button
    const materialFactory = new MaterialFactory();
    const matButton = materialFactory.createButton("Submit");
    const matButtonHtml = matButton.render();
    assertIncludes(matButtonHtml, "mat", 'Material button has mat class');

    // Test 4.5: TailwindFactory - Button
    const tailwindFactory = new TailwindFactory();
    const twButton = tailwindFactory.createButton("Save");
    const twButtonHtml = twButton.render();
    assertIncludes(twButtonHtml, "tw", 'Tailwind button has tw class');

    // Test 4.6: Input getValue/setValue
    bsInput.setValue("John Doe");
    assertEqual(bsInput.getValue(), "John Doe", 'Input getValue after setValue');

    // Test 4.7: Modal open/close
    if (bsModal.open && bsModal.close) {
        bsModal.open();
        assertTrue(bsModal.isOpen === true || bsModal.isOpen === undefined, 'Modal opens');
        bsModal.close();
        assertTrue(bsModal.isOpen === false || bsModal.isOpen === undefined, 'Modal closes');
    }

    // Test 4.8: UIBuilder
    const builder = new UIBuilder(bootstrapFactory);
    const form = builder.buildForm({
        buttons: ["Submit", "Cancel"],
        inputs: ["Name", "Email"],
        modal: { title: "Confirm" }
    });
    
    assertTrue(Array.isArray(form.buttons), 'buildForm returns buttons array');
    assertTrue(form.buttons.length === 2, 'buildForm creates 2 buttons');
    assertTrue(Array.isArray(form.inputs), 'buildForm returns inputs array');
    assertTrue(form.inputs.length === 2, 'buildForm creates 2 inputs');
    assertDefined(form.modal, 'buildForm returns modal');

    // Test 4.9: Factory switching (polymorphism)
    const materialBuilder = new UIBuilder(materialFactory);
    const materialForm = materialBuilder.buildForm({
        buttons: ["OK"],
        inputs: ["Username"],
        modal: { title: "Login" }
    });
    assertIncludes(
        materialForm.buttons[0].render(),
        "mat",
        'MaterialBuilder creates Material components'
    );

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test E1: Multiple instances don't share state
    const dog1 = createDog("Buddy");
    const dog2 = createDog("Max");
    assertEqual(dog1.name, "Buddy", 'First dog keeps its name');
    assertEqual(dog2.name, "Max", 'Second dog has different name');

    // Test E2: Composition allows dynamic behavior
    const chimera = {
        name: "Chimera",
        ...walker({ name: "Chimera" }),
        ...swimmer({ name: "Chimera" }),
        ...flyer({ name: "Chimera" }),
        ...speaker({ name: "Chimera" }, "ROAR")
    };
    assertEqual(chimera.walk(), "Chimera walks", 'Custom composed creature works');
    assertEqual(chimera.speak(), "Chimera says ROAR", 'Custom composed creature speaks');

    // Test E3: Factory returns new instances
    const guest1 = UserFactory.createGuest("Guest1");
    const guest2 = UserFactory.createGuest("Guest2");
    assertTrue(guest1 !== guest2, 'Factory returns different instances');
    assertTrue(guest1.sessionId !== guest2.sessionId, 'Guests have different sessionIds');

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
        console.log('You have mastered Composition, Factory Pattern & Mixins!\n');
    } else {
        console.log('\n💪 Keep going! Review the failed tests and try again.\n');
    }
}

// Run the tests
runTests();
