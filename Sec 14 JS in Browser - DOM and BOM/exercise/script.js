/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                    DOM MANIPULATION IN JAVASCRIPT                            ║
║                    (Document Object Model Basics)                            ║
╚══════════════════════════════════════════════════════════════════════════════╝

🎯 WHAT IS DOM?
   - DOM (Document Object Model) is a tree-like representation of your HTML page
   - It converts HTML into JavaScript objects that we can manipulate
   - Think of it as a "live" version of your HTML that JavaScript can change

🎯 DOM vs HTML:
   ┌─────────────────────────────────────────────────────────────────────────┐
   │  HTML                          │  DOM                                   │
   ├─────────────────────────────────────────────────────────────────────────┤
   │  Static text file              │  Live object in browser memory         │
   │  Written by developer          │  Created by browser from HTML          │
   │  Cannot be changed at runtime  │  Can be modified with JavaScript       │
   │  Just markup/structure         │  Has properties, methods, events       │
   │  Example: <p>Hello</p>         │  Example: document.querySelector('p')  │
   └─────────────────────────────────────────────────────────────────────────┘

🎯 KEY SELECTORS:
   - document.getElementById("id")      → Selects element by ID (fastest)
   - document.querySelector("#id")      → Selects by CSS selector (# for ID)
   - document.querySelector(".class")   → Selects by CSS selector (. for class)
   - document.querySelectorAll(".class")→ Selects ALL matching elements

🎯 INTERVIEW TIP: DOM is an API (Application Programming Interface) provided 
   by browsers to interact with HTML documents programmatically.
*/

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 1: Basic Click Event & Changing Text Content
// ═══════════════════════════════════════════════════════════════════════════

// Step 1: Get reference to the button element using its ID
let hold = document.getElementById("changeTextButton")

// Step 2: Attach a "click" event listener to the button
// When user clicks this button, the function inside will execute
let changeOnCLick = hold.addEventListener("click", function(){
    
    // 'this' keyword refers to the element that triggered the event (the button)
    // In regular functions, 'this' is bound to the element the event is attached to
    console.log(this) // Output: <button id="changeTextButton">...</button>
    
    // Get reference to the paragraph we want to change
    let para = document.getElementById("myParagraph")
    console.log(para) // Output: <p id="myParagraph">...</p>
    
    // Change the text content of the paragraph
    // textContent = gets/sets the text inside an element (ignores HTML tags)
    let changingText = para.textContent = "the paragraph is changed"
    console.log(changingText) // Output: "the paragraph is changed"
})

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║  ❓ ANSWER: Why use Regular Function instead of Arrow Function here?         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  🔑 KEY DIFFERENCE: How 'this' keyword behaves                               ║
║                                                                              ║
║  Regular Function (function() {}):                                           ║
║  ─────────────────────────────────                                           ║
║  - 'this' refers to the element that triggered the event                     ║
║  - 'this' is dynamically bound at runtime                                    ║
║  - Perfect when you need to access the clicked element                       ║
║                                                                              ║
║  Arrow Function (() => {}):                                                  ║
║  ─────────────────────────────                                               ║
║  - 'this' is inherited from the parent/enclosing scope (lexical binding)     ║
║  - In global scope, 'this' would be 'window' object (or undefined in strict) ║
║  - Arrow functions do NOT have their own 'this'                              ║
║                                                                              ║
║  EXAMPLE:                                                                    ║
║  ┌────────────────────────────────────────────────────────────────────────┐  ║
║  │ // Regular function - 'this' = button element                          │  ║
║  │ button.addEventListener("click", function() {                          │  ║
║  │     console.log(this); // <button>...</button> ✅                      │  ║
║  │ });                                                                    │  ║
║  │                                                                        │  ║
║  │ // Arrow function - 'this' = window/global object                      │  ║
║  │ button.addEventListener("click", () => {                               │  ║
║  │     console.log(this); // Window object ❌                             │  ║
║  │ });                                                                    │  ║
║  └────────────────────────────────────────────────────────────────────────┘  ║
║                                                                              ║
║  🎯 WHEN TO USE ARROW FUNCTIONS IN EVENT LISTENERS:                          ║
║  - When you don't need 'this' to refer to the element                        ║
║  - When using event.target instead (passed as parameter)                     ║
║  - Inside class methods where you want 'this' to refer to the class instance ║
║                                                                              ║
║  🎯 INTERVIEW TIP: Arrow functions are "lexically scoped" for 'this',        ║
║     meaning they inherit 'this' from where they were defined, not called.    ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/




// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 2: Traversing DOM & Adding CSS Classes
// ═══════════════════════════════════════════════════════════════════════════
/*
   🎯 DOM TRAVERSAL: Moving through parent-child-sibling relationships
   
   Common Traversal Properties:
   ┌─────────────────────────────────────────────────────────────────────────┐
   │ parentElement        → Get the parent element                          │
   │ children             → Get all child elements (HTMLCollection)         │
   │ firstElementChild    → Get first child element                         │
   │ lastElementChild     → Get last child element                          │
   │ nextElementSibling   → Get next sibling element                        │
   │ previousElementSibling → Get previous sibling element                  │
   └─────────────────────────────────────────────────────────────────────────┘
*/

// Get reference to the button for highlighting
let gettingCityNames = document.getElementById("highlightFirstCity")

// Add click event listener
let highlightOnClickButton = gettingCityNames.addEventListener("click", function(){
  
  // Step 1: Get the parent container (ul/ol) that holds all cities
  let grabCities = document.getElementById("citiesList")
  
  // Step 2: Get the FIRST child element (first <li> in the list)
  // firstElementChild skips text nodes and gets only element nodes
  let getFirstCity = grabCities.firstElementChild
  
  // Step 3: Add a CSS class to the first city for highlighting
  // classList.add() adds a class without removing existing classes
  // Other classList methods: remove(), toggle(), contains(), replace()
  let highlightByClasssName = getFirstCity.classList.add("highlight")
})

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║  ❓ ANSWER: How is DOM different from HTML?                                  ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  Think of it like this:                                                      ║
║  📄 HTML = The BLUEPRINT (static document you write)                         ║
║  🏗️  DOM = The BUILDING (live structure browser creates)                     ║
║                                                                              ║
║  DETAILED COMPARISON:                                                        ║
║  ┌────────────────────────┬────────────────────────────────────────────┐    ║
║  │ HTML                   │ DOM                                        │    ║
║  ├────────────────────────┼────────────────────────────────────────────┤    ║
║  │ Text-based markup      │ Object-based tree structure                │    ║
║  │ Stored in .html files  │ Lives in browser memory                    │    ║
║  │ Parsed once            │ Can be modified anytime                    │    ║
║  │ No methods/properties  │ Has methods (getElementById, etc.)         │    ║
║  │ No events              │ Can listen to user events                  │    ║
║  │ What you write         │ What browser interprets & renders          │    ║
║  └────────────────────────┴────────────────────────────────────────────┘    ║
║                                                                              ║
║  VISUAL REPRESENTATION:                                                      ║
║                                                                              ║
║  HTML Code:                    DOM Tree:                                     ║
║  ┌──────────────────┐         ┌──────────────────┐                          ║
║  │ <html>           │         │    document      │                          ║
║  │   <body>         │   →     │        │         │                          ║
║  │     <div>        │         │      html        │                          ║
║  │       <p>Hi</p>  │         │        │         │                          ║
║  │     </div>       │         │      body        │                          ║
║  │   </body>        │         │        │         │                          ║
║  │ </html>          │         │       div        │                          ║
║  └──────────────────┘         │        │         │                          ║
║                               │        p         │                          ║
║                               │        │         │                          ║
║                               │     "Hi"        │                          ║
║                               └──────────────────┘                          ║
║                                                                              ║
║  🎯 INTERVIEW TIP: Browser does 3 things with HTML:                          ║
║     1. Parse HTML → 2. Create DOM Tree → 3. Render on screen                 ║
║     JavaScript interacts with step 2 (the DOM), not the original HTML        ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/


// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 3: Changing Text Content of an Element
// ═══════════════════════════════════════════════════════════════════════════
/*
   🎯 textContent vs innerHTML vs innerText:
   ┌─────────────────────────────────────────────────────────────────────────┐
   │ textContent  → Gets/sets plain text (fastest, includes hidden text)    │
   │ innerText    → Gets/sets visible text (respects CSS display:none)      │
   │ innerHTML    → Gets/sets HTML markup (can inject HTML tags) ⚠️XSS risk │
   └─────────────────────────────────────────────────────────────────────────┘
*/

// Chained approach: Get element → attach event → define handler (all in one)
document.getElementById("changeOrder").addEventListener("click", function(){
  // Change the text content of the coffee type element
  document.getElementById("coffeeType").textContent = "Espresso"
})


// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 4: Creating and Appending New DOM Elements
// ═══════════════════════════════════════════════════════════════════════════
/*
   🎯 CREATING ELEMENTS: 3-Step Process
   
   Step 1: CREATE    → document.createElement("tagName")
   Step 2: CONFIGURE → Set properties (textContent, className, id, etc.)
   Step 3: APPEND    → parentElement.appendChild(newElement)
   
   Other append methods:
   ┌─────────────────────────────────────────────────────────────────────────┐
   │ appendChild(node)        → Adds node as last child                     │
   │ insertBefore(new, ref)   → Inserts new before reference node           │
   │ append(...nodes)         → Adds multiple nodes/strings at end          │
   │ prepend(...nodes)        → Adds multiple nodes/strings at beginning    │
   │ after(node)              → Inserts node after current element          │
   │ before(node)             → Inserts node before current element         │
   └─────────────────────────────────────────────────────────────────────────┘
*/

document.getElementById("addNewItem").addEventListener("click", function(){
  
  // Step 1: CREATE - Creates a new <li> element in memory (not yet in DOM)
  let addedItem = document.createElement("li")
  
  // Step 2: CONFIGURE - Set the text content of the new element
  addedItem.textContent = "eggs"
  
  // Step 3: APPEND - Add the new element as the last child of shoppingList
  document.getElementById("shoppingList").appendChild(addedItem)
})

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║  ❓ ANSWER: Why does chaining createElement with textContent cause error?    ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ❌ BROKEN CODE:                                                             ║
║  let addedItem = document.createElement("li").textContent = "eggs"           ║
║  document.getElementById("shoppingList").appendChild(addedItem)              ║
║                                                                              ║
║  ERROR: "parameter 1 is not of type 'Node'"                                  ║
║                                                                              ║
║  🔍 WHY THIS HAPPENS (Step by Step):                                         ║
║                                                                              ║
║  1. document.createElement("li")  → Returns: <li></li> (a Node object)       ║
║                                                                              ║
║  2. .textContent = "eggs"         → This is an ASSIGNMENT operation          ║
║     - It sets the textContent to "eggs"                                      ║
║     - But assignment (=) RETURNS the assigned VALUE, not the object!         ║
║     - Returns: "eggs" (a string, NOT the <li> element)                       ║
║                                                                              ║
║  3. let addedItem = "eggs"        → addedItem is now a STRING, not a Node    ║
║                                                                              ║
║  4. appendChild(addedItem)        → appendChild expects a Node object        ║
║     - But addedItem is "eggs" (a string)                                     ║
║     - Hence the error: "parameter 1 is not of type 'Node'"                   ║
║                                                                              ║
║  ✅ CORRECT APPROACH (Why it works):                                         ║
║  let addedItem = document.createElement("li")  // addedItem = <li></li>      ║
║  addedItem.textContent = "eggs"                // <li>eggs</li>              ║
║  appendChild(addedItem)                        // Works! addedItem is a Node ║
║                                                                              ║
║  🎯 KEY CONCEPT: In JavaScript, assignment (=) returns the assigned value,   ║
║     not the object being modified. This is a common gotcha!                  ║
║                                                                              ║
║  💡 ALTERNATIVE (if you want one-liner):                                     ║
║  let addedItem = Object.assign(document.createElement("li"),                 ║
║                                {textContent: "eggs"});                       ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/






// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 5: Removing Elements from DOM
// ═══════════════════════════════════════════════════════════════════════════
/*
   🎯 REMOVING ELEMENTS:
   ┌─────────────────────────────────────────────────────────────────────────┐
   │ element.remove()                 → Removes the element directly        │
   │ parent.removeChild(child)        → Removes child from parent           │
   │ element.replaceWith(newElement)  → Replaces element with another       │
   └─────────────────────────────────────────────────────────────────────────┘
*/

document.getElementById("removeLastTask").addEventListener("click", function(){
  
  // Step 1: Get the parent container (task list)
  let grabTaskList = document.getElementById("taskList")
  
  // Step 2: Get the LAST child element using lastElementChild
  // This property gets the last element node (ignores text/comment nodes)
  let getLastTask = grabTaskList.lastElementChild
  
  // Step 3: Remove the element from DOM
  // The remove() method is clean and modern (ES6+)
  // Alternative: grabTaskList.removeChild(getLastTask)
  getLastTask.remove()
})


// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 6: Double Click Event
// ═══════════════════════════════════════════════════════════════════════════

document.getElementById("clickMeButton").addEventListener("dblclick", function(){
  // dblclick event fires when user double-clicks (two rapid clicks)
  // alert() displays a popup dialog box with the message
  alert("chaicode")
})

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║  ❓ ANSWER: What's the difference between click and dblclick?                ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  CLICK vs DBLCLICK:                                                          ║
║  ┌────────────────────┬──────────────────────────────────────────────────┐  ║
║  │ Event              │ Description                                      │  ║
║  ├────────────────────┼──────────────────────────────────────────────────┤  ║
║  │ click              │ Single mouse click (press & release)             │  ║
║  │ dblclick           │ Two rapid clicks in quick succession             │  ║
║  └────────────────────┴──────────────────────────────────────────────────┘  ║
║                                                                              ║
║  ⚠️ IMPORTANT: When you double-click, BOTH events fire in this order:       ║
║     1. click (first click)                                                   ║
║     2. click (second click)                                                  ║
║     3. dblclick (after detecting it was a double-click)                      ║
║                                                                              ║
║  USE CASES:                                                                  ║
║  ┌────────────────────┬──────────────────────────────────────────────────┐  ║
║  │ click              │ dblclick                                         │  ║
║  ├────────────────────┼──────────────────────────────────────────────────┤  ║
║  │ Button actions     │ Open file/folder (like in file explorer)         │  ║
║  │ Navigation links   │ Select entire word in text editors               │  ║
║  │ Toggle switches    │ Edit mode in table cells                         │  ║
║  │ Form submissions   │ Zoom in on images/maps                           │  ║
║  │ Opening menus      │ Launch applications (desktop icons)              │  ║
║  └────────────────────┴──────────────────────────────────────────────────┘  ║
║                                                                              ║
║  OTHER MOUSE EVENTS:                                                         ║
║  ┌─────────────────────────────────────────────────────────────────────────┐ ║
║  │ mousedown   → When mouse button is pressed down                        │ ║
║  │ mouseup     → When mouse button is released                            │ ║
║  │ mousemove   → When mouse moves over element                            │ ║
║  │ mouseenter  → When mouse enters element (doesn't bubble)               │ ║
║  │ mouseleave  → When mouse leaves element (doesn't bubble)               │ ║
║  │ mouseover   → When mouse enters element (bubbles up)                   │ ║
║  │ mouseout    → When mouse leaves element (bubbles up)                   │ ║
║  │ contextmenu → When right-click (context menu)                          │ ║
║  └─────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  🎯 INTERVIEW TIP: Avoid using both click and dblclick on the same element  ║
║     because the click will always fire first, causing unexpected behavior.   ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/





// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 7: Event Delegation & Event Object
// ═══════════════════════════════════════════════════════════════════════════
/*
   🎯 EVENT DELEGATION: A powerful pattern for handling events efficiently
   
   Instead of attaching event listeners to EACH child element,
   we attach ONE listener to the parent and use event.target to identify
   which child was actually clicked.
   
   WHY USE EVENT DELEGATION?
   ┌─────────────────────────────────────────────────────────────────────────┐
   │ ✅ Memory efficient (one listener vs many)                              │
   │ ✅ Works with dynamically added elements                                │
   │ ✅ Less code to maintain                                                │
   │ ✅ Better performance for large lists                                   │
   └─────────────────────────────────────────────────────────────────────────┘
   
   🎯 EVENT OBJECT (event parameter):
   When an event occurs, the browser creates an Event object containing:
   ┌─────────────────────────────────────────────────────────────────────────┐
   │ event.target        → Element that triggered the event (clicked)       │
   │ event.currentTarget → Element the listener is attached to              │
   │ event.type          → Type of event ("click", "submit", etc.)          │
   │ event.preventDefault()  → Stops default browser behavior               │
   │ event.stopPropagation() → Stops event from bubbling up                 │
   └─────────────────────────────────────────────────────────────────────────┘
*/

// Attach event listener to the PARENT (ul#teaList), not individual <li> items
document.getElementById("teaList").addEventListener("click", function(event){
  
  // event object contains all information about the click event
  console.log(event);
  
  // Check if:
  // 1. event.target exists (safety check)
  // 2. The clicked element has class "teaItem"
  // matches() checks if element matches a CSS selector
  if(event.target && event.target.matches(".teaItem"))
    
    // toggle() adds class if absent, removes if present
    // Perfect for highlight on/off behavior
    event.target.classList.toggle("highlight")
})

/*
   🎯 EVENT BUBBLING & CAPTURING:
   
   Events travel through the DOM in phases:
   
   ┌─────────────────────────────────────────────────────────────────────────┐
   │  CAPTURING PHASE (1)    │  TARGET PHASE (2)   │  BUBBLING PHASE (3)    │
   │  ─────────────────────  │  ─────────────────  │  ────────────────────  │
   │  Event travels DOWN     │  Event at target    │  Event travels UP      │
   │  from window to target  │  element            │  from target to window │
   │                         │                     │                        │
   │  window                 │                     │  window                │
   │    ↓                    │                     │    ↑                   │
   │  document               │                     │  document              │
   │    ↓                    │                     │    ↑                   │
   │  <html>                 │                     │  <html>                │
   │    ↓                    │                     │    ↑                   │
   │  <body>                 │                     │  <body>                │
   │    ↓                    │                     │    ↑                   │
   │  <ul>                   │                     │  <ul>                  │
   │    ↓                    │                     │    ↑                   │
   │  <li> ←←←←←←←←←←←←←←←←←│←← CLICK HERE ───────│→→→→→→→→→→→→→→→→→→→    │
   └─────────────────────────────────────────────────────────────────────────┘
   
   By default, event listeners fire during BUBBLING phase.
   That's why clicking <li> also triggers the <ul>'s listener!
*/








// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 8: Form Handling & preventDefault()
// ═══════════════════════════════════════════════════════════════════════════
/*
   🎯 FORM SUBMISSION:
   - By default, submitting a form REFRESHES the page (sends data to server)
   - event.preventDefault() stops this default behavior
   - Allows us to handle form data with JavaScript (AJAX, validation, etc.)
   
   🎯 .value PROPERTY:
   - Used to get/set the current value of input fields
   - Works with: input, textarea, select elements
*/

document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    
    // CRUCIAL: Prevent the form from submitting and refreshing the page
    // Without this, the page would reload and you'd lose your JavaScript state
    event.preventDefault();
    
    // Get the VALUE of the input field (what user typed)
    // .value returns a string
    let feedback = document.getElementById("feedbackInput").value;
    console.log(feedback);
    
    // Display the feedback using template literal (backticks for string interpolation)
    // ${variable} syntax allows embedding variables inside strings
    document.getElementById(
      "feedbackDisplay"
    ).textContent = `Feedback is: ${feedback}`;
  });

/*
   🎯 COMMON FORM EVENTS:
   ┌─────────────────────────────────────────────────────────────────────────┐
   │ submit   → When form is submitted (button click or Enter key)          │
   │ reset    → When form is reset                                          │
   │ input    → When input value changes (fires immediately)                │
   │ change   → When input loses focus after value changed                  │
   │ focus    → When input gains focus                                      │
   │ blur     → When input loses focus                                      │
   └─────────────────────────────────────────────────────────────────────────┘
*/


// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 9: DOMContentLoaded Event
// ═══════════════════════════════════════════════════════════════════════════
/*
   🎯 DOMContentLoaded vs load:
   
   ┌─────────────────────────────────────────────────────────────────────────┐
   │ DOMContentLoaded │ Fires when HTML is parsed & DOM tree is built       │
   │                  │ Does NOT wait for images, stylesheets, etc.         │
   │                  │ ✅ Best for running JS that manipulates DOM         │
   ├──────────────────┼──────────────────────────────────────────────────────┤
   │ load             │ Fires when EVERYTHING is loaded (images, CSS, etc.) │
   │                  │ Takes longer to fire                                │
   │                  │ Use when you need image dimensions, etc.            │
   └─────────────────────────────────────────────────────────────────────────┘
   
   TIMELINE:
   HTML starts → HTML parsed → DOMContentLoaded → Images load → load event
*/

// This event listener is attached to the DOCUMENT, not an element
document.addEventListener("DOMContentLoaded", function () {
  // This code runs as soon as DOM is ready (HTML fully parsed)
  // Safe to access DOM elements here even if script is in <head>
  document.getElementById("domStatus").textContent = "DOM fully loaded";
});

/*
   🎯 WHY IS THIS IMPORTANT?
   
   If your <script> is in the <head> and runs before HTML is parsed:
   - document.getElementById("someId") → Returns null ❌
   - You can't access elements that don't exist yet!
   
   SOLUTIONS:
   1. Use DOMContentLoaded (shown above)
   2. Place <script> at end of <body> (elements already exist)
   3. Use "defer" attribute: <script defer src="script.js">
   4. Use "async" attribute: <script async src="script.js"> (for independent scripts)
   
   INTERVIEW TIP: "defer" waits for DOM, "async" downloads in parallel and 
   executes immediately when ready (may execute before DOM is complete)
*/


// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE 10: Toggle Classes
// ═══════════════════════════════════════════════════════════════════════════
/*
   🎯 classList METHODS:
   ┌─────────────────────────────────────────────────────────────────────────┐
   │ classList.add("class")      → Adds class (no effect if already exists) │
   │ classList.remove("class")   → Removes class (no error if doesn't exist)│
   │ classList.toggle("class")   → Adds if absent, removes if present       │
   │ classList.contains("class") → Returns true/false                       │
   │ classList.replace("a","b")  → Replaces class "a" with "b"              │
   └─────────────────────────────────────────────────────────────────────────┘
*/

document
  .getElementById("toggleHighlight")
  .addEventListener("click", function () {
    // Get reference to the element we want to toggle
    let descriptionText = document.getElementById("descriptionText");
    
    // Toggle the "highlight" class on/off
    // First click: adds "highlight" → Second click: removes "highlight"
    descriptionText.classList.toggle("highlight");
  });


/*
╔══════════════════════════════════════════════════════════════════════════════╗
║                        📚 QUICK REFERENCE CHEAT SHEET                        ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  SELECTING ELEMENTS:                                                         ║
║  ─────────────────────────────────────────────────────                       ║
║  document.getElementById("id")           // Returns one element              ║
║  document.querySelector("selector")      // Returns first match              ║
║  document.querySelectorAll("selector")   // Returns NodeList (all matches)   ║
║  document.getElementsByClassName("cls")  // Returns HTMLCollection           ║
║  document.getElementsByTagName("tag")    // Returns HTMLCollection           ║
║                                                                              ║
║  MODIFYING ELEMENTS:                                                         ║
║  ─────────────────────────────────────────────────────                       ║
║  element.textContent = "text"            // Set plain text                   ║
║  element.innerHTML = "<b>HTML</b>"       // Set HTML (⚠️ XSS risk)           ║
║  element.setAttribute("attr", "value")   // Set attribute                    ║
║  element.style.property = "value"        // Set inline style                 ║
║  element.classList.add/remove/toggle()   // Manage CSS classes               ║
║                                                                              ║
║  CREATING & REMOVING:                                                        ║
║  ─────────────────────────────────────────────────────                       ║
║  document.createElement("tag")           // Create new element               ║
║  parent.appendChild(child)               // Add child at end                 ║
║  parent.insertBefore(new, reference)     // Insert before reference          ║
║  element.remove()                        // Remove element                   ║
║  parent.removeChild(child)               // Remove child from parent         ║
║                                                                              ║
║  EVENT HANDLING:                                                             ║
║  ─────────────────────────────────────────────────────                       ║
║  element.addEventListener("event", fn)   // Add event listener               ║
║  element.removeEventListener("event",fn) // Remove event listener            ║
║  event.preventDefault()                  // Stop default behavior            ║
║  event.stopPropagation()                 // Stop bubbling                    ║
║  event.target                            // Element that triggered event     ║
║                                                                              ║
║  🎯 TOP INTERVIEW QUESTIONS ON DOM:                                          ║
║  ─────────────────────────────────────────────────────                       ║
║  1. What is DOM? How is it different from HTML?                              ║
║  2. Explain event bubbling and capturing                                     ║
║  3. What is event delegation? Why use it?                                    ║
║  4. Difference between getElementById and querySelector                      ║
║  5. What is the difference between textContent and innerHTML?                ║
║  6. Explain DOMContentLoaded vs window.load                                  ║
║  7. Why use addEventListener over onclick attribute?                         ║
║  8. What is event.preventDefault() used for?                                 ║
║  9. Difference between 'this' in regular vs arrow functions in events        ║
║  10. What are NodeList and HTMLCollection? How do they differ?               ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/
