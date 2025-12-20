let car = {
    brand: "Tyota",
    model : "Fortuner",
    modelDate : "2024",
    start : function(){
        return `${this.brand} hit road first in ${this.modelDate}`
    }

}
console.log(car.start())



// ═══════════════════════════════════════════════════════════════════════════════
// PROTOTYPAL CHAINING in JavaScript
// ═══════════════════════════════════════════════════════════════════════════════
// 
// Prototypal Inheritance allows objects to inherit properties and methods from other objects.
// This is a fundamental concept in JavaScript's object model.
//
// Key Concepts:
// 1. PROTOTYPE CHAIN → JS looks up the chain: Child → Parent → Object
//    If a property/method isn't found in child, it searches up the chain
//
// 2. __proto__ → Internal property pointing to parent object
//    Example: obj.__proto__ = parentObj
//
// 3. Object.create() → Creates an object with a specified prototype
//    Example: const childObj = Object.create(parentObj)
//
// 4. Constructor functions → Can be used to create objects with shared prototypes
//    Example: function Person(name) { this.name = name }
//
// 5. Instanceof operator → Checks if an object is an instance of a class
//    Example: obj instanceof ParentClass
//
// 6. Object.getPrototypeOf() → Retrieves the object's prototype
//    Example: const proto = Object.getPrototypeOf(obj)
//
// 7. Object.setPrototypeOf() → Sets the object's prototype
//    Example: Object.setPrototypeOf(obj, proto)
//
// This forms the foundation for object-oriented programming in JavaScript.
// ═══════════════════════════════════════════════════════════════════════════════


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



// ═══════════════════════════════════════════════════════════════════════════════
// INHERITANCE in JavaScript
// ═══════════════════════════════════════════════════════════════════════════════
// 
// Inheritance allows a CHILD class to acquire properties and methods from a PARENT class.
// This promotes code reusability and establishes an "is-a" relationship.
//
// Key Concepts:
// 1. EXTENDS keyword → Creates a child class that inherits from parent
//    Example: class Car extends Vehicle { ... }
//
// 2. SUPER keyword → Calls the parent class constructor & methods
//    - super(args) → Must be called FIRST in child constructor
//    - super.methodName() → Calls parent's method from child
//
// 3. METHOD OVERRIDING → Child can redefine parent's methods
//    The child's version will be used when called on child instances
//
// 4. PROTOTYPE CHAIN → JS looks up the chain: Child → Parent → Object
//    If a property/method isn't found in child, it searches up the chain
//
// 5. Child classes CAN add their own properties and methods beyond
//    what they inherit from the parent
// ═══════════════════════════════════════════════════════════════════════════════


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



// ═══════════════════════════════════════════════════════════════════════════════
// ENCAPSULATION using Private Fields (#)
// ═══════════════════════════════════════════════════════════════════════════════
// 
// The '#' prefix in JavaScript creates TRUE private class fields and methods.
// Unlike the old convention of using '_' (which was just a naming hint), 
// '#' provides actual privacy enforced by the JavaScript engine.
//
// Key Points:
// 1. DECLARE private fields with '#' prefix at the top of the class body
//    Example: #privateField = "secret";
//
// 2. CANNOT be accessed directly from outside the class
//    Example: obj.#privateField → SyntaxError!
//
// 3. Use GETTERS (get) and SETTERS (set) to expose controlled access
//    Example: get publicName() { return this.#privateField; }
//
// 4. Private fields are only accessible within the class where they are defined
//    (Not even subclasses can access them directly!)
//
// 5. CONSTRUCTOR can initialize private fields using this.#fieldName
//
// This ensures ENCAPSULATION by hiding internal implementation details while
// exposing only a clean, controlled public interface.
// ═══════════════════════════════════════════════════════════════════════════════

class myBank{
    #balance = 505;
    getBalance(){

        return this.#balance
    }
}
let account = new myBank()
// console.log(myBank.#balance) // SyntaxError: Private field '#balance' must be declared in an enclosing class

