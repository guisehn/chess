import Image from "next/image";

import { Piece as GamePiece } from "@/game/types";
import classNames from "classnames";

interface PieceProps {
  piece: Omit<GamePiece, "moved">;
  viewTransition?: boolean;
  className?: string;
}

export default function Piece({
  piece,
  className,
  viewTransition = false,
}: PieceProps) {
  return (
    <Image
      src={`pieces/${piece.type}_${piece.color}.svg`}
      alt={`${piece.type} ${piece.color}`}
      width={70}
      height={70}
      className={classNames("block", className)}
      draggable={false}
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
