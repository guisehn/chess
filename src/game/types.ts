export type Color = "black" | "white";

export interface Piece {
  id: string;
  type: "rook" | "knight" | "bishop" | "pawn" | "queen" | "king";
  color: Color;
  moved: boolean;
}

export interface Coordinate {
  x: number;
  y: number;
}

export type Board = (Piece | null)[][];

export interface GameState {
  board: Board;
  currentPlayer: Color;
  winner: Color | null;
  selectedPiece: Coordinate | null;
  possibleMoves: Coordinate[];
  log: LogEntry[];
}

export interface LogEntry {
  from: Coordinate;
  to: Coordinate;
}

export type Move = Coordinate & { specialMove?: "castling" | "en_passant" };

export type PieceChar =
  | "♗"
  | "♝"
  | "♚"
  | "♔"
  | "♞"
  | "♘"
  | "♟"
  | "♙"
  | "♛"
  | "♕"
  | "♜"
  | "♖";