console.log(account.getBalance())



// ═══════════════════════════════════════════════════════════════════════════════
// ABSTRACTION in JavaScript
// ═══════════════════════════════════════════════════════════════════════════════
// 
// Abstraction means HIDING complex implementation details and showing only
// the essential features to the user. "Show WHAT it does, hide HOW it does it."
//
// Key Concepts:
// 1. HIDE COMPLEXITY → Internal workings are hidden from the outside world
//    Users don't need to know HOW something works, just how to USE it
//
// 2. EXPOSE SIMPLE INTERFACE → Provide public methods for interaction
//    Example: car.start() - user doesn't need to know ignition mechanics!
//
// 3. Implementation in JavaScript:
//    a) Use PRIVATE fields (#) to hide internal data/methods
//    b) Use PUBLIC methods to expose controlled functionality
//    c) Use CLOSURES to create private scope (pre-ES6 approach)
//
// 4. BENEFITS:
//    - Reduces code complexity for users of the class
//    - Allows internal changes without affecting external code
//    - Improves security by hiding sensitive logic
//    - Makes code more maintainable and modular
//
// Example Pattern:
// class Database {
//     #connection;           // Hidden: users don't manage connections
//     #executeQuery(sql) {}  // Hidden: complex query logic
//     getData(id) {}         // Exposed: simple, clean interface
// }
// ═══════════════════════════════════════════════════════════════════════════════

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



// ═══════════════════════════════════════════════════════════════════════════════
// STATIC METHODS in JavaScript
// ═══════════════════════════════════════════════════════════════════════════════
// 
// Static methods belong to the CLASS itself, NOT to instances of the class.
// They are called directly on the class: ClassName.methodName()
//
// Key Concepts:
// 1. STATIC keyword → Defines a method that belongs to the class, not instances
//    Example: static myMethod() { ... }
//
// 2. CANNOT use 'this' → Static methods don't have access to instance properties
//    because they're not called on an object instance
//
// 3. CALL ON CLASS → Use the class name to call static methods
//    Example: Math.random(), Array.isArray(), Object.keys()
//
// 4. COMMON USE CASES:
//    - Utility/helper functions that don't need instance data
//    - Factory methods that create instances (e.g., User.create())
//    - Caching or counting instances of a class
//    - Comparison functions between instances
//
// 5. CANNOT BE CALLED on instances → obj.staticMethod() will throw an error!
//    Only works as: ClassName.staticMethod()
//
// Example Pattern:

// ═══════════════════════════════════════════════════════════════════════════════


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



// ═══════════════════════════════════════════════════════════════════════════════
// GETTERS and SETTERS in JavaScript
// ═══════════════════════════════════════════════════════════════════════════════
// 
// Getters and Setters allow you to define methods that are accessed like properties.
// They provide controlled access to an object's internal data.
//
// Key Concepts:
// 1. GET keyword → Defines a method that returns a value when accessed like a property
//    Example: get fullName() { return this.firstName + ' ' + this.lastName; }
//    Usage: obj.fullName (NOT obj.fullName())
//
// 2. SET keyword → Defines a method that sets a value when assigned like a property
//    Example: set fullName(value) { this.firstName = value.split(' ')[0]; }
//    Usage: obj.fullName = "John Doe" (NOT obj.fullName("John Doe"))
//
// 3. WHY USE THEM:
//    - Validate data before setting (e.g., check if age is positive)
//    - Compute values on-the-fly (e.g., calculate fullName from first+last)
//    - Hide internal implementation while exposing a clean interface
//    - Add side effects (e.g., logging when a property changes)
//
// 4. COMMON PATTERN → Use with private fields (#) for true encapsulation
//    Example: #_age; set age(val) { if(val > 0) this.#_age = val; }
//
// 5. NAMING CONVENTION → Often use underscore prefix for backing field
//    Example: this._name for internal storage, get/set name() for access
//
// Example Pattern:

// ═══════════════════════════════════════════════════════════════════════════════

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
