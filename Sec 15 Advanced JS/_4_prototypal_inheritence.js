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


┌─────────────────────────────────────────────────────────────────────────────┐
│ 🛠️ DEEP DIVE: Object.create() & Object.getPrototypeOf()                     │
│    (Interview-Ready Explanation for First-Year CSE Students)                │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
📘 WHAT IS Object.create()?
═══════════════════════════════════════════════════════════════════════════════

Object.create(proto) creates a NEW object and sets its __proto__ (prototype)
to whatever object you pass as the argument.

  Syntax: Object.create(prototypeObject, propertiesObject)
  
  • prototypeObject (required): The object to use as the new object's prototype
  • propertiesObject (optional): Additional properties to add to the new object


═══════════════════════════════════════════════════════════════════════════════
🎭 ANALOGY: THE ADOPTION AGENCY
═══════════════════════════════════════════════════════════════════════════════

Think of Object.create() like an ADOPTION AGENCY 👨‍👩‍👧:

  ┌────────────────────────────────────────────────────────────────────────┐
  │  🏠 The Parent Object = An Existing Family with Skills & Traditions    │
  │  ─────────────────────────────────────────────────────────────────────  │
  │  const chef = {                                                        │
  │      canCook: true,                                                    │
  │      makeFood() { return "Making delicious food!"; }                   │
  │  };                                                                    │
  │                                                                        │
  │  This family (chef) has cooking skills that can be passed down.        │
  └────────────────────────────────────────────────────────────────────────┘

  ┌────────────────────────────────────────────────────────────────────────┐
  │  👶 Object.create() = The Adoption Process                              │
  │  ─────────────────────────────────────────────────────────────────────  │
  │  const child = Object.create(chef);                                    │
  │                                                                        │
  │  • A new child (empty object) is "born"                                │
  │  • The child is LEGALLY connected to the chef family                   │
  │  • Child can ACCESS all family skills (canCook, makeFood)              │
  │  • Child can also learn NEW skills (own properties)                    │
  │                                                                        │
  │  child.name = "Junior";           // Child's own property              │
  │  console.log(child.canCook);      // true (inherited from chef)        │
  │  console.log(child.makeFood());   // "Making delicious food!"          │
  └────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════
🔧 UNDER THE HOOD: What Object.create() Actually Does
═══════════════════════════════════════════════════════════════════════════════

When you write: const child = Object.create(parent);

JavaScript does this internally:

  Step 1: Create a brand new empty object
          child = {}
          
  Step 2: Set the new object's __proto__ to point to 'parent'
          child.__proto__ = parent
          
  Step 3: Return the new object
          return child

  ┌──────────────────────────────────────────────────────────────────────┐
  │  VISUAL: Object.create(chef) creates:                                │
  │                                                                      │
  │     child                                                            │
  │    ┌──────────────┐                                                  │
  │    │ name: "Junior"│  (own property, added later)                    │
  │    │ __proto__: ──┼──────────► chef                                  │
  │    └──────────────┘            ┌────────────────────┐                │
  │                                │ canCook: true      │                │
  │                                │ makeFood: function │                │
  │                                │ __proto__: ────────┼──► Object.prototype
  │                                └────────────────────┘                │
  └──────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════
🔍 WHY Object.create() IS BETTER THAN __proto__
═══════════════════════════════════════════════════════════════════════════════

  ❌ BAD: Direct __proto__ assignment (deprecated, slower, can cause bugs)
  ─────────────────────────────────────────────────────────────────────────────
  const child = {};
  child.__proto__ = parent;  // ❌ Works but not recommended!
  
  Problems with __proto__:
  • It's a getter/setter, not a real property (performance issues)
  • Can be overwritten accidentally
  • Not available in some environments
  • Deprecated in favor of Object methods
  
  ✅ GOOD: Object.create() (clean, intentional, standard way)
  ─────────────────────────────────────────────────────────────────────────────
  const child = Object.create(parent);  // ✅ Clean and explicit!
  
  Benefits:
  • Clear intent - you're explicitly setting up inheritance
  • Works everywhere (standard ES5+)
  • Can add properties in the same call (second argument)
  • Better performance


═══════════════════════════════════════════════════════════════════════════════
📘 WHAT IS Object.getPrototypeOf()?
═══════════════════════════════════════════════════════════════════════════════

Object.getPrototypeOf(obj) returns the PROTOTYPE of the given object.
It's the SAFE, STANDARD way to read an object's prototype.

  Syntax: Object.getPrototypeOf(object)
  Returns: The prototype of the object (or null if no prototype)


═══════════════════════════════════════════════════════════════════════════════
🔎 ANALOGY: THE DNA TEST
═══════════════════════════════════════════════════════════════════════════════

