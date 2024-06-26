// GameOver.tsx
import React from "react";
import { useGameContext } from "./GameContext";

export const GameOver: React.FC = () => {
  const { score, totalCalories, restartGame } = useGameContext();

  return (
    <div className="absolute top-0 left-0 right-0 bottom-32 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <p className="mb-2">Your Score: {score}</p>
        <p className="mb-4">Total Calories: {totalCalories}</p>
        <button
          onClick={restartGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
