// The "I am hungry" function
function sayHungry() {
    return (`${this.name} is hungry`);
}

const Sarah = {
    name: "Sarah",
    speak:sayHungry
}
console.log(Sarah.speak()) ;

// john.speak();  // "John is hungry"  - John is speaking
// sarah.speak(); // "Sarah is hungry" - Sarah is speaking