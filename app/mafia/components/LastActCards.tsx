import { useState } from "react";
import { LastActType, useGameContext } from "../contexts/GameContext";
import PredefinedLastActions from "./PredefinedLastActions";

interface LastActCardsProps extends React.HTMLAttributes<HTMLDivElement> {}

const LastActCards: React.FC<LastActCardsProps> = (props) => {
  const { gameState, updateGameState } = useGameContext();
  const { lastActCards } = gameState;
  const [newLastAct, setNewLastAct] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "addItem" | "predefinedItems" | "suggestItems"
  >("suggestItems");

  const handleAddLastAct = () => {
    if (!newLastAct) {
      setError("Please enter a last act");
      return;
    }

    updateGameState({
      lastActCards: [
        ...lastActCards,
        {
          title: newLastAct,
          description: "",
          descriptionFa: ``,
          id: Date.now().toString(),
          titleFa: "",
        },
      ],
    });

    setNewLastAct("");
  };

  const handleRemoveLastAct = (lastAct: LastActType) => {
    updateGameState({
      lastActCards: lastActCards.filter((act) => act.id !== lastAct.id),
    });
  };

  return (
    <div {...props}>
      <div className="flex justify-center">
        <div className="join mb-4">
          <input
            className={`join-item btn ${
              activeTab === "addItem" ? "btn-active btn-primary" : ""
            }`}
            type="radio"
            name="options"
            aria-label="Add an Action"
            checked={activeTab === "addItem"}
            onChange={() => setActiveTab("addItem")}
          />
          <input
            className={`join-item btn ${
              activeTab === "suggestItems" ? "btn-active btn-primary" : ""
            }`}
            type="radio"
            name="options"
            aria-label="Suggest"
            checked={activeTab === "suggestItems"}
            onChange={() => setActiveTab("suggestItems")}
          />
          <input
            className={`join-item btn ${
              activeTab === "predefinedItems" ? "btn-active btn-primary" : ""
            }`}
            type="radio"
            name="options"
            aria-label="Predefined"
            checked={activeTab === "predefinedItems"}
            onChange={() => setActiveTab("predefinedItems")}
          />
        </div>
      </div>

      {activeTab === "addItem" && (
        <div>
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
          {error && <p className="text-error">{error}</p>}
        </div>
      )}

      {activeTab === "predefinedItems" && <PredefinedLastActions />}
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
    </div>
  );
};

export default LastActCards;
