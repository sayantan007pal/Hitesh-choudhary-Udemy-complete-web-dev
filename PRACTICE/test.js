

function arrayStats(arr){
    let sum = arr.reduce((num, i)=> num +i)
    let avg = sum/arr.length
    let val = []
     val = arr.sort((a,b)=> a-b)
     let max = val[arr.length-1]
     let min = val[0]
    return {min , max , sum , avg}
}

const value = arrayStats([1,4,5,3,6])
console.log(`${value.min} ${value.max} ${value.sum} ${value.avg}`)