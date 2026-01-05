/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║           PRIVATE FIELDS & METHODS IN JAVASCRIPT - CHALLENGE #8             ║
 * ║                      🔒 Secure Data Structures 🔒                             ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT REVIEW:
 * ━━━━━━━━━━━━━━━━━━━
 * Private fields and methods use the # prefix. They are:
 *   - Truly private (enforced by JS engine, not just convention)
 *   - Not accessible from outside the class
 *   - Not accessible from subclasses
 *   - Must be declared at the top of the class
 * 
 * Syntax:
 *   #privateField
 *   #privateMethod() { }
 *   static #staticPrivateField
 * 
 * 
 * 🎯 YOUR CHALLENGE:
 * ━━━━━━━━━━━━━━━━━━━
 * 
 * PART 1: SecureVault Class
 * Create a vault that stores sensitive data securely:
 * 
 *   - #data (Map to store key-value pairs)
 *   - #accessLog (Array of access attempts)
 *   - #masterPassword (string)
 *   - #failedAttempts (number, locks after 3 failures)
 *   - #isLocked (boolean)
 * 
 *   Private Methods:
 *   - #authenticate(password) → validates password
 *   - #logAccess(action, success) → logs to #accessLog
 *   - #encrypt(value) → simple encoding (reverse + base64)
 *   - #decrypt(value) → decode the encrypted value
 * 
 *   Public Methods:
 *   - constructor(masterPassword)
 *   - store(key, value, password) → stores encrypted value
 *   - retrieve(key, password) → retrieves and decrypts value
 *   - delete(key, password) → removes key
 *   - changePassword(oldPassword, newPassword)
 *   - getAccessLog(password) → returns log if authenticated
 *   - isLocked() → returns lock status
 *   - unlock(password) → resets failed attempts if correct
 * 
 * 
 * PART 2: PrivateCounter with Static Private
 * Create a counter demonstrating static private fields:
 * 
 *   - static #totalInstances (tracks all instances)
 *   - static #instanceRegistry (Map of id → instance)
 *   - #id (unique ID per instance)
 *   - #count (current count)
 * 
 *   Static Methods:
 *   - static getTotalInstances()
 *   - static getInstanceById(id)
 *   - static resetAll() → resets all counters
 * 
 *   Instance Methods:
 *   - increment() / decrement() / getCount() / getId()
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━━
 * - Use btoa/atob for simple base64 encoding (or Buffer in Node)
 * - Lock the vault after 3 consecutive failed attempts
 * - Private fields MUST be declared before use
 * - Static private fields use: static #field
 */


// =============================================================================
// PART 1: SecureVault Class
// =============================================================================

class SecureVault {
    // Private fields must be declared at class level
    #data;
    #accessLog;
    #masterPassword;
    #failedAttempts;
    #isLocked;

    constructor(masterPassword) {
        // ==================== YOUR CODE HERE ====================
        if (!masterPassword || masterPassword.length < 4) {
            throw new Error('Master password must be at least 4 characters');
        }
        this.#data = new Map();
        this.#accessLog = [];
        this.#masterPassword = masterPassword;
        this.#failedAttempts = 0;
        this.#isLocked = false;
        // ========================================================
    }

