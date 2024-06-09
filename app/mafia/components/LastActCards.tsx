import { useState } from "react";
import { LastActType, useGameContext } from "../contexts/GameContext";

interface LastActCardsProps extends React.HTMLAttributes<HTMLDivElement> {}

const LastActCards: React.FC<LastActCardsProps> = (props) => {
  const { gameState, updateGameState } = useGameContext();
  const { lastActCards } = gameState;
  const [newLastAct, setNewLastAct] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddLastAct = () => {
    setNewLastAct("");
  };

  const handleRemoveLastAct = (lastAct: LastActType) => {};

  return (
    <div {...props}>
      <ul>
        {lastActCards.map((lastAct, index) => (
          <li key={index} className="grid grid-cols-2 items-center">
            <span style={{ marginRight: "1rem" }}>{lastAct.title}</span>
            <button
              onClick={() => handleRemoveLastAct(lastAct)}
              className="btn btn-circle btn-outline btn-error"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="input input-bordered input-primary w-full max-w-xs mb-2"
        value={newLastAct}
        onChange={(e) => setNewLastAct(e.target.value)}
      />
      <button
        className="btn btn-primary btn-outline"
        onClick={handleAddLastAct}
      >
        Add Last Act
      </button>
    </div>
  );
};

export default LastActCards;
