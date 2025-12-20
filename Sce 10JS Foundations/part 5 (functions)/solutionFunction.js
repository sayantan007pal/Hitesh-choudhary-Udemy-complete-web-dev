//challenge 1

const makeTea = (typeOfTea)=> {
    return (`Making ${typeOfTea}`)

}
console.log(makeTea("Green Tea"))


//challenge 2

const orderTea = (teaType) => {
    const confirmOrder = ()=>{
        return `Order confirmed for ${teaType}`
    }

    return confirmOrder
}

console.log("Chai")


//challenge 3

const calculateTotal = (price,quantity)=>{
    let totalCost = price * quantity
    return totalCost
}
console.log(calculateTotal(2,2))


//challenge 4

const processTeaOrder =(teaFunction) => {
    return teaFunction('oolong Tea')

}
const makeTeas =(tea) => {
    return `makeTea: ${tea}`

}
let order = processTeaOrder(makeTeas)
console.log(order)

//challenge 5 

const teaMaker = (teaName)=> {
    return `Making:: ${teaName}`
}

const createTeaMaker = (teaType) => {
 return teaType("Green tea")

}
let user2 = createTeaMaker(teaMaker)
console.log(user2);
