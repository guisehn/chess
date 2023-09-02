import { calculatePossibleMoves } from "./moves";
import { Board, Color } from "./types";
import {
  findCoordinate,
  findCoordinates,
  hasCoordinate,
  simulateMove,
} from "./utils";

export function isCheck(board: Board, color: Color) {
  const kingCoord = findCoordinate(
    ({ x, y }) => board[y][x]?.type === "king" && board[y][x]?.color === color
  );

  if (!kingCoord) throw new Error("King not found");

  const opponentCoords = findCoordinates(
    ({ x, y }) => board[y][x] !== null && board[y][x]!.color !== color
  );

  for (const pieceCoord of opponentCoords) {
    // TODO: preciso passar log entry aqui? só preciso se um en passant pudesse
    // salvar de um check
    const moves = calculatePossibleMoves(board, pieceCoord);

    if (hasCoordinate(moves, kingCoord)) {
      return true;
    }
  }

  return false;
}

export function isCheckMate(board: Board, color: Color) {
  if (!isCheck(board, color)) {
    return false;
  }

  const myCoords = findCoordinates(({ x, y }) => board[y][x]?.color === color);

  for (const pieceCoord of myCoords) {
    // TODO: preciso passar log entry aqui? só preciso se um en passant pudesse
    // salvar de um check
    const moves = calculatePossibleMoves(board, pieceCoord);

    for (const move of moves) {
      const simulatedBoard = simulateMove(board, pieceCoord, move);

      if (!isCheck(simulatedBoard, color)) {
        return false;
      }
    }
  }

  return true;
}
