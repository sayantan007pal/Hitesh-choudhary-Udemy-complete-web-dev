/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📘 BIND, CALL & APPLY IN JAVASCRIPT - INTERVIEW REVISION GUIDE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * @why_do_we_need_them
 * In JavaScript, the value of `this` depends on HOW a function is called.
 * Sometimes we need to CONTROL what `this` refers to manually.
 * That's where call(), apply(), and bind() come in - they let us SET `this` ourselves!
 * 
 * @analogy (Easy to Remember!)
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ Imagine you're a SINGER 🎤 who can perform at any venue.                   │
 * │                                                                             │
 * │ call()  → "Hey singer, go perform at THIS venue RIGHT NOW with these songs"│
 * │ apply() → "Hey singer, go perform at THIS venue RIGHT NOW, here's a        │
 * │            PLAYLIST (array) of songs"                                       │
 * │ bind()  → "Hey singer, here's a CONTRACT 📝 to perform at THIS venue.      │
 * │            You can perform whenever you're ready (later)"                   │
 * │                                                                             │
 * │ call & apply = Immediate performance                                        │
 * │ bind = Book for later                                                       │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔵 CALL() - "Call immediately with individual arguments"
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * @syntax
 *   functionName.call(thisArg, arg1, arg2, arg3, ...)
 * 
 * @what_it_does
 *   - Calls the function IMMEDIATELY
 *   - Sets `this` to the first argument (thisArg)
 *   - Passes remaining arguments INDIVIDUALLY (comma-separated)
 * 
 * @example
 *   function introduce(city, country) {
 *       console.log(`Hi, I'm ${this.name} from ${city}, ${country}`);
 *   }
 *   
 *   const student = { name: "Rohit" };
 *   introduce.call(student, "Delhi", "India");
 *   // Output: Hi, I'm Rohit from Delhi, India
 * 
 * @memory_tip
 *   "CALL with Commas" - arguments are separated by commas
 *   C in Call = C in Commas
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟢 APPLY() - "Apply immediately with an Array of arguments"
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * @syntax
 *   functionName.apply(thisArg, [arg1, arg2, arg3, ...])
 * 
 * @what_it_does
 *   - Calls the function IMMEDIATELY (same as call)
 *   - Sets `this` to the first argument (thisArg)
 *   - Passes arguments as an ARRAY (single array with all arguments)
 * 
 * @example
 *   function introduce(city, country) {
 *       console.log(`Hi, I'm ${this.name} from ${city}, ${country}`);
 *   }
 *   
 *   const student = { name: "Priya" };
 *   introduce.apply(student, ["Mumbai", "India"]);
 *   // Output: Hi, I'm Priya from Mumbai, India
 * 
 * @memory_tip
 *   "APPLY with Array" - arguments passed as an array
 *   A in Apply = A in Array
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🟡 BIND() - "Bind and return a new function for later use"
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * @syntax
 *   const newFunction = functionName.bind(thisArg, arg1, arg2, ...)
 *   newFunction();  // Call it later!
 * 
 * @what_it_does
 *   - Does NOT call the function immediately
 *   - RETURNS a NEW function with `this` permanently set to thisArg
 *   - You can call the returned function whenever you want
 *   - You can also pre-fill some arguments (Partial Application)
 * 
 * @example
 *   function introduce(city, country) {
 *       console.log(`Hi, I'm ${this.name} from ${city}, ${country}`);
 *   }
 *   
 *   const student = { name: "Amit" };
 *   const boundIntroduce = introduce.bind(student, "Bangalore");
 *   
 *   // Call it later when needed
 *   boundIntroduce("India");
 *   // Output: Hi, I'm Amit from Bangalore, India
 * 
 * @memory_tip
 *   "BIND for Booking" - books the function for later
 *   B in Bind = B in Book (for later)
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📊 COMPARISON TABLE - CALL vs APPLY vs BIND
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * ┌──────────────┬─────────────────┬─────────────────┬─────────────────────────┐
 * │   Feature    │     call()      │     apply()     │        bind()           │
 * ├──────────────┼─────────────────┼─────────────────┼─────────────────────────┤
 * │ Executes     │ Immediately ✅   │ Immediately ✅   │ Returns new func ⏳      │
 * │ immediately? │                 │                 │                         │
 * ├──────────────┼─────────────────┼─────────────────┼─────────────────────────┤
 * │ Arguments    │ Comma-separated │ Single Array    │ Comma-separated         │
 * │ format       │ (a, b, c)       │ ([a, b, c])     │ (a, b, c)               │
 * ├──────────────┼─────────────────┼─────────────────┼─────────────────────────┤
 * │ Returns      │ Function result │ Function result │ New bound function      │
 * ├──────────────┼─────────────────┼─────────────────┼─────────────────────────┤
 * │ Use when     │ You know args   │ Args are in an  │ Need function for later │
 * │              │ individually    │ array already   │ (callbacks, events)     │
 * └──────────────┴─────────────────┴─────────────────┴─────────────────────────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 REAL-WORLD USE CASES (Why do we actually need these?)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 1️⃣  BORROWING METHODS FROM OTHER OBJECTS
 *     ─────────────────────────────────────────
 *     You can use a method from one object on another object!
 * 
 *     const person1 = {
 *         name: "Rahul",
 *         greet: function(greeting) {
 *             return `${greeting}, I'm ${this.name}`;
 *         }
 *     };
 *     
 *     const person2 = { name: "Sneha" };
 *     
 *     // person2 doesn't have greet(), but we can borrow it!
 *     console.log(person1.greet.call(person2, "Hello"));
 *     // Output: Hello, I'm Sneha
 * 
 * 
 * 2️⃣  USING ARRAY METHODS ON ARRAY-LIKE OBJECTS
 *     ─────────────────────────────────────────────
 *     Example: `arguments` object, NodeList from DOM
 * 
 *     function sumAll() {
 *         // `arguments` is array-like but NOT an array
 *         // We borrow Array's reduce method!
 *         const args = Array.prototype.slice.call(arguments);
 *         return args.reduce((sum, num) => sum + num, 0);
 *     }
 *     console.log(sumAll(1, 2, 3, 4, 5));  // 15
 * 
 * 
 * 3️⃣  FINDING MAX/MIN WITH APPLY (Classic Interview Question!)
 *     ───────────────────────────────────────────────────────────
 *     Math.max() doesn't accept arrays, but apply() can help!
 * 
 *     const numbers = [5, 2, 9, 1, 7];
 *     
 *     // Math.max(5, 2, 9, 1, 7) - needs individual args
 *     // apply spreads the array as arguments!
 *     const max = Math.max.apply(null, numbers);  // 9
 *     const min = Math.min.apply(null, numbers);  // 1
 *     
 *     // Modern alternative using spread operator:
 *     const max2 = Math.max(...numbers);  // 9
 * 
 * 
 * 4️⃣  PRESERVING `this` IN CALLBACKS (Most Common Use of bind!)
 *     ─────────────────────────────────────────────────────────────
 *     Event handlers and setTimeout often lose `this` - bind fixes it!
 * 
 *     const button = {
 *         text: "Click Me",
 *         handleClick: function() {
 *             console.log(`Button says: ${this.text}`);
 *         }
 *     };
 *     
 *     // ❌ PROBLEM: `this` gets lost in setTimeout
 *     // setTimeout(button.handleClick, 1000);  // undefined
 *     
 *     // ✅ SOLUTION: Use bind to lock `this`
 *     setTimeout(button.handleClick.bind(button), 1000);
 *     // Output after 1 sec: Button says: Click Me
 * 
 * 
 * 5️⃣  PARTIAL APPLICATION (Pre-filling arguments with bind)
 *     ──────────────────────────────────────────────────────────
 *     Create specialized functions from general ones!
 * 
 *     function multiply(a, b) {
 *         return a * b;
 *     }
 *     
 *     // Create a "double" function by pre-filling first argument
 *     const double = multiply.bind(null, 2);
 *     console.log(double(5));   // 10
 *     console.log(double(10));  // 20
 *     
 *     // Create a "triple" function
 *     const triple = multiply.bind(null, 3);
 *     console.log(triple(5));   // 15
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎤 COMMON INTERVIEW QUESTIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Q1: What's the difference between call() and apply()?
 *     → Both invoke immediately. call() takes arguments separately (commas),
 *       apply() takes arguments as an array.
 *       Remember: Call = Commas, Apply = Array
 * 
 * Q2: What's the difference between call() and bind()?
 *     → call() invokes immediately AND returns the result.
 *       bind() returns a NEW FUNCTION that can be called later.
 * 
 * Q3: Can we change `this` of a bound function?
 *     → NO! Once a function is bound with bind(), its `this` is permanently fixed.
 *       Even call() and apply() cannot change it.
 * 
 * Q4: What happens if you pass null or undefined as thisArg?
 *     → In non-strict mode: `this` becomes the global object (window/global)
 *       In strict mode: `this` remains null/undefined
 * 
 * Q5: Write a polyfill for bind() (Advanced)
 *     → See code example below!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📋 QUICK REVISION CHEAT SHEET
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 *   ┌────────────────────────────────────────────────────────────────────────┐
 *   │                                                                        │
 *   │   func.call(obj, a, b)   →  Invoke NOW, args with COMMAS              │
 *   │   func.apply(obj, [a,b]) →  Invoke NOW, args as ARRAY                 │
 *   │   func.bind(obj, a)      →  Return new func, invoke LATER             │
 *   │                                                                        │
 *   │   💡 All three set `this` to the first argument (obj)                 │
 *   │                                                                        │
 *   └────────────────────────────────────────────────────────────────────────┘
 * 
 *   MEMORY TRICKS:
 *   • C in Call = C in Commas (comma-separated args)
 *   • A in Apply = A in Array (arguments in array)
 *   • B in Bind = B in Book (book for later, returns function)
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */


