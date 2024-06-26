// HealthyFoodGame.tsx
import React, { useTransition, useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGameContext } from "./GameContext";
import { mealTypes } from "./mealTypes";
import { FoodItem } from "./FoodItem";
import { Plate } from "./Plate";
import { FeedbackMessage } from "./FeedbackMessage";
import { GameOver } from "./GameOver";
import { MealSelection } from "./MealSelection";

export const HealthyFoodGame: React.FC = () => {
  const { mealType, score, totalCalories, feedback, isGameOver, setMealType } =
    useGameContext();
  const [isPending, startTransition] = useTransition();
  const [showFeedback, setShowFeedback] = useState(false);

  const feedbackAnimation = useSpring({
    opacity: showFeedback ? 1 : 0,
    transform: showFeedback ? "scale(1)" : "scale(0.8)",
    config: { tension: 300, friction: 20 },
  });

  useEffect(() => {
    if (feedback) {
      setShowFeedback(true);
      const timer = setTimeout(() => setShowFeedback(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleMealSelection = (meal: keyof typeof mealTypes) => {
    startTransition(() => {
      setMealType(meal);
    });
  };

  if (!mealType) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-100 to-green-200 p-8 flex flex-col items-center">
        <MealSelection onSelectMeal={handleMealSelection} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-100 to-green-200 p-8 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 mb-2">
            HEALTHY {mealType.toUpperCase()} GAME
          </h1>
          <p className="text-gray-600 mb-4">
            Grab the healthy foods and avoid the unhealthy ones!
          </p>
          <p className="text-xl font-semibold text-gray-700">Score: {score}</p>
          <p className="text-lg text-gray-600">
            Calories: {totalCalories} / {mealTypes[mealType].calorieLimit}
          </p>
        </div>
      </div>
      <div className="relative w-full max-w-md h-[calc(100vh-16rem)] border-2 border-gray-300 rounded-xl overflow-hidden bg-gradient-to-b from-blue-100 to-green-100">
        {mealTypes[mealType].foods.map((food) => (
          <FoodItem key={food.name} food={food} />
        ))}
        {feedback && showFeedback && (
          <animated.div
            style={feedbackAnimation}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <FeedbackMessage food={feedback} />
          </animated.div>
        )}
        <Plate />
        {isGameOver && <GameOver />}
      </div>
    </div>
  );
};
