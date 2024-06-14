import React, { useState } from "react";
import { predefinedLastActions } from "../data/predefinedLastActions";
import { useGameContext } from "../contexts/GameContext";

const LastActionsSuggestion: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const { players } = gameState;

  const [numPlayers, setNumPlayers] = useState<number>(players.length);
  const [suggestedLastActions, setSuggestedLastActions] = useState<any[]>([]);
  const [selectedLastActions, setSelectedLastActions] = useState<number[]>([]);

  const handleSuggestLastActions = () => {
    const numCards = numPlayers - 3;
    const shuffledActions = predefinedLastActions.sort(
      () => 0.5 - Math.random()
    );

    const suggested = shuffledActions.slice(0, numCards);

    setSuggestedLastActions(suggested);
  };

  const handleSelectLastAction = (actionId: number) => {
    setSelectedLastActions((prev) =>
      prev.includes(actionId)
        ? prev.filter((id) => id !== actionId)
        : [...prev, actionId]
    );
  };

  const handleAddSelectedLastActions = () => {
    const selectedActions = suggestedLastActions.filter((action) =>
      selectedLastActions.includes(action.id)
    );
    // Logic to add the selected last actions to your game state
    updateGameState({
      lastActions: [...gameState.lastActions, ...selectedActions],
    });

    setSelectedLastActions([]);
  };

  const increasePlayers = () => setNumPlayers(numPlayers + 1);
  const decreasePlayers = () =>
    setNumPlayers(numPlayers > 0 ? numPlayers - 1 : 0);

  return (
    <div>
      {numPlayers <= 3 && (
        <div className="alert alert-warning">
          <span>At least 4 players needed to suggest last actions.</span>
        </div>
      )}
      <div className="grid grid-cols-1 gap-2 mb-4">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <span>Number of Players:</span>
          <div>
            <button
              className="btn btn-circle btn-outline"
              onClick={decreasePlayers}
            >
              -
            </button>
            <span className="p-5 font-bold">{numPlayers}</span>
            <button
              className="btn btn-circle btn-outline"
              onClick={increasePlayers}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="btn btn-outline btn-ghost btn-secondary mt-4"
          onClick={handleSuggestLastActions}
        >
          Suggest Last Actions!
        </button>
      </div>
      {suggestedLastActions.length > 0 && (
        <div className="mb-4">
          <h4>Suggested Last Actions:</h4>
          <div className="grid grid-cols-1 gap-2">
            {suggestedLastActions.map((action) => (
              <label key={action.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedLastActions.includes(action.id)}
                  onChange={() => handleSelectLastAction(action.id)}
                  className="checkbox checkbox-primary"
                />
                <span className="ml-2">
                  {action.title}: {action.description}
                </span>
              </label>
            ))}
          </div>
          <button
            className="btn btn-ghost btn-outline btn-primary mt-2"
            onClick={handleAddSelectedLastActions}
          >
            Add Selected Last Actions
          </button>
        </div>
      )}
    </div>
  );
};

export default LastActionsSuggestion;
