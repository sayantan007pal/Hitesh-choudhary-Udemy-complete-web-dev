/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              GETTERS & SETTERS IN JAVASCRIPT - CHALLENGE #4                  ║
 * ║                   📊 User Profile with Computed Properties 📊                 ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT REVIEW:
 * ━━━━━━━━━━━━━━━━━━━
 * Getters and Setters are special methods that let you ACCESS and MODIFY 
 * properties with validation or computation, while looking like regular 
 * property access. They give you control over how data is read and written.
 * 
 * Syntax:
 *   get propertyName() { return value; }  // Access: obj.propertyName
 *   set propertyName(val) { ... }         // Assign: obj.propertyName = val
 * 
 * 
 * 🎯 YOUR CHALLENGE:
 * ━━━━━━━━━━━━━━━━━━━
 * Create a UserProfile class with advanced getter/setter usage:
 * 
 * Private Properties:
 *   - #firstName, #lastName (strings)
 *   - #email (string)
 *   - #age (number)
 *   - #password (string, stored as simple hash)
 * 
 * Getters:
 *   - fullName → returns "firstName lastName"
 *   - email → returns masked email (j***@example.com)
 *   - age → returns the age
 *   - isAdult → returns true if age >= 18
 *   - passwordStrength → returns 'weak', 'medium', or 'strong'
 * 
 * Setters:
 *   - fullName → splits and sets firstName/lastName
 *   - email → validates format, throws if invalid
 *   - age → validates positive number and < 150, throws if invalid
 *   - password → validates min 8 chars, throws if invalid
 * 
 * Methods:
 *   - constructor(firstName, lastName, email, age, password)
 *   - verifyPassword(input) → returns true if matches stored password
 * 
 * 
 * BONUS: Temperature class
 * Create a Temperature class that converts between Celsius and Fahrenheit:
 *   - constructor(celsius)
 *   - get/set celsius
 *   - get/set fahrenheit (computed from celsius: F = C × 9/5 + 32)
 *   - get/set kelvin (computed: K = C + 273.15)
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━━
 * - Email regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 * - Password strength: weak (<10 chars), medium (10-14), strong (15+)
 * - For fullName setter, handle single word input (lastName = '')
 */


// =============================================================================
// YOUR IMPLEMENTATION HERE
// =============================================================================

class UserProfile {
    #firstName;
    #lastName;
    #email;
    #age;
    #password;

    constructor(firstName, lastName, email, age, password) {
        // ==================== YOUR CODE HERE ====================
        // Use setters for validation
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.email = email;        // Uses setter for validation
        this.age = age;            // Uses setter for validation
        this.password = password;  // Uses setter for validation
        // ========================================================
    }

    // ─────────── GETTERS ───────────

    get fullName() {
        // ==================== YOUR CODE HERE ====================
        return `${this.#firstName} ${this.#lastName}`.trim();
        // ========================================================
    }

    get email() {
        // ==================== YOUR CODE HERE ====================
        // Mask email: john@example.com → j***@example.com
        const [localPart, domain] = this.#email.split('@');
        if (localPart.length <= 1) {
            return this.#email;
        }
        return `${localPart[0]}***@${domain}`;
        // ========================================================
    }

    get age() {
        // ==================== YOUR CODE HERE ====================
        return this.#age;
        // ========================================================
    }

    get isAdult() {
        // ==================== YOUR CODE HERE ====================
        return this.#age >= 18;
        // ========================================================
    }

    get passwordStrength() {
        // ==================== YOUR CODE HERE ====================
        const len = this.#password.length;
        if (len < 10) return 'weak';
        if (len < 15) return 'medium';
        return 'strong';
        // ========================================================
    }

    // ─────────── SETTERS ───────────

    set fullName(value) {
        // ==================== YOUR CODE HERE ====================
        if (!value || typeof value !== 'string') {
            throw new Error('Full name must be a non-empty string');
        }
        const parts = value.trim().split(' ');
        this.#firstName = parts[0];
        this.#lastName = parts.slice(1).join(' ') || '';
        // ========================================================
    }

    set email(value) {
        // ==================== YOUR CODE HERE ====================
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error('Invalid email format');
        }
        this.#email = value;
        // ========================================================
    }

    set age(value) {
        // ==================== YOUR CODE HERE ====================
        if (typeof value !== 'number' || value < 0 || value >= 150) {
            throw new Error('Age must be a positive number less than 150');
        }
        this.#age = value;
        // ========================================================
    }

    set password(value) {
        // ==================== YOUR CODE HERE ====================
        if (!value || value.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }
        this.#password = value;
        // ========================================================
    }

    // ─────────── METHODS ───────────

    verifyPassword(input) {
        // ==================== YOUR CODE HERE ====================
        return this.#password === input;
        // ========================================================
    }

    // Helper to get raw email for testing
    getRawEmail() {
        return this.#email;
    }
}


// =============================================================================
// BONUS: Temperature Converter
// =============================================================================

class Temperature {
    #celsius;

    constructor(celsius = 0) {
        // ==================== YOUR CODE HERE ====================
        this.celsius = celsius;
        // ========================================================
    }

    get celsius() {
        // ==================== YOUR CODE HERE ====================
        return this.#celsius;
        // ========================================================
    }

    set celsius(value) {
        // ==================== YOUR CODE HERE ====================
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        this.#celsius = value;
        // ========================================================
    }

    get fahrenheit() {
        // ==================== YOUR CODE HERE ====================
        return (this.#celsius * 9/5) + 32;
        // ========================================================
    }

    set fahrenheit(value) {
        // ==================== YOUR CODE HERE ====================
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        this.#celsius = (value - 32) * 5/9;
        // ========================================================
    }

    get kelvin() {
        // ==================== YOUR CODE HERE ====================
        return this.#celsius + 273.15;
        // ========================================================
    }

    set kelvin(value) {
        // ==================== YOUR CODE HERE ====================
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        if (value < 0) {
            throw new Error('Kelvin cannot be negative');
        }
        this.#celsius = value - 273.15;
        // ========================================================
    }
}


// =============================================================================
// BONUS: Rectangle with Computed Properties
// =============================================================================

class SmartRectangle {
    #width;
    #height;

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    get width() {
        return this.#width;
    }

    set width(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Width must be a positive number');
        }
        this.#width = value;
    }

    get height() {
        return this.#height;
    }

    set height(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Height must be a positive number');
        }
        this.#height = value;
    }

    // Computed getters
    get area() {
        return this.#width * this.#height;
    }

    get perimeter() {
        return 2 * (this.#width + this.#height);
    }

    get diagonal() {
        return Math.sqrt(this.#width ** 2 + this.#height ** 2);
    }

    get isSquare() {
        return this.#width === this.#height;
    }

    // Setter that maintains aspect ratio
    set area(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('Area must be a positive number');
        }
        const ratio = this.#width / this.#height;
        this.#height = Math.sqrt(value / ratio);
        this.#width = this.#height * ratio;
    }
}


// =============================================================================
// EXPORTS (Do not modify)
// =============================================================================
module.exports = { UserProfile, Temperature, SmartRectangle };
