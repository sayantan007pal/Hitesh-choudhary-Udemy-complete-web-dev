/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              INTERVIEW CHALLENGE - CHALLENGE #10                             ║
 * ║                    🎯 Master OOP Interview Questions 🎯                      ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 INTERVIEW CONTEXT:
 * ━━━━━━━━━━━━━━━━━━━━━━
 * This file contains ACTUAL interview questions from top tech companies.
 * These questions test deep understanding of JavaScript OOP concepts.
 * 
 * Topics Covered:
 *   1. Prototype Chain & __proto__ vs prototype
 *   2. this binding in different contexts
 *   3. Class vs Function Constructors
 *   4. Inheritance patterns
 *   5. Encapsulation & Private fields
 *   6. Mixins & Composition vs Inheritance
 *   7. Factory Functions vs Constructor Functions
 *   8. Design Patterns (Singleton, Observer, Factory)
 * 
 * 
 * 🎯 CHALLENGE FORMAT:
 * ━━━━━━━━━━━━━━━━━━━━━
 * For each question:
 *   1. Read the problem carefully
 *   2. Think through the expected behavior
 *   3. Implement the solution
 *   4. Explain your reasoning (in comments)
 * 
 * 
 * 💡 INTERVIEW TIP:
 * ━━━━━━━━━━━━━━━━━━
 * Always explain your thought process out loud.
 * Interviewers value understanding over memorization.
 */


// =============================================================================
// QUESTION 1: Prototype Chain Understanding
// =============================================================================
/**
 * QUESTION: What will the following code output and why?
 * 
 * function Animal(name) {
 *     this.name = name;
 * }
 * Animal.prototype.speak = function() {
 *     return `${this.name} makes a sound`;
 * };
 * 
 * function Dog(name, breed) {
 *     Animal.call(this, name);
 *     this.breed = breed;
 * }
 * Dog.prototype = Object.create(Animal.prototype);
 * Dog.prototype.constructor = Dog;
 * Dog.prototype.speak = function() {
 *     return `${this.name} barks`;
 * };
 * 
 * const dog = new Dog('Buddy', 'Labrador');
 * console.log(dog.speak());
 * console.log(dog instanceof Dog);
 * console.log(dog instanceof Animal);
 * console.log(dog.hasOwnProperty('name'));
 * console.log(dog.hasOwnProperty('speak'));
 * 
 * YOUR TASK: Implement and predict the outputs
 */

function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    return `${this.name} makes a sound`;
};

function Dog(name, breed) {
    // ==================== YOUR CODE HERE ====================
    Animal.call(this, name);  // Call parent constructor
    this.breed = breed;
    // ========================================================
}
Dog.prototype = Object.create(Animal.prototype);  // Set up inheritance
Dog.prototype.constructor = Dog;  // Fix constructor reference
Dog.prototype.speak = function() {
    return `${this.name} barks`;
};

// Expected outputs:
const prototypeChainAnswers = {
    // ==================== YOUR ANSWERS HERE ====================
    speak: 'Buddy barks',           // Dog.prototype.speak overrides Animal.prototype.speak
    instanceOfDog: true,            // dog is created with new Dog()
    instanceOfAnimal: true,         // Dog.prototype inherits from Animal.prototype
    hasOwnPropertyName: true,       // name is set on the instance via Animal.call()
    hasOwnPropertySpeak: false,     // speak is on the prototype, not the instance
    // ========================================================
};


// =============================================================================
// QUESTION 2: 'this' Binding Challenge
// =============================================================================
/**
 * QUESTION: Fix the Timer class so all methods work correctly
 * 
 * The current implementation has 'this' binding issues.
 * Identify and fix all the problems.
 */

class Timer {
    #seconds = 0;
    #intervalId = null;
    #callbacks = [];

    constructor(name) {
        this.name = name;
    }

    // ==================== FIX THESE METHODS ====================
    
    start() {
        // PROBLEM: 'this' is lost in setInterval callback
        // FIX: Use arrow function to preserve 'this'
        if (this.#intervalId) return;
        
        this.#intervalId = setInterval(() => {
            this.#seconds++;
            this.#notifyCallbacks();
        }, 1000);
    }

    stop() {
        if (this.#intervalId) {
            clearInterval(this.#intervalId);
            this.#intervalId = null;
        }
    }

    reset() {
        this.stop();
        this.#seconds = 0;
    }

    getSeconds() {
        return this.#seconds;
    }

    // Using bind to ensure correct 'this' when passed as callback
    getSecondsCallback = () => {
        return this.#seconds;
    };

    onTick(callback) {
        this.#callbacks.push(callback);
    }

    #notifyCallbacks() {
        // Arrow functions in class fields are bound to 'this'
        this.#callbacks.forEach(cb => cb(this.#seconds));
    }

    // ============================================================
}


