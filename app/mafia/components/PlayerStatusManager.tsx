import React from "react";
import { useGameContext } from "../GameContext";

const PlayerStatusManager: React.FC = () => {
  const { gameState, markPlayerAsDead } = useGameContext();

  return (
    <div>
      <h2>Player Status</h2>
      <ul>
        {gameState.players.map((player) => (
          <li key={player.id}>
            {player.name}
            {player.isAlive ? (
              <button onClick={() => markPlayerAsDead(player.id)}>
                Mark as Dead
              </button>
            ) : (
              <span> (deceased)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerStatusManager;
