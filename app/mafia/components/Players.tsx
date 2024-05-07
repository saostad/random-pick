import React, { useState } from "react";
import { Player, useGameContext } from "../GameContext";

// Component for displaying and managing the list of players
const Players: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [newPlayerName, setNewPlayerName] = useState("");

  // Function to add a new player
  const handleAddPlayer = () => {
    const newPlayer: Player = {
      id: new Date().toISOString(), // Generating a unique ID based on the current time
      name: newPlayerName,
      isAlive: true,
    };
    updateGameState({ players: [...gameState.players, newPlayer] });
    setNewPlayerName(""); // Reset input after adding
  };

  // Function to remove a player by ID
  const handleRemovePlayer = (playerId: string) => {
    updateGameState({
      players: gameState.players.filter((player) => player.id !== playerId),
    });
  };

  return (
    <div>
      <h2>Players List</h2>
      <ul>
        {gameState.players.map((player) => (
          <li key={player.id}>
            {player.name}
            <button onClick={() => handleRemovePlayer(player.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Enter player's name"
        />
        <button onClick={handleAddPlayer} disabled={!newPlayerName.trim()}>
          Add Player
        </button>
      </div>
    </div>
  );
};

export default Players;
