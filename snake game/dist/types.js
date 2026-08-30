/** The four directions the snake can travel. */
export var Direction;
(function (Direction) {
    Direction["Up"] = "Up";
    Direction["Down"] = "Down";
    Direction["Left"] = "Left";
    Direction["Right"] = "Right";
})(Direction || (Direction = {}));
/** Overall game state machine. */
export var GameStatus;
(function (GameStatus) {
    GameStatus["Idle"] = "Idle";
    GameStatus["Running"] = "Running";
    GameStatus["Paused"] = "Paused";
    GameStatus["GameOver"] = "Game Over";
})(GameStatus || (GameStatus = {}));
//# sourceMappingURL=types.js.map