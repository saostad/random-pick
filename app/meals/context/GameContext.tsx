// GameContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { mealTypes } from "../data/mealTypes";
import { MealTypes, Food } from "../types/types";

interface GameContextType {
  mealType: keyof MealTypes | null;
  score: number;
  totalCalories: number;
  grabbedFoods: Food[];
  feedback: Food | null;
  isGameOver: boolean;
  setMealType: (meal: keyof MealTypes | null) => void;
  setScore: (score: number) => void;
  setTotalCalories: (calories: number) => void;
  setGrabbedFoods: (foods: Food[]) => void;
  setFeedback: (food: Food | null) => void;
  setIsGameOver: (isOver: boolean) => void;
  handleGrab: (food: Food) => void;
  restartGame: () => void;
  lastFoodScore: number;
  setLastFoodScore: (score: number) => void;
  trainingMode: boolean;
  setTrainingMode: (mode: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mealType, setMealType] = useState<keyof MealTypes | null>(null);
  const [score, setScore] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [grabbedFoods, setGrabbedFoods] = useState<Food[]>([]);
  const [feedback, setFeedback] = useState<Food | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastFoodScore, setLastFoodScore] = useState(0);
  const [trainingMode, setTrainingMode] = useState(false);

  const handleGrab = (food: Food) => {
    if (isGameOver || !mealType) return;

    const newTotalCalories = totalCalories + food.calories;
    setTotalCalories(newTotalCalories);
    setScore((prevScore) => prevScore + food.score);
    setGrabbedFoods((prevFoods) => [...prevFoods, food].slice(-5));
    setFeedback(food);
    setTimeout(() => setFeedback(null), 1000);

    setLastFoodScore(food.score);

    if (newTotalCalories >= mealTypes[mealType].calorieLimit) {
      setIsGameOver(true);
    }
  };

  const restartGame = () => {
    setMealType(null);
    setScore(0);
    setTotalCalories(0);
    setGrabbedFoods([]);
    setIsGameOver(false);
  };

  return (
    <GameContext.Provider
      value={{
        mealType,
        score,
        totalCalories,
        grabbedFoods,
        feedback,
        isGameOver,
        setMealType,
        setScore,
        setTotalCalories,
        setGrabbedFoods,
        setFeedback,
        setIsGameOver,
        handleGrab,
        restartGame,
        lastFoodScore,
        setLastFoodScore,
        trainingMode,
        setTrainingMode,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
