import React from "react";
import { useGameContext } from "../contexts/GameContext";
import FlexibleModal from "./FlexibleModal";

const NewGameButton: React.FC = () => {
  const { resetGameState } = useGameContext();

  return (
    <>
      <FlexibleModal modalId="game-reset">
        <>
          <h2>Game Reset</h2>
          <ul>
            <li>Player statuses reset successfully</li>
            <li>Votes reset successfully</li>
            <li>Role assignments reset successfully</li>
          </ul>
        </>
      </FlexibleModal>
      <button className="secondary" onClick={resetGameState}>
        Start a New Game
      </button>
    </>
  );
};

export default NewGameButton;
