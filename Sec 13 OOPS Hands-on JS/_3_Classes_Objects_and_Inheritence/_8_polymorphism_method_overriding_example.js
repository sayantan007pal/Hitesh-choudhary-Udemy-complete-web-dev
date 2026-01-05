/**
 * Polymorphism and Method Overriding
 * ===================================
 * 
 * This challenge tests your understanding of polymorphism,
 * method overriding, duck typing, and interface-like patterns in JavaScript.
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 * Polymorphism is a core OOP concept tested in every interview!
 */


// =============================================================================
// Task 1: Shape Polymorphism - Calculate Areas
// =============================================================================
/**
 * Create a shape hierarchy that demonstrates polymorphism:
 * 
 * Base Class: Shape
 * - name property
 * - getArea(): throws "Method not implemented" (abstract-like)
 * - getPerimeter(): throws "Method not implemented"
 * - describe(): returns "[name]: Area = [area], Perimeter = [perimeter]"
 * 
 * Derived Classes (all override getArea and getPerimeter):
 * 
 * 1. Circle
 *    - Constructor: (radius)
 *    - Area: π * r²
 *    - Perimeter: 2 * π * r
 * 
 * 2. Rectangle
 *    - Constructor: (width, height)
 *    - Area: width * height
 *    - Perimeter: 2 * (width + height)
 * 
 * 3. Triangle
 *    - Constructor: (a, b, c) - three sides
 *    - Area: Heron's formula: √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2
 *    - Perimeter: a + b + c
 * 
 * 4. Square (extends Rectangle!)
 *    - Constructor: (side)
 *    - Inherits from Rectangle with width = height = side
 * 
 * Create a function `calculateTotalArea(shapes)`:
 * - Takes an array of any Shape objects
 * - Returns the sum of all areas
 * - Demonstrates polymorphism: same method call, different behaviors
 * 
 * Expected Usage:
 *   const shapes = [
 *       new Circle(5),
 *       new Rectangle(4, 6),
 *       new Triangle(3, 4, 5),
 *       new Square(4)
 *   ];
 *   calculateTotalArea(shapes);  // Sum of all areas
 *   shapes[0].describe();        // "Circle: Area = 78.54, Perimeter = 31.42"
 */

// ==================== YOUR CODE HERE ====================

class Shape {
    // TODO: Constructor taking name
    
    // TODO: getArea() - throw "Method not implemented"
    
    // TODO: getPerimeter() - throw "Method not implemented"
    
    // TODO: describe() - uses getArea() and getPerimeter()
}

class Circle extends Shape {
    // TODO: Override getArea and getPerimeter
}

class Rectangle extends Shape {
    // TODO: Override getArea and getPerimeter
}

class Triangle extends Shape {
    // TODO: Override getArea and getPerimeter
}

class Square extends Rectangle {
    // TODO: Constructor calls super with side, side
}

function calculateTotalArea(shapes) {
    // TODO: Sum all areas using polymorphism
}

// ========================================================


// =============================================================================
// Task 2: Payment Method Polymorphism
// =============================================================================
/**
 * Create a payment processing system demonstrating polymorphism:
 * 
 * Base Class: PaymentMethod
 * - name property
 * - processPayment(amount): throws "Method not implemented"
 * - validate(): throws "Method not implemented"
 * - getDetails(): throws "Method not implemented"
 * 
 * Derived Classes:
 * 
 * 1. CreditCard
 *    - Constructor: (cardNumber, expiry, cvv, holderName)
 *    - validate(): checks cardNumber is 16 digits, expiry is MM/YY format, cvv is 3 digits
 *    - processPayment(amount): returns { success: true, method: "Credit Card", amount, last4: lastFourDigits }
 *    - getDetails(): returns masked card "****-****-****-1234"
 * 
 * 2. PayPal
 *    - Constructor: (email, password)
 *    - validate(): checks email contains @
 *    - processPayment(amount): returns { success: true, method: "PayPal", amount, email }
 *    - getDetails(): returns email
 * 
 * 3. BankTransfer
 *    - Constructor: (accountNumber, routingNumber, bankName)
 *    - validate(): checks accountNumber and routingNumber are at least 8 digits
 *    - processPayment(amount): returns { success: true, method: "Bank Transfer", amount, bank: bankName }
 *    - getDetails(): returns "[bankName] - ****[last4]"
 * 
 * 4. Cryptocurrency
 *    - Constructor: (walletAddress, coinType)
 *    - validate(): checks walletAddress is at least 26 characters
 *    - processPayment(amount): returns { success: true, method: "Crypto", coinType, amount }
 *    - getDetails(): returns "[coinType]: [first6]...[last4]"
 * 
 * Create class `PaymentProcessor`:
 * - Constructor: (paymentMethod)
 * - checkout(amount): validates, then processes payment
 *   - Throws if validation fails
 *   - Returns payment result
 * 
 * Expected Usage:
 *   const card = new CreditCard("1234567890123456", "12/25", "123", "John Doe");
 *   const processor = new PaymentProcessor(card);
 *   processor.checkout(100);  // { success: true, method: "Credit Card", amount: 100, last4: "3456" }
 */

