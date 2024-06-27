import React from "react";
import { Food } from "../types/types";

interface DetailedFoodInfoProps {
  food: Food;
  onClose: () => void;
}

export const DetailedFoodInfo: React.FC<DetailedFoodInfoProps> = ({
  food,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          {food.emoji} {food.name}
        </h2>
        <p className="mb-2">{food.description}</p>
        <h3 className="text-xl font-semibold mb-2">Nutritional Information</h3>
        <ul className="mb-4">
          <li>Calories: {food.calories}</li>
          <li>Protein: {food.protein}g</li>
          <li>Carbohydrates: {food.carbohydrates}g</li>
          <li>Fat: {food.fat}g</li>
          <li>Fiber: {food.fiber}g</li>
          <li>Cholesterol: {food.cholesterol}mg</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Vitamins & Minerals</h3>
        <ul className="mb-4">
          {Object.entries(food.vitamins).map(([vitamin, amount]) => (
            <li key={vitamin}>
              {vitamin}: {amount}
            </li>
          ))}
          {Object.entries(food.minerals).map(([mineral, amount]) => (
            <li key={mineral}>
              {mineral}: {amount}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mb-2">Health Benefits</h3>
        <ul className="mb-4">
          {food.healthBenefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};
