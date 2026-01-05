/**
 * Constructor Functions and the 'new' Keyword
 * ============================================
 * 
 * This challenge tests your deep understanding of constructor functions,
 * the 'new' keyword, and what happens behind the scenes.
 * 
 * 🎯 INTERVIEW IMPORTANCE: VERY HIGH
 * Understanding how 'new' works is fundamental to JS OOP!
 */


// =============================================================================
// Task 1: Implement a Constructor Function
// =============================================================================
/**
 * Create a constructor function `BankAccount` that:
 * - Takes `accountHolder` (string) and `initialBalance` (number) as parameters
 * - Sets these as properties using `this`
 * - Has a method `deposit(amount)` that adds to the balance and returns the new balance
 * - Has a method `withdraw(amount)` that:
 *   - Returns "Insufficient funds" if amount > balance
 *   - Otherwise, subtracts from balance and returns the new balance
 * - Has a method `getBalance()` that returns current balance
 * 
 * IMPORTANT: This is a constructor function, NOT an ES6 class!
 * 
 * Expected Usage:
 *   const account = new BankAccount("John Doe", 1000);
 *   account.accountHolder;   // "John Doe"
 *   account.getBalance();    // 1000
 *   account.deposit(500);    // 1500
 *   account.withdraw(200);   // 1300
 *   account.withdraw(2000);  // "Insufficient funds"
 *   account.getBalance();    // 1300 (unchanged)
 */

// ==================== YOUR CODE HERE ====================

function BankAccount(accountHolder, initialBalance) {
    // TODO: Set accountHolder property
    
    // TODO: Set balance property (use initialBalance)
    
    // TODO: Implement deposit(amount) method
    
    // TODO: Implement withdraw(amount) method
    
    // TODO: Implement getBalance() method
}

// ========================================================


// =============================================================================
// Task 2: Understanding 'new' Keyword - Implement new.target Safety
// =============================================================================
/**
 * Create a constructor function `SafeUser` that:
 * - Takes `username` and `email` as parameters
 * - Uses `new.target` to check if it was called with `new`
 * - If NOT called with `new`, throws an Error: "SafeUser must be called with 'new'"
 * - If called with `new`, sets the properties correctly
 * 
 * BONUS: Create another version `AutoFixUser` that:
 * - If called without 'new', automatically returns a new instance instead of throwing
 * 
 * Expected Usage:
 *   const user1 = new SafeUser("john", "john@example.com");  // Works!
 *   const user2 = SafeUser("jane", "jane@example.com");      // Throws Error!
 *   
 *   const user3 = new AutoFixUser("bob", "bob@example.com"); // Works!
 *   const user4 = AutoFixUser("alice", "alice@example.com"); // Also works! (auto-fixed)
 */

// ==================== YOUR CODE HERE ====================

function SafeUser(username, email) {
    // TODO: Check if called with 'new' using new.target
    // TODO: If not, throw error
    // TODO: Set properties
}

function AutoFixUser(username, email) {
    // TODO: Check if called with 'new' using new.target
    // TODO: If not, return new AutoFixUser(username, email)
    // TODO: Set properties
}

// ========================================================


// =============================================================================
// Task 3: Simulate What 'new' Does Behind the Scenes
// =============================================================================
/**
 * The 'new' keyword does 4 things:
 * 1. Creates an empty object {}
 * 2. Sets the prototype of the new object to Constructor.prototype
 * 3. Calls the constructor with 'this' bound to the new object
 * 4. Returns the object (unless constructor returns an object)
 * 
 * Your task: Implement a function `customNew(Constructor, ...args)` that
 * simulates what the 'new' keyword does WITHOUT using 'new' itself!
 * 
 * Expected Usage:
 *   function Person(name, age) {
 *       this.name = name;
 *       this.age = age;
 *   }
 *   Person.prototype.greet = function() {
 *       return `Hi, I'm ${this.name}`;
 *   };
 *   
 *   const john = customNew(Person, "John", 25);
 *   john.name;                        // "John"
 *   john.age;                         // 25
 *   john.greet();                     // "Hi, I'm John"
 *   john instanceof Person;           // true
 *   Object.getPrototypeOf(john) === Person.prototype;  // true
 */

// ==================== YOUR CODE HERE ====================

