
  
const person = {
    name: "Sayantan",
    age: 20,
    greet: function() {
        return `Hi this is my name ${this.name} and I am ${this.age} years old`
    }
}

console.log("=== SCENARIO 1: person.greet() - Implicit Binding ===");
console.log(person.greet()); // ✅ Works! this = person

// ❌ THE "LOST this" PROBLEM - Copy function reference WITHOUT parentheses!
const myFirstName = person.greet;  // ✅ No () - just copying the function reference

console.log("\n=== SCENARIO 2: myFirstName() - Lost this! ===");
// In ES Modules (strict mode), `this` becomes `undefined` when context is lost
// So accessing `this.name` throws an error: "Cannot read properties of undefined"
try {
    console.log(myFirstName());  // ❌ THROWS ERROR in strict mode!
} catch (error) {
    console.log("❌ ERROR:", error.message);
    console.log("   (this is undefined in ES modules, so this.name throws!)");
}

// ✅ THE FIX - Use bind() to permanently attach the context
console.log("\n=== SCENARIO 3: with bind() - Fixed! ===");
const myFirstNameWithBind = person.greet.bind({name: "Samriddhi", age: 21});
console.log(myFirstNameWithBind());  // ✅ Works perfectly! `this` is bound forever

/**
 * ═══════════════════════════════════════════════════════════════════════════════ 
 * 🎯 UNDERSTANDING THE "LOST `this`" PROBLEM & HOW BIND FIXES IT
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This code demonstrates THREE important scenarios:
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  📱 ANALOGY: Think of it like a PHONE CONTACT                              │
 * │                                                                             │
 * │  The `greet` function is like a "Call Dad" button stored in your phone.   │
 * │  The `person` object is like your phone's contact list with Dad's number.  │
 * │                                                                             │
 * │  person.greet()  → You dial "Call Dad" FROM your phone                     │
 * │                    → Phone knows Dad's number → WORKS! ✅                   │
 * │                                                                             │
 * │  myFirstName()   → You copied "Call Dad" button to a random device         │
 * │                    → That device has NO contact list → FAILS! ❌            │
 * │                    → Tries to find Dad but gets "undefined"                │
 * │                                                                             │
 * │  myFirstNameWithBind() → You created a new "Call Dad" button that          │
 * │                          CARRIES the phone number with it! 📋              │
 * │                        → Works anywhere! ✅                                 │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📊 STEP-BY-STEP BREAKDOWN:
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * SCENARIO 1: person.greet() → "Hi this is my name Sayantan" ✅
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY IT WORKS:
 *   • When you call person.greet(), JS looks at what's LEFT of the dot
 *   • LEFT of the dot = person
 *   • So `this` = person → this.name = "Sayantan"
 *   • This is called IMPLICIT BINDING (the object "implicitly" becomes `this`)
 * 
 *    person.greet()
 *      ↑
 *      └─ `this` points HERE (person object)
 * 
 * 
 * SCENARIO 2: myFirstName() → "Hi this is my name undefined" ❌
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY IT FAILS:
 *   • You copied ONLY the function reference, NOT the object context
 *   • const myFirstName = person.greet ← Just copying the function!
 *   • When you call myFirstName(), there's NOTHING left of the dot
 *   • So `this` = global object (window in browser, global in Node)
 *   • global.name = undefined → "undefined"
 *   • This is called DEFAULT BINDING (falls back to global)
 * 
 *   myFirstName()   ← NO dot, NO object, so `this` = global
 *   
 *   ⚠️ THIS IS THE FAMOUS "LOST `this`" PROBLEM!
 *   The function "forgot" where it came from.
 * 
 * 
 * SCENARIO 3: myFirstNameWithBind() → "Hi this is my name Samriddhi" ✅
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY IT WORKS:
 *   • bind() creates a NEW function with `this` PERMANENTLY attached
 *   • .bind({name: "Samriddhi"}) says: "Always use this object as `this`"
 *   • No matter HOW or WHERE you call it, `this` will ALWAYS be that object
 *   • This is called EXPLICIT BINDING (YOU explicitly set `this`)
 * 
 *   person.greet.bind({name: "Samriddhi"})
 *                     ↑
 *                     └─ This object is NOW "glued" to the function forever!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎓 INTERVIEW ONE-LINER:
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * "When you extract a method from an object and store it in a variable,
 *  you lose the `this` context because `this` is determined at CALL TIME,
 *  not at DEFINE TIME. Use bind() to permanently attach the context."
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔑 KEY TAKEAWAY (Remember this rule!):
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 *   obj.method()     → this = obj (look LEFT of the dot)
 *   method()         → this = global/undefined (nothing left of dot = LOST!)
 *   method.bind(x)() → this = x (bind LOCKS it permanently)
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */











