import { Board, Color, Coordinate, LogEntry, Move, Piece } from "./types";
import { simulateMove } from "./utils";

export function calculatePossibleMoves(
  board: Board,
  { x, y }: Coordinate,
  log: LogEntry[]
): Move[] {
  const selectedPiece = board[y][x]!;

  switch (selectedPiece.type) {
    case "peao":
      return calculatePeaoMoves(board, { x, y }, selectedPiece.color, log);

    case "cavalo":
      return calculateCavaloMoves(board, { x, y }, selectedPiece.color);

    case "torre":
      return calculateTorreMoves(board, { x, y }, selectedPiece.color);

    case "bispo":
      return calculateBispoMoves(board, { x, y }, selectedPiece.color);

    case "rainha":
      return calculateRainhaMoves(board, { x, y }, selectedPiece.color);

    case "rei":
      return calculateReiMoves(board, { x, y }, selectedPiece);

    default:
      return [];
  }
}

function calculatePeaoMoves(
  board: Board,
  { x, y }: Coordinate,
  color: Color,
  log: LogEntry[]
) {
  const moves: Move[] = [];
  const lastMove: LogEntry | undefined = log[log.length - 1];

  if (color === "white") {
    if (board[y - 1][x] === null) moves.push({ x, y: y - 1 });

    // jogada inicial (2)
    if (y === 6 && board[y - 1][x] === null && board[y - 2][x] === null) {
      moves.push({ x, y: y - 2 });
    }

    // diagonal
    if (board[y - 1][x + 1]?.color === "black") {
      moves.push({ x: x + 1, y: y - 1 });
    }

    // diagonal
    if (board[y - 1][x - 1]?.color === "black") {
      moves.push({ x: x - 1, y: y - 1 });
    }

    // en passant
    if (lastMove) {
      const { to } = lastMove;
      const movedPiece = board[to.y][to.x];

      if (
        movedPiece &&
        movedPiece.color === "black" &&
        movedPiece.type === "peao" &&
        to.y === y
      ) {
        if (to.x === x - 1) {
          moves.push({ x: x - 1, y: y - 1, specialMove: "en_passant" });
        } else if (to.x === x + 1) {
          moves.push({ x: x + 1, y: y - 1, specialMove: "en_passant" });
        }
      }
    }
  } else {
    if (board[y + 1][x] === null) {
      moves.push({ x, y: y + 1 });
    }

    // jogada inicial (2)
    if (y === 1 && board[y + 1][x] === null && board[y + 2][x] === null) {
      moves.push({ x, y: y + 2 });
    }

    // diagonal
    if (board[y + 1][x + 1]?.color === "white") {
      moves.push({ x: x + 1, y: y + 1 });
    }

    // diagonal
    if (board[y + 1][x - 1]?.color === "white") {
      moves.push({ x: x - 1, y: y + 1 });
    }

    // en passant
    if (lastMove) {
      const { to } = lastMove;
      const movedPiece = board[to.y][to.x];

      if (
        movedPiece &&
        movedPiece.color === "white" &&
        movedPiece.type === "peao" &&
        to.y === y
      ) {
        if (to.x === x - 1) {
          moves.push({ x: x - 1, y: y + 1, specialMove: "en_passant" });
        } else if (to.x === x + 1) {
          moves.push({ x: x + 1, y: y + 1, specialMove: "en_passant" });
        }
      }
    }
  }

  return moves;
}

function calculateCavaloMoves(
  board: Board,
  { x, y }: Coordinate,
  color: Color
) {
  const moves: Coordinate[] = [];

  moves.push({ x: x - 1, y: y - 2 });
  moves.push({ x: x + 1, y: y - 2 });
  moves.push({ x: x + 2, y: y - 1 });
  moves.push({ x: x - 2, y: y - 1 });

  moves.push({ x: x + 2, y: y + 1 });
  moves.push({ x: x - 2, y: y + 1 });
  moves.push({ x: x - 1, y: y + 2 });
  moves.push({ x: x + 1, y: y + 2 });

  // só pode mover se a casa estiver vazia, ou se houver uma peça de outra cor (mata ela)
  return moves.filter(
    (move) =>
      board[move.y] &&
      (board[move.y][move.x] === null || board[move.y][move.x]?.color !== color)
  );
}

