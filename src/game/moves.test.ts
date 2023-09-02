import { calculatePossibleMoves } from "./moves";
import { Board, Coordinate, GameState } from "./types";
import { stateToBoardString, stringToBoard } from "./utils";

describe("calculatePossibleMoves", () => {
  describe("knight", () => {
    it("calculates moves correctly", () => {
      expectMoves({
        pieceCoord: { x: 3, y: 4 },
        board: `
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . ♘ . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        `,
        expectedBoard: `
        . . . . . . . .
        . . . . . . . .
        . . x . x . . .
        . x . . . x . .
        . . . ♘ . . . .
        . x . . . x . .
        . . x . x . . .
        . . . . . . . .
        `,
      });
    });

    it("allows moving over opponent pieces", () => {
      expectMoves({
        pieceCoord: { x: 3, y: 4 },
        board: `
        . . . . . . . .
        . . . . . . . .
        . . ♟ . ♟ . . .
        . ♟ . . . ♟ . .
        . . . ♘ . . . .
        . ♟ . . . ♟ . .
        . . ♟ . ♟ . . .
        . . . . . . . .
        `,
        expectedBoard: `
        . . . . . . . .
        . . . . . . . .
        . . x . x . . .
        . x . . . x . .
        . . . ♘ . . . .
        . x . . . x . .
        . . x . x . . .
        . . . . . . . .
        `,
      });
    });

    it("does not allow moving over own pieces", () => {
      expectMoves({
        pieceCoord: { x: 3, y: 4 },
        board: `
        . . . . . . . .
        . . . . . . . .
        . . ♙ . ♙ . . .
        . ♙ . . . ♙ . .
        . . . ♘ . . . .
        . ♙ . . . ♙ . .
        . . ♙ . ♙ . . .
        . . . . . . . .
        `,
        expectedBoard: `
        . . . . . . . .
        . . . . . . . .
        . . ♙ . ♙ . . .
        . ♙ . . . ♙ . .
        . . . ♘ . . . .
        . ♙ . . . ♙ . .
        . . ♙ . ♙ . . .
        . . . . . . . .
        `,
      });
    });
  });
});

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

function expectMoves({
  pieceCoord,
  board: boardString,
  expectedBoard: expectedBoardString,
}: {
  pieceCoord: Coordinate;
  board: string;
  expectedBoard: string;
}) {
  const board = stringToBoard(boardString);

  const possibleMoves = calculatePossibleMoves(board, pieceCoord, []);

  const state = boardToState(board, { possibleMoves });

  expectedBoardString = expectedBoardString
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  expect(stateToBoardString(state)).toEqual(expectedBoardString.trim());
}
