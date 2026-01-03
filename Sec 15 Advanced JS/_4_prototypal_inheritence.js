/*
╔══════════════════════════════════════════════════════════════════════════════╗
║         ❌ YOUR MISTAKEN CODE vs ✅ CORRECTED CODE                            ║
║              (Learn from mistakes - great for interview prep!)               ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════════════
// ❌ MISTAKE 1: Using Arrow Function as Constructor
// ═══════════════════════════════════════════════════════════════════════════

/*
❌ YOUR CODE:
─────────────
let person = (name) => {
    this.name = name
}

WHY IT'S WRONG:
───────────────
• Arrow functions do NOT have their own 'this'
• Arrow functions do NOT have a 'prototype' property
• You CANNOT use 'new' with arrow functions
• When you try person.prototype, it returns 'undefined'!

ERROR YOU GOT:
──────────────
TypeError: Cannot set properties of undefined (setting 'nameCall')
(Because person.prototype is undefined for arrow functions)
*/

// ✅ CORRECT WAY:
function Person(name) {
    this.name = name;
}
// WHY THIS WORKS: Regular functions have their own 'this' and 'prototype' property


// ═══════════════════════════════════════════════════════════════════════════
// ❌ MISTAKE 2: Using Arrow Function for Prototype Method
// ═══════════════════════════════════════════════════════════════════════════

/*
❌ YOUR CODE:
─────────────
person.prototype.nameCall = () => {
    console.log(`This is the person's sister : ${this.name}`)
}

WHY IT'S WRONG:
───────────────
• Arrow functions inherit 'this' from WHERE THEY ARE DEFINED (lexical scope)
• In this case, 'this' refers to the global object or undefined (in strict mode)
• So 'this.name' would NOT refer to the person's name!

WHAT WOULD HAPPEN (if it ran):
──────────────────────────────
this.name would be undefined or the global 'name' property, NOT "Samriddhi"
*/

// ✅ CORRECT WAY:
Person.prototype.nameCall = function() {
    console.log(`This is the person's name: ${this.name}`);
};
// WHY THIS WORKS: Regular functions get 'this' from HOW THEY ARE CALLED
// When called as Sayantan.nameCall(), 'this' becomes the Sayantan object


// ═══════════════════════════════════════════════════════════════════════════
// ❌ MISTAKE 3: Calling Method on Constructor Instead of Instance
// ═══════════════════════════════════════════════════════════════════════════

/*
❌ YOUR CODE:
─────────────
let Sayantan = new person("Samriddhi")
person.nameCall()  // ← Called on 'person' (constructor)

WHY IT'S WRONG:
───────────────
• 'person' is the constructor function itself
• 'nameCall' is defined on 'person.prototype', not on 'person'
• You need to call it on an INSTANCE (like Sayantan)

CORRECT CALL:
─────────────
Sayantan.nameCall()  // ← Call on the instance!
*/

// ✅ CORRECT WAY:
let Sayantan = new Person("Samriddhi");
Sayantan.nameCall();  // Output: "This is the person's name: Samriddhi"


// ═══════════════════════════════════════════════════════════════════════════
// 📊 SIDE-BY-SIDE COMPARISON
// ═══════════════════════════════════════════════════════════════════════════

