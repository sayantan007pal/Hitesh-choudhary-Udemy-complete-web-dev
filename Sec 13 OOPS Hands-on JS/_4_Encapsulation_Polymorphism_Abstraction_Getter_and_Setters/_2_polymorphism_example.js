/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              POLYMORPHISM IN JAVASCRIPT - CHALLENGE #2                       ║
 * ║                 🎭 Shape Calculator with Method Overriding 🎭                 ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT REVIEW:
 * ━━━━━━━━━━━━━━━━━━━
 * Polymorphism means "many forms" - the same method name can behave differently
 * depending on which object calls it. "One interface, multiple implementations."
 * 
 * Types of Polymorphism in JavaScript:
 *   1. METHOD OVERRIDING → Child class redefines parent's method
 *   2. DUCK TYPING → "If it walks like a duck, quacks like a duck..."
 *   3. METHOD OVERLOADING (simulated) → Same method handles different arguments
 * 
 * 
 * 🎯 YOUR CHALLENGE:
 * ━━━━━━━━━━━━━━━━━━━
 * Create a shape hierarchy demonstrating polymorphism:
 * 
 * 1. Base Class: Shape
 *    - constructor(name)
 *    - area() → returns 0 (to be overridden)
 *    - perimeter() → returns 0 (to be overridden)
 *    - describe() → returns "{name}: Area = {area}, Perimeter = {perimeter}"
 * 
 * 2. Circle (extends Shape)
 *    - constructor(radius)
 *    - Override area() → πr²
 *    - Override perimeter() → 2πr
 *    - getDiameter() → 2r
 * 
 * 3. Rectangle (extends Shape)
 *    - constructor(width, height)
 *    - Override area() → width × height
 *    - Override perimeter() → 2(width + height)
 *    - isSquare() → returns true if width === height
 * 
 * 4. Triangle (extends Shape)
 *    - constructor(base, height, side1, side2, side3)
 *    - Override area() → (base × height) / 2
 *    - Override perimeter() → side1 + side2 + side3
 *    - isEquilateral() → returns true if all sides are equal
 * 
 * 5. Utility Function: calculateTotalArea(shapes)
 *    - Takes an array of Shape objects
 *    - Returns the sum of all their areas
 *    - Demonstrates polymorphism - same method call, different behaviors!
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━━
 * - Use Math.PI for π
 * - Round areas and perimeters to 2 decimal places for comparison
 * - The describe() method uses this.area() which will call the overridden version!
 */


// =============================================================================
// YOUR IMPLEMENTATION HERE
// =============================================================================

class Shape {
    constructor(name) {
        // ==================== YOUR CODE HERE ====================
        this.name = name;
        // ========================================================
    }

    area() {
        // ==================== YOUR CODE HERE ====================
        return 0;
        // ========================================================
    }

    perimeter() {
        // ==================== YOUR CODE HERE ====================
        return 0;
        // ========================================================
    }

    describe() {
        // ==================== YOUR CODE HERE ====================
        // Use toFixed(2) for consistent formatting
        return `${this.name}: Area = ${this.area().toFixed(2)}, Perimeter = ${this.perimeter().toFixed(2)}`;
        // ========================================================
    }
}


class Circle extends Shape {
    constructor(radius) {
        // ==================== YOUR CODE HERE ====================
        super('Circle');
        this.radius = radius;
        // ========================================================
    }

    area() {
        // ==================== YOUR CODE HERE ====================
        return Math.PI * this.radius * this.radius;
        // ========================================================
    }

    perimeter() {
        // ==================== YOUR CODE HERE ====================
        return 2 * Math.PI * this.radius;
        // ========================================================
    }

    getDiameter() {
        // ==================== YOUR CODE HERE ====================
        return 2 * this.radius;
        // ========================================================
    }
}


class Rectangle extends Shape {
    constructor(width, height) {
        // ==================== YOUR CODE HERE ====================
        super('Rectangle');
        this.width = width;
        this.height = height;
        // ========================================================
    }

    area() {
        // ==================== YOUR CODE HERE ====================
        return this.width * this.height;
        // ========================================================
    }

    perimeter() {
        // ==================== YOUR CODE HERE ====================
        return 2 * (this.width + this.height);
        // ========================================================
    }

    isSquare() {
        // ==================== YOUR CODE HERE ====================
        return this.width === this.height;
        // ========================================================
    }
}


class Triangle extends Shape {
    constructor(base, height, side1, side2, side3) {
        // ==================== YOUR CODE HERE ====================
        super('Triangle');
        this.base = base;
        this.height = height;
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
        // ========================================================
    }

    area() {
        // ==================== YOUR CODE HERE ====================
        return (this.base * this.height) / 2;
        // ========================================================
    }

    perimeter() {
        // ==================== YOUR CODE HERE ====================
        return this.side1 + this.side2 + this.side3;
        // ========================================================
    }

    isEquilateral() {
        // ==================== YOUR CODE HERE ====================
        return this.side1 === this.side2 && this.side2 === this.side3;
        // ========================================================
    }
}


/**
 * Calculate total area of multiple shapes
 * This demonstrates polymorphism - same area() call works differently for each shape!
 */
function calculateTotalArea(shapes) {
    // ==================== YOUR CODE HERE ====================
    return shapes.reduce((total, shape) => total + shape.area(), 0);
    // ========================================================
}


// =============================================================================
// EXPORTS (Do not modify)
// =============================================================================
module.exports = { Shape, Circle, Rectangle, Triangle, calculateTotalArea };
