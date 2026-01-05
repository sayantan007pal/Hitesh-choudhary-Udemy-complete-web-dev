/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              STATIC METHODS IN JAVASCRIPT - CHALLENGE #5                     ║
 * ║                    🏭 Factory Patterns & Utility Classes 🏭                   ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT REVIEW:
 * ━━━━━━━━━━━━━━━━━━━
 * Static methods belong to the CLASS itself, NOT to individual instances.
 * They're called directly on the class name (ClassName.method()) and 
 * cannot access instance-specific data (this).
 * 
 * Use Cases:
 *   - Utility functions (Math.random(), Array.isArray())
 *   - Factory methods (User.createFromJSON())
 *   - Instance tracking (User.count)
 *   - Configuration methods
 * 
 * 
 * 🎯 YOUR CHALLENGE:
 * ━━━━━━━━━━━━━━━━━━━
 * 
 * PART 1: Counter Class with Instance Tracking
 * Create a Counter class that tracks all instances:
 *   - static count (number of instances created)
 *   - static getAllInstances() → returns array of all counters
 *   - static getTotal() → returns sum of all counter values
 *   - static reset() → resets count to 0 and clears instances
 *   - constructor(name, initialValue = 0)
 *   - increment() / decrement() / getValue() / getName()
 * 
 * 
 * PART 2: MathUtils Class (Pure Static)
 * Create a utility class with only static methods:
 *   - static clamp(value, min, max) → restricts value to range
 *   - static lerp(start, end, t) → linear interpolation
 *   - static map(value, inMin, inMax, outMin, outMax) → maps value from one range to another
 *   - static randomBetween(min, max) → random number in range
 *   - static factorial(n) → n! calculation
 *   - static isPrime(n) → checks if number is prime
 *   - static fibonacci(n) → returns nth fibonacci number
 * 
 * 
 * PART 3: IdGenerator Class
 * Create a class that generates unique IDs:
 *   - static #counter (private static, starts at 0)
 *   - static generate(prefix = 'ID') → returns unique ID like "ID_001"
 *   - static reset() → resets counter to 0
 *   - static getCount() → returns how many IDs generated
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━━
 * - Static methods use 'static' keyword
 * - Access static members with ClassName.member
 * - Static methods can access other static members
 * - Instance methods can also access static members via ClassName.member
 */


// =============================================================================
// PART 1: Counter Class
// =============================================================================

class Counter {
    // Static properties
    static count = 0;
    static #instances = [];

    #name;
    #value;

    constructor(name, initialValue = 0) {
        // ==================== YOUR CODE HERE ====================
        this.#name = name;
        this.#value = initialValue;
        Counter.count++;
        Counter.#instances.push(this);
        // ========================================================
    }

    // Instance methods
    increment() {
        // ==================== YOUR CODE HERE ====================
        this.#value++;
        return this.#value;
        // ========================================================
    }

    decrement() {
        // ==================== YOUR CODE HERE ====================
        this.#value--;
        return this.#value;
        // ========================================================
    }

    getValue() {
        // ==================== YOUR CODE HERE ====================
        return this.#value;
        // ========================================================
    }

    getName() {
        // ==================== YOUR CODE HERE ====================
        return this.#name;
        // ========================================================
    }

    // Static methods
    static getAllInstances() {
        // ==================== YOUR CODE HERE ====================
        return [...Counter.#instances];
        // ========================================================
    }

    static getTotal() {
        // ==================== YOUR CODE HERE ====================
        return Counter.#instances.reduce((sum, counter) => sum + counter.getValue(), 0);
        // ========================================================
    }

    static reset() {
        // ==================== YOUR CODE HERE ====================
        Counter.count = 0;
        Counter.#instances = [];
        // ========================================================
    }
}


// =============================================================================
// PART 2: MathUtils Class (Pure Static Utility)
// =============================================================================

class MathUtils {
    // Prevent instantiation
    constructor() {
        throw new Error('MathUtils is a static class and cannot be instantiated');
    }

