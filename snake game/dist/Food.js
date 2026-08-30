/**
 * Food knows only its own position and how to relocate itself to a random
 * cell the Snake isn't currently occupying. It leans on Snake's O(1)
 * `occupiesCell` Set lookup rather than scanning the body itself.
 */
export class Food {
    constructor(board, snake) {
        this.position = Food.randomFreeCell(board, snake);
    }
    getPosition() {
        return this.position;
    }
    respawn(board, snake) {
        this.position = Food.randomFreeCell(board, snake);
    }
    static randomFreeCell(board, snake) {
        // Rejection sampling: pick a random cell, retry if the snake is there.
        // With a board much larger than the snake this converges immediately;
        // a fully-packed board is effectively a "you win" state anyway.
        let candidate;
        do {
            candidate = {
                x: Math.floor(Math.random() * board.columns),
                y: Math.floor(Math.random() * board.rows),
            };
        } while (snake.occupiesCell(candidate));
        return candidate;
    }
}
//# sourceMappingURL=Food.js.map