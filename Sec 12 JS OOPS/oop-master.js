let car = {
    brand: "Tyota",
    model : "Fortuner",
    modelDate : "2024",
    start : function(){
        return `${this.brand} hit road first in ${this.modelDate}`
    }

}
console.log(car.start())



/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPAL CHAINING IN JAVASCRIPT                         ║
 * ║                 🎯 Interview Revision Guide for Beginners 🎯                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * 📖 SIMPLE DEFINITION (Learn this for interviews!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * "Prototypal Chaining is how JavaScript searches for properties/methods - 
 *  it starts at the object, then climbs UP through parent objects (prototypes) 
 *  until it finds what it's looking for or reaches the end (null)."
 * 
 * 
 * 🔍 EASY ANALOGY: TREASURE HUNT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Imagine looking for a book in your house:
 *   1️⃣  First, check YOUR room (the object itself)
 *   2️⃣  Not found? Check PARENT's room (parent prototype)
 *   3️⃣  Still not found? Check GRANDPARENT's room (grandparent prototype)
 *   4️⃣  Keep going UP until you find it or run out of rooms (null)
 * 
 *   This "climbing up" process IS the prototype chain!
 * 
 * 
 * 🔗 VISUAL: HOW THE CHAIN WORKS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   When you access: dog.toString()
 * 
 *   ┌──────────────┐      ┌──────────────┐      ┌───────────────────┐
 *   │     dog      │  →   │   Animal     │  →   │ Object.prototype  │  →  null
 *   │  name: Rex   │      │ speak: fn()  │      │ toString: fn()    │
 *   │  bark: fn()  │      │              │      │ hasOwnProperty    │
 *   └──────────────┘      └──────────────┘      └───────────────────┘
 *         ❌                    ❌                      ✅ FOUND!
 *   
 *   JS Search Path: dog → Animal → Object.prototype → Found toString()!
 * 
 * 
 * 🔑 FOUR KEY THINGS TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 1️⃣  Every object has a hidden [[Prototype]] link to another object
 * 2️⃣  JS automatically searches UP the chain when a property isn't found
 * 3️⃣  The chain ALWAYS ends at Object.prototype → null
 * 4️⃣  If property is not found anywhere → returns undefined
 * 
 * 
 * 🛠️ METHODS TO WORK WITH PROTOTYPE CHAIN:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌─────────────────────────────────┬───────────────────────────────────────┐
 *   │ Method                          │ What it does                          │
 *   ├─────────────────────────────────┼───────────────────────────────────────┤
 *   │ __proto__                       │ Direct link to parent (legacy)        │
 *   │ Object.getPrototypeOf(obj)      │ ✅ Get an object's prototype          │
 *   │ Object.setPrototypeOf(obj, p)   │ ✅ Set an object's prototype          │
 *   │ Object.create(proto)            │ ✅ Create object with given prototype │
 *   │ obj instanceof Constructor      │ ✅ Check if obj is in the chain       │
 *   │ Constructor.prototype           │ The prototype object for instances    │
 *   └─────────────────────────────────┴───────────────────────────────────────┘
 * 
 * 
 * 💻 SIMPLE EXAMPLE: Building a Chain
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   // Step 1: Create the "parent" object
 *   let animal = {
 *       eats: true,
 *       walk() { return "Animal walks"; }
 *   };
 *   
 *   // Step 2: Create "child" that inherits from parent
 *   let dog = Object.create(animal);  // dog → animal → Object.prototype
 *   dog.barks = true;
 *   
 *   // Step 3: Access properties through the chain
 *   console.log(dog.barks);    // true   ← Found on dog itself
 *   console.log(dog.eats);     // true   ← Found on animal (parent)
 *   console.log(dog.walk());   // "Animal walks" ← Method from parent
 *   console.log(dog.toString); // [Function] ← Found on Object.prototype!
 * 
 * 
 * 🏗️ WITH CONSTRUCTOR FUNCTIONS:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   function Animal(name) {
 *       this.name = name;
 *   }
 *   Animal.prototype.speak = function() {    // Add method to prototype
 *       return `${this.name} makes a sound`;
 *   };
 *   
 *   const rex = new Animal("Rex");
 *   
 *   // The chain looks like:
 *   // rex → Animal.prototype → Object.prototype → null
 *   
 *   rex.speak();        // "Rex makes a sound" ← Found on Animal.prototype
 *   rex.toString();     // Works! ← Found on Object.prototype
 * 
 * 
 * ⚡ ADDING METHODS TO BUILT-IN PROTOTYPES:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   // You can extend Array, String, etc. (use with caution!)
 *   Array.prototype.first = function() {
 *       return this[0];
 *   };
 *   
 *   [1, 2, 3].first();  // 1 ← Now ALL arrays have this method!
 * 
 * 
 * ⚠️ COMMON INTERVIEW GOTCHA:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   const obj = {};
 *   console.log(obj.hasOwnProperty);    // [Function] ← Where does this come from?
 *   
 *   Answer: obj doesn't have it, but Object.prototype does!
 *   Chain: obj → Object.prototype (has hasOwnProperty) → null
 * 
 * 
 * 📝 QUICK INTERVIEW CHEAT SHEET:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   Q: "What is the prototype chain?"
 *   A: "It's the chain of linked objects JS follows when looking for a property. 
 *       If not found on the object, JS searches its prototype, then that 
 *       object's prototype, until it finds it or reaches null."
 * 
 *   Q: "What's at the end of every prototype chain?"
 *   A: "Object.prototype, which then points to null."
 * 
 *   Q: "How do you create an object with a specific prototype?"
 *   A: "Use Object.create(prototypeObject) to create a new object that 
 *       inherits from the specified prototype."
 * 
 *   Q: "How do you add a method that ALL instances share?"
 *   A: "Add it to Constructor.prototype - all instances created with 'new' 
 *       will have access to it through the prototype chain."
 * 
 * 
 * 💡 ONE-LINER TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━
 *    "Prototype Chain = JS asking: 'Do you have it? No? Let me ask your parent!'"
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */



function Animal(species){
    this.species = species;
}
Animal.prototype.sound = function(){
    return `The animal ${this.species} makes a sound` // "this" keyword is used to access the properties of the object 
}
//adding a method to the constructor function
Array.prototype.myRatings = function(){
    return `The rating of the array is ${this}` // "this" keyword is used to access the properties of the object 
}

let firstRatings = [1,2,3,4,5]
let secondRatings = [5,6,7,8,9]
console.log(firstRatings.myRatings())
console.log(secondRatings.myRatings())
let species = new Animal("Tiger")
console.log(species.sound())


/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                        INHERITANCE IN JAVASCRIPT                             ║
 * ║                 🎯 Interview Revision Guide for Beginners 🎯                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * 📖 SIMPLE DEFINITION (Learn this for interviews!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * "Inheritance allows a CHILD class to get all properties and methods from a 
 *  PARENT class, so you don't have to write the same code again. It creates 
 *  an 'is-a' relationship (a Car IS-A Vehicle)."
 * 
 * 
 * 👨‍👩‍👧 EASY ANALOGY: FAMILY TRAITS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Think of it like genetics:
 *   - PARENT has certain traits (properties) and abilities (methods)
 *   - CHILD automatically gets those traits from parent
 *   - CHILD can also have their OWN unique traits
 *   - CHILD can even do things DIFFERENTLY than parent (override)
 * 
 *   Parent: Vehicle → has wheels, can start()
 *   Child:  Car     → gets wheels & start(), PLUS has doors, can honk()
 * 
 * 
 * 🔗 VISUAL: CLASS HIERARCHY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *                    ┌─────────────────┐
 *                    │     Vehicle     │  ← PARENT (Base Class)
 *                    │  brand, model   │
 *                    │  start()        │
 *                    └────────┬────────┘
 *                             │ extends
 *              ┌──────────────┼──────────────┐
 *              ▼              ▼              ▼
 *    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
 *    │     Car     │  │    Bike     │  │    Truck    │  ← CHILDREN
 *    │  + doors    │  │  + gears    │  │  + capacity │
 *    │  + honk()   │  │  + pedal()  │  │  + load()   │
 *    └─────────────┘  └─────────────┘  └─────────────┘
 * 
 *    All children HAVE: brand, model, start() (inherited from Vehicle)
 *    Each child ADDS: their own unique properties and methods
 * 
 * 
 * 🔑 THREE ESSENTIAL KEYWORDS:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   1️⃣  extends  →  "I want to inherit from this parent"
 *       class Car extends Vehicle { }
 * 
 *   2️⃣  super()  →  "Call the parent's constructor first"
 *       constructor(brand, model, doors) {
 *           super(brand, model);  // ⚠️ MUST be called FIRST!
 *           this.doors = doors;   // Then add child's own stuff
 *       }
 * 
 *   3️⃣  super.methodName()  →  "Call the parent's version of this method"
 *       start() {
 *           return super.start() + " with turbo!";  // Parent's start() + extra
 *       }
 * 
 * 
 * 💻 COMPLETE EXAMPLE:
 * ━━━━━━━━━━━━━━━━━━━━
 * 
 *   // PARENT CLASS
 *   class Animal {
 *       constructor(name) {
 *           this.name = name;
 *       }
 *       speak() {
 *           return `${this.name} makes a sound`;
 *       }
 *   }
 *   
 *   // CHILD CLASS
 *   class Dog extends Animal {           // ← extends keyword
 *       constructor(name, breed) {
 *           super(name);                 // ← Call parent constructor FIRST
 *           this.breed = breed;          // ← Add child's own property
 *       }
 *       speak() {                        // ← METHOD OVERRIDING
 *           return `${this.name} barks: Woof!`;    // Different behavior!
 *       }
 *       fetch() {                        // ← Child's own method
 *           return `${this.name} fetches the ball`;
 *       }
 *   }
 *   
 *   const rex = new Dog("Rex", "German Shepherd");
 *   rex.name;     // "Rex"       ← Inherited from Animal
 *   rex.breed;    // "German Shepherd" ← Dog's own property
 *   rex.speak();  // "Rex barks: Woof!" ← Overridden method
 *   rex.fetch();  // "Rex fetches the ball" ← Dog's own method
 * 
 * 
 * ⚠️ IMPORTANT RULES:
 * ━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌────────────────────────────────────────────────────────────────────┐
 *   │ Rule                                │ Why?                         │
 *   ├────────────────────────────────────────────────────────────────────┤
 *   │ super() must be called FIRST        │ Parent needs to set up first │
 *   │ Can't use 'this' before super()     │ 'this' doesn't exist yet!    │
 *   │ Child can override parent methods   │ Polymorphism - same name,    │
 *   │                                     │ different behavior           │
 *   │ Child can add new properties/methods│ Extend parent's capabilities │
 *   └────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * 🆚 WHEN TO USE INHERITANCE:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ✅ USE when there's an "IS-A" relationship:
 *      - Dog IS-A Animal ✓
 *      - Car IS-A Vehicle ✓
 *      - Student IS-A Person ✓
 * 
 *   ❌ DON'T USE for "HAS-A" relationships (use composition instead):
 *      - Car HAS-A Engine (Engine should be a property, not parent)
 * 
 * 
 * 📝 QUICK INTERVIEW CHEAT SHEET:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   Q: "What is inheritance?"
 *   A: "Inheritance allows a child class to acquire properties and methods 
 *       from a parent class, promoting code reuse and establishing an 
 *       'is-a' relationship."
 * 
 *   Q: "What does the 'extends' keyword do?"
 *   A: "It creates a child class that inherits all properties and methods 
 *       from the parent class."
 * 
 *   Q: "What is 'super' used for?"
 *   A: "super() calls the parent's constructor, and super.method() calls 
 *       the parent's version of a method. super() must be called first 
 *       in the child constructor before using 'this'."
 * 
 *   Q: "What is method overriding?"
 *   A: "When a child class redefines a method that exists in the parent. 
 *       The child's version is used when called on child instances."
 * 
 * 
 * 💡 ONE-LINER TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━
 *    "Inheritance = Child gets parent's stuff for FREE + can add their own!"
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */


class Vechile{
    constructor(brand, model){
        this.brand = brand;
        this.model = model;
    }
    start(){
        return `${this.brand}'s favourite model is ${this.model}`
    }
}   

let gari = new Vechile("Tyota", "Fortuner")
console.log(gari.start())

//here we are using inheritence to inherit the properties of the parent class, where parent class is "Vechile"
//here we are using extends keyword to inherit the properties of the parent class "Vechile", where child class is "Car"
//here we are using super keyword to inherit the properties of the parent class "Vechile", where super is used to call the constructor of the parent class "Vechile"

class Car extends Vechile{
    constructor(brand, model, year){
        super(brand, model)
        this.year = year;
    }
    start(){
        return `${this.brand}'s favourite model is ${this.model} and it is ${this.year}`
    }
}   

let audi = new Car("Audi", "A4", "2024")
console.log(audi.start())



/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    ENCAPSULATION IN JAVASCRIPT                               ║
 * ║                 🎯 Interview Revision Guide for Beginners 🎯                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * 📖 SIMPLE DEFINITION (Learn this for interviews!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * "Encapsulation is BUNDLING data and methods together in a class, while 
 *  HIDING the internal details. Data can only be accessed through controlled 
 *  methods (getters/setters), not directly from outside."
 * 
 * 
 * 🏦 EASY ANALOGY: BANK VAULT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Think of your bank account:
 *   - Your BALANCE is private (hidden in the vault) 🔒
 *   - You CAN'T directly touch the money in the vault
 *   - You CAN use ATM methods: getBalance(), deposit(), withdraw()
 *   - The ATM controls HOW you interact (validates, limits, etc.)
 * 
 *   This is encapsulation: Hide the data, expose controlled access!
 * 
 * 
 * 🔐 VISUAL: PUBLIC vs PRIVATE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌────────────────────────────────────────────────────────────┐
 *   │                    class BankAccount                       │
 *   │  ┌─────────────────────────────────────────────────────┐  │
 *   │  │          🔒 PRIVATE (Hidden Inside)                 │  │
 *   │  │              #balance = 1000                        │  │
 *   │  │              #pin = 1234                            │  │
 *   │  │              #validatePin() { ... }                 │  │
 *   │  └─────────────────────────────────────────────────────┘  │
 *   │                                                            │
 *   │  ┌─────────────────────────────────────────────────────┐  │
 *   │  │          🌐 PUBLIC (Accessible from outside)        │  │
 *   │  │              getBalance() { return #balance }       │  │
 *   │  │              deposit(amt) { #balance += amt }       │  │
 *   │  │              withdraw(amt) { ... validates first }  │  │
 *   │  └─────────────────────────────────────────────────────┘  │
 *   └────────────────────────────────────────────────────────────┘
 *   
 *   Outside code: account.getBalance() ✅
 *   Outside code: account.#balance     ❌ SyntaxError!
 * 
 * 
 * 🔑 THE # SYMBOL (Private Fields)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌──────────────────┬──────────────────────────────────────────┐
 *   │ Syntax           │ What it means                            │
 *   ├──────────────────┼──────────────────────────────────────────┤
 *   │ #fieldName       │ Truly PRIVATE - JS engine enforces this  │
 *   │ _fieldName       │ Just a CONVENTION - not actually private │
 *   │ this.#field      │ Access private field inside the class    │
 *   │ obj.#field       │ ❌ ERROR! Can't access from outside      │
 *   └──────────────────┴──────────────────────────────────────────┘
 * 
 * 
 * 💻 COMPLETE EXAMPLE:
 * ━━━━━━━━━━━━━━━━━━━━
 * 
 *   class BankAccount {
 *       // 🔒 PRIVATE fields (hidden from outside)
 *       #balance;
 *       #transactionHistory = [];
 *       
 *       constructor(initialBalance) {
 *           this.#balance = initialBalance;      // Set private field
 *       }
 *       
 *       // 🌐 PUBLIC methods (controlled access)
 *       getBalance() {
 *           return this.#balance;                // ✅ Can access inside class
 *       }
 *       
 *       deposit(amount) {
 *           if (amount > 0) {                    // ← Validation!
 *               this.#balance += amount;
 *               this.#logTransaction('deposit', amount);
 *           }
 *       }
 *       
 *       withdraw(amount) {
 *           if (amount > 0 && amount <= this.#balance) {  // ← Validation!
 *               this.#balance -= amount;
 *               return amount;
 *           }
 *           return "Insufficient funds";
 *       }
 *       
 *       // 🔒 PRIVATE method (helper, hidden from outside)
 *       #logTransaction(type, amount) {
 *           this.#transactionHistory.push({ type, amount, date: new Date() });
 *       }
 *   }
 *   
 *   const account = new BankAccount(500);
 *   account.getBalance();      // 500    ← ✅ Controlled access
 *   account.deposit(100);      // Works! Balance is now 600
 *   account.#balance;          // ❌ SyntaxError! Private field
 *   account.#balance = 999999; // ❌ Can't cheat! Private field
 * 
 * 
 * 🎯 USING GETTERS & SETTERS:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   class Person {
 *       #age;
 *       
 *       constructor(age) {
 *           this.#age = age;
 *       }
 *       
 *       // GETTER - access like a property: person.age
 *       get age() {
 *           return this.#age;
 *       }
 *       
 *       // SETTER - assign like a property: person.age = 25
 *       set age(value) {
 *           if (value > 0 && value < 150) {      // ← Validation!
 *               this.#age = value;
 *           } else {
 *               console.log("Invalid age!");
 *           }
 *       }
 *   }
 *   
 *   const john = new Person(25);
 *   john.age;          // 25    ← Uses getter (looks like property access)
 *   john.age = 30;     // Works! ← Uses setter (looks like assignment)
 *   john.age = -5;     // "Invalid age!" ← Setter rejected it!
 * 
 * 
 * ✅ BENEFITS OF ENCAPSULATION:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   1️⃣  DATA PROTECTION  → Prevent accidental or malicious changes
 *   2️⃣  VALIDATION       → Control what values can be set
 *   3️⃣  FLEXIBILITY      → Change internal implementation without breaking outside code
 *   4️⃣  CLEANER API      → Users only see what they need to use
 * 
 * 
 * ⚠️ IMPORTANT TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   • Private fields with # are NOT accessible even in subclasses!
 *   • Must DECLARE private fields at top of class before using
 *   • # is part of the name: #balance and balance are DIFFERENT fields
 *   • Private methods also use #: #helperMethod() { }
 * 
 * 
 * 📝 QUICK INTERVIEW CHEAT SHEET:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   Q: "What is encapsulation?"
 *   A: "Encapsulation is bundling data and methods together while hiding 
 *       internal details. Private data can only be accessed through 
 *       controlled public methods like getters and setters."
 * 
 *   Q: "How do you make a field private in JavaScript?"
 *   A: "Use the # prefix. For example: #balance. This creates a truly 
 *       private field that JS engine enforces - it can't be accessed 
 *       from outside the class."
 * 
 *   Q: "What's the difference between # and _ prefix?"
 *   A: "# creates TRUE privacy enforced by JavaScript. _ is just a naming 
 *       convention that hints 'don't touch this' but doesn't actually 
 *       prevent access."
 * 
 *   Q: "Why use encapsulation?"
 *   A: "To protect data from invalid changes, add validation in setters, 
 *       hide implementation details, and provide a clean public interface."
 * 
 * 
 * 💡 ONE-LINER TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━
 *    "Encapsulation = Hide the HOW, expose the WHAT. Use # to lock it up!"
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

class myBank{
    #balance = 505;
    getBalance(){

        return this.#balance
    }
}
let account = new myBank()
// console.log(myBank.#balance) // SyntaxError: Private field '#balance' must be declared in an enclosing class

console.log(account.getBalance())



/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                      ABSTRACTION IN JAVASCRIPT                               ║
 * ║                 🎯 Interview Revision Guide for Beginners 🎯                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * 📖 SIMPLE DEFINITION (Learn this for interviews!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * "Abstraction is hiding COMPLEX implementation details and showing only 
 *  the ESSENTIAL features. Users know WHAT it does, not HOW it does it."
 * 
 * 
 * 📺 EASY ANALOGY: TV REMOTE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Think of your TV remote:
 *   - You press "Power" button → TV turns on ✅
 *   - You DON'T need to know:
 *       • How the infrared signal works
 *       • How the TV processes the signal
 *       • How the display electronics turn on
 *   - You just use the SIMPLE INTERFACE (buttons)
 * 
 *   This is abstraction: Complex stuff hidden, simple interface exposed!
 * 
 * 
 * 🧊 VISUAL: THE ICEBERG MODEL
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *                     What USER sees (Simple Interface)
 *                    ┌─────────────────────────────┐
 *                    │    coffeeMachine.makeCoffee()    │
 *   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  (Water Line)
 *                    │                             │
 *                    │   🔒 HIDDEN COMPLEXITY:     │
 *                    │   #heatWater()              │
 *                    │   #grindBeans()             │
 *                    │   #applyPressure()          │
 *                    │   #mixWithMilk()            │
 *                    │   #temperature = 92         │
 *                    │   #pressure = 9             │
 *                    └─────────────────────────────┘
 *                         (Hidden Implementation)
 * 
 *   User calls: machine.makeCoffee("latte")  ✅ Simple!
 *   Machine internally runs 10 complex steps but user doesn't see them
 * 
 * 
 * 🔑 KEY PRINCIPLE:
 * ━━━━━━━━━━━━━━━━━━
 * 
 *   "Show WHAT, Hide HOW"
 *   
 *   ✅ WHAT: makeCoffee(), start(), sendEmail()    → User sees this
 *   🔒 HOW:  #heatTo92Degrees(), #encrypt()        → User doesn't see this
 * 
 * 
 * 💻 COMPLETE EXAMPLE:
 * ━━━━━━━━━━━━━━━━━━━━
 * 
 *   class CoffeeMachine {
 *       // 🔒 HIDDEN implementation details
 *       #waterTemp = 0;
 *       #beans = 0;
 *       
 *       #heatWater() {
 *           this.#waterTemp = 92;               // Complex heating logic
 *           return "Water heated to 92°C";
 *       }
 *       
 *       #grindBeans() {
 *           return "Beans ground to fine powder";
 *       }
 *       
 *       #brew() {
 *           return "Espresso extracted at 9 bar pressure";
 *       }
 *       
 *       // ✅ SIMPLE public interface - this is what users see!
 *       makeCoffee() {
 *           // User doesn't know these 3 complex steps happen:
 *           this.#heatWater();
 *           this.#grindBeans();
 *           return this.#brew() + " ☕ Coffee ready!";
 *       }
 *   }
 *   
 *   const machine = new CoffeeMachine();
 *   machine.makeCoffee();     // ☕ Coffee ready! ← Simple one-liner!
 *   machine.#heatWater();     // ❌ Error! Implementation is hidden
 * 
 * 
 * 🆚 ABSTRACTION vs ENCAPSULATION (Classic Interview Question!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌─────────────────────┬─────────────────────────────────────────┐
 *   │ ABSTRACTION         │ ENCAPSULATION                           │
 *   ├─────────────────────┼─────────────────────────────────────────┤
 *   │ Hide COMPLEXITY     │ Hide DATA                               │
 *   │ Focus: What vs How  │ Focus: Protecting internal state        │
 *   │ Design level concept│ Implementation level concept            │
 *   │ "I don't care HOW   │ "You can't touch my private variables"  │
 *   │  it works inside"   │                                         │
 *   └─────────────────────┴─────────────────────────────────────────┘
 *   
 *   💡 They work TOGETHER: 
 *      Encapsulation (# private) is a TOOL to achieve Abstraction!
 * 
 * 
 * 🛠️ THREE WAYS TO IMPLEMENT ABSTRACTION IN JS:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   1️⃣  Private Fields (#) - Modern ES2022+
 *       class Car {
 *           #engineMechanics() { ... complex logic ... }
 *           start() { this.#engineMechanics(); return "Vroom!"; }
 *       }
 * 
 *   2️⃣  Closures - Works everywhere
 *       function createCar() {
 *           const engineMechanics = () => { ... hidden logic ... };
 *           return { start: () => { engineMechanics(); return "Vroom!"; } };
 *       }
 * 
 *   3️⃣  Modules - Hide in separate files
 *       // internal.js (not exported)
 *       // public.js (exports only the simple interface)
 * 
 * 
 * ✅ BENEFITS OF ABSTRACTION:
 * ============================
 * 
 *   1️⃣  SIMPLICITY      → Users work with easy-to-understand methods
 *   2️⃣  MAINTAINABILITY → Change internals without breaking user code
 *   3️⃣  SECURITY        → Sensitive logic stays hidden
 *   4️⃣  REUSABILITY     → Clean interface makes code easier to reuse
 * 
 * 
 * 📝 QUICK INTERVIEW CHEAT SHEET:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   Q: "What is abstraction?"
 *   A: "Abstraction is hiding complex implementation details and exposing 
 *       only the essential features. Users know WHAT something does, 
 *       not HOW it does it internally."
 * 
 *   Q: "Give a real-world example of abstraction?"
 *   A: "A car's steering wheel - you turn it left to go left. You don't 
 *       need to know about the steering column, rack and pinion, or 
 *       power steering pump. The complexity is abstracted away."
 * 
 *   Q: "How do you implement abstraction in JavaScript?"
 *   A: "Using private fields (#) to hide internal methods and data, 
 *       while exposing only simple public methods for users to call."
 * 
 *   Q: "What's the difference between abstraction and encapsulation?"
 *   A: "Abstraction hides COMPLEXITY (implementation details), while 
 *       encapsulation hides DATA (protects internal state). They work 
 *       together - encapsulation is often used to achieve abstraction."
 * 
 * 
 * 💡 ONE-LINER TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━
 *    "Abstraction = Show WHAT, Hide HOW. Like a TV remote - press button, magic happens!"
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

class coffeeMachine{
    start(){
        return `starting the machine,`
    }
    brew(coffee){
         coffee = 50
         return `${coffee}gm cofee mixed with ${coffee}ml milk,`
    }
    startButton(){
        let go = this.start()
        let startProcess = this.brew()
        return `first ${go} then ${startProcess}`
    }
}
let me = new coffeeMachine()
console.log(me.startButton())

// ═══════════════════════════════════════════════════════════════════════════════
// POLYMORPHISM in JavaScript
// ═══════════════════════════════════════════════════════════════════════════════
// 
// Polymorphism means "many forms" - the same method name can behave differently
// depending on which object calls it. "One interface, multiple implementations."
//
// Key Types:
// 1. METHOD OVERRIDING → Child class redefines parent's method
//    The child's version is used when called on child instances
//    Example:
//      class Animal { speak() { return "..."; } }
//      class Dog extends Animal { speak() { return "Woof!"; } }
//      class Cat extends Animal { speak() { return "Meow!"; } }
//
// 2. DUCK TYPING → "If it walks like a duck, quacks like a duck..."
//    JS doesn't check types - if an object has the method, it works!
//    Example: Any object with a .speak() method can be used
//
// 3. METHOD OVERLOADING (simulated) → Same method handles different arguments
//    JS doesn't have true overloading, but we can check arguments manually
//    Example: function greet(name, age) { if (!age) {...} else {...} }
//
// Benefits:
// - Write flexible, reusable code
// - Process different objects through the same interface
// - Easily extend functionality without modifying existing code
//
// Example Pattern:
// function makeSound(animal) { console.log(animal.speak()); }
// makeSound(new Dog());  // "Woof!"
// makeSound(new Cat());  // "Meow!"  ← Same function, different behavior!
// ═══════════════════════════════════════════════════════════════════════════════

class Bird {
    fly=()=> {
        return "bird is flying";
    }
}
class Ostrich extends Bird{
    fly=()=> {
        return "ostrich is running";
    }
}
let bird = new Bird()
let ostrich = new Ostrich()
console.log(bird.fly())
console.log(ostrich.fly())



/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                       STATIC METHODS IN JAVASCRIPT                           ║
 * ║                 🎯 Interview Revision Guide for Beginners 🎯                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * 📖 SIMPLE DEFINITION (Learn this for interviews!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * "Static methods belong to the CLASS itself, NOT to individual instances.
 *  They're called directly on the class name (ClassName.method()) and 
 *  cannot access instance-specific data (this). Think of them as utility 
 *  functions attached to a class."
 * 
 * 
 * 🏫 EASY ANALOGY: SCHOOL PRINCIPAL vs STUDENTS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Think of a School class:
 *   - INSTANCE methods are like student abilities:
 *       • Each student has their OWN name, grade, homework
 *       • student1.doHomework() affects only student1
 *   
 *   - STATIC methods are like principal's announcements:
 *       • The principal speaks for the WHOLE school
 *       • School.makeAnnouncement() doesn't need a specific student
 *       • It belongs to the School itself, not any individual student
 * 
 *   STATIC = "I belong to the building, not the people inside!"
 * 
 * 
 * 🔗 VISUAL: STATIC vs INSTANCE METHODS
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *                    ┌────────────────────────────────┐
 *                    │         class Calculator      │
 *                    ├────────────────────────────────┤
 *                    │  🏢 STATIC (belongs to class)  │
 *                    │     static add(a, b)          │
 *                    │     static subtract(a, b)     │
 *                    │                               │
 *                    │  Called: Calculator.add(5,3)  │
 *                    └────────────────────────────────┘
 *                                  vs
 *                    ┌────────────────────────────────┐
 *                    │      instance (belongs to obj) │
 *                    ├────────────────────────────────┤
 *                    │     this.history = []         │
 *                    │     getHistory()              │
 *                    │                               │
 *                    │  Called: calc.getHistory()    │
 *                    └────────────────────────────────┘
 * 
 *    ❌ Calculator.getHistory()  → Error! (needs an instance)
 *    ❌ calc.add(5, 3)           → Error! (static, not on instance)
 * 
 * 
 * 🔑 THE 'static' KEYWORD:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   class MathUtils {
 *       static PI = 3.14159;              // ← Static PROPERTY
 *       
 *       static square(x) {                // ← Static METHOD
 *           return x * x;
 *       }
 *   }
 *   
 *   MathUtils.PI;          // 3.14159 ✅
 *   MathUtils.square(5);   // 25 ✅
 *   
 *   const m = new MathUtils();
 *   m.PI;                  // undefined ❌
 *   m.square(5);           // Error! ❌
 * 
 * 
 * 💻 COMPLETE EXAMPLE:
 * ━━━━━━━━━━━━━━━━━━━━
 * 
 *   class User {
 *       // Instance property - each user has their own
 *       constructor(name) {
 *           this.name = name;
 *           User.count++;              // ← Access static inside class
 *       }
 *       
 *       // Instance method - needs 'this'
 *       greet() {
 *           return `Hi, I'm ${this.name}`;
 *       }
 *       
 *       // STATIC property - shared by all, belongs to class
 *       static count = 0;
 *       
 *       // STATIC method - no 'this', utility function
 *       static getTotalUsers() {
 *           return User.count;
 *       }
 *       
 *       // STATIC factory method - creates instances
 *       static createAdmin() {
 *           return new User("Admin");
 *       }
 *   }
 *   
 *   // Usage:
 *   const john = new User("John");
 *   const jane = new User("Jane");
 *   
 *   john.greet();              // "Hi, I'm John" ← Instance method
 *   User.getTotalUsers();      // 2              ← Static method
 *   User.createAdmin();        // User {name: "Admin"} ← Factory
 * 
 * 
 * 🌟 REAL-WORLD STATIC METHODS YOU ALREADY USE:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   Math.random()          // Random number - no Math instance needed!
 *   Math.max(1, 5, 3)      // Returns 5
 *   Array.isArray([1,2])   // true - checks if something is an array
 *   Object.keys({a:1})     // ["a"] - gets keys of any object
 *   JSON.parse('{"a":1}')  // Parses JSON string
 *   Date.now()             // Current timestamp
 * 
 *   These are ALL static methods! You never do:
 *   ❌ const m = new Math(); m.random();
 *   ✅ Math.random();  ← Call directly on the class!
 * 
 * 
 * 📋 COMMON USE CASES FOR STATIC METHODS:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌───────────────────┬─────────────────────────────────────────┐
 *   │ Use Case          │ Example                                 │
 *   ├───────────────────┼─────────────────────────────────────────┤
 *   │ Utility functions │ MathUtils.square(5)                     │
 *   │ Factory methods   │ User.createFromJSON(data)               │
 *   │ Counting instances│ User.count, User.getTotalUsers()        │
 *   │ Comparison        │ User.compare(user1, user2)              │
 *   │ Configuration     │ Database.configure(settings)            │
 *   │ Singleton pattern │ Logger.getInstance()                    │
 *   └───────────────────┴─────────────────────────────────────────┘
 * 
 * 
 * ⚠️ IMPORTANT RULES:
 * ━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌───────────────────────────────────────────────────────────────┐
 *   │ Rule                               │ Why?                     │
 *   ├───────────────────────────────────────────────────────────────┤
 *   │ Can't use 'this' for instance data │ No instance exists!      │
 *   │ Can't call on instances            │ Belongs to class only    │
 *   │ CAN access other static members    │ Use ClassName.member     │
 *   │ CAN be inherited by child classes  │ Child.staticMethod works │
 *   └───────────────────────────────────────────────────────────────┘
 * 
 * 
 * 📝 QUICK INTERVIEW CHEAT SHEET:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   Q: "What is a static method?"
 *   A: "A static method belongs to the class itself, not to instances.
 *       It's called directly on the class name (ClassName.method()) and
 *       cannot access instance properties through 'this'. It's perfect
 *       for utility functions that don't need object-specific data."
 * 
 *   Q: "When would you use a static method?"
 *   A: "When I need a utility function that doesn't depend on instance
 *       data - like Math.random(), factory methods that create objects,
 *       or tracking how many instances of a class exist."
 * 
 *   Q: "Can static methods access 'this'?"
 *   A: "They can access 'this' but it refers to the CLASS itself, not
 *       an instance. So 'this' inside a static method equals the class
 *       (ClassName), not an object created from it."
 * 
 *   Q: "Give an example of static method from JavaScript."
 *   A: "Math.random(), Array.isArray(), Object.keys(), JSON.parse(),
 *       Date.now() - all are static methods on built-in classes."
 * 
 * 
 * 💡 ONE-LINER TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━
 *    "Static = Call on the CLASS, not the object. No 'new' needed!"
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */


class Calculator {
    static add(a, b) { return a + b; }      // No 'this' needed
    static multiply(a, b) { return a * b; }
}
Calculator.add(5, 3);      // ✅ Returns 8
// new Calculator().add(5,3); // ❌ Error! add is not a function

console.log(Calculator.add(5,3))
// console.log(new Calculator().add(5,3))
//output: 8
//output: Error! add is not a function



/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                     GETTERS AND SETTERS IN JAVASCRIPT                        ║
 * ║                 🎯 Interview Revision Guide for Beginners 🎯                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * 📖 SIMPLE DEFINITION (Learn this for interviews!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * "Getters and Setters are special methods that let you ACCESS and MODIFY 
 *  properties with validation or computation, while looking like regular 
 *  property access. They give you control over how data is read and written."
 * 
 * 
 * 🌡️ EASY ANALOGY: THERMOSTAT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Think of a thermostat:
 *   - You SET temperature: thermostat.temp = 25
 *       • But internally it checks: "Is 25 valid? (not below 10 or above 30)"
 *       • Only then it actually sets the temperature
 *   
 *   - You GET temperature: thermostat.temp
 *       • It might convert internal Celsius to display Fahrenheit
 *       • You get processed/formatted data, not raw internal value
 * 
 *   Getters/Setters = "Controlled access with a friendly interface!"
 * 
 * 
 * 🔗 VISUAL: GETTER vs SETTER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌─────────────────────────────────────────────────────────────────┐
 *   │                        class Person                            │
 *   │  ┌─────────────────────────────────────────────────────────┐   │
 *   │  │              🔒 PRIVATE DATA                            │   │
 *   │  │                  #_age = 25                             │   │
 *   │  └─────────────────────────────────────────────────────────┘   │
 *   │                           ↑↓                                   │
 *   │  ┌─────────────────────────────────────────────────────────┐   │
 *   │  │  GET age()              │  SET age(value)               │   │
 *   │  │  ───────────            │  ──────────────               │   │
 *   │  │  return #_age           │  if(value > 0)                │   │
 *   │  │  (can format/compute)   │     #_age = value             │   │
 *   │  │                         │  (validates before saving)    │   │
 *   │  └─────────────────────────────────────────────────────────┘   │
 *   └─────────────────────────────────────────────────────────────────┘
 *   
 *   OUTSIDE CODE:
 *   person.age          ← Calls GET (looks like property, runs method!)
 *   person.age = 30     ← Calls SET (looks like assignment, runs method!)
 * 
 * 
 * 🔑 THE 'get' AND 'set' KEYWORDS:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌────────────────────┬─────────────────────────────────────────────┐
 *   │ Keyword            │ What it does                                │
 *   ├────────────────────┼─────────────────────────────────────────────┤
 *   │ get propertyName() │ Called when you READ: obj.propertyName      │
 *   │ set propertyName() │ Called when you WRITE: obj.propertyName = x │
 *   │ No parentheses!    │ Access like property, not like method       │
 *   └────────────────────┴─────────────────────────────────────────────┘
 * 
 * 
 * 💻 COMPLETE EXAMPLE:
 * ━━━━━━━━━━━━━━━━━━━━
 * 
 *   class Person {
 *       #_age;                          // Private backing field
 *       #_firstName;
 *       #_lastName;
 *       
 *       constructor(firstName, lastName, age) {
 *           this.#_firstName = firstName;
 *           this.#_lastName = lastName;
 *           this.#_age = age;
 *       }
 *       
 *       // ─────────── GETTER: Compute on-the-fly ───────────
 *       get fullName() {
 *           return `${this.#_firstName} ${this.#_lastName}`;
 *       }
 *       
 *       // ─────────── SETTER: Validate before saving ───────────
 *       set fullName(value) {
 *           const parts = value.split(' ');
 *           this.#_firstName = parts[0];
 *           this.#_lastName = parts[1] || '';
 *       }
 *       
 *       // ─────────── GETTER: Simple read access ───────────
 *       get age() {
 *           return this.#_age;
 *       }
 *       
 *       // ─────────── SETTER: Validation logic ───────────
 *       set age(value) {
 *           if (value > 0 && value < 150) {
 *               this.#_age = value;
 *           } else {
 *               console.log("Invalid age! Must be 1-149");
 *           }
 *       }
 *   }
 *   
 *   // Usage - looks like properties, but runs methods!
 *   const john = new Person("John", "Doe", 25);
 *   
 *   john.fullName;           // "John Doe"     ← GETTER runs
 *   john.fullName = "Jane Smith";             ← SETTER runs
 *   john.fullName;           // "Jane Smith"
 *   
 *   john.age;                // 25             ← GETTER runs
 *   john.age = 30;           // Works!         ← SETTER validates & saves
 *   john.age = -5;           // "Invalid age!" ← SETTER rejects it!
 *   john.age;                // 30 (unchanged)
 * 
 * 
 * 🆚 WITH GETTERS/SETTERS vs WITHOUT:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   WITHOUT (Direct property access - no control):
 *   ───────────────────────────────────────────────
 *   class Person {
 *       constructor(age) { this.age = age; }
 *   }
 *   const p = new Person(25);
 *   p.age = -100;           // ❌ No validation! Invalid data saved!
 *   p.age = "banana";       // ❌ No type checking! Chaos!
 *   
 *   
 *   WITH (Controlled access):
 *   ───────────────────────────────────────────────
 *   class Person {
 *       #_age;
 *       constructor(age) { this.age = age; }  // Uses setter!
 *       get age() { return this.#_age; }
 *       set age(val) { 
 *           if (typeof val === 'number' && val > 0) this.#_age = val;
 *           else console.log("Invalid!");
 *       }
 *   }
 *   const p = new Person(25);
 *   p.age = -100;           // ✅ "Invalid!" - rejected by setter
 *   p.age = "banana";       // ✅ "Invalid!" - rejected by setter
 * 
 * 
 * ✨ POWERFUL USE CASES:
 * ━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌─────────────────────┬──────────────────────────────────────────────┐
 *   │ Use Case            │ Example                                      │
 *   ├─────────────────────┼──────────────────────────────────────────────┤
 *   │ Validation          │ set email(v) { if(v.includes('@')) ... }     │
 *   │ Computed properties │ get area() { return this.width * this.height }│
 *   │ Formatting          │ get price() { return '$' + this.#_price }    │
 *   │ Logging/Debugging   │ set value(v) { console.log('Changed!'); ... }│
 *   │ Lazy loading        │ get data() { if(!cached) fetch(); return... }│
 *   │ Read-only property  │ get id() { return this.#_id } (no setter!)   │
 *   └─────────────────────┴──────────────────────────────────────────────┘
 * 
 * 
 * ⚠️ IMPORTANT RULES:
 * ━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌───────────────────────────────────────────────────────────────────┐
 *   │ Rule                                 │ Why?                       │
 *   ├───────────────────────────────────────────────────────────────────┤
 *   │ Getter takes NO parameters           │ Just returns a value       │
 *   │ Setter takes exactly ONE parameter   │ The value being assigned   │
 *   │ Don't use same name for backing field│ Use #_age or _age          │
 *   │ Can have getter without setter       │ Creates read-only property │
 *   │ Can have setter without getter       │ Creates write-only (rare)  │
 *   └───────────────────────────────────────────────────────────────────┘
 * 
 * 
 * 🚨 COMMON MISTAKE - INFINITE LOOP:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ❌ WRONG - Causes infinite recursion:
 *   class Person {
 *       get name() { return this.name; }     // Calls getter again!
 *       set name(v) { this.name = v; }       // Calls setter again!
 *   }
 *   
 *   ✅ CORRECT - Use different backing field:
 *   class Person {
 *       #_name;                              // Private backing field
 *       get name() { return this.#_name; }   // Returns backing field
 *       set name(v) { this.#_name = v; }     // Sets backing field
 *   }
 * 
 * 
 * 📝 QUICK INTERVIEW CHEAT SHEET:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   Q: "What are getters and setters?"
 *   A: "They are special methods defined with 'get' and 'set' keywords that
 *       allow you to read and write properties with custom logic. They look
 *       like regular property access (obj.prop) but run methods behind the
 *       scenes for validation, computation, or side effects."
 * 
 *   Q: "Why use getters and setters?"
 *   A: "To control how properties are accessed and modified. Setters can
 *       validate data before saving, and getters can compute or format
 *       values on-the-fly. They enable encapsulation while keeping a
 *       clean, property-like syntax."
 * 
 *   Q: "How do you call a getter or setter?"
 *   A: "Like a regular property! obj.name calls the getter, and 
 *       obj.name = 'John' calls the setter. No parentheses needed."
 * 
 *   Q: "What's the difference between a method and a getter?"
 *   A: "A method is called with parentheses: obj.getName(). A getter is
 *       accessed like a property: obj.name. Getters provide cleaner syntax
 *       for computed or controlled property access."
 * 
 * 
 * 💡 ONE-LINER TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━
 *    "Getters/Setters = Property syntax, method power. Validate on set, compute on get!"
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

class Person {
    #_age;
    constructor(age) { 
        this.#_age = age; 
    }
    get age() { 
        return this.#_age; 
    }           // Access: person.age
    set age(value) {                            // Assign: person.age = 25
        if (value > 0) this.#_age = value;
        else console.log("Age must be positive!");
    }
}
let person = new Person(25)
console.log(person.age)
person.age = 30
console.log(person.age)
person.age = -5
console.log(person.age)
