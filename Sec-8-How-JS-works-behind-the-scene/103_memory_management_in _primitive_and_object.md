# 📚 JavaScript Memory Management: Primitives, Objects & Copying

> **A Complete Guide for Interviews** - Understanding how JavaScript stores data, manages memory, and handles copying is crucial for writing efficient, bug-free code.

---

## 🎯 Table of Contents

1. [The Big Picture: Call Stack vs Heap](#the-big-picture-call-stack-vs-heap)
2. [Primitives: Value Types in the Stack](#primitives-value-types-in-the-stack)
3. [Objects: Reference Types in the Heap](#objects-reference-types-in-the-heap)
4. [How Functions Are Stored](#how-functions-are-stored)
5. [The Reference Copying Problem](#the-reference-copying-problem)
6. [Shallow Copy: Methods and Limitations](#shallow-copy-methods-and-limitations)
7. [Deep Copy: Complete Independence](#deep-copy-complete-independence)
8. [Interview Cheat Sheet](#interview-cheat-sheet)

---

## 🏛️ The Big Picture: Call Stack vs Heap

### 🎭 The Library Analogy

Think of JavaScript memory like a **city library system**:

| Concept | Analogy | Real World |
|---------|---------|------------|
| **Call Stack** | The librarian's desk with index cards | Small, organized, fast access |
| **Heap** | The actual library shelves with books | Large, unorganized, dynamic storage |
| **Primitives** | Small notes written directly on index cards | Values stored directly in stack |
| **Objects** | Books on shelves, index cards have shelf location | Objects in heap, references in stack |

### 📊 Visual Representation

```
┌─────────────────────────────────────────────────────────────────────┐
│                           JAVASCRIPT ENGINE                          │
├──────────────────────────┬──────────────────────────────────────────┤
│       CALL STACK         │                  HEAP                     │
│   (Execution Contexts)   │        (Dynamic Memory Storage)          │
├──────────────────────────┼──────────────────────────────────────────┤
│                          │                                           │
│  ┌──────────────────┐    │    ┌──────────────────────────────┐      │
│  │ Global Execution │    │    │ Object at address 0x001      │      │
│  │    Context       │    │    │ { name: "John", age: 30 }    │      │
│  │                  │    │    └──────────────────────────────┘      │
│  │ age = 25         │──┐ │                                           │
│  │ name = "Alice"   │  │ │    ┌──────────────────────────────┐      │
│  │ person = 0x001 ──┼──┼─┼───►│ Array at address 0x002       │      │
│  │ arr = 0x002 ─────┼──┼─┼───►│ [1, 2, 3, 4, 5]              │      │
│  └──────────────────┘  │ │    └──────────────────────────────┘      │
│                        │ │                                           │
│  ┌──────────────────┐  │ │    ┌──────────────────────────────┐      │
│  │ Function         │  │ │    │ Function at address 0x003    │      │
│  │ Execution Context│  └─┼───►│ greet() { ... }              │      │
│  │                  │    │    │ [[Scope]]: closure chain     │      │
│  │ x = 10           │    │    └──────────────────────────────┘      │
│  │ y = "hello"      │    │                                           │
│  └──────────────────┘    │                                           │
│                          │                                           │
└──────────────────────────┴──────────────────────────────────────────┘
```

### 🔑 Key Technical Points (V8 Engine Specifics)

Based on V8 (Chrome/Node.js) implementation:

> "JavaScript will keep on stack whatever it knows at compile time the size of (primitives have a fixed size so they can be put on the stack, as well as references to objects). Objects and functions don't have a known fixed size at compilation time so they need to be stored in a dynamic place (heap)."
> — *Stack Overflow Community*

**What goes where:**

| Storage Location | What's Stored | Why |
|-----------------|---------------|-----|
| **Call Stack** | Primitive values, Object references (pointers), Function call frames | Fixed size, known at compile time |
| **Heap** | Objects, Arrays, Functions (actual code) | Dynamic size, grows as needed |

---

## 📦 Primitives: Value Types in the Stack

### The 7 Primitive Types

```javascript
// All 7 Primitive Types in JavaScript
let num = 42;              // Number
let str = "Hello";         // String
let bool = true;           // Boolean
let undef = undefined;     // Undefined
let nul = null;            // Null
let sym = Symbol("id");    // Symbol (ES6)
let big = 9007199254740991n; // BigInt (ES2020)
```

### 🎯 How Primitives Are Stored

```javascript
// EXAMPLE: Primitive Storage in Call Stack
let age = 30;
let oldAge = age;  // COPIES the value, not the reference
age = 31;

console.log(age);    // 31
console.log(oldAge); // 30 ✅ Original value unchanged!
```

**Memory Visualization:**

```
CALL STACK
┌─────────────────────────┐
│ Identifier │   Value    │
├────────────┼────────────┤
│    age     │     31     │  ◄── Updated to 31
├────────────┼────────────┤
│   oldAge   │     30     │  ◄── Independent copy
└─────────────────────────┘
```

### 🔑 Key Insight: Immutability of Primitives

```javascript
// Primitives are IMMUTABLE - you can't change the value, only reassign
let greeting = "Hello";
greeting[0] = "J";      // This does NOTHING
console.log(greeting);  // "Hello" - strings are immutable

// You can only REASSIGN to a new value
greeting = "Jello";     // Creates a new string entirely
console.log(greeting);  // "Jello"
```

### 💡 Interview Point: Why Primitives Are "Passed by Value"

```javascript
function changeValue(x) {
    x = 100;  // This creates a NEW variable x in this function's stack frame
    console.log("Inside function:", x);  // 100
}

let num = 50;
changeValue(num);
console.log("Outside function:", num);  // 50 ✅ Original unchanged!

// Analogy: It's like giving someone a PHOTOCOPY of your document
// They can scribble on their copy, but your original stays safe
```

---

## 🏠 Objects: Reference Types in the Heap

### 🎯 How Objects Are Stored

```javascript
// EXAMPLE: Object Storage - Reference in Stack, Object in Heap
const person = {
    name: "John",
    age: 30
};

const anotherPerson = person;  // COPIES the reference, NOT the object
anotherPerson.age = 35;

console.log(person.age);        // 35 ⚠️ Original ALSO changed!
console.log(anotherPerson.age); // 35
```

**Memory Visualization:**

```
        CALL STACK                              HEAP
┌─────────────────────────────┐     ┌─────────────────────────────┐
│  Identifier  │   Address    │     │    Address 0x001            │
├──────────────┼──────────────┤     │  ┌─────────────────────┐    │
│    person    │    0x001 ────┼────►│  │ name: "John"        │    │
├──────────────┼──────────────┤     │  │ age: 35             │    │
│ anotherPerson│    0x001 ────┼────►│  └─────────────────────┘    │
└─────────────────────────────┘     └─────────────────────────────┘
                                           ▲
                                           │
                               BOTH variables point to
                                 the SAME object!
```

### 🔐 The `const` Misconception

```javascript
// const doesn't make objects immutable - only the REFERENCE is constant
const car = { brand: "Toyota" };

// ✅ This works - modifying the object's CONTENT
car.brand = "Honda";
car.year = 2024;
console.log(car); // { brand: "Honda", year: 2024 }

// ❌ This fails - trying to change the REFERENCE
car = { brand: "Ford" };  // TypeError: Assignment to constant variable

// Analogy: const is like having your house address tattooed
// You can renovate INSIDE the house, but you can't move to a new house
```

### 📦 Arrays Are Objects Too!

```javascript
const originalArray = [1, 2, 3];
const copiedArray = originalArray;  // Reference copy!

copiedArray.push(4);
console.log(originalArray);  // [1, 2, 3, 4] ⚠️ Both affected!
console.log(copiedArray);    // [1, 2, 3, 4]

// Even with const, the array content can change
originalArray[0] = 999;
console.log(copiedArray[0]); // 999
```

---

## ⚙️ How Functions Are Stored

### 📚 Functions Are First-Class Objects

Functions in JavaScript are stored in the **Heap** because:
1. Their size isn't known at compile time
2. They can have properties added to them
3. They carry closure scope information

```javascript
// Function as an object with properties
function greet(name) {
    return `Hello, ${name}!`;
}

// Functions have built-in properties
console.log(greet.name);     // "greet"
console.log(greet.length);   // 1 (number of parameters)

// You can add custom properties to functions!
greet.author = "John Doe";
console.log(greet.author);   // "John Doe"
```

### 🎯 Function Storage Visualization

```
        CALL STACK                                  HEAP
┌──────────────────────────────┐     ┌────────────────────────────────────┐
│  Identifier  │   Address     │     │   Function Object at 0x003         │
├──────────────┼───────────────┤     │  ┌────────────────────────────┐    │
│    greet     │    0x003  ────┼────►│  │ [[Code]]: "return `Hello`" │    │
└──────────────────────────────┘     │  │ [[Scope]]: global scope    │    │
                                     │  │ name: "greet"              │    │
                                     │  │ length: 1                  │    │
                                     │  │ prototype: { ... }         │    │
                                     │  └────────────────────────────┘    │
                                     └────────────────────────────────────┘
```

### 🔄 Function Declaration vs Expression vs Arrow

```javascript
// 1️⃣ Function Declaration - HOISTED (available before definition)
console.log(declaredFunc()); // ✅ Works! "I am declared"
function declaredFunc() {
    return "I am declared";
}

// 2️⃣ Function Expression - NOT hoisted
// console.log(expressedFunc()); // ❌ ReferenceError
const expressedFunc = function() {
    return "I am expressed";
};

// 3️⃣ Arrow Function - NOT hoisted, no own 'this'
// console.log(arrowFunc()); // ❌ ReferenceError
const arrowFunc = () => {
    return "I am an arrow";
};
```

### 🔗 Closures and Memory

```javascript
// Closures capture variables by REFERENCE, not by value
function createCounter() {
    let count = 0;  // This variable is captured in closure
    
    return {
        increment: function() {
            count++;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2

// ⚠️ Memory Leak Warning: Closures keep references alive!
// If you create many closures, unused variables may not be garbage collected
```

**Closure Memory Visualization:**

```
        HEAP
┌─────────────────────────────────────────────────────────────┐
│  createCounter's Closure Scope                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ count: 2                                             │    │
│  │                                                      │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ increment function                          │    │    │
│  │  │ [[Scope]] ──────────► points to count       │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ getCount function                           │    │    │
│  │  │ [[Scope]] ──────────► points to count       │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚨 The Reference Copying Problem

### Why This Causes Bugs

```javascript
// The Classic Bug: Unintentional Mutation
const originalUser = {
    name: "Alice",
    settings: {
        theme: "dark",
        notifications: true
    },
    scores: [100, 95, 88]
};

// Developer thinks they're creating a "backup"
const backupUser = originalUser;  // ❌ Just copying the reference!

// Later in the code...
backupUser.name = "Bob";
backupUser.settings.theme = "light";
backupUser.scores.push(92);

// 😱 Original is also mutated!
console.log(originalUser.name);           // "Bob" - Changed!
console.log(originalUser.settings.theme); // "light" - Changed!
console.log(originalUser.scores);         // [100, 95, 88, 92] - Changed!
```

### 🎭 The Real-World Analogy

```
Reference Copy = Sharing a Google Doc Link
─────────────────────────────────────────
You don't give someone a copy of the document.
You give them access to the SAME document.
Any changes they make affect YOUR document too!

Value Copy = Sending a PDF Download
───────────────────────────────────
They get their own independent copy.
Their changes don't affect your original.
```

---

## 📋 Shallow Copy: Methods and Limitations

### What Is Shallow Copy?

A shallow copy creates a **new container** (new object/array), but **nested objects still share references** with the original.

```
SHALLOW COPY VISUALIZATION
───────────────────────────

Original                          Shallow Copy
┌─────────────────────┐          ┌─────────────────────┐
│ name: "Alice"       │          │ name: "Alice"       │ (independent)
│ age: 30             │          │ age: 30             │ (independent)
│ address ───────────┐│          │ address ───────────┐│
└────────────────────┼┘          └────────────────────┼┘
                     │                                │
                     │    ┌─────────────────────┐    │
                     └───►│ city: "NYC"         │◄───┘
                          │ zip: "10001"        │
                          └─────────────────────┘
                          
                          SHARED nested object!
                          Changing it affects BOTH!
```

### 🛠️ Shallow Copy Methods

#### 1️⃣ Spread Operator (`...`) - Most Common

```javascript
const original = {
    name: "Alice",
    age: 30,
    hobbies: ["reading", "gaming"]  // Nested array
};

const shallowCopy = { ...original };

// ✅ Top-level primitives are independent
shallowCopy.name = "Bob";
console.log(original.name);  // "Alice" - Safe!

// ❌ Nested objects/arrays are still shared
shallowCopy.hobbies.push("coding");
console.log(original.hobbies);  // ["reading", "gaming", "coding"] - Changed!
```

#### 2️⃣ Object.assign()

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = Object.assign({}, original);

copy.a = 100;      // ✅ Independent
copy.b.c = 200;    // ❌ Affects original

console.log(original.a);   // 1 - Safe
console.log(original.b.c); // 200 - Changed!
```

#### 3️⃣ Array Methods: slice(), concat(), Array.from()

```javascript
const originalArr = [1, 2, [3, 4]];

// All these create shallow copies
const copy1 = originalArr.slice();
const copy2 = [...originalArr];
const copy3 = Array.from(originalArr);
const copy4 = [].concat(originalArr);

// ❌ Nested array is shared
copy1[2].push(5);
console.log(originalArr[2]);  // [3, 4, 5] - All affected!
```

### 📊 Shallow Copy Methods Comparison Table

| Method | Syntax | Works On | Speed | Notes |
|--------|--------|----------|-------|-------|
| Spread | `{...obj}` / `[...arr]` | Objects/Arrays | ⚡ Fast | Most readable |
| Object.assign | `Object.assign({}, obj)` | Objects | ⚡ Fast | Older but reliable |
| Array.slice | `arr.slice()` | Arrays | ⚡ Fast | Classic method |
| Array.from | `Array.from(arr)` | Arrays/Iterables | ⚡ Fast | Works with array-likes |

---

## 🔄 Deep Copy: Complete Independence

### What Is Deep Copy?

A deep copy creates **completely independent copies** of all levels - the new object has **no shared references** with the original.

```
DEEP COPY VISUALIZATION
────────────────────────

Original                          Deep Copy
┌─────────────────────┐          ┌─────────────────────┐
│ name: "Alice"       │          │ name: "Alice"       │
│ age: 30             │          │ age: 30             │
│ address ──────────┐ │          │ address ──────────┐ │
└───────────────────┼─┘          └───────────────────┼─┘
                    │                                │
                    ▼                                ▼
          ┌─────────────────┐            ┌─────────────────┐
          │ city: "NYC"     │            │ city: "NYC"     │
          │ zip: "10001"    │            │ zip: "10001"    │
          └─────────────────┘            └─────────────────┘
          
          SEPARATE copies!             COMPLETELY INDEPENDENT!
```

### 🛠️ Deep Copy Methods

#### 1️⃣ structuredClone() - The Modern Standard ⭐

```javascript
// ✅ RECOMMENDED for most use cases (ES2022+)
const original = {
    name: "Alice",
    date: new Date(),
    nested: { deep: { value: 42 } },
    arr: [1, [2, [3]]]
};

const deepCopy = structuredClone(original);

// Completely independent!
deepCopy.nested.deep.value = 999;
deepCopy.arr[1][1][0] = 999;

console.log(original.nested.deep.value); // 42 - Unchanged!
console.log(original.arr[1][1][0]);      // 3 - Unchanged!
```

**structuredClone Capabilities:**

```javascript
// ✅ What structuredClone CAN handle
const obj = {
    date: new Date(),
    regex: /hello/gi,
    map: new Map([["key", "value"]]),
    set: new Set([1, 2, 3]),
    arrayBuffer: new ArrayBuffer(8),
    nested: { deep: { deeper: { value: 1 } } }
};

const cloned = structuredClone(obj);
console.log(cloned.date instanceof Date); // true
console.log(cloned.map instanceof Map);   // true

// ❌ What structuredClone CANNOT handle
const badObj = {
    func: function() {},     // ❌ Functions
    symbol: Symbol("id"),    // ❌ Symbols
    dom: document.body,      // ❌ DOM nodes
    error: new Error("oops") // ❌ Error objects
};

// structuredClone(badObj); // Throws DataCloneError!
```

#### 2️⃣ JSON.parse(JSON.stringify()) - The Classic Hack

```javascript
const original = {
    name: "Alice",
    age: 30,
    scores: [100, 95, [88, 92]]
};

const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.scores[2][0] = 999;
console.log(original.scores[2][0]); // 88 - Unchanged!
```

**⚠️ JSON Method Limitations:**

```javascript
// What JSON method LOSES:
const problematicObj = {
    date: new Date(),           // Becomes string
    undefined: undefined,       // Lost completely
    infinity: Infinity,         // Becomes null
    nan: NaN,                   // Becomes null
    regex: /hello/gi,           // Becomes {}
    func: function() {},        // Lost completely
    symbol: Symbol("id"),       // Lost completely
    map: new Map(),             // Becomes {}
    set: new Set(),             // Becomes {}
};

const jsonCopy = JSON.parse(JSON.stringify(problematicObj));

console.log(jsonCopy);
// {
//   date: "2024-01-15T...",  - String, not Date!
//   infinity: null,
//   nan: null,
//   regex: {},
//   map: {},
//   set: {}
// }
// undefined, func, and symbol are GONE!
```

#### 3️⃣ Custom Recursive Deep Copy Function

```javascript
// Handles most common cases including functions
function deepCopy(src) {
    // Handle null and non-objects
    if (src === null || typeof src !== "object") {
        return src;
    }
    
    // Handle Date
    if (src instanceof Date) {
        return new Date(src.getTime());
    }
    
    // Handle Array
    if (Array.isArray(src)) {
        return src.map(item => deepCopy(item));
    }
    
    // Handle RegExp
    if (src instanceof RegExp) {
        return new RegExp(src.source, src.flags);
    }
    
    // Handle Map
    if (src instanceof Map) {
        const mapCopy = new Map();
        src.forEach((value, key) => {
            mapCopy.set(deepCopy(key), deepCopy(value));
        });
        return mapCopy;
    }
    
    // Handle Set
    if (src instanceof Set) {
        const setCopy = new Set();
        src.forEach(value => {
            setCopy.add(deepCopy(value));
        });
        return setCopy;
    }
    
    // Handle plain objects
    const target = {};
    for (const key in src) {
        if (src.hasOwnProperty(key)) {
            target[key] = deepCopy(src[key]);
        }
    }
    
    return target;
}

// Usage
const original = {
    name: "Alice",
    nested: { deep: { value: 42 } },
    arr: [1, [2, 3]],
    date: new Date()
};

const copied = deepCopy(original);
copied.nested.deep.value = 999;
console.log(original.nested.deep.value); // 42 - Unchanged!
```

#### 4️⃣ Lodash _.cloneDeep() - The Battle-Tested Library

```javascript
// npm install lodash
import { cloneDeep } from 'lodash';

const original = {
    nested: { deep: { value: 42 } },
    date: new Date(),
    func: function() { console.log("Hello"); }
};

const deepCopied = cloneDeep(original);

deepCopied.nested.deep.value = 999;
console.log(original.nested.deep.value); // 42 - Unchanged!

// Even functions are cloned (by reference, but independent object)
console.log(typeof deepCopied.func); // "function"
```

### 📊 Deep Copy Methods Comparison Table

| Method | Handles Functions | Handles Dates | Handles Circular Refs | Speed | Browser Support |
|--------|-------------------|---------------|----------------------|-------|-----------------|
| `structuredClone()` | ❌ No | ✅ Yes | ✅ Yes | ⚡ Fast | Modern browsers |
| `JSON.parse/stringify` | ❌ No | ❌ No (string) | ❌ No | ⚡ Fast | All browsers |
| Custom Recursive | ✅ Can add | ✅ Yes | ❌ Extra code needed | 🐢 Medium | All browsers |
| Lodash `cloneDeep` | ✅ Yes | ✅ Yes | ✅ Yes | 🐢 Medium | All browsers |

---

## 🎯 Practical Usage Patterns

### Pattern 1: Immutable State Updates (React/Redux)

```javascript
// ❌ Wrong: Direct mutation
const state = { user: { name: "Alice", settings: { theme: "dark" } } };
state.user.settings.theme = "light"; // Mutates original!

// ✅ Correct: Create new objects at each level
const newState = {
    ...state,
    user: {
        ...state.user,
        settings: {
            ...state.user.settings,
            theme: "light"
        }
    }
};

// ✅ Or use structuredClone for deep updates
const newState2 = structuredClone(state);
newState2.user.settings.theme = "light";
```

### Pattern 2: Function Parameters - Protecting Original Data

```javascript
// ❌ Dangerous: Function modifies original
function processUser(user) {
    user.processed = true;
    user.timestamp = Date.now();
    return user;
}

const original = { name: "Alice" };
const result = processUser(original);
console.log(original.processed); // true - Original mutated!

// ✅ Safe: Clone before processing
function processUserSafe(user) {
    const copy = structuredClone(user);
    copy.processed = true;
    copy.timestamp = Date.now();
    return copy;
}

const original2 = { name: "Bob" };
const result2 = processUserSafe(original2);
console.log(original2.processed); // undefined - Original safe!
```

### Pattern 3: Undo/Redo Systems

```javascript
class UndoableState {
    constructor(initialState) {
        this.history = [structuredClone(initialState)];
        this.currentIndex = 0;
    }
    
    update(newState) {
        // Remove any future states (after undo)
        this.history = this.history.slice(0, this.currentIndex + 1);
        // Add deep copy of new state
        this.history.push(structuredClone(newState));
        this.currentIndex++;
    }
    
    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return structuredClone(this.history[this.currentIndex]);
        }
        return null;
    }
    
    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return structuredClone(this.history[this.currentIndex]);
        }
        return null;
    }
    
    getCurrent() {
        return structuredClone(this.history[this.currentIndex]);
    }
}

// Usage
const editor = new UndoableState({ text: "Hello" });
editor.update({ text: "Hello World" });
editor.update({ text: "Hello World!" });
console.log(editor.getCurrent()); // { text: "Hello World!" }
console.log(editor.undo());       // { text: "Hello World" }
console.log(editor.undo());       // { text: "Hello" }
console.log(editor.redo());       // { text: "Hello World" }
```

---

## 📝 Interview Cheat Sheet

### 🔥 Common Interview Questions & Answers

#### Q1: "What's the difference between primitives and objects in terms of memory?"

```javascript
// Answer with this example:
let a = 10;
let b = a;    // Value is COPIED
b = 20;
console.log(a); // 10 - Independent

let obj1 = { x: 10 };
let obj2 = obj1;  // Reference is COPIED
obj2.x = 20;
console.log(obj1.x); // 20 - Same object!

// Key point: Primitives are stored by VALUE in the stack
// Objects are stored in the heap, with REFERENCES in the stack
```

#### Q2: "How would you create a deep copy of an object?"

```javascript
// Modern answer:
const deepCopy = structuredClone(original);

// Classic answer (with caveats):
const deepCopy = JSON.parse(JSON.stringify(original));
// Caveat: Loses functions, undefined, Dates become strings

// Library answer:
import { cloneDeep } from 'lodash';
const deepCopy = cloneDeep(original);
```

#### Q3: "What's the difference between shallow and deep copy?"

```javascript
const original = { a: 1, nested: { b: 2 } };

// Shallow: New container, shared nested refs
const shallow = { ...original };
shallow.nested.b = 999;
console.log(original.nested.b); // 999 - Changed!

// Deep: Completely independent
const deep = structuredClone(original);
deep.nested.b = 999;
console.log(original.nested.b); // 2 - Unchanged!
```

#### Q4: "Does `const` make an object immutable?"

```javascript
// No! const only prevents reassignment of the variable
const obj = { value: 1 };
obj.value = 2;     // ✅ Works - modifying content
obj = { value: 3 }; // ❌ Error - reassigning variable

// For true immutability, use Object.freeze() (shallow)
// or libraries like Immutable.js
```

#### Q5: "Why does this code have a bug?"

```javascript
function addToCart(cart, item) {
    cart.push(item);
    return cart;
}

const myCart = ["apple"];
const newCart = addToCart(myCart, "banana");

console.log(myCart);   // ["apple", "banana"] - Original mutated!
console.log(newCart);  // ["apple", "banana"]

// Fix: Clone the array first
function addToCartFixed(cart, item) {
    return [...cart, item];  // Returns new array
}
```

### 📚 Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│                 JAVASCRIPT MEMORY QUICK REFERENCE               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRIMITIVES (Stack)          OBJECTS (Heap)                     │
│  ─────────────────           ─────────────                      │
│  • Number                    • Object {}                        │
│  • String                    • Array []                         │
│  • Boolean                   • Function                         │
│  • null                      • Date                             │
│  • undefined                 • RegExp                           │
│  • Symbol                    • Map, Set                         │
│  • BigInt                    • Custom classes                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  COPYING METHODS                                                │
│  ───────────────                                                │
│                                                                 │
│  SHALLOW (new container, shared nested refs):                   │
│  • { ...obj }                  • Object.assign({}, obj)         │
│  • [ ...arr ]                  • arr.slice()                    │
│                                                                 │
│  DEEP (complete independence):                                  │
│  • structuredClone(obj)        ⭐ RECOMMENDED                   │
│  • JSON.parse(JSON.stringify(obj))  ⚠️ Loses functions/dates   │
│  • lodash.cloneDeep(obj)       📦 Requires library              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  KEY INTERVIEW POINTS                                           │
│  ────────────────────                                           │
│  1. Primitives = copied by VALUE                                │
│  2. Objects = copied by REFERENCE                               │
│  3. const ≠ immutable (only prevents reassignment)              │
│  4. Functions are first-class objects (stored in heap)          │
│  5. Closures capture variables by reference                     │
│  6. Always clone when you need independent copies               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧠 Memory Management Best Practices

### 1. Avoid Memory Leaks

```javascript
// ❌ Memory leak: Event listener never removed
function setupHandler() {
    const largeData = new Array(1000000).fill("data");
    
    document.getElementById("btn").addEventListener("click", function() {
        console.log(largeData.length);  // Closure keeps largeData alive!
    });
}

// ✅ Clean up: Remove listeners when done
function setupHandlerClean() {
    const largeData = new Array(1000000).fill("data");
    
    function handler() {
        console.log(largeData.length);
    }
    
    const btn = document.getElementById("btn");
    btn.addEventListener("click", handler);
    
    // Return cleanup function
    return () => btn.removeEventListener("click", handler);
}
```

### 2. Use WeakMap/WeakSet for Caches

```javascript
// ❌ Regular Map keeps objects alive
const cache = new Map();
let obj = { data: "important" };
cache.set(obj, "cached value");
obj = null;  // Object still in memory because Map references it!

// ✅ WeakMap allows garbage collection
const weakCache = new WeakMap();
let obj2 = { data: "important" };
weakCache.set(obj2, "cached value");
obj2 = null;  // Object can be garbage collected!
```

---

## 🎓 Summary

| Concept | Key Takeaway |
|---------|-------------|
| **Primitives** | Stored directly in stack, copied by value |
| **Objects** | Stored in heap, referenced from stack |
| **Functions** | First-class objects in heap with closure scope |
| **Shallow Copy** | New container, shared nested references |
| **Deep Copy** | Complete independence at all levels |
| **Best Method** | Use `structuredClone()` for most deep copy needs |
| **Immutability** | Always clone when you need independent copies |

---

> 💡 **Pro Tip**: In interviews, always demonstrate understanding with code examples. Show both the problem (mutation) and the solution (proper copying). This demonstrates practical knowledge, not just theoretical understanding.

---

*Last Updated: 2024 | Sources: MDN Web Docs, V8 Developer Blog, Stack Overflow Community*
