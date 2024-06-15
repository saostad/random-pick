import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import CarbonOutage from "~icons/carbon/outage";
import CarbonReturn from "~icons/carbon/return";

import PlayerTagsIndicator from "./PlayerTagsIndicator";
import { getRoleByPlayerId } from "../utils/get-from-fns";

const PlayerStatusManager: React.FC = () => {
  const { gameState, markPlayerAsDead, markPlayerAsAlive } = useGameContext();

  const alivePlayers = gameState.players.filter((player) => player.isAlive);
  const deadPlayers = gameState.players.filter((player) => !player.isAlive);

  const handleMarkPlayerAsDead = (playerId: string) => {
    markPlayerAsDead({ playerId });
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
        {alivePlayers.map((player) => (
          <div
            key={player.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <PlayerTagsIndicator key={player.id} playerId={player.id} />(
            {getRoleByPlayerId({ player, gameRoles: gameState.gameRoles })
              ?.name ?? "Unknown"}
            )
            <button
              className="btn btn-outline btn-error btn-sm"
              onClick={() => handleMarkPlayerAsDead(player.id)}
            >
              Dead <CarbonOutage />
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
            {deadPlayers.map((player) => (
              <div
                key={player.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <PlayerTagsIndicator key={player.id} playerId={player.id} />(
                {getRoleByPlayerId({ player, gameRoles: gameState.gameRoles })
                  ?.name ?? "Unknown"}
                )
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