// ==================== YOUR CODE HERE ====================

class PaymentMethod {
    // TODO: Base class with abstract methods
}

class CreditCard extends PaymentMethod {
    // TODO: Implement credit card payment
}

class PayPal extends PaymentMethod {
    // TODO: Implement PayPal payment
}

class BankTransfer extends PaymentMethod {
    // TODO: Implement bank transfer payment
}

class Cryptocurrency extends PaymentMethod {
    // TODO: Implement crypto payment
}

class PaymentProcessor {
    // TODO: Uses polymorphism to process any PaymentMethod
}

// ========================================================


// =============================================================================
// Task 3: Duck Typing - Logger Interface
// =============================================================================
/**
 * Implement a logging system using duck typing (if it has log(), it's a logger):
 * 
 * Create these "loggers" (no base class needed - duck typing!):
 * 
 * 1. ConsoleLogger
 *    - log(message): stores message in internal array (simulating console)
 *    - getLogs(): returns all logged messages
 *    - clear(): clears logs
 * 
 * 2. FileLogger
 *    - Constructor: (filename)
 *    - log(message): stores message with timestamp and filename prefix
 *    - getLogs(): returns all logged messages
 *    - clear(): clears logs
 * 
 * 3. RemoteLogger
 *    - Constructor: (endpoint)
 *    - log(message): stores message with endpoint info
 *    - getLogs(): returns all logged messages
 *    - clear(): clears logs
 * 
 * 4. MultiLogger
 *    - Constructor: (...loggers) - takes multiple loggers
 *    - log(message): logs to ALL contained loggers
 *    - getLogs(): returns logs from all loggers combined
 *    - clear(): clears all loggers
 * 
 * Create function `logToAll(loggers, message)`:
 * - Takes any array of objects with a log() method
 * - Logs message to all of them
 * - Demonstrates duck typing
 * 
 * Expected Usage:
 *   const console = new ConsoleLogger();
 *   const file = new FileLogger("app.log");
 *   const remote = new RemoteLogger("https://logs.example.com");
 *   
 *   logToAll([console, file, remote], "Application started");
 *   
 *   const multi = new MultiLogger(console, file);
 *   multi.log("Multi log");  // Logs to both console and file
 */

// ==================== YOUR CODE HERE ====================

class ConsoleLogger {
    // TODO: Implement
}

class FileLogger {
    // TODO: Implement
}

class RemoteLogger {
    // TODO: Implement
}

class MultiLogger {
    // TODO: Implement
}

function logToAll(loggers, message) {
    // TODO: Duck typing - just call log() on each
}

// ========================================================


// =============================================================================
// Task 4: Animal Sound Polymorphism with Chaining
// =============================================================================
/**
 * Create an animal hierarchy demonstrating method overriding with chaining:
 * 
 * Base Class: Animal
 * - Constructor: (name, age)
 * - speak(): returns "Some sound" (to be overridden)
 * - eat(food): returns "[name] eats [food]"
 * - sleep(): returns "[name] sleeps"
 * - introduce(): returns "[name] says: [speak()]"
 * 
 * Derived Classes (override speak AND add unique methods):
 * 
 * 1. Dog
 *    - speak(): returns "Woof!"
 *    - fetch(item): returns "[name] fetches [item]"
 *    - wagTail(): returns "[name] wags tail happily"
 * 
 * 2. Cat
 *    - speak(): returns "Meow!"
 *    - scratch(): returns "[name] scratches"
 *    - purr(): returns "[name] purrs contentedly"
 * 
 * 3. Bird
 *    - speak(): returns "Tweet!"
 *    - fly(): returns "[name] flies high"
 *    - sing(): returns "[name] sings beautifully"
 * 
 * 4. Snake
 *    - speak(): returns "Hiss!"
 *    - slither(): returns "[name] slithers silently"
 *    - shed(): returns "[name] sheds skin"
 * 
 * Create class `Zoo`:
 * - Constructor: (name)
 * - addAnimal(animal): adds to zoo
 * - getAnimals(): returns all animals
 * - makeAllSpeak(): returns array of all animals speaking (using introduce())
 * - feedAll(food): returns array of all animals eating
 * - findByType(AnimalClass): returns all animals of that type
 * 
 * Expected Usage:
 *   const zoo = new Zoo("City Zoo");
 *   zoo.addAnimal(new Dog("Rex", 5));
 *   zoo.addAnimal(new Cat("Whiskers", 3));
 *   zoo.addAnimal(new Bird("Tweety", 1));
 *   
 *   zoo.makeAllSpeak();
 *   // ["Rex says: Woof!", "Whiskers says: Meow!", "Tweety says: Tweet!"]
 *   
 *   zoo.findByType(Dog);  // [Dog instance]
 */