    static clamp(value, min, max) {
        // ==================== YOUR CODE HERE ====================
        // Returns value restricted to [min, max] range
        return Math.max(min, Math.min(max, value));
        // ========================================================
    }

    static lerp(start, end, t) {
        // ==================== YOUR CODE HERE ====================
        // Linear interpolation: returns value between start and end based on t (0-1)
        return start + (end - start) * t;
        // ========================================================
    }

    static map(value, inMin, inMax, outMin, outMax) {
        // ==================== YOUR CODE HERE ====================
        // Maps a value from one range to another
        return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
        // ========================================================
    }

    static randomBetween(min, max) {
        // ==================== YOUR CODE HERE ====================
        return Math.random() * (max - min) + min;
        // ========================================================
    }

    static factorial(n) {
        // ==================== YOUR CODE HERE ====================
        if (n < 0) throw new Error('Factorial not defined for negative numbers');
        if (n === 0 || n === 1) return 1;
        return n * MathUtils.factorial(n - 1);
        // ========================================================
    }

    static isPrime(n) {
        // ==================== YOUR CODE HERE ====================
        if (n < 2) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i === 0) return false;
        }
        return true;
        // ========================================================
    }

    static fibonacci(n) {
        // ==================== YOUR CODE HERE ====================
        if (n < 0) throw new Error('Fibonacci not defined for negative numbers');
        if (n === 0) return 0;
        if (n === 1) return 1;
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            [a, b] = [b, a + b];
        }
        return b;
        // ========================================================
    }
}


// =============================================================================
// PART 3: IdGenerator Class
// =============================================================================

class IdGenerator {
    static #counter = 0;

    // Prevent instantiation
    constructor() {
        throw new Error('IdGenerator is a static class and cannot be instantiated');
    }

    static generate(prefix = 'ID') {
        // ==================== YOUR CODE HERE ====================
        IdGenerator.#counter++;
        const paddedNum = String(IdGenerator.#counter).padStart(3, '0');
        return `${prefix}_${paddedNum}`;
        // ========================================================
    }

    static reset() {
        // ==================== YOUR CODE HERE ====================
        IdGenerator.#counter = 0;
        // ========================================================
    }

    static getCount() {
        // ==================== YOUR CODE HERE ====================
        return IdGenerator.#counter;
        // ========================================================
    }
}


// =============================================================================
// BONUS: User Factory with Static Methods
// =============================================================================

class User {
    static #allUsers = [];
    static roles = ['admin', 'user', 'guest'];

    #id;
    #name;
    #email;
    #role;

    constructor(name, email, role = 'user') {
        this.#id = IdGenerator.generate('USR');
        this.#name = name;
        this.#email = email;
        this.#role = role;
        User.#allUsers.push(this);
    }

    // Instance methods
    getId() { return this.#id; }
    getName() { return this.#name; }
    getEmail() { return this.#email; }
    getRole() { return this.#role; }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            email: this.#email,
            role: this.#role
        };
    }

    // Static factory methods
    static createFromJSON(json) {
        const data = typeof json === 'string' ? JSON.parse(json) : json;
        return new User(data.name, data.email, data.role);
    }

    static createAdmin(name, email) {
        return new User(name, email, 'admin');
    }

    static createGuest() {
        return new User('Guest', 'guest@temp.com', 'guest');
    }

    // Static utility methods
    static getAllUsers() {
        return [...User.#allUsers];
    }

    static findByEmail(email) {
        return User.#allUsers.find(user => user.getEmail() === email) || null;
    }

    static getUsersByRole(role) {
        return User.#allUsers.filter(user => user.getRole() === role);
    }

    static getTotalCount() {
        return User.#allUsers.length;
    }

    static clearAll() {
        User.#allUsers = [];
    }
}


// =============================================================================
// EXPORTS (Do not modify)
// =============================================================================
module.exports = { Counter, MathUtils, IdGenerator, User };