// =============================================================================
// QUESTION 3: Implement a Singleton Pattern
// =============================================================================
/**
 * QUESTION: Implement a Singleton pattern for a Database connection class
 * 
 * Requirements:
 *   - Only one instance can ever exist
 *   - getInstance() returns the same instance
 *   - Should work with 'new' keyword (throw error) OR return existing instance
 *   - Include connection simulation
 */

class Database {
    static #instance = null;
    #connected = false;
    #connectionString = '';

    constructor(connectionString) {
        // ==================== YOUR CODE HERE ====================
        if (Database.#instance) {
            throw new Error('Database instance already exists. Use Database.getInstance()');
        }
        this.#connectionString = connectionString;
        Database.#instance = this;
        // ========================================================
    }

    static getInstance(connectionString = 'default://localhost') {
        // ==================== YOUR CODE HERE ====================
        if (!Database.#instance) {
            Database.#instance = new Database(connectionString);
        }
        return Database.#instance;
        // ========================================================
    }

    connect() {
        if (!this.#connected) {
            console.log(`Connecting to ${this.#connectionString}...`);
            this.#connected = true;
        }
        return this.#connected;
    }

    disconnect() {
        this.#connected = false;
    }

    isConnected() {
        return this.#connected;
    }

    query(sql) {
        if (!this.#connected) {
            throw new Error('Not connected to database');
        }
        return { sql, result: 'simulated result' };
    }

    // For testing - reset singleton
    static resetInstance() {
        Database.#instance = null;
    }
}


// =============================================================================
// QUESTION 4: Implement Mixin Pattern
// =============================================================================
/**
 * QUESTION: Implement mixins to add functionality to classes
 * 
 * Create mixins for:
 *   - Serializable: toJSON(), fromJSON()
 *   - Comparable: compareTo(), equals()
 *   - Cloneable: clone()
 * 
 * Apply them to a Person class
 */

// Mixin definitions
const Serializable = {
    // ==================== YOUR CODE HERE ====================
    toJSON() {
        const obj = {};
        for (const [key, value] of Object.entries(this)) {
            if (typeof value !== 'function') {
                obj[key] = value;
            }
        }
        return JSON.stringify(obj);
    },
    
    fromJSON(json) {
        const data = JSON.parse(json);
        return Object.assign(Object.create(Object.getPrototypeOf(this)), data);
    }
    // ========================================================
};

const Comparable = {
    // ==================== YOUR CODE HERE ====================
    compareTo(other) {
        // Default comparison by a 'value' property or toString
        const thisValue = this.compareValue ?? this.toString();
        const otherValue = other.compareValue ?? other.toString();
        
        if (thisValue < otherValue) return -1;
        if (thisValue > otherValue) return 1;
        return 0;
    },
    
    equals(other) {
        return this.compareTo(other) === 0;
    },
    
    greaterThan(other) {
        return this.compareTo(other) > 0;
    },
    
    lessThan(other) {
        return this.compareTo(other) < 0;
    }
    // ========================================================
};

const Cloneable = {
    // ==================== YOUR CODE HERE ====================
    clone() {
        const cloned = Object.create(Object.getPrototypeOf(this));
        return Object.assign(cloned, JSON.parse(JSON.stringify(this)));
    },
    
    shallowClone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    // ========================================================
};

// Mixin application function
function applyMixins(targetClass, ...mixins) {
    // ==================== YOUR CODE HERE ====================
    mixins.forEach(mixin => {
        Object.getOwnPropertyNames(mixin).forEach(name => {
            if (name !== 'constructor') {
                Object.defineProperty(
                    targetClass.prototype,
                    name,
                    Object.getOwnPropertyDescriptor(mixin, name)
                );
            }
        });
    });
    // ========================================================
}

// Person class to apply mixins
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    get compareValue() {
        return this.age;  // Compare by age
    }

    toString() {
        return `${this.name} (${this.age})`;
    }
}

// Apply mixins
applyMixins(Person, Serializable, Comparable, Cloneable);


// =============================================================================
// QUESTION 5: Factory vs Constructor Function
// =============================================================================
/**
 * QUESTION: Implement both patterns and explain the differences
 * 
 * Create a Shape creator using:
 *   1. Constructor Function with prototype
 *   2. Factory Function with closure
 *   3. ES6 Class
 * 
 * All should have: type, area(), perimeter()
 */

