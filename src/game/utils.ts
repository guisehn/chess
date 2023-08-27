import { Board, Coordinate } from "./types";

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