function customNew(Constructor, ...args) {
    // Step 1: Create an empty object
    // TODO
    
    // Step 2: Set the prototype of the new object to Constructor.prototype
    // Hint: Use Object.create() or Object.setPrototypeOf()
    // TODO
    
    // Step 3: Call the constructor with 'this' bound to the new object
    // Hint: Use .call() or .apply()
    // TODO
    
    // Step 4: Return the object (or the constructor's return value if it's an object)
    // TODO
}

// ========================================================


// =============================================================================
// Task 4: Prototype Methods vs Instance Methods
// =============================================================================
/**
 * Create a constructor function `Counter` that demonstrates the difference
 * between methods defined inside the constructor vs on the prototype.
 * 
 * Requirements:
 * - Constructor takes `name` and optional `startValue` (default 0)
 * - INSIDE constructor: define `incrementFast()` that adds 1 and returns value
 *   (This creates a NEW function for each instance - memory inefficient!)
 * - ON PROTOTYPE: define `increment()` that adds 1 and returns value
 *   (This is shared by all instances - memory efficient!)
 * - ON PROTOTYPE: define `decrement()` that subtracts 1 and returns value
 * - ON PROTOTYPE: define `getValue()` that returns current value
 * - ON PROTOTYPE: define `reset()` that sets value back to startValue
 * 
 * After implementing, the test will verify that:
 * - Two instances have DIFFERENT incrementFast functions (not ===)
 * - Two instances have the SAME increment function (=== via prototype)
 * 
 * Expected Usage:
 *   const counter1 = new Counter("A", 10);
 *   const counter2 = new Counter("B", 0);
 *   
 *   counter1.increment();    // 11
 *   counter1.increment();    // 12
 *   counter1.decrement();    // 11
 *   counter1.getValue();     // 11
 *   counter1.reset();
 *   counter1.getValue();     // 10 (back to startValue)
 *   
 *   // Memory comparison:
 *   counter1.increment === counter2.increment;       // true (shared)
 *   counter1.incrementFast === counter2.incrementFast; // false (different copies)
 */

// ==================== YOUR CODE HERE ====================

function Counter(name, startValue) {
    // TODO: Set name property
    
    // TODO: Set startValue property (default to 0 if not provided)
    
    // TODO: Set value property to startValue
    
    // TODO: Define incrementFast INSIDE constructor (inefficient way)
    // this.incrementFast = function() { ... }
}

// TODO: Add increment() to Counter.prototype

// TODO: Add decrement() to Counter.prototype

// TODO: Add getValue() to Counter.prototype

// TODO: Add reset() to Counter.prototype

// ========================================================


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    BankAccount,
    SafeUser,
    AutoFixUser,
    customNew,
    Counter
};


// =============================================================================
// 📚 LEARNING NOTES
// =============================================================================
/**
 * WHAT 'new' DOES (THE 4 STEPS):
 * =============================
 * 1. Creates a new empty object: {}
 * 2. Links the object's [[Prototype]] to Constructor.prototype
 * 3. Executes the constructor with 'this' = new object
 * 4. Returns the new object (unless constructor explicitly returns an object)
 * 
 * 
 * new.target EXPLAINED:
 * ====================
 * - Inside a function, new.target is:
 *   - undefined if called without 'new'
 *   - The constructor function if called with 'new'
 * - Use it to enforce or auto-fix missing 'new':
 *   if (!new.target) { throw Error(...) }
 *   OR
 *   if (!new.target) { return new MyConstructor(...args) }
 * 
 * 
 * PROTOTYPE METHODS VS INSTANCE METHODS:
 * =====================================
 * 
 * ❌ INSIDE CONSTRUCTOR (creates new function for each instance):
 * function Car(brand) {
 *     this.brand = brand;
 *     this.start = function() { return "Vroom!"; };  // New copy each time!
 * }
 * 
 * ✅ ON PROTOTYPE (shared by all instances):
 * function Car(brand) {
 *     this.brand = brand;
 * }
 * Car.prototype.start = function() { return "Vroom!"; };  // One shared copy!
 * 
 * 
 * INTERVIEW TIP:
 * =============
 * "Methods should be on the prototype for memory efficiency. Each instance
 *  will delegate to the same function instead of having its own copy."
 */
