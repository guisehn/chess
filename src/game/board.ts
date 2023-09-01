import { Board } from "./types";
import { stringToBoard } from "./utils";

export const initialBoard: Board = stringToBoard(`
♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
. . . . . . . .
. . . . . . . .
. . . . . . . .
. . . . . . . .
♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
`);

// Board can also be mounted manually.
// Example:
//
// [
//   [
//     makePiece({ type: "rook", color: "black" }),
//     makePiece({ type: "knight", color: "black" }),
//     makePiece({ type: "bishop", color: "black" }),
//     makePiece({ type: "queen", color: "black" }),
//     makePiece({ type: "king", color: "black" }),
//     makePiece({ type: "bishop", color: "black" }),
//     makePiece({ type: "knight", color: "black" }),
//     makePiece({ type: "rook", color: "black" }),
//   ],
//   [
//     makePiece({ type: "pawn", color: "black" }),
//     makePiece({ type: "pawn", color: "black" }),
//     makePiece({ type: "pawn", color: "black" }),
//     makePiece({ type: "pawn", color: "black" }),
//     makePiece({ type: "pawn", color: "black" }),
//     makePiece({ type: "pawn", color: "black" }),
//     makePiece({ type: "pawn", color: "black" }),
//     makePiece({ type: "pawn", color: "black" }),
//   ],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [
//     makePiece({ type: "pawn", color: "white" }),
//     makePiece({ type: "pawn", color: "white" }),
//     makePiece({ type: "pawn", color: "white" }),
//     makePiece({ type: "pawn", color: "white" }),
//     makePiece({ type: "pawn", color: "white" }),
//     makePiece({ type: "pawn", color: "white" }),
//     makePiece({ type: "pawn", color: "white" }),
//     makePiece({ type: "pawn", color: "white" }),
//   ],
//   [
//     makePiece({ type: "rook", color: "white" }),
//     makePiece({ type: "knight", color: "white" }),
//     makePiece({ type: "bishop", color: "white" }),
//     makePiece({ type: "queen", color: "white" }),
//     makePiece({ type: "king", color: "white" }),
//     makePiece({ type: "bishop", color: "white" }),
//     makePiece({ type: "knight", color: "white" }),
//     makePiece({ type: "rook", color: "white" }),
//   ],
// ];
