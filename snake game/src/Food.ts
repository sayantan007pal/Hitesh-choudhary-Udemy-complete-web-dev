import { Position } from "./types.js";
import { Board } from "./Board.js";
import { Snake } from "./Snake.js";

/**
 * Food knows only its own position and how to relocate itself to a random
 * cell the Snake isn't currently occupying. It leans on Snake's O(1)
 * `occupiesCell` Set lookup rather than scanning the body itself.
 */
export class Food {
  private position: Position;

  constructor(board: Board, snake: Snake) {
    this.position = Food.randomFreeCell(board, snake);
  }

  getPosition(): Position {
    return this.position;
  }

  respawn(board: Board, snake: Snake): void {
    this.position = Food.randomFreeCell(board, snake);
  }

  private static randomFreeCell(board: Board, snake: Snake): Position {
    // Rejection sampling: pick a random cell, retry if the snake is there.
    // With a board much larger than the snake this converges immediately;
    // a fully-packed board is effectively a "you win" state anyway.
    let candidate: Position;
    do {
      candidate = {
        x: Math.floor(Math.random() * board.columns),
        y: Math.floor(Math.random() * board.rows),
      };
    } while (snake.occupiesCell(candidate));
    return candidate;
  }
}
