import React, { useState, useEffect } from "react";
import { useGameContext, Player } from "../contexts/GameContext";

// Component for displaying and managing the list of players
const Players: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerOrder, setNewPlayerOrder] = useState<number>(1);
  const [playerRoles, setPlayerRoles] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mapPlayerRoles = () => {
      const rolesMap: { [key: string]: string } = {};

      gameState.players.forEach((player) => {
        if (player.roleId) {
          const role = gameState.gameRoles.find(
            (role) => role.id === player.roleId
          );
          if (role) {
            rolesMap[player.id] = role.name;
          }
        }
      });

      setPlayerRoles(rolesMap);
    };

    mapPlayerRoles();
  }, [gameState]);

  useEffect(() => {
    const highestOrder = Math.max(
      0,
      ...gameState.players.map((player) => player.order)
    );
    setNewPlayerOrder(highestOrder + 1);
  }, [gameState.players]);

  // Function to add a new player
  const handleAddPlayer = () => {
    if (gameState.players.some((player) => player.order === newPlayerOrder)) {
      setError("Duplicate seat number");
      return;
    }
    setError(null);
    const newPlayer: Player = {
      id: new Date().toISOString(), // Generating a unique ID based on the current time
      name: newPlayerName,
      voteCount: 0,
      order: newPlayerOrder,
      isAlive: true,
      roleId: "", // Add a default role ID or modify as needed
      tags: [], // Add default tags or modify as needed
    };
    updateGameState({ players: [...gameState.players, newPlayer] });
    setNewPlayerName(""); // Reset input after adding
    setNewPlayerOrder((prev) => prev + 1); // Increment order for the next player
  };

  // Function to remove a player by ID
  const handleRemovePlayer = (playerId: string) => {
    updateGameState({
      players: gameState.players.filter((player) => player.id !== playerId),
    });
  };

  // Function to update a player's name
  const handleUpdatePlayerName = (playerId: string, newName: string) => {
    const updatedPlayers = gameState.players.map((player) =>
      player.id === playerId ? { ...player, name: newName } : player
    );
    updateGameState({ players: updatedPlayers });
  };

  // Function to update a player's order
  const handleUpdatePlayerOrder = (playerId: string, newOrder: number) => {
    if (
      gameState.players.some(
        (player) => player.id !== playerId && player.order === newOrder
      )
    ) {
      setError("Duplicate seat number");
      return;
    }
    setError(null);
    const updatedPlayers = gameState.players.map((player) =>
      player.id === playerId ? { ...player, order: newOrder } : player
    );
    updateGameState({ players: updatedPlayers });
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            columnGap: "0.75rem",
            paddingBottom: "0.75rem",
          }}
        >
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Player's name"
          />
          <input
            type="number"
            className="input input-bordered w-full max-w-xs"
            value={newPlayerOrder}
            onChange={(e) => setNewPlayerOrder(Number(e.target.value))}
            placeholder="Seat number"
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleAddPlayer}
          disabled={!newPlayerName.trim()}
        >
          Add Player
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
      <div className="divider"></div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr 2fr auto",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        {gameState.players
          .slice() // Create a copy of the players array to avoid mutating the original state
          .sort((a, b) => a.order - b.order) // Sort players by order
          .map((player) => (
            <React.Fragment key={player.id}>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs input-sm"
                value={player.name}
                onChange={(e) =>
                  handleUpdatePlayerName(player.id, e.target.value)
                }
                placeholder="Player's name"
              />
              <span>
                <small>
                  {playerRoles[player.id] ? `${playerRoles[player.id]}` : ""}
                </small>
              </span>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs input-sm"
                value={player.order}
                onChange={(e) =>
                  handleUpdatePlayerOrder(player.id, Number(e.target.value))
                }
                placeholder="Seat number"
              />
              <button
                onClick={() => handleRemovePlayer(player.id)}
                className="btn btn-circle btn-outline btn-error btn-sm"
              >
                &#x2715;
              </button>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Players;