Think of Object.getPrototypeOf() like a DNA TEST 🧬:

  ┌────────────────────────────────────────────────────────────────────────┐
  │  🧬 Object.getPrototypeOf() = Finding Your Biological Parent           │
  │  ─────────────────────────────────────────────────────────────────────  │
  │                                                                        │
  │  const chef = { canCook: true };                                       │
  │  const child = Object.create(chef);                                    │
  │                                                                        │
  │  // "Who is child's parent?"                                           │
  │  Object.getPrototypeOf(child) === chef;  // true! 🎉                   │
  │                                                                        │
  │  It's like asking: "Where did this object inherit from?"               │
  │  The answer tells you the prototype chain ancestry.                    │
  └────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════
💻 PRACTICAL CODE EXAMPLES
═══════════════════════════════════════════════════════════════════════════════

// ---------- Example 1: Creating an object with a specific prototype ----------
const superhero = {
    hasPowers: true,
    fight() { return "Fighting evil!"; }
};

const batman = Object.create(superhero);
batman.name = "Bruce Wayne";
batman.gadgets = ["Batarang", "Grappling Hook"];

console.log(batman.name);       // "Bruce Wayne" (own property)
console.log(batman.hasPowers);  // true (inherited)
console.log(batman.fight());    // "Fighting evil!" (inherited)

// ---------- Example 2: Checking the prototype chain ----------
console.log(Object.getPrototypeOf(batman) === superhero);  // true
console.log(Object.getPrototypeOf(superhero) === Object.prototype);  // true
console.log(Object.getPrototypeOf(Object.prototype));  // null (end of chain!)

// ---------- Example 3: Object with no prototype (rare but useful) ----------
const pureDictionary = Object.create(null);  // No inherited methods!
pureDictionary.key1 = "value1";
// pureDictionary.toString();  // ❌ ERROR! No inherited methods
// Useful for: hash maps, avoiding prototype pollution attacks


═══════════════════════════════════════════════════════════════════════════════
🎯 INTERVIEW TIPS: Object.create() & Object.getPrototypeOf()
═══════════════════════════════════════════════════════════════════════════════

Q: "What's the difference between Object.create() and the 'new' keyword?"
A: • Object.create(proto): Creates object with proto as prototype directly
   • new Constructor(): Runs constructor function, sets prototype to Constructor.prototype
   • Use Object.create() for simple inheritance, 'new' for constructor patterns

Q: "Why use Object.getPrototypeOf() instead of __proto__?"
A: • __proto__ is deprecated and non-standard
   • Object.getPrototypeOf() is the official, safe, standard method
   • Works consistently across all JavaScript environments

Q: "What does Object.create(null) do?"
A: Creates an object with NO prototype at all!
   • No inherited methods (toString, hasOwnProperty, etc.)
   • Useful for creating "pure" dictionary objects
   • Avoids prototype pollution vulnerabilities

Q: "How do you check if an object inherits from another?"
A: Use Object.getPrototypeOf() or isPrototypeOf():
   Object.getPrototypeOf(child) === parent  // true
   parent.isPrototypeOf(child)              // true

┌─────────────────────────────────────────────────────────────────────────────┐
│ 📝 QUICK REFERENCE CHEAT SHEET                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Object.create(proto)         → Create new object with 'proto' as parent   │
│  Object.getPrototypeOf(obj)   → Get the parent/prototype of 'obj'          │
│  Object.setPrototypeOf(obj, proto) → Change prototype (⚠️ slow, avoid!)    │
│  parent.isPrototypeOf(child)  → Check if parent is in child's chain        │
│  obj.hasOwnProperty(prop)     → Check if prop is on obj itself, not chain  │
│                                                                             │
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
        return "Animal walks";
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
console.log(dog.walk());              // "Animal walks" (inherited method)


// ============================================================================
// EXAMPLE 2: Using Object.create() (✅ RECOMMENDED WAY)
// ============================================================================

