/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║           COMBINED OOP PATTERNS - CHALLENGE #9                               ║
 * ║                    🎯 Real-World Design Patterns 🎯                          ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT REVIEW:
 * ━━━━━━━━━━━━━━━━━━━
 * This challenge combines ALL OOP concepts:
 *   - Encapsulation (private fields)
 *   - Polymorphism (method overriding)
 *   - Abstraction (hiding complexity)
 *   - Inheritance (extends, super)
 *   - Getters/Setters (computed properties)
 *   - Static Methods (utility functions)
 *   - Prototype Chain (Object.create)
 * 
 * 
 * 🎯 YOUR CHALLENGE:
 * ━━━━━━━━━━━━━━━━━━━
 * 
 * SCENARIO: E-Commerce Platform
 * Build a complete e-commerce order management system:
 * 
 * PART 1: Product Class
 *   - #id, #name, #price, #category, #stock
 *   - Getters for all fields
 *   - Static #products Map to track all products
 *   - static createProduct(name, price, category, stock)
 *   - static getProductById(id)
 *   - static getProductsByCategory(category)
 *   - purchase(quantity) - reduces stock
 *   - restock(quantity) - increases stock
 * 
 * PART 2: User Class
 *   - #id, #name, #email, #cart (array of {productId, quantity})
 *   - Getters/setters for name, email
 *   - addToCart(productId, quantity)
 *   - removeFromCart(productId)
 *   - getCartTotal() - calculates total price
 *   - clearCart()
 * 
 * PART 3: Order Class (Polymorphism)
 *   - Base Order class with #orderId, #userId, #items, #status, #createdAt
 *   - calculateTotal() - abstract method
 *   - getOrderSummary() - abstract method
 *   
 *   Subclasses:
 *   - RegularOrder - standard pricing
 *   - PrimeOrder - 10% discount
 *   - WholesaleOrder - 20% discount on orders > 10 items
 * 
 * PART 4: OrderProcessor (Abstraction)
 *   - Encapsulates complex order processing
 *   - #validateInventory(items), #processPayment(), #updateInventory(items)
 *   - processOrder(user) - public interface
 * 
 * PART 5: Observer Pattern for Inventory
 *   - InventoryManager with subscribe/notify pattern
 *   - Notifies when stock is low
 * 
 * 
 * 💡 HINTS:
 * ━━━━━━━━━━
 * - Use static #counter for auto-incrementing IDs
 * - Use private methods for validation
 * - Implement calculateTotal() differently in each Order subclass
 */


// =============================================================================
// PART 1: Product Class
// =============================================================================

class Product {
    static #products = new Map();
    static #nextId = 1;

    #id;
    #name;
    #price;
    #category;
    #stock;
    #observers = [];

    constructor(name, price, category, stock = 0) {
        // ==================== YOUR CODE HERE ====================
        this.#id = Product.#nextId++;
        this.#name = name;
        this.#price = price;
        this.#category = category;
        this.#stock = stock;
        
        Product.#products.set(this.#id, this);
        // ========================================================
    }

