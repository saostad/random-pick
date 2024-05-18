import React from "react";
import { useGameContext } from "../contexts/GameContext";
import FlexibleModal from "./FlexibleModal";
import CarbonRenew from "~icons/carbon/renew.jsx";

const NewGameButton: React.FC = () => {
  const { resetGameState } = useGameContext();

  return (
    <>
      <FlexibleModal modalId="game-reset">
        <div>
          <h2>Game Reset</h2>
          <ul>
            <li>Player statuses reset.</li>
            <li>Votes reset.</li>
            <li>Roles reassigned.</li>
          </ul>
        </div>
      </FlexibleModal>
      <button className="btn btn-secondary" onClick={resetGameState}>
        Start a New Game
        <CarbonRenew />
      </button>
    </>
  );
};

export default NewGameButton;
