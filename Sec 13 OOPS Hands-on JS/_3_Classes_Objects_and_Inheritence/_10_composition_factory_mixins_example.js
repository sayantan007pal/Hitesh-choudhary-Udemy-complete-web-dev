/**
 * Composition, Factory Pattern & Mixins
 * ======================================
 * 
 * This challenge tests your understanding of composition over inheritance,
 * factory patterns, mixins, and advanced object creation patterns in JavaScript.
 * 
 * 🎯 INTERVIEW IMPORTANCE: VERY HIGH
 * "Favor composition over inheritance" is a key design principle!
 */


// =============================================================================
// Task 1: Composition Over Inheritance
// =============================================================================
/**
 * Problem with inheritance: A robot dog can walk but shouldn't swim.
 * A fish can swim but shouldn't walk. But what about a duck that walks AND swims?
 * 
 * Solution: Compose behaviors instead of inheriting them!
 * 
 * Create behavior factories (functions that return objects with methods):
 * 
 * 1. walker(state) - returns { walk: () => "[name] walks" }
 * 2. swimmer(state) - returns { swim: () => "[name] swims" }
 * 3. flyer(state) - returns { fly: () => "[name] flies" }
 * 4. speaker(state, sound) - returns { speak: () => "[name] says [sound]" }
 * 
 * Create creature factory functions using Object.assign and spread:
 * 
 * 1. createDog(name): walks + speaks ("Woof")
 * 2. createFish(name): swims only
 * 3. createDuck(name): walks + swims + flies + speaks ("Quack")
 * 4. createRobot(name): walks only (no speaking!)
 * 5. createSuperhero(name): walks + swims + flies + speaks ("I'll save you!")
 * 
 * Each creature should have:
 * - name property
 * - getInfo(): returns "[name] can: [abilities]"
 * 
 * Expected Usage:
 *   const dog = createDog("Rex");
 *   dog.walk();   // "Rex walks"
 *   dog.speak();  // "Rex says Woof"
 *   dog.swim;     // undefined (dog can't swim)
 *   
 *   const duck = createDuck("Donald");
 *   duck.walk();  // "Donald walks"
 *   duck.swim();  // "Donald swims"
 *   duck.fly();   // "Donald flies"
 *   duck.speak(); // "Donald says Quack"
 */

// ==================== YOUR CODE HERE ====================

// Behavior factories
function walker(state) {
    // TODO: Return object with walk method
}

function swimmer(state) {
    // TODO: Return object with swim method
}

function flyer(state) {
    // TODO: Return object with fly method
}

function speaker(state, sound) {
    // TODO: Return object with speak method
}

// Creature factories using composition
function createDog(name) {
    // TODO: Compose walker + speaker("Woof")
}

function createFish(name) {
    // TODO: Compose swimmer only
}

function createDuck(name) {
    // TODO: Compose walker + swimmer + flyer + speaker("Quack")
}

function createRobot(name) {
    // TODO: Compose walker only
}

function createSuperhero(name) {
    // TODO: Compose walker + swimmer + flyer + speaker("I'll save you!")
}

// ========================================================


// =============================================================================
// Task 2: Factory Pattern with Validation
// =============================================================================
/**
 * Create a UserFactory that creates different types of users:
 * 
 * User types:
 * 1. Guest: { type: "guest", name, sessionId, permissions: ["read"] }
 * 2. Member: { type: "member", name, email, permissions: ["read", "write"] }
 * 3. Admin: { type: "admin", name, email, permissions: ["read", "write", "delete", "manage"] }
 * 4. SuperAdmin: { type: "superadmin", name, email, permissions: ["*"] } (all permissions)
 * 
 * Factory: UserFactory
 * 
 * Static Methods:
 * - createGuest(name): creates guest with auto-generated sessionId
 * - createMember(name, email): validates email, creates member
 * - createAdmin(name, email): validates email, creates admin
 * - createSuperAdmin(name, email): validates email, creates superadmin
 * - fromObject(obj): creates appropriate user from { type, name, email? }
 * 
 * All users should have methods:
 * - hasPermission(permission): returns true if user has it (or has "*")
 * - getInfo(): returns "Type: [type], Name: [name], Permissions: [...]"
 * 
 * Validation:
 * - Name must be non-empty
 * - Email must contain @ and .
 * - Throw descriptive errors for invalid input
 * 
 * Expected Usage:
 *   const guest = UserFactory.createGuest("Visitor");
 *   guest.hasPermission("read");    // true
 *   guest.hasPermission("write");   // false
 *   
 *   const admin = UserFactory.createAdmin("Alice", "alice@example.com");
 *   admin.hasPermission("delete");  // true
 *   
 *   const superadmin = UserFactory.createSuperAdmin("Bob", "bob@example.com");
 *   superadmin.hasPermission("anything");  // true (has "*")
 */

// ==================== YOUR CODE HERE ====================

class UserFactory {
    // TODO: Static factory methods
    
    static createGuest(name) {
        // TODO: Create guest user
    }
    
