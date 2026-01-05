/**
 * Encapsulation and Private Fields
 * =================================
 * 
 * This challenge tests your understanding of encapsulation,
 * private fields (#), and data protection in JavaScript.
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 * Encapsulation is a core OOP principle frequently asked in interviews!
 */


// =============================================================================
// Task 1: Bank Account with Private Fields
// =============================================================================
/**
 * Create a class `SecureBankAccount` with proper encapsulation:
 * 
 * Private Fields:
 * - #accountNumber (generated automatically, format: "ACC" + 6 random digits)
 * - #balance
 * - #pin
 * - #transactionHistory (array of transaction objects)
 * 
 * Public Constructor:
 * - Takes: ownerName, initialDeposit, pin (4-digit number)
 * - Validates: initialDeposit >= 0, pin is 4 digits
 * - Throws errors for invalid inputs
 * 
 * Public Methods:
 * - getAccountNumber(): returns the account number
 * - getBalance(pin): returns balance if pin correct, else throws "Invalid PIN"
 * - deposit(amount): adds to balance, records transaction, returns new balance
 * - withdraw(amount, pin): validates pin and balance, returns amount or throws error
 * - getTransactionHistory(pin): returns copy of history if pin correct
 * - changePin(oldPin, newPin): changes pin if old pin correct and new is 4 digits
 * 
 * Transaction object: { type: "deposit"|"withdrawal", amount, date, balance }
 * 
 * Expected Usage:
 *   const account = new SecureBankAccount("John Doe", 1000, 1234);
 *   account.getBalance(1234);    // 1000
 *   account.getBalance(0000);    // throws "Invalid PIN"
 *   account.deposit(500);        // 1500
 *   account.withdraw(200, 1234); // 200
 *   account.getBalance(1234);    // 1300
 *   account.#balance;            // SyntaxError! Can't access private
 */

// ==================== YOUR CODE HERE ====================

class SecureBankAccount {
    // TODO: Private fields
    // #accountNumber
    // #balance
    // #pin
    // #transactionHistory = []
    
    // TODO: Constructor with validation
    
    // TODO: Private helper to generate account number
    // #generateAccountNumber()
    
    // TODO: Private helper to verify pin
    // #verifyPin(pin)
    
    // TODO: getAccountNumber()
    
    // TODO: getBalance(pin)
    
    // TODO: deposit(amount)
    
    // TODO: withdraw(amount, pin)
    
    // TODO: getTransactionHistory(pin)
    
    // TODO: changePin(oldPin, newPin)
}

// ========================================================


// =============================================================================
// Task 2: Password Manager with Encrypted Storage
// =============================================================================
/**
 * Create a class `PasswordEntry` that securely stores password data:
 * 
 * Private Fields:
 * - #website
 * - #username
 * - #encryptedPassword (not the actual password!)
 * - #createdAt
 * - #lastAccessed
 * 
 * Constructor:
 * - Takes: website, username, password, masterKey
 * - "Encrypts" password using masterKey (simple XOR or reverse + key append for demo)
 * 
 * Public Methods:
 * - getWebsite(): returns website
 * - getUsername(): returns username
 * - getPassword(masterKey): "decrypts" and returns password if key correct
 *   - Also updates #lastAccessed
 *   - Throws "Invalid master key" if wrong
 * - updatePassword(newPassword, masterKey): updates encrypted password
 * - getInfo(): returns "Website: [website], User: [username], Created: [date]"
 *   - Does NOT reveal password!
 * - getLastAccessed(): returns last accessed date
 * 
 * Expected Usage:
 *   const entry = new PasswordEntry("github.com", "john", "secret123", "masterkey");
 *   entry.getPassword("masterkey");    // "secret123"
 *   entry.getPassword("wrongkey");     // throws "Invalid master key"
 *   entry.getInfo();                   // "Website: github.com, User: john, Created: ..."
 *   entry.#encryptedPassword;          // SyntaxError!
 */

// ==================== YOUR CODE HERE ====================

class PasswordEntry {
    // TODO: Private fields
    
    // TODO: Constructor with encryption
    
    // TODO: Private encrypt method
    // #encrypt(password, key)
    
    // TODO: Private decrypt method
    // #decrypt(encrypted, key)
    
    // TODO: Public methods
}

// ========================================================


// =============================================================================
// Task 3: Game Character with Protected Stats
// =============================================================================
/**
 * Create a class `GameCharacter` for an RPG game:
 * 
 * Private Fields:
 * - #health (max 100, min 0)
 * - #mana (max 50, min 0)
 * - #experience
 * - #level
 * - #inventory (array)
 * - #isAlive
 * 
 * Public Properties:
 * - name (public, read-only after creation)
 * - characterClass (e.g., "Warrior", "Mage")
 * 
 * Public Methods:
 * - getStats(): returns { health, mana, level, experience, isAlive }
 * - takeDamage(amount): reduces health, sets isAlive=false if health <= 0
 * - heal(amount): increases health (but not above max)
 * - useMana(amount): reduces mana if enough, returns true/false
 * - restoreMana(amount): increases mana (but not above max)
 * - gainExperience(amount): adds exp, levels up if exp >= level * 100
 *   - Level up: resets exp, increases level, restores health/mana
 * - addToInventory(item): adds item to inventory
 * - removeFromInventory(item): removes item, returns true/false
 * - getInventory(): returns copy of inventory
 * - revive(): if dead, sets isAlive=true, health=50, mana=25
 * 
 * Expected Usage:
 *   const hero = new GameCharacter("Aragorn", "Warrior");
 *   hero.getStats();           // { health: 100, mana: 50, level: 1, ... }
 *   hero.takeDamage(30);
 *   hero.getStats().health;    // 70
 *   hero.heal(50);             // Can't exceed 100
 *   hero.getStats().health;    // 100
 *   hero.#health;              // SyntaxError!
 */

