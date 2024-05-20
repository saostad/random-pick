import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import predefinedRoles from "../data/predefinedRoles";

const RoleSuggestion: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [gameLevel, setGameLevel] = useState<string>("beginner");
  const [suggestedRoles, setSuggestedRoles] = useState<any[]>([]);
  const [selectedSuggestedRoles, setSelectedSuggestedRoles] = useState<
    string[]
  >([]);

  // Function to suggest roles based on player count and game level
  const handleSuggestRoles = () => {
    const filteredRoles = predefinedRoles.filter((role) =>
      gameLevel === "pro" ? true : role.roleLevel === gameLevel
    );
    const suggested = [];
    const roleCount: { [key: string]: number } = {
      ...filteredRoles.reduce((acc, role) => ({ ...acc, [role.name]: 0 }), {}),
    };

    for (let i = 0; i < numPlayers; i++) {
      for (let role of filteredRoles) {
        if (suggested.length >= numPlayers) break;
        if (roleCount[role.name] < (role.timesInGame || 1)) {
          suggested.push({
            ...role,
            id: role.id + "-" + roleCount[role.name],
            name: role.name + (roleCount[role.name] + 1),
          });
          roleCount[role.name]++;
        }
      }
    }
    setSuggestedRoles(suggested.slice(0, numPlayers));
  };

  // Function to add suggested roles
  const handleAddSuggestedRoles = () => {
    const rolesToAdd = suggestedRoles.filter((role) =>
      selectedSuggestedRoles.includes(role.id)
    );
    const newRoles = rolesToAdd.map((role) => ({
      ...role,
      id: new Date().toISOString() + Math.random(), // Ensure unique ID
    }));
    updateGameState({ gameRoles: [...gameState.gameRoles, ...newRoles] });
    setSelectedSuggestedRoles([]); // Reset selected roles
  };

  return (
    <div className="mt-4">
      <h3>Generate Suggested Roles</h3>
      <div className="grid grid-cols-1 gap-2 mb-4">
        <input
          type="number"
          className="input input-bordered input-primary w-full max-w-xs"
          value={numPlayers}
          onChange={(e) => setNumPlayers(Number(e.target.value))}
          placeholder="Number of Players"
        />
        <select
          className="select select-bordered select-primary w-full max-w-xs"
          value={gameLevel}
          onChange={(e) => setGameLevel(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="pro">Pro</option>
        </select>
        <button className="btn btn-primary" onClick={handleSuggestRoles}>
          Suggest Roles
        </button>
      </div>
      {suggestedRoles.length > 0 && (
        <div className="mb-4">
          <h4>Suggested Roles:</h4>
          <div className="grid grid-cols-1 gap-2">
            {suggestedRoles.map((role) => (
              <label key={role.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSuggestedRoles.includes(role.id)}
                  onChange={(e) =>
                    setSelectedSuggestedRoles((prev) =>
                      e.target.checked
                        ? [...prev, role.id]
                        : prev.filter((id) => id !== role.id)
                    )
                  }
                  className="checkbox checkbox-primary"
                />
                <span className="ml-2">
                  {role.name} ({role.roleLevel}, {role.side}):{" "}
                  {role.description}
                </span>
              </label>
            ))}
          </div>
          <button
            className="btn btn-secondary mt-2"
            onClick={handleAddSuggestedRoles}
          >
            Add Selected Suggested Roles
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleSuggestion;
