// FeedbackMessage.tsx
import React from "react";
import { Food } from "../types/types";

const getFeedbackInfo = (
  score: number
): { message: string; emoji: string; color: string } => {
  if (score >= 6)
    return { message: "Excellent choice!", emoji: "🌟", color: "bg-green-500" };
  if (score >= 3)
    return { message: "Good pick!", emoji: "👍", color: "bg-green-400" };
  if (score >= 0)
    return { message: "Not bad", emoji: "😊", color: "bg-yellow-400" };
  if (score >= -3)
    return { message: "Be careful", emoji: "⚠️", color: "bg-orange-400" };
  return { message: "Unhealthy choice", emoji: "❌", color: "bg-red-500" };
};

interface FeedbackMessageProps {
  food: Food;
}

export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ food }) => {
  const feedback = getFeedbackInfo(food.score);

  return (
    <div
      className={`${feedback.color} text-white px-4 py-2 rounded-full shadow-lg text-xl font-bold`}
    >
      {feedback.emoji} {feedback.message} ({food.calories} cal)
    </div>
  );
};
