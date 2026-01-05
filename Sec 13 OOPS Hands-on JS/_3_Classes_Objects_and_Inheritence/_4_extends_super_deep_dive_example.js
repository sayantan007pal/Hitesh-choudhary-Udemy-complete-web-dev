/**
 * The 'extends' and 'super' Keywords Deep Dive
 * ==============================================
 * 
 * This challenge tests your deep understanding of class inheritance,
 * the 'extends' keyword, and various uses of 'super'.
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 * Understanding super() and super.method() is crucial!
 */


// =============================================================================
// Task 1: Multi-Level Inheritance with super()
// =============================================================================
/**
 * Create a 3-level inheritance hierarchy:
 * 
 * 1. `LivingThing` (base class):
 *    - Constructor takes: `name`
 *    - Property: `isAlive` = true
 *    - Method: `describe()` returns "I am [name]"
 * 
 * 2. `Animal` extends `LivingThing`:
 *    - Constructor takes: `name`, `species`
 *    - Must call super() correctly
 *    - Method: `describe()` returns "[parent's describe()], a [species]"
 *    - Method: `makeSound()` returns "Some generic animal sound"
 * 
 * 3. `Dog` extends `Animal`:
 *    - Constructor takes: `name`, `breed`
 *    - Species is always "Canine" (pass to parent)
 *    - Method: `describe()` returns "[parent's describe()], specifically a [breed]"
 *    - Method: `makeSound()` returns "Woof! Woof!"
 *    - Method: `fetch()` returns "[name] fetches the ball!"
 * 
 * Key: Each describe() should USE super.describe() to build upon parent!
 * 
 * Expected Usage:
 *   const buddy = new Dog("Buddy", "Labrador");
 *   buddy.name;         // "Buddy"
 *   buddy.species;      // "Canine"
 *   buddy.breed;        // "Labrador"
 *   buddy.isAlive;      // true
 *   buddy.describe();   // "I am Buddy, a Canine, specifically a Labrador"
 *   buddy.makeSound();  // "Woof! Woof!"
 *   buddy.fetch();      // "Buddy fetches the ball!"
 */

// ==================== YOUR CODE HERE ====================

class LivingThing {
    // TODO: Constructor with name, set isAlive = true
    
    // TODO: describe() method
}

class Animal extends LivingThing {
    // TODO: Constructor with name and species
    // MUST call super(name)!
    
    // TODO: describe() - use super.describe()
    
    // TODO: makeSound()
}

class Dog extends Animal {
    // TODO: Constructor with name and breed
    // Pass "Canine" as species to super()
    
    // TODO: describe() - use super.describe()
    
    // TODO: makeSound() - override
    
    // TODO: fetch()
}

// ========================================================


// =============================================================================
// Task 2: Super in Getters and Setters
// =============================================================================
/**
 * Create classes that demonstrate using super in getters/setters:
 * 
 * 1. `Product` (base class):
 *    - Constructor takes: `name`, `basePrice`
 *    - Getter `price`: returns basePrice
 *    - Setter `price`: sets basePrice (with validation: must be > 0)
 *    - Method: `getInfo()` returns "[name]: $[price]"
 * 
 * 2. `TaxableProduct` extends `Product`:
 *    - Constructor takes: `name`, `basePrice`, `taxRate` (e.g., 0.1 for 10%)
 *    - Getter `price`: returns basePrice + tax (uses super.price to get base)
 *    - Setter `price`: sets basePrice using super.price = value
 *    - Getter `tax`: returns basePrice * taxRate
 *    - Method: `getInfo()` returns "[name]: $[price] (includes $[tax] tax)"
 * 
 * Expected Usage:
 *   const product = new Product("Book", 20);
 *   product.price;      // 20
 *   product.getInfo();  // "Book: $20"
 *   
 *   const taxable = new TaxableProduct("Laptop", 1000, 0.1);
 *   taxable.price;      // 1100 (1000 + 100 tax)
 *   taxable.tax;        // 100
 *   taxable.getInfo();  // "Laptop: $1100 (includes $100 tax)"
 *   
 *   taxable.price = 500;  // Sets base price to 500
 *   taxable.price;        // 550 (500 + 50 tax)
 */

// ==================== YOUR CODE HERE ====================

class Product {
    // TODO: Constructor with name and basePrice (store in private field)
    
    // TODO: get price()
    
    // TODO: set price(value) - validate > 0
    
    // TODO: getInfo()
}

class TaxableProduct extends Product {
    // TODO: Constructor with name, basePrice, taxRate
    
    // TODO: get price() - add tax to super.price
    
    // TODO: set price(value) - use super.price = value
    
    // TODO: get tax()
    
    // TODO: getInfo() - override
}

// ========================================================


