/**
 * Getters and Setters - Property Accessors
 * =========================================
 * 
 * This challenge tests your understanding of getters, setters,
 * computed properties, and property validation in JavaScript.
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 * Getters/Setters enable controlled access and computed properties!
 */


// =============================================================================
// Task 1: Temperature Converter with Computed Properties
// =============================================================================
/**
 * Create a class `Temperature` that stores temperature and provides
 * computed conversions:
 * 
 * Private Field:
 * - #kelvin (stores temperature internally in Kelvin)
 * 
 * Getters and Setters for:
 * - celsius: get/set in Celsius (converts to/from Kelvin)
 * - fahrenheit: get/set in Fahrenheit (converts to/from Kelvin)
 * - kelvin: get/set in Kelvin
 * 
 * Validation:
 * - Temperature cannot go below absolute zero (0 Kelvin / -273.15°C / -459.67°F)
 * - Setting invalid values should throw "Temperature below absolute zero"
 * 
 * Static Method:
 * - static compare(temp1, temp2): returns -1 if temp1 < temp2, 0 if equal, 1 if greater
 * 
 * Conversion Formulas:
 * - C = K - 273.15
 * - F = (K - 273.15) * 9/5 + 32
 * - K = C + 273.15
 * - K = (F - 32) * 5/9 + 273.15
 * 
 * Expected Usage:
 *   const temp = new Temperature();
 *   temp.celsius = 25;
 *   console.log(temp.fahrenheit);  // 77
 *   console.log(temp.kelvin);      // 298.15
 *   temp.fahrenheit = 32;
 *   console.log(temp.celsius);     // 0
 *   temp.kelvin = 0;
 *   console.log(temp.celsius);     // -273.15
 *   temp.celsius = -300;           // throws "Temperature below absolute zero"
 */

// ==================== YOUR CODE HERE ====================

class Temperature {
    // TODO: Private field #kelvin = 273.15 (default: 0°C)
    
    // TODO: getter celsius
    
    // TODO: setter celsius (with validation)
    
    // TODO: getter fahrenheit
    
    // TODO: setter fahrenheit (with validation)
    
    // TODO: getter kelvin
    
    // TODO: setter kelvin (with validation)
    
    // TODO: static compare(temp1, temp2)
}

// ========================================================


// =============================================================================
// Task 2: Person with Age Validation and Full Name
// =============================================================================
/**
 * Create a class `Person` with computed and validated properties:
 * 
 * Private Fields:
 * - #firstName
 * - #lastName
 * - #birthYear
 * - #email
 * 
 * Getters:
 * - firstName, lastName: return respective values
 * - fullName: returns "FirstName LastName"
 * - age: computed from birthYear and current year
 * - email: returns the email
 * 
 * Setters:
 * - firstName, lastName: must be non-empty strings, trimmed
 * - fullName: splits and sets firstName and lastName
 * - birthYear: must be valid (1900 <= year <= current year)
 * - email: must contain "@" and "." after "@"
 * 
 * All setters should throw descriptive errors for invalid values.
 * 
 * Static Method:
 * - static fromObject(obj): factory that creates Person from { firstName, lastName, birthYear, email }
 * 
 * Expected Usage:
 *   const person = new Person("John", "Doe", 1990, "john@example.com");
 *   console.log(person.fullName);  // "John Doe"
 *   console.log(person.age);       // 34 (in 2024)
 *   person.fullName = "Jane Smith";
 *   console.log(person.firstName); // "Jane"
 *   console.log(person.lastName);  // "Smith"
 *   person.email = "invalid";      // throws "Invalid email format"
 */

// ==================== YOUR CODE HERE ====================

class Person {
    // TODO: Private fields
    
    // TODO: Constructor
    
    // TODO: Getters for firstName, lastName, fullName, age, email
    
    // TODO: Setters with validation
    
    // TODO: static fromObject(obj)
}

// ========================================================


// =============================================================================
// Task 3: Shopping Cart with Computed Totals
// =============================================================================
/**
 * Create a class `ShoppingCart` with computed properties for totals:
 * 
 * Private Fields:
 * - #items (array of { name, price, quantity })
 * - #discountCode (string or null)
 * - #discounts (Map of code -> percentage, e.g., "SAVE10" -> 0.1)
 * 
 * Constructor:
 * - Initializes empty cart with default discount codes:
 *   { "SAVE10": 0.1, "SAVE20": 0.2, "HALF": 0.5 }
 * 
 * Getters:
 * - items: returns copy of items array
 * - itemCount: total number of items (sum of quantities)
 * - subtotal: sum of (price * quantity) for all items
 * - discount: returns discount amount based on applied code
 * - total: subtotal - discount
 * - discountCode: returns current applied code or null
 * 
 * Setters:
 * - discountCode: validates code exists, or null to remove
 *   - Throws "Invalid discount code" if code doesn't exist
 * 
 * Public Methods:
 * - addItem(name, price, quantity = 1): adds item or increases quantity
 * - removeItem(name): removes item entirely
 * - updateQuantity(name, quantity): updates quantity, removes if 0
 * - clearCart(): removes all items and discount
 * - registerDiscount(code, percentage): adds new discount code
 * 
 * Expected Usage:
 *   const cart = new ShoppingCart();
 *   cart.addItem("Apple", 1.50, 3);   // 3 apples
 *   cart.addItem("Banana", 0.75, 2);  // 2 bananas
 *   console.log(cart.subtotal);       // 6.00
 *   console.log(cart.itemCount);      // 5
 *   cart.discountCode = "SAVE10";
 *   console.log(cart.discount);       // 0.60 (10% of 6.00)
 *   console.log(cart.total);          // 5.40
 */

// ==================== YOUR CODE HERE ====================

class ShoppingCart {
    // TODO: Private fields
    
