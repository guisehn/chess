import Image from "next/image";

import { Piece as GamePiece } from "@/game/types";

interface PieceProps {
  piece: Omit<GamePiece, "moved">;
  viewTransition?: boolean;
}

export default function Piece({ piece, viewTransition = false }: PieceProps) {
  return (
    <Image
      src={`pieces/${piece.type}_${piece.color}.svg`}
      alt={`${piece.type} ${piece.color}`}
      width={80}
      height={80}
      className="block"
      style={
        viewTransition
          ? {
              contain: "layout",
              viewTransitionName: piece.id,
            }
          : undefined
      }
    />
  );
}