// ==================== YOUR CODE HERE ====================

class GameCharacter {
    // TODO: Private fields
    
    // TODO: Constructor
    
    // TODO: All public methods
}

// ========================================================


// =============================================================================
// Task 4: Observable with Private Subscribers
// =============================================================================
/**
 * Implement the Observer pattern with encapsulation:
 * 
 * Create class `Observable`:
 * 
 * Private Fields:
 * - #subscribers (Map of event -> Set of callbacks)
 * - #eventHistory (array of past events)
 * 
 * Public Methods:
 * - subscribe(event, callback): adds callback for event, returns unsubscribe function
 * - unsubscribe(event, callback): removes specific callback
 * - emit(event, data): calls all callbacks for that event with data
 * - once(event, callback): subscribes callback that auto-unsubscribes after first call
 * - getEventHistory(): returns copy of event history
 * - clearHistory(): clears event history
 * - getSubscriberCount(event): returns number of subscribers for event
 * 
 * The #subscribers should NOT be directly accessible or modifiable from outside!
 * 
 * Expected Usage:
 *   const obs = new Observable();
 *   
 *   const unsub = obs.subscribe("data", (data) => console.log(data));
 *   obs.emit("data", { message: "Hello" });  // Logs: { message: "Hello" }
 *   
 *   obs.getSubscriberCount("data");  // 1
 *   unsub();  // Unsubscribes
 *   obs.getSubscriberCount("data");  // 0
 *   
 *   obs.once("login", (user) => console.log("Logged in:", user));
 *   obs.emit("login", "John");  // Logs: "Logged in: John"
 *   obs.emit("login", "Jane");  // Nothing happens (already unsubscribed)
 */

// ==================== YOUR CODE HERE ====================

class Observable {
    // TODO: Private fields
    // #subscribers = new Map()
    // #eventHistory = []
    
    // TODO: subscribe(event, callback) - return unsubscribe function
    
    // TODO: unsubscribe(event, callback)
    
    // TODO: emit(event, data)
    
    // TODO: once(event, callback)
    
    // TODO: getEventHistory()
    
    // TODO: clearHistory()
    
    // TODO: getSubscriberCount(event)
}

// ========================================================


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    SecureBankAccount,
    PasswordEntry,
    GameCharacter,
    Observable
};


// =============================================================================
// 📚 LEARNING NOTES
// =============================================================================
/**
 * PRIVATE FIELDS SYNTAX:
 * =====================
 * 
 * class MyClass {
 *     #privateField;           // Must be DECLARED at top
 *     #privateWithDefault = 0; // Can have default value
 *     
 *     constructor() {
 *         this.#privateField = "secret";  // Access with this.#
 *     }
 *     
 *     #privateMethod() {       // Private methods too!
 *         return this.#privateField;
 *     }
 *     
 *     publicMethod() {
 *         return this.#privateMethod();  // Can use internally
 *     }
 * }
 * 
 * const obj = new MyClass();
 * obj.#privateField;    // SyntaxError! Truly private!
 * obj.publicMethod();   // Works - accesses private internally
 * 
 * 
 * ENCAPSULATION BENEFITS:
 * ======================
 * 1. DATA PROTECTION: Prevent invalid states
 * 2. IMPLEMENTATION HIDING: Change internals without breaking API
 * 3. VALIDATION: Control how data is set
 * 4. SECURITY: Sensitive data stays hidden
 * 
 * 
 * PRIVATE VS CONVENTION:
 * =====================
 * 
 * // Convention only (not truly private):
 * this._balance = 100;      // Anyone can still do: obj._balance = 0
 * 
 * // Truly private:
 * #balance = 100;           // obj.#balance = 0 → SyntaxError!
 * 
 * 
 * COMMON PATTERNS:
 * ===============
 * 
 * 1. GETTER WITHOUT SETTER (Read-only):
 *    #value;
 *    get value() { return this.#value; }
 *    // No setter = read-only from outside
 * 
 * 2. VALIDATED SETTER:
 *    set age(v) {
 *        if (v > 0 && v < 150) this.#age = v;
 *        else throw new Error("Invalid age");
 *    }
 * 
 * 3. COMPUTED GETTER:
 *    get fullName() {
 *        return `${this.#firstName} ${this.#lastName}`;
 *    }
 * 
 * 
 * INTERVIEW TIP:
 * =============
 * "Private fields with # provide true encapsulation in JavaScript. Unlike
 *  the underscore convention, the JS engine actually enforces privacy.
 *  This allows us to protect internal state, validate inputs, and change
 *  implementation details without breaking the public API."
 */
