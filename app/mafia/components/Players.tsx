import React, { useState, useEffect, KeyboardEvent } from "react";
import { useGameContext, Player } from "../contexts/GameContext";
import DraggableItems from "./DraggableItems";
import GeneratePlayerNames from "./GeneratePlayerNames";
import CarbonAdd from "~icons/carbon/add";

const Players: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerOrder, setNewPlayerOrder] = useState<number>(1);
  const [playerRoles, setPlayerRoles] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"addPlayer" | "generatePlayers">(
    "addPlayer"
  );

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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newPlayerName.trim()) {
      handleAddPlayer();
    }
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
    updatedPlayers.forEach((player, index) => {
      player.order = index + 1;
    });
    updateGameState({ players: updatedPlayers });
  };

  const renderPlayer = (player: Player, index: number) => (
    <div className="grid grid-cols-6 gap-4 w-full content-center">
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
      <div className="flex justify-center">
        <div className="join mb-4">
          <input
            className={`join-item btn ${
              activeTab === "addPlayer" ? "btn-active btn-primary" : ""
            }`}
            type="radio"
            name="options"
            aria-label="Add a Player"
            checked={activeTab === "addPlayer"}
            onChange={() => setActiveTab("addPlayer")}
          />
          <input
            className={`join-item btn ${
              activeTab === "generatePlayers" ? "btn-active btn-primary" : ""
            }`}
            type="radio"
            name="options"
            aria-label="Generate Players"
            checked={activeTab === "generatePlayers"}
            onChange={() => setActiveTab("generatePlayers")}
          />
        </div>
      </div>

      {activeTab === "addPlayer" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Player&apos;s Name</span>
              </div>
              <input
                type="text"
                placeholder="Type player's name"
                className="input input-bordered w-full max-w-xs"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="label">
                <span className="label-text-alt">Press Enter to add</span>
              </div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Seat Number</span>
                <span className="label-text-alt">Player&apos;s order</span>
              </div>
              <input
                type="number"
                placeholder="Enter seat number"
                className="input input-bordered w-full max-w-xs"
                value={newPlayerOrder}
                onChange={(e) => setNewPlayerOrder(Number(e.target.value))}
              />
              <div className="label">
                <span className="label-text-alt">Unique seat number</span>
              </div>
            </label>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleAddPlayer}
            disabled={!newPlayerName.trim()}
          >
            Add Player <CarbonAdd />
          </button>
          {error && <div className="text-error mt-2">{error}</div>}
        </div>
      )}

      {activeTab === "generatePlayers" && <GeneratePlayerNames />}

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
