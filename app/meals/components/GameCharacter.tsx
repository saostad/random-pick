// GameCharacter.tsx
import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useGameContext } from "../context/GameContext";

const bearSVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="brown" />
  <circle cx="35" cy="40" r="5" fill="black" />
  <circle cx="65" cy="40" r="5" fill="black" />
  <ellipse cx="50" cy="60" rx="15" ry="10" fill="beige" />
  <path d="M 40 70 Q 50 80 60 70" fill="none" stroke="black" stroke-width="2" />
</svg>
`;

export const GameCharacter: React.FC = () => {
  const { lastFoodScore } = useGameContext();

  const faceAnimation = useSpring({
    transform: lastFoodScore > 0 ? "rotate(0deg)" : "rotate(180deg)",
    config: { tension: 300, friction: 10 },
  });

  const jumpAnimation = useSpring({
    from: { transform: "translateY(0px)" },
    to: async (next) => {
      if (lastFoodScore > 0) {
        await next({ transform: "translateY(-20px)" });
        await next({ transform: "translateY(0px)" });
      }
    },
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.div
      style={jumpAnimation}
      className="absolute bottom-40 left-1/2 transform -translate-x-1/2"
    >
      <animated.div style={faceAnimation} className="w-32 h-32">
        <div dangerouslySetInnerHTML={{ __html: bearSVG }} />
      </animated.div>
    </animated.div>
  );
};
