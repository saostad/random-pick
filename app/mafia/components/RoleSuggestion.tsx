import React, { useEffect, useState } from "react";
import { GameMode, GameRole, useGameContext } from "../contexts/GameContext";
import predefinedRoles, { PredefinedRole } from "../data/predefinedRoles";

const RoleSuggestion: React.FC = () => {
  const { gameState, updateGameState, loading } = useGameContext();
  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [gameLevel, setGameLevel] = useState<GameMode>(
    gameState.gameMode ?? "beginner"
  );
  const [suggestedRoles, setSuggestedRoles] = useState<any[]>([]);
  const [selectedSuggestedRoles, setSelectedSuggestedRoles] = useState<
    string[]
  >([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setNumPlayers(gameState.players.length);
  }, [gameState.players]);

  useEffect(() => {
    if (loading) return;

    setGameLevel(gameState.gameMode ?? "beginner");
  }, [gameState.gameMode, loading]);

  const handleSuggestRoles = () => {
    const canAddThirdParty = gameLevel === "pro" && numPlayers >= 8;
    const mafiaCount = Math.max(1, Math.floor(numPlayers / 4)); // At least 1 mafia, then 1 per 4 players
    const thirdPartyCount = canAddThirdParty ? Math.floor(numPlayers / 10) : 0; // 1 third party per 10 players if allowed and pro level

    const filteredRoles = predefinedRoles.filter(
      (role) =>
        (gameLevel === "pro" ? true : role.roleLevel === "beginner") &&
        (canAddThirdParty ? true : role.side !== "ThirdParty")
    );

    const suggested: PredefinedRole[] = [];
    const roleCount: { [key: string]: number } = {};

    function addRoleToSuggested(role: PredefinedRole) {
      if (!(role.name in roleCount)) {
        roleCount[role.name] = 0;
      }

      if (
        roleCount[role.name] < role.timesInGame &&
        suggested.length < numPlayers
      ) {
        suggested.push({
          ...role,
          id: `${role.id}-${roleCount[role.name]}`,
          name:
            roleCount[role.name] === 0
              ? role.name
              : `${role.name}_${roleCount[role.name] + 1}`,
        });
        roleCount[role.name]++;
        return true;
      }
      return false;
    }

    // Assign Mafia roles
    const mafiaRoles = filteredRoles.filter((role) => role.side === "Mafia");
    for (let i = 0; i < mafiaCount; i++) {
      const availableMafiaRoles = mafiaRoles.filter(
        (role) => (roleCount[role.name] || 0) < role.timesInGame
      );
      if (availableMafiaRoles.length > 0) {
        addRoleToSuggested(
          availableMafiaRoles[
            Math.floor(Math.random() * availableMafiaRoles.length)
          ]
        );
      }
    }

    // Assign Third Party roles if allowed (only in pro level)
    if (canAddThirdParty) {
      const thirdPartyRoles = filteredRoles.filter(
        (role) => role.side === "ThirdParty"
      );
      for (let i = 0; i < thirdPartyCount; i++) {
        const availableThirdPartyRoles = thirdPartyRoles.filter(
          (role) => (roleCount[role.name] || 0) < role.timesInGame
        );
        if (availableThirdPartyRoles.length > 0) {
          addRoleToSuggested(
            availableThirdPartyRoles[
              Math.floor(Math.random() * availableThirdPartyRoles.length)
            ]
          );
        }
      }
    }

    // Assign Town roles
    const townRoles = filteredRoles.filter((role) => role.side === "Town");
    while (suggested.length < numPlayers) {
      const availableTownRoles = townRoles.filter(
        (role) => (roleCount[role.name] || 0) < role.timesInGame
      );
      if (availableTownRoles.length > 0) {
        addRoleToSuggested(
          availableTownRoles[
            Math.floor(Math.random() * availableTownRoles.length)
          ]
        );
      } else {
        break; // No more available town roles
      }
    }

    // Sort roles by action order
    suggested.sort(
      (a, b) => (a.actionOrder ?? Infinity) - (b.actionOrder ?? Infinity)
    );

    setSuggestedRoles(suggested);

    if (suggested.length < numPlayers) {
      setMessage(
        `WARNING: Only ${suggested.length} roles generated out of ${numPlayers} requested. This may be due to a limited number of predefined roles available for the selected game level.`
      );
    } else {
      setMessage(
        `${suggested.length} roles generated successfully. Mafia: ${mafiaCount}, Third Party: ${thirdPartyCount}`
      );
    }
  };

  // Function to add suggested roles
  const handleAddSuggestedRoles = () => {
    const rolesToAdd = suggestedRoles.filter((role) =>
      selectedSuggestedRoles.includes(role.id)
    );
    const newRoles = rolesToAdd.map((role) => ({
      ...role,
      id: new Date().toISOString() + Math.random(),
      preDefinedRoleId: role.preDefinedRoleId,
    }));
    updateGameState({ gameRoles: [...gameState.gameRoles, ...newRoles] });

    // Clear the suggestion section
    setSuggestedRoles([]);
    setSelectedSuggestedRoles([]);
    setMessage("");
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
            onChange={(e) => setGameLevel(e.target.value as GameMode)}
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
