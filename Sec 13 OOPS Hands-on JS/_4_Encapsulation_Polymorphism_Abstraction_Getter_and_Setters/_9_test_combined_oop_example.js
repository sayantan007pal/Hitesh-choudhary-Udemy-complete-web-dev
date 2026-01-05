/**
 * Test Suite for Combined OOP Patterns Challenge #9
 * ==================================================
 * 
 * Run this file with: node _9_test_combined_oop_example.js
 * 
 * Tests your E-Commerce System implementation for:
 *   - Product management
 *   - User cart operations
 *   - Order polymorphism
 *   - Order processing abstraction
 *   - Inventory observer pattern
 */

const { 
    Product, 
    User, 
    Order, 
    RegularOrder, 
    PrimeOrder, 
    WholesaleOrder, 
    OrderProcessor, 
    InventoryManager,
    OrderFactory
} = require('./_9_combined_oop_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${JSON.stringify(expected)}`);
        console.log(`   Actual:   ${JSON.stringify(actual)}`);
        testsFailed++;
        return false;
    }
}

function assertApproxEqual(actual, expected, tolerance, testName) {
    totalTests++;
    if (Math.abs(actual - expected) < tolerance) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ~${expected} (±${tolerance})`);
        console.log(`   Actual:   ${actual}`);
        testsFailed++;
        return false;
    }
}

function assertThrows(fn, expectedMessage, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to throw: "${expectedMessage}"`);
        testsFailed++;
        return false;
    } catch (error) {
        if (error.message.includes(expectedMessage)) {
            console.log(`✅ PASS: ${testName}`);
            testsPassed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName}`);
            console.log(`   Expected error containing: "${expectedMessage}"`);
            console.log(`   Actual error: "${error.message}"`);
            testsFailed++;
            return false;
        }
    }
}

function assertTrue(value, testName) {
    totalTests++;
    if (value === true) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: true, Actual: ${value}`);
        testsFailed++;
        return false;
    }
}

