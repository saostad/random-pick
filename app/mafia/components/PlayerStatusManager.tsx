import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import CarbonOutage from "~icons/carbon/outage";
import CarbonReturn from "~icons/carbon/return";

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
      <div className="collapse collapse-arrow bg-base-200 mb-2">
        <input type="checkbox" />
        <div className="collapse-title">Players ({alivePlayers.length})</div>
        <div className="collapse-content">
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
                    className="btn btn-outline btn-error"
                    onClick={() => handleMarkPlayerAsDead(player.id)}
                  >
                    Mark as Dead <CarbonOutage />
                  </button>
                </div>
              ))}
          </>
        </div>
      </div>
      {deadPlayers.length > 0 && (
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input
            type="checkbox"
            defaultChecked={showDeadPlayers}
            onChange={() => setShowDeadPlayers((prev) => !prev)}
          />
          <div className="collapse-title">
            Dead Players ({deadPlayers.length})
          </div>
          <div className="collapse-content">
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
                        {player.order}. {player.name} (
                        {getRoleNameById(player.roleId ?? "")})
                      </span>
                      <button
                        className="btn btn-outline btn-success"
                        onClick={() => handleMarkPlayerAsAlive(player.id)}
                      >
                        Mark as Alive <CarbonReturn />
                      </button>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerStatusManager;
