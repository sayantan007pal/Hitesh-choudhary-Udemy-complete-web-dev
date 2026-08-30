import { Board } from "./Board.js";
import { Snake } from "./Snake.js";
import { Food } from "./Food.js";
import { Direction, GameStatus, Position } from "./types.js";

export interface GameConfig {
  canvas: HTMLCanvasElement;
  columns: number;
  rows: number;
  cellSize: number;
  /** Milliseconds between moves — lower is faster. */
  tickMs: number;
  scoreEl: HTMLElement;
  statusEl: HTMLElement;
  overlayEl: HTMLElement;
  restartBtn: HTMLButtonElement;
}

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: Direction.Up,
  ArrowDown: Direction.Down,
  ArrowLeft: Direction.Left,
  ArrowRight: Direction.Right,
  w: Direction.Up,
  s: Direction.Down,
  a: Direction.Left,
  d: Direction.Right,
  W: Direction.Up,
  S: Direction.Down,
  A: Direction.Left,
  D: Direction.Right,
};

const HEAD_COLOR = "#f5f5f4";
const BODY_COLOR = "#8a8f98";
const FOOD_COLOR = "#2dd4bf";

/**
 * Game is the orchestrator: it owns the render/update loop, reads input,
 * and delegates every actual decision to Board (geometry/drawing), Snake
 * (movement/collision) and Food (placement). Game itself holds no grid
 * math and no data-structure logic — that separation is the point.
 */
export class Game {
  private readonly board: Board;
  private readonly config: GameConfig;
  private snake!: Snake;
  private food!: Food;

  private status: GameStatus = GameStatus.Idle;
  private score = 0;
  private lastTick = 0;
  private rafHandle = 0;
  private queuedDirection: Direction | null = null;

  constructor(config: GameConfig) {
    this.config = config;
    this.board = new Board(config.canvas, config.columns, config.rows, config.cellSize);

    config.restartBtn.addEventListener("click", () => this.start());
    window.addEventListener("keydown", (event) => this.handleKeydown(event));

    this.reset();
    this.render();
  }

  private reset(): void {
    const startX = Math.floor(this.board.columns / 2);
    const startY = Math.floor(this.board.rows / 2);

    // Tail-first list: three segments extending left of center, head on the right.
    const initialSegments: Position[] = [
      { x: startX - 2, y: startY },
      { x: startX - 1, y: startY },
      { x: startX, y: startY },
    ];

    this.snake = new Snake(initialSegments, Direction.Right);
    this.food = new Food(this.board, this.snake);
    this.score = 0;
    this.queuedDirection = null;
    this.status = GameStatus.Idle;

    this.updateHud();
    this.setOverlay("Press an arrow key or WASD to start. Space pauses.", true);
  }

  start(): void {
    if (this.status === GameStatus.GameOver || this.status === GameStatus.Idle) {
      this.reset();
    }
    this.status = GameStatus.Running;
    this.setOverlay("", false);
    this.lastTick = performance.now();
    cancelAnimationFrame(this.rafHandle);
    this.rafHandle = requestAnimationFrame(this.loop);
  }

  private pause(): void {
    if (this.status !== GameStatus.Running) return;
    this.status = GameStatus.Paused;
    cancelAnimationFrame(this.rafHandle);
    this.setOverlay("Paused. Press space to resume.", true);
    this.updateHud();
  }

  private resume(): void {
    if (this.status !== GameStatus.Paused) return;
    this.status = GameStatus.Running;
    this.setOverlay("", false);
    this.lastTick = performance.now();
    this.rafHandle = requestAnimationFrame(this.loop);
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (event.key === " ") {
      event.preventDefault();
      if (this.status === GameStatus.Running) this.pause();
      else if (this.status === GameStatus.Paused) this.resume();
      else this.start();
      return;
    }

    const direction = KEY_TO_DIRECTION[event.key];
    if (!direction) return;
    event.preventDefault();

    // Queue the direction rather than applying it immediately: two key
    // presses in the same tick window can't cause a same-tick 180 reversal.
    this.queuedDirection = direction;

    if (this.status === GameStatus.Idle) this.start();
  }

  private loop = (now: number): void => {
    if (this.status !== GameStatus.Running) return;
    this.rafHandle = requestAnimationFrame(this.loop);

    if (now - this.lastTick >= this.config.tickMs) {
      this.lastTick = now;
      this.tick();
    }
  };

  private tick(): void {
    if (this.queuedDirection) {
      this.snake.setDirection(this.queuedDirection);
      this.queuedDirection = null;
    }

    const nextHead = this.snake.peekNextHead();

    if (!this.board.isWithinBounds(nextHead) || this.snake.wouldCollideWithSelf()) {
      this.gameOver();
      return;
    }

    const ateFood = this.positionsEqual(nextHead, this.food.getPosition());
    if (ateFood) {
      this.snake.grow(1);
      this.score += 10;
    }

    this.snake.advance();

    if (ateFood) {
      this.food.respawn(this.board, this.snake);
    }

    this.updateHud();
    this.render();
  }

  private positionsEqual(a: Position, b: Position): boolean {
    return a.x === b.x && a.y === b.y;
  }

  private gameOver(): void {
    this.status = GameStatus.GameOver;
    cancelAnimationFrame(this.rafHandle);
    this.setOverlay(`Game over — score ${this.score}. Press restart or any direction key to try again.`, true);
    this.updateHud();
  }

  private setOverlay(message: string, visible: boolean): void {
    this.config.overlayEl.textContent = message;
    this.config.overlayEl.hidden = !visible;
  }

  private updateHud(): void {
    this.config.scoreEl.textContent = String(this.score);
    this.config.statusEl.textContent = this.status;
  }

  private render(): void {
    this.board.clear();
    this.board.drawGridLines();

    const segments = this.snake.getSegments();
    segments.forEach((segment, index) => {
      this.board.drawCell(segment, index === 0 ? HEAD_COLOR : BODY_COLOR);
    });

    this.board.drawCell(this.food.getPosition(), FOOD_COLOR);
  }
}
