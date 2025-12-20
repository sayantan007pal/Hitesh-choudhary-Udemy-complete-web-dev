// ═══════════════════════════════════════════════════════════════════════════════
// CONSTRUCTOR FUNCTIONS in JavaScript
// ═══════════════════════════════════════════════════════════════════════════════
// 
// Constructor functions are BLUEPRINTS for creating multiple similar objects.
// They are regular functions invoked with the "new" keyword.
//
// Key Concepts:
// 1. NAMING CONVENTION → Constructor names start with Capital letter
//    Example: function Car(brand) { ... }
//
// 2. "new" KEYWORD → When used, it:
//    a) Creates a new empty object {}
//    b) Sets "this" to point to the new object
//    c) Executes the constructor code (adds properties to "this")
//    d) Returns the new object automatically
//
// 3. "this" KEYWORD → Refers to the newly created object instance
//    Example: this.brand = brand; // adds property to the new object
//
// 4. PROTOTYPE METHODS → Add shared methods to Constructor.prototype
//    This saves memory - all instances share the same function!
//    Example: Car.prototype.start = function() { ... }
//
// 5. "new.target" → Safety check to ensure function is called with "new"
//    Returns undefined if called without "new"
//    Example: if (!new.target) throw new Error("Use new keyword!")
//
// Without "new": this → global object (window/undefined in strict mode)
// With "new":    this → the newly created instance
// ═══════════════════════════════════════════════════════════════════════════════
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