import { calculatePossibleMoves } from "./moves";
import { Board, Coordinate, GameState, LogEntry } from "./types";
import { stateToBoardString, stringToBoard } from "./utils";

describe("calculatePossibleMoves", () => {
  describe("pawn", () => {
    describe("black", () => {
      it("allows moving two tiles on first play", () => {
        expectMoves({
          pieceCoord: { x: 3, y: 1 },
          board: `
          ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
          ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
          . . . . . . . .
          . . . . . . . .
          . . . . . . . .
          . . . . . . . .
          ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
          ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
          `,
          expectedBoard: `
          ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
          ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
          . . . x . . . .
          . . . x . . . .
          . . . . . . . .
          . . . . . . . .
          ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
          ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
          `,
        });
      });

      it("allows moving one tile on second play", () => {
        expectMoves({
          pieceCoord: { x: 3, y: 2 },
          board: `
            ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            . . . ♟ . . . .
            . . . . . . . .
            . . . . . . . .
            . . . . . . . .
            ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
            ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
          expectedBoard: `
            ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            . . . ♟ . . . .
            . . . x . . . .
            . . . . . . . .
            . . . . . . . .
            ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
            ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
        });

        expectMoves({
          pieceCoord: { x: 3, y: 3 },
          board: `
            ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            . . . . . . . .
            . . . ♟ . . . .
            . . . . . . . .
            . . . . . . . .
            ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
            ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
          expectedBoard: `
            ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            . . . . . . . .
            . . . ♟ . . . .
            . . . x . . . .
            . . . . . . . .
            ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
            ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
        });
      });

      it("allows killing opponent on diagonals", () => {
        expectMoves({
          pieceCoord: { x: 3, y: 2 },
          board: `
            ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            ♟ ♟ ♙ . ♙ ♟ ♟ ♟
            . . . ♟ . . . .
            . . ♙ . ♙ . . .
            . . . . . . . .
            . . . . . . . .
            ♙ . . ♙ . ♙ ♙ ♙
            ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
          expectedBoard: `
            ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            ♟ ♟ ♙ . ♙ ♟ ♟ ♟
            . . . ♟ . . . .
            . . x x x . . .
            . . . . . . . .
            . . . . . . . .
            ♙ . . ♙ . ♙ ♙ ♙
            ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
        });
      });

      it("allows en passant when pawn of opponent next to your piece has just moved 2 tiles", () => {
        // En passant allowed (left)
        expectMoves({
          pieceCoord: { x: 3, y: 4 },
          log: [
            { from: { x: 0, y: 6 }, to: { x: 0, y: 5 } },
            { from: { x: 3, y: 1 }, to: { x: 3, y: 3 } },
            { from: { x: 7, y: 6 }, to: { x: 7, y: 5 } },
            { from: { x: 3, y: 3 }, to: { x: 3, y: 4 } },
            // Last move
            { from: { x: 2, y: 6 }, to: { x: 2, y: 4 } },
          ],
          board: `
            ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            . . . . . . . .
            . . . . . . . .
            . . ♙ ♟ . . . .
            ♙ . . . . . . ♙
            . ♙ . ♙ ♙ ♙ ♙ .
            ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
          expectedBoard: `
          ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
          ♟ ♟ ♟ . ♟ ♟ ♟ ♟
          . . . . . . . .
          . . . . . . . .
          . . ♙ ♟ . . . .
          ♙ . x x . . . ♙
          . ♙ . ♙ ♙ ♙ ♙ .
          ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
        });

        // En passant allowed (right)
        expectMoves({
          pieceCoord: { x: 3, y: 4 },
          log: [
            { from: { x: 0, y: 6 }, to: { x: 0, y: 5 } },
            { from: { x: 3, y: 1 }, to: { x: 3, y: 3 } },
            { from: { x: 7, y: 6 }, to: { x: 7, y: 5 } },
            { from: { x: 3, y: 3 }, to: { x: 3, y: 4 } },
            // Last move
            { from: { x: 4, y: 6 }, to: { x: 4, y: 4 } },
          ],
          board: `
            ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            . . . . . . . .
            . . . . . . . .
            . . . ♟ ♙ . . .
            ♙ . . . . . . ♙
            . ♙ ♙ ♙ . ♙ ♙ .
            ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
          expectedBoard: `
          ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
          ♟ ♟ ♟ . ♟ ♟ ♟ ♟
          . . . . . . . .
          . . . . . . . .
          . . . ♟ ♙ . . .
          ♙ . . x x . . ♙
          . ♙ ♙ ♙ . ♙ ♙ .
          ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
        });

        // En passant not allowed (opponent's pawn move was not the last move)
        expectMoves({
          pieceCoord: { x: 3, y: 4 },
          log: [
            { from: { x: 4, y: 6 }, to: { x: 4, y: 4 } },
            { from: { x: 0, y: 6 }, to: { x: 0, y: 5 } },
            { from: { x: 3, y: 1 }, to: { x: 3, y: 3 } },
            { from: { x: 7, y: 6 }, to: { x: 7, y: 5 } },
            // Last move
            { from: { x: 3, y: 3 }, to: { x: 3, y: 4 } },
          ],
          board: `
            ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            . . . . . . . .
            . . . . . . . .
            . . . ♟ ♙ . . .
            ♙ . . . . . . ♙
            . ♙ ♙ ♙ . ♙ ♙ .
            ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
          expectedBoard: `
          ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
          ♟ ♟ ♟ . ♟ ♟ ♟ ♟
          . . . . . . . .
          . . . . . . . .
          . . . ♟ ♙ . . .
          ♙ . . x . . . ♙
          . ♙ ♙ ♙ . ♙ ♙ .
          ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
            `,
        });
      });
    });
  });

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
  log,
}: {
  pieceCoord: Coordinate;
  board: string;
  expectedBoard: string;
  log?: LogEntry[];
}) {
  const board = stringToBoard(boardString);

  const possibleMoves = calculatePossibleMoves(board, pieceCoord, { log });

  const state = boardToState(board, { possibleMoves });

  expectedBoardString = expectedBoardString
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  expect(stateToBoardString(state)).toEqual(expectedBoardString.trim());
}
