/**
 * Test Suite for extends and super Keywords
 * ==========================================
 * 
 * Run this file with: node _4_test_extends_super_deep_dive_example.js
 */

const {
    LivingThing,
    Animal,
    Dog,
    Product,
    TaxableProduct,
    Person,
    Employee,
    Manager,
    Developer,
    Shape,
    Circle,
    Rectangle
} = require('./_4_extends_super_deep_dive_example.js');

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

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running extends & super Deep Dive Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // Task 1 Tests: Multi-Level Inheritance
    // =========================================================================
    console.log('\n📋 TASK 1: Multi-Level Inheritance (LivingThing → Animal → Dog)');
    console.log('-'.repeat(40));

    // Test 1.1: LivingThing works
    const thing = new LivingThing("Entity");
    assertEqual(thing.name, "Entity", 'LivingThing.name is correct');
    assertEqual(thing.isAlive, true, 'LivingThing.isAlive is true');
    assertEqual(thing.describe(), "I am Entity", 'LivingThing.describe() works');

    // Test 1.2: Animal inherits and extends
    const cat = new Animal("Whiskers", "Feline");
    assertEqual(cat.name, "Whiskers", 'Animal.name inherited from LivingThing');
    assertEqual(cat.species, "Feline", 'Animal.species is set');
    assertEqual(cat.isAlive, true, 'Animal.isAlive inherited');
    assertEqual(cat.describe(), "I am Whiskers, a Feline", 'Animal.describe() uses super.describe()');
    assertEqual(cat.makeSound(), "Some generic animal sound", 'Animal.makeSound() works');

    // Test 1.3: Animal instanceof checks
    assertTrue(cat instanceof Animal, 'cat is instanceof Animal');
    assertTrue(cat instanceof LivingThing, 'cat is instanceof LivingThing');

    // Test 1.4: Dog full inheritance
    const buddy = new Dog("Buddy", "Labrador");
    assertEqual(buddy.name, "Buddy", 'Dog.name inherited from LivingThing');
    assertEqual(buddy.species, "Canine", 'Dog.species is always "Canine"');
    assertEqual(buddy.breed, "Labrador", 'Dog.breed is set');
    assertEqual(buddy.isAlive, true, 'Dog.isAlive inherited');

    // Test 1.5: Dog.describe() chains all the way up
    assertEqual(
        buddy.describe(),
        "I am Buddy, a Canine, specifically a Labrador",
        'Dog.describe() chains through all parents'
    );

    // Test 1.6: Dog overrides makeSound
    assertEqual(buddy.makeSound(), "Woof! Woof!", 'Dog.makeSound() is overridden');

    // Test 1.7: Dog has own method
    assertEqual(buddy.fetch(), "Buddy fetches the ball!", 'Dog.fetch() works');

    // Test 1.8: Dog instanceof checks
    assertTrue(buddy instanceof Dog, 'buddy is instanceof Dog');
    assertTrue(buddy instanceof Animal, 'buddy is instanceof Animal');
    assertTrue(buddy instanceof LivingThing, 'buddy is instanceof LivingThing');

    // =========================================================================
    // Task 2 Tests: Super in Getters/Setters
    // =========================================================================
    console.log('\n📋 TASK 2: Super in Getters/Setters (Product → TaxableProduct)');
    console.log('-'.repeat(40));

    // Test 2.1: Product basics
    const book = new Product("Book", 20);
    assertEqual(book.name, "Book", 'Product.name is correct');
    assertEqual(book.price, 20, 'Product.price getter works');
    assertEqual(book.getInfo(), "Book: $20", 'Product.getInfo() works');

    // Test 2.2: Product setter
    book.price = 25;
    assertEqual(book.price, 25, 'Product.price setter works');

    // Test 2.3: Product setter validation
    book.price = -10;  // Should be rejected
    assertEqual(book.price, 25, 'Product.price setter rejects negative values');

    // Test 2.4: TaxableProduct basics
    const laptop = new TaxableProduct("Laptop", 1000, 0.1);
    assertEqual(laptop.name, "Laptop", 'TaxableProduct.name is correct');

    // Test 2.5: TaxableProduct price includes tax
    assertEqual(laptop.price, 1100, 'TaxableProduct.price includes tax (1000 + 100)');

    // Test 2.6: TaxableProduct tax getter
    assertEqual(laptop.tax, 100, 'TaxableProduct.tax is 100 (10% of 1000)');

    // Test 2.7: TaxableProduct getInfo()
    assertEqual(
        laptop.getInfo(),
        "Laptop: $1100 (includes $100 tax)",
        'TaxableProduct.getInfo() shows price with tax info'
    );

    // Test 2.8: TaxableProduct setter updates base price
    laptop.price = 500;
    assertEqual(laptop.tax, 50, 'After setting base to 500, tax is 50');
    assertEqual(laptop.price, 550, 'After setting base to 500, total price is 550');

    // Test 2.9: Different tax rates
    const phone = new TaxableProduct("Phone", 100, 0.2);  // 20% tax
    assertEqual(phone.price, 120, '20% tax: $100 + $20 = $120');
    assertEqual(phone.tax, 20, '20% tax on $100 is $20');

    // =========================================================================
    // Task 3 Tests: Employee Hierarchy
    // =========================================================================
    console.log('\n📋 TASK 3: Employee Hierarchy with super()');
    console.log('-'.repeat(40));

    // Test 3.1: Person basics
    const john = new Person("John", 30);
    assertEqual(john.name, "John", 'Person.name is correct');
    assertEqual(john.age, 30, 'Person.age is correct');
    assertEqual(john.introduce(), "Hi, I'm John, 30 years old", 'Person.introduce() works');

    // Test 3.2: Employee extends Person
    const emp = new Employee("Jane", 28, "E001", "Sales");
    assertEqual(emp.name, "Jane", 'Employee.name inherited');
    assertEqual(emp.employeeId, "E001", 'Employee.employeeId is set');
    assertEqual(emp.department, "Sales", 'Employee.department is set');
    assertEqual(
        emp.introduce(),
        "Hi, I'm Jane, 28 years old. I work in Sales",
        'Employee.introduce() extends Person.introduce()'
    );
    assertEqual(emp.work(), "Jane is working", 'Employee.work() works');

    // Test 3.3: Manager extends Employee
    const manager = new Manager("Alice", 35, "E002", "Engineering", 10);
    assertEqual(manager.teamSize, 10, 'Manager.teamSize is set');
    assertEqual(
        manager.introduce(),
        "Hi, I'm Alice, 35 years old. I work in Engineering managing 10 people",
        'Manager.introduce() chains through all parents'
    );
    assertEqual(manager.delegate(), "Alice delegates tasks to the team", 'Manager.delegate() works');
    assertEqual(manager.work(), "Alice is working", 'Manager inherits work() from Employee');

    // Test 3.4: Developer extends Employee
    const dev = new Developer("Bob", 28, "E003", "Engineering", "JavaScript");
    assertEqual(dev.programmingLanguage, "JavaScript", 'Developer.programmingLanguage is set');
    assertEqual(
        dev.introduce(),
        "Hi, I'm Bob, 28 years old. I work in Engineering specializing in JavaScript",
        'Developer.introduce() chains through parents'
    );
    assertEqual(dev.code(), "Bob is coding in JavaScript", 'Developer.code() works');

    // Test 3.5: instanceof checks
    assertTrue(manager instanceof Manager, 'manager instanceof Manager');
    assertTrue(manager instanceof Employee, 'manager instanceof Employee');
    assertTrue(manager instanceof Person, 'manager instanceof Person');
    assertTrue(dev instanceof Developer, 'dev instanceof Developer');
    assertTrue(dev instanceof Employee, 'dev instanceof Employee');

    // =========================================================================
    // Task 4 Tests: Static Inheritance
    // =========================================================================
    console.log('\n📋 TASK 4: Static Inheritance');
    console.log('-'.repeat(40));

    // Reset counters for clean test
    Shape.shapeCount = 0;
    Circle.circleCount = 0;
    Rectangle.rectangleCount = 0;

    // Test 4.1: Create shapes and check counts
    const c1 = new Circle(5);
    assertEqual(Shape.getShapeCount(), 1, 'After 1 Circle: Shape count is 1');
    assertEqual(Circle.getCircleCount(), 1, 'After 1 Circle: Circle count is 1');

    const c2 = new Circle(10);
    assertEqual(Shape.getShapeCount(), 2, 'After 2 Circles: Shape count is 2');
    assertEqual(Circle.getCircleCount(), 2, 'After 2 Circles: Circle count is 2');

    const r1 = new Rectangle(4, 6);
    assertEqual(Shape.getShapeCount(), 3, 'After 2 Circles + 1 Rectangle: Shape count is 3');
    assertEqual(Rectangle.getRectangleCount(), 1, 'Rectangle count is 1');

    // Test 4.2: Static methods are inherited
    assertEqual(
        Circle.getShapeCount(),
        Shape.getShapeCount(),
        'Circle inherits getShapeCount() from Shape'
    );
    assertEqual(
        Rectangle.getShapeCount(),
        Shape.getShapeCount(),
        'Rectangle inherits getShapeCount() from Shape'
    );

    // Test 4.3: getType() overrides
    assertEqual(c1.getType(), "Circle", 'Circle.getType() is overridden');
    assertEqual(r1.getType(), "Rectangle", 'Rectangle.getType() is overridden');

    // Test 4.4: Circle area (π * r²)
    assertApproxEqual(c1.getArea(), Math.PI * 25, 'Circle(5).getArea() = π * 25');
    assertApproxEqual(c2.getArea(), Math.PI * 100, 'Circle(10).getArea() = π * 100');

    // Test 4.5: Rectangle area
    assertEqual(r1.getArea(), 24, 'Rectangle(4,6).getArea() = 24');

    const r2 = new Rectangle(3, 7);
    assertEqual(r2.getArea(), 21, 'Rectangle(3,7).getArea() = 21');

    // Test 4.6: instanceof checks
    assertTrue(c1 instanceof Circle, 'c1 instanceof Circle');
    assertTrue(c1 instanceof Shape, 'c1 instanceof Shape');
    assertTrue(r1 instanceof Rectangle, 'r1 instanceof Rectangle');
    assertTrue(r1 instanceof Shape, 'r1 instanceof Shape');

    // =========================================================================
    // Edge Cases
    // =========================================================================
    console.log('\n📋 EDGE CASES');
    console.log('-'.repeat(40));

    // Test E1: Empty strings in names
    const emptyDog = new Dog("", "Unknown");
    assertEqual(emptyDog.describe(), "I am , a Canine, specifically a Unknown", 'Handles empty name');

    // Test E2: Zero tax rate
    const noTax = new TaxableProduct("Free", 100, 0);
    assertEqual(noTax.price, 100, 'Zero tax rate: price equals base');
    assertEqual(noTax.tax, 0, 'Zero tax rate: tax is 0');

    // Test E3: Circle with radius 0
    Circle.circleCount = 0;  // Reset
    const zeroCircle = new Circle(0);
    assertEqual(zeroCircle.getArea(), 0, 'Circle(0) has area 0');

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
        console.log('You have mastered extends and super keywords!\n');
    } else {
        console.log('\n💪 Keep going! Review the failed tests and try again.\n');
    }
}

// Run the tests
runTests();