/*
┌────────────────────────────────────┬────────────────────────────────────────┐
│         ❌ YOUR MISTAKEN CODE       │         ✅ CORRECTED CODE              │
├────────────────────────────────────┼────────────────────────────────────────┤
│                                    │                                        │
│ let person = (name) => {           │ function Person(name) {                │
│     this.name = name               │     this.name = name;                  │
│ }                                  │ }                                      │
│                                    │                                        │
│ person.prototype.nameCall = () => {│ Person.prototype.nameCall = function() │
│   console.log(`...${this.name}`)   │   console.log(`...${this.name}`);      │
│ }                                  │ };                                     │
│                                    │                                        │
│ let Sayantan = new person("Sam")   │ let Sayantan = new Person("Sam");      │
│ person.nameCall()                  │ Sayantan.nameCall();                   │
│                                    │                                        │
├────────────────────────────────────┼────────────────────────────────────────┤
│ ❌ TypeError: Cannot set           │ ✅ Output: "This is the person's       │
│    properties of undefined         │    name: Samriddhi"                    │
└────────────────────────────────────┴────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎯 INTERVIEW TIP: Why Arrow Functions Can't Be Constructors                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Arrow functions were designed for SHORT, SIMPLE functions that don't      │
│  need their own 'this' context. They're great for:                         │
│  • Array methods: arr.map(x => x * 2)                                      │
│  • Callbacks: setTimeout(() => console.log("Hi"), 1000)                    │
│  • Event handlers where you want to preserve outer 'this'                  │
│                                                                             │
│  But they CANNOT be used for:                                              │
│  • Constructor functions (no 'new')                                        │
│  • Prototype methods (wrong 'this')                                        │
│  • Methods that need dynamic 'this'                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
*/







/*
╔══════════════════════════════════════════════════════════════════════════════╗
║              🧬 PROTOTYPAL INHERITANCE IN JAVASCRIPT 🧬                      ║
║                  (Interview Revision Notes for Beginners)                    ║
╚══════════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────────┐
│ 📌 WHAT IS PROTOTYPAL INHERITANCE?                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ In JavaScript, objects can inherit properties and methods from other        │
│ objects. This is called PROTOTYPAL INHERITANCE.                             │
│                                                                              │
│ 🎯 Simple Definition:                                                        │
│ "Every object has a hidden link (__proto__) to another object called        │
│  its PROTOTYPE. If a property isn't found on the object, JavaScript         │
│  looks up the chain to find it."                                            │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🍕 REAL-LIFE ANALOGY (Remember This!)                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Think of it like a FAMILY RECIPE BOOK:                                    │
│                                                                              │
│   👵 Grandma's Recipe Book (Object.prototype - the root)                    │
│       ↑                                                                      │
│   👩 Mom's Recipe Book (inherits from Grandma, adds new recipes)            │
│       ↑                                                                      │
│   👧 Your Recipe Book (inherits from Mom, adds YOUR recipes)                │
│                                                                              │
│   When you need a recipe:                                                   │
│   1. First, check YOUR book                                                 │
│   2. Not found? Check Mom's book                                            │
│   3. Still not found? Check Grandma's book                                  │
│   4. Not found anywhere? Recipe doesn't exist! (undefined)                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🔗 THE PROTOTYPE CHAIN (Visual Diagram)                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────┐    __proto__    ┌─────────────┐    __proto__    ┌───────┐ │
│   │  myObject   │ ──────────────► │  Parent     │ ──────────────► │ null  │ │
│   │  {name:"A"} │                 │  {greet()}  │                 │       │ │
│   └─────────────┘                 └─────────────┘                 └───────┘ │
│                                          ↑                                   │
│                                   Object.prototype                           │
│                                   (has toString, hasOwnProperty, etc.)       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🔑 KEY TERMS TO REMEMBER                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  • __proto__        → The actual link to the parent object (getter/setter)  │
│  • prototype        → A property on FUNCTIONS used to set __proto__ of      │
│                       objects created with 'new'                            │
│  • Object.create()  → Creates a new object with specified prototype         │
│  • Object.getPrototypeOf() → Safely get an object's prototype               │
│                                                                              │
│  ⚠️ IMPORTANT DISTINCTION:                                                   │
│  • __proto__ → exists on ALL objects (the actual link)                      │
│  • prototype → exists only on FUNCTIONS (template for new objects)          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                              💻 CODE EXAMPLES
═══════════════════════════════════════════════════════════════════════════════
*/

// ============================================================================
// EXAMPLE 1: Basic Prototype Chain
// ============================================================================

const animal = {
    eats: true,
    walk() {
        console.log("Animal walks");
    }
};

let dog = {
    barks: true
};

