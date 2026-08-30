import { Deque } from "./Deque.js";
import { Direction } from "./types.js";
/** Encode a cell as a string key so it can live in a Set/Map. */
function cellKey(pos) {
    return `${pos.x},${pos.y}`;
}
const OPPOSITE = {
    [Direction.Up]: Direction.Down,
    [Direction.Down]: Direction.Up,
    [Direction.Left]: Direction.Right,
    [Direction.Right]: Direction.Left,
};
/**
 * Snake owns two structures that are kept perfectly in sync:
 *
 *  - `body`: a Deque<Position>, head at the front, tail at the back. Moving
 *    forward is exactly `pushFront(newHead)` then `popBack()` — unless the
 *    snake just ate, in which case the tail is left in place and the snake
 *    grows by one cell.
 *
 *  - `occupied`: a Set<string> mirroring every cell the body currently
 *    covers. This turns "does the snake hit itself?" from an O(n) scan of
 *    the body array into an O(1) hash lookup, which matters once the snake
 *    (and thus the naive scan) gets long.
 */
export class Snake {
    /**
     * @param initialSegments body cells listed tail-first, head-last
     *                         (e.g. [tail, ..., head]).
     * @param initialDirection direction the snake starts moving in.
     */
    constructor(initialSegments, initialDirection) {
        this.pendingGrowth = 0;
        this.body = new Deque();
        this.occupied = new Set();
        this.direction = initialDirection;
        // initialSegments is tail-first; pushFront-ing each one in that order
        // leaves the *last* segment (the intended head) at the deque's front,
        // which is where getHead()/advance() expect the head to live.
        for (const segment of initialSegments) {
            this.body.pushFront(segment);
            this.occupied.add(cellKey(segment));
        }
    }
    getHead() {
        const head = this.body.first;
        if (!head)
            throw new Error("Snake has no body segments");
        return head;
    }
    getDirection() {
        return this.direction;
    }
    /** Ordered head -> tail, for rendering. */
    getSegments() {
        return this.body.toArray();
    }
    get length() {
        return this.body.size;
    }
    /**
     * Change heading. Ignores a request to reverse directly into the snake's
     * own neck (the classic instant-death bug in a naive implementation).
     */
    setDirection(next) {
        if (OPPOSITE[this.direction] === next)
            return;
        this.direction = next;
    }
    /** Queue up growth: the next `amount` moves will not pop the tail. */
    grow(amount = 1) {
        this.pendingGrowth += amount;
    }
    nextHeadPosition() {
        const head = this.getHead();
        switch (this.direction) {
            case Direction.Up:
                return { x: head.x, y: head.y - 1 };
            case Direction.Down:
                return { x: head.x, y: head.y + 1 };
            case Direction.Left:
                return { x: head.x - 1, y: head.y };
            case Direction.Right:
                return { x: head.x + 1, y: head.y };
        }
    }
    /** Where the head will land if `advance()` is called right now. */
    peekNextHead() {
        return this.nextHeadPosition();
    }
    /**
     * O(1) prediction of self-collision for the upcoming move, using the
     * occupied-cell Set rather than scanning the body.
     *
     * One subtlety: if the snake is not growing this turn, its current tail
     * cell is about to be vacated in the same instant the head moves in, so
     * moving onto the tail cell is legal (this is standard Snake behaviour).
     */
    wouldCollideWithSelf() {
        const nextKey = cellKey(this.nextHeadPosition());
        if (!this.occupied.has(nextKey))
            return false;
        if (this.pendingGrowth === 0) {
            const tail = this.body.last;
            if (tail && cellKey(tail) === nextKey)
                return false;
        }
        return true;
    }
    /** O(1) membership check, e.g. for placing food on a free cell. */
    occupiesCell(pos) {
        return this.occupied.has(cellKey(pos));
    }
    /**
     * Move one cell in the current direction: push a new head, and pop the
     * tail unless the snake is still digesting a recent meal.
     */
    advance() {
        const newHead = this.nextHeadPosition();
        this.body.pushFront(newHead);
        this.occupied.add(cellKey(newHead));
        if (this.pendingGrowth > 0) {
            this.pendingGrowth--;
        }
        else {
            const removedTail = this.body.popBack();
            if (removedTail)
                this.occupied.delete(cellKey(removedTail));
        }
        return newHead;
    }
}
//# sourceMappingURL=Snake.js.map