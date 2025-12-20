//here we are creating constructor function which is used to create objects. i.e it is a blueprint for creating objects
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