    static createMember(name, email) {
        // TODO: Create member user
    }
    
    static createAdmin(name, email) {
        // TODO: Create admin user
    }
    
    static createSuperAdmin(name, email) {
        // TODO: Create superadmin user
    }
    
    static fromObject(obj) {
        // TODO: Create user from { type, name, email? }
    }
    
    // TODO: Private validation methods
}

// ========================================================


// =============================================================================
// Task 3: Mixin Pattern
// =============================================================================
/**
 * Mixins allow adding functionality to classes without inheritance.
 * 
 * Create these mixins (functions that take a class and return extended class):
 * 
 * 1. Timestamped(BaseClass):
 *    - Adds createdAt property (set in constructor)
 *    - Adds updatedAt property (updated on any setter call)
 *    - Adds getTimestamps() method
 * 
 * 2. Serializable(BaseClass):
 *    - Adds toJSON() method returning object representation
 *    - Adds static fromJSON(json) method
 * 
 * 3. Validatable(BaseClass):
 *    - Adds validate() method that checks all #validators
 *    - Adds addValidator(field, fn) method
 *    - validate() throws if any validator fails
 * 
 * 4. Observable(BaseClass):
 *    - Adds on(event, handler) method
 *    - Adds off(event, handler) method
 *    - Adds emit(event, data) method
 * 
 * Create a base class `Model`:
 * - Constructor takes (data) object
 * - Has get/set for each key in data
 * 
 * Apply mixins to create `EnhancedModel`:
 *   const EnhancedModel = Observable(Serializable(Timestamped(Model)));
 * 
 * Expected Usage:
 *   const model = new EnhancedModel({ name: "Test", value: 42 });
 *   model.name;                  // "Test"
 *   model.name = "Updated";      // Updates name AND updatedAt
 *   model.getTimestamps();       // { createdAt: ..., updatedAt: ... }
 *   model.toJSON();              // { name: "Updated", value: 42, ... }
 *   model.on("change", handler);
 *   model.emit("change", { field: "name" });
 */

// ==================== YOUR CODE HERE ====================

// Mixin: Timestamped
function Timestamped(BaseClass) {
    // TODO: Return class that extends BaseClass with timestamps
    return class extends BaseClass {
        // TODO: createdAt, updatedAt, getTimestamps()
    };
}

// Mixin: Serializable
function Serializable(BaseClass) {
    // TODO: Return class with toJSON and fromJSON
    return class extends BaseClass {
        // TODO: toJSON(), static fromJSON(json)
    };
}

// Mixin: Validatable
function Validatable(BaseClass) {
    // TODO: Return class with validation
    return class extends BaseClass {
        // TODO: validate(), addValidator(field, fn)
    };
}

// Mixin: Observable
function Observable(BaseClass) {
    // TODO: Return class with event handling
    return class extends BaseClass {
        // TODO: on(event, handler), off(event, handler), emit(event, data)
    };
}

// Base Model class
class Model {
    // TODO: Constructor takes data object
    // TODO: Dynamic getters/setters for each property
}

// Apply mixins
// const EnhancedModel = Observable(Serializable(Timestamped(Model)));
// TODO: Uncomment after implementing mixins

// ========================================================


// =============================================================================
// Task 4: Abstract Factory Pattern
// =============================================================================
/**
 * Create an Abstract Factory for creating UI component families:
 * 
 * Abstract Products (interfaces):
 * - Button: { render(), onClick(handler) }
 * - Input: { render(), getValue(), setValue(v) }
 * - Modal: { render(), open(), close() }
 * 
 * Concrete Factories:
 * 
 * 1. BootstrapFactory:
 *    - createButton(text): returns BootstrapButton
 *    - createInput(placeholder): returns BootstrapInput
 *    - createModal(title): returns BootstrapModal
 *    All render methods return strings with "bootstrap-" prefix in class names
 * 
 * 2. MaterialFactory:
 *    - Same methods but returns Material components
 *    All render methods return strings with "mat-" prefix in class names
 * 
 * 3. TailwindFactory:
 *    - Same methods but returns Tailwind components
 *    All render methods return strings with "tw-" prefix in class names
 * 
 * Create UIBuilder class:
 *    - Constructor takes a factory
 *    - buildForm(config): uses factory to create components
 *    - config: { buttons: [...], inputs: [...], modal: {...} }
 *    - Returns { buttons: [...], inputs: [...], modal }
 * 
 * Expected Usage:
 *   const bootstrapFactory = new BootstrapFactory();
 *   const builder = new UIBuilder(bootstrapFactory);
 *   
 *   const btn = bootstrapFactory.createButton("Click Me");
 *   btn.render();  // '<button class="bootstrap-btn">Click Me</button>'
 *   
 *   const form = builder.buildForm({
 *       buttons: ["Submit", "Cancel"],
 *       inputs: ["Name", "Email"],
 *       modal: { title: "Confirm" }
 *   });
 *   // Returns organized components created by the factory
 */

// ==================== YOUR CODE HERE ====================

