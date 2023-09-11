import { produce } from "immer";
import { Coordinate, GameState, Move } from "./types";
import { calculatePossibleMoves } from "./moves";
import { hasCoordinate, isSameCoordinate, stringToBoard } from "./utils";
import { maybeHandleSpecialMove } from "./specialMoves";
import { isCheckMate } from "./check";
import { useReducer } from "react";

export type GameAction = { type: "CLICK_TILE"; coord: Coordinate };

export const useGame = () => useReducer(reducer, null, buildInitialState);

function buildInitialState(): GameState {
  const initialBoard = stringToBoard(`
    8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
    7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
    6 . . . . . . . .
    5 . . . . . . . .
    4 . . . . . . . .
    3 . . . . . . . .
    2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
    1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
      a b c d e f g h
  `);

  return {
    board: initialBoard,
    currentPlayer: "white",
    selectedPiece: null,
    winner: null,
    possibleMoves: [],
    log: [],
  };
}

function reducer(state: GameState, action: GameAction) {
  return produce(state, (state) => {
    switch (action.type) {
      case "CLICK_TILE":
        return tileClicked(state, action.coord);
    }
  });
}

// TODO: impedir roque
// TODO: transformar peão em outra peça quando chega no final do tabuleiro
// TODO: empate por afogamento
// TODO: empate se tiver apenas rei contra rei, empate se tiver apenas cavalo e rei, empate se tiver apenas bispo e rei, empate

function tileClicked(state: GameState, { x, y }: Coordinate) {
  const piece = state.board[y][x];

  if (piece && piece.color === state.currentPlayer) {
    selectPiece(state, { x, y });
  } else if (
    state.selectedPiece &&
    hasCoordinate(state.possibleMoves, { x, y })
  ) {
    play(state, { x, y });
  }
}

function selectPiece(state: GameState, { x, y }: Coordinate) {
  state.selectedPiece = { x, y };

  state.possibleMoves = calculatePossibleMoves(
    state.board,
    state.selectedPiece,
    { log: state.log, preventCheck: true }
  );
}

function play(state: GameState, to: Coordinate) {
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