    // Private methods
    #authenticate(password) {
        // ==================== YOUR CODE HERE ====================
        if (this.#isLocked) {
            return false;
        }
        if (password === this.#masterPassword) {
            this.#failedAttempts = 0;
            return true;
        } else {
            this.#failedAttempts++;
            if (this.#failedAttempts >= 3) {
                this.#isLocked = true;
            }
            return false;
        }
        // ========================================================
    }

    #logAccess(action, success) {
        // ==================== YOUR CODE HERE ====================
        this.#accessLog.push({
            action,
            success,
            timestamp: new Date().toISOString()
        });
        // ========================================================
    }

    #encrypt(value) {
        // ==================== YOUR CODE HERE ====================
        // Simple encryption: reverse string, then base64
        const str = JSON.stringify(value);
        const reversed = str.split('').reverse().join('');
        return Buffer.from(reversed).toString('base64');
        // ========================================================
    }

    #decrypt(encrypted) {
        // ==================== YOUR CODE HERE ====================
        const reversed = Buffer.from(encrypted, 'base64').toString();
        const str = reversed.split('').reverse().join('');
        return JSON.parse(str);
        // ========================================================
    }

    // Public methods
    store(key, value, password) {
        // ==================== YOUR CODE HERE ====================
        if (!this.#authenticate(password)) {
            this.#logAccess('store', false);
            throw new Error(this.#isLocked ? 'Vault is locked' : 'Authentication failed');
        }
        const encrypted = this.#encrypt(value);
        this.#data.set(key, encrypted);
        this.#logAccess('store', true);
        return true;
        // ========================================================
    }

    retrieve(key, password) {
        // ==================== YOUR CODE HERE ====================
        if (!this.#authenticate(password)) {
            this.#logAccess('retrieve', false);
            throw new Error(this.#isLocked ? 'Vault is locked' : 'Authentication failed');
        }
        if (!this.#data.has(key)) {
            this.#logAccess('retrieve', false);
            throw new Error('Key not found');
        }
        const decrypted = this.#decrypt(this.#data.get(key));
        this.#logAccess('retrieve', true);
        return decrypted;
        // ========================================================
    }

    delete(key, password) {
        // ==================== YOUR CODE HERE ====================
        if (!this.#authenticate(password)) {
            this.#logAccess('delete', false);
            throw new Error(this.#isLocked ? 'Vault is locked' : 'Authentication failed');
        }
        const deleted = this.#data.delete(key);
        this.#logAccess('delete', deleted);
        return deleted;
        // ========================================================
    }

    changePassword(oldPassword, newPassword) {
        // ==================== YOUR CODE HERE ====================
        if (!this.#authenticate(oldPassword)) {
            this.#logAccess('changePassword', false);
            throw new Error(this.#isLocked ? 'Vault is locked' : 'Authentication failed');
        }
        if (!newPassword || newPassword.length < 4) {
            throw new Error('New password must be at least 4 characters');
        }
        this.#masterPassword = newPassword;
        this.#logAccess('changePassword', true);
        return true;
        // ========================================================
    }

    getAccessLog(password) {
        // ==================== YOUR CODE HERE ====================
        if (!this.#authenticate(password)) {
            this.#logAccess('getAccessLog', false);
            throw new Error(this.#isLocked ? 'Vault is locked' : 'Authentication failed');
        }
        this.#logAccess('getAccessLog', true);
        return [...this.#accessLog];
        // ========================================================
    }

    isLocked() {
        // ==================== YOUR CODE HERE ====================
        return this.#isLocked;
        // ========================================================
    }

    unlock(password) {
        // ==================== YOUR CODE HERE ====================
        if (password === this.#masterPassword) {
            this.#isLocked = false;
            this.#failedAttempts = 0;
            this.#logAccess('unlock', true);
            return true;
        }
        this.#logAccess('unlock', false);
        return false;
        // ========================================================
    }

    getStoredKeys(password) {
        // ==================== YOUR CODE HERE ====================
        if (!this.#authenticate(password)) {
            throw new Error(this.#isLocked ? 'Vault is locked' : 'Authentication failed');
        }
        return Array.from(this.#data.keys());
        // ========================================================
    }
}


// =============================================================================
// PART 2: PrivateCounter with Static Private
// =============================================================================

class PrivateCounter {
    // Static private fields
    static #totalInstances = 0;
    static #instanceRegistry = new Map();
    static #nextId = 1;

    // Instance private fields
    #id;
    #count;
    #name;

    constructor(name = 'Counter', initialCount = 0) {
        // ==================== YOUR CODE HERE ====================
        this.#id = PrivateCounter.#nextId++;
        this.#name = name;
        this.#count = initialCount;
        
        PrivateCounter.#totalInstances++;
        PrivateCounter.#instanceRegistry.set(this.#id, this);
        // ========================================================
    }

    // Instance methods
    increment() {
        // ==================== YOUR CODE HERE ====================
        this.#count++;
        return this.#count;
        // ========================================================
    }

    decrement() {
        // ==================== YOUR CODE HERE ====================
        this.#count--;
        return this.#count;
        // ========================================================
    }

    getCount() {
        // ==================== YOUR CODE HERE ====================
        return this.#count;
        // ========================================================
    }

    getId() {
        // ==================== YOUR CODE HERE ====================
        return this.#id;
        // ========================================================
    }

    getName() {
        // ==================== YOUR CODE HERE ====================
        return this.#name;
        // ========================================================
    }

    reset() {
        // ==================== YOUR CODE HERE ====================
        this.#count = 0;
        return this.#count;
        // ========================================================
    }

    // Static methods
    static getTotalInstances() {
        // ==================== YOUR CODE HERE ====================
        return PrivateCounter.#totalInstances;
        // ========================================================
    }

    static getInstanceById(id) {
        // ==================== YOUR CODE HERE ====================
        return PrivateCounter.#instanceRegistry.get(id) || null;
        // ========================================================
    }

    static getAllInstances() {
        // ==================== YOUR CODE HERE ====================
        return Array.from(PrivateCounter.#instanceRegistry.values());
        // ========================================================
    }

    static resetAll() {
        // ==================== YOUR CODE HERE ====================
        for (const counter of PrivateCounter.#instanceRegistry.values()) {
            counter.reset();
        }
        // ========================================================
    }

    static clearRegistry() {
        // ==================== YOUR CODE HERE ====================
        PrivateCounter.#instanceRegistry.clear();
        PrivateCounter.#totalInstances = 0;
        PrivateCounter.#nextId = 1;
        // ========================================================
    }
}


// =============================================================================
// BONUS: ImmutablePerson Class
// =============================================================================

class ImmutablePerson {
    #firstName;
    #lastName;
    #birthDate;
    #frozen = false;

    constructor(firstName, lastName, birthDate) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#birthDate = new Date(birthDate);
        
        // Freeze after a moment to allow initial setup
        setTimeout(() => {
            this.#frozen = true;
        }, 0);
    }

    get firstName() {
        return this.#firstName;
    }

    get lastName() {
        return this.#lastName;
    }

    get fullName() {
        return `${this.#firstName} ${this.#lastName}`;
    }

    get birthDate() {
        return new Date(this.#birthDate); // Return copy
    }

    get age() {
        const today = new Date();
        let age = today.getFullYear() - this.#birthDate.getFullYear();
        const monthDiff = today.getMonth() - this.#birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < this.#birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // No setters = truly immutable after construction
}


// =============================================================================
// EXPORTS (Do not modify)
// =============================================================================
module.exports = { SecureVault, PrivateCounter, ImmutablePerson };
