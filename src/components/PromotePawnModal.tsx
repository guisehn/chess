import { Dispatch, ReactNode } from "react";
import { GameAction } from "@/game/game";
import Piece from "./Piece";
import { GameState } from "@/game/types";

interface PromotePieceModalProps {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

export default function PromotePieceModal({
  state,
  dispatch,
}: PromotePieceModalProps) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-black bg-white rounded-lg p-4">
      <h1 className="text-center font-bold text-lg mb-2">Promote pawn</h1>
      <div className="flex gap-4">
        {(["queen", "rook", "bishop", "knight"] as const).map((piece) => (
          <Button onClick={() => dispatch({ type: "PROMOTE_PAWN", to: piece })}>
            <Piece piece={{ type: piece, color: state.currentPlayer }} />
          </Button>
        ))}
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="hover:bg-stone-200 active:bg-stone-300 rounded-lg"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
