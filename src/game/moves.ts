import { isCheck } from "./check";
import { Board, Color, Coordinate, LogEntry, Move, Piece } from "./types";
import { findCoordinates, hasCoordinate, simulateMove } from "./utils";

/**
 * Calculate possible moves for a piece on the board.
 * Options:
 * - log: used for en passant calculation
 * - nestedCalculation: prevents infinite loop on castling calculation
 * - preventCheck: prevent moves that cause player to be or remain checked
 */
export function calculatePossibleMoves(
  board: Board,
  pieceCoord: Coordinate,
  options?: {
    log?: LogEntry[];
    nestedCalculation?: boolean;
    preventCheck?: boolean;
  }
): Move[] {
  const {
    log,
    nestedCalculation = false,
    preventCheck = false,
  } = options ?? {};

  const { x, y } = pieceCoord;
  const selectedPiece = board[y][x];
  if (!selectedPiece) throw new Error(`No player at ${x}, ${y}`);

  let moves: Move[];

  switch (selectedPiece.type) {
    case "pawn":
      moves = calculatePawnMoves(board, { x, y }, selectedPiece.color, log);
      break;

    case "knight":
      moves = calculateKnightMoves(board, { x, y }, selectedPiece.color);
      break;

    case "rook":
      moves = calculateRookMoves(board, { x, y }, selectedPiece.color);
      break;

    case "bishop":
      moves = calculateBishopMoves(board, { x, y }, selectedPiece.color);
      break;

    case "queen":
      moves = calculateQueenMoves(board, { x, y }, selectedPiece.color);
      break;

    case "king":
      moves = calculateKingMoves(
        board,
        { x, y },
        selectedPiece,
        nestedCalculation
      );
      break;

    default:
      moves = [];
  }

  if (preventCheck) {
    moves = moves.filter((move) => {
      const simulatedBoard = simulateMove(board, { x, y }, move);
      return !isCheck(simulatedBoard, selectedPiece.color);
    });
  }

  return moves;
}

function calculatePawnMoves(
  board: Board,
  { x, y }: Coordinate,
  color: Color,
  log?: LogEntry[]
) {
  const moves: Move[] = [];

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
    if (y === 3 && log) {
      const lastMove: LogEntry = log[log.length - 1];
      const { from, to } = lastMove;
      const movedPiece = board[to.y][to.x];

      if (
        movedPiece &&
        movedPiece.color === "black" &&
        movedPiece.type === "pawn" &&
        to.y === 3 &&
        from.y === 1
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
    if (y === 4 && log) {
      const lastMove: LogEntry = log[log.length - 1];
      const { from, to } = lastMove;
      const movedPiece = board[to.y][to.x];

      if (
        movedPiece &&
        movedPiece.color === "white" &&
        movedPiece.type === "pawn" &&
        to.y === 4 &&
        from.y === 6
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

function calculateKnightMoves(
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

function calculateRookMoves(board: Board, { x, y }: Coordinate, color: Color) {
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

function calculateBishopMoves(
  board: Board,
  { x, y }: Coordinate,
  color: Color
) {
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

function calculateQueenMoves(board: Board, coord: Coordinate, color: Color) {
  const rookMoves = calculateRookMoves(board, coord, color);
  const bishopMoves = calculateBishopMoves(board, coord, color);

  return rookMoves.concat(bishopMoves);
}

function calculateKingMoves(
  board: Board,
  { x, y }: Coordinate,
  piece: Piece,
  nestedCalculation: boolean
) {
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
  if (!nestedCalculation && !piece.moved) {
    const opponentCoords = findCoordinates(
      ({ x, y }) => board[y][x] !== null && board[y][x]!.color !== piece.color
    );

    const allOpponentMoves = opponentCoords
      .map((coord) =>
        calculatePossibleMoves(board, coord, { nestedCalculation: true })
      )
      .flat();

    const leftRook = board[y][0];
    if (
      leftRook &&
      leftRook.type === "rook" &&
      leftRook.color === piece.color &&
      !leftRook.moved &&
      !board[y][1] &&
      !board[y][2] &&
      !board[y][3] &&
      !hasCoordinate(allOpponentMoves, { x: 1, y }) &&
      !hasCoordinate(allOpponentMoves, { x: 2, y }) &&
      !hasCoordinate(allOpponentMoves, { x: 3, y })
    ) {
      moves.push({ x: 2, y, specialMove: "castling" });
    }

    const rightRook = board[y][7];
    if (
      rightRook &&
      rightRook.type === "rook" &&
      rightRook.color === piece.color &&
      !rightRook.moved &&
      !board[y][5] &&
      !board[y][6] &&
      !hasCoordinate(allOpponentMoves, { x: 5, y }) &&
      !hasCoordinate(allOpponentMoves, { x: 6, y })
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
