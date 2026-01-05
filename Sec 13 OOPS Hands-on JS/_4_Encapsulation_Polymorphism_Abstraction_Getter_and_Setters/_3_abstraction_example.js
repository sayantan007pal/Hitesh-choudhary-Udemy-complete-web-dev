/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              ABSTRACTION IN JAVASCRIPT - CHALLENGE #3                        ║
 * ║                  🎨 Coffee Machine with Hidden Complexity 🎨                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT REVIEW:
 * ━━━━━━━━━━━━━━━━━━━
 * Abstraction is hiding COMPLEX implementation details and showing only 
 * the ESSENTIAL features. Users know WHAT it does, not HOW it does it.
 * 
 * "Show WHAT, Hide HOW" - Like a TV remote: press button, magic happens!
 * 
 * In JavaScript, we achieve abstraction using:
 *   - Private methods (#methodName) to hide implementation
 *   - Public methods to expose simple interfaces
 *   - Modular design to separate concerns
 * 
 * 
 * 🎯 YOUR CHALLENGE:
 * ━━━━━━━━━━━━━━━━━━━
 * Create a CoffeeMachine class that abstracts away coffee-making complexity:
 * 
 * Private Properties:
 *   - #waterLevel (starts at 0, max 1000ml)
 *   - #beanLevel (starts at 0, max 500g)
 *   - #temperature (starts at 20°C)
 *   - #isOn (starts as false)
 * 
 * Private Methods (hidden complexity):
 *   - #heatWater() → sets temperature to 92°C, returns "Water heated to 92°C"
 *   - #grindBeans(amount) → reduces beans by amount, returns "Beans ground: {amount}g"
 *   - #brew() → returns "Coffee brewed at optimal pressure"
 *   - #dispense(type) → returns "{type} dispensed"
 * 
 * Public Methods (simple interface):
 *   - turnOn() → turns machine on, returns "Machine is on"
 *   - turnOff() → turns machine off, resets temp to 20°C, returns "Machine is off"
 *   - addWater(amount) → adds water (can't exceed max), returns "Water added: {amount}ml"
 *   - addBeans(amount) → adds beans (can't exceed max), returns "Beans added: {amount}g"
 *   - makeCoffee(type) → orchestrates the entire process, returns the steps taken
 *                       Types: 'espresso' (30ml water, 20g beans)
 *                              'americano' (60ml water, 20g beans)
 *                              'latte' (45ml water, 20g beans)
 *   - getStatus() → returns object with current levels and state
 * 
 * Validation:
 *   - Can't make coffee if machine is off
 *   - Can't make coffee if not enough water or beans
 *   - Can't add water/beans beyond maximum
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━━
 * - makeCoffee() should call private methods in sequence
 * - Throw errors for invalid operations
 * - getStatus() should return a copy of state, not the actual private fields
 */


// =============================================================================
// YOUR IMPLEMENTATION HERE
// =============================================================================

class CoffeeMachine {
    // Private properties
    #waterLevel;
    #beanLevel;
    #temperature;
    #isOn;
    #maxWater = 1000;
    #maxBeans = 500;

    constructor() {
        // ==================== YOUR CODE HERE ====================
        this.#waterLevel = 0;
        this.#beanLevel = 0;
        this.#temperature = 20;
        this.#isOn = false;
        // ========================================================
    }

    // Private methods (hidden complexity)
    #heatWater() {
        // ==================== YOUR CODE HERE ====================
        this.#temperature = 92;
        return 'Water heated to 92°C';
        // ========================================================
    }

    #grindBeans(amount) {
        // ==================== YOUR CODE HERE ====================
        this.#beanLevel -= amount;
        return `Beans ground: ${amount}g`;
        // ========================================================
    }

    #brew() {
        // ==================== YOUR CODE HERE ====================
        return 'Coffee brewed at optimal pressure';
        // ========================================================
    }

    #dispense(type) {
        // ==================== YOUR CODE HERE ====================
        return `${type} dispensed`;
        // ========================================================
    }

    // Public methods (simple interface)
    turnOn() {
        // ==================== YOUR CODE HERE ====================
        this.#isOn = true;
        return 'Machine is on';
        // ========================================================
    }

    turnOff() {
        // ==================== YOUR CODE HERE ====================
        this.#isOn = false;
        this.#temperature = 20;
        return 'Machine is off';
        // ========================================================
    }

    addWater(amount) {
        // ==================== YOUR CODE HERE ====================
        if (amount <= 0) {
            throw new Error('Water amount must be positive');
        }
        const newLevel = this.#waterLevel + amount;
        if (newLevel > this.#maxWater) {
            throw new Error('Water tank overflow');
        }
        this.#waterLevel = newLevel;
        return `Water added: ${amount}ml`;
        // ========================================================
    }

    addBeans(amount) {
        // ==================== YOUR CODE HERE ====================
        if (amount <= 0) {
            throw new Error('Bean amount must be positive');
        }
        const newLevel = this.#beanLevel + amount;
        if (newLevel > this.#maxBeans) {
            throw new Error('Bean container overflow');
        }
        this.#beanLevel = newLevel;
        return `Beans added: ${amount}g`;
        // ========================================================
    }

    makeCoffee(type) {
        // ==================== YOUR CODE HERE ====================
        // Define coffee recipes
        const recipes = {
            espresso: { water: 30, beans: 20 },
            americano: { water: 60, beans: 20 },
            latte: { water: 45, beans: 20 }
        };

        // Validate machine state
        if (!this.#isOn) {
            throw new Error('Machine is off');
        }

        const recipe = recipes[type.toLowerCase()];
        if (!recipe) {
            throw new Error('Unknown coffee type');
        }

        if (this.#waterLevel < recipe.water) {
            throw new Error('Not enough water');
        }

        if (this.#beanLevel < recipe.beans) {
            throw new Error('Not enough beans');
        }

        // Execute the abstracted process - user sees simple result, not complexity
        const steps = [];
        steps.push(this.#heatWater());
        steps.push(this.#grindBeans(recipe.beans));
        this.#waterLevel -= recipe.water;
        steps.push(this.#brew());
        steps.push(this.#dispense(type));

        return steps;
        // ========================================================
    }

    getStatus() {
        // ==================== YOUR CODE HERE ====================
        return {
            isOn: this.#isOn,
            waterLevel: this.#waterLevel,
            beanLevel: this.#beanLevel,
            temperature: this.#temperature,
            maxWater: this.#maxWater,
            maxBeans: this.#maxBeans
        };
        // ========================================================
    }
}


// =============================================================================
// BONUS: PaymentProcessor Class (Another Abstraction Example)
// =============================================================================

/**
 * Create a PaymentProcessor class that abstracts payment complexity:
 * 
 * Private Methods:
 *   - #validateCard(cardNumber) → checks if card number is 16 digits
 *   - #checkFraud(amount) → returns true if amount > 10000 (suspicious)
 *   - #connectToBank() → simulates connection, returns "Connected to bank"
 *   - #processTransaction(amount) → returns "Transaction of ${amount} processed"
 * 
 * Public Methods:
 *   - pay(cardNumber, amount) → orchestrates payment, returns result object
 *     { success: boolean, message: string, transactionId: string }
 */

class PaymentProcessor {
    // Private methods
    #validateCard(cardNumber) {
        // ==================== YOUR CODE HERE ====================
        const cleaned = cardNumber.replace(/\s|-/g, '');
        return cleaned.length === 16 && /^\d+$/.test(cleaned);
        // ========================================================
    }

    #checkFraud(amount) {
        // ==================== YOUR CODE HERE ====================
        return amount > 10000;
        // ========================================================
    }

    #connectToBank() {
        // ==================== YOUR CODE HERE ====================
        return 'Connected to bank';
        // ========================================================
    }

    #processTransaction(amount) {
        // ==================== YOUR CODE HERE ====================
        return `Transaction of ${amount} processed`;
        // ========================================================
    }

    #generateTransactionId() {
        // ==================== YOUR CODE HERE ====================
        return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9);
        // ========================================================
    }

    pay(cardNumber, amount) {
        // ==================== YOUR CODE HERE ====================
        // Validate card
        if (!this.#validateCard(cardNumber)) {
            return {
                success: false,
                message: 'Invalid card number',
                transactionId: null
            };
        }

        // Check for fraud
        if (this.#checkFraud(amount)) {
            return {
                success: false,
                message: 'Transaction flagged for review',
                transactionId: null
            };
        }

        // Process payment (user doesn't see these steps)
        this.#connectToBank();
        this.#processTransaction(amount);

        return {
            success: true,
            message: 'Payment successful',
            transactionId: this.#generateTransactionId()
        };
        // ========================================================
    }
}


// =============================================================================
// EXPORTS (Do not modify)
// =============================================================================
module.exports = { CoffeeMachine, PaymentProcessor };
