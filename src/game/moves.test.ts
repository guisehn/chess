import { calculatePossibleMoves } from "./moves";
import { Board, CoordinateString, GameState, LogEntry } from "./types";
import {
  boardToString,
  getPieceAt,
  stringToBoard,
  stringToCoord,
} from "./utils";

describe("calculatePossibleMoves", () => {
  describe("pawn", () => {
    describe("black", () => {
      it("allows moving two tiles on first play", () => {
        expectMoves({
          pieceCoord: "d7",
          board: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
            6 . . . x . . . .
            5 . . . x . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
        });
      });

      it("allows moving one tile on second play", () => {
        expectMoves({
          pieceCoord: "d6",
          board: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            6 . . . ♟ . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            6 . . . ♟ . . . .
            5 . . . x . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
        });

        expectMoves({
          pieceCoord: "d5",
          board: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . ♟ . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . ♟ . . . .
            4 . . . x . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
        });
      });

      it("cannot move over other pieces", () => {
        expectMoves({
          pieceCoord: "d7",
          board: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
            6 . . . ♙ . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . ♙ ♙ ♙ ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
            6 . . . ♙ . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . ♙ ♙ ♙ ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
        });
      });

      it("allows killing opponent on diagonals", () => {
        expectMoves({
          pieceCoord: "d6",
          board: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♙ . ♙ ♟ ♟ ♟
            6 . . . ♟ . . . .
            5 . . ♙ . ♙ . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ . . ♙ . ♙ ♙ ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♙ . ♙ ♟ ♟ ♟
            6 . . . ♟ . . . .
            5 . . x x x . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ . . ♙ . ♙ ♙ ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
        });
      });

      it("allows en passant when pawn of opponent next to your piece has just moved 2 tiles", () => {
        // En passant allowed (left)
        expectMoves({
          pieceCoord: "d4",
          log: [
            { from: { x: 0, y: 6 }, to: { x: 0, y: 5 } },
            { from: { x: 3, y: 1 }, to: { x: 3, y: 3 } },
            { from: { x: 7, y: 6 }, to: { x: 7, y: 5 } },
            { from: { x: 3, y: 3 }, to: { x: 3, y: 4 } },
            // Last move
            { from: { x: 2, y: 6 }, to: { x: 2, y: 4 } },
          ],
          board: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . ♙ ♟ . . . .
            3 ♙ . . . . . . ♙
            2 . ♙ . ♙ ♙ ♙ ♙ .
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . ♙ ♟ . . . .
            3 ♙ . x x . . . ♙
            2 . ♙ . ♙ ♙ ♙ ♙ .
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
        });

        // En passant allowed (right)
        expectMoves({
          pieceCoord: "d4",
          log: [
            { from: { x: 0, y: 6 }, to: { x: 0, y: 5 } },
            { from: { x: 3, y: 1 }, to: { x: 3, y: 3 } },
            { from: { x: 7, y: 6 }, to: { x: 7, y: 5 } },
            { from: { x: 3, y: 3 }, to: { x: 3, y: 4 } },
            // Last move
            { from: { x: 4, y: 6 }, to: { x: 4, y: 4 } },
          ],
          board: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . ♟ ♙ . . .
            3 ♙ . . . . . . ♙
            2 . ♙ ♙ ♙ . ♙ ♙ .
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . ♟ ♙ . . .
            3 ♙ . . x x . . ♙
            2 . ♙ ♙ ♙ . ♙ ♙ .
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
        });

        // En passant not allowed (opponent's pawn move was not the last move)
        expectMoves({
          pieceCoord: "d4",
          log: [
            { from: { x: 4, y: 6 }, to: { x: 4, y: 4 } },
            { from: { x: 0, y: 6 }, to: { x: 0, y: 5 } },
            { from: { x: 3, y: 1 }, to: { x: 3, y: 3 } },
            { from: { x: 7, y: 6 }, to: { x: 7, y: 5 } },
            // Last move
            { from: { x: 3, y: 3 }, to: { x: 3, y: 4 } },
          ],
          board: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . ♟ ♙ . . .
            3 ♙ . . . . . . ♙
            2 . ♙ ♙ ♙ . ♙ ♙ .
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
            7 ♟ ♟ ♟ . ♟ ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . ♟ ♙ . . .
            3 ♙ . . x . . . ♙
            2 . ♙ ♙ ♙ . ♙ ♙ .
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
        });
      });

      it("promotes when reaching end of board", () => {
        expectMoves({
          pieceCoord: "g7",
          board: `
            8 ♜ ♞ ♝ ♛ ♚ ♝ . ♜
            7 ♟ ♟ ♟ ♟ ♟ ♟ ♙ .
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ ♙ ♙ ♙ . ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ ♞ ♝ ♛ ♚ p p p
            7 ♟ ♟ ♟ ♟ ♟ ♟ ♙ .
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ ♙ ♙ ♙ . ♙
            1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
              a b c d e f g h
          `,
        });
      });
    });

    // TODO: white
  });

  describe("knight", () => {
    it("calculates moves correctly", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . . . . . .
          5 . . . . . . . .
          4 . . . ♘ . . . .
          3 . . . . . . . .
          2 . . . . . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . x . x . . .
          5 . x . . . x . .
          4 . . . ♘ . . . .
          3 . x . . . x . .
          2 . . x . x . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
      });
    });

    it("allows moving over opponent pieces", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . ♟ . ♟ . . .
          5 . ♟ . . . ♟ . .
          4 . . . ♘ . . . .
          3 . ♟ . . . ♟ . .
          2 . . ♟ . ♟ . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . x . x . . .
          5 . x . . . x . .
          4 . . . ♘ . . . .
          3 . x . . . x . .
          2 . . x . x . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
      });
    });

    it("does not allow moving over own pieces", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . ♙ . ♙ . . .
          5 . ♙ . . . ♙ . .
          4 . . . ♘ . . . .
          3 . ♙ . . . ♙ . .
          2 . . ♙ . ♙ . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . ♙ . ♙ . . .
          5 . ♙ . . . ♙ . .
          4 . . . ♘ . . . .
          3 . ♙ . . . ♙ . .
          2 . . ♙ . ♙ . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
      });
    });
  });

  describe("rook", () => {
    it("calculates moves correctly", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . . . . . .
          5 . . . . . . . .
          4 . . . ♖ . . . .
          3 . . . . . . . .
          2 . . . . . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . x . . . .
          7 . . . x . . . .
          6 . . . x . . . .
          5 . . . x . . . .
          4 x x x ♖ x x x x
          3 . . . x . . . .
          2 . . . x . . . .
          1 . . . x . . . .
            a b c d e f g h
        `,
      });
    });

    it("allows moving over opponent pieces", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . ♟ . . . .
          6 . . . ♟ . . . .
          5 . . . . . . . .
          4 ♟ ♟ . ♖ . ♟ ♟ .
          3 . . . . . . . .
          2 . . . ♟ . . . .
          1 . . . ♟ . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 . . . ♟ . . . .
          6 . . . x . . . .
          5 . . . x . . . .
          4 ♟ x x ♖ x x ♟ .
          3 . . . x . . . .
          2 . . . x . . . .
          1 . . . ♟ . . . .
            a b c d e f g h
        `,
      });
    });

    it("does not allow moving over own pieces", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . ♙ . . . .
          5 . . . . . . . .
          4 . ♙ . ♖ . ♙ . .
          3 . . . . . . . .
          2 . . . ♙ . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . ♙ . . . .
          5 . . . x . . . .
          4 . ♙ x ♖ x ♙ . .
          3 . . . x . . . .
          2 . . . ♙ . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
      });
    });
  });

  describe("bishop", () => {
    it("calculates moves correctly", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . . . . . .
          5 . . . . . . . .
          4 . . . ♗ . . . .
          3 . . . . . . . .
          2 . . . . . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . x
          7 x . . . . . x .
          6 . x . . . x . .
          5 . . x . x . . .
          4 . . . ♗ . . . .
          3 . . x . x . . .
          2 . x . . . x . .
          1 x . . . . . x .
            a b c d e f g h
        `,
      });
    });

    it("allows moving over opponent pieces", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 ♟ . . . . . ♟ .
          6 . ♟ . . . ♟ . .
          5 . . . . . . . .
          4 . . . ♗ . . . .
          3 . . . . . . . .
          2 . ♟ . . . ♟ . .
          1 ♟ . . . . . ♟ .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 ♟ . . . . . ♟ .
          6 . x . . . x . .
          5 . . x . x . . .
          4 . . . ♗ . . . .
          3 . . x . x . . .
          2 . x . . . x . .
          1 ♟ . . . . . ♟ .
            a b c d e f g h
        `,
      });
    });

    it("does not allow moving over own pieces", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . ♙ . . . ♙ . .
          5 . . . . . . . .
          4 . . . ♗ . . . .
          3 . . . . . . . .
          2 . ♙ . . . ♙ . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . ♙ . . . ♙ . .
          5 . . x . x . . .
          4 . . . ♗ . . . .
          3 . . x . x . . .
          2 . ♙ . . . ♙ . .
          1 . . . . . . . .
            a b c d e f g h
        `,
      });
    });
  });

  describe("queen", () => {
    it("calculates moves correctly", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . . . . . .
          5 . . . . . . . .
          4 . . . ♕ . . . .
          3 . . . . . . . .
          2 . . . . . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . x . . . x
          7 x . . x . . x .
          6 . x . x . x . .
          5 . . x x x . . .
          4 x x x ♕ x x x x
          3 . . x x x . . .
          2 . x . x . x . .
          1 x . . x . . x .
            a b c d e f g h
        `,
      });
    });

    it("allows moving over opponent pieces", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . ♟ . ♟ . ♟ . .
          5 . . . . . . . .
          4 . ♟ . ♕ . ♟ . .
          3 . . . . . . . .
          2 . ♟ . ♟ . ♟ . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . x . x . x . .
          5 . . x x x . . .
          4 . x x ♕ x x . .
          3 . . x x x . . .
          2 . x . x . x . .
          1 . . . . . . . .
            a b c d e f g h
        `,
      });
    });

    it("does not allow moving over own pieces", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . ♙ . ♙ . ♙ . .
          5 . . . . . . . .
          4 . ♙ . ♕ . ♙ . .
          3 . . . . . . . .
          2 . ♙ . ♙ . ♙ . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . ♙ . ♙ . ♙ . .
          5 . . x x x . . .
          4 . ♙ x ♕ x ♙ . .
          3 . . x x x . . .
          2 . ♙ . ♙ . ♙ . .
          1 . . . . . . . .
            a b c d e f g h
        `,
      });
    });
  });

  describe("king", () => {
    it("calculates moves correctly", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . . . . . .
          5 . . . . . . . .
          4 . . . ♔ . . . .
          3 . . . . . . . .
          2 . . . . . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . . . . . .
          5 . . x x x . . .
          4 . . x ♔ x . . .
          3 . . x x x . . .
          2 . . . . . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
      });
    });

    it("allows moving over opponent pieces", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . . . . . .
          5 . . ♞ ♞ ♞ . . .
          4 . . ♞ ♔ ♞ . . .
          3 . . ♞ ♞ ♞ . . .
          2 . . . . . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . . . . . .
          5 . . x x x . . .
          4 . . x ♔ x . . .
          3 . . x x x . . .
          2 . . . . . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
      });
    });

    it("does not allow moving over own pieces", () => {
      expectMoves({
        pieceCoord: "d4",
        board: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . . . . . .
          5 . . ♙ ♙ ♙ . . .
          4 . . ♙ ♔ ♙ . . .
          3 . . ♙ ♙ ♙ . . .
          2 . . . . . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
        expectedBoard: `
          8 . . . . . . . .
          7 . . . . . . . .
          6 . . . . . . . .
          5 . . ♙ ♙ ♙ . . .
          4 . . ♙ ♔ ♙ . . .
          3 . . ♙ ♙ ♙ . . .
          2 . . . . . . . .
          1 . . . . . . . .
            a b c d e f g h
        `,
      });
    });

    it("castles left", () => {
      expectMoves({
        pieceCoord: "e1",
        board: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . ♙ ♙ ♙
            1 ♖ . . . ♔ ♗ . ♖
              a b c d e f g h
          `,
        expectedBoard: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x ♙ ♙ ♙
            1 ♖ . x x ♔ ♗ . ♖
              a b c d e f g h
          `,
      });
    });

    describe("invalid left castling", () => {
      it("does not castle when rook has already moved", () => {
        expectMoves({
          pieceCoord: "e1",
          board: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . ♙ ♙ ♙
            1 ♖ . . . ♔ ♗ . ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x ♙ ♙ ♙
            1 ♖ . . x ♔ ♗ . ♖
              a b c d e f g h
          `,
          modifyBoard(board) {
            getPieceAt(board, "a1")!.moved = true;
          },
        });
      });

      it("does not castle when king has already moved", () => {
        expectMoves({
          pieceCoord: "e1",
          board: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . ♙ ♙ ♙
            1 ♖ . . . ♔ ♗ . ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x ♙ ♙ ♙
            1 ♖ . . x ♔ ♗ . ♖
              a b c d e f g h
          `,
          modifyBoard(board) {
            getPieceAt(board, "e1")!.moved = true;
          },
        });
      });

      it("does not castle when king is being checked", () => {
        expectMoves({
          pieceCoord: "e1",
          board: `
            8 ♜ . . . ♚ . . .
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . ♜ . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . ♙ ♙ ♙
            1 ♖ . . . ♔ ♗ . ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ . . . ♚ . . .
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . ♜ . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x ♙ ♙ ♙
            1 ♖ . . x ♔ ♗ . ♖
              a b c d e f g h
          `,
        });
      });

      it("does not castle when opponent piece threatens to block the path", () => {
        expectMoves({
          pieceCoord: "e1",
          board: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . ♝
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . ♙ ♙ ♙
            1 ♖ . . . ♔ ♗ . ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . ♝
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x ♙ ♙ ♙
            1 ♖ . . x ♔ ♗ . ♖
              a b c d e f g h
          `,
        });

        expectMoves({
          pieceCoord: "e1",
          board: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . ♝ .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . ♙ ♙ ♙
            1 ♖ . . . ♔ ♗ . ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . ♝ .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x ♙ ♙ ♙
            1 ♖ . . x ♔ ♗ . ♖
              a b c d e f g h
          `,
        });

        expectMoves({
          pieceCoord: "e1",
          board: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . ♝ . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ . . . ♙ ♙ ♙
            1 ♖ . . . ♔ ♗ . ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . ♝ . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ . x x ♙ ♙ ♙
            1 ♖ . . x ♔ ♗ . ♖
              a b c d e f g h
          `,
        });
      });
    });

    it("castles right", () => {
      expectMoves({
        pieceCoord: "e1",
        board: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . ♙ ♙ ♙
            1 ♖ . . ♕ ♔ . . ♖
              a b c d e f g h
          `,
        expectedBoard: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x ♙ ♙ ♙
            1 ♖ . . ♕ ♔ x x ♖
              a b c d e f g h
          `,
      });
    });

    describe("invalid right castling", () => {
      it("does not castle when rook has already moved", () => {
        expectMoves({
          pieceCoord: "e1",
          board: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . ♙ ♙ ♙
            1 ♖ . . ♕ ♔ . . ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x ♙ ♙ ♙
            1 ♖ . . ♕ ♔ x . ♖
              a b c d e f g h
          `,
          modifyBoard(board) {
            getPieceAt(board, "h1")!.moved = true;
          },
        });
      });

      it("does not castle when king has already moved", () => {
        expectMoves({
          pieceCoord: "e1",
          board: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . ♙ ♙ ♙
            1 ♖ . . ♕ ♔ . . ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x ♙ ♙ ♙
            1 ♖ . . ♕ ♔ x . ♖
              a b c d e f g h
          `,
          modifyBoard(board) {
            getPieceAt(board, "e1")!.moved = true;
          },
        });
      });

      it("does not castle when king is being checked", () => {
        expectMoves({
          pieceCoord: "e1",
          board: `
            8 ♜ . . . ♚ . . .
            7 ♟ ♟ ♟ . ♜ ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . ♙ ♙ ♙
            1 ♖ . . ♕ ♔ . . ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ . . . ♚ . . .
            7 ♟ ♟ ♟ . ♜ ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x ♙ ♙ ♙
            1 ♖ . . ♕ ♔ x . ♖
              a b c d e f g h
          `,
        });
      });

      it("does not castle when opponent piece threatens to block the path", () => {
        expectMoves({
          pieceCoord: "e1",
          board: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . ♝ . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . ♙ ♙ ♙
            1 ♖ . . ♕ ♔ . . ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . ♝ . . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x ♙ ♙ ♙
            1 ♖ . . ♕ ♔ x . ♖
              a b c d e f g h
          `,
        });

        expectMoves({
          pieceCoord: "e1",
          board: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . ♝ . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ . . . ♙ ♙
            1 ♖ . . ♕ ♔ . . ♖
              a b c d e f g h
          `,
          expectedBoard: `
            8 ♜ . . . ♚ . . ♜
            7 ♟ ♟ ♟ . . ♟ ♟ ♟
            6 . . . . . . . .
            5 . . . . . . . .
            4 . . . ♝ . . . .
            3 . . . . . . . .
            2 ♙ ♙ ♙ x x x ♙ ♙
            1 ♖ . . ♕ ♔ x . ♖
              a b c d e f g h
          `,
        });
      });
    });
  });

  // TODO: preventCheck option
});

function boardToState(board: Board, options?: Partial<GameState>): GameState {
  return {
    board,
    currentPlayer: "white",
    log: [],
    possibleMoves: [],
    isPromotingPawn: false,
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
  modifyBoard,
}: {
  pieceCoord: CoordinateString;
  board: string;
  expectedBoard: string;
  log?: LogEntry[];
  modifyBoard?: (board: Board) => void;
}) {
  const board = stringToBoard(boardString);

  if (modifyBoard) modifyBoard(board);

  const possibleMoves = calculatePossibleMoves(
    board,
    stringToCoord(pieceCoord),
    { log }
  );

  const state = boardToState(board, { possibleMoves });

  expectedBoardString = expectedBoardString
    .trim()
    .split("\n")
    .map((line, y) => (y === 8 ? `  ${line.trim()}` : line.trim()))
    .join("\n");

  expect(boardToString(state.board, state.possibleMoves)).toEqual(
    expectedBoardString.trim()
  );
}