function calculateTorreMoves(board: Board, { x, y }: Coordinate, color: Color) {
  const moves: Coordinate[] = [];

  for (let yy = y - 1; yy >= 0; yy--) {
    if (board[yy][x]?.color === color) break;
    moves.push({ x, y: yy });
    if (board[yy][x] && board[yy][x]?.color !== color) break;
  }

  for (let yy = y + 1; yy <= 7; yy++) {
    if (board[yy][x]?.color === color) break;
    moves.push({ x, y: yy });
    if (board[yy][x] && board[yy][x]?.color !== color) break;
  }

  for (let xx = x + 1; xx <= 7; xx++) {
    if (board[y][xx]?.color === color) break;
    moves.push({ x: xx, y });
    if (board[y][xx] && board[x][xx]?.color !== color) break;
  }

  for (let xx = x - 1; xx >= 0; xx--) {
    if (board[y][xx]?.color === color) break;
    moves.push({ x: xx, y });
    if (board[y][xx] && board[x][xx]?.color !== color) break;
  }

  return moves;
}

function calculateBispoMoves(board: Board, { x, y }: Coordinate, color: Color) {
  const moves: Coordinate[] = [];

  for (let xx = x - 1, yy = y - 1; xx >= 0 && yy >= 0; xx--, yy--) {
    if (board[yy][xx]?.color === color) break;
    moves.push({ x: xx, y: yy });
    if (board[yy][xx] && board[yy][xx]?.color !== color) break;
  }

  for (let xx = x + 1, yy = y - 1; xx <= 7 && yy >= 0; xx++, yy--) {
    if (board[yy][xx]?.color === color) break;
    moves.push({ x: xx, y: yy });
    if (board[yy][xx] && board[yy][xx]?.color !== color) break;
  }

  for (let xx = x - 1, yy = y + 1; xx >= 0 && yy <= 7; xx--, yy++) {
    if (board[yy][xx]?.color === color) break;
    moves.push({ x: xx, y: yy });
    if (board[yy][xx] && board[yy][xx]?.color !== color) break;
  }

  for (let xx = x + 1, yy = y + 1; xx <= 7 && yy <= 7; xx++, yy++) {
    if (board[yy][xx]?.color === color) break;
    moves.push({ x: xx, y: yy });
    if (board[yy][xx] && board[yy][xx]?.color !== color) break;
  }

  return moves;
}

function calculateRainhaMoves(board: Board, coord: Coordinate, color: Color) {
  const torreMoves = calculateTorreMoves(board, coord, color);
  const bispoMoves = calculateBispoMoves(board, coord, color);

  return torreMoves.concat(bispoMoves);
}

function calculateReiMoves(board: Board, { x, y }: Coordinate, piece: Piece) {
  const moves: Move[] = [];

  moves.push({ x: x - 1, y: y - 1 });
  moves.push({ x, y: y - 1 });
  moves.push({ x: x + 1, y: y - 1 });

  moves.push({ x: x - 1, y });
  moves.push({ x: x + 1, y });

  moves.push({ x: x - 1, y: y + 1 });
  moves.push({ x, y: y + 1 });
  moves.push({ x: x + 1, y: y + 1 });

  // TODO: se tiver em check, não pode
  // TODO: se tiver peça ameaçando, não pode
  if (!piece.moved) {
    const leftRook = board[y][0];
    if (
      leftRook &&
      leftRook.type === "torre" &&
      leftRook.color === piece.color &&
      !leftRook.moved &&
      !board[y][1] &&
      !board[y][2] &&
      !board[y][3]
    ) {
      moves.push({ x: 2, y, specialMove: "castling" });
    }

    const rightRook = board[y][7];
    if (
      rightRook &&
      rightRook.type === "torre" &&
      rightRook.color === piece.color &&
      !rightRook.moved &&
      !board[y][5] &&
      !board[y][6]
    ) {
      moves.push({ x: 6, y, specialMove: "castling" });
    }
  }

  // só pode mover se a casa estiver vazia, ou se houver uma peça de outra cor (mata ela)
  return moves.filter(
    (move) =>
      board[move.y] &&
      (board[move.y][move.x] === null ||
        board[move.y][move.x]?.color !== piece.color)
  );
}
