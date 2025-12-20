//PROTOTYPE
// ═══════════════════════════════════════════════════════════════════════════════
// PROTOTYPES & Prototypal Inheritance in JavaScript
// ═══════════════════════════════════════════════════════════════════════════════
// 
// Every JavaScript object has an internal link to another object called its PROTOTYPE.
// When you access a property, JS first looks on the object itself, then climbs
// the prototype chain until it finds it (or reaches null).
//
// Key Methods & Properties:
// 1. __proto__ → Direct reference to an object's prototype (legacy, but works)
//    Example: let child = { __proto__: parent }
//
// 2. Object.setPrototypeOf(obj, proto) → Modern way to SET an object's prototype
//    Example: Object.setPrototypeOf(tesla, genericCar)
//
// 3. Object.getPrototypeOf(obj) → Modern way to GET an object's prototype
//    Example: Object.getPrototypeOf(tesla) → returns genericCar
//
// 4. Object.create(proto) → Creates a NEW object with specified prototype
//    Example: const child = Object.create(parent)
//
// How it works:
// ┌───────────┐    ┌───────────┐    ┌────────┐
// │  lenovo   │ →  │ computer  │ →  │ Object │ → null
// │  screen   │    │   cpu     │    │  ...   │
// └───────────┘    └───────────┘    └────────┘
// 
// lenovo.cpu works! JS finds it in computer via the prototype chain.
// ═══════════════════════════════════════════════════════════════════════════════
let computer = { cpu: 12 };
let lenovo = {
  screen: "HD",
  __proto__: computer,
};
let tomHardware = {};

// console.log(`lenovo `, lenovo.__proto__);

let genericCar = { tyres: 4 };

let tesla = {
  driver: "AI",
};

Object.setPrototypeOf(tesla, genericCar);

console.log(`tesla `, Object.getPrototypeOf(tesla));
