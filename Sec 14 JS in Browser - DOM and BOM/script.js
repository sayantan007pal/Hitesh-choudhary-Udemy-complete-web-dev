// ═══════════════════════════════════════════════════════════════════════════════
// JAVASCRIPT IN THE BROWSER - DOM and BOM
// A Comprehensive Guide for Junior Engineers
// ═══════════════════════════════════════════════════════════════════════════════
//
// When JavaScript runs in a BROWSER (not Node.js), it gets special powers to:
//   1. Manipulate the webpage (DOM)
//   2. Control the browser itself (BOM)
//
// Everything starts with the WINDOW object - it's the global object in browsers.
// When you write `console.log()`, you're actually calling `window.console.log()`
//
// ═══════════════════════════════════════════════════════════════════════════════
//                                THE BIG PICTURE
// ═══════════════════════════════════════════════════════════════════════════════
//
//  ┌────────────────────────── WINDOW (Global Object) ──────────────────────────┐
//  │                                                                            │
//  │   ┌─────────────────────┐              ┌─────────────────────────────────┐ │
//  │   │   BOM               │              │   DOM                           │ │
//  │   │   (Browser Object   │              │   (Document Object Model)       │ │
//  │   │    Model)           │              │                                 │ │
//  │   │                     │              │   Your HTML as JavaScript       │ │
//  │   │   Controls the      │              │   objects you can manipulate    │ │
//  │   │   BROWSER itself    │              │                                 │ │
//  │   │                     │              │   Access via: document          │ │
//  │   │   navigator         │              │                                 │ │
//  │   │   location          │              │         document                │ │
//  │   │   history           │              │            └── html             │ │
//  │   │   screen            │              │                 ├── head        │ │
//  │   │   localStorage      │              │                 └── body        │ │
//  │   │   sessionStorage    │              │                      ├── h1     │ │
//  │   │   alert/confirm     │              │                      └── button │ │
//  │   │   setTimeout        │              │                                 │ │
//  │   └─────────────────────┘              └─────────────────────────────────┘ │
//  │                                                                            │
//  └────────────────────────────────────────────────────────────────────────────┘
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                     PART 1: DOM (Document Object Model)
// ═══════════════════════════════════════════════════════════════════════════════
//
// WHAT IS THE DOM?
// ────────────────
// When the browser loads your HTML, it creates a tree-like structure called the DOM.
// Each HTML element becomes a "node" that JavaScript can access and modify.
//
// Your HTML:                           The DOM Tree:
// ─────────────                        ──────────────
// <html>                               document
//   <head>                               └── html
//     <title>Page</title>                     ├── head
//   </head>                                   │    └── title
//   <body>                                    │         └── "Page"
//     <h1>Hello</h1>                          └── body
//     <button>Click</button>                       ├── h1
//   </body>                                        │    └── "Hello"
// </html>                                          └── button
//                                                       └── "Click"
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         1.1 SELECTING DOM ELEMENTS
// ═══════════════════════════════════════════════════════════════════════════════
//
// Before you can change anything, you need to SELECT it. Here are the methods:
//
// ┌────────────────────────────────────────────────────────────────────────────┐
// │ Method                            │ Returns        │ When to Use           │
// ├────────────────────────────────────────────────────────────────────────────┤
// │ getElementById('id')              │ ONE element    │ When element has ID   │
// │ querySelector('css-selector')     │ FIRST match    │ Most flexible option  │
// │ querySelectorAll('css-selector')  │ ALL matches    │ Need multiple elements│
// │ getElementsByClassName('class')   │ HTMLCollection │ Legacy code           │
// │ getElementsByTagName('tag')       │ HTMLCollection │ Legacy code           │
// └────────────────────────────────────────────────────────────────────────────┘
//
// EXAMPLES:
// ─────────

// By ID - returns exactly ONE element (or null if not found)
// const header = document.getElementById('main-header');

