import {
  Board,
  Coordinate,
  CoordinateString,
  GameState,
  Piece,
  PieceChar,
} from "./types";

const makeId = (() => {
  let n = 0;
  return () => {
    return "p" + ++n;
  };
})();

export function makePiece(piece: Omit<Piece, "id" | "moved">): Piece {
  return { ...piece, moved: false, id: makeId() };
}

export function isSameCoordinate(c1: Coordinate, c2: Coordinate) {
  return c1.x === c2.x && c1.y === c2.y;
}

export function hasCoordinate(list: Coordinate[], coordinate: Coordinate) {
  return list.some((item) => isSameCoordinate(item, coordinate));
}

export function findCoordinate(
  predicate: (coord: Coordinate) => boolean
): Coordinate | null {
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (predicate({ x, y })) {
        return { x, y };
      }
    }
  }

  return null;
}

export function findCoordinates(
  predicate: (coord: Coordinate) => boolean
): Coordinate[] {
  const coordinates = [];

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (predicate({ x, y })) {
        coordinates.push({ x, y });
      }
    }
  }

  return coordinates;
}

export function simulateMove(board: Board, from: Coordinate, to: Coordinate) {
  board = board.map((row) => [...row]); // clone it
  board[to.y][to.x] = board[from.y][from.x];
  board[from.y][from.x] = null;
  return board;
}

export function stateToBoardString(state: GameState) {
  return (
    state.board
      .map((row, y) => {
        const line = row
          .map((value, x) => {
            if (hasCoordinate(state.possibleMoves, { x, y })) return "x";

            if (!value) return ".";

            return pieceToChar(value);
          })
          .join(" ");

        return `${8 - y} ${line}`;
      })
      .join("\n") + "\n  a b c d e f g h"
  );
}

export function stringToBoard(str: string): Board {
  const board: Board = [];
  const lines = str.trim().split("\n");

  for (let y = 0; y < 8; y++) {
    const row: (Piece | null)[] = [];
    const line = (lines[y] ?? "").trim().split(" ");

    for (let x = 1; x <= 8; x++) {
      row.push(charToPiece((line[x] || ".") as PieceChar | "."));
    }

    board.push(row);
  }

  return board;
}

function charToPiece(char: PieceChar | "."): Piece | null {
  switch (char) {
    case ".":
      return null;
    case "♗":
      return makePiece({ type: "bishop", color: "white" });
    case "♝":
      return makePiece({ type: "bishop", color: "black" });
    case "♚":
      return makePiece({ type: "king", color: "black" });
    case "♔":
      return makePiece({ type: "king", color: "white" });
    case "♞":
      return makePiece({ type: "knight", color: "black" });
    case "♘":
      return makePiece({ type: "knight", color: "white" });
    case "♟":
      return makePiece({ type: "pawn", color: "black" });
    case "♙":
      return makePiece({ type: "pawn", color: "white" });
    case "♛":
      return makePiece({ type: "queen", color: "black" });
    case "♕":
      return makePiece({ type: "queen", color: "white" });
    case "♜":
      return makePiece({ type: "rook", color: "black" });
    case "♖":
      return makePiece({ type: "rook", color: "white" });
    default:
      throw new Error(`Unexpected char "${char}"`);
  }
}

function pieceToChar(piece: Piece): PieceChar {
  switch (piece.type) {
    case "bishop":
      return piece.color === "black" ? "♝" : "♗";
    case "king":
      return piece.color === "black" ? "♚" : "♔";
    case "knight":
      return piece.color === "black" ? "♞" : "♘";
    case "pawn":
      return piece.color === "black" ? "♟" : "♙";
    case "queen":
      return piece.color === "black" ? "♛" : "♕";
    case "rook":
      return piece.color === "black" ? "♜" : "♖";
  }
}

export function coordToString(coord: Coordinate): CoordinateString {
  return ("abcdefgh"[coord.x] + (8 - coord.y)) as CoordinateString;
}

export function stringToCoord(str: CoordinateString): Coordinate {
  const x = str.charCodeAt(0) - 97; // 97 = charcode for "a"
  const y = 8 - Number(str[1]);
  return { x, y };
}
