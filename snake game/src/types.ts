/** A single grid cell coordinate. */
export interface Position {
  x: number;
  y: number;
}

/** The four directions the snake can travel. */
export enum Direction {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

/** Overall game state machine. */
export enum GameStatus {
  Idle = "Idle",
  Running = "Running",
  Paused = "Paused",
  GameOver = "Game Over",
}
