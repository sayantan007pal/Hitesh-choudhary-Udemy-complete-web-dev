/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                   CONSTRUCTOR FUNCTIONS IN JAVASCRIPT                        ║
 * ║                 🎯 Interview Revision Guide for Beginners 🎯                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * 📖 SIMPLE DEFINITION (Learn this for interviews!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * "Constructor functions are BLUEPRINTS for creating multiple similar objects.
 *  They're regular functions called with the 'new' keyword, which creates a 
 *  new object instance with the properties defined inside the constructor."
 * 
 * 
 * 🍪 EASY ANALOGY: COOKIE CUTTER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Think of a cookie cutter:
 *   - The CONSTRUCTOR FUNCTION is like the cookie cutter (mold/template)
 *   - Each time you use it (call with 'new'), you get a NEW cookie (object)
 *   - All cookies have the same SHAPE (structure) but can have DIFFERENT flavors (data)
 * 
 *   function Cookie(flavor) { this.flavor = flavor; }  ← The cutter (template)
 *   new Cookie("chocolate")  → { flavor: "chocolate" } ← A new cookie!
 *   new Cookie("vanilla")    → { flavor: "vanilla" }   ← Another new cookie!
 * 
 * 
 * 🔗 VISUAL: WHAT 'new' KEYWORD DOES (4 STEPS)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   function Car(brand) {
 *       this.brand = brand;         // Step 3: Add properties
 *   }
 *   
 *   const myCar = new Car("Toyota");
 *   
 *   ┌─────────────────────────────────────────────────────────────────┐
 *   │        WHAT HAPPENS BEHIND THE SCENES WITH 'new':              │
 *   ├─────────────────────────────────────────────────────────────────┤
 *   │  Step 1: Create empty object     │  {}                         │
 *   │  Step 2: Set 'this' = new object │  this → {}                  │
 *   │  Step 3: Execute constructor     │  this.brand = "Toyota"      │
 *   │  Step 4: Return the object       │  return { brand: "Toyota" } │
 *   └─────────────────────────────────────────────────────────────────┘
 *   
 *   Result: myCar = { brand: "Toyota" }
 * 
 * 
 * 🔑 KEY RULES FOR CONSTRUCTOR FUNCTIONS:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌─────────────────────────────────┬────────────────────────────────────┐
 *   │ Rule                            │ Example                            │
 *   ├─────────────────────────────────┼────────────────────────────────────┤
 *   │ Name starts with Capital letter │ function Person() NOT person()    │
 *   │ Must be called with 'new'       │ new Person(), not Person()        │
 *   │ 'this' refers to new instance   │ this.name = name                  │
 *   │ Don't use arrow functions!      │ Arrow functions don't have 'this' │
 *   │ No explicit return needed       │ 'new' returns the object for you  │
 *   └─────────────────────────────────┴────────────────────────────────────┘
 * 
 * 
 * 💻 COMPLETE EXAMPLE:
 * ━━━━━━━━━━━━━━━━━━━━
 * 
 *   // ─────────── CONSTRUCTOR FUNCTION ───────────
 *   function Person(name, age) {
 *       // 'this' refers to the new object being created
 *       this.name = name;
 *       this.age = age;
 *       
 *       // Method defined inside (each instance gets its own copy - not ideal!)
 *       this.sayHello = function() {
 *           return `Hi, I'm ${this.name}`;
 *       };
 *   }
 *   
 *   // ─────────── PROTOTYPE METHOD (Better! Shared by all) ───────────
 *   Person.prototype.greet = function() {
 *       return `${this.name} says hello!`;
 *   };
 *   
 *   // ─────────── CREATING INSTANCES ───────────
 *   const john = new Person("John", 25);
 *   const jane = new Person("Jane", 30);
 *   
 *   john.name;        // "John"
 *   john.sayHello();  // "Hi, I'm John"
 *   john.greet();     // "John says hello!"
 *   
 *   jane.name;        // "Jane"
 *   jane.greet();     // "Jane says hello!"
 *   
 *   // Check if instance:
 *   john instanceof Person;  // true
 * 
 * 
 * ⚠️ WITH vs WITHOUT 'new' KEYWORD:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   function Car(brand) {
 *       this.brand = brand;
 *   }
 *   
 *   // ✅ WITH 'new' - Correct!
 *   const car1 = new Car("Toyota");
 *   console.log(car1.brand);        // "Toyota"
 *   console.log(car1);              // Car { brand: "Toyota" }
 *   
 *   // ❌ WITHOUT 'new' - WRONG! (common mistake)
 *   const car2 = Car("Honda");      // 'this' is undefined or global!
 *   console.log(car2);              // undefined (nothing returned)
 *   console.log(globalThis.brand);  // "Honda" - polluted global scope!
 * 
 * 
 * 🛡️ SAFETY CHECK: new.target
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   function SafeCar(brand) {
 *       // Check if called with 'new'
 *       if (!new.target) {
 *           throw new Error("Must use 'new' keyword!");
 *           // OR: return new SafeCar(brand);  // Auto-fix
 *       }
 *       this.brand = brand;
 *   }
 *   
 *   new SafeCar("BMW");    // ✅ Works
 *   SafeCar("BMW");        // ❌ Error: Must use 'new' keyword!
 * 
 * 
 * 📦 ADDING METHODS - TWO WAYS:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌─────────────────────────────┬───────────────────────────────────────┐
 *   │ INSIDE CONSTRUCTOR          │ ON PROTOTYPE                          │
 *   ├─────────────────────────────┼───────────────────────────────────────┤
 *   │ function Car(brand) {       │ function Car(brand) {                 │
 *   │   this.brand = brand;       │   this.brand = brand;                 │
 *   │   this.start = function() { │ }                                     │
 *   │     return "Vroom!";        │ Car.prototype.start = function() {    │
 *   │   };                        │   return "Vroom!";                    │
 *   │ }                           │ };                                    │
 *   ├─────────────────────────────┼───────────────────────────────────────┤
 *   │ ❌ Each instance gets copy  │ ✅ All instances SHARE one function   │
 *   │ ❌ Uses more memory          │ ✅ Memory efficient                   │
 *   │ ✅ Can access closure vars   │ ❌ Can't access constructor closure  │
 *   └─────────────────────────────┴───────────────────────────────────────┘
 * 
 * 
 * 🆚 CONSTRUCTOR FUNCTION vs ES6 CLASS:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   // CONSTRUCTOR FUNCTION (ES5 way)
 *   function Animal(name) {
 *       this.name = name;
 *   }
 *   Animal.prototype.speak = function() {
 *       return `${this.name} speaks`;
 *   };
 *   
 *   // ES6 CLASS (Syntactic sugar - same thing under the hood!)
 *   class Animal {
 *       constructor(name) {
 *           this.name = name;
 *       }
 *       speak() {
 *           return `${this.name} speaks`;
 *       }
 *   }
 *   
 *   💡 Classes are just cleaner syntax for constructor functions!
 *      Both work the same way with prototypes behind the scenes.
 * 
 * 
 * 📝 QUICK INTERVIEW CHEAT SHEET:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   Q: "What is a constructor function?"
 *   A: "A constructor function is a blueprint for creating objects. It's a 
 *       regular function called with the 'new' keyword, which creates a new 
 *       object, binds 'this' to it, runs the code, and returns the object."
 * 
 *   Q: "What does the 'new' keyword do?"
 *   A: "It does 4 things: (1) Creates an empty object, (2) Sets 'this' to 
 *       point to that object, (3) Executes the constructor function, and 
 *       (4) Returns the newly created object automatically."
 * 
 *   Q: "Why add methods to prototype instead of inside constructor?"
 *   A: "Methods on the prototype are shared by all instances - one copy in 
 *       memory. Methods inside the constructor create a new copy for each 
 *       instance, wasting memory."
 * 
 *   Q: "What happens if you forget 'new'?"
 *   A: "'this' will refer to the global object (or undefined in strict mode),
 *       causing bugs. Use new.target to check if 'new' was used."
 * 
 *   Q: "What's the difference between constructor functions and classes?"
 *   A: "ES6 classes are syntactic sugar over constructor functions. They 
 *       work the same way under the hood using prototypes, but classes 
 *       provide cleaner, more readable syntax."
 * 
 * 
 * 💡 ONE-LINER TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━
 *    "Constructor = Blueprint. 'new' = Build it. 'this' = The new object!"
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */
function car(brand, model){
    this.brand = brand;
    this.model = model;
}

const Sayantan = new car("BMW", "I3") // "new" keyword is used to create a new object
console.log(Sayantan)
//output: car { brand: 'BMW', model: 'I3' }
//here new keyword is used to create a new object and constructor function is used to create objects

const Samriddhi = new car("Audi", "A4")
console.log(Samriddhi)



function tea(type){
    this.type = type;
    this.describe = function(){
        return `The type of tea is ${this.type}` // "this" keyword is used to access the properties of the object 
    }
}
const chai = new tea("chai")    
console.log(chai)
//output: tea { type: 'chai', describe: [Function (anonymous)] }
console.log(chai.describe())//output: The type of tea is chai 



function Animal(species){
    this.species = species;
}
//here we are adding a method to the constructor function where prototype is used to add a method to the constructor function
Animal.prototype.sound = function(){
    return `The animal ${this.species} makes a sound` // "this" keyword is used to access the properties of the object 
}
const cat = new Animal("cat")
console.log(cat)
console.log(cat.sound()) 


//ERROR by this.target

function Drink(name){
    if(!new.target)
    {
        throw new Error("Cannot be called without new keyword")
    }
    this.name = name;
}

let coffee = new Drink("coffee")
console.log(coffee)
let wine = Drink("wine") //here we are getting error because we are not using new keyword
console.log(wine)
//output: Error: Cannot be called without new keyword