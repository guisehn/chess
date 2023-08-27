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
    makePiece({ type: "torre", color: "black" }),
    makePiece({ type: "cavalo", color: "black" }),
    makePiece({ type: "bispo", color: "black" }),
    makePiece({ type: "rainha", color: "black" }),
    makePiece({ type: "rei", color: "black" }),
    makePiece({ type: "bispo", color: "black" }),
    makePiece({ type: "cavalo", color: "black" }),
    makePiece({ type: "torre", color: "black" }),
  ],
  [
    makePiece({ type: "peao", color: "black" }),
    makePiece({ type: "peao", color: "black" }),
    makePiece({ type: "peao", color: "black" }),
    makePiece({ type: "peao", color: "black" }),
    makePiece({ type: "peao", color: "black" }),
    makePiece({ type: "peao", color: "black" }),
    makePiece({ type: "peao", color: "black" }),
    makePiece({ type: "peao", color: "black" }),
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    makePiece({ type: "peao", color: "white" }),
    makePiece({ type: "peao", color: "white" }),
    makePiece({ type: "peao", color: "white" }),
    makePiece({ type: "peao", color: "white" }),
    makePiece({ type: "peao", color: "white" }),
    makePiece({ type: "peao", color: "white" }),
    makePiece({ type: "peao", color: "white" }),
    makePiece({ type: "peao", color: "white" }),
  ],
  [
    makePiece({ type: "torre", color: "white" }),
    makePiece({ type: "cavalo", color: "white" }),
    makePiece({ type: "bispo", color: "white" }),
    makePiece({ type: "rainha", color: "white" }),
    makePiece({ type: "rei", color: "white" }),
    makePiece({ type: "bispo", color: "white" }),
    makePiece({ type: "cavalo", color: "white" }),
    makePiece({ type: "torre", color: "white" }),
  ],
];

// export const initialBoard: Board = [
//   [
//     makePiece({ type: "torre", color: "black" }),
//     null,
//     null,
//     null,
//     makePiece({ type: "rei", color: "black" }),
//     null,
//     null,
//     makePiece({ type: "torre", color: "black" }),
//   ],
//   [
//     makePiece({ type: "peao", color: "black" }),
//     makePiece({ type: "peao", color: "black" }),
//     makePiece({ type: "peao", color: "black" }),
//     null,
//     null,
//     makePiece({ type: "peao", color: "black" }),
//     makePiece({ type: "peao", color: "black" }),
//     makePiece({ type: "peao", color: "black" }),
//   ],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null],
//   [
//     makePiece({ type: "peao", color: "white" }),
//     makePiece({ type: "peao", color: "white" }),
//     makePiece({ type: "peao", color: "white" }),
//     null,
//     null,
//     makePiece({ type: "peao", color: "white" }),
//     makePiece({ type: "peao", color: "white" }),
//     makePiece({ type: "peao", color: "white" }),
//   ],
//   [
//     makePiece({ type: "torre", color: "white" }),
//     null,
//     null,
//     null,
//     makePiece({ type: "rei", color: "white" }),
//     null,
//     null,
//     makePiece({ type: "torre", color: "white" }),
//   ],
// ];

// export const initialBoard: Board = [
//   [null, null, null, null, null, null, null, null],
//   [
//     makePiece({ type: "peao", color: "black" }),
//     makePiece({ type: "peao", color: "black" }),
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
//     makePiece({ type: "peao", color: "white" }),
//     makePiece({ type: "peao", color: "white" }),
//   ],
//   [null, null, null, null, null, null, null, null],
// ];
