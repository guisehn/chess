import classNames from "classnames";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

import Image from "next/image";
import { Coordinate, GameState, Piece } from "@/game/types";
import { coordToString, hasCoordinate, isSameCoordinate } from "@/game/utils";
import { buildInitialState, play } from "@/game/game";
import { isCheck, isCheckMate } from "@/game/check";

const initialState = buildInitialState();

export default function Chess() {
  const [state, setState] = useState<GameState>(initialState);

  useEffect(() => {
    if (state.winner) {
      setTimeout(() => alert(`${state.winner} ganhou!`), 500);
    }
  }, [state.winner]);

  function handleTileClick({ x, y }: Coordinate) {
    if (state.winner) return;

    (document as any).startViewTransition(() => {
      flushSync(() => {
        setState(play(state, { x, y }));
      });
    });
  }

  return (
    <div>
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
                  <div className="absolute top-1 left-1 text-xs opacity-30">
                    {x},{y}
                  </div>
                  {piece && <Piece piece={piece} />}
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
      <div>
        IS CHECK? {JSON.stringify(isCheck(state.board, state.currentPlayer))}
        <br />
        IS CHECK MATE?{" "}
        {JSON.stringify(isCheckMate(state.board, state.currentPlayer))}
        <br />
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}

function Piece({ piece }: { piece: Piece }) {
  return (
    <Image
      src={`pieces/${piece.type}_${piece.color}.svg`}
      alt={`${piece.type} ${piece.color}`}
      width={80}
      height={80}
      className="block"
      style={{
        contain: "layout",
        viewTransitionName: piece.id,
      }}
    />
  );
}
