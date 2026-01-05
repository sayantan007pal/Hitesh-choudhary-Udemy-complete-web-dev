/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║              INHERITANCE IN JAVASCRIPT - CHALLENGE #6                        ║
 * ║                    🧬 Employee Hierarchy System 🧬                            ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT REVIEW:
 * ━━━━━━━━━━━━━━━━━━━
 * Inheritance allows a CHILD class to get all properties and methods from a 
 * PARENT class. It creates an 'is-a' relationship (an Employee IS-A Person).
 * 
 * Key Keywords:
 *   - extends → "I want to inherit from this parent"
 *   - super() → "Call the parent's constructor first"
 *   - super.methodName() → "Call the parent's version of this method"
 * 
 * 
 * 🎯 YOUR CHALLENGE:
 * ━━━━━━━━━━━━━━━━━━━
 * Create an employee hierarchy system:
 * 
 * 1. Person (Base Class)
 *    - constructor(name, age)
 *    - introduce() → returns "Hi, I'm {name} and I'm {age} years old"
 *    - haveBirthday() → increments age, returns new age
 *    - getName() / getAge()
 * 
 * 2. Employee extends Person
 *    - constructor(name, age, employeeId, department)
 *    - work() → returns "{name} is working in {department}"
 *    - introduce() → OVERRIDE: adds "I work in {department}"
 *    - getEmployeeId() / getDepartment()
 * 
 * 3. Manager extends Employee
 *    - constructor(name, age, employeeId, department, teamSize)
 *    - #teamMembers (private array)
 *    - addTeamMember(employee) → adds to team
 *    - removeTeamMember(employeeId) → removes from team
 *    - getTeamMembers() → returns copy of team array
 *    - work() → OVERRIDE: adds "and managing a team of {teamSize}"
 *    - conductMeeting() → returns "{name} is conducting a meeting with {teamSize} people"
 * 
 * 4. Developer extends Employee
 *    - constructor(name, age, employeeId, department, programmingLanguages)
 *    - programmingLanguages (array of strings)
 *    - code(language) → returns "{name} is coding in {language}" (throws if unknown language)
 *    - addLanguage(language) → adds to known languages
 *    - work() → OVERRIDE: adds "writing code"
 * 
 * 5. Intern extends Employee
 *    - constructor(name, age, employeeId, department, mentor, internshipDuration)
 *    - getMentor() / getInternshipDuration()
 *    - learn() → returns "{name} is learning from {mentor}"
 *    - work() → OVERRIDE: adds "as an intern"
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━━
 * - Always call super() first in constructor
 * - Use super.methodName() to call parent's version
 * - Remember: child methods can add to parent's behavior
 */


// =============================================================================
// YOUR IMPLEMENTATION HERE
// =============================================================================

class Person {
    #name;
    #age;

    constructor(name, age) {
        // ==================== YOUR CODE HERE ====================
        this.#name = name;
        this.#age = age;
        // ========================================================
    }

    getName() {
        return this.#name;
    }

    getAge() {
        return this.#age;
    }

    introduce() {
        // ==================== YOUR CODE HERE ====================
        return `Hi, I'm ${this.#name} and I'm ${this.#age} years old`;
        // ========================================================
    }

    haveBirthday() {
        // ==================== YOUR CODE HERE ====================
        this.#age++;
        return this.#age;
        // ========================================================
    }
}


class Employee extends Person {
    #employeeId;
    #department;

    constructor(name, age, employeeId, department) {
        // ==================== YOUR CODE HERE ====================
        super(name, age);
        this.#employeeId = employeeId;
        this.#department = department;
        // ========================================================
    }

    getEmployeeId() {
        return this.#employeeId;
    }

    getDepartment() {
        return this.#department;
    }

    work() {
        // ==================== YOUR CODE HERE ====================
        return `${this.getName()} is working in ${this.#department}`;
        // ========================================================
    }

    introduce() {
        // ==================== YOUR CODE HERE ====================
        // Override: extends parent's introduction
        return `${super.introduce()}. I work in ${this.#department}`;
        // ========================================================
    }
}


class Manager extends Employee {
    #teamMembers;
    #teamSize;

    constructor(name, age, employeeId, department, teamSize) {
        // ==================== YOUR CODE HERE ====================
        super(name, age, employeeId, department);
        this.#teamSize = teamSize;
        this.#teamMembers = [];
        // ========================================================
    }

    getTeamSize() {
        return this.#teamSize;
    }

    addTeamMember(employee) {
        // ==================== YOUR CODE HERE ====================
        this.#teamMembers.push(employee);
        this.#teamSize = this.#teamMembers.length;
        // ========================================================
    }

    removeTeamMember(employeeId) {
        // ==================== YOUR CODE HERE ====================
        const index = this.#teamMembers.findIndex(e => e.getEmployeeId() === employeeId);
        if (index !== -1) {
            this.#teamMembers.splice(index, 1);
            this.#teamSize = this.#teamMembers.length;
            return true;
        }
        return false;
        // ========================================================
    }

    getTeamMembers() {
        // ==================== YOUR CODE HERE ====================
        return [...this.#teamMembers];
        // ========================================================
    }

    work() {
        // ==================== YOUR CODE HERE ====================
        return `${super.work()} and managing a team of ${this.#teamSize}`;
        // ========================================================
    }

    conductMeeting() {
        // ==================== YOUR CODE HERE ====================
        return `${this.getName()} is conducting a meeting with ${this.#teamSize} people`;
        // ========================================================
    }
}


class Developer extends Employee {
    #programmingLanguages;

    constructor(name, age, employeeId, department, programmingLanguages = []) {
        // ==================== YOUR CODE HERE ====================
        super(name, age, employeeId, department);
        this.#programmingLanguages = [...programmingLanguages];
        // ========================================================
    }

    getProgrammingLanguages() {
        return [...this.#programmingLanguages];
    }

    code(language) {
        // ==================== YOUR CODE HERE ====================
        if (!this.#programmingLanguages.includes(language)) {
            throw new Error(`${this.getName()} doesn't know ${language}`);
        }
        return `${this.getName()} is coding in ${language}`;
        // ========================================================
    }

    addLanguage(language) {
        // ==================== YOUR CODE HERE ====================
        if (!this.#programmingLanguages.includes(language)) {
            this.#programmingLanguages.push(language);
        }
        // ========================================================
    }

    work() {
        // ==================== YOUR CODE HERE ====================
        return `${super.work()} writing code`;
        // ========================================================
    }
}


class Intern extends Employee {
    #mentor;
    #internshipDuration;

    constructor(name, age, employeeId, department, mentor, internshipDuration) {
        // ==================== YOUR CODE HERE ====================
        super(name, age, employeeId, department);
        this.#mentor = mentor;
        this.#internshipDuration = internshipDuration;
        // ========================================================
    }

    getMentor() {
        return this.#mentor;
    }

    getInternshipDuration() {
        return this.#internshipDuration;
    }

    learn() {
        // ==================== YOUR CODE HERE ====================
        return `${this.getName()} is learning from ${this.#mentor}`;
        // ========================================================
    }

    work() {
        // ==================== YOUR CODE HERE ====================
        return `${super.work()} as an intern`;
        // ========================================================
    }
}


// =============================================================================
// EXPORTS (Do not modify)
// =============================================================================
module.exports = { Person, Employee, Manager, Developer, Intern };
