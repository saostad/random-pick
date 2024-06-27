// FoodItem.tsx
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGameContext } from "../context/GameContext";
import { Food } from "../types/types";
import { DetailedFoodInfo } from "./DetailedFoodInfo";

interface FoodItemProps {
  food: Food;
}

export const FoodItem: React.FC<FoodItemProps> = ({ food }) => {
  const { handleGrab, trainingMode } = useGameContext();
  const [showInfo, setShowInfo] = useState(false);
  const [{ x, y }, api] = useSpring(() => ({
    from: { x: Math.random() * 100, y: Math.random() * 100 },
    config: { duration: 3000 + Math.random() * 2000 },
  }));

  const handleClick = () => {
    if (!showInfo && trainingMode) {
      setShowInfo(true);
      handleGrab(food);
    } else {
      setShowInfo(false);
      handleGrab(food);
    }
  };

  useEffect(() => {
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
    <>
      <animated.div
        className="absolute cursor-pointer text-4xl"
        style={{
          left: x.to((x) => `${x}%`),
          top: y.to((y) => `${y}%`),
        }}
        onClick={handleClick}
      >
        {food.emoji}
      </animated.div>
      {showInfo && (
        <DetailedFoodInfo food={food} onClose={() => setShowInfo(false)} />
      )}
    </>
  );
};
