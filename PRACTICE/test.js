function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log('Returning cached result for:', args);
      return cache[key];
    }
    
    console.log('Computing result for:', args);
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// Example usage:
const slowAdd = (a, b) => {
  // Simulate expensive computation
  for (let i = 0; i < 1000000; i++) {}
  return a + b;
};

const memoizedAdd = memoize(slowAdd);

console.log(memoizedAdd(5, 3)); // Computing result for: [5, 3] → 8
console.log(memoizedAdd(5, 3)); // Returning cached result for: [5, 3] → 8
console.log(memoizedAdd(2, 4)); // Computing result for: [2, 4] → 6

// Works great with recursive functions like fibonacci
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Fast due to memoization