/**
 * Static Methods and Properties Deep Dive
 * ========================================
 * 
 * This challenge tests your understanding of static members,
 * when to use them, and how they differ from instance members.
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 * Static methods are used extensively in real-world code!
 */


// =============================================================================
// Task 1: Utility Class with Static Methods Only
// =============================================================================
/**
 * Create a class `MathUtils` that contains ONLY static methods (no instances needed):
 * 
 * Static Methods:
 * - `add(a, b)`: returns a + b
 * - `subtract(a, b)`: returns a - b
 * - `multiply(a, b)`: returns a * b
 * - `divide(a, b)`: returns a / b (throw Error if b is 0: "Cannot divide by zero")
 * - `power(base, exponent)`: returns base^exponent
 * - `factorial(n)`: returns n! (throw Error if n < 0: "Cannot factorial negative number")
 * - `isPrime(n)`: returns true if n is prime, false otherwise
 * - `fibonacci(n)`: returns the nth Fibonacci number (0, 1, 1, 2, 3, 5, 8...)
 * 
 * Expected Usage:
 *   MathUtils.add(5, 3);        // 8
 *   MathUtils.divide(10, 2);    // 5
 *   MathUtils.divide(10, 0);    // throws Error
 *   MathUtils.factorial(5);     // 120
 *   MathUtils.isPrime(7);       // true
 *   MathUtils.isPrime(4);       // false
 *   MathUtils.fibonacci(6);     // 8 (sequence: 0,1,1,2,3,5,8)
 */

// ==================== YOUR CODE HERE ====================

class MathUtils {
    // TODO: static add(a, b)
    
    // TODO: static subtract(a, b)
    
    // TODO: static multiply(a, b)
    
    // TODO: static divide(a, b) - throw if b is 0
    
    // TODO: static power(base, exponent)
    
    // TODO: static factorial(n) - throw if n < 0
    
    // TODO: static isPrime(n)
    
    // TODO: static fibonacci(n)
}

// ========================================================


// =============================================================================
// Task 2: Instance Counter with Static Properties
// =============================================================================
/**
 * Create a class `User` that tracks all created instances:
 * 
 * Static Members:
 * - `totalUsers`: count of all User instances ever created
 * - `activeUsers`: array of all currently active users
 * - `getTotalCount()`: returns totalUsers
 * - `getActiveCount()`: returns activeUsers.length
 * - `getAllActiveUsers()`: returns copy of activeUsers array
 * - `findByUsername(username)`: returns user with that username or null
 * - `deactivateAll()`: deactivates all users
 * 
 * Instance Members:
 * - Constructor takes: `username`, `email`
 * - Property: `isActive` = true (initially)
 * - Property: `createdAt` = new Date()
 * - Method: `deactivate()`: sets isActive = false, removes from activeUsers
 * - Method: `activate()`: sets isActive = true, adds to activeUsers (if not already there)
 * - Method: `getInfo()`: returns "Username: [username], Email: [email], Active: [yes/no]"
 * 
 * Expected Usage:
 *   User.getTotalCount();       // 0
 *   const user1 = new User("john", "john@test.com");
 *   const user2 = new User("jane", "jane@test.com");
 *   User.getTotalCount();       // 2
 *   User.getActiveCount();      // 2
 *   
 *   user1.deactivate();
 *   User.getActiveCount();      // 1
 *   User.findByUsername("jane"); // user2 object
 *   User.findByUsername("bob");  // null
 */

// ==================== YOUR CODE HERE ====================

class User {
    // TODO: static totalUsers = 0
    // TODO: static activeUsers = []
    
    // TODO: static getTotalCount()
    
    // TODO: static getActiveCount()
    
    // TODO: static getAllActiveUsers()
    
    // TODO: static findByUsername(username)
    
    // TODO: static deactivateAll()
    
    // TODO: constructor(username, email)
    
    // TODO: deactivate()
    
    // TODO: activate()
    
    // TODO: getInfo()
}

// ========================================================


// =============================================================================
// Task 3: Factory Pattern with Static Methods
// =============================================================================
/**
 * Create a `Car` class that uses static factory methods for object creation:
 * 
 * Instance Members:
 * - Constructor takes: `make`, `model`, `year`, `fuelType`
 * - Method: `getDescription()`: returns "[year] [make] [model] ([fuelType])"
 * - Method: `getAge()`: returns current year - car year
 * 
 * Static Factory Methods (alternative constructors):
 * - `createElectric(make, model, year)`: creates Car with fuelType = "Electric"
 * - `createHybrid(make, model, year)`: creates Car with fuelType = "Hybrid"
 * - `createGasoline(make, model, year)`: creates Car with fuelType = "Gasoline"
 * - `createFromObject(obj)`: creates Car from {make, model, year, fuelType} object
 * - `createFromString(str)`: creates Car from "make|model|year|fuelType" string
 * 
 * Expected Usage:
 *   const tesla = Car.createElectric("Tesla", "Model 3", 2023);
 *   tesla.getDescription();  // "2023 Tesla Model 3 (Electric)"
 *   
 *   const prius = Car.createHybrid("Toyota", "Prius", 2022);
 *   prius.getDescription();  // "2022 Toyota Prius (Hybrid)"
 *   
 *   const fromObj = Car.createFromObject({
 *       make: "Ford", model: "Mustang", year: 2024, fuelType: "Gasoline"
 *   });
 *   
 *   const fromStr = Car.createFromString("BMW|X5|2023|Hybrid");
 *   fromStr.getDescription();  // "2023 BMW X5 (Hybrid)"
 */