/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📘 `this` KEYWORD & BINDING CONTEXT IN JAVASCRIPT - INTERVIEW REVISION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * @definition
 * `this` is a special keyword in JavaScript that refers to the OBJECT that is
 * currently executing the code. Think of it as asking: "WHO is calling me?"
 * 
 * @analogy (Easy to Remember!)
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ Imagine you're a waiter 🧑‍🍳 at a restaurant.                                │
 * │                                                                             │
 * │ When Table 1 calls you → You serve Table 1 (this = Table 1)                │
 * │ When Table 2 calls you → You serve Table 2 (this = Table 2)                │
 * │ When the Manager calls → You report to Manager (this = Manager)            │
 * │                                                                             │
 * │ The "this" keyword works the same way - it refers to whoever CALLED the    │
 * │ function, not where the function was written!                               │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔑 THE 4 RULES OF `this` BINDING (MEMORIZE THESE!)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 1️⃣  DEFAULT BINDING (Standalone function call)
 *     ─────────────────────────────────────────────
 *     When a function is called without any object → `this` = window (browser)
 *                                                   → `this` = global (Node.js)
 *                                                   → `this` = undefined (strict mode)
 * 
 *     function sayHello() {
 *         console.log(this);  // window object (in browser, non-strict mode)
 *     }
 *     sayHello();  // No object before the dot, so default binding applies
 * 
 * 
 * 2️⃣  IMPLICIT BINDING (Method call with dot notation)
 *     ───────────────────────────────────────────────────
 *     When function is called as a method of an object → `this` = that object
 *     👉 RULE: Look at what's LEFT of the dot (.) when the function is called!
 * 
 *     const student = {
 *         name: "Rahul",
 *         greet: function() {
 *             console.log("Hi, I am " + this.name);
 *         }
 *     };
 *     student.greet();  // "Hi, I am Rahul" → this = student (left of the dot)
 * 
 * 
 * 3️⃣  EXPLICIT BINDING (Using call, apply, bind)
 *     ─────────────────────────────────────────────
 *     You MANUALLY tell JavaScript what `this` should be!
 * 
 *     call(thisArg, arg1, arg2, ...)   → Calls function immediately with args
 *     apply(thisArg, [arg1, arg2])     → Same as call, but args in an ARRAY
 *     bind(thisArg)                    → Returns a NEW function (doesn't call it)
 * 
 *     function introduce(course, year) {
 *         console.log(`I am ${this.name}, studying ${course} in ${year}`);
 *     }
 *     const person = { name: "Priya" };
 *     
 *     introduce.call(person, "CSE", "1st");   // I am Priya, studying CSE in 1st
 *     introduce.apply(person, ["CSE", "1st"]); // Same output (args in array)
 *     
 *     const boundFn = introduce.bind(person, "CSE", "1st");
 *     boundFn();  // I am Priya, studying CSE in 1st (called later)
 *
 *     ┌─────────────────────────────────────────────────────────────────────────┐
 *     │ 🤔 WHY USE bind() WHEN call()/apply() GIVE THE SAME OUTPUT?            │
 *     ├─────────────────────────────────────────────────────────────────────────┤
 *     │                                                                         │
 *     │  call()/apply() → Execute IMMEDIATELY (one-time use)                   │
 *     │  bind()         → Returns NEW FUNCTION for LATER (reusable)            │
 *     │                                                                         │
 *     │  📱 ANALOGY: Pizza Order vs Recipe Card                                │
 *     │  ─────────────────────────────────────────────────────────────────────  │
 *     │  call()/apply() = Ordering pizza NOW → Arrives in 30 mins → Done!     │
 *     │  bind()         = Getting a pre-filled order card for LATER            │
 *     │                   → Use it whenever you want → Reusable many times!   │
 *     │                                                                         │
 *     │  🎯 REAL USE CASES WHERE bind() IS ESSENTIAL:                          │
 *     │  ─────────────────────────────────────────────────────────────────────  │
 *     │                                                                         │
 *     │  1️⃣ EVENT HANDLERS (Most Common!)                                      │
 *     │     btn.addEventListener("click", obj.method.bind(obj));               │
 *     │     → Event fires LATER, so we need bind() to preserve `this`          │
 *     │     → call() would execute immediately (wrong!)                        │
 *     │                                                                         │
 *     │  2️⃣ setTimeout / setInterval                                           │
 *     │     setTimeout(obj.method.bind(obj), 3000);                            │
 *     │     → Function runs after 3 seconds with correct `this`                │
 *     │     → call() would run NOW, defeating the delay purpose!               │
 *     │                                                                         │
 *     │  3️⃣ PARTIAL APPLICATION (Pre-filling arguments)                        │
 *     │     const double = multiply.bind(null, 2);                             │
 *     │     double(5); // 10 → Reusable specialized function!                  │
 *     │                                                                         │
 *     │  4️⃣ PASSING CALLBACKS                                                  │
 *     │     arr.map(obj.method.bind(obj));                                     │
 *     │     → Callback is invoked LATER by map()                               │
 *     │                                                                         │
 *     │  💡 DECISION GUIDE:                                                    │
 *     │  ─────────────────────────────────────────────────────────────────────  │
 *     │  Need it NOW?        → Use call() or apply()                           │
 *     │  Need it LATER?      → Use bind()                                      │
 *     │  Need to REUSE?      → Use bind()                                      │
 *     │  Passing as CALLBACK?→ Use bind()                                      │
 *     │                                                                         │
 *     └─────────────────────────────────────────────────────────────────────────┘
 *
 *
 * 4️⃣  NEW BINDING (Constructor function with `new` keyword)
 *     ─────────────────────────────────────────────────────────
 *     When using `new` → `this` = the newly created object
 * 
 *     function Student(name) {
 *         this.name = name;  // `this` refers to the new object being created
 *     }
 *     const s1 = new Student("Amit");  // this = { name: "Amit" }
 *     console.log(s1.name);  // "Amit"
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🏆 PRIORITY ORDER (When multiple rules apply, which one wins?)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 *    new binding  >  explicit binding  >  implicit binding  >  default binding
 *        1st             2nd                  3rd                   4th
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * ⚡ ARROW FUNCTIONS - THE EXCEPTION! (Very Important for Interviews)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Arrow functions DON'T have their own `this`!
 * They INHERIT `this` from the surrounding (lexical) scope where they're defined.
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ Regular Function: "Who called me? That's my `this`"                        │
 * │ Arrow Function:   "I don't care who called me. I use my parent's `this`"   │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * const obj = {
 *     name: "Test",
 *     regularFn: function() { console.log(this.name); },  // ✅ Works: "Test"
 *     arrowFn: () => { console.log(this.name); }          // ❌ undefined (inherits from global)
 * };
 * 
 * 👉 USE CASE: Arrow functions are great in callbacks where you want to
 *    preserve the outer `this`:
 * 
 * const obj = {
 *     name: "Timer",
 *     start: function() {
 *         setTimeout(() => {
 *             console.log(this.name);  // ✅ "Timer" - arrow fn inherits from start()
 *         }, 1000);
 *     }
 * };
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 COMMON INTERVIEW QUESTIONS & TRICKY SCENARIOS
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Q1: What will this print?
 *     const obj = {
 *         a: 10,
 *         getA: function() { return this.a; }
 *     };
 *     
 *     obj.getA()
 *     console.log(obj.getA()) // ✅ 10 (implicit binding)
 * 
 *     const getAFunc = obj.getA;
 *     console.log(getAFunc());  // ❓ undefined! (default binding, `this` = window)
 * 
 * Q2: How to fix the above?
 *     const boundGetA = obj.getA.bind(obj);
 *     console.log(boundGetA());  // ✅ 10 (explicit binding)
 * 
 * Q3: What about this?
 *     const obj = {
 *         a: 10,
 *         getA: () => this.a
 *     };
 *     console.log(obj.getA());  // ❓ undefined! (arrow fn uses lexical `this`)
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📋 QUICK CHEAT SHEET (Save this for last-minute revision!)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * ┌────────────────────────┬─────────────────────────────────────────────────────┐
 * │ How function is called │ What `this` refers to                              │
 * ├────────────────────────┼─────────────────────────────────────────────────────┤
 * │ func()                 │ window / global / undefined (strict mode)          │
 * │ obj.func()             │ obj (look LEFT of the dot)                         │
 * │ func.call(obj)         │ obj (you decided!)                                 │
 * │ func.apply(obj)        │ obj (you decided!)                                 │
 * │ func.bind(obj)()       │ obj (permanently bound)                            │
 * │ new Func()             │ The newly created object                           │
 * │ () => {}               │ Inherits from parent scope (lexical)               │
 * └────────────────────────┴─────────────────────────────────────────────────────┘
 * 
 * 💡 MEMORY TIP: "this" is determined at CALL TIME, not at DEFINE TIME!
 *    (Except for arrow functions, which capture `this` at define time)
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */


// ============================================================================
// 🧪 EXAMPLES TO TRY (Run these to understand better!)
// ============================================================================

// 1️⃣ DEFAULT BINDING
function showThis() {
    console.log("Default binding:", this);
}
showThis();  // In browser: window, In Node: global object


// 2️⃣ IMPLICIT BINDING
const user = {
    name: "Sachin",
    age: 21,
    displayInfo: function() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
};
user.displayInfo();  // Name: Sachin, Age: 21


// 3️⃣ EXPLICIT BINDING with call, apply, bind
function greet(greeting, punctuation) {
    console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person1 = { name: "Arjun" };
const person2 = { name: "Kavya" };

greet.call(person1, "Hello", "!");      // Hello, Arjun!
greet.apply(person2, ["Hi", "!!"]);     // Hi, Kavya!!

const greetArjun = greet.bind(person1, "Hey", ".");
greetArjun();                            // Hey, Arjun.


// 4️⃣ NEW BINDING
function Car(brand) {
    this.brand = brand;
    this.display = function() {
        console.log(`Car brand: ${this.brand}`);
    };
}
const myCar = new Car("Tesla");
myCar.display();  // Car brand: Tesla


// 5️⃣ ARROW FUNCTION (Lexical this)
const team = {
    name: "Avengers",
    members: ["Iron Man", "Thor", "Hulk"],
    
    // Regular function - has its own `this`
    showTeamRegular: function() {
        console.log(`Team: ${this.name}`);  // Works!
    },
    
    // Arrow function - inherits `this` from surrounding scope
    showTeamArrow: () => {
        console.log(`Team: ${this.name}`);  // undefined! (lexical scope)
    },
    
    // Common pattern: Regular outer + Arrow inner
    listMembers: function() {
        this.members.forEach((member) => {
            console.log(`${member} is in ${this.name}`);  // Works! Arrow inherits `this`
        });
    }
};

team.showTeamRegular();  // Team: Avengers
team.showTeamArrow();    // Team: undefined
team.listMembers();      // Iron Man is in Avengers, Thor is in Avengers, etc.


// 6️⃣ THE LOST `this` PROBLEM (Classic Interview Question!)
const counter = {
    count: 0,
    increment: function() {
        this.count++;
        console.log(this.count);
    }
};

counter.increment();  // 1 ✅

const incrementFn = counter.increment;
// incrementFn();  // NaN ❌ (this is now global, global.count is undefined)

// FIX: Use bind!
const boundIncrement = counter.increment.bind(counter);
boundIncrement();  // 2 ✅


console.log("\n✅ All examples executed! Check the output above.");
