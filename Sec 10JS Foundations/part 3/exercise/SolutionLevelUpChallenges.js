//challenge 1

const { forEach } = require("lodash")

 
let arr = ["green tea", "black tea", "chai", "oolong tea"]
let selectedTeas = []
for(let i = 0; i<= arr.length; i++){
    if(arr[i]!= "chai"){
        selectedTeas[i] = arr[i]
        continue
    }
    else if (arr[i]== "chai"){
        break
    }
    
}
console.log(selectedTeas)




//challenge 2

let cities = ["London", "New York", "Paris", "Berlin"]
let visitedCities = []
for(let i = 0; i< cities.length; i++){
    if(cities[i] === "Paris"){
        continue
    }
    else{
        visitedCities.push(cities[i])

    }
}
console.log(visitedCities);






//challenges 3

let numbers = [1, 2, 3, 4, 5]
let smallNumbers = []

for (const element of numbers) {
    if (element === 4){
        break
    }
    smallNumbers.push(element)
}
console.log(smallNumbers)





//challenge 4

let againTea = ["chai", "green tea", "herbal tea", "black tea"]
let preferredTeas = []

for (const element of againTea) {
    if (element === "herbal tea")
        continue
    preferredTeas.push(element)
}
console.log(preferredTeas);





//challenge 5

   let citiesPopulation = {
    "London": 8900000,
    "New York": 8400000,
    "Paris": 2200000,
    "Berlin": 3500000
   }
   let cityPopulationSpread = {...citiesPopulation}
   let newCitiesPopulation = {};

   for (const key in cityPopulationSpread) {
    //  console.log(citiesPopulation[key])

     
     if (key==="Berlin"){
         break
        }
        else{
         //now for printing object we are making key value pair
         newCitiesPopulation[key] = cityPopulationSpread[key]
         console.log(newCitiesPopulation[key])
     }
   }
console.log(newCitiesPopulation)


//challenge 6

let worldCities = {
    "Sydney": 5000000,
    "Tokyo": 9000000,
    "Berlin": 3500000,
    "Paris": 2200000
};

let largeCities = {}

for (const key in worldCities) {
    if(worldCities[key]< 3000000)
        continue
    
    else{
        largeCities[key] = worldCities[key]
    }
    
}
console.log (largeCities)


//challenge 7

let teaPaglu = ["earl grey", "green tea", "chai", "oolong tea"]
let availableTeas = []
let foundChai = false  // Flag to track if we hit "chai"

teaPaglu.forEach(element => {
    if (foundChai) return;  // Skip all elements after "chai"
    
    if (element === "chai") {
        foundChai = true;   // Set flag, don't add "chai"
        return;
    }
    availableTeas.push(element)
});
console.log(availableTeas)  // Output: [ 'earl grey', 'green tea' ]



//challenge 8

let bigCity = ["Berlin", "Tokyo", "Sydney", "Paris"]
let traveledCities = []

bigCity.forEach(element => {
    if(element === "Sydney") 
        return

    traveledCities.push(element)
});
console.log(traveledCities);




//challenge 9

let aray = [2, 5, 7, 9]
let doubledNumbers = []
for(let i = 0; i< aray.length; i++){
    if(aray[i] == 7)
        continue
    else {
        doubledNumbers.push(aray[i]*2)

    }
}
console.log(doubledNumbers)


//challenge 10

let tea = ["chai", "green tea", "black tea", "jasmine tea", "herbal tea"]
let shortTeas = []

for (const element of tea) {
    if(element.length > 10){
        break
    }
    shortTeas.push(element)
}
console.log(shortTeas)