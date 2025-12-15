//challenge 1
 
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
