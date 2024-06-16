import React, { useState, useEffect } from "react";
import { useGameContext, Player } from "../contexts/GameContext";
import DraggableItems from "./DraggableItems";

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

  const handleAddPlayer = () => {
    if (gameState.players.some((player) => player.order === newPlayerOrder)) {
      setError("Duplicate seat number");
      return;
    }
    setError(null);
    const newPlayer: Player = {
      id: new Date().toISOString(),
      name: newPlayerName,
      voteCount: 0,
      order: newPlayerOrder,
      isAlive: true,
      roleId: "",
      tags: [],
    };
    updateGameState({ players: [...gameState.players, newPlayer] });
    setNewPlayerName("");
    setNewPlayerOrder((prev) => prev + 1);
  };

  const handleRemovePlayer = (playerId: string) => {
    updateGameState({
      players: gameState.players.filter((player) => player.id !== playerId),
    });
  };

  const handleUpdatePlayerName = (playerId: string, newName: string) => {
    const updatedPlayers = gameState.players.map((player) =>
      player.id === playerId ? { ...player, name: newName } : player
    );
    updateGameState({ players: updatedPlayers });
  };

  const movePlayer = (dragIndex: number, hoverIndex: number) => {
    const draggedPlayer = gameState.players[dragIndex];
    const updatedPlayers = [...gameState.players];
    updatedPlayers.splice(dragIndex, 1);
    updatedPlayers.splice(hoverIndex, 0, draggedPlayer);

    // Update the order for each player based on its new position
    updatedPlayers.forEach((player, index) => {
      player.order = index + 1;
    });

    updateGameState({ players: updatedPlayers });
  };

  const renderPlayer = (player: Player, index: number) => (
    <div className="grid grid-cols-6 gap-4 w-full mb-2">
      <input
        type="text"
        className="input input-sm input-bordered w-full max-w-xs col-span-3"
        value={player.name}
        onChange={(e) => handleUpdatePlayerName(player.id, e.target.value)}
        placeholder="Player's name"
      />
      <span className="col-span-2">
        <small>
          {playerRoles[player.id] ? `${playerRoles[player.id]}` : ""}
        </small>
      </span>
      <button
        onClick={() => handleRemovePlayer(player.id)}
        className="btn btn-circle btn-outline btn-error btn-sm"
      >
        &#x2715;
      </button>
    </div>
  );

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

      <DraggableItems
        items={gameState.players.slice().sort((a, b) => a.order - b.order)}
        moveItem={movePlayer}
        renderItem={renderPlayer as any}
      />
    </div>
  );
};

export default Players;
