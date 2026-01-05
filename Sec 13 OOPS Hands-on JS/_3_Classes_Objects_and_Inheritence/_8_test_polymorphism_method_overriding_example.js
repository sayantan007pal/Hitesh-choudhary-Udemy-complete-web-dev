/**
 * Test Suite for Polymorphism and Method Overriding
 * ==================================================
 * 
 * Run this file with: node _8_test_polymorphism_method_overriding_example.js
 */

const {
    Shape,
    Circle,
    Rectangle,
    Triangle,
    Square,
    calculateTotalArea,
    PaymentMethod,
    CreditCard,
    PayPal,
    BankTransfer,
    Cryptocurrency,
    PaymentProcessor,
    ConsoleLogger,
    FileLogger,
    RemoteLogger,
    MultiLogger,
    logToAll,
    Animal,
    Dog,
    Cat,
    Bird,
    Snake,
    Zoo
} = require('./_8_polymorphism_method_overriding_example.js');

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

function assertArrayLength(arr, length, testName) {
    totalTests++;
    if (arr && arr.length === length) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected length: ${length}`);
        console.log(`   Actual length:   ${arr ? arr.length : 'undefined'}`);
        testsFailed++;
        return false;
    }
}

function assertIncludes(str, substring, testName) {
    totalTests++;
    if (str && str.includes(substring)) {
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

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Polymorphism & Method Overriding Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: Shape Polymorphism
    // =========================================================================
    console.log('\n📋 TASK 1: Shape Polymorphism');
    console.log('-'.repeat(40));

    // Test 1.1: Base Shape throws for abstract methods
    const baseShape = new Shape("Base");
    assertThrows(
        () => baseShape.getArea(),
        "not implemented",
        'Shape.getArea() throws "not implemented"'
    );
    assertThrows(
        () => baseShape.getPerimeter(),
        "not implemented",
        'Shape.getPerimeter() throws "not implemented"'
    );

    // Test 1.2: Circle
    const circle = new Circle(5);
    assertApproxEqual(circle.getArea(), Math.PI * 25, 'Circle area: π * r²');
    assertApproxEqual(circle.getPerimeter(), 2 * Math.PI * 5, 'Circle perimeter: 2πr');
    assertTrue(circle instanceof Shape, 'Circle is instance of Shape');
    assertTrue(circle instanceof Circle, 'Circle is instance of Circle');

    // Test 1.3: Rectangle
    const rect = new Rectangle(4, 6);
    assertEqual(rect.getArea(), 24, 'Rectangle area: 4 * 6 = 24');
    assertEqual(rect.getPerimeter(), 20, 'Rectangle perimeter: 2*(4+6) = 20');
    assertTrue(rect instanceof Shape, 'Rectangle is instance of Shape');

    // Test 1.4: Triangle (Heron's formula)
    const triangle = new Triangle(3, 4, 5);  // Right triangle
    assertEqual(triangle.getArea(), 6, 'Triangle area (3-4-5 right triangle): 6');
    assertEqual(triangle.getPerimeter(), 12, 'Triangle perimeter: 3+4+5 = 12');
    assertTrue(triangle instanceof Shape, 'Triangle is instance of Shape');

    // Test 1.5: Square extends Rectangle
    const square = new Square(4);
    assertEqual(square.getArea(), 16, 'Square area: 4² = 16');
    assertEqual(square.getPerimeter(), 16, 'Square perimeter: 4*4 = 16');
    assertTrue(square instanceof Rectangle, 'Square is instance of Rectangle');
    assertTrue(square instanceof Shape, 'Square is instance of Shape');

    // Test 1.6: describe() works polymorphically
    const circleDesc = circle.describe();
    assertIncludes(circleDesc, "Circle", 'Circle describe includes name');
    assertIncludes(circleDesc, "Area", 'Circle describe includes Area');

    // Test 1.7: calculateTotalArea - polymorphism in action
    const shapes = [
        new Circle(1),      // π
        new Rectangle(2, 3), // 6
        new Square(2)       // 4
    ];
    const totalArea = calculateTotalArea(shapes);
    assertApproxEqual(totalArea, Math.PI + 6 + 4, 'calculateTotalArea sums all shapes');

    // Test 1.8: Empty array
    assertEqual(calculateTotalArea([]), 0, 'calculateTotalArea([]) = 0');

    // =========================================================================
    // Task 2 Tests: Payment Method Polymorphism
    // =========================================================================
    console.log('\n📋 TASK 2: Payment Method Polymorphism');
    console.log('-'.repeat(40));

    // Test 2.1: CreditCard
    const card = new CreditCard("1234567890123456", "12/25", "123", "John Doe");
    assertTrue(card.validate(), 'Valid credit card passes validation');
    const cardResult = card.processPayment(100);
    assertEqual(cardResult.success, true, 'CreditCard payment success');
    assertEqual(cardResult.method, "Credit Card", 'CreditCard method name');
    assertEqual(cardResult.amount, 100, 'CreditCard amount correct');
    assertEqual(cardResult.last4, "3456", 'CreditCard last4 digits');
    assertIncludes(card.getDetails(), "3456", 'CreditCard details shows last4');
    assertIncludes(card.getDetails(), "****", 'CreditCard details is masked');

    // Test 2.2: Invalid CreditCard
    const invalidCard = new CreditCard("123", "12/25", "123", "Test");
    assertFalse(invalidCard.validate(), 'Invalid card number fails validation');

    // Test 2.3: PayPal
    const paypal = new PayPal("john@example.com", "password");
    assertTrue(paypal.validate(), 'Valid PayPal passes validation');
    const paypalResult = paypal.processPayment(50);
    assertEqual(paypalResult.method, "PayPal", 'PayPal method name');
    assertEqual(paypalResult.email, "john@example.com", 'PayPal email in result');

    // Test 2.4: BankTransfer
    const bank = new BankTransfer("12345678", "87654321", "Chase");
    assertTrue(bank.validate(), 'Valid bank transfer passes validation');
    const bankResult = bank.processPayment(200);
    assertEqual(bankResult.method, "Bank Transfer", 'Bank method name');
    assertEqual(bankResult.bank, "Chase", 'Bank name in result');

    // Test 2.5: Cryptocurrency
    const crypto = new Cryptocurrency("0x1234567890abcdef1234567890abcdef", "ETH");
    assertTrue(crypto.validate(), 'Valid crypto passes validation');
    const cryptoResult = crypto.processPayment(0.5);
    assertEqual(cryptoResult.method, "Crypto", 'Crypto method name');
    assertEqual(cryptoResult.coinType, "ETH", 'Crypto coin type');

    // Test 2.6: PaymentProcessor - polymorphism
    const processor1 = new PaymentProcessor(card);
    const checkout1 = processor1.checkout(100);
    assertEqual(checkout1.success, true, 'Processor with CreditCard works');

    const processor2 = new PaymentProcessor(paypal);
    const checkout2 = processor2.checkout(50);
    assertEqual(checkout2.success, true, 'Processor with PayPal works');

    // Test 2.7: PaymentProcessor with invalid method
    const processor3 = new PaymentProcessor(invalidCard);
    assertThrows(
        () => processor3.checkout(100),
        undefined,
        'Processor throws for invalid payment method'
    );

    // =========================================================================
    // Task 3 Tests: Duck Typing Loggers
    // =========================================================================
    console.log('\n📋 TASK 3: Duck Typing Loggers');
    console.log('-'.repeat(40));

    // Test 3.1: ConsoleLogger
    const consoleLogger = new ConsoleLogger();
    consoleLogger.log("Test message");
    assertArrayLength(consoleLogger.getLogs(), 1, 'ConsoleLogger has 1 log');
    assertEqual(consoleLogger.getLogs()[0], "Test message", 'ConsoleLogger stores message');

    // Test 3.2: FileLogger
    const fileLogger = new FileLogger("app.log");
    fileLogger.log("File log");
    const fileLogs = fileLogger.getLogs();
    assertArrayLength(fileLogs, 1, 'FileLogger has 1 log');
    assertIncludes(fileLogs[0], "File log", 'FileLogger includes message');
    assertIncludes(fileLogs[0], "app.log", 'FileLogger includes filename');

    // Test 3.3: RemoteLogger
    const remoteLogger = new RemoteLogger("https://logs.example.com");
    remoteLogger.log("Remote log");
    const remoteLogs = remoteLogger.getLogs();
    assertIncludes(remoteLogs[0], "Remote log", 'RemoteLogger includes message');

    // Test 3.4: MultiLogger
    const console1 = new ConsoleLogger();
    const console2 = new ConsoleLogger();
    const multi = new MultiLogger(console1, console2);
    multi.log("Multi log");
    assertEqual(console1.getLogs()[0], "Multi log", 'MultiLogger logs to first logger');
    assertEqual(console2.getLogs()[0], "Multi log", 'MultiLogger logs to second logger');

    // Test 3.5: logToAll - duck typing
    const logger1 = new ConsoleLogger();
    const logger2 = new FileLogger("test.log");
    logToAll([logger1, logger2], "Duck typed message");
    assertArrayLength(logger1.getLogs(), 1, 'logToAll works with ConsoleLogger');
    assertArrayLength(logger2.getLogs(), 1, 'logToAll works with FileLogger');

    // Test 3.6: Duck typing with custom object (no class needed!)
    const customLogger = {
        logs: [],
        log(msg) { this.logs.push(msg); },
        getLogs() { return this.logs; }
    };
    logToAll([customLogger], "Custom duck typed");
    assertEqual(customLogger.getLogs()[0], "Custom duck typed", 'logToAll works with plain object');

    // Test 3.7: Clear logs
    logger1.clear();
    assertArrayLength(logger1.getLogs(), 0, 'clear() removes all logs');

    // =========================================================================
    // Task 4 Tests: Animal Sound Polymorphism
    // =========================================================================
    console.log('\n📋 TASK 4: Animal Sound Polymorphism');
    console.log('-'.repeat(40));

    // Test 4.1: Dog
    const dog = new Dog("Rex", 5);
    assertEqual(dog.speak(), "Woof!", 'Dog speaks Woof!');
    assertEqual(dog.fetch("ball"), "Rex fetches ball", 'Dog fetches');
    assertEqual(dog.wagTail(), "Rex wags tail happily", 'Dog wags tail');
    assertIncludes(dog.introduce(), "Rex says: Woof!", 'Dog introduce includes speak');

    // Test 4.2: Cat
    const cat = new Cat("Whiskers", 3);
    assertEqual(cat.speak(), "Meow!", 'Cat speaks Meow!');
    assertEqual(cat.scratch(), "Whiskers scratches", 'Cat scratches');
    assertEqual(cat.purr(), "Whiskers purrs contentedly", 'Cat purrs');

    // Test 4.3: Bird
    const bird = new Bird("Tweety", 1);
    assertEqual(bird.speak(), "Tweet!", 'Bird speaks Tweet!');
    assertEqual(bird.fly(), "Tweety flies high", 'Bird flies');
    assertEqual(bird.sing(), "Tweety sings beautifully", 'Bird sings');

    // Test 4.4: Snake
    const snake = new Snake("Kaa", 10);
    assertEqual(snake.speak(), "Hiss!", 'Snake speaks Hiss!');
    assertEqual(snake.slither(), "Kaa slithers silently", 'Snake slithers');
    assertEqual(snake.shed(), "Kaa sheds skin", 'Snake sheds');

    // Test 4.5: Common Animal methods
    assertEqual(dog.eat("bone"), "Rex eats bone", 'Animal eat method');
    assertEqual(cat.sleep(), "Whiskers sleeps", 'Animal sleep method');

    // Test 4.6: All are Animals
    assertTrue(dog instanceof Animal, 'Dog is Animal');
    assertTrue(cat instanceof Animal, 'Cat is Animal');
    assertTrue(bird instanceof Animal, 'Bird is Animal');
    assertTrue(snake instanceof Animal, 'Snake is Animal');

    // Test 4.7: Zoo
    const zoo = new Zoo("City Zoo");
    zoo.addAnimal(dog);
    zoo.addAnimal(cat);
    zoo.addAnimal(bird);
    
    const allAnimals = zoo.getAnimals();
    assertArrayLength(allAnimals, 3, 'Zoo has 3 animals');

    // Test 4.8: makeAllSpeak - polymorphism
    const allSpeech = zoo.makeAllSpeak();
    assertArrayLength(allSpeech, 3, 'makeAllSpeak returns 3 strings');
    assertIncludes(allSpeech[0], "Woof!", 'First animal woofs');
    assertIncludes(allSpeech[1], "Meow!", 'Second animal meows');
    assertIncludes(allSpeech[2], "Tweet!", 'Third animal tweets');

    // Test 4.9: feedAll
    const allFed = zoo.feedAll("treats");
    assertArrayLength(allFed, 3, 'feedAll returns 3 strings');
    assertIncludes(allFed[0], "eats treats", 'Animals eat treats');

    // Test 4.10: findByType
    zoo.addAnimal(new Dog("Buddy", 3));  // Add another dog
    const dogs = zoo.findByType(Dog);
    assertArrayLength(dogs, 2, 'findByType(Dog) returns 2 dogs');
    const cats = zoo.findByType(Cat);
    assertArrayLength(cats, 1, 'findByType(Cat) returns 1 cat');

    // =========================================================================
    // Edge Cases & Polymorphism Deep Dive
    // =========================================================================
    console.log('\n📋 EDGE CASES & POLYMORPHISM');
    console.log('-'.repeat(40));

    // Test E1: Equilateral triangle
    const equi = new Triangle(5, 5, 5);
    assertApproxEqual(
        equi.getArea(),
        (Math.sqrt(3) / 4) * 25,
        'Equilateral triangle area correct'
    );

    // Test E2: Unit circle
    const unitCircle = new Circle(1);
    assertApproxEqual(unitCircle.getArea(), Math.PI, 'Unit circle area = π');
    assertApproxEqual(unitCircle.getPerimeter(), 2 * Math.PI, 'Unit circle perimeter = 2π');

    // Test E3: Mixed shape array with squares and rectangles
    const mixedShapes = [
        new Square(3),      // 9
        new Rectangle(3, 3) // 9 (same as square!)
    ];
    assertApproxEqual(
        calculateTotalArea(mixedShapes),
        18,
        'Square and Rectangle with same dimensions have same area'
    );

    // Test E4: Inheritance chain verification
    assertTrue(
        new Square(1) instanceof Rectangle && new Rectangle(1, 1) instanceof Shape,
        'Square → Rectangle → Shape chain'
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
        console.log('You have mastered Polymorphism and Method Overriding!\n');
    } else {
        console.log('\n💪 Keep going! Review the failed tests and try again.\n');
    }
}

// Run the tests
runTests();
