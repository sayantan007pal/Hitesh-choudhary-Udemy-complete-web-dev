import { Position } from "./types.js";

/**
 * Board owns grid geometry and drawing. It knows nothing about game rules,
 * the snake, or food — it just converts cells into pixels and paints them.
 * Keeping this dumb and stateless-about-rules is what makes it easy to
 * reuse Board for any grid-based game, not just Snake.
 */
export class Board {
  readonly columns: number;
  readonly rows: number;
  readonly cellSize: number;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, columns: number, rows: number, cellSize: number) {
    this.columns = columns;
    this.rows = rows;
    this.cellSize = cellSize;

    canvas.width = columns * cellSize;
    canvas.height = rows * cellSize;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("2D canvas context is not available in this browser");
    this.ctx = context;
  }

  isWithinBounds(pos: Position): boolean {
    return pos.x >= 0 && pos.x < this.columns && pos.y >= 0 && pos.y < this.rows;
  }

  clear(): void {
    this.ctx.fillStyle = "#14161a";
    this.ctx.fillRect(0, 0, this.columns * this.cellSize, this.rows * this.cellSize);
  }

  drawGridLines(): void {
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    this.ctx.lineWidth = 1;

    for (let col = 0; col <= this.columns; col++) {
      const x = col * this.cellSize + 0.5;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.rows * this.cellSize);
      this.ctx.stroke();
    }

    for (let row = 0; row <= this.rows; row++) {
      const y = row * this.cellSize + 0.5;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.columns * this.cellSize, y);
      this.ctx.stroke();
    }
  }

  drawCell(pos: Position, color: string, inset = 1): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      pos.x * this.cellSize + inset,
      pos.y * this.cellSize + inset,
      this.cellSize - inset * 2,
      this.cellSize - inset * 2
    );
  }
}
