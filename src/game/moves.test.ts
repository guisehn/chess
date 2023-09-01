import { calculatePossibleMoves } from "./moves";
import { Board, GameState } from "./types";
import { stateToBoardString, stringToBoard } from "./utils";

function boardToState(board: Board, options?: Partial<GameState>): GameState {
  return {
    board,
    currentPlayer: "white",
    log: [],
    possibleMoves: [],
    selectedPiece: null,
    winner: null,
    ...options,
  };
}

describe("calculatePossibleMoves", () => {
  describe("knight", () => {
    it("calculates moves correctly", () => {
      const board = stringToBoard(`
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . ♘ . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
      `);

      const possibleMoves = calculatePossibleMoves(board, { x: 3, y: 4 }, []);

      const state = boardToState(board, { possibleMoves });

      expect(stateToBoardString(state)).toEqual(
        `
. . . . . . . .
. . . . . . . .
. . x . x . . .
. x . . . x . .
. . . ♘ . . . .
. x . . . x . .
. . x . x . . .
. . . . . . . .
      `.trim()
      );
    });
  });
});
