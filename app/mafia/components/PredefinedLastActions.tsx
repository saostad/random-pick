import React, { useState } from "react";
import { LastActType, useGameContext } from "../contexts/GameContext";
import { predefinedLastActions } from "../data/predefinedLastActions";

const PredefinedLastActions: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleAddPredefinedItem = () => {
    const itemsToAdd = predefinedLastActions.filter((item) =>
      selectedItems.includes(String(item.id))
    );
    const newItems: LastActType[] = itemsToAdd.map((item) => ({
      ...item,
      id: new Date().toISOString(),
    }));
    updateGameState({ lastActCards: [...gameState.lastActCards, ...newItems] });
    setSelectedItems([]);
  };

  return (
    <div className="mb-4">
      <h3>Predefined Roles</h3>
      <div className="grid grid-cols-1 gap-2">
        {predefinedLastActions.map((item) => (
          <label key={item.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedItems.includes(String(item.id))}
              onChange={(e) =>
                setSelectedItems((prev) =>
                  e.target.checked
                    ? [...prev, item.id.toString()]
                    : prev.filter((id) => id !== item.id.toString())
                )
              }
              className="checkbox checkbox-primary"
            />
            <span className="ml-2">
              {item.title}: {item.titleFa}
              <div className="collapse bg-base-200">
                <input type="checkbox" />
                <div className="collapse-title text-sm font-medium">
                  Details
                </div>
                <div className="collapse-content">
                  <p>{item.description}</p>
                  <p>{item.descriptionFa}</p>
                </div>
              </div>
            </span>
          </label>
        ))}
      </div>
      <button
        className="btn btn-secondary mt-2"
        onClick={handleAddPredefinedItem}
      >
        Add Selected Roles
      </button>
    </div>
  );
};

export default PredefinedLastActions;
