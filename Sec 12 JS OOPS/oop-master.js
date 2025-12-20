let car = {
    brand: "Tyota",
    model : "Fortuner",
    modelDate : "2024",
    start : function(){
        return `${this.brand} hit road first in ${this.modelDate}`
    }

}
console.log(car.start())



//PROTOTYPAL CHAINING


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



//INHERITENCE


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