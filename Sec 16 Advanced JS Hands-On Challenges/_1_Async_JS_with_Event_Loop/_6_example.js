/**
 * Challenge 6: Promise Combinators
 * =================================
 */

// Helper Functions
function fastAPI() {
    return new Promise(resolve => setTimeout(() => resolve("Fast response"), 50));
}

function slowAPI() {
    return new Promise(resolve => setTimeout(() => resolve("Slow response"), 200));
}

function failingAPI() {
    return new Promise((_, reject) => setTimeout(() => reject(new Error("API failed")), 100));
}

function api1() { return new Promise(r => setTimeout(() => r("API 1"), 100)); }
function api2() { return new Promise(r => setTimeout(() => r("API 2"), 100)); }
function api3() { return new Promise(r => setTimeout(() => r("API 3"), 100)); }


// Task 1: Wait for All Promises (Promise.all)
// Fetch from api1, api2, api3 simultaneously, return ["API 1", "API 2", "API 3"]
async function fetchAllData() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Task 2: Race to First Complete (Promise.race)
// Use Promise.race between fastAPI and slowAPI, return first result
async function getFirstResponse() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Task 3: Get All Results Even If Some Fail (Promise.allSettled)
// Use Promise.allSettled with api1(), api2(), failingAPI()
// Return: [{ status: "success", value }, { status: "error", reason }]
async function fetchWithStatus() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


module.exports = {
    fastAPI, slowAPI, failingAPI, api1, api2, api3,
    fetchAllData, getFirstResponse, fetchWithStatus
};
