// Plate.tsx
import React from "react";
import { useGameContext } from "../context/GameContext";

export const Plate: React.FC = () => {
  const { grabbedFoods } = useGameContext();

  const totals = grabbedFoods.reduce(
    (acc, food) => {
      acc.calories += food.calories;
      acc.fiber += food.fiber;
      acc.protein += food.protein;
      acc.cholesterol += food.cholesterol;
      return acc;
    },
    { calories: 0, fiber: 0, protein: 0, cholesterol: 0 }
  );

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gray-200 rounded-t-xl overflow-hidden">
      <div className="h-full overflow-y-auto p-2">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-1">Food</th>
              <th className="p-1">Cal</th>
              <th className="p-1">Fiber</th>
              <th className="p-1">Protein</th>
              <th className="p-1">Chol</th>
            </tr>
          </thead>
          <tbody>
            {grabbedFoods.map((food, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-1">
                  {food.emoji} {food.name}
                </td>
                <td className="p-1 text-center">{food.calories}</td>
                <td className="p-1 text-center">{food.fiber}g</td>
                <td className="p-1 text-center">{food.protein}g</td>
                <td className="p-1 text-center">{food.cholesterol}mg</td>
              </tr>
            ))}
            <tr className="bg-gray-300 font-bold">
              <td className="p-1">Total</td>
              <td className="p-1 text-center">{totals.calories}</td>
              <td className="p-1 text-center">{totals.fiber}g</td>
              <td className="p-1 text-center">{totals.protein}g</td>
              <td className="p-1 text-center">{totals.cholesterol}mg</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
