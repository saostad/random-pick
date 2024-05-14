import React from "react";
import { useGameContext } from "../contexts/GameContext";

const PlayerStatusManager: React.FC = () => {
  const { gameState, markPlayerAsDead, markPlayerAsAlive } = useGameContext();

  return (
    <>
      <h2>Player Status</h2>
      <ul>
        {gameState.players.map((player) => (
          <li key={player.id}>
            <span style={{ marginRight: "1rem" }}>{player.name}</span>
            <span>
              {player.isAlive ? (
                <button onClick={() => markPlayerAsDead(player.id)}>
                  Mark as Dead
                </button>
              ) : (
                <span>
                  <del> (deceased)</del>
                  <button
                    className="secondary"
                    style={{ marginLeft: "1rem" }}
                    onClick={() => markPlayerAsAlive(player.id)}
                  >
                    Return to Game
                  </button>
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PlayerStatusManager;
