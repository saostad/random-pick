import React from "react";
import { useGameContext } from "../contexts/GameContext";

const NewGameButton: React.FC = () => {
  const { resetGameState } = useGameContext();

  return <button onClick={resetGameState}>Start a New Game</button>;
};

export default NewGameButton;