// 1. Constructor Function Pattern
function ShapeConstructor(type) {
    // ==================== YOUR CODE HERE ====================
    this.type = type;
    // ========================================================
}
ShapeConstructor.prototype.getType = function() {
    return this.type;
};

function RectangleConstructor(width, height) {
    // ==================== YOUR CODE HERE ====================
    ShapeConstructor.call(this, 'rectangle');
    this.width = width;
    this.height = height;
    // ========================================================
}
RectangleConstructor.prototype = Object.create(ShapeConstructor.prototype);
RectangleConstructor.prototype.constructor = RectangleConstructor;
RectangleConstructor.prototype.area = function() {
    return this.width * this.height;
};
RectangleConstructor.prototype.perimeter = function() {
    return 2 * (this.width + this.height);
};


// 2. Factory Function Pattern (with closure for privacy)
function createShape(type) {
    // ==================== YOUR CODE HERE ====================
    // Private state (in closure)
    let _type = type;
    
    return {
        getType() {
            return _type;
        }
    };
    // ========================================================
}

function createRectangle(width, height) {
    // ==================== YOUR CODE HERE ====================
    // Private variables via closure
    let _width = width;
    let _height = height;
    
    // Get base shape properties
    const shape = createShape('rectangle');
    
    // Add rectangle-specific methods
    return {
        ...shape,
        
        get width() {
            return _width;
        },
        set width(value) {
            if (value > 0) _width = value;
        },
        
        get height() {
            return _height;
        },
        set height(value) {
            if (value > 0) _height = value;
        },
        
        area() {
            return _width * _height;
        },
        
        perimeter() {
            return 2 * (_width + _height);
        }
    };
    // ========================================================
}


// 3. ES6 Class Pattern
class ShapeClass {
    #type;

    constructor(type) {
        this.#type = type;
    }

    getType() {
        return this.#type;
    }
}

class RectangleClass extends ShapeClass {
    #width;
    #height;

    constructor(width, height) {
        // ==================== YOUR CODE HERE ====================
        super('rectangle');
        this.#width = width;
        this.#height = height;
        // ========================================================
    }

