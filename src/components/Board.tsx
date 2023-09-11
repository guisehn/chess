import { Dispatch } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import classNames from "classnames";

import { GameAction } from "@/game/game";
import { Coordinate, GameState } from "@/game/types";
import { hasCoordinate, isSameCoordinate } from "@/game/utils";
import Piece from "./Piece";

interface BoardProps {
  state: GameState;
  dispatch: Dispatch<GameAction>;
}

export default function Board({ state, dispatch }: BoardProps) {
  function handleTileClick({ x, y }: Coordinate) {
    (document as any).startViewTransition(() => {
      flushSync(() => {
        dispatch({ type: "CLICK_TILE", coord: { x, y } });
      });
    });
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-[700px]">
        {state.board.map((row, y) => (
          <div
            key={y}
            className={classNames("grid grid-cols-9 bg-yellow-400", {
              "[&>*:nth-child(even)]:bg-yellow-600": y % 2 === 0,
              "[&>*:nth-child(odd)]:bg-yellow-600": y % 2 !== 0,
            })}
          >
            <div className="!bg-white justify-end items-center flex p-4 text-xs">
              {8 - y}
            </div>
            {row.map((piece, x) => (
              <div
                key={x}
                className={classNames(
                  "h-20 flex items-center justify-center relative",
                  {
                    "!bg-red-500":
                      state.selectedPiece &&
                      isSameCoordinate(state.selectedPiece, {
                        x,
                        y,
                      }),
                    "!bg-green-500": hasCoordinate(state.possibleMoves, {
                      x,
                      y,
                    }),
                  }
                )}
                onClick={() => handleTileClick({ x, y })}
              >
                {piece && <Piece piece={piece} viewTransition={true} />}
              </div>
            ))}
          </div>
        ))}
        <div className="grid grid-cols-9 text-xs [&>div]:p-2 [&>div]:text-center">
          <div></div>
          <div>a</div>
          <div>b</div>
          <div>c</div>
          <div>d</div>
          <div>e</div>
          <div>f</div>
          <div>g</div>
          <div>h</div>
        </div>
      </div>
    </div>
  );
}
