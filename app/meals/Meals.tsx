import React, { useState } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";

interface Food {
  name: string;
  score: number;
  emoji: string;
  calories: number;
  fiber: number;
  protein: number;
  cholesterol: number;
}

interface MealType {
  foods: Food[];
  calorieLimit: number;
}

type MealTypes = {
  [key in "breakfast" | "lunch" | "dinner"]: MealType;
};

const mealTypes: MealTypes = {
  breakfast: {
    foods: [
      {
        name: "Egg",
        score: 5,
        emoji: "🥚",
        calories: 78,
        fiber: 0,
        protein: 6,
        cholesterol: 186,
      },
      {
        name: "Bacon",
        score: -2,
        emoji: "🥓",
        calories: 54,
        fiber: 0,
        protein: 3,
        cholesterol: 9,
      },
      {
        name: "Pancakes",
        score: -3,
        emoji: "🥞",
        calories: 227,
        fiber: 1,
        protein: 6,
        cholesterol: 47,
      },
      {
        name: "Yogurt",
        score: 4,
        emoji: "🍶",
        calories: 150,
        fiber: 0,
        protein: 12,
        cholesterol: 15,
      },
      {
        name: "Fruit Bowl",
        score: 7,
        emoji: "🍓",
        calories: 100,
        fiber: 4,
        protein: 2,
        cholesterol: 0,
      },
      {
        name: "Donut",
        score: -5,
        emoji: "🍩",
        calories: 253,
        fiber: 1,
        protein: 4,
        cholesterol: 10,
      },
    ],
    calorieLimit: 600,
  },
  lunch: {
    foods: [
      {
        name: "Salad",
        score: 8,
        emoji: "🥗",
        calories: 200,
        fiber: 5,
        protein: 8,
        cholesterol: 0,
      },
      {
        name: "Sandwich",
        score: 3,
        emoji: "🥪",
        calories: 300,
        fiber: 3,
        protein: 15,
        cholesterol: 30,
      },
      {
        name: "Pizza",
        score: -3,
        emoji: "🍕",
        calories: 285,
        fiber: 2,
        protein: 12,
        cholesterol: 17,
      },
      {
        name: "Sushi",
        score: 6,
        emoji: "🍣",
        calories: 350,
        fiber: 1,
        protein: 20,
        cholesterol: 40,
      },
      {
        name: "Burger",
        score: -4,
        emoji: "🍔",
        calories: 354,
        fiber: 1,
        protein: 17,
        cholesterol: 53,
      },
      {
        name: "Fruit",
        score: 5,
        emoji: "🍎",
        calories: 95,
        fiber: 4,
        protein: 1,
        cholesterol: 0,
      },
    ],
    calorieLimit: 800,
  },
  dinner: {
    foods: [
      {
        name: "Steak",
        score: -1,
        emoji: "🥩",
        calories: 405,
        fiber: 0,
        protein: 62,
        cholesterol: 146,
      },
      {
        name: "Fish",
        score: 7,
        emoji: "🐟",
        calories: 200,
        fiber: 0,
        protein: 40,
        cholesterol: 80,
      },
      {
        name: "Pasta",
        score: -2,
        emoji: "🍝",
        calories: 400,
        fiber: 3,
        protein: 14,
        cholesterol: 0,
      },
      {
        name: "Chicken",
        score: 5,
        emoji: "🍗",
        calories: 300,
        fiber: 0,
        protein: 50,
        cholesterol: 100,
      },
      {
        name: "Vegetables",
        score: 8,
        emoji: "🥦",
        calories: 50,
        fiber: 4,
        protein: 3,
        cholesterol: 0,
      },
      {
        name: "Ice Cream",
        score: -5,
        emoji: "🍨",
        calories: 250,
        fiber: 1,
        protein: 4,
        cholesterol: 30,
      },
    ],
    calorieLimit: 1000,
  },
};