// Setting up inheritance: dog inherits from animal
// dog.__proto__ = animal;  // ⚠️ Not recommended in production, use Object.create() instead like this: dog = Object.create(animal);
dog = Object.create(animal);


console.log(dog.barks);  // true (own property)
console.log(dog.eats);   // true (inherited from animal)
dog.walk();              // "Animal walks" (inherited method)


// ============================================================================
// EXAMPLE 2: Using Object.create() (✅ RECOMMENDED WAY)
// ============================================================================

const vehicle = {
    hasWheels: true,
    start() {
        console.log("Vehicle starting...");
    }
};

// Create 'car' with 'vehicle' as its prototype
const car = Object.create(vehicle);
car.brand = "Toyota";
car.honk = function() {
    console.log("Beep beep!");
};

console.log(car.brand);      // "Toyota" (own property)
console.log(car.hasWheels);  // true (inherited)
car.start();                 // "Vehicle starting..." (inherited)
car.honk();                  // "Beep beep!" (own method)


// ============================================================================
// EXAMPLE 3: Constructor Functions & prototype property
// ============================================================================

function Person1(name) {
    this.name = name;
}

// Adding method to Person's prototype (shared by ALL Person instances)
Person1.prototype.greet = function() {
    console.log(`Hello, I'm ${this.name}`);
};

const alice = new Person1("Alice");
const bob = new Person1("Bob");

alice.greet();  // "Hello, I'm Alice"
bob.greet();    // "Hello, I'm Bob"

// Both share the SAME greet function (memory efficient!)
console.log(alice.greet === bob.greet);  // true ✅


// ============================================================================
// EXAMPLE 4: ES6 Classes (Syntactic Sugar over Prototypes)
// ============================================================================

class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);  // Call parent constructor
        this.breed = breed;
    }
    
    bark() {
        console.log(`${this.name} barks: Woof!`);
    }
}

const buddy = new Dog("Buddy", "Golden Retriever");
buddy.speak();  // "Buddy makes a sound" (inherited)
buddy.bark();   // "Buddy barks: Woof!" (own method)


/*
═══════════════════════════════════════════════════════════════════════════════
                         📋 INTERVIEW CHEAT SHEET
═══════════════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│ ❓ COMMON INTERVIEW QUESTIONS & ANSWERS                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ Q1: What is prototypal inheritance?                                         │
│ A:  Objects inheriting properties/methods from other objects through a      │
│     prototype chain. JS looks up the chain when a property isn't found.     │
│                                                                              │
│ Q2: What's the difference between __proto__ and prototype?                  │
│ A:  __proto__ → actual link on objects to their parent                      │
│     prototype → property on functions, becomes __proto__ of new instances   │
│                                                                              │
│ Q3: What is at the end of every prototype chain?                            │
│ A:  null. Object.prototype.__proto__ === null                               │
│                                                                              │
│ Q4: How do ES6 classes relate to prototypes?                                │
│ A:  Classes are "syntactic sugar" - under the hood, they still use          │
│     prototypal inheritance. 'extends' sets up the prototype chain.          │
│                                                                              │
│ Q5: Why put methods on prototype instead of in constructor?                 │
│ A:  Memory efficiency! Methods on prototype are shared by all instances     │
│     instead of being copied to each object.                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚡ QUICK TIPS FOR INTERVIEWS                                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ ✅ Use Object.create() for inheritance (cleaner than __proto__)             │
│ ✅ Use Object.getPrototypeOf() to safely access prototype                   │
│ ✅ Remember: Arrays, Functions are objects with their own prototypes        │
│ ✅ hasOwnProperty() checks if property is on object itself, not inherited   │
│ ❌ Avoid modifying built-in prototypes (like Array.prototype)               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎯 ONE-LINER TO REMEMBER                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   "In JavaScript, objects inherit from objects through a prototype chain.   │
│    When a property isn't found, JS walks up the chain until it finds it     │
│    or reaches null."                                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
*/
