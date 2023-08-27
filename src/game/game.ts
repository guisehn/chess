import { produce } from "immer";
import { Coordinate, GameState, Move } from "./types";
import { calculatePossibleMoves } from "./moves";
import { hasCoordinate, isSameCoordinate, simulateMove } from "./utils";
import { initialBoard } from "./board";
import { maybeHandleSpecialMove } from "./specialMoves";
import { isCheck, isCheckMate } from "./check";

export function buildInitialState(): GameState {
  return {
    board: initialBoard,
    currentPlayer: "white",
    selectedPiece: null,
    winner: null,
    possibleMoves: [],
    log: [],
  };
}

// TODO: impedir roque
// TODO: cravada
// TODO: transformar peão em outra peça qdo chega no final do tabuleiro

export function play(state: GameState, { x, y }: Coordinate) {
  return produce(state, (state) => {
    const piece = state.board[y][x];

    if (piece && piece.color === state.currentPlayer) {
      selectPiece(state, { x, y });
    } else if (
      state.selectedPiece &&
      hasCoordinate(state.possibleMoves, { x, y })
    ) {
      doPlay(state, { x, y });
    }
  });
}

function selectPiece(state: GameState, { x, y }: Coordinate) {
  state.selectedPiece = { x, y };

  state.possibleMoves = calculatePossibleMoves(
    state.board,
    state.selectedPiece,
    state.log
  );

  if (isCheck(state.board, state.currentPlayer)) {
    state.possibleMoves = state.possibleMoves.filter((move) => {
      const simulatedBoard = simulateMove(state.board, { x, y }, move);
      return !isCheck(simulatedBoard, state.currentPlayer);
    });
  }
}

function doPlay(state: GameState, to: Coordinate) {
  if (!state.selectedPiece) return;

  const from = state.selectedPiece;

  state.board[to.y][to.x] = state.board[from.y][from.x];
  state.board[to.y][to.x]!.moved = true;

  state.board[from.y][from.x] = null;

  const move = state.possibleMoves.find((move) =>
    isSameCoordinate(move, to)
  ) as Move;

  maybeHandleSpecialMove(state.board, move, state.currentPlayer);

  state.possibleMoves = [];
  state.selectedPiece = null;

  state.log.push({ from, to });

  if (state.currentPlayer === "white") {
    state.currentPlayer = "black";
  } else {
    state.currentPlayer = "white";
  }

  if (isCheckMate(state.board, state.currentPlayer)) {
    state.winner = state.currentPlayer === "white" ? "black" : "white";
  }
}