    // TODO: Constructor with default discounts
    
    // TODO: getter items (return copy)
    
    // TODO: getter itemCount
    
    // TODO: getter subtotal
    
    // TODO: getter/setter discountCode
    
    // TODO: getter discount
    
    // TODO: getter total
    
    // TODO: addItem(name, price, quantity)
    
    // TODO: removeItem(name)
    
    // TODO: updateQuantity(name, quantity)
    
    // TODO: clearCart()
    
    // TODO: registerDiscount(code, percentage)
}

// ========================================================


// =============================================================================
// Task 4: Lazy Loading with Getters
// =============================================================================
/**
 * Create a class `DataLoader` that demonstrates lazy loading pattern:
 * 
 * Private Fields:
 * - #dataLoaded (boolean)
 * - #data (the actual data, initially null)
 * - #loadCount (how many times data was "loaded")
 * 
 * Getters:
 * - data: lazy loads data on first access, caches for subsequent access
 *   - "Loading" simulated by returning Date.now() + some computation
 * - isLoaded: returns whether data is loaded
 * - loadCount: returns how many times load was triggered
 * 
 * Methods:
 * - reload(): forces reload on next access
 * - clear(): clears data and resets loaded state
 * 
 * Also create class `ExpensiveComputation`:
 * 
 * Private Fields:
 * - #input
 * - #cachedResult (null initially)
 * 
 * Constructor:
 * - Takes input value
 * 
 * Getter:
 * - result: computes factorial of input on first access, caches result
 * - input: returns the input
 * 
 * Setter:
 * - input: sets new input and clears cache (will recompute on next result access)
 * 
 * Expected Usage:
 *   const loader = new DataLoader();
 *   console.log(loader.isLoaded);    // false
 *   console.log(loader.data);        // (loads and returns data)
 *   console.log(loader.isLoaded);    // true
 *   console.log(loader.loadCount);   // 1
 *   console.log(loader.data);        // (returns cached data, no reload)
 *   console.log(loader.loadCount);   // 1 (still 1)
 *   loader.reload();
 *   console.log(loader.data);        // (reloads data)
 *   console.log(loader.loadCount);   // 2
 * 
 *   const comp = new ExpensiveComputation(5);
 *   console.log(comp.result);        // 120 (5!)
 *   console.log(comp.result);        // 120 (cached)
 *   comp.input = 6;
 *   console.log(comp.result);        // 720 (6!, recomputed)
 */

// ==================== YOUR CODE HERE ====================

class DataLoader {
    // TODO: Private fields
    
    // TODO: getter data (lazy loading)
    
    // TODO: getter isLoaded
    
    // TODO: getter loadCount
    
    // TODO: reload()
    
    // TODO: clear()
}

class ExpensiveComputation {
    // TODO: Private fields
    
    // TODO: Constructor
    
    // TODO: getter result (lazy with cache)
    
    // TODO: getter input
    
    // TODO: setter input (clears cache)
    
    // TODO: Private method #computeFactorial(n)
}

// ========================================================


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    Temperature,
    Person,
    ShoppingCart,
    DataLoader,
    ExpensiveComputation
};


// =============================================================================
// 📚 LEARNING NOTES
// =============================================================================
/**
 * GETTER SYNTAX:
 * =============
 * 
 * class Circle {
 *     #radius = 1;
 *     
 *     get radius() {
 *         return this.#radius;
 *     }
 *     
 *     get diameter() {
 *         return this.#radius * 2;  // Computed property!
 *     }
 *     
 *     get area() {
 *         return Math.PI * this.#radius ** 2;
 *     }
 * }
 * 
 * const c = new Circle();
 * c.radius;    // 1 (accessed like property, not method!)
 * c.diameter;  // 2
 * c.area;      // 3.14159...
 * 
 * 
 * SETTER SYNTAX:
 * =============
 * 
 * class Circle {
 *     #radius = 1;
 *     
 *     get radius() { return this.#radius; }
 *     
 *     set radius(value) {
 *         if (value <= 0) throw new Error("Radius must be positive");
 *         this.#radius = value;
 *     }
 * }
 * 
 * const c = new Circle();
 * c.radius = 5;     // Calls setter
 * c.radius = -1;    // Throws error!
 * 
 * 
 * COMPUTED PROPERTIES:
 * ===================
 * 
 * class Rectangle {
 *     constructor(width, height) {
 *         this.width = width;
 *         this.height = height;
 *     }
 *     
 *     get area() {
 *         return this.width * this.height;  // Computed on-the-fly
 *     }
 *     
 *     get perimeter() {
 *         return 2 * (this.width + this.height);
 *     }
 * }
 * 
 * 
 * LAZY LOADING PATTERN:
 * ====================
 * 
 * class LazyData {
 *     #data = null;
 *     
 *     get data() {
 *         if (this.#data === null) {
 *             this.#data = this.#loadExpensiveData();  // Load once
 *         }
 *         return this.#data;  // Return cached
 *     }
 *     
 *     #loadExpensiveData() {
 *         // Expensive operation...
 *         return result;
 *     }
 * }
 * 
 * 
 * GETTER-ONLY = READ-ONLY:
 * =======================
 * 
 * class User {
 *     #createdAt = new Date();
 *     
 *     get createdAt() { return this.#createdAt; }
 *     // No setter = read-only!
 * }
 * 
 * user.createdAt = new Date();  // Silently ignored (or TypeError in strict mode)
 * 
 * 
 * INTERVIEW TIP:
 * =============
 * "Getters and setters provide a clean API for accessing data while enabling
 *  validation, computation, and encapsulation. They let you change the internal
 *  implementation without modifying how properties are accessed externally.
 *  Common use cases include validation, computed properties, lazy loading,
 *  and logging/debugging property access."
 */
