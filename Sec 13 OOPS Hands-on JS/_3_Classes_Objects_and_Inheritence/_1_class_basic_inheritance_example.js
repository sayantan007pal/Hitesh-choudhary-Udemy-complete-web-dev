/**
 * Classes, Objects, and Basic Inheritance
 * =========================================
 * 
 * This challenge tests your understanding of ES6 Classes,
 * the 'extends' keyword, 'super()' calls, and method overriding.
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 * This is one of the most common OOP interview topics!
 */


// =============================================================================
// Task 1: Create a Vehicle Class with Inheritance
// =============================================================================
/**
 * Create a class `Vehicle` with:
 * - Constructor that takes `make` and `model` parameters
 * - A method `getDetails()` that returns "Make: [make], Model: [model]"
 * 
 * Create a subclass `Car` that extends `Vehicle`:
 * - Constructor takes `make`, `model`, and `numDoors`
 * - Must call super() correctly
 * - Add a method `startEngine()` that returns "Engine started"
 * - Add a method `getCarDetails()` that returns "Make: [make], Model: [model], Doors: [numDoors]"
 * 
 * Expected Usage:
 *   const myCar = new Car("Toyota", "Camry", 4);
 *   myCar.getDetails();    // "Make: Toyota, Model: Camry"
 *   myCar.startEngine();   // "Engine started"
 *   myCar.getCarDetails(); // "Make: Toyota, Model: Camry, Doors: 4"
 *   myCar instanceof Vehicle; // true
 *   myCar instanceof Car;     // true
 */

// ==================== YOUR CODE HERE ====================

class Vehicle {
    // TODO: Implement constructor with make and model
    
    // TODO: Implement getDetails() method
}

class Car extends Vehicle {
    // TODO: Implement constructor with make, model, and numDoors
    // Don't forget to call super()!
    
    // TODO: Implement startEngine() method
    
    // TODO: Implement getCarDetails() method
}

// ========================================================


// =============================================================================
// Task 2: Method Overriding
// =============================================================================
/**
 * Extend your Vehicle class (you can modify above or create new ones):
 * - Add a method `move()` to Vehicle that returns "The vehicle is moving"
 * - Override the `move()` method in Car to return "The car is driving on the road"
 * - Create another subclass `Motorcycle` that extends Vehicle:
 *   - Constructor takes `make`, `model`, and `hasSidecar` (boolean)
 *   - Override `move()` to return "The motorcycle is speeding on the highway"
 * 
 * This demonstrates POLYMORPHISM - same method name, different behavior!
 * 
 * Expected Usage:
 *   const vehicle = new Vehicle("Generic", "Model");
 *   vehicle.move();  // "The vehicle is moving"
 *   
 *   const car = new Car("Honda", "Civic", 4);
 *   car.move();      // "The car is driving on the road"
 *   
 *   const bike = new Motorcycle("Harley", "Davidson", false);
 *   bike.move();     // "The motorcycle is speeding on the highway"
 */

// ==================== YOUR CODE HERE ====================
// Note: You may need to modify the Vehicle and Car classes above
// to add the move() method, then create Motorcycle class here

class Motorcycle extends Vehicle {
    // TODO: Implement constructor with make, model, and hasSidecar
    
    // TODO: Override move() method
    
    // TODO: Add getSidecarStatus() that returns "Has sidecar" or "No sidecar"
}

// ========================================================


// =============================================================================
// Task 3: Static Methods with instanceof Check
// =============================================================================
/**
 * Add a static method `isVehicle(obj)` to the Vehicle class that:
 * - Returns true if the given object is an instance of Vehicle (or any subclass)
 * - Returns false otherwise
 * 
 * Add another static method `compareByMake(vehicle1, vehicle2)` that:
 * - Returns true if both vehicles have the same make
 * - Returns false otherwise
 * - Should work with Vehicle, Car, Motorcycle, or any subclass
 * 
 * Expected Usage:
 *   Vehicle.isVehicle(new Car("BMW", "X5", 4));     // true
 *   Vehicle.isVehicle(new Motorcycle("Yamaha", "R1", false)); // true
 *   Vehicle.isVehicle({ make: "Fake" });            // false
 *   Vehicle.isVehicle("not a vehicle");             // false
 *   
 *   Vehicle.compareByMake(
 *     new Car("Toyota", "Camry", 4),
 *     new Car("Toyota", "Corolla", 4)
 *   );  // true (same make)
 *   
 *   Vehicle.compareByMake(
 *     new Car("Toyota", "Camry", 4),
 *     new Motorcycle("Honda", "CBR", false)
 *   );  // false (different make)
 */

// ==================== YOUR CODE HERE ====================
// Add static methods to the Vehicle class above
// Look for the comment "// TODO: Add static methods here" or add them yourself

// ========================================================


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    Vehicle,
    Car,
    Motorcycle
};


// =============================================================================
// 📚 LEARNING NOTES
// =============================================================================
/**
 * KEY CONCEPTS TO REMEMBER:
 * 
 * 1. CLASS BASICS:
 *    class ClassName {
 *        constructor(params) { this.prop = params; }
 *        methodName() { return something; }
 *    }
 * 
 * 2. INHERITANCE:
 *    class Child extends Parent {
 *        constructor(params) {
 *            super(parentParams);  // MUST call first!
 *            this.childProp = params;
 *        }
 *    }
 * 
 * 3. METHOD OVERRIDING:
 *    - Child class defines same method name as parent
 *    - Child's version is used when called on child instances
 *    - Can call parent's version with super.methodName()
 * 
 * 4. STATIC METHODS:
 *    static methodName() { ... }
 *    - Called on class: ClassName.methodName()
 *    - Cannot access instance properties (no 'this' for instance data)
 * 
 * 5. INSTANCEOF:
 *    obj instanceof ClassName
 *    - Returns true if obj is an instance of ClassName or any subclass
 *    - Works through the entire prototype chain
 * 
 * INTERVIEW TIP:
 * "Classes in JavaScript are syntactic sugar over constructor functions
 *  and prototypes. Under the hood, they work the same way!"
 */
