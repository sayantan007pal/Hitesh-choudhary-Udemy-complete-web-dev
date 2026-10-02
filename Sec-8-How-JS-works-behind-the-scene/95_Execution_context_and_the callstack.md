# JavaScript Execution Context & The Call Stack - Complete Interview Guide

## 📌 Table of Contents

1. [What is Execution Context?](#what-is-execution-context)
2. [Types of Execution Context](#types-of-execution-context)
3. [How JavaScript Code is Executed - The 3 Phases](#how-javascript-code-is-executed)
4. [What's Inside an Execution Context?](#whats-inside-an-execution-context)
5. [The Call Stack](#the-call-stack)
6. [Arrow Functions - The Special Case](#arrow-functions---the-special-case)
7. [Interview Questions & Answers](#interview-questions--answers)

---

## What is Execution Context?

### 🎯 Simple Definition

> **Execution Context (EC)** is the environment in which JavaScript code is evaluated and executed. Think of it as a "box" or "container" that stores all the necessary information for a piece of code to be executed.

### 🏠 Real-World Analogy: The Kitchen Analogy

Imagine you're cooking a recipe (your JavaScript code):

- **The Kitchen** = Execution Context
- **Ingredients on counter** = Variables in Variable Environment
- **Recipe book open to current page** = Current code being executed
- **Access to pantry** = Scope Chain (access to outer ingredients)
- **Chef (you)** = The `this` keyword (who's doing the cooking)

Just like you need a kitchen setup to cook, JavaScript needs an execution context to run code!

---

## Types of Execution Context

### 1️⃣ Global Execution Context (GEC)

```javascript
// Everything here runs in the Global Execution Context
const name = "JavaScript";
let version = "ES2024";
var author = "Brendan Eich";

function greet() {
    console.log(`Hello from ${name}!`);
}

// Top-level code: executed immediately in GEC
console.log("I'm top-level code running in Global EC");
greet(); // Function call creates new EC
```

**Key Points:**
- ✅ Created when JavaScript file first loads
- ✅ There's only ONE Global EC per program
- ✅ Contains global variables and functions
- ✅ In browsers: `window` object is the global object
- ✅ In Node.js: `global` object is the global object

### 2️⃣ Function Execution Context (FEC)

```javascript
function calculateSum(a, b) {
    // New Execution Context created for this function
    const result = a + b;
    return result;
}

calculateSum(5, 3); // Creates Function EC
calculateSum(10, 20); // Creates ANOTHER Function EC
```

**Key Points:**
- ✅ Created EVERY TIME a function is called
- ✅ Each function call gets its OWN execution context
- ✅ Contains function's local variables, arguments, etc.

### 3️⃣ Eval Execution Context (Rarely Used)

```javascript
// Code inside eval() runs in its own EC
eval("console.log('Eval EC')"); // ⚠️ Avoid using eval!
```

---

## How JavaScript Code is Executed

### 🎬 The Three-Act Play of JavaScript Execution

```
┌─────────────────────────────────────────────────────────────────────┐
│                    JAVASCRIPT CODE EXECUTION                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ACT 1: Creation of Global Execution Context                        │
│         └── For top-level code (not inside any function)            │
│                                                                      │
│  ACT 2: Execution of Top-Level Code                                 │
│         └── Inside the Global Execution Context                     │
│                                                                      │
│  ACT 3: Execution of Functions                                      │
│         └── Each function call = New Execution Context              │
│         └── Waiting for Callbacks (Event Loop)                      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Phase 1: Creation Phase (Memory Allocation)

```javascript
// ===== CREATION PHASE EXAMPLE =====

// What JS sees:
console.log(myVar);     // undefined (hoisted)
console.log(myLet);     // ReferenceError: Cannot access before initialization
console.log(myFunc);    // [Function: myFunc] (fully hoisted)

var myVar = "I'm var";
let myLet = "I'm let";

function myFunc() {
    return "I'm a function";
}
```

**What happens in Creation Phase:**

```
┌─────────────────────────────────────────────────────────────────┐
│              GLOBAL EXECUTION CONTEXT - CREATION PHASE           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Variable Environment:                                           │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  myVar:  undefined          ← var is hoisted with undefined ││
│  │  myLet:  <uninitialized>    ← let is in TDZ                 ││
│  │  myFunc: function() {...}   ← functions fully hoisted       ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Scope Chain: [Global Scope]                                     │
│                                                                  │
│  this: window (browser) / global (Node.js)                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Phase 2: Execution Phase (Running Code Line by Line)

```javascript
// ===== EXECUTION PHASE EXAMPLE =====

// This code will execute line by line:

const firstName = "Jonas";        // Line 1: Assign "Jonas" to firstName
const lastName = "Schmedtmann";   // Line 2: Assign "Schmedtmann" to lastName

// Line 3-5: Define function (already hoisted in creation phase)
function getFullName() {
    return `${firstName} ${lastName}`;
}

// Line 6: Execute function - Creates NEW Function EC
const fullName = getFullName();   

// Line 7: Log result
console.log(fullName);            // Output: "Jonas Schmedtmann"
```

### Complete Example with Call Stack Visualization

```javascript
// ===== COMPLETE EXECUTION FLOW EXAMPLE =====

const name = "Alice";

function first() {
    const a = "Inside first";
    second();   // Call second function
    console.log(a);
}

function second() {
    const b = "Inside second";
    third();    // Call third function
    console.log(b);
}

function third() {
    const c = "Inside third";
    console.log(c);
}

first();  // This triggers everything!
console.log("Done!");
```

**Call Stack Visualization:**

```
Step by Step Call Stack:

1. Script starts:           2. first() called:        3. second() called:
   ┌───────────────┐           ┌───────────────┐        ┌───────────────┐
   │               │           │               │        │   third()     │
   │               │           │               │        ├───────────────┤
   │               │           │   first()     │        │   second()    │
   ├───────────────┤           ├───────────────┤        ├───────────────┤
   │    Global     │           │    Global     │        │   first()     │
   └───────────────┘           └───────────────┘        ├───────────────┤
                                                        │    Global     │
                                                        └───────────────┘

4. third() executes & pops:  5. second() executes:     6. Back to Global:
   ┌───────────────┐           ┌───────────────┐        ┌───────────────┐
   │   second()    │           │   first()     │        │               │
   ├───────────────┤           ├───────────────┤        │               │
   │   first()     │           │    Global     │        │               │
   ├───────────────┤           └───────────────┘        │    Global     │
   │    Global     │                                    └───────────────┘
   └───────────────┘           Prints: "Inside second"  Prints: "Done!"
   Prints: "Inside third"
```

---

## What's Inside an Execution Context?

Every Execution Context contains THREE main components:

```
┌─────────────────────────────────────────────────────────────────────┐
│                      EXECUTION CONTEXT                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1️⃣ VARIABLE ENVIRONMENT                                            │
│     ├── let, const, var declarations                                │
│     ├── Functions declarations                                       │
│     └── arguments object (functions only)                           │
│                                                                      │
│  2️⃣ SCOPE CHAIN                                                     │
│     └── References to outer/parent scopes                           │
│                                                                      │
│  3️⃣ THIS KEYWORD                                                    │
│     └── Depends on HOW function is called                           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 1️⃣ Variable Environment

The Variable Environment is like a **storage unit** that holds all the variables and functions declared in that execution context.

```javascript
// ===== VARIABLE ENVIRONMENT EXAMPLE =====

function greetPerson(name, age) {
    // Variable Environment for this function contains:
    const greeting = "Hello";
    let message;
    var isAdult = age >= 18;
    
    function formatGreeting() {
        return `${greeting}, ${name}!`;
    }
    
    message = formatGreeting();
    console.log(message, isAdult);
}

greetPerson("John", 25);
```

**Variable Environment Breakdown:**

```
┌────────────────────────────────────────────────────────────┐
│     VARIABLE ENVIRONMENT for greetPerson("John", 25)       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  arguments: { 0: "John", 1: 25, length: 2 }               │
│                                                            │
│  name: "John"           ← function parameter               │
│  age: 25                ← function parameter               │
│  greeting: "Hello"      ← const declaration                │
│  message: undefined → "Hello, John!"  ← let declaration   │
│  isAdult: true          ← var declaration                  │
│  formatGreeting: ƒ      ← function declaration             │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 2️⃣ Scope Chain

The Scope Chain is like a **ladder** that allows inner functions to access variables from outer scopes.

```javascript
// ===== SCOPE CHAIN EXAMPLE =====

const globalVar = "I'm global";

function outer() {
    const outerVar = "I'm from outer";
    
    function inner() {
        const innerVar = "I'm from inner";
        
        // Scope Chain in action:
        console.log(innerVar);   // ✅ Found in inner's scope
        console.log(outerVar);   // ✅ Found in outer's scope (via scope chain)
        console.log(globalVar);  // ✅ Found in global scope (via scope chain)
    }
    
    inner();
    // console.log(innerVar);  // ❌ Error! Can't go DOWN the chain
}

outer();
```

**Scope Chain Visualization:**

```
┌─────────────────────────────────────────────────────────────────┐
│                         SCOPE CHAIN                              │
│                                                                  │
│  inner() EC looks for variable:                                  │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────┐                                             │
│  │   inner scope    │ ← Check here first                        │
│  │   innerVar: ✓    │                                            │
│  └────────┬─────────┘                                            │
│           │ Not found? Look up ⬆️                                │
│           ▼                                                      │
│  ┌─────────────────┐                                             │
│  │   outer scope    │ ← Then check parent scope                 │
│  │   outerVar: ✓    │                                            │
│  └────────┬─────────┘                                            │
│           │ Not found? Look up ⬆️                                │
│           ▼                                                      │
│  ┌─────────────────┐                                             │
│  │   global scope   │ ← Finally check global scope              │
│  │   globalVar: ✓   │                                            │
│  └─────────────────┘                                             │
│                                                                  │
│  🔑 Key: Can only look UP, never DOWN!                          │
└─────────────────────────────────────────────────────────────────┘
```

### 3️⃣ The `this` Keyword

The `this` keyword is like a **dynamic pointer** - its value depends on HOW the function is called, not WHERE it's defined.

```javascript
// ===== THIS KEYWORD EXAMPLES =====

// 1. Global Context
console.log(this); // window (browser) or global (Node.js)

// 2. Regular Function Call
function showThis() {
    console.log(this);
}
showThis(); // window (non-strict) or undefined (strict mode)

// 3. Method Call (Object's function)
const person = {
    name: "Alice",
    greet() {
        console.log(this);        // person object
        console.log(this.name);   // "Alice"
    }
};
person.greet();

// 4. Arrow Functions - Inherit 'this' from parent
const team = {
    name: "Developers",
    members: ["Alice", "Bob"],
    showMembers() {
        // Arrow function inherits 'this' from showMembers
        this.members.forEach(member => {
            console.log(`${member} is in ${this.name}`);
        });
    }
};
team.showMembers();
// Output: "Alice is in Developers", "Bob is in Developers"

// 5. Event Listeners
document.querySelector('button').addEventListener('click', function() {
    console.log(this); // The button element that was clicked
});

// 6. new Keyword
function Person(name) {
    this.name = name;
    console.log(this); // The new object being created
}
const john = new Person("John"); // this = { name: "John" }

// 7. call, apply, bind
const user = { name: "Jane" };
function greet() {
    console.log(`Hello, ${this.name}`);
}
greet.call(user);   // "Hello, Jane" - this = user
greet.apply(user);  // "Hello, Jane" - this = user
const boundGreet = greet.bind(user);
boundGreet();       // "Hello, Jane" - this = user
```

**`this` Keyword Quick Reference:**

```
┌───────────────────────────────────────────────────────────────────┐
│                    'this' KEYWORD CHEAT SHEET                      │
├───────────────────────────────────────────────────────────────────┤
│                                                                    │
│  Context                        │ 'this' Value                    │
│  ──────────────────────────────│────────────────────────────────  │
│  Global Scope                   │ window / global                 │
│  Regular Function (non-strict)  │ window / global                 │
│  Regular Function (strict)      │ undefined                       │
│  Object Method                  │ The object calling the method   │
│  Arrow Function                 │ Inherited from parent scope     │
│  Event Listener                 │ The DOM element                 │
│  new Constructor                │ The new empty object            │
│  call/apply/bind                │ Explicitly set value            │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

---

## The Call Stack

### 🎯 Definition

> **Call Stack** is a data structure (LIFO - Last In First Out) that keeps track of execution contexts. It tells JavaScript which function is currently running and what to return to after it finishes.

### 🍽️ Analogy: The Plate Stack

Think of the call stack like a stack of plates at a buffet:

- 🍽️ When a new function is called → **Push** a new plate on top
- 🍽️ When a function returns → **Pop** the top plate off
- 🍽️ You can only add/remove from the **top**
- 🍽️ The bottom plate (Global EC) is always there

### Complete Call Stack Example

```javascript
// ===== CALL STACK DEMONSTRATION =====

function multiply(x, y) {
    return x * y;
}

function square(n) {
    return multiply(n, n);
}

function printSquare(num) {
    const result = square(num);
    console.log(result);
}

printSquare(5); // Let's trace this!
```

**Step-by-Step Call Stack Trace:**

```
Step 1: Script starts
┌─────────────────────────┐
│                         │
│      Global EC          │
│    (printSquare: ƒ)     │
│    (square: ƒ)          │
│    (multiply: ƒ)        │
└─────────────────────────┘
↳ All functions hoisted in memory

Step 2: printSquare(5) called
┌─────────────────────────┐
│     printSquare EC      │
│      num = 5            │
├─────────────────────────┤
│      Global EC          │
└─────────────────────────┘
↳ printSquare pushed onto stack

Step 3: square(5) called
┌─────────────────────────┐
│       square EC         │
│        n = 5            │
├─────────────────────────┤
│     printSquare EC      │
├─────────────────────────┤
│      Global EC          │
└─────────────────────────┘
↳ square pushed onto stack

Step 4: multiply(5, 5) called
┌─────────────────────────┐
│      multiply EC        │
│    x = 5, y = 5         │
├─────────────────────────┤
│       square EC         │
├─────────────────────────┤
│     printSquare EC      │
├─────────────────────────┤
│      Global EC          │
└─────────────────────────┘
↳ multiply pushed onto stack

Step 5: multiply returns 25
┌─────────────────────────┐
│       square EC         │
│     return 25           │
├─────────────────────────┤
│     printSquare EC      │
├─────────────────────────┤
│      Global EC          │
└─────────────────────────┘
↳ multiply popped, returned 25

Step 6: square returns 25
┌─────────────────────────┐
│     printSquare EC      │
│     result = 25         │
├─────────────────────────┤
│      Global EC          │
└─────────────────────────┘
↳ square popped, returned 25

Step 7: console.log(25)
┌─────────────────────────┐
│      Global EC          │
└─────────────────────────┘
↳ printSquare popped after logging 25

Step 8: Script ends
┌─────────────────────────┐
│                         │
│    (Stack empty - or    │
│     Global EC exits)    │
│                         │
└─────────────────────────┘
```

---

## Arrow Functions - The Special Case

Arrow functions are **different** from regular functions in TWO key ways regarding execution context:

### ❌ 1. No Own `arguments` Object

```javascript
// ===== ARGUMENTS OBJECT COMPARISON =====

// Regular Function - HAS arguments
function regularFunc(a, b, c) {
    console.log(arguments);        // [1, 2, 3] - Arguments object
    console.log(arguments[0]);     // 1
    console.log(arguments.length); // 3
}
regularFunc(1, 2, 3);

// Arrow Function - NO arguments (inherits from parent)
const arrowFunc = (a, b, c) => {
    // console.log(arguments); // ❌ ReferenceError: arguments is not defined
    // (unless there's a parent function with arguments)
};

// Arrow in Regular Function - Gets PARENT's arguments
function outerFunc() {
    const inner = () => {
        console.log(arguments); // Gets outerFunc's arguments: [10, 20]
    };
    inner();
}
outerFunc(10, 20);

// Solution: Use REST parameters instead
const modernArrow = (...args) => {
    console.log(args);        // [1, 2, 3] - Real array!
    console.log(args[0]);     // 1
    console.log(args.length); // 3
};
modernArrow(1, 2, 3);
```

### ❌ 2. No Own `this` Keyword (Lexical `this`)

```javascript
// ===== THIS KEYWORD IN ARROW VS REGULAR FUNCTIONS =====

const restaurant = {
    name: "Italian Bistro",
    
    // Regular function - has own 'this'
    getNameRegular: function() {
        console.log(this);       // restaurant object ✅
        console.log(this.name);  // "Italian Bistro" ✅
    },
    
    // Arrow function - NO own 'this' (inherits from parent = global)
    getNameArrow: () => {
        console.log(this);       // window object ❌ (not restaurant!)
        console.log(this.name);  // undefined ❌
    }
};

restaurant.getNameRegular(); // Works!
restaurant.getNameArrow();   // Doesn't work as expected!

// ===== THE CALLBACK PROBLEM & SOLUTION =====

const bookClub = {
    name: "Readers United",
    members: ["Alice", "Bob", "Charlie"],
    
    // ❌ PROBLEM: Regular function callback loses 'this'
    listMembersBad: function() {
        this.members.forEach(function(member) {
            // 'this' here is undefined (strict) or window (non-strict)
            // console.log(`${member} - ${this.name}`); // ❌ Error!
        });
    },
    
    // ✅ SOLUTION 1: Arrow function (inherits 'this')
    listMembersArrow: function() {
        this.members.forEach(member => {
            console.log(`${member} - ${this.name}`); // ✅ Works!
        });
    },
    
    // ✅ SOLUTION 2: Save 'this' reference
    listMembersSelf: function() {
        const self = this;
        this.members.forEach(function(member) {
            console.log(`${member} - ${self.name}`); // ✅ Works!
        });
    },
    
    // ✅ SOLUTION 3: bind()
    listMembersBind: function() {
        this.members.forEach(function(member) {
            console.log(`${member} - ${this.name}`);
        }.bind(this)); // ✅ Works!
    }
};

bookClub.listMembersArrow();
```

### Summary: Arrow Functions vs Regular Functions

```
┌────────────────────────────────────────────────────────────────────┐
│          ARROW FUNCTIONS vs REGULAR FUNCTIONS                      │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Feature              │  Regular Function    │  Arrow Function     │
│  ─────────────────────│─────────────────────│────────────────────  │
│  'this' keyword       │  Own 'this'          │  ❌ Lexical 'this'  │
│  'arguments' object   │  Own 'arguments'     │  ❌ No 'arguments'  │
│  Use as method        │  ✅ Yes              │  ⚠️ Avoid           │
│  Use as callback      │  ⚠️ 'this' issues    │  ✅ Great choice    │
│  Use as constructor   │  ✅ new Person()     │  ❌ Error           │
│  Hoisted              │  ✅ (declarations)   │  ❌ No              │
│                                                                     │
│  🎯 Rule of Thumb:                                                  │
│  - Methods → Use Regular Functions                                  │
│  - Callbacks → Use Arrow Functions                                  │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## Callbacks and the Event Loop (Waiting for Callbacks)

When JavaScript encounters asynchronous code, the callbacks don't get their own EC until they're ready to execute.

```javascript
// ===== CALLBACK EXECUTION ORDER =====

console.log("1. Start"); // Synchronous - runs immediately

setTimeout(function callback1() {
    console.log("2. Timeout callback"); // Async - waits for timer + call stack to be empty
}, 0);

Promise.resolve().then(function callback2() {
    console.log("3. Promise callback"); // Microtask - runs before timeout
});

console.log("4. End"); // Synchronous - runs immediately

// Output Order:
// 1. Start
// 4. End
// 3. Promise callback  (microtask queue - higher priority)
// 2. Timeout callback  (callback queue - lower priority)
```

**Visualization:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ASYNC EXECUTION FLOW                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  CALL STACK              WEB APIs           QUEUES                   │
│  ──────────              ───────            ──────                   │
│  │ console.log │                                                     │
│  │   "Start"   │                                                     │
│  └─────────────┘                                                     │
│                                                                      │
│  │ setTimeout  │  ─────▶  │ Timer: 0ms │                            │
│  └─────────────┘          └────────────┘                             │
│                                   │                                  │
│                                   ▼                                  │
│                           ┌──────────────────┐                       │
│                           │ Callback Queue   │                       │
│                           │ [callback1]      │                       │
│                           └──────────────────┘                       │
│                                                                      │
│  │ Promise.then│  ─────────────────────▶  ┌──────────────────┐      │
│  └─────────────┘                          │ Microtask Queue  │      │
│                                           │ [callback2]      │      │
│                                           └──────────────────┘      │
│                                                                      │
│  │ console.log │                                                     │
│  │    "End"    │                                                     │
│  └─────────────┘                                                     │
│                                                                      │
│  ────── CALL STACK EMPTY ──────                                     │
│                                                                      │
│  Event Loop checks:                                                  │
│  1. Microtask Queue → callback2 executes ("Promise callback")       │
│  2. Callback Queue  → callback1 executes ("Timeout callback")       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🧠 Call Stack + Heap: Inside the JavaScript Engine

Understanding how the Call Stack and Heap work together inside the JS Engine is **critical** for interviews. This section breaks down exactly what happens in memory during code execution.

### 🏗️ JS Engine Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         JAVASCRIPT ENGINE (V8, SpiderMonkey, etc.)          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────┐    ┌─────────────────────────────────────┐│
│   │        CALL STACK           │    │              HEAP                    ││
│   │   (Execution Contexts)      │    │     (Memory Storage)                 ││
│   │                             │    │                                      ││
│   │  ┌─────────────────────┐   │    │   Objects, Arrays, Functions         ││
│   │  │   Function EC       │   │    │   stored here as reference types     ││
│   │  ├─────────────────────┤   │    │                                      ││
│   │  │   Function EC       │   │    │  ┌──────┐  ┌──────┐  ┌──────┐       ││
│   │  ├─────────────────────┤   │    │  │ obj1 │  │ arr1 │  │ func │       ││
│   │  │   Global EC         │   │    │  └──────┘  └──────┘  └──────┘       ││
│   │  └─────────────────────┘   │    │                                      ││
│   │                             │    │                                      ││
│   │  • Primitive values here   │    │  • Reference types here              ││
│   │  • LIFO structure          │    │  • Unstructured memory pool          ││
│   │  • Fast access             │    │  • Garbage collected                 ││
│   │                             │    │                                      ││
│   └─────────────────────────────┘    └─────────────────────────────────────┘│
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🎭 Analogy: The Office Building

Think of the JS Engine like an **office building**:

| Component | Office Analogy | Purpose |
|-----------|---------------|---------|
| **Call Stack** | Stack of paperwork on desk | Current tasks being processed (LIFO) |
| **Heap** | Filing cabinets in storage room | Long-term storage for complex documents |
| **Primitives** | Sticky notes (copied easily) | Quick, disposable values stored in stack |
| **References** | Filing cabinet keys | Pointers to actual documents in storage |

---

## 🔄 Synchronous Code Execution: Stack + Heap Deep Dive

### Complete Sync Example with Memory Visualization

```javascript
// ===== SYNCHRONOUS EXECUTION: STACK + HEAP =====

// 1. Primitive values (stored in Stack)
const name = "Alice";
const age = 25;
const isStudent = true;

// 2. Reference values (stored in Heap, reference in Stack)
const person = {
    firstName: "Alice",
    lastName: "Smith",
    scores: [85, 90, 78]
};

// 3. Function (stored in Heap)
function calculateAverage(arr) {
    let sum = 0;                    // Primitive - in Stack
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;        // Returns primitive
}

// 4. Function call and execution
const average = calculateAverage(person.scores);

// 5. Creating new reference to same object
const anotherPerson = person;       // Points to SAME heap object!

// 6. Mutation affects both references
anotherPerson.age = 26;
console.log(person.age);            // 26 - Both see the change!
```

### Step-by-Step Memory Execution

```
═══════════════════════════════════════════════════════════════════════════════
                    STEP 1: Global Execution Context Created
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                              HEAP
┌─────────────────────────────┐        ┌─────────────────────────────────────┐
│                             │        │                                     │
│   GLOBAL EC                 │        │   (Empty - no objects yet)          │
│   ─────────────             │        │                                     │
│   Variable Environment:     │        │                                     │
│   • name: <uninitialized>   │        │                                     │
│   • age: <uninitialized>    │        │                                     │
│   • person: <uninitialized> │        │                                     │
│   • calculateAverage: ƒ ──────────────▶ (function stored here)            │
│                             │        │                                     │
└─────────────────────────────┘        └─────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                    STEP 2: Primitives Assigned (Stack)
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                              HEAP
┌─────────────────────────────┐        ┌─────────────────────────────────────┐
│                             │        │                                     │
│   GLOBAL EC                 │        │   0x001: calculateAverage() {...}   │
│   ─────────────             │        │                                     │
│   Variable Environment:     │        │                                     │
│   • name: "Alice"     ◀── Stored directly in stack (primitive)             │
│   • age: 25           ◀── Stored directly in stack (primitive)             │
│   • isStudent: true   ◀── Stored directly in stack (primitive)             │
│   • person: <pending>       │        │                                     │
│   • calculateAverage: 0x001─────────▶│                                     │
│                             │        │                                     │
└─────────────────────────────┘        └─────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                    STEP 3: Object Created (Heap)
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                              HEAP
┌─────────────────────────────┐        ┌─────────────────────────────────────┐
│                             │        │                                     │
│   GLOBAL EC                 │        │   0x001: calculateAverage() {...}   │
│   ─────────────             │        │                                     │
│   • name: "Alice"           │        │   0x002: {                          │
│   • age: 25                 │        │       firstName: "Alice",           │
│   • isStudent: true         │        │       lastName: "Smith",            │
│   • person: 0x002 ──────────────────▶│       scores: 0x003                 │
│   • calculateAverage: 0x001 │        │   }                                 │
│                             │        │                                     │
│                             │        │   0x003: [85, 90, 78]               │
│                             │        │   (Array is also a reference!)     │
└─────────────────────────────┘        └─────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                    STEP 4: Function Called - New EC Created
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                              HEAP
┌─────────────────────────────┐        ┌─────────────────────────────────────┐
│                             │        │                                     │
│   calculateAverage EC       │        │   0x001: calculateAverage() {...}   │
│   ─────────────────────     │        │                                     │
│   • arr: 0x003 ─────────────────────▶│   0x002: {person object}            │
│   • sum: 0 → 85 → 175 → 253 │        │                                     │
│   • i: 0 → 1 → 2 → 3        │        │   0x003: [85, 90, 78]               │
│   • return value: 84.33...  │        │                                     │
├─────────────────────────────┤        │                                     │
│   GLOBAL EC                 │        │                                     │
│   • person: 0x002           │        │                                     │
│   • average: <pending>      │        │                                     │
└─────────────────────────────┘        └─────────────────────────────────────┘

Note: 'arr' receives REFERENCE to the array, not a copy!

═══════════════════════════════════════════════════════════════════════════════
                    STEP 5: Function Returns, EC Popped
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                              HEAP
┌─────────────────────────────┐        ┌─────────────────────────────────────┐
│                             │        │                                     │
│   GLOBAL EC                 │        │   0x001: calculateAverage() {...}   │
│   ─────────────             │        │                                     │
│   • name: "Alice"           │        │   0x002: {person object}            │
│   • age: 25                 │        │                                     │
│   • person: 0x002           │        │   0x003: [85, 90, 78]               │
│   • average: 84.33...  ◀── Primitive returned, stored in stack             │
│   • anotherPerson: 0x002 ───────────▶│ (Same as person!)                   │
│                             │        │                                     │
└─────────────────────────────┘        └─────────────────────────────────────┘

⚠️ CRITICAL: anotherPerson and person point to SAME heap object!
```

### 🔑 Key Insight: Primitive vs Reference Copying

```javascript
// ===== PRIMITIVE COPYING (Stack) =====
let a = 10;
let b = a;      // Copies VALUE
b = 20;
console.log(a); // 10 - unchanged! (separate copy)

// ===== REFERENCE COPYING (Heap) =====
const obj1 = { value: 10 };
const obj2 = obj1;          // Copies REFERENCE (address)
obj2.value = 20;
console.log(obj1.value);    // 20 - changed! (same object)

// Visualization:
// 
// PRIMITIVES:                    REFERENCES:
// Stack                          Stack              Heap
// ┌─────────┐                    ┌─────────┐       ┌─────────────┐
// │ a: 10   │                    │obj1:0x01├──────▶│ value: 20   │
// │ b: 20   │ (separate)         │obj2:0x01├──────▶│             │
// └─────────┘                    └─────────┘       └─────────────┘
//                                (both point to same!)
```

---

## ⚡ Asynchronous Code Execution: async/await with Stack + Heap

### Understanding async/await at Engine Level

```javascript
// ===== ASYNC/AWAIT EXECUTION PATTERN =====

console.log("1. Script start");

async function fetchUserData() {
    console.log("2. Inside async function");
    
    // Simulate API call
    const user = await fetch('/api/user');    // PAUSE HERE
    
    console.log("4. After await");
    return user;
}

const promise = fetchUserData();
console.log("3. After calling async function");

// Output:
// 1. Script start
// 2. Inside async function  
// 3. After calling async function  ← Continues while waiting!
// 4. After await                   ← Resumes when data ready
```

### Complete async/await Example with Full Visualization

```javascript
// ===== COMPREHENSIVE ASYNC/AWAIT EXAMPLE =====

console.log("🚀 Start");

// Regular object in Heap
const config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
};

// Async function definition (stored in Heap)
async function getUserProfile(userId) {
    console.log(`📡 Fetching user ${userId}...`);
    
    // Simulating async operation with Promise
    const userData = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: "John Doe",
                email: "john@example.com"
            });
        }, 1000);
    });
    
    console.log("✅ Data received!");
    return userData;
}

async function processData() {
    console.log("⚙️ Processing started");
    
    const user = await getUserProfile(123);
    
    console.log("📋 User:", user.name);
    return user;
}

// Call the async function
const resultPromise = processData();

console.log("🏃 Synchronous code continues...");

// Handle the resolved promise
resultPromise.then(result => {
    console.log("🎉 Final result:", result);
});

console.log("🔚 Script end");

/* OUTPUT ORDER:
🚀 Start
⚙️ Processing started
📡 Fetching user 123...
🏃 Synchronous code continues...
🔚 Script end
(1 second pause)
✅ Data received!
📋 User: John Doe
🎉 Final result: { id: 123, name: "John Doe", email: "john@example.com" }
*/
```

### Step-by-Step async/await Execution Visualization

```
═══════════════════════════════════════════════════════════════════════════════
        ASYNC/AWAIT EXECUTION: CALL STACK + HEAP + EVENT LOOP
═══════════════════════════════════════════════════════════════════════════════

STEP 1: Initial Setup - "🚀 Start"
──────────────────────────────────────────────────────────────────────────────

CALL STACK                  WEB APIs        MICROTASK Q    CALLBACK Q
┌──────────────────┐       ┌─────────┐     ┌──────────┐   ┌──────────┐
│ console.log      │       │         │     │          │   │          │
│ "🚀 Start"       │       │         │     │          │   │          │
├──────────────────┤       └─────────┘     └──────────┘   └──────────┘
│   Global EC      │
└──────────────────┘       

HEAP:
┌─────────────────────────────────────────────────────────────────┐
│  0x001: config { apiUrl: "...", timeout: 5000 }                 │
│  0x002: getUserProfile() { async function... }                  │
│  0x003: processData() { async function... }                     │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
STEP 2: processData() Called - "⚙️ Processing started"
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                  WEB APIs        MICROTASK Q    CALLBACK Q
┌──────────────────┐       ┌─────────┐     ┌──────────┐   ┌──────────┐
│  processData EC  │       │         │     │          │   │          │
│  (async)         │       │         │     │          │   │          │
├──────────────────┤       └─────────┘     └──────────┘   └──────────┘
│   Global EC      │
└──────────────────┘

Output so far: "🚀 Start" → "⚙️ Processing started"

═══════════════════════════════════════════════════════════════════════════════
STEP 3: getUserProfile(123) Called - "📡 Fetching..."
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                  WEB APIs        MICROTASK Q    CALLBACK Q
┌──────────────────┐       ┌─────────┐     ┌──────────┐   ┌──────────┐
│ getUserProfile EC│       │         │     │          │   │          │
│ userId: 123      │       │         │     │          │   │          │
├──────────────────┤       └─────────┘     └──────────┘   └──────────┘
│  processData EC  │
├──────────────────┤
│   Global EC      │
└──────────────────┘

═══════════════════════════════════════════════════════════════════════════════
STEP 4: 🔥 AWAIT HIT! Function Suspends - Control Returns
═══════════════════════════════════════════════════════════════════════════════

        ┌─────────────────────────────────────────────────────────┐
        │  When JavaScript encounters 'await':                    │
        │                                                          │
        │  1. The Promise is created and starts executing         │
        │  2. The async function is SUSPENDED (paused)            │
        │  3. Control returns to the calling code                 │
        │  4. The suspended state is saved for later resumption   │
        └─────────────────────────────────────────────────────────┘

CALL STACK                  WEB APIs              MICROTASK Q    CALLBACK Q
┌──────────────────┐       ┌────────────────┐    ┌──────────┐   ┌──────────┐
│                  │       │                │    │          │   │          │
│ ← ECs suspended  │       │  Timer: 1000ms │    │          │   │          │
│   and saved!     │       │  (setTimeout)  │    │          │   │          │
├──────────────────┤       └────────────────┘    └──────────┘   └──────────┘
│   Global EC      │             ↑
└──────────────────┘    Promise waiting here

SUSPENDED EXECUTION CONTEXTS (saved in memory):
┌────────────────────────────────────────────────────────────────┐
│  Suspended: processData EC                                      │
│  └── Waiting for: getUserProfile to resolve                    │
│                                                                 │
│  Suspended: getUserProfile EC                                   │
│  └── Waiting for: setTimeout Promise to resolve                │
│  └── Will resume at: "const userData = ..." line              │
└────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
STEP 5: Synchronous Code Continues! - "🏃 Synchronous..." & "🔚 Script end"
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                  WEB APIs              MICROTASK Q    CALLBACK Q
┌──────────────────┐       ┌────────────────┐    ┌──────────┐   ┌──────────┐
│ console.log      │       │  Timer: 800ms  │    │          │   │          │
│ "🏃/🔚 messages" │       │  (counting)    │    │          │   │          │
├──────────────────┤       └────────────────┘    └──────────┘   └──────────┘
│   Global EC      │
└──────────────────┘

Output so far: "🚀 Start" → "⚙️ Processing started" → "📡 Fetching..." 
              → "🏃 Synchronous code continues..." → "🔚 Script end"

═══════════════════════════════════════════════════════════════════════════════
STEP 6: Timer Expires, Promise Resolves, Microtask Queued
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                  WEB APIs        MICROTASK QUEUE        CALLBACK Q
┌──────────────────┐       ┌─────────┐     ┌──────────────────┐   ┌──────────┐
│   (empty)        │       │ (empty) │     │ Resume           │   │          │
│← waiting for     │       │         │     │ getUserProfile() │   │          │
│  event loop      │       │         │     │ with userData    │   │          │
├──────────────────┤       └─────────┘     └──────────────────┘   └──────────┘
│   Global EC      │
└──────────────────┘

HEAP (new object created):
┌─────────────────────────────────────────────────────────────────┐
│  0x004: { id: 123, name: "John Doe", email: "john@example.com" }│
│         ↑ This is the resolved userData                         │
└─────────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
STEP 7: Event Loop Resumes getUserProfile() - "✅ Data received!"
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                  MICROTASK QUEUE
┌──────────────────────┐   ┌───────────────────────────────┐
│ getUserProfile EC    │   │ (being processed)             │
│ (RESUMED!)           │   │                               │
│ userData: 0x004 ─────────▶ { id:123, name:"John Doe"... }│
├──────────────────────┤   └───────────────────────────────┘
│   Global EC          │
└──────────────────────┘

// getUserProfile returns, then processData resumes...

═══════════════════════════════════════════════════════════════════════════════
STEP 8: processData Resumes - "📋 User: John Doe"
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                  
┌────────────────────────┐
│ processData EC         │
│ (RESUMED!)             │
│ user: 0x004            │
│ → logs user.name       │
├────────────────────────┤
│   Global EC            │
└────────────────────────┘

═══════════════════════════════════════════════════════════════════════════════
STEP 9: .then() Callback Executes - "🎉 Final result"
═══════════════════════════════════════════════════════════════════════════════

CALL STACK                  MICROTASK QUEUE
┌────────────────────────┐ ┌──────────────────────┐
│ .then() callback       │ │ (processed)          │
│ result: 0x004          │ │                      │
├────────────────────────┤ └──────────────────────┘
│   Global EC            │
└────────────────────────┘

FINAL OUTPUT (in order):
┌────────────────────────────────────────────────────────────────┐
│ 1. 🚀 Start                        (Sync - immediate)         │
│ 2. ⚙️ Processing started           (Sync - immediate)         │
│ 3. 📡 Fetching user 123...         (Sync - immediate)         │
│ 4. 🏃 Synchronous code continues...(Sync - immediate)         │
│ 5. 🔚 Script end                   (Sync - immediate)         │
│    ─── 1 second pause ───                                      │
│ 6. ✅ Data received!               (Async - after await)      │
│ 7. 📋 User: John Doe               (Async - after await)      │
│ 8. 🎉 Final result: {...}          (Async - .then callback)   │
└────────────────────────────────────────────────────────────────┘
```

---

## 🆚 Sync vs Async: Side-by-Side Comparison

### The Same Task: Sync vs Async Implementation

```javascript
// ===== SYNCHRONOUS VERSION (Blocking) =====
function fetchDataSync() {
    console.log("1. Start sync");
    
    // This would BLOCK everything (hypothetical sync fetch)
    // const data = syncFetch('/api/data'); // ❌ Blocks entire thread!
    
    // Simulating with a loop (BAD PRACTICE)
    const start = Date.now();
    while (Date.now() - start < 2000) {} // Blocks for 2 seconds!
    
    console.log("2. Data ready");
    console.log("3. End sync");
}

fetchDataSync();
console.log("4. After function"); // Waits until function completes!

// Output: 1 → (2 second freeze) → 2 → 3 → 4


// ===== ASYNCHRONOUS VERSION (Non-Blocking) =====
async function fetchDataAsync() {
    console.log("1. Start async");
    
    // This does NOT block!
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("3. Data ready");
    console.log("4. End async");
}

fetchDataAsync();
console.log("2. After function"); // Runs IMMEDIATELY!

// Output: 1 → 2 → (2 second wait) → 3 → 4
```

### Comparison Table

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SYNCHRONOUS vs ASYNCHRONOUS EXECUTION                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Aspect              │  Synchronous            │  Asynchronous (async/await)│
│  ────────────────────│────────────────────────│────────────────────────────│
│  Execution           │  Line by line           │  Can pause and resume      │
│  Blocking            │  YES - blocks thread    │  NO - non-blocking         │
│  Call Stack          │  Functions stay until   │  Functions can be          │
│                      │  complete               │  suspended                 │
│  Order               │  Predictable            │  Depends on timing         │
│  Error Handling      │  try/catch              │  try/catch + .catch()      │
│  Use Case            │  Simple calculations    │  I/O operations, APIs      │
│  User Experience     │  UI freezes             │  UI stays responsive       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 🍳 Analogy: The Restaurant Kitchen

**Synchronous (One Chef, One Order):**
```
Chef working on Order A → Can't start Order B → Order B waits → Customer angry!

Timeline:
[  Order A cooking...   ][ Order A serving ][ Order B starts... ]
|___10 minutes___________|__________________|_____________________|
                                            ↑ Customer B waited 10 min!
```

**Asynchronous (Smart Kitchen with Timers):**
```
Chef starts Order A → Sets timer → Starts Order B → Timer rings → Serves both!

Timeline:
[ Start A ][ Start B ][  Both cooking simultaneously  ][ Serve both! ]
|_1 min___|_1 min___|________8 minutes________________|_______________|
                                                       ↑ Both customers happy!
```

---

## 🔧 Real-World async/await Patterns

### Pattern 1: Sequential Execution (When Order Matters)

```javascript
// ===== SEQUENTIAL ASYNC OPERATIONS =====
async function processUserSequentially() {
    console.log("Starting sequential process...");
    
    // Each await waits for previous to complete
    const user = await fetchUser(123);          // Wait 1 sec
    const posts = await fetchPosts(user.id);    // Wait 1 sec (starts AFTER user)
    const comments = await fetchComments(posts[0].id); // Wait 1 sec
    
    // Total time: ~3 seconds (1 + 1 + 1)
    
    return { user, posts, comments };
}

// CALL STACK during execution:
// 
// Step 1: [processUser] → await fetchUser → [suspended] → Stack empties
// Step 2: User returns → [processUser resumes] → await fetchPosts → [suspended]
// Step 3: Posts return → [processUser resumes] → await fetchComments → [suspended]
// Step 4: Comments return → [processUser resumes] → returns result
```

### Pattern 2: Parallel Execution (When Order Doesn't Matter)

```javascript
// ===== PARALLEL ASYNC OPERATIONS =====
async function processUserParallel() {
    console.log("Starting parallel process...");
    
    // All start simultaneously!
    const [user, products, notifications] = await Promise.all([
        fetchUser(123),         // Starts immediately
        fetchProducts(),        // Starts immediately (parallel!)
        fetchNotifications()    // Starts immediately (parallel!)
    ]);
    
    // Total time: ~1 second (max of all three, not sum!)
    
    return { user, products, notifications };
}

// CALL STACK during parallel execution:
// 
// Step 1: [processUser] → Promise.all starts 3 fetches → [suspended]
// 
// WEB APIs (all running in parallel):
// ├── fetchUser timer
// ├── fetchProducts timer  
// └── fetchNotifications timer
// 
// Step 2: All complete → [processUser resumes] → returns result
```

### Pattern 3: Error Handling with try/catch

```javascript
// ===== ASYNC ERROR HANDLING =====
async function fetchWithErrorHandling() {
    try {
        console.log("Attempting fetch...");
        
        const response = await fetch('/api/data');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Success:", data);
        return data;
        
    } catch (error) {
        console.error("Failed:", error.message);
        // Handle error gracefully
        return null;
        
    } finally {
        console.log("Cleanup operations here");
    }
}

// CALL STACK with error:
// 
// [fetchWithErrorHandling] 
//     → try block starts
//     → await fetch (suspends)
//     → ERROR occurs
//     → catch block executes (same EC)
//     → finally block executes
//     → EC pops off stack
```

---

## 🎯 Interview Questions: Stack + Heap + Async

### Q9: What is the difference between Stack and Heap in JavaScript?

**Answer:**
> | Stack | Heap |
> |-------|------|
> | Stores **primitives** (numbers, strings, booleans) | Stores **reference types** (objects, arrays, functions) |
> | Fixed size, fast access | Dynamic size, slower access |
> | LIFO structure | Unstructured memory pool |
> | Automatically cleaned when EC pops | Garbage collected when no references |
> | Stores **references/pointers** to heap objects | Stores actual object data |

### Q10: What happens to the Call Stack when an async function hits `await`?

**Answer:**
```javascript
async function example() {
    console.log("Before await");
    await somePromise;          // At this point:
    console.log("After await");  // 1. Current EC is SUSPENDED (saved)
}                                // 2. EC is POPPED from call stack
                                 // 3. Control returns to caller
example();                       // 4. When promise resolves, EC is
console.log("After call");       //    PUSHED back and resumes
```
> The function's execution context is **suspended** (not destroyed), saved with its state, and pushed back onto the stack when the awaited Promise resolves.

### Q11: Predict the Output - async/await

```javascript
async function first() {
    console.log(1);
    await second();
    console.log(4);
}

async function second() {
    console.log(2);
}

first();
console.log(3);
```

**Answer:**
```
1
2
3
4
```
**Explanation:**
1. `first()` called → logs `1`
2. `await second()` → `second()` runs → logs `2`
3. `await` suspends `first()`, control returns → logs `3`
4. Microtask executes → `first()` resumes → logs `4`

### Q12: Why are objects stored in Heap and primitives in Stack?

**Answer:**
> **Primitives (Stack):**
> - Fixed size (number = 8 bytes, boolean = 1 byte)
> - Can be efficiently copied directly
> - Immutable - operations create new values
>
> **Objects (Heap):**
> - Dynamic size (can grow/shrink)
> - Expensive to copy entirely
> - Mutable - can be modified in place
> - Need to be shared across multiple variables (via references)
>
> **Performance:** Stack operations are O(1), Heap requires memory management.

### Q13: What's the difference between Promise.all, Promise.race, and sequential awaits?

**Answer:**
```javascript
// Sequential: 3 seconds total (1+1+1)
const a = await fetchA();  // 1 sec
const b = await fetchB();  // 1 sec  
const c = await fetchC();  // 1 sec

// Promise.all: 1 second total (parallel, waits for ALL)
const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);

// Promise.race: Fastest wins (~1 sec, returns FIRST to complete)
const first = await Promise.race([fetchA(), fetchB(), fetchC()]);

// Promise.allSettled: 1 second (parallel, ALL complete regardless of success/fail)
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
// [{status: "fulfilled", value: ...}, {status: "rejected", reason: ...}, ...]
```

---

## 🧠 Memory Model Summary Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     COMPLETE JAVASCRIPT RUNTIME MODEL                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│    ┌──────────────────────────────────────────────────────────────┐         │
│    │                     JS ENGINE (V8, etc.)                      │         │
│    │  ┌─────────────────────┐    ┌─────────────────────────────┐  │         │
│    │  │    CALL STACK       │    │           HEAP              │  │         │
│    │  │                     │    │                             │  │         │
│    │  │  ┌───────────────┐ │    │   ┌───────┐  ┌───────┐     │  │         │
│    │  │  │  Function EC  │ │    │   │Object │  │ Array │     │  │         │
│    │  │  ├───────────────┤ │    │   └───────┘  └───────┘     │  │         │
│    │  │  │  Function EC  │ │    │                             │  │         │
│    │  │  ├───────────────┤ │    │   ┌──────────────────┐     │  │         │
│    │  │  │   Global EC   │ │    │   │ Async Functions  │     │  │         │
│    │  │  └───────────────┘ │    │   │ (suspended ECs)  │     │  │         │
│    │  │                     │    │   └──────────────────┘     │  │         │
│    │  └─────────────────────┘    └─────────────────────────────┘  │         │
│    └──────────────────────────────────────────────────────────────┘         │
│                                      │                                       │
│              ┌───────────────────────┼───────────────────────┐              │
│              │                       ▼                       │              │
│    ┌─────────────────────┐   ┌───────────────┐   ┌─────────────────────┐   │
│    │      WEB APIs       │   │  EVENT LOOP   │   │       QUEUES        │   │
│    │  ────────────────   │   │  ───────────  │   │  ────────────────   │   │
│    │  • setTimeout       │   │               │   │  Microtask Queue    │   │
│    │  • fetch            │◀──│  Continuously │──▶│  ├── Promises       │   │
│    │  • addEventListener │   │  checking...  │   │  └── queueMicrotask │   │
│    │  • DOM operations   │   │               │   │                     │   │
│    │                     │   │  1. Stack     │   │  Callback Queue     │   │
│    │                     │   │     empty?    │   │  ├── setTimeout     │   │
│    │                     │   │  2. Micro Q   │   │  ├── setInterval    │   │
│    │                     │   │  3. Callback Q│   │  └── I/O callbacks  │   │
│    └─────────────────────┘   └───────────────┘   └─────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

EXECUTION ORDER:
1. All synchronous code (Call Stack)
2. Microtask Queue (Promises, async/await continuations)  
3. Callback Queue (setTimeout, events)
4. Repeat...
```

---

## Interview Questions & Answers

### Q1: What is an Execution Context in JavaScript?

**Answer:**
> An Execution Context is the environment in which JavaScript code is evaluated and executed. It contains three key components:
> 1. **Variable Environment** - stores variables, function declarations, and arguments
> 2. **Scope Chain** - references to outer scopes for variable lookup
> 3. **this keyword** - reference determined by how the function is called
>
> There are two main types: Global EC (created when script loads) and Function EC (created every time a function is called).

### Q2: What's the difference between Global and Function Execution Context?

**Answer:**
```javascript
// Global EC - Created once, for top-level code
const globalVar = "I'm global"; // Lives in Global EC

// Function EC - Created every time function is called
function myFunc() {
    const localVar = "I'm local"; // Lives in Function EC
}

myFunc(); // Creates EC #1
myFunc(); // Creates EC #2 (NEW one, not the same)
```

### Q3: What is the Call Stack and why is it important?

**Answer:**
> The Call Stack is a LIFO (Last In, First Out) data structure that tracks which execution context is currently running. It's important because:
> - JavaScript is **single-threaded** - can only do one thing at a time
> - It maintains the order of execution
> - Helps JavaScript know where to return after a function completes

### Q4: Why don't arrow functions have their own `this` and `arguments`?

**Answer:**
> Arrow functions were designed to solve the "this" problem in callbacks. They use **lexical scoping** - meaning they inherit `this` and `arguments` from their **enclosing scope** at the time of definition, not execution. This makes them perfect for callbacks but unsuitable as object methods.

```javascript
const obj = {
    value: 42,
    // Bad - arrow function as method
    getValueArrow: () => this.value, // undefined!
    
    // Good - arrow function as callback
    delayedLog() {
        setTimeout(() => {
            console.log(this.value); // 42 ✅
        }, 1000);
    }
};
```

### Q5: Explain hoisting in the context of Execution Context.

**Answer:**
> Hoisting occurs during the **Creation Phase** of the Execution Context. JavaScript scans for declarations and:
> - `var` variables → Hoisted with value `undefined`
> - `let`/`const` → Hoisted but in **Temporal Dead Zone** (can't access)
> - Function declarations → **Fully hoisted** (can use before declaration)
> - Function expressions/arrows → Treated like variable declarations

```javascript
console.log(hoistedVar);  // undefined
console.log(hoistedLet);  // ReferenceError: TDZ
hoistedFunc();            // "I work!" ✅

var hoistedVar = "value";
let hoistedLet = "value";
function hoistedFunc() { console.log("I work!"); }
```

### Q6: What happens in the Creation Phase vs Execution Phase?

**Answer:**

| Creation Phase | Execution Phase |
|---------------|-----------------|
| Memory allocated for variables | Variables assigned actual values |
| `var` → undefined | Code runs line by line |
| `let`/`const` → TDZ | Functions are called |
| Functions → Full definition | Expressions evaluated |
| Scope chain established | Values returned |

### Q7: Code Output Question - Predict the Output

```javascript
var a = 1;
function outer() {
    var a = 2;
    function inner() {
        var a = 3;
        console.log(a); // ?
    }
    inner();
    console.log(a); // ?
}
outer();
console.log(a); // ?
```

**Answer:**
```
3  // inner's local 'a'
2  // outer's local 'a' 
1  // global 'a'
```
Each function has its own Variable Environment with its own `a`.

### Q8: Code Output Question - `this` in Different Contexts

```javascript
const obj = {
    name: "Object",
    regularMethod: function() {
        console.log(this.name);
    },
    arrowMethod: () => {
        console.log(this.name);
    }
};

obj.regularMethod(); // ?
obj.arrowMethod();   // ?

const detached = obj.regularMethod;
detached(); // ?
```

**Answer:**
```
"Object"       // 'this' = obj
undefined      // 'this' = window (global), no 'name' property
undefined      // 'this' = window (function called without object)
```

---

## 🎯 Key Takeaways for Interviews

1. **Execution Context = Environment for running code** with Variable Environment + Scope Chain + `this`

2. **Three Phases**: 
   - Create GEC → Execute top-level code → Create FEC for each function call

3. **Call Stack** = LIFO structure tracking ECs (single-threaded execution)

4. **Arrow Functions**:
   - ❌ No own `this` (lexical)
   - ❌ No own `arguments`
   - ✅ Perfect for callbacks
   - ❌ Bad for methods

5. **Hoisting** = Space allocated in Creation Phase, used in Execution Phase

6. **Scope Chain** = Looking UP for variables (child → parent → global)

7. **`this` depends on HOW function is called**, not where defined (except arrow functions)

---

## 📚 Memory Tricks

### "VEST" for Execution Context Components
- **V**ariable Environment
- **E**... (Execution happens here)
- **S**cope Chain
- **T**his keyword

### "CAP" for EC Phases
- **C**reation (Memory allocation, hoisting happens)
- **A**nd then
- **P**rogramming runs (Execution phase)

### Arrow Functions Memory: "No THIS, No ARGUMENTS"
Arrow functions say "NO" to having their own this and arguments - they borrow from parents!

---

*Last Updated: February 2026*
*Course: Jonas Schmedtmann - The Complete JavaScript Course 2025*
