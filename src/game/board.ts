import { Board, Piece } from "./types";

const makeId = (() => {
  let n = 0;
  return () => {
    return "p" + ++n;
  };
})();

export function makePiece(piece: Omit<Piece, "id" | "moved">): Piece {
  return { ...piece, moved: false, id: makeId() };
}

export const initialBoard: Board = [
  [
    makePiece({ type: "rook", color: "black" }),
    makePiece({ type: "knight", color: "black" }),
    makePiece({ type: "bishop", color: "black" }),
    makePiece({ type: "queen", color: "black" }),
    makePiece({ type: "king", color: "black" }),
    makePiece({ type: "bishop", color: "black" }),
    makePiece({ type: "knight", color: "black" }),
    makePiece({ type: "rook", color: "black" }),
  ],
  [
    makePiece({ type: "pawn", color: "black" }),
    makePiece({ type: "pawn", color: "black" }),
    makePiece({ type: "pawn", color: "black" }),
    makePiece({ type: "pawn", color: "black" }),
    makePiece({ type: "pawn", color: "black" }),
    makePiece({ type: "pawn", color: "black" }),
    makePiece({ type: "pawn", color: "black" }),
    makePiece({ type: "pawn", color: "black" }),
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    makePiece({ type: "pawn", color: "white" }),
    makePiece({ type: "pawn", color: "white" }),
    makePiece({ type: "pawn", color: "white" }),
    makePiece({ type: "pawn", color: "white" }),
    makePiece({ type: "pawn", color: "white" }),
    makePiece({ type: "pawn", color: "white" }),
    makePiece({ type: "pawn", color: "white" }),
    makePiece({ type: "pawn", color: "white" }),
  ],
  [
    makePiece({ type: "rook", color: "white" }),
    makePiece({ type: "knight", color: "white" }),
    makePiece({ type: "bishop", color: "white" }),
    makePiece({ type: "queen", color: "white" }),
    makePiece({ type: "king", color: "white" }),
    makePiece({ type: "bishop", color: "white" }),
    makePiece({ type: "knight", color: "white" }),
    makePiece({ type: "rook", color: "white" }),
  ],
];

// export const initialBoard: Board = [
//   [
//     makePiece({ type: "rook", color: "black" }),
//     null,
//     null,
//     null,
//     makePiece({ type: "king", color: "black" }),
//     null,
//     null,
//     makePiece({ type: "rook", color: "black" }),
//   ],
//   [
//     makePiece({ type: "pawn", color: "black" }),
//     makePiece({ type: "pawn", color: "black" }),
//     makePiece({ type: "pawn", color: "black" }),
//     null,
//     null,
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
//     null,
//     null,
//     makePiece({ type: "pawn", color: "white" }),
//     makePiece({ type: "pawn", color: "white" }),
//     makePiece({ type: "pawn", color: "white" }),
//   ],
//   [
//     makePiece({ type: "rook", color: "white" }),
//     null,
//     null,
//     null,
//     makePiece({ type: "king", color: "white" }),
//     null,
//     null,
//     makePiece({ type: "rook", color: "white" }),
//   ],
// ];

// export const initialBoard: Board = [
//   [null, null, null, null, null, null, null, null],
//   [
//     makePiece({ type: "pawn", color: "black" }),
//     makePiece({ type: "pawn", color: "black" }),
//     null,
//     null,
//     null,
//     null,
//     null,
//     null,
//   ],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [
//     null,
//     null,
//     null,
//     null,
//     null,
//     null,
//     makePiece({ type: "pawn", color: "white" }),
//     makePiece({ type: "pawn", color: "white" }),
//   ],
//   [null, null, null, null, null, null, null, null],
// ];
