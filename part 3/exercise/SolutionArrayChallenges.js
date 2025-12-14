//challenge 1

const teaFlavours = ["green Tea", "Black Tea", "OOlong tea"];
const firstTea = teaFlavours[0];
console.log(firstTea)

//challenge 2

const cities = ["London", "Tokyo", "Paris", "New York"]
const favouriteCity = cities[2]
console.log(favouriteCity)

//challenges 3

const teaTypes = ["herbalTea", "whiteTea", "masalaChai"]
teaTypes[1] = "jasmineTea";
console.log(teaTypes)

//challenge 4

const citiesVisited = ["Mumbai", "Sydney"]
citiesVisited.unshift("Delhi")
console.log(citiesVisited)
citiesVisited.push("Berlin") 
console.log(citiesVisited)

//challenge 5

const teaOrders =["tea", "IceTea", "matcha", "earlGrey"]
const lastOrder = teaOrders.pop();
console.log(lastOrder)

//challenge 6 // (softcopy means if we change the value of the array then the value of the copy array will also change)

const popularTeas = ["greenTea", "oolongTea", "chai"]
const softCopyTeas = popularTeas  // so here we are creating soft copy of the array by using assignment operator
popularTeas.pop()
console.log(softCopyTeas)
console.log(popularTeas)

//challenge 7 (hardcopy or SHALLOWCOPY means if we change the value of the array then the value of the copy array will not change)



const topCities = ["Berlin", "Singapore", "New York"]
// const hardCopyCities1 = [...topCities] // so here we are creating hard copy of the array by using spread operator
const hardCopyCities = topCities.slice()  // so here we are creating hard copy of the array by using slice method
topCities.pop()
console.log(hardCopyCities);
console.log(topCities);


//challenge 8 
const europeanCities = ["Paris", "Rome"]
const asianCities = ["Tokyo", "Bangkok"]
// const worldCities1 = [...europeanCities, ...asianCities];
const worldCities = europeanCities.concat(asianCities);
console.log(worldCities)
// console.log(worldCities1)


//challenge 9

const teaMenu = ["Masala chai", "oolong tea", "green tea", "earl grey"]
const menuLength = teaMenu.length;
console.log(menuLength)

//challengen 10

const cityBucketList = ["Kyoto", "London", "Cape Town", "Vancouver"]
// const isLondonInList = new Boolean(cityBucketList.includes("London"))
const isLondonInList = cityBucketList.includes("London")
// console.log(isLondonInList.valueOf())
console.log(isLondonInList);