function assertFalse(value, testName) {
    totalTests++;
    if (value === false) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: false, Actual: ${value}`);
        testsFailed++;
        return false;
    }
}

function assertNull(value, testName) {
    totalTests++;
    if (value === null) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: null, Actual: ${value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Sections
// =============================================================================

console.log('\n' + '═'.repeat(70));
console.log('  COMBINED OOP PATTERNS CHALLENGE #9 - TEST SUITE');
console.log('═'.repeat(70) + '\n');

// Reset all data before tests
Product.clearProducts();
User.clearUsers();
Order.resetOrderIds();

// -----------------------------------------------------------------------------
// Test Section 1: Product Creation & Management
// -----------------------------------------------------------------------------
console.log('📦 Section 1: Product Creation & Management');
console.log('─'.repeat(50));

const laptop = Product.createProduct('Laptop', 999.99, 'Electronics', 10);
const phone = Product.createProduct('Phone', 499.99, 'Electronics', 20);
const shirt = Product.createProduct('Shirt', 29.99, 'Clothing', 50);

assertEqual(laptop.name, 'Laptop', 'Product name is set');
assertEqual(laptop.price, 999.99, 'Product price is set');
assertEqual(laptop.category, 'Electronics', 'Product category is set');
assertEqual(laptop.stock, 10, 'Product stock is set');
assertTrue(laptop.id > 0, 'Product has ID');

const foundLaptop = Product.getProductById(laptop.id);
assertEqual(foundLaptop.name, 'Laptop', 'getProductById finds product');

assertNull(Product.getProductById(999), 'getProductById returns null for invalid ID');

const electronics = Product.getProductsByCategory('Electronics');
assertEqual(electronics.length, 2, 'getProductsByCategory returns correct count');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 2: Product Stock Operations
// -----------------------------------------------------------------------------
console.log('📊 Section 2: Product Stock Operations');
console.log('─'.repeat(50));

const stockProduct = Product.createProduct('TestItem', 50, 'Test', 15);

assertEqual(stockProduct.purchase(5), 10, 'purchase reduces stock and returns new stock');
assertEqual(stockProduct.stock, 10, 'stock is updated after purchase');

assertEqual(stockProduct.restock(10), 20, 'restock increases stock and returns new stock');
assertEqual(stockProduct.stock, 20, 'stock is updated after restock');

assertThrows(
    () => stockProduct.purchase(100),
    'Insufficient stock',
    'purchase throws on insufficient stock'
);

assertThrows(
    () => stockProduct.purchase(-5),
    'Quantity must be positive',
    'purchase throws on negative quantity'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 3: User Creation & Properties
// -----------------------------------------------------------------------------
console.log('👤 Section 3: User Creation & Properties');
console.log('─'.repeat(50));

const regularUser = new User('John Doe', 'john@example.com', 'regular');
const primeUser = new User('Jane Prime', 'jane@example.com', 'prime');
const wholesaleUser = new User('Bulk Buyer', 'bulk@example.com', 'wholesale');

assertEqual(regularUser.name, 'John Doe', 'User name is set');
assertEqual(regularUser.email, 'john@example.com', 'User email is set');
assertEqual(regularUser.membershipType, 'regular', 'Regular membership type');
assertEqual(primeUser.membershipType, 'prime', 'Prime membership type');
assertEqual(wholesaleUser.membershipType, 'wholesale', 'Wholesale membership type');

// Test setters with validation
regularUser.name = 'Johnny Doe';
assertEqual(regularUser.name, 'Johnny Doe', 'Name setter works');

assertThrows(
    () => { regularUser.name = 'J'; },
    'at least 2 characters',
    'Name setter validates minimum length'
);

regularUser.email = 'johnny@example.com';
assertEqual(regularUser.email, 'johnny@example.com', 'Email setter works');

assertThrows(
    () => { regularUser.email = 'invalid'; },
    'Invalid email',
    'Email setter validates format'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 4: User Cart Operations
// -----------------------------------------------------------------------------
console.log('🛒 Section 4: User Cart Operations');
console.log('─'.repeat(50));

const shopper = new User('Shopper', 'shop@test.com');

shopper.addToCart(laptop.id, 2);
assertEqual(shopper.cart.length, 1, 'Item added to cart');
assertEqual(shopper.cart[0].productId, laptop.id, 'Correct product in cart');
assertEqual(shopper.cart[0].quantity, 2, 'Correct quantity in cart');

// Add same item again
shopper.addToCart(laptop.id, 1);
assertEqual(shopper.cart.length, 1, 'Same item not duplicated');
assertEqual(shopper.cart[0].quantity, 3, 'Quantity is accumulated');

// Add different item
shopper.addToCart(phone.id, 1);
assertEqual(shopper.cart.length, 2, 'Different item added');

// Test getCartTotal
const expectedTotal = (laptop.price * 3) + (phone.price * 1);
assertApproxEqual(shopper.getCartTotal(), expectedTotal, 0.01, 'getCartTotal calculates correctly');

// Test removeFromCart
assertTrue(shopper.removeFromCart(phone.id), 'removeFromCart returns true');
assertEqual(shopper.cart.length, 1, 'Item removed from cart');
assertFalse(shopper.removeFromCart(999), 'removeFromCart returns false for nonexistent');

// Test clearCart
shopper.clearCart();
assertEqual(shopper.cart.length, 0, 'clearCart empties cart');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 5: Order Creation
// -----------------------------------------------------------------------------
console.log('📋 Section 5: Order Creation');
console.log('─'.repeat(50));

Order.resetOrderIds();

const items = [
    { productId: laptop.id, quantity: 1 },
    { productId: phone.id, quantity: 2 }
];

const baseOrder = new Order(regularUser.id, items);

assertTrue(baseOrder.orderId > 0, 'Order has ID');
assertEqual(baseOrder.userId, regularUser.id, 'Order has user ID');
assertEqual(baseOrder.items.length, 2, 'Order has items');
assertEqual(baseOrder.status, 'pending', 'Order status is pending');
assertTrue(baseOrder.createdAt instanceof Date, 'Order has createdAt date');

// Test status setter
baseOrder.status = 'processing';
assertEqual(baseOrder.status, 'processing', 'Status can be changed');

assertThrows(
    () => { baseOrder.status = 'invalid'; },
    'Invalid status',
    'Invalid status throws error'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 6: Order Polymorphism - Different Order Types
// -----------------------------------------------------------------------------
console.log('💰 Section 6: Order Polymorphism - Different Order Types');
console.log('─'.repeat(50));

Order.resetOrderIds();

// Create products with known prices for calculation
Product.clearProducts();
const prod1 = Product.createProduct('Item1', 100, 'Test', 100);
const prod2 = Product.createProduct('Item2', 50, 'Test', 100);

const orderItems = [
    { productId: prod1.id, quantity: 2 },  // 200
    { productId: prod2.id, quantity: 4 }   // 200
];
// Subtotal = 400

const regularOrder = new RegularOrder(1, orderItems);
const primeOrder = new PrimeOrder(2, orderItems);
const wholesaleOrderSmall = new WholesaleOrder(3, orderItems); // 6 items - no discount
const wholesaleOrderLarge = new WholesaleOrder(4, [
    { productId: prod1.id, quantity: 5 },  // 500
    { productId: prod2.id, quantity: 5 }   // 250
]); // 10 items - 20% discount on 750

assertEqual(regularOrder.calculateSubtotal(), 400, 'RegularOrder subtotal');
assertEqual(regularOrder.calculateTotal(), 400, 'RegularOrder total (no discount)');

assertEqual(primeOrder.calculateSubtotal(), 400, 'PrimeOrder subtotal');
assertEqual(primeOrder.calculateTotal(), 360, 'PrimeOrder total (10% discount)');

assertEqual(wholesaleOrderSmall.calculateTotal(), 400, 'WholesaleOrder (6 items) no discount');
assertEqual(wholesaleOrderLarge.calculateSubtotal(), 750, 'WholesaleOrder (10 items) subtotal');
assertEqual(wholesaleOrderLarge.calculateTotal(), 600, 'WholesaleOrder (10 items) 20% discount');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 7: Order Summaries
// -----------------------------------------------------------------------------
console.log('📊 Section 7: Order Summaries');
console.log('─'.repeat(50));

const regularSummary = regularOrder.getOrderSummary();
assertEqual(regularSummary.orderType, 'Regular', 'Regular order type in summary');
assertEqual(regularSummary.discount, 0, 'No discount for regular');

const primeSummary = primeOrder.getOrderSummary();
assertEqual(primeSummary.orderType, 'Prime', 'Prime order type in summary');
assertEqual(primeSummary.discountRate, '10%', 'Prime discount rate in summary');
assertEqual(primeSummary.discount, 40, 'Prime discount amount');

const wholesaleLargeSummary = wholesaleOrderLarge.getOrderSummary();
assertEqual(wholesaleLargeSummary.orderType, 'Wholesale', 'Wholesale order type');
assertTrue(wholesaleLargeSummary.qualifiesForDiscount, 'Wholesale qualifies for discount');
assertEqual(wholesaleLargeSummary.discount, 150, 'Wholesale discount amount');

const wholesaleSmallSummary = wholesaleOrderSmall.getOrderSummary();
assertFalse(wholesaleSmallSummary.qualifiesForDiscount, 'Small wholesale does not qualify');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 8: OrderProcessor
// -----------------------------------------------------------------------------
console.log('⚙️ Section 8: OrderProcessor');
console.log('─'.repeat(50));

Product.clearProducts();
User.clearUsers();
Order.resetOrderIds();

const book = Product.createProduct('Book', 20, 'Books', 50);
const pen = Product.createProduct('Pen', 5, 'Stationery', 100);

const buyer = new User('Buyer', 'buyer@test.com', 'regular');
buyer.addToCart(book.id, 2);  // 40
buyer.addToCart(pen.id, 3);   // 15

const processor = new OrderProcessor();
const result = processor.processOrder(buyer);

assertTrue(result.order instanceof RegularOrder, 'Processor creates RegularOrder for regular user');
assertEqual(result.order.status, 'processing', 'Order status is processing');
assertTrue(result.payment.success, 'Payment was successful');
assertEqual(result.payment.amount, 55, 'Payment amount is correct');
assertEqual(buyer.cart.length, 0, 'User cart is cleared');

// Verify inventory was updated
assertEqual(book.stock, 48, 'Book stock reduced');
assertEqual(pen.stock, 97, 'Pen stock reduced');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 9: OrderProcessor with Different User Types
// -----------------------------------------------------------------------------
console.log('🎭 Section 9: OrderProcessor with Different User Types');
console.log('─'.repeat(50));

Product.clearProducts();
User.clearUsers();
Order.resetOrderIds();

const gadget = Product.createProduct('Gadget', 100, 'Tech', 50);

const primeB = new User('Prime Buyer', 'prime@test.com', 'prime');
primeB.addToCart(gadget.id, 2);  // 200, with 10% off = 180

const primeResult = processor.processOrder(primeB);
assertTrue(primeResult.order instanceof PrimeOrder, 'Processor creates PrimeOrder for prime user');
assertEqual(primeResult.payment.amount, 180, 'Prime payment with discount');

const wholesaleB = new User('Wholesale Buyer', 'wholesale@test.com', 'wholesale');
wholesaleB.addToCart(gadget.id, 10);  // 1000, with 20% off = 800

const wholesaleResult = processor.processOrder(wholesaleB);
assertTrue(wholesaleResult.order instanceof WholesaleOrder, 'Processor creates WholesaleOrder');
assertEqual(wholesaleResult.payment.amount, 800, 'Wholesale payment with discount');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 10: OrderProcessor Error Handling
// -----------------------------------------------------------------------------
console.log('🚫 Section 10: OrderProcessor Error Handling');
console.log('─'.repeat(50));

const emptyCartUser = new User('Empty', 'empty@test.com');
assertThrows(
    () => processor.processOrder(emptyCartUser),
    'Cart is empty',
    'Throws on empty cart'
);

Product.clearProducts();
const lowStockItem = Product.createProduct('Rare', 500, 'Rare', 2);
const greedyUser = new User('Greedy', 'greedy@test.com');
greedyUser.addToCart(lowStockItem.id, 10);

assertThrows(
    () => processor.processOrder(greedyUser),
    'Insufficient stock',
    'Throws on insufficient stock'
);

console.log('');

// -----------------------------------------------------------------------------
// Test Section 11: InventoryManager Observer Pattern
// -----------------------------------------------------------------------------
console.log('👁️ Section 11: InventoryManager Observer Pattern');
console.log('─'.repeat(50));

Product.clearProducts();

const invManager = new InventoryManager(5); // Low stock threshold = 5
const alertsReceived = [];

// Subscribe to alerts
const unsubscribe = invManager.subscribe((alert) => {
    alertsReceived.push(alert);
});

const monitoredProduct = Product.createProduct('Monitored', 100, 'Test', 10);
monitoredProduct.addObserver(invManager);

// Purchase to bring stock to 5 (at threshold)
monitoredProduct.purchase(5);
assertEqual(alertsReceived.length, 1, 'Alert triggered at threshold');
assertEqual(alertsReceived[0].currentStock, 5, 'Alert shows correct stock');

// Purchase more to go below threshold
monitoredProduct.purchase(2);
assertEqual(alertsReceived.length, 2, 'Another alert triggered below threshold');

// Restock above threshold
monitoredProduct.restock(100);
assertEqual(alertsReceived.length, 2, 'No alert when restocking above threshold');

// Purchase back to threshold
monitoredProduct.purchase(98);
assertEqual(alertsReceived.length, 3, 'Alert when dropping to threshold again');

// Unsubscribe and verify no more alerts
unsubscribe();
monitoredProduct.purchase(1);
assertEqual(alertsReceived.length, 3, 'No alert after unsubscribe');

console.log('');

// -----------------------------------------------------------------------------
// Test Section 12: OrderFactory
// -----------------------------------------------------------------------------
console.log('🏭 Section 12: OrderFactory');
console.log('─'.repeat(50));

Product.clearProducts();
User.clearUsers();

const factoryProd = Product.createProduct('Factory Item', 100, 'Test', 100);
const factoryItems = [{ productId: factoryProd.id, quantity: 1 }];

const regUser = new User('Regular', 'reg@test.com', 'regular');
const priUser = new User('Prime', 'pri@test.com', 'prime');
const whoUser = new User('Wholesale', 'who@test.com', 'wholesale');

const regOrder = OrderFactory.createOrder(regUser, factoryItems);
const priOrder = OrderFactory.createOrder(priUser, factoryItems);
const whoOrder = OrderFactory.createOrder(whoUser, factoryItems);

assertTrue(regOrder instanceof RegularOrder, 'Factory creates RegularOrder');
assertTrue(priOrder instanceof PrimeOrder, 'Factory creates PrimeOrder');
assertTrue(whoOrder instanceof WholesaleOrder, 'Factory creates WholesaleOrder');

console.log('');

// =============================================================================
// Test Results Summary
// =============================================================================

console.log('═'.repeat(70));
console.log('  TEST RESULTS SUMMARY');
console.log('═'.repeat(70));
console.log(`  Total Tests: ${totalTests}`);
console.log(`  ✅ Passed:   ${testsPassed}`);
console.log(`  ❌ Failed:   ${testsFailed}`);
console.log('═'.repeat(70));

if (testsFailed === 0) {
    console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉');
    console.log('You have mastered COMBINED OOP PATTERNS in JavaScript!');
    console.log('\n📖 Key Takeaways:');
    console.log('   • Encapsulation: Private fields protect internal state');
    console.log('   • Polymorphism: Different order types calculate differently');
    console.log('   • Abstraction: OrderProcessor hides complex logic');
    console.log('   • Inheritance: Orders share common base behavior');
    console.log('   • Observer Pattern: Inventory alerts on stock changes');
    console.log('   • Factory Pattern: OrderFactory creates correct order types\n');
} else {
    console.log('\n⚠️  Some tests failed. Review the errors above and try again!');
    console.log('💡 Tip: Check each OOP concept is implemented correctly.\n');
}

process.exit(testsFailed > 0 ? 1 : 0);
