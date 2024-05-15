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
          Players ({alivePlayers.length})
        </summary>
        <>
          {alivePlayers
            .slice() // Create a copy of the players array to avoid mutating the original state
            .sort((a, b) => a.order - b.order) // Sort players by order
            .map((player) => (
              <div
                key={player.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ marginRight: "1rem" }}>
                  {player.order}. {player.name} (
                  {getRoleNameById(player.roleId ?? "")})
                </span>
                <button
                  className="btn btn-primary"
                  onClick={() => handleMarkPlayerAsDead(player.id)}
                >
                  Mark as Dead
                </button>
              </div>
            ))}
        </>
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
            Dead Players ({deadPlayers.length})
          </summary>
          {showDeadPlayers && (
            <>
              {deadPlayers
                .slice() // Create a copy of the players array to avoid mutating the original state
                .sort((a, b) => a.order - b.order) // Sort players by order
                .map((player) => (
                  <div
                    key={player.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span style={{ marginRight: "1rem" }}>
                      <del>
                        {player.order}. {player.name} (
                        {getRoleNameById(player.roleId ?? "")})
                      </del>
                    </span>
                    <button
                      className="btn btn-secondary"
                      style={{ marginLeft: "1rem" }}
                      onClick={() => handleMarkPlayerAsAlive(player.id)}
                    >
                      Return to Game
                    </button>
                  </div>
                ))}
            </>
          )}
        </details>
      )}
    </>
  );
};

export default PlayerStatusManager;
