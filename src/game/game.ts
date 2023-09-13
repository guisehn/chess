import { produce } from "immer";
import { Coordinate, GameState, Move } from "./types";
import { calculatePossibleMoves } from "./moves";
import { hasCoordinate, isSameCoordinate, stringToBoard } from "./utils";
import { maybeHandleSpecialMove } from "./specialMoves";
import { isCheckMate } from "./check";
import { useReducer } from "react";

type ClickTileAction = { type: "CLICK_TILE"; coord: Coordinate };

type PromotePawnAction = {
  type: "PROMOTE_PAWN";
  to: "queen" | "rook" | "bishop" | "knight";
};

export type GameAction = ClickTileAction | PromotePawnAction;

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
    isPromotingPawn: false,
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
      case "PROMOTE_PAWN":
        return promotePawn(state, action.to);
    }
  });
}

function tileClicked(state: GameState, { x, y }: Coordinate) {
  if (state.isPromotingPawn || state.winner) return;

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

function promotePawn(state: GameState, type: PromotePawnAction["to"]) {
  if (!state.isPromotingPawn) return;

  const { x, y } = state.selectedPiece!;

  state.board[y][x]!.type = type;
  state.isPromotingPawn = false;

  nextRound(state);
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

  maybeHandleSpecialMove(state, move);

  state.possibleMoves = [];
  state.log.push({ from, to });

  if (state.isPromotingPawn) {
    state.selectedPiece = to;
  } else {
    nextRound(state);
  }
}

function nextRound(state: GameState) {
  const nextPlayer = state.currentPlayer === "white" ? "black" : "white";

  if (isCheckMate(state.board, nextPlayer)) {
    state.winner = state.currentPlayer;
    return;
  }

  state.currentPlayer = nextPlayer;
  state.selectedPiece = null;
}
