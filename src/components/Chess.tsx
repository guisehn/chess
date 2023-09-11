import { useEffect } from "react";

import { useGame } from "@/game/game";
import Board from "./Board";
import PromotePawnModal from "./PromotePawnModal";

export default function Chess() {
  const [state, dispatch] = useGame();

  useEffect(() => {
    if (state.winner) {
      setTimeout(() => alert(`${state.winner} ganhou!`), 500);
    }
  }, [state.winner]);

  return (
    <div>
      <div>
        <Board state={state} dispatch={dispatch} />
        {state.isPromotingPawn && (
          <PromotePawnModal state={state} dispatch={dispatch} />
        )}
        {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      </div>
    </div>
  );
}
