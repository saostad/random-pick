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
  const [message, setMessage] = useState<string>("");

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
            name:
              roleCount[role.name] === 0
                ? role.name
                : `${role.name}_${roleCount[role.name] + 1}`,
          });
          roleCount[role.name]++;
        }
      }
    }

    suggested.sort(
      (a, b) => (a.actionOrder ?? Infinity) - (b.actionOrder ?? Infinity)
    );
    setSuggestedRoles(suggested.slice(0, numPlayers));

    const generatedCount = suggested.length;
    if (generatedCount < numPlayers) {
      setMessage(
        `WARNING: Only ${generatedCount} roles generated out of ${numPlayers} requested. This may be due to a limited number of predefined roles available for the selected game level.`
      );
    } else {
      setMessage(`${generatedCount} roles generated successfully.`);
    }
  };

  // Function to add suggested roles
  const handleAddSuggestedRoles = () => {
    const rolesToAdd = suggestedRoles.filter((role) =>
      selectedSuggestedRoles.includes(role.id)
    );
    const newRoles = rolesToAdd.map((role) => ({
      ...role,
      id: new Date().toISOString() + Math.random(), // Ensure unique ID
      preDefinedRoleId: role.id,
    }));
    updateGameState({ gameRoles: [...gameState.gameRoles, ...newRoles] });
    setSelectedSuggestedRoles([]); // Reset selected roles
  };

  const increasePlayers = () => setNumPlayers(numPlayers + 1);
  const decreasePlayers = () =>
    setNumPlayers(numPlayers > 0 ? numPlayers - 1 : 0);

  return (
    <div>
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
        <div className="">
          <label className="mr-4">Game Level:</label>
          <select
            className="select select-bordered select-primary w-full max-w-xs"
            value={gameLevel}
            onChange={(e) => setGameLevel(e.target.value)}
          >
            <option value="beginner">Beginner</option>
            <option value="pro">Pro</option>
          </select>
        </div>
        <button
          className="btn btn-outline btn-ghost btn-secondary mt-4"
          onClick={handleSuggestRoles}
        >
          Suggest some Roles!
        </button>
      </div>
      {message && <div className="alert">{message}</div>}
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
                  {role.description.slice(0, 50) +
                    (role.description.length > 50 ? "..." : "")}
                </span>
              </label>
            ))}
          </div>
          <button
            className="btn btn-ghost btn-outline btn-primary mt-2"
            onClick={handleAddSuggestedRoles}
          >
            Let&apos;s go with selected Roles!
          </button>
        </div>
      )}
    </div>
  );
};

export default RoleSuggestion;