// By CSS Selector - use just like CSS! Returns FIRST match only
// const button = document.querySelector('button');              // First <button>
// const submitBtn = document.querySelector('.submit-btn');      // First .submit-btn
// const navLink = document.querySelector('nav a.active');       // Complex selector

// By CSS Selector - returns ALL matches as a NodeList
// const allButtons = document.querySelectorAll('button');       // All <button>s
// const allItems = document.querySelectorAll('.list-item');     // All .list-items

// REAL-WORLD TIP FOR LARGE CODEBASES:
// ────────────────────────────────────
// Always prefer querySelector/querySelectorAll because:
//   ✅ Uses CSS selectors you already know
//   ✅ More flexible than getElementById
//   ✅ Returns NodeList (has forEach) vs HTMLCollection (no forEach)
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         1.2 READING & MODIFYING CONTENT
// ═══════════════════════════════════════════════════════════════════════════════
//
// Once you have an element, you can read or change its content:
//
// ┌───────────────────────────────────────────────────────────────────────────┐
// │ Property         │ What it does                 │ Security               │
// ├───────────────────────────────────────────────────────────────────────────┤
// │ textContent      │ Gets/sets text only          │ ✅ SAFE - escapes HTML │
// │ innerHTML        │ Gets/sets HTML content       │ ⚠️ DANGER - XSS risk   │
// │ innerText        │ Gets/sets visible text       │ ✅ SAFE - escapes HTML │
// └───────────────────────────────────────────────────────────────────────────┘
//
// EXAMPLES:
// ─────────

// const heading = document.querySelector('h1');

// READING content
// console.log(heading.textContent);  // "Hello" - just the raw text
// console.log(heading.innerHTML);    // "<em>Hello</em>" - includes HTML tags

// WRITING content
// heading.textContent = 'Welcome!';           // Sets plain text (SAFE)
// heading.innerHTML = '<em>Welcome!</em>';    // Renders HTML (BE CAREFUL!)