// =============================================================================
// Task 3: Diamond Problem Simulation & super.constructor
// =============================================================================
/**
 * JavaScript doesn't have multiple inheritance, but let's understand
 * how super() works in complex scenarios.
 * 
 * Create classes for an Employee hierarchy:
 * 
 * 1. `Person`:
 *    - Constructor takes: `name`, `age`
 *    - Method: `introduce()` returns "Hi, I'm [name], [age] years old"
 * 
 * 2. `Employee` extends `Person`:
 *    - Constructor takes: `name`, `age`, `employeeId`, `department`
 *    - Must call super(name, age)
 *    - Method: `introduce()` returns "[super.introduce()]. I work in [department]"
 *    - Method: `work()` returns "[name] is working"
 * 
 * 3. `Manager` extends `Employee`:
 *    - Constructor takes: `name`, `age`, `employeeId`, `department`, `teamSize`
 *    - Must call super with all required params
 *    - Method: `introduce()` returns "[super.introduce()] managing [teamSize] people"
 *    - Method: `delegate()` returns "[name] delegates tasks to the team"
 * 
 * 4. `Developer` extends `Employee`:
 *    - Constructor takes: `name`, `age`, `employeeId`, `department`, `programmingLanguage`
 *    - Method: `introduce()` returns "[super.introduce()] specializing in [programmingLanguage]"
 *    - Method: `code()` returns "[name] is coding in [programmingLanguage]"
 * 
 * Expected:
 *   const manager = new Manager("Alice", 35, "E001", "Engineering", 10);
 *   manager.introduce(); 
 *   // "Hi, I'm Alice, 35 years old. I work in Engineering managing 10 people"
 *   
 *   const dev = new Developer("Bob", 28, "E002", "Engineering", "JavaScript");
 *   dev.introduce();
 *   // "Hi, I'm Bob, 28 years old. I work in Engineering specializing in JavaScript"
 */

// ==================== YOUR CODE HERE ====================

class Person {
    // TODO: Constructor and introduce()
}

class Employee extends Person {
    // TODO: Constructor, introduce(), and work()
}

class Manager extends Employee {
    // TODO: Constructor, introduce(), and delegate()
}

class Developer extends Employee {
    // TODO: Constructor, introduce(), and code()
}

// ========================================================


// =============================================================================
// Task 4: Static Inheritance
// =============================================================================
/**
 * Static properties and methods are also inherited! Let's explore.
 * 
 * Create classes:
 * 
 * 1. `Shape` (base class):
 *    - Static property: `shapeCount` = 0
 *    - Static method: `getShapeCount()` returns shapeCount
 *    - Constructor increments Shape.shapeCount
 *    - Instance method: `getType()` returns "Shape"
 * 
 * 2. `Circle` extends `Shape`:
 *    - Static property: `circleCount` = 0
 *    - Static method: `getCircleCount()` returns circleCount
 *    - Constructor takes `radius`, increments Circle.circleCount
 *    - Override `getType()` returns "Circle"
 *    - Method: `getArea()` returns π * r²
 * 
 * 3. `Rectangle` extends `Shape`:
 *    - Static property: `rectangleCount` = 0
 *    - Static method: `getRectangleCount()` returns rectangleCount
 *    - Constructor takes `width`, `height`, increments Rectangle.rectangleCount
 *    - Override `getType()` returns "Rectangle"
 *    - Method: `getArea()` returns width * height
 * 
 * Expected:
 *   new Circle(5);
 *   new Circle(10);
 *   new Rectangle(4, 6);
 *   
 *   Shape.getShapeCount();      // 3 (all shapes)
 *   Circle.getShapeCount();     // 3 (inherited static method!)
 *   Circle.getCircleCount();    // 2
 *   Rectangle.getRectangleCount(); // 1
 */

// ==================== YOUR CODE HERE ====================

class Shape {
    // TODO: static shapeCount = 0
    // TODO: static getShapeCount()
    // TODO: constructor increments shapeCount
    // TODO: getType()
}

class Circle extends Shape {
    // TODO: static circleCount = 0
    // TODO: static getCircleCount()
    // TODO: constructor with radius
    // TODO: getType() override
    // TODO: getArea()
}

class Rectangle extends Shape {
    // TODO: static rectangleCount = 0
    // TODO: static getRectangleCount()
    // TODO: constructor with width, height
    // TODO: getType() override
    // TODO: getArea()
}

// ========================================================


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
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
};


// =============================================================================
// 📚 LEARNING NOTES
// =============================================================================
/**
 * SUPER() RULES:
 * =============
 * 1. MUST be called before using 'this' in child constructor
 * 2. Can only be used in derived classes (classes that extend)
 * 3. Automatically passes all necessary context to parent
 * 
 * 
 * SUPER.METHOD() PATTERN:
 * ======================
 * class Child extends Parent {
 *     myMethod() {
 *         const parentResult = super.myMethod();  // Call parent's version
 *         return parentResult + " extra stuff";   // Extend it
 *     }
 * }
 * 
 * 
 * SUPER IN GETTERS/SETTERS:
 * ========================
 * class Child extends Parent {
 *     get value() {
 *         return super.value * 2;  // Access parent's getter
 *     }
 *     set value(v) {
 *         super.value = v;  // Use parent's setter
 *     }
 * }
 * 
 * 
 * STATIC INHERITANCE:
 * ==================
 * - Static methods and properties ARE inherited
 * - Child.staticMethod() works if Parent has it
 * - The prototype chain for classes:
 *   Child -----> Parent -----> Function.prototype
 *   (Child.__proto__ === Parent)
 * 
 * 
 * INTERVIEW TIP:
 * =============
 * "super() in the constructor calls the parent's constructor. It MUST be
 *  called before accessing 'this' because the parent sets up the object.
 *  super.method() calls the parent's version of an overridden method,
 *  allowing you to extend rather than completely replace behavior."
 */
