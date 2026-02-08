// Custom Array Methods Implementation

// 1. Custom Map - applies a function to each element and returns a new array
function customMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

// 2. Custom Filter - filters elements based on a condition and returns a new array
function customFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

// 3. Custom Reduce - reduces array to a single value
function customReduce(array, callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;
  
  // If no initial value provided, use first element as accumulator
  if (accumulator === undefined) {
    if (array.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = array[0];
    startIndex = 1;
  }
  
  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  
  return accumulator;
}

// Testing the custom implementations

console.log('=== Testing Custom Map ===');
const numbers = [1, 2, 3, 4, 5];
const doubled = customMap(numbers, (num) => num * 2);
console.log('Original:', numbers);
console.log('Doubled:', doubled); // [2, 4, 6, 8, 10]

console.log('\n=== Testing Custom Filter ===');
const evenNumbers = customFilter(numbers, (num) => num % 2 === 0);
console.log('Original:', numbers);
console.log('Even numbers:', evenNumbers); // [2, 4]

console.log('\n=== Testing Custom Reduce ===');
const sum = customReduce(numbers, (acc, num) => acc + num, 0);
console.log('Original:', numbers);
console.log('Sum:', sum); // 15

const product = customReduce(numbers, (acc, num) => acc * num, 1);
console.log('Product:', product); // 120

// Advanced example: Reduce without initial value
const maxNumber = customReduce(numbers, (max, num) => num > max ? num : max);
console.log('Max number:', maxNumber); // 5