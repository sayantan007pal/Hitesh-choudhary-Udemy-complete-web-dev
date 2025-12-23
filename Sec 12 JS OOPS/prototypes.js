/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROTOTYPES IN JAVASCRIPT                                  ║
 * ║                 🎯 Interview Revision Guide for Beginners 🎯                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * 📖 SIMPLE DEFINITION (Learn this for interviews!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * "A prototype is like a PARENT object. Every object in JavaScript can inherit 
 *  properties and methods from its prototype (parent), forming a CHAIN."
 * 
 * 
 * 👨‍👩‍👧 EASY ANALOGY: FAMILY INHERITANCE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Think of it like this:
 *   - You don't own a car, but your DAD does
 *   - When someone asks "Do you have a car?", you say "Yes!" (through Dad)
 *   - If Dad doesn't have it, ask GRANDPA (and so on up the chain)
 *   - Eventually, you reach the "original ancestor" (Object.prototype) → then null
 * 
 *   YOU → DAD → GRANDPA → Object.prototype → null
 *   (This is the PROTOTYPE CHAIN!)
 * 
 * 
 * 🔗 HOW THE PROTOTYPE CHAIN WORKS:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌─────────────┐      ┌─────────────┐      ┌──────────────────┐
 *   │   lenovo    │  →   │  computer   │  →   │ Object.prototype │  →  null
 *   │ screen: HD  │      │  cpu: 12    │      │ toString(), ...  │
 *   └─────────────┘      └─────────────┘      └──────────────────┘
 *   
 *   lenovo.screen   →  Found on lenovo itself ✅
 *   lenovo.cpu      →  Not on lenovo, found on computer ✅
 *   lenovo.toString →  Not on lenovo or computer, found on Object.prototype ✅
 *   lenovo.xyz      →  Not found anywhere → undefined ❌
 * 
 * 
 * 🔑 THREE KEY THINGS TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 1️⃣  Every object has a hidden link [[Prototype]] to another object
 * 2️⃣  JS searches UP the chain when you access a property
 * 3️⃣  The chain ends at Object.prototype → null
 * 
 * 
 * 🛠️ FOUR WAYS TO WORK WITH PROTOTYPES:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   ┌────────────────────────────────┬──────────────────────────────────────────┐
 *   │ Method                         │ What it does                             │
 *   ├────────────────────────────────┼──────────────────────────────────────────┤
 *   │ __proto__                      │ Legacy way to access prototype           │
 *   │ Object.getPrototypeOf(obj)     │ ✅ Modern: GET an object's prototype     │
 *   │ Object.setPrototypeOf(obj, p)  │ ✅ Modern: SET an object's prototype     │
 *   │ Object.create(proto)           │ ✅ Create NEW object with given prototype│
 *   └────────────────────────────────┴──────────────────────────────────────────┘
 * 
 * 
 * 💻 SIMPLE EXAMPLES:
 * ━━━━━━━━━━━━━━━━━━━
 * 
 *   // Example 1: Using __proto__ (legacy way)
 *   let parent = { money: 1000 };
 *   let child = { toys: 5, __proto__: parent };
 *   
 *   console.log(child.toys);    // 5     (own property)
 *   console.log(child.money);   // 1000  (inherited from parent!) ✨
 * 
 *   // Example 2: Using Object.setPrototypeOf (modern way)
 *   let animal = { eats: true };
 *   let dog = { barks: true };
 *   
 *   Object.setPrototypeOf(dog, animal);  // dog now inherits from animal
 *   console.log(dog.eats);      // true  (inherited!)
 *   console.log(dog.barks);     // true  (own property)
 * 
 *   // Example 3: Using Object.create (create with prototype)
 *   let vehicle = { wheels: 4 };
 *   let car = Object.create(vehicle);    // car inherits from vehicle
 *   car.brand = "Toyota";
 *   
 *   console.log(car.wheels);    // 4     (inherited!)
 *   console.log(car.brand);     // Toyota (own property)
 * 
 * 
 * ⚠️ IMPORTANT DISTINCTION (Interview favorite!)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   __proto__  vs  prototype
 *   ─────────────────────────
 *   • __proto__  → EXISTS on every OBJECT (links to its parent)
 *   • prototype  → EXISTS only on FUNCTIONS (used when creating new objects)
 *   
 *   function Person(name) { this.name = name; }
 *   Person.prototype.greet = function() { return "Hi!"; };
 *   
 *   const john = new Person("John");
 *   john.__proto__ === Person.prototype   // true! ✅
 * 
 * 
 * 📝 QUICK INTERVIEW CHEAT SHEET:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 *   Q: "What is a prototype in JavaScript?"
 *   A: "Every object has a prototype - it's like a parent object from which 
 *       it can inherit properties and methods."
 * 
 *   Q: "What is the prototype chain?"
 *   A: "When JS can't find a property on an object, it looks up the chain 
 *       of prototypes until it finds it or reaches null."
 * 
 *   Q: "How do you set an object's prototype?"
 *   A: "Using Object.setPrototypeOf() or Object.create() for modern code,
 *       or __proto__ for legacy code."
 * 
 *   Q: "What's the difference between __proto__ and prototype?"
 *   A: "__proto__ is on every object and points to its parent.
 *       prototype is only on functions and is used when creating new instances."
 * 
 * 
 * 💡 ONE-LINER TO REMEMBER:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━
 *    "Prototype = Parent Object. Can't find property? Ask your parent!"
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */
let computer = { cpu: 12 };
let lenovo = {
  screen: "HD",
  __proto__: computer,
};
let tomHardware = {};

// console.log(`lenovo `, lenovo.__proto__);

let genericCar = { tyres: 4 };

let tesla = {
  driver: "AI",
};

Object.setPrototypeOf(tesla, genericCar);

console.log(`tesla `, Object.getPrototypeOf(tesla));
