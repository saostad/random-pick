import React from "react";
import { useGameContext } from "../contexts/GameContext";
import FlexibleModal from "./FlexibleModal";
import CarbonRenew from "~icons/carbon/renew.jsx";

const NewGameButton: React.FC = () => {
  const { resetGameState, softResetGameState } = useGameContext();

  return (
    <>
      <FlexibleModal modalId="game-reset" title="Game Reset">
        <div>
          <ul>
            <li>Player statuses reset.</li>
            <li>Votes reset.</li>
            <li>Roles reassigned.</li>
          </ul>
        </div>
      </FlexibleModal>
      <details className="dropdown">
        <summary className="btn p4 btn-outline">
          New <CarbonRenew />
        </summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box">
          <button
            className="btn btn-ghost btn-outline btn-secondary btn-sm mb-2"
            onClick={softResetGameState}
          >
            Next Round!
          </button>

          <button
            className="btn btn-ghost btn-outline btn-secondary btn-sm"
            onClick={resetGameState}
          >
            Hard Reset
          </button>
        </ul>
      </details>
    </>
  );
};

export default NewGameButton;