    // Getters
    get id() { return this.#id; }
    get name() { return this.#name; }
    get price() { return this.#price; }
    get category() { return this.#category; }
    get stock() { return this.#stock; }

    get inStock() {
        return this.#stock > 0;
    }

    // Instance methods
    purchase(quantity) {
        // ==================== YOUR CODE HERE ====================
        if (quantity <= 0) {
            throw new Error('Quantity must be positive');
        }
        if (quantity > this.#stock) {
            throw new Error('Insufficient stock');
        }
        this.#stock -= quantity;
        this.#notifyObservers();
        return this.#stock;
        // ========================================================
    }

    restock(quantity) {
        // ==================== YOUR CODE HERE ====================
        if (quantity <= 0) {
            throw new Error('Quantity must be positive');
        }
        this.#stock += quantity;
        this.#notifyObservers();
        return this.#stock;
        // ========================================================
    }

    // Observer pattern
    addObserver(observer) {
        this.#observers.push(observer);
    }

    #notifyObservers() {
        for (const observer of this.#observers) {
            observer.update(this);
        }
    }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            price: this.#price,
            category: this.#category,
            stock: this.#stock
        };
    }

    // Static methods
    static createProduct(name, price, category, stock = 0) {
        // ==================== YOUR CODE HERE ====================
        return new Product(name, price, category, stock);
        // ========================================================
    }

    static getProductById(id) {
        // ==================== YOUR CODE HERE ====================
        return Product.#products.get(id) || null;
        // ========================================================
    }

    static getProductsByCategory(category) {
        // ==================== YOUR CODE HERE ====================
        return Array.from(Product.#products.values())
            .filter(product => product.category === category);
        // ========================================================
    }

    static getAllProducts() {
        return Array.from(Product.#products.values());
    }

    static clearProducts() {
        Product.#products.clear();
        Product.#nextId = 1;
    }
}


// =============================================================================
// PART 2: User Class
// =============================================================================

class User {
    static #users = new Map();
    static #nextId = 1;

    #id;
    #name;
    #email;
    #cart;
    #membershipType;

    constructor(name, email, membershipType = 'regular') {
        // ==================== YOUR CODE HERE ====================
        this.#id = User.#nextId++;
        this.#name = name;
        this.#email = email;
        this.#cart = [];
        this.#membershipType = membershipType;

        User.#users.set(this.#id, this);
        // ========================================================
    }

    // Getters
    get id() { return this.#id; }
    get cart() { return [...this.#cart]; }
    get membershipType() { return this.#membershipType; }

    get name() {
        return this.#name;
    }

    set name(value) {
        if (!value || value.trim().length < 2) {
            throw new Error('Name must be at least 2 characters');
        }
        this.#name = value.trim();
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        if (!value || !value.includes('@')) {
            throw new Error('Invalid email format');
        }
        this.#email = value;
    }

    // Cart methods
    addToCart(productId, quantity = 1) {
        // ==================== YOUR CODE HERE ====================
        if (quantity <= 0) {
            throw new Error('Quantity must be positive');
        }
        const product = Product.getProductById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        
        const existingItem = this.#cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.#cart.push({ productId, quantity });
        }
        return this.#cart;
        // ========================================================
    }

    removeFromCart(productId) {
        // ==================== YOUR CODE HERE ====================
        const index = this.#cart.findIndex(item => item.productId === productId);
        if (index === -1) {
            return false;
        }
        this.#cart.splice(index, 1);
        return true;
        // ========================================================
    }

    updateCartQuantity(productId, quantity) {
        // ==================== YOUR CODE HERE ====================
        if (quantity <= 0) {
            return this.removeFromCart(productId);
        }
        const item = this.#cart.find(item => item.productId === productId);
        if (!item) {
            return false;
        }
        item.quantity = quantity;
        return true;
        // ========================================================
    }

    getCartTotal() {
        // ==================== YOUR CODE HERE ====================
        return this.#cart.reduce((total, item) => {
            const product = Product.getProductById(item.productId);
            if (!product) return total;
            return total + (product.price * item.quantity);
        }, 0);
        // ========================================================
    }

    getCartItemCount() {
        return this.#cart.reduce((count, item) => count + item.quantity, 0);
    }

    clearCart() {
        // ==================== YOUR CODE HERE ====================
        this.#cart = [];
        // ========================================================
    }

    static getUserById(id) {
        return User.#users.get(id) || null;
    }

    static clearUsers() {
        User.#users.clear();
        User.#nextId = 1;
    }
}


// =============================================================================
// PART 3: Order Classes (Polymorphism)
// =============================================================================

class Order {
    static #nextOrderId = 1;

    #orderId;
    #userId;
    #items;
    #status;
    #createdAt;

    constructor(userId, items) {
        // ==================== YOUR CODE HERE ====================
        this.#orderId = Order.#nextOrderId++;
        this.#userId = userId;
        this.#items = [...items];
        this.#status = 'pending';
        this.#createdAt = new Date();
        // ========================================================
    }

    get orderId() { return this.#orderId; }
    get userId() { return this.#userId; }
    get items() { return [...this.#items]; }
    get status() { return this.#status; }
    get createdAt() { return new Date(this.#createdAt); }

    set status(value) {
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(value)) {
            throw new Error('Invalid status');
        }
        this.#status = value;
    }

    // Base implementation - to be overridden
    calculateSubtotal() {
        // ==================== YOUR CODE HERE ====================
        return this.#items.reduce((total, item) => {
            const product = Product.getProductById(item.productId);
            if (!product) return total;
            return total + (product.price * item.quantity);
        }, 0);
        // ========================================================
    }

    // Abstract-like method - to be overridden
    calculateTotal() {
        return this.calculateSubtotal();
    }

    // Abstract-like method - to be overridden
    getOrderSummary() {
        return {
            orderId: this.#orderId,
            status: this.#status,
            itemCount: this.#items.length,
            total: this.calculateTotal()
        };
    }

    getTotalQuantity() {
        return this.#items.reduce((count, item) => count + item.quantity, 0);
    }

    static resetOrderIds() {
        Order.#nextOrderId = 1;
    }
}


class RegularOrder extends Order {
    constructor(userId, items) {
        // ==================== YOUR CODE HERE ====================
        super(userId, items);
        // ========================================================
    }

    calculateTotal() {
        // ==================== YOUR CODE HERE ====================
        // Regular orders have no discount
        return this.calculateSubtotal();
        // ========================================================
    }

    getOrderSummary() {
        // ==================== YOUR CODE HERE ====================
        return {
            ...super.getOrderSummary(),
            orderType: 'Regular',
            discount: 0,
            discountedTotal: this.calculateTotal()
        };
        // ========================================================
    }
}


class PrimeOrder extends Order {
    #discountRate = 0.10;

    constructor(userId, items) {
        // ==================== YOUR CODE HERE ====================
        super(userId, items);
        // ========================================================
    }

    calculateTotal() {
        // ==================== YOUR CODE HERE ====================
        // Prime members get 10% off
        const subtotal = this.calculateSubtotal();
        return subtotal * (1 - this.#discountRate);
        // ========================================================
    }

    getDiscount() {
        return this.calculateSubtotal() * this.#discountRate;
    }

    getOrderSummary() {
        // ==================== YOUR CODE HERE ====================
        const subtotal = this.calculateSubtotal();
        const discount = this.getDiscount();
        return {
            ...super.getOrderSummary(),
            orderType: 'Prime',
            subtotal,
            discountRate: `${this.#discountRate * 100}%`,
            discount,
            discountedTotal: this.calculateTotal()
        };
        // ========================================================
    }
}


class WholesaleOrder extends Order {
    #minQuantityForDiscount = 10;
    #discountRate = 0.20;

    constructor(userId, items) {
        // ==================== YOUR CODE HERE ====================
        super(userId, items);
        // ========================================================
    }

    #qualifiesForDiscount() {
        return this.getTotalQuantity() >= this.#minQuantityForDiscount;
    }

    calculateTotal() {
        // ==================== YOUR CODE HERE ====================
        // Wholesale gets 20% off if total quantity >= 10
        const subtotal = this.calculateSubtotal();
        if (this.#qualifiesForDiscount()) {
            return subtotal * (1 - this.#discountRate);
        }
        return subtotal;
        // ========================================================
    }

    getDiscount() {
        if (this.#qualifiesForDiscount()) {
            return this.calculateSubtotal() * this.#discountRate;
        }
        return 0;
    }

    getOrderSummary() {
        // ==================== YOUR CODE HERE ====================
        const subtotal = this.calculateSubtotal();
        const qualifies = this.#qualifiesForDiscount();
        const discount = this.getDiscount();
        
        return {
            ...super.getOrderSummary(),
            orderType: 'Wholesale',
            totalQuantity: this.getTotalQuantity(),
            minQuantityForDiscount: this.#minQuantityForDiscount,
            qualifiesForDiscount: qualifies,
            subtotal,
            discountRate: qualifies ? `${this.#discountRate * 100}%` : '0%',
            discount,
            discountedTotal: this.calculateTotal()
        };
        // ========================================================
    }
}


// =============================================================================
// PART 4: OrderProcessor (Abstraction)
// =============================================================================

class OrderProcessor {
    #validateInventory(items) {
        // ==================== YOUR CODE HERE ====================
        for (const item of items) {
            const product = Product.getProductById(item.productId);
            if (!product) {
                throw new Error(`Product ${item.productId} not found`);
            }
            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${product.name}`);
            }
        }
        return true;
        // ========================================================
    }

    #processPayment(total) {
        // ==================== YOUR CODE HERE ====================
        // Simulated payment processing
        if (total <= 0) {
            throw new Error('Invalid order total');
        }
        // In real implementation, this would connect to payment gateway
        return {
            success: true,
            transactionId: `TXN-${Date.now()}`,
            amount: total
        };
        // ========================================================
    }

    #updateInventory(items) {
        // ==================== YOUR CODE HERE ====================
        for (const item of items) {
            const product = Product.getProductById(item.productId);
            product.purchase(item.quantity);
        }
        // ========================================================
    }

    processOrder(user) {
        // ==================== YOUR CODE HERE ====================
        if (user.cart.length === 0) {
            throw new Error('Cart is empty');
        }

        const items = user.cart;
        
        // Step 1: Validate inventory
        this.#validateInventory(items);
        
        // Step 2: Create appropriate order type
        let order;
        switch (user.membershipType) {
            case 'prime':
                order = new PrimeOrder(user.id, items);
                break;
            case 'wholesale':
                order = new WholesaleOrder(user.id, items);
                break;
            default:
                order = new RegularOrder(user.id, items);
        }
        
        // Step 3: Process payment
        const payment = this.#processPayment(order.calculateTotal());
        
        // Step 4: Update inventory
        this.#updateInventory(items);
        
        // Step 5: Update order status
        order.status = 'processing';
        
        // Step 6: Clear user's cart
        user.clearCart();
        
        return {
            order,
            payment,
            summary: order.getOrderSummary()
        };
        // ========================================================
    }
}


// =============================================================================
// PART 5: InventoryManager (Observer Pattern)
// =============================================================================

class InventoryManager {
    #lowStockThreshold;
    #subscribers = [];
    #lowStockAlerts = [];

    constructor(lowStockThreshold = 5) {
        this.#lowStockThreshold = lowStockThreshold;
    }

    subscribe(callback) {
        // ==================== YOUR CODE HERE ====================
        this.#subscribers.push(callback);
        return () => {
            const index = this.#subscribers.indexOf(callback);
            if (index > -1) {
                this.#subscribers.splice(index, 1);
            }
        };
        // ========================================================
    }

    // Called by Product when stock changes
    update(product) {
        // ==================== YOUR CODE HERE ====================
        if (product.stock <= this.#lowStockThreshold) {
            const alert = {
                productId: product.id,
                productName: product.name,
                currentStock: product.stock,
                threshold: this.#lowStockThreshold,
                timestamp: new Date()
            };
            this.#lowStockAlerts.push(alert);
            this.#notify(alert);
        }
        // ========================================================
    }

    #notify(alert) {
        for (const subscriber of this.#subscribers) {
            subscriber(alert);
        }
    }

    getAlerts() {
        return [...this.#lowStockAlerts];
    }

    clearAlerts() {
        this.#lowStockAlerts = [];
    }
}


// =============================================================================
// OrderFactory - Factory Pattern Bonus
// =============================================================================

class OrderFactory {
    static createOrder(user, items) {
        switch (user.membershipType) {
            case 'prime':
                return new PrimeOrder(user.id, items);
            case 'wholesale':
                return new WholesaleOrder(user.id, items);
            default:
                return new RegularOrder(user.id, items);
        }
    }
}


// =============================================================================
// EXPORTS (Do not modify)
// =============================================================================
module.exports = { 
    Product, 
    User, 
    Order, 
    RegularOrder, 
    PrimeOrder, 
    WholesaleOrder, 
    OrderProcessor, 
    InventoryManager,
    OrderFactory
};
