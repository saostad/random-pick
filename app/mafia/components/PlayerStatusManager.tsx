import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import CarbonOutage from "~icons/carbon/outage";
import CarbonReturn from "~icons/carbon/return";

import PlayerTagsIndicator from "./PlayerTagsIndicator";

const PlayerStatusManager: React.FC = () => {
  const { gameState, markPlayerAsDead, markPlayerAsAlive } = useGameContext();

  const alivePlayers = gameState.players.filter((player) => player.isAlive);
  const deadPlayers = gameState.players.filter((player) => !player.isAlive);

  const handleMarkPlayerAsDead = (playerId: string) => {
    markPlayerAsDead(playerId);
  };

  const handleMarkPlayerAsAlive = (playerId: string) => {
    markPlayerAsAlive(playerId);
  };

  return (
    <>
      <div className="text-xl font-bold mb-4">
        Players ({alivePlayers.length})
      </div>
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
                marginBottom: "1rem",
              }}
            >
              <span style={{ marginRight: "1rem" }}>
                {player.order}.{" "}
                <PlayerTagsIndicator key={player.id} playerId={player.id} />
              </span>
              <button
                className="btn btn-outline btn-error btn-sm"
                onClick={() => handleMarkPlayerAsDead(player.id)}
              >
                Mark as Dead <CarbonOutage />
              </button>
            </div>
          ))}
      </>
      {deadPlayers.length > 0 && (
        <>
          <div className="text-xl font-bold mb-4">
            Dead Players ({deadPlayers.length})
          </div>
          <>
            {deadPlayers
              .slice() // Create a copy of the players array to avoid mutating the original state
              .sort((a, b) => a.order - b.order) // Sort players by order
              .map((player) => (
                <div
                  key={player.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ marginRight: "1rem" }}>
                    {player.order}{" "}
                    <PlayerTagsIndicator key={player.id} playerId={player.id} />
                  </span>
                  <button
                    className="btn btn-outline btn-success btn-sm"
                    onClick={() => handleMarkPlayerAsAlive(player.id)}
                  >
                    Revive <CarbonReturn />
                  </button>
                </div>
              ))}
          </>
        </>
      )}
    </>
  );
};

export default PlayerStatusManager;
