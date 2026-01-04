/**
 * Prototypal Inheritance in JavaScript
 * =====================================
 * 
 * JavaScript uses prototypal inheritance where objects can inherit
 * properties and methods from other objects through the prototype chain.
 */


// =============================================================================
// Task 1: Create Inheritance Using Prototypes
// =============================================================================
/**
 * Create a constructor Animal with a method makeSound().
 * Then create a constructor Dog that inherits from Animal and adds a method bark().
 * 
 * Animal:
 *   - Constructor takes 'name' as parameter and stores it
 *   - Has method makeSound() that returns "Some generic sound"
 * 
 * Dog:
 *   - Constructor takes 'name' and 'breed' as parameters
 *   - Inherits from Animal
 *   - Has method bark() that returns "Woof! Woof!"
 *   - makeSound() should still work (inherited from Animal)
 * 
 * Example Usage:
 *   const dog = new Dog("Buddy", "Golden Retriever");
 *   console.log(dog.name);        // "Buddy"
 *   console.log(dog.breed);       // "Golden Retriever"
 *   console.log(dog.makeSound()); // "Some generic sound"
 *   console.log(dog.bark());      // "Woof! Woof!"
 */

function Animal(name) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

// Add makeSound method to Animal prototype
// ==================== YOUR CODE HERE ====================



// ========================================================

function Dog(name, breed) {
    // ==================== YOUR CODE HERE ====================
    // Hint: Call Animal constructor with 'this' context
    
    
    
    // ========================================================
}

// Set up inheritance: Dog.prototype should inherit from Animal.prototype
// ==================== YOUR CODE HERE ====================



// ========================================================

// Add bark method to Dog prototype
// ==================== YOUR CODE HERE ====================



// ========================================================


// =============================================================================
// Task 2: Shape and Rectangle Inheritance
// =============================================================================
/**
 * Create a constructor function Shape that takes 'color' as a parameter
 * and has a method getColor() that returns the color.
 * 
 * Create another constructor Rectangle that inherits from Shape and adds
 * properties 'width' and 'height'. Add a method getArea() to Rectangle
 * that returns the area of the rectangle.
 * 
 * Shape:
 *   - Constructor takes 'color' as parameter
 *   - Has method getColor() that returns the color
 * 
 * Rectangle:
 *   - Constructor takes 'color', 'width', and 'height' as parameters
 *   - Inherits from Shape
 *   - Has method getArea() that returns width * height
 * 
 * Example Usage:
 *   const rect = new Rectangle("blue", 10, 5);
 *   console.log(rect.getColor()); // "blue"
 *   console.log(rect.getArea());  // 50
 *   console.log(rect.width);      // 10
 *   console.log(rect.height);     // 5
 */

function Shape(color) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

// Add getColor method to Shape prototype
// ==================== YOUR CODE HERE ====================



// ========================================================

function Rectangle(color, width, height) {
    // ==================== YOUR CODE HERE ====================
    // Hint: Call Shape constructor with 'this' context
    
    
    
    // ========================================================
}

// Set up inheritance: Rectangle.prototype should inherit from Shape.prototype
// ==================== YOUR CODE HERE ====================



// ========================================================

// Add getArea method to Rectangle prototype
// ==================== YOUR CODE HERE ====================



// ========================================================


// =============================================================================
// Export constructors for testing
// =============================================================================
module.exports = {
    Animal,
    Dog,
    Shape,
    Rectangle
};