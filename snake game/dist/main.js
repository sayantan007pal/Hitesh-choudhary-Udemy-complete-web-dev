import { Game } from "./Game.js";
function main() {
    const canvas = document.getElementById("board");
    const scoreEl = document.getElementById("score");
    const statusEl = document.getElementById("status");
    const overlayEl = document.getElementById("overlay");
    const restartBtn = document.getElementById("restart");
    if (!canvas || !scoreEl || !statusEl || !overlayEl || !restartBtn) {
        throw new Error("Required DOM elements are missing from index.html");
    }
    new Game({
        canvas,
        columns: 24,
        rows: 24,
        cellSize: 22,
        tickMs: 110,
        scoreEl,
        statusEl,
        overlayEl,
        restartBtn,
    });
}
document.addEventListener("DOMContentLoaded", main);
//# sourceMappingURL=main.js.map