// ==================== YOUR CODE HERE ====================

class Animal {
    // TODO: Base class
}

class Dog extends Animal {
    // TODO: Override speak, add fetch, wagTail
}

class Cat extends Animal {
    // TODO: Override speak, add scratch, purr
}

class Bird extends Animal {
    // TODO: Override speak, add fly, sing
}

class Snake extends Animal {
    // TODO: Override speak, add slither, shed
}

class Zoo {
    // TODO: Manage animals polymorphically
}

// ========================================================


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    // Task 1
    Shape,
    Circle,
    Rectangle,
    Triangle,
    Square,
    calculateTotalArea,
    // Task 2
    PaymentMethod,
    CreditCard,
    PayPal,
    BankTransfer,
    Cryptocurrency,
    PaymentProcessor,
    // Task 3
    ConsoleLogger,
    FileLogger,
    RemoteLogger,
    MultiLogger,
    logToAll,
    // Task 4
    Animal,
    Dog,
    Cat,
    Bird,
    Snake,
    Zoo
};


// =============================================================================
// 📚 LEARNING NOTES
// =============================================================================
/**
 * POLYMORPHISM IN JAVASCRIPT:
 * ==========================
 * 
 * Polymorphism = "many forms" - same method behaves differently based on object
 * 
 * class Animal {
 *     speak() { return "Some sound"; }
 * }
 * 
 * class Dog extends Animal {
 *     speak() { return "Woof!"; }  // Override
 * }
 * 
 * class Cat extends Animal {
 *     speak() { return "Meow!"; }  // Override
 * }
 * 
 * // Polymorphism in action:
 * const animals = [new Dog(), new Cat()];
 * animals.forEach(a => console.log(a.speak()));
 * // "Woof!", "Meow!" - same method, different behaviors!
 * 
 * 
 * METHOD OVERRIDING:
 * =================
 * 
 * class Parent {
 *     greet() { return "Hello"; }
 * }
 * 
 * class Child extends Parent {
 *     greet() {
 *         return super.greet() + " World!";  // Call parent + add to it
 *     }
 * }
 * 
 * 
 * DUCK TYPING:
 * ===========
 * 
 * "If it walks like a duck and quacks like a duck, it's a duck"
 * 
 * // No inheritance needed! Just implement the expected interface
 * function makeItSpeak(thing) {
 *     if (typeof thing.speak === 'function') {
 *         return thing.speak();
 *     }
 *     throw new Error("Object cannot speak");
 * }
 * 
 * const duck = { speak: () => "Quack" };
 * const robot = { speak: () => "Beep" };
 * 
 * makeItSpeak(duck);   // "Quack"
 * makeItSpeak(robot);  // "Beep"
 * // Both work! No common base class needed
 * 
 * 
 * ABSTRACT-LIKE METHODS:
 * =====================
 * 
 * class AbstractShape {
 *     getArea() {
 *         throw new Error("Method must be implemented");
 *     }
 * }
 * 
 * class Circle extends AbstractShape {
 *     getArea() {
 *         return Math.PI * this.radius ** 2;  // Must implement!
 *     }
 * }
 * 
 * 
 * POLYMORPHISM BENEFITS:
 * =====================
 * 1. CODE REUSE: Write once, use for all subtypes
 * 2. FLEXIBILITY: Add new types without changing existing code
 * 3. ABSTRACTION: Work with base type, get specific behavior
 * 4. TESTING: Easy to mock/stub for testing
 * 
 * 
 * INTERVIEW TIP:
 * =============
 * "Polymorphism allows objects of different classes to be treated uniformly
 *  through a common interface. In JavaScript, this works through:
 *  1. Class inheritance with method overriding
 *  2. Duck typing - if it has the method, use it
 *  
 *  This enables writing flexible, extensible code where new types can be
 *  added without modifying existing code - the Open/Closed Principle."
 */