// Bootstrap Components
class BootstrapButton {
    // TODO: Implement with "bootstrap-" prefix
}

class BootstrapInput {
    // TODO: Implement
}

class BootstrapModal {
    // TODO: Implement
}

class BootstrapFactory {
    // TODO: createButton, createInput, createModal
}

// Material Components
class MaterialButton {
    // TODO: Implement with "mat-" prefix
}

class MaterialInput {
    // TODO: Implement
}

class MaterialModal {
    // TODO: Implement
}

class MaterialFactory {
    // TODO: createButton, createInput, createModal
}

// Tailwind Components
class TailwindButton {
    // TODO: Implement with "tw-" prefix
}

class TailwindInput {
    // TODO: Implement
}

class TailwindModal {
    // TODO: Implement
}

class TailwindFactory {
    // TODO: createButton, createInput, createModal
}

// UIBuilder
class UIBuilder {
    // TODO: Takes factory in constructor
    // TODO: buildForm(config) method
}

// ========================================================


// =============================================================================
// Export for testing
// =============================================================================
module.exports = {
    // Task 1: Composition
    walker,
    swimmer,
    flyer,
    speaker,
    createDog,
    createFish,
    createDuck,
    createRobot,
    createSuperhero,
    // Task 2: Factory
    UserFactory,
    // Task 3: Mixins
    Timestamped,
    Serializable,
    Validatable,
    Observable,
    Model,
    // EnhancedModel,  // Uncomment after implementing
    // Task 4: Abstract Factory
    BootstrapButton,
    BootstrapInput,
    BootstrapModal,
    BootstrapFactory,
    MaterialButton,
    MaterialInput,
    MaterialModal,
    MaterialFactory,
    TailwindButton,
    TailwindInput,
    TailwindModal,
    TailwindFactory,
    UIBuilder
};


// =============================================================================
// 📚 LEARNING NOTES
// =============================================================================
/**
 * COMPOSITION VS INHERITANCE:
 * ==========================
 * 
 * Inheritance: "IS-A" relationship
 *   class Dog extends Animal {}
 *   // Dog IS-A Animal
 *   // Problem: Tight coupling, inflexible hierarchy
 * 
 * Composition: "HAS-A" relationship
 *   const dog = { 
 *       ...walker(state),
 *       ...barker(state)
 *   };
 *   // Dog HAS walking ability and barking ability
 *   // Benefit: Flexible, mix-and-match behaviors
 * 
 * 
 * WHEN TO USE EACH:
 * ================
 * 
 * Use INHERITANCE when:
 * - True "is-a" relationship (Square is-a Rectangle)
 * - Need to reuse implementation from parent
 * - Hierarchy is stable and unlikely to change
 * 
 * Use COMPOSITION when:
 * - "Has-a" or "can-do" relationship
 * - Need to combine multiple behaviors
 * - Want flexibility to change at runtime
 * 
 * 
 * FACTORY PATTERN:
 * ===============
 * 
 * // Simple Factory
 * function createUser(type) {
 *     if (type === 'admin') return new Admin();
 *     if (type === 'member') return new Member();
 *     return new Guest();
 * }
 * 
 * // Factory Method
 * class UserFactory {
 *     static createUser(type) { ... }
 * }
 * 
 * // Abstract Factory
 * class UIFactory {
 *     createButton() { throw new Error('Abstract'); }
 *     createInput() { throw new Error('Abstract'); }
 * }
 * 
 * 
 * MIXIN PATTERN:
 * =============
 * 
 * // Mixin as function
 * const Loggable = (Base) => class extends Base {
 *     log(msg) { console.log(msg); }
 * };
 * 
 * const Serializable = (Base) => class extends Base {
 *     toJSON() { return JSON.stringify(this); }
 * };
 * 
 * // Apply mixins
 * class Model {}
 * const EnhancedModel = Loggable(Serializable(Model));
 * 
 * // Alternative: Object.assign for objects
 * const loggableMixin = {
 *     log(msg) { console.log(msg); }
 * };
 * Object.assign(MyClass.prototype, loggableMixin);
 * 
 * 
 * COMPOSITION EXAMPLE:
 * ===================
 * 
 * const canEat = (state) => ({
 *     eat: () => `${state.name} is eating`
 * });
 * 
 * const canSleep = (state) => ({
 *     sleep: () => `${state.name} is sleeping`
 * });
 * 
 * const createPerson = (name) => {
 *     const state = { name };
 *     return Object.assign(
 *         { name },
 *         canEat(state),
 *         canSleep(state)
 *     );
 * };
 * 
 * 
 * INTERVIEW TIP:
 * =============
 * "I prefer composition over inheritance because it provides greater flexibility.
 *  Instead of building rigid class hierarchies, I compose objects from smaller,
 *  reusable behaviors. This follows the 'favor composition' principle from the
 *  Gang of Four. JavaScript's object spread and Object.assign make this pattern
 *  very natural. For cross-cutting concerns like logging or serialization,
 *  I use mixins which add functionality without deep inheritance chains."
 */