// ============================================================================
// 🧪 PRACTICAL EXAMPLES - Run these to understand!
// ============================================================================

console.log("═══ CALL, APPLY, BIND EXAMPLES ═══\n");

// ─────────────────────────────────────────────────────────────
// 📌 BASIC EXAMPLE - Same function, different contexts
// ─────────────────────────────────────────────────────────────

function introduce(course, year) {
    console.log(`I'm ${this.name}, studying ${course} in ${year} year`);
}

const student1 = { name: "Aarav" };
const student2 = { name: "Ishita" };

console.log("1️⃣  CALL - Individual arguments:");
introduce.call(student1, "Computer Science", "1st");
introduce.call(student2, "Electronics", "2nd");

console.log("\n2️⃣  APPLY - Array of arguments:");
introduce.apply(student1, ["Data Science", "3rd"]);
introduce.apply(student2, ["AI/ML", "4th"]);

console.log("\n3️⃣  BIND - Returns a new function:");
const introduceAarav = introduce.bind(student1, "Cloud Computing", "2nd");
const introduceIshita = introduce.bind(student2);

introduceAarav();  // Already has all args bound
introduceIshita("Cybersecurity", "1st");  // Pass remaining args when calling


// ─────────────────────────────────────────────────────────────
// 📌 METHOD BORROWING - Use one object's method on another
// ─────────────────────────────────────────────────────────────

