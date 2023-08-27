import { Board, Color, Move } from "./types";

export function maybeHandleSpecialMove(
  board: Board,
  move: Move,
  currentPlayer: Color
) {
  switch (move.specialMove) {
    case "castling":
      handleCastling(board, move);

    case "en_passant":
      handleEnPassant(board, move, currentPlayer);
  }
}

function handleCastling(board: Board, move: Move) {
  if (move.x === 2) {
    board[move.y][3] = board[move.y][0];
    board[move.y][0] = null;
  }

  if (move.x === 6) {
    board[move.y][5] = board[move.y][7];
    board[move.y][7] = null;
  }
}

function handleEnPassant(board: Board, move: Move, currentPlayer: Color) {
  if (currentPlayer === "white") {
    board[move.y + 1][move.x] = null;
  } else {
    board[move.y - 1][move.x] = null;
  }
}
