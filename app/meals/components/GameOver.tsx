import { useGameContext } from "../context/GameContext";

export const GameOver: React.FC = () => {
  const { score, totalCalories, restartGame, grabbedFoods } = useGameContext();

  const nutritionalSummary = grabbedFoods.reduce(
    (acc, food) => {
      acc.protein += food.protein;
      acc.fiber += food.fiber;
      acc.vitaminsScore += Object.values(food.vitamins).reduce(
        (sum, val) => sum + val,
        0
      );
      return acc;
    },
    { protein: 0, fiber: 0, vitaminsScore: 0 }
  );

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <p className="mb-2">Your Score: {score}</p>
        <p className="mb-4">Total Calories: {totalCalories}</p>
        <h3 className="text-xl font-semibold mb-2">Nutritional Summary</h3>
        <ul className="mb-4 text-left">
          <li>Total Protein: {nutritionalSummary.protein}g</li>
          <li>Total Fiber: {nutritionalSummary.fiber}g</li>
          <li>Vitamin Score: {nutritionalSummary.vitaminsScore}</li>
        </ul>
        <p className="mb-4">
          {score > 50
            ? "Great job! You made some healthy choices!"
            : "There's room for improvement. Try to choose more nutrient-dense foods next time!"}
        </p>
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