console.log("\n4️⃣  METHOD BORROWING:");

const calculator = {
    num: 10,
    add: function(a, b) {
        return this.num + a + b;
    }
};

const anotherCalc = { num: 100 };

// Borrow the add method
console.log("Original calc:", calculator.add(5, 3));  // 10 + 5 + 3 = 18
console.log("Borrowed for anotherCalc:", calculator.add.call(anotherCalc, 5, 3));  // 100 + 5 + 3 = 108


// ─────────────────────────────────────────────────────────────
// 📌 FINDING MAX/MIN WITH APPLY (Interview favorite!)
// ─────────────────────────────────────────────────────────────

console.log("\n5️⃣  FINDING MAX/MIN:");

const scores = [85, 92, 78, 96, 88];

const maxScore = Math.max.apply(null, scores);
const minScore = Math.min.apply(null, scores);

console.log("Scores:", scores);
console.log("Highest:", maxScore);  // 96
console.log("Lowest:", minScore);   // 78


// ─────────────────────────────────────────────────────────────
// 📌 BIND FOR EVENT SIMULATION (Common real-world use)
// ─────────────────────────────────────────────────────────────

console.log("\n6️⃣  BIND FOR CALLBACKS:");

const user = {
    username: "coder123",
    logUsername: function() {
        console.log(`Username: ${this.username}`);
    }
};

// Simulate callback scenario
const callback = user.logUsername;
// callback();  // ❌ Would print "Username: undefined" (lost `this`)

const boundCallback = user.logUsername.bind(user);
boundCallback();  // ✅ Username: coder123


// ─────────────────────────────────────────────────────────────
// 📌 PARTIAL APPLICATION WITH BIND
// ─────────────────────────────────────────────────────────────

console.log("\n7️⃣  PARTIAL APPLICATION:");

function calculateDiscount(discountPercent, price) {
    return price - (price * discountPercent / 100);
}

// Create specialized discount functions
const apply10Discount = calculateDiscount.bind(null, 10);
const apply20Discount = calculateDiscount.bind(null, 20);
const apply50Discount = calculateDiscount.bind(null, 50);

console.log("Original price: ₹1000");
console.log("After 10% discount:", apply10Discount(1000));  // 900
console.log("After 20% discount:", apply20Discount(1000));  // 800
console.log("After 50% discount:", apply50Discount(1000));  // 500


// ─────────────────────────────────────────────────────────────
// 📌 POLYFILL FOR BIND (Advanced - Interview Question!)
// ─────────────────────────────────────────────────────────────

console.log("\n8️⃣  CUSTOM BIND POLYFILL:");

// Custom implementation of bind
Function.prototype.myBind = function(context, ...args) {
    const fn = this;  // The original function
    
    return function(...newArgs) {
        return fn.apply(context, [...args, ...newArgs]);
    };
};

// Test the polyfill
function greet(greeting, punctuation) {
    return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: "Polyfill Tester" };
const myBoundGreet = greet.myBind(person, "Hello");

console.log("Using myBind:", myBoundGreet("!"));  // Hello, Polyfill Tester!


// ─────────────────────────────────────────────────────────────
// 📌 BOUND FUNCTION CANNOT BE RE-BOUND (Important!)
// ─────────────────────────────────────────────────────────────

console.log("\n9️⃣  BOUND FUNCTIONS ARE PERMANENT:");

const obj1 = { value: 100 };
const obj2 = { value: 200 };

function showValue() {
    console.log("Value:", this.value);
}

const boundToObj1 = showValue.bind(obj1);
boundToObj1();  // Value: 100

// Try to re-bind to obj2 - won't work!
const tryRebind = boundToObj1.bind(obj2);
tryRebind();  // Still Value: 100 (not 200!)

boundToObj1.call(obj2);  // Still Value: 100 (call can't override bind!)

console.log("↑ Notice: Once bound, `this` cannot be changed!\n");


console.log("═══════════════════════════════════════════════════════════════");
console.log("✅ All examples executed! Review the output above.");
console.log("═══════════════════════════════════════════════════════════════");
