import React from "react";
import { useGameContext } from "../contexts/GameContext";
import FlexibleModal from "./FlexibleModal";
import CarbonRenew from "~icons/carbon/renew.jsx";

const NewGameButton: React.FC = () => {
  const { resetGameState } = useGameContext();

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
      <button className="btn btn-secondary" onClick={resetGameState}>
        New Game
        <CarbonRenew className="hidden sm:block" />
      </button>
    </>
  );
};

export default NewGameButton;
