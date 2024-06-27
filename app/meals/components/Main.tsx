"use client";
import { GameProvider } from "../context/GameContext";
import { HealthyFoodGame } from "./HealthyFoodGame";

export const Main: React.FC = () => {
  return (
    <GameProvider>
      <HealthyFoodGame />
    </GameProvider>
  );
};
