const  filterByCondition=(arr, cond)=> {
    return arr.filter(cond)

}

const cond=(a)=>{
    return a.length>3
}
console.log(filterByCondition(["sayantan","pal"],cond))