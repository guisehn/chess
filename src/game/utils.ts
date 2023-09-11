import { Board, Coordinate, CoordinateString, Piece, PieceChar } from "./types";

export function buildIdGenerator() {
  let n = 0;
  return () => "p" + ++n;
}

const idGenerator = buildIdGenerator();

export function makePiece(
  piece: Omit<Piece, "id" | "moved"> & { id?: string }
): Piece {
  return { ...piece, moved: false, id: piece.id ?? idGenerator() };
}

export function stringToBoard(
  str: string,
  generateId: () => string = idGenerator
): Board {
  const board: Board = [];
  const lines = str.trim().split("\n");

  for (let y = 0; y < 8; y++) {
    const row: (Piece | null)[] = [];
    const line = (lines[y] ?? "").trim().split(" ");

    for (let x = 1; x <= 8; x++) {
      let id;
      if (line[x] !== ".") id = generateId();
      row.push(charToPiece(line[x] as PieceChar | ".", id));
    }

    board.push(row);
  }

  return board;
}

export function boardToString(
  board: Board,
  highlightCoordinates?: Coordinate[]
) {
  return (
    board
      .map((row, y) => {
        const line = row
          .map((value, x) => {
            if (
              highlightCoordinates &&
              hasCoordinate(highlightCoordinates, { x, y })
            ) {
              return "x";
            }

            if (!value) return ".";

            return pieceToChar(value);
          })
          .join(" ");

        return `${8 - y} ${line}`;
      })
      .join("\n") + "\n  a b c d e f g h"
  );
}

export function isSameCoordinate(c1: Coordinate, c2: Coordinate) {
  return c1.x === c2.x && c1.y === c2.y;
}

export function hasCoordinate(list: Coordinate[], coordinate: Coordinate) {
  return list.some((item) => isSameCoordinate(item, coordinate));
}

export function getPieceAt(board: Board, coordString: CoordinateString) {
  const { x, y } = stringToCoord(coordString);
  return board[y][x];
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

function charToPiece(char: PieceChar | ".", id?: string): Piece | null {
  switch (char) {
    case ".":
      return null;
    case "♗":
      return makePiece({ type: "bishop", color: "white", id });
    case "♝":
      return makePiece({ type: "bishop", color: "black", id });
    case "♚":
      return makePiece({ type: "king", color: "black", id });
    case "♔":
      return makePiece({ type: "king", color: "white", id });
    case "♞":
      return makePiece({ type: "knight", color: "black", id });
    case "♘":
      return makePiece({ type: "knight", color: "white", id });
    case "♟":
      return makePiece({ type: "pawn", color: "black", id });
    case "♙":
      return makePiece({ type: "pawn", color: "white", id });
    case "♛":
      return makePiece({ type: "queen", color: "black", id });
    case "♕":
      return makePiece({ type: "queen", color: "white", id });
    case "♜":
      return makePiece({ type: "rook", color: "black", id });
    case "♖":
      return makePiece({ type: "rook", color: "white", id });
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
