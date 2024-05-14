import React, { useState } from "react";
import { useGameContext, Player } from "../contexts/GameContext";

// Component for displaying and managing the list of players
const Players: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerOrder, setNewPlayerOrder] = useState<number>(1);

  // Function to add a new player
  const handleAddPlayer = () => {
    const newPlayer: Player = {
      id: new Date().toISOString(), // Generating a unique ID based on the current time
      name: newPlayerName,
      voteCount: 0,
      order: newPlayerOrder,
      isAlive: true,
    };
    updateGameState({ players: [...gameState.players, newPlayer] });
    setNewPlayerName(""); // Reset input after adding
    setNewPlayerOrder((prev) => prev + 1); // Reset input after adding
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
      <div>
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Enter player's name"
        />
        <input
          type="number"
          value={newPlayerOrder}
          onChange={(e) => setNewPlayerOrder(Number(e.target.value))}
          placeholder="Enter player's seat number"
        />
        <button onClick={handleAddPlayer} disabled={!newPlayerName.trim()}>
          Add Player
        </button>
      </div>
      <hr />
      <ul>
        {gameState.players.map((player) => (
          <li key={player.id}>
            <span style={{ marginRight: "1rem" }}>{player.name} </span>
            <button onClick={() => handleRemovePlayer(player.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Players;
