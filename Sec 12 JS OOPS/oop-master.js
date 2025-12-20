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