// ⚠️ SECURITY WARNING FOR JUNIOR ENGINEERS:
// ──────────────────────────────────────────
// NEVER use innerHTML with user-provided data! It can execute malicious scripts.
//
// 🚫 BAD (XSS vulnerability):
//    element.innerHTML = userInput;
//
// ✅ GOOD (Safe):
//    element.textContent = userInput;
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         1.3 MODIFYING STYLES & CLASSES
// ═══════════════════════════════════════════════════════════════════════════════
//
// Two ways to change how elements look:
//
// METHOD 1: Inline Styles (use sparingly)
// ───────────────────────────────────────
// const box = document.querySelector('.box');
// box.style.backgroundColor = 'blue';    // Note: camelCase, not kebab-case
// box.style.fontSize = '20px';           // Must include units
// box.style.display = 'none';            // Hide element
//
// METHOD 2: CSS Classes (PREFERRED in large codebases!)
// ─────────────────────────────────────────────────────
// const box = document.querySelector('.box');
// box.classList.add('active');           // Add a class
// box.classList.remove('hidden');        // Remove a class
// box.classList.toggle('expanded');      // Add if missing, remove if present
// box.classList.contains('active');      // Returns true/false
// box.classList.replace('old', 'new');   // Replace one class with another
//
// REAL-WORLD TIP:
// ───────────────
// In large codebases, ALWAYS prefer classList over inline styles because:
//   ✅ Keeps JavaScript and CSS separate (separation of concerns)
//   ✅ CSS classes can be reused across elements
//   ✅ Easier to debug in browser DevTools
//   ✅ Better for team collaboration
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         1.4 CREATING & REMOVING ELEMENTS
// ═══════════════════════════════════════════════════════════════════════════════
//
// You can dynamically add or remove elements from the page:
//
// CREATING AND ADDING AN ELEMENT:
// ───────────────────────────────
// Step 1: Create the element
// const newItem = document.createElement('li');
//
// Step 2: Add content and attributes
// newItem.textContent = 'New list item';
// newItem.classList.add('list-item');
// newItem.setAttribute('data-id', '123');
//
// Step 3: Add it to the DOM
// const list = document.querySelector('ul');
// list.appendChild(newItem);              // Add at the END
// list.prepend(newItem);                  // Add at the BEGINNING
// list.insertBefore(newItem, someOther);  // Add BEFORE specific element
//
// REMOVING AN ELEMENT:
// ────────────────────
// element.remove();                       // Modern way (recommended)
// parent.removeChild(element);            // Older way (needs parent)
//
// REAL-WORLD EXAMPLE - Adding a todo item:
// ────────────────────────────────────────
// function addTodo(text) {
//     const li = document.createElement('li');
//     li.textContent = text;
//     li.classList.add('todo-item');
//     document.querySelector('.todo-list').appendChild(li);
// }
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         1.5 EVENT HANDLING
// ═══════════════════════════════════════════════════════════════════════════════
//
// Events let your code RESPOND to user actions (clicks, typing, etc.)
//
// SYNTAX:
// ───────
// element.addEventListener('eventType', callbackFunction);
//
// EXAMPLES:
// ─────────
// const button = document.querySelector('button');
//
// // With regular function
// button.addEventListener('click', function(event) {
//     console.log('Button clicked!');
//     console.log(event.target);        // The element that was clicked
// });
//
// // With arrow function
// button.addEventListener('click', (e) => {
//     e.preventDefault();               // Stop default behavior
//     console.log('Clicked!');
// });
//
// COMMON EVENT TYPES:
// ┌────────────────────────────────────────────────────────────────────────────┐
// │ Event             │ Triggered When                                        │
// ├────────────────────────────────────────────────────────────────────────────┤
// │ 'click'           │ Element is clicked                                    │
// │ 'dblclick'        │ Element is double-clicked                             │
// │ 'submit'          │ Form is submitted                                     │
// │ 'keydown'         │ Key is pressed down                                   │
// │ 'keyup'           │ Key is released                                       │
// │ 'input'           │ Input field value changes (fires on each keystroke)   │
// │ 'change'          │ Input loses focus AND value changed                   │
// │ 'focus'           │ Element gains focus                                   │
// │ 'blur'            │ Element loses focus                                   │
// │ 'mouseenter'      │ Mouse enters element area                             │
// │ 'mouseleave'      │ Mouse leaves element area                             │
// │ 'scroll'          │ Element or page is scrolled                           │
// │ 'load'            │ Page/resource finished loading                        │
// │ 'DOMContentLoaded'│ HTML parsed (before images/CSS load) - USE THIS!      │
// └────────────────────────────────────────────────────────────────────────────┘
//
// THE EVENT OBJECT:
// ─────────────────
// The callback function receives an 'event' object with useful properties:
//
// button.addEventListener('click', (event) => {
//     event.target          // The element that triggered the event
//     event.currentTarget   // The element the listener is attached to
//     event.preventDefault()// Stop default behavior (form submit, link click)
//     event.stopPropagation() // Stop event from bubbling up to parents
// });
//
// IMPORTANT PATTERN - DOMContentLoaded:
// ─────────────────────────────────────
// Run your code AFTER the HTML is fully loaded:
//
// document.addEventListener('DOMContentLoaded', () => {
//     // Your code here - all HTML elements are now available
//     const button = document.querySelector('button');
//     button.addEventListener('click', handleClick);
// });
//
// Or use the 'defer' attribute in your script tag (like in index.html):
// <script defer src="script.js"></script>   ← Already done for you!
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                     PART 2: BOM (Browser Object Model)
// ═══════════════════════════════════════════════════════════════════════════════
//
// BOM lets you interact with the BROWSER itself, not just the webpage content.
// Unlike DOM, BOM has no official W3C standard - browsers implement their own.
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         2.1 WINDOW OBJECT
// ═══════════════════════════════════════════════════════════════════════════════
//
// The window object IS the browser window. It contains everything.
//
// WINDOW DIMENSIONS:
// ──────────────────
// window.innerWidth     // Viewport width (without scrollbar)
// window.innerHeight    // Viewport height
// window.outerWidth     // Full browser window width
// window.outerHeight    // Full browser window height
//
// SCROLLING:
// ──────────
// window.scrollY        // Pixels scrolled from top
// window.scrollX        // Pixels scrolled from left
// window.scrollTo(0, 0)           // Scroll to top-left
// window.scrollBy(0, 100)         // Scroll down 100px from current position
// element.scrollIntoView()        // Scroll element into view
//
// OPEN/CLOSE WINDOWS:
// ───────────────────
// window.open('https://google.com', '_blank');   // Open in new tab
// window.close();                                 // Close (only if JS opened it)
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         2.2 LOCATION OBJECT
// ═══════════════════════════════════════════════════════════════════════════════
//
// window.location gives you information about the current URL and lets you navigate.
//
// For URL: https://example.com:8080/products/shoes?color=red&size=10#reviews
//
// location.href         // Full URL: "https://example.com:8080/products/shoes?..."
// location.protocol     // "https:"
// location.hostname     // "example.com"
// location.port         // "8080"
// location.pathname     // "/products/shoes"
// location.search       // "?color=red&size=10"
// location.hash         // "#reviews"
//
// NAVIGATION:
// ───────────
// location.href = 'https://google.com';  // Navigate to URL (adds to history)
// location.replace('https://google.com'); // Navigate (NO history - can't go back)
// location.reload();                      // Refresh the page
//
// REAL-WORLD USE CASE:
// ────────────────────
// Redirect to login if not authenticated:
// if (!isLoggedIn) {
//     location.href = '/login?redirect=' + encodeURIComponent(location.pathname);
// }
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         2.3 HISTORY OBJECT
// ═══════════════════════════════════════════════════════════════════════════════
//
// window.history lets you navigate the browser's history (back/forward buttons).
//
// history.back();       // Same as clicking browser's back button
// history.forward();    // Same as clicking browser's forward button
// history.go(-2);       // Go back 2 pages
// history.go(1);        // Go forward 1 page
// history.length        // Number of entries in history
//
// MODERN SPA (Single Page App) METHODS:
// ─────────────────────────────────────
// history.pushState({data: 'foo'}, '', '/new-url');    // Add new history entry
// history.replaceState({data: 'bar'}, '', '/new-url'); // Replace current entry
//
// These are used by React Router, Vue Router, etc. to change URLs without
// reloading the page!
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         2.4 NAVIGATOR OBJECT
// ═══════════════════════════════════════════════════════════════════════════════
//
// window.navigator gives information about the browser and device.
//
// navigator.userAgent       // Browser info string
// navigator.language        // Browser language ("en-US", "hi-IN", etc.)
// navigator.onLine          // true if connected to internet
// navigator.cookieEnabled   // true if cookies are enabled
// navigator.platform        // Operating system ("MacIntel", "Win32", etc.)
//
// USEFUL APIS:
// ────────────
// navigator.clipboard.writeText('Hello');  // Copy to clipboard
// navigator.geolocation.getCurrentPosition(callback);  // Get GPS location
// navigator.share({title: 'Hi', url: '...'});  // Native share dialog (mobile)
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         2.5 LOCAL STORAGE & SESSION STORAGE
// ═══════════════════════════════════════════════════════════════════════════════
//
// Store data in the browser that persists across page refreshes.
//
// ┌────────────────────────────────────────────────────────────────────────────┐
// │ localStorage                        │ sessionStorage                       │
// ├────────────────────────────────────────────────────────────────────────────┤
// │ Data persists FOREVER               │ Data cleared when tab closes         │
// │ Shared across all tabs              │ Unique to each tab                   │
// │ Use for: user preferences, tokens   │ Use for: temp data, form drafts      │
// └────────────────────────────────────────────────────────────────────────────┘
//
// METHODS (same for both):
// ────────────────────────
// localStorage.setItem('key', 'value');      // Store data
// localStorage.getItem('key');               // Retrieve data (or null)
// localStorage.removeItem('key');            // Delete one item
// localStorage.clear();                      // Delete ALL items
//
// ⚠️ IMPORTANT: Storage only accepts STRINGS!
// ─────────────────────────────────────────
// To store objects/arrays, use JSON:
//
// // STORING an object
// const user = { name: 'John', age: 25 };
// localStorage.setItem('user', JSON.stringify(user));
//
// // RETRIEVING an object
// const savedUser = JSON.parse(localStorage.getItem('user'));
// console.log(savedUser.name);  // "John"
//
// REAL-WORLD EXAMPLE - Remember dark mode preference:
// ───────────────────────────────────────────────────
// // On page load
// if (localStorage.getItem('darkMode') === 'true') {
//     document.body.classList.add('dark');
// }
//
// // When user toggles dark mode
// function toggleDarkMode() {
//     document.body.classList.toggle('dark');
//     localStorage.setItem('darkMode', document.body.classList.contains('dark'));
// }
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         2.6 TIMING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════
//
// Execute code after a delay or repeatedly.
//
// setTimeout  - Run code ONCE after a delay
// setInterval - Run code REPEATEDLY at intervals
//
// SETTIMEOUT:
// ───────────
// const timeoutId = setTimeout(() => {
//     console.log('This runs after 2 seconds');
// }, 2000);  // 2000ms = 2 seconds
//
// clearTimeout(timeoutId);  // Cancel before it runs
//
// SETINTERVAL:
// ────────────
// const intervalId = setInterval(() => {
//     console.log('This runs every 1 second');
// }, 1000);
//
// clearInterval(intervalId);  // Stop the interval
//
// REAL-WORLD EXAMPLE - Auto-save form:
// ────────────────────────────────────
// let saveTimeout;
// input.addEventListener('input', () => {
//     clearTimeout(saveTimeout);  // Cancel previous timer
//     saveTimeout = setTimeout(() => {
//         saveToServer(input.value);  // Save after 500ms of no typing
//     }, 500);
// });
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         2.7 DIALOG BOXES
// ═══════════════════════════════════════════════════════════════════════════════
//
// Built-in browser dialogs (use sparingly - they block the page!)
//
// alert('Hello!');                         // Shows message, OK button
// const confirmed = confirm('Delete?');    // OK/Cancel, returns true/false
// const name = prompt('Your name?');       // Input box, returns string or null
//
// ⚠️ NOTE: These are BLOCKING - the page freezes until user responds.
// In modern apps, use custom modal components instead!
//
//
// ═══════════════════════════════════════════════════════════════════════════════
//                         QUICK REFERENCE CHEAT SHEET
// ═══════════════════════════════════════════════════════════════════════════════
//
// DOM - Webpage Manipulation:
// ───────────────────────────
// document.querySelector('css')           → Select first matching element
// document.querySelectorAll('css')        → Select all matching elements
// element.textContent = 'text'            → Set text safely
// element.classList.add/remove/toggle()   → Modify CSS classes
// element.addEventListener('event', fn)   → Listen for events
// document.createElement('tag')           → Create new element
// parent.appendChild(child)               → Add element to page
// element.remove()                        → Remove element from page
//
// BOM - Browser Control:
// ──────────────────────
// window.innerWidth/innerHeight           → Viewport dimensions
// location.href = 'url'                   → Navigate to URL
// history.back()/forward()                → Navigate history
// localStorage.setItem/getItem()          → Persist data
// setTimeout(fn, ms)                      → Run once after delay
// setInterval(fn, ms)                     → Run repeatedly
//
// ═══════════════════════════════════════════════════════════════════════════════
// END OF GUIDE - Now let's write some code!
// ═══════════════════════════════════════════════════════════════════════════════

console.log("Hello World - DOM and BOM Guide Loaded!")

// Try these in the browser console:
// document.querySelector('h1')
// document.querySelector('button')
// window.innerWidth
// location.href