interface FoodItemProps {
  food: Food;
  onGrab: (food: Food) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ food, onGrab }) => {
  const [{ x, y }, api] = useSpring(() => ({
    from: { x: Math.random() * 100, y: Math.random() * 100 },
    config: { duration: 3000 + Math.random() * 2000 },
  }));

  React.useEffect(() => {
    const moveFood = () => {
      api.start({
        to: {
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
        config: { duration: 3000 + Math.random() * 2000 },
        onRest: moveFood,
      });
    };
    moveFood();
  }, [api]);

  return (
    <animated.div
      className="absolute cursor-pointer text-4xl"
      style={{
        left: x.to((x) => `${x}%`),
        top: y.to((y) => `${y}%`),
      }}
      onClick={() => onGrab(food)}
    >
      {food.emoji}
    </animated.div>
  );
};

interface PlateProps {
  grabbedFoods: Food[];
}

const Plate: React.FC<PlateProps> = ({ grabbedFoods }) => {
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface FeedbackMessageProps {
  food: Food;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ food }) => {
  const getFeedbackInfo = (
    score: number
  ): { message: string; emoji: string; color: string } => {
    if (score >= 6)
      return {
        message: "Excellent choice!",
        emoji: "🌟",
        color: "bg-green-500",
      };
    if (score >= 3)
      return { message: "Good pick!", emoji: "👍", color: "bg-green-400" };
    if (score >= 0)
      return { message: "Not bad", emoji: "😊", color: "bg-yellow-400" };
    if (score >= -3)
      return { message: "Be careful", emoji: "⚠️", color: "bg-orange-400" };
    return { message: "Unhealthy choice", emoji: "❌", color: "bg-red-500" };
  };

  const feedback = getFeedbackInfo(food.score);

  return (
    <div
      className={`${feedback.color} text-white px-4 py-2 rounded-full shadow-lg text-xl font-bold`}
    >
      {feedback.emoji} {feedback.message} ({food.calories} cal)
    </div>
  );
};

interface GameOverProps {
  score: number;
  totalCalories: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({
  score,
  totalCalories,
  onRestart,
}) => (
  <div className="absolute top-0 left-0 right-0 bottom-32 bg-black bg-opacity-70 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl text-center">
      <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
      <p className="mb-2">Your Score: {score}</p>
      <p className="mb-4">Total Calories: {totalCalories}</p>
      <button
        onClick={onRestart}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Play Again
      </button>
    </div>
  </div>
);

interface MealSelectionProps {
  onSelectMeal: (meal: keyof MealTypes) => void;
}

const MealSelection: React.FC<MealSelectionProps> = ({ onSelectMeal }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <h2 className="text-2xl font-bold mb-4">Choose a Meal</h2>
    <div className="flex space-x-4">
      {(Object.keys(mealTypes) as Array<keyof MealTypes>).map((meal) => (
        <button
          key={meal}
          onClick={() => onSelectMeal(meal)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded capitalize"
        >
          {meal}
        </button>
      ))}
    </div>
  </div>
);

const HealthyFoodGame: React.FC = () => {
  const [mealType, setMealType] = useState<keyof MealTypes | null>(null);
  const [score, setScore] = useState<number>(0);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [grabbedFoods, setGrabbedFoods] = useState<Food[]>([]);
  const [feedback, setFeedback] = useState<Food | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const handleMealSelection = (meal: keyof MealTypes) => {
    setMealType(meal);
    setScore(0);
    setTotalCalories(0);
    setGrabbedFoods([]);
    setIsGameOver(false);
  };

  const handleGrab = (food: Food) => {
    if (isGameOver || !mealType) return;

    const newTotalCalories = totalCalories + food.calories;
    setTotalCalories(newTotalCalories);
    setScore((prevScore) => prevScore + food.score);
    setGrabbedFoods((prevFoods) => [...prevFoods, food].slice(-5));
    setFeedback(food);
    setTimeout(() => setFeedback(null), 1000);

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

  const feedbackTransition = useTransition(feedback, {
    from: { opacity: 0, scale: 0.8, y: "0%" },
    enter: { opacity: 1, scale: 1, y: "0%" },
    leave: { opacity: 0, scale: 0.8, y: "0%" },
    config: { tension: 300, friction: 20 },
  });

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
          <FoodItem key={food.name} food={food} onGrab={handleGrab} />
        ))}
        {feedbackTransition(
          (style, item) =>
            item && (
              <animated.div
                style={style}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <FeedbackMessage food={item} />
              </animated.div>
            )
        )}
        <Plate grabbedFoods={grabbedFoods} />
        {isGameOver && (
          <GameOver
            score={score}
            totalCalories={totalCalories}
            onRestart={restartGame}
          />
        )}
      </div>
    </div>
  );
};

export default HealthyFoodGame;
