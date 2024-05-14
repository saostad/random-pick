import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";

const PlayerStatusManager: React.FC = () => {
  const { gameState, markPlayerAsDead, markPlayerAsAlive } = useGameContext();
  const [showDeadPlayers, setShowDeadPlayers] = useState(false);

  const alivePlayers = gameState.players.filter((player) => player.isAlive);
  const deadPlayers = gameState.players.filter((player) => !player.isAlive);

  const handleMarkPlayerAsDead = (playerId: string) => {
    markPlayerAsDead(playerId);
    if (!showDeadPlayers) {
      setShowDeadPlayers(true);
    }
  };

  const handleMarkPlayerAsAlive = (playerId: string) => {
    markPlayerAsAlive(playerId);
  };

  const getRoleNameById = (roleId: string) => {
    const role = gameState.gameRoles.find((role) => role.id === roleId);
    return role ? role.name : "Unknown";
  };

  return (
    <>
      <h2>Player Status</h2>
      <details>
        <summary className="secondary" role="button">
          Still In-Game Players
        </summary>
        <ul>
          {alivePlayers.map((player) => (
            <li key={player.id}>
              <span style={{ marginRight: "1rem" }}>{player.name}</span>
              <button onClick={() => handleMarkPlayerAsDead(player.id)}>
                Mark as Dead
              </button>
            </li>
          ))}
        </ul>
      </details>
      {deadPlayers.length > 0 && (
        <details
          open={showDeadPlayers}
          onClick={(e) => {
            e.preventDefault();
            setShowDeadPlayers((prev) => !prev);
          }}
        >
          <summary className="secondary" role="button">
            {showDeadPlayers ? "Hide" : "Show"} Dead Players
          </summary>
          {showDeadPlayers && (
            <ul>
              {deadPlayers.map((player) => (
                <li key={player.id}>
                  <span style={{ marginRight: "1rem" }}>
                    <del>
                      {player.name} ({getRoleNameById(player.roleId ?? "")})
                    </del>
                  </span>
                  <button
                    className="secondary"
                    style={{ marginLeft: "1rem" }}
                    onClick={() => handleMarkPlayerAsAlive(player.id)}
                  >
                    Return to Game
                  </button>
                </li>
              ))}
            </ul>
          )}
        </details>
      )}
    </>
  );
};

export default PlayerStatusManager;