// ==================== YOUR CODE HERE ====================

class Car {
    // TODO: constructor(make, model, year, fuelType)
    
    // TODO: getDescription()
    
    // TODO: getAge()
    
    // TODO: static createElectric(make, model, year)
    
    // TODO: static createHybrid(make, model, year)
    
    // TODO: static createGasoline(make, model, year)
    
    // TODO: static createFromObject(obj)
    
    // TODO: static createFromString(str) - format: "make|model|year|fuelType"
}

// ========================================================


// =============================================================================
// Task 4: Singleton Pattern with Static
// =============================================================================
/**
 * Implement the Singleton pattern - a class that only allows ONE instance.
 * 
 * Create a class `DatabaseConnection` that:
 * 
 * Static Members:
 * - Private: `#instance` = null (the single instance)
 * - `getInstance()`: returns the single instance, creates if doesn't exist
 * - `hasInstance()`: returns true if instance exists
 * - `resetInstance()`: destroys the instance (for testing purposes)
 * 
 * Instance Members:
 * - `host`: the database host
 * - `port`: the database port
 * - `isConnected`: boolean, starts as false
 * - `connect()`: sets isConnected = true, returns "Connected to [host]:[port]"
 * - `disconnect()`: sets isConnected = false, returns "Disconnected"
 * - `query(sql)`: if connected, returns "Executing: [sql]", else throws "Not connected"
 * 
 * The constructor should be "protected" - throw error if called directly with new.
 * Use getInstance() to get the singleton.
 * 
 * Expected Usage:
 *   // Can't use new directly:
 *   new DatabaseConnection();  // throws "Use DatabaseConnection.getInstance()"
 *   
 *   // Get instance:
 *   const db1 = DatabaseConnection.getInstance("localhost", 5432);
 *   const db2 = DatabaseConnection.getInstance();  // Same instance!
 *   db1 === db2;  // true (same object)
 *   
 *   db1.connect();      // "Connected to localhost:5432"
 *   db1.query("SELECT * FROM users");  // "Executing: SELECT * FROM users"
 */

// ==================== YOUR CODE HERE ====================

class DatabaseConnection {
    // TODO: static #instance = null
    
    // TODO: static getInstance(host, port)
    
    // TODO: static hasInstance()
    
    // TODO: static resetInstance()
    
    // TODO: constructor(host, port) - should throw if called directly
    
    // TODO: connect()
    
    // TODO: disconnect()
    
    // TODO: query(sql)
}

// ========================================================


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    MathUtils,
    User,
    Car,
    DatabaseConnection
};


// =============================================================================
// 📚 LEARNING NOTES
// =============================================================================
/**
 * WHEN TO USE STATIC:
 * ==================
 * 
 * ✅ USE STATIC FOR:
 * - Utility functions that don't need instance data (MathUtils.add)
 * - Factory methods (Car.createElectric)
 * - Tracking all instances (User.totalUsers)
 * - Singleton pattern (getInstance)
 * - Constants shared by all instances
 * - Methods that operate on the class itself, not instances
 * 
 * ❌ DON'T USE STATIC FOR:
 * - Methods that need instance data (this.name, this.value)
 * - Behavior that varies per instance
 * 
 * 
 * STATIC PATTERNS:
 * ===============
 * 
 * 1. UTILITY CLASS:
 *    class MathUtils {
 *        static add(a, b) { return a + b; }
 *    }
 *    // No need for 'new', just call MathUtils.add(1, 2)
 * 
 * 2. FACTORY PATTERN:
 *    class Car {
 *        static createElectric(make, model) {
 *            return new Car(make, model, "Electric");
 *        }
 *    }
 *    // Cleaner than remembering constructor parameters
 * 
 * 3. SINGLETON PATTERN:
 *    class Database {
 *        static #instance = null;
 *        static getInstance() {
 *            if (!Database.#instance) {
 *                Database.#instance = new Database();
 *            }
 *            return Database.#instance;
 *        }
 *    }
 *    // Only one instance ever exists
 * 
 * 4. INSTANCE TRACKING:
 *    class User {
 *        static allUsers = [];
 *        constructor(name) {
 *            this.name = name;
 *            User.allUsers.push(this);
 *        }
 *    }
 *    // Track all created instances
 * 
 * 
 * INTERVIEW TIP:
 * =============
 * "Static methods belong to the class itself, not instances. They're called
 *  on the class name (Math.random()) and can't access instance properties.
 *  Use them for utility functions, factory methods, and singleton patterns."
 */
