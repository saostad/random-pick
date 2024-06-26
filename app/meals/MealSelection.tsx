import React from "react";
import { mealTypes } from "./mealTypes";

interface MealSelectionProps {
  onSelectMeal: (meal: keyof typeof mealTypes) => void;
}

export const MealSelection: React.FC<MealSelectionProps> = ({
  onSelectMeal,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">Choose a Meal</h2>
      <div className="flex space-x-4">
        {(Object.keys(mealTypes) as Array<keyof typeof mealTypes>).map(
          (meal) => (
            <button
              key={meal}
              onClick={() => onSelectMeal(meal)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize"
            >
              {meal}
            </button>
          )
        )}
      </div>
    </div>
  );
};