    get width() { return this.#width; }
    set width(value) { if (value > 0) this.#width = value; }

    get height() { return this.#height; }
    set height(value) { if (value > 0) this.#height = value; }

    area() {
        return this.#width * this.#height;
    }

    perimeter() {
        return 2 * (this.#width + this.#height);
    }
}

// Differences explanation
const patternDifferences = {
    constructorFunction: {
        pros: [
            'Works with instanceof',
            'Prototype methods are shared (memory efficient)',
            'Supports inheritance via prototype chain'
        ],
        cons: [
            'No true privacy (can use closure workaround)',
            'Verbose syntax for inheritance',
            'Must use "new" keyword'
        ]
    },
    factoryFunction: {
        pros: [
            'True privacy via closures',
            'No "new" keyword needed',
            'Flexible, can return any object'
        ],
        cons: [
            'Methods not shared (new functions per instance)',
            'instanceof does not work',
            'Slightly more memory usage'
        ]
    },
    es6Class: {
        pros: [
            'Clean, familiar syntax',
            'True privacy with # fields',
            'Works with instanceof',
            'Easy inheritance with extends'
        ],
        cons: [
            'Still prototype-based under the hood',
            'Cannot be called without new'
        ]
    }
};


// =============================================================================
// QUESTION 6: Implement Observer Pattern from Scratch
// =============================================================================
/**
 * QUESTION: Implement a complete Observer/PubSub pattern
 * 
 * Requirements:
 *   - EventEmitter class with: on, off, emit, once
 *   - Support multiple listeners per event
 *   - once() should auto-remove after first call
 */

class EventEmitter {
    #events = new Map();

    // ==================== YOUR CODE HERE ====================
    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }
        this.#events.get(event).push(listener);
        return this; // For chaining
    }

    off(event, listener) {
        if (!this.#events.has(event)) return this;
        
        const listeners = this.#events.get(event);
        const index = listeners.indexOf(listener);
        
        if (index > -1) {
            listeners.splice(index, 1);
        }
        
        if (listeners.length === 0) {
            this.#events.delete(event);
        }
        
        return this;
    }

    emit(event, ...args) {
        if (!this.#events.has(event)) return false;
        
        const listeners = this.#events.get(event).slice(); // Copy to avoid issues during iteration
        listeners.forEach(listener => {
            listener.apply(this, args);
        });
        
        return true;
    }

    once(event, listener) {
        const onceWrapper = (...args) => {
            this.off(event, onceWrapper);
            listener.apply(this, args);
        };
        
        // Store reference to original for potential off() call
        onceWrapper.originalListener = listener;
        
        return this.on(event, onceWrapper);
    }

    listenerCount(event) {
        return this.#events.has(event) ? this.#events.get(event).length : 0;
    }

    removeAllListeners(event) {
        if (event) {
            this.#events.delete(event);
        } else {
            this.#events.clear();
        }
        return this;
    }
    // ========================================================
}


// =============================================================================
// QUESTION 7: Prototype Method Borrowing
// =============================================================================
/**
 * QUESTION: Explain and demonstrate method borrowing
 * 
 * Use cases:
 *   - Array methods on array-like objects
 *   - Object methods on different objects
 */

function demonstrateMethodBorrowing() {
    // ==================== YOUR CODE HERE ====================
    
    // 1. Borrowing Array methods for array-like objects
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
    
    // Using call to borrow Array.prototype.slice
    const realArray = Array.prototype.slice.call(arrayLike);
    
    // Using Array.from (modern approach)
    const realArray2 = Array.from(arrayLike);
    
    // Using spread with Array.prototype
    const mapped = Array.prototype.map.call(arrayLike, x => x.toUpperCase());
    
    // 2. Borrowing Object.prototype.toString for type checking
    function getType(value) {
        return Object.prototype.toString.call(value);
    }
    
    // 3. Borrowing methods between objects
    const calculator = {
        value: 0,
        add(n) { this.value += n; return this; },
        subtract(n) { this.value -= n; return this; }
    };
    
    const myObj = { value: 100 };
    
    // Borrow add method
    calculator.add.call(myObj, 50);  // myObj.value is now 150
    
    return {
        arrayLikeToArray: realArray,
        mappedArrayLike: mapped,
        typeChecks: {
            array: getType([]),
            object: getType({}),
            date: getType(new Date()),
            null: getType(null)
        },
        borrowedMethodResult: myObj.value
    };
    // ========================================================
}

const methodBorrowingResult = demonstrateMethodBorrowing();


// =============================================================================
// QUESTION 8: Composition Over Inheritance
// =============================================================================
/**
 * QUESTION: Refactor inheritance-based code to use composition
 * 
 * Original inheritance-based design (problematic):
 *   Robot extends Machine extends Entity
 *   Animal extends LivingThing extends Entity
 *   
 * Problem: What if we need a Robot that can swim like an Animal?
 * 
 * Solution: Use composition with behavior factories
 */

// Behavior factories (composable pieces)
const canWalk = (state) => ({
    walk() {
        state.position.x += state.speed;
        return `${state.name} walks to position ${state.position.x}`;
    }
});

const canSwim = (state) => ({
    swim() {
        state.position.y -= state.speed;
        return `${state.name} swims to depth ${state.position.y}`;
    }
});

const canFly = (state) => ({
    fly() {
        state.position.z += state.speed * 2;
        return `${state.name} flies to height ${state.position.z}`;
    }
});

const hasEnergy = (state) => ({
    get energy() { return state.energy; },
    
    useEnergy(amount) {
        state.energy = Math.max(0, state.energy - amount);
        return state.energy;
    },
    
    recharge(amount) {
        state.energy = Math.min(100, state.energy + amount);
        return state.energy;
    }
});

// ==================== YOUR CODE HERE ====================

// Composition-based entity creator
function createEntity(name, behaviors) {
    const state = {
        name,
        position: { x: 0, y: 0, z: 0 },
        speed: 1,
        energy: 100
    };
    
    return {
        getName() { return state.name; },
        getPosition() { return { ...state.position }; },
        setSpeed(speed) { state.speed = speed; },
        ...behaviors.reduce((acc, behavior) => ({
            ...acc,
            ...behavior(state)
        }), {})
    };
}

// Create different entities with composed behaviors
function createRobot(name) {
    return createEntity(name, [canWalk, hasEnergy]);
}

function createFish(name) {
    return createEntity(name, [canSwim, hasEnergy]);
}

function createBird(name) {
    return createEntity(name, [canWalk, canFly, hasEnergy]);
}

// The magic: AquaBot can walk AND swim!
function createAquaBot(name) {
    return createEntity(name, [canWalk, canSwim, hasEnergy]);
}

// ========================================================


// =============================================================================
// QUESTION 9: Private Fields vs WeakMap Pattern
// =============================================================================
/**
 * QUESTION: Implement the same class using:
 *   1. ES6 private fields (#)
 *   2. WeakMap pattern (pre-ES6 way)
 *   
 * Compare and explain differences
 */

// 1. ES6 Private Fields
class SecretKeeperModern {
    #secret;
    
    constructor(secret) {
        this.#secret = secret;
    }
    
    getHint() {
        return this.#secret.substring(0, 2) + '...';
    }
    
    reveal(password) {
        if (password === 'opensesame') {
            return this.#secret;
        }
        return null;
    }
}


// 2. WeakMap Pattern (works in older environments)
const _secretMap = new WeakMap();

class SecretKeeperWeakMap {
    constructor(secret) {
        _secretMap.set(this, { secret });
    }
    
    getHint() {
        return _secretMap.get(this).secret.substring(0, 2) + '...';
    }
    
    reveal(password) {
        if (password === 'opensesame') {
            return _secretMap.get(this).secret;
        }
        return null;
    }
}

const privateFieldComparison = {
    es6PrivateFields: {
        syntax: '#fieldName',
        pros: [
            'Native syntax, clean code',
            'Enforced by engine',
            'Cannot be accessed even with Reflect or Object.getOwnPropertySymbols'
        ],
        cons: [
            'Requires modern JS engine',
            'Fields must be declared at class level'
        ]
    },
    weakMapPattern: {
        syntax: 'const _private = new WeakMap()',
        pros: [
            'Works in ES5 environments',
            'Flexible, can add private data dynamically',
            'WeakMap allows garbage collection'
        ],
        cons: [
            'Verbose syntax',
            'Privacy not enforced if WeakMap is exported',
            'Slightly slower access'
        ]
    }
};


// =============================================================================
// QUESTION 10: Tricky Interview Question - Object References
// =============================================================================
/**
 * QUESTION: What are the outputs? Explain prototype and reference behavior
 */

function trickyPrototypeQuestion() {
    // ==================== PREDICT OUTPUTS ====================
    
    function Foo() {
        this.value = 42;
    }
    Foo.prototype.getValue = function() {
        return this.value;
    };
    
    const a = new Foo();
    const b = new Foo();
    
    // Q1: Are a and b's getValue the same function?
    const q1 = a.getValue === b.getValue;  // true - shared on prototype
    
    // Q2: After modifying Foo.prototype
    Foo.prototype.getValue = function() {
        return this.value * 2;
    };
    const q2 = a.getValue();  // 84 - prototype is live
    
    // Q3: After adding method to instance
    a.getValue = function() {
        return this.value + 10;
    };
    const q3_a = a.getValue();  // 52 - instance method shadows prototype
    const q3_b = b.getValue();  // 84 - still uses prototype
    
    // Q4: Prototype chain lookup
    delete a.getValue;
    const q4 = a.getValue();  // 84 - back to prototype after delete
    
    // Q5: Replacing prototype entirely
    Foo.prototype = {
        getValue() { return -1; }
    };
    const c = new Foo();
    const q5_a = a.getValue();  // 84 - a still references old prototype
    const q5_c = c.getValue();  // -1 - c uses new prototype
    
    return {
        q1_sameFunction: q1,
        q2_afterPrototypeModify: q2,
        q3_a_instanceMethod: q3_a,
        q3_b_stillPrototype: q3_b,
        q4_afterDelete: q4,
        q5_a_oldPrototype: q5_a,
        q5_c_newPrototype: q5_c
    };
    // ========================================================
}


// =============================================================================
// EXPORTS (Do not modify)
// =============================================================================
module.exports = {
    // Q1
    Animal,
    Dog,
    prototypeChainAnswers,
    
    // Q2
    Timer,
    
    // Q3
    Database,
    
    // Q4
    Serializable,
    Comparable,
    Cloneable,
    applyMixins,
    Person,
    
    // Q5
    ShapeConstructor,
    RectangleConstructor,
    createShape,
    createRectangle,
    ShapeClass,
    RectangleClass,
    patternDifferences,
    
    // Q6
    EventEmitter,
    
    // Q7
    demonstrateMethodBorrowing,
    methodBorrowingResult,
    
    // Q8
    createEntity,
    createRobot,
    createFish,
    createBird,
    createAquaBot,
    
    // Q9
    SecretKeeperModern,
    SecretKeeperWeakMap,
    privateFieldComparison,
    
    // Q10
    trickyPrototypeQuestion
};