const vehicle = {
    hasWheels: true,
    start() {
        return "Vehicle starting...";
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
console.log(car.start());

// ============================================================================
// EXAMPLE 3: Constructor Functions & prototype property
// ============================================================================

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│ 🏭 CONSTRUCTOR FUNCTIONS & PROTOTYPE PROPERTY - DEEP DIVE                   │
│    (Interview-Ready Explanation for First-Year CSE Students)                │
└─────────────────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
📘 WHAT IS A CONSTRUCTOR FUNCTION?
═══════════════════════════════════════════════════════════════════════════════

A constructor function is a REGULAR FUNCTION that:
  1. Is meant to be called with the 'new' keyword
  2. By convention, starts with a CAPITAL LETTER (e.g., Person, Car, User)
  3. Uses 'this' to assign properties to the newly created object
  
Think of it as a BLUEPRINT or TEMPLATE for creating objects.


═══════════════════════════════════════════════════════════════════════════════
🍕 ANALOGY: THE FACTORY & SHARED TOOLBOX
═══════════════════════════════════════════════════════════════════════════════

Imagine a PIZZA FACTORY 🏭:

  ┌────────────────────────────────────────────────────────────────────────┐
  │  🏭 Constructor Function = The Pizza Factory                           │
  │  ─────────────────────────────────────────────────────────────────────  │
  │  The factory has a BLUEPRINT (the constructor function itself).        │
  │  Every pizza made gets its OWN toppings (instance properties).         │
  │                                                                        │
  │  Example: function Pizza(topping) { this.topping = topping; }          │
  │  Each pizza: new Pizza("pepperoni"), new Pizza("mushroom"), etc.       │
  └────────────────────────────────────────────────────────────────────────┘

  ┌────────────────────────────────────────────────────────────────────────┐
  │  🧰 Prototype = The Shared Toolbox                                      │
  │  ─────────────────────────────────────────────────────────────────────  │
  │  The factory has ONE shared toolbox (prototype) in the break room.     │
  │  • ALL workers (instances) can use the same tools (methods)            │
  │  • No need to buy a separate toolbox for EACH worker!                  │
  │  • Memory efficient! 🎉                                                 │
  │                                                                        │
  │  Example: Pizza.prototype.bake = function() { ... }                    │
  │  Every pizza can call .bake() but there's only ONE copy of the method! │
  └────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════
🔧 UNDER THE HOOD: What happens when you use 'new'?
═══════════════════════════════════════════════════════════════════════════════

When you write: const alice = new Person1("Alice");

JavaScript does these 4 steps AUTOMATICALLY:

  Step 1: Create an empty object
          {} 
          
  Step 2: Link it to the prototype (set up inheritance)
          {}.__proto__ = Person1.prototype
          
  Step 3: Bind 'this' to the new object and run the constructor
          Person1.call({}, "Alice")  →  { name: "Alice" }
          
  Step 4: Return the object (if constructor doesn't return an object)
          return { name: "Alice" }

  ┌──────────────────────────────────────────────────────────────────────┐
  │  VISUAL: What 'new Person1("Alice")' creates:                        │
  │                                                                      │
  │     alice                                                            │
  │    ┌──────────────┐                                                  │
  │    │ name: "Alice"│                                                  │
  │    │ __proto__: ──┼──────────► Person1.prototype                     │
  │    └──────────────┘            ┌────────────────────┐                │
  │                                │ greet: function()  │                │
  │                                │ __proto__: ────────┼──► Object.prototype
  │                                └────────────────────┘                │
  └──────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════
💡 WHY ADD METHODS TO PROTOTYPE INSTEAD OF INSIDE CONSTRUCTOR?
═══════════════════════════════════════════════════════════════════════════════

  ❌ BAD: Defining method INSIDE constructor (copies method to every instance)
  ─────────────────────────────────────────────────────────────────────────────
  function Person(name) {
      this.name = name;
      this.greet = function() { console.log("Hi " + this.name); } // ❌ Wasteful!
  }
  
  const p1 = new Person("A");  // p1 has its OWN copy of greet()
  const p2 = new Person("B");  // p2 has its OWN copy of greet()
  // 100 instances = 100 copies of the SAME function! 😱
  
  ✅ GOOD: Defining method ON PROTOTYPE (shared by all instances)
  ─────────────────────────────────────────────────────────────────────────────
  function Person(name) {
      this.name = name;  // Only unique data goes here
  }
  Person.prototype.greet = function() { console.log("Hi " + this.name); } // ✅
  
  const p1 = new Person("A");  // p1 uses shared greet()
  const p2 = new Person("B");  // p2 uses SAME shared greet()
  // 100 instances = STILL just 1 copy of greet()! 🎉

  ┌─────────────────────────────────────────────────────────────────────────┐
  │  MEMORY COMPARISON (100 instances):                                     │
  │                                                                         │
  │    ❌ Methods in constructor:   [💾💾💾💾💾...] 100 copies = lots of RAM │
  │    ✅ Methods on prototype:     [💾] 1 copy = minimal RAM               │
  └─────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════
🎯 INTERVIEW TIPS FOR THIS EXAMPLE
═══════════════════════════════════════════════════════════════════════════════

Q: "Why does alice.greet === bob.greet return true?"
A: Because both alice and bob DON'T have their own greet() method. They 
   both LOOK UP the prototype chain and find the SAME greet function on 
   Person1.prototype. It's literally the same function in memory!

Q: "What's the difference between instance properties vs prototype methods?"
A: • Instance properties (like 'name') are UNIQUE to each object
   • Prototype methods (like 'greet') are SHARED by all objects
   • Rule of thumb: Data → instance, Behavior → prototype

Q: "How does JavaScript know to look up the prototype?"
A: When you access alice.greet, JavaScript:
   1. First checks if alice has 'greet' as its OWN property → NO
   2. Then checks alice.__proto__ (which is Person1.prototype) → YES! Found it!
   This is the PROTOTYPE CHAIN in action.

═══════════════════════════════════════════════════════════════════════════════
*/

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
