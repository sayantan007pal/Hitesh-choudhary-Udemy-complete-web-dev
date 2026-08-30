/**
 * Internal doubly linked list node. Not exported — Deque is the only thing
 * that should ever touch node internals.
 */
class DequeNode {
    constructor(value) {
        this.prev = null;
        this.next = null;
        this.value = value;
    }
}
/**
 * A minimal generic double-ended queue backed by a doubly linked list.
 *
 * Why not just use a JS array? Array#unshift / Array#shift are O(n) because
 * every remaining element has to be re-indexed. A linked-list deque gives
 * true O(1) pushFront / pushBack / popFront / popBack, which is exactly the
 * access pattern the Snake needs every single tick (new head at the front,
 * old tail off the back).
 */
export class Deque {
    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }
    /** Number of elements currently in the deque. O(1). */
    get size() {
        return this.count;
    }
    get isEmpty() {
        return this.count === 0;
    }
    /** Value at the front, without removing it. O(1). */
    get first() {
        return this.head?.value;
    }
    /** Value at the back, without removing it. O(1). */
    get last() {
        return this.tail?.value;
    }
    /** Insert a new value at the front. O(1). */
    pushFront(value) {
        const node = new DequeNode(value);
        if (!this.head) {
            this.head = this.tail = node;
        }
        else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this.count++;
    }
    /** Insert a new value at the back. O(1). */
    pushBack(value) {
        const node = new DequeNode(value);
        if (!this.tail) {
            this.head = this.tail = node;
        }
        else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.count++;
    }
    /** Remove and return the front value, or undefined if empty. O(1). */
    popFront() {
        const node = this.head;
        if (!node)
            return undefined;
        this.head = node.next;
        if (this.head)
            this.head.prev = null;
        else
            this.tail = null;
        this.count--;
        return node.value;
    }
    /** Remove and return the back value, or undefined if empty. O(1). */
    popBack() {
        const node = this.tail;
        if (!node)
            return undefined;
        this.tail = node.prev;
        if (this.tail)
            this.tail.next = null;
        else
            this.head = null;
        this.count--;
        return node.value;
    }
    /** Iterate front -> back, so `for (const x of deque)` visits head first. */
    *[Symbol.iterator]() {
        let node = this.head;
        while (node) {
            yield node.value;
            node = node.next;
        }
    }
    toArray() {
        return [...this];
    }
}
//# sourceMappingURL=Deque.js.map