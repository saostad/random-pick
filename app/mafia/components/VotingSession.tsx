import React from "react";
import { useGameContext } from "../GameContext";

const VotingSession: React.FC = () => {
  const { gameState, decreaseVote, increaseVote, resetVotes } =
    useGameContext();

  return (
    <div>
      <h2>Voting Session</h2>
      <div>
        <button onClick={resetVotes}>Reset Votes</button>
      </div>
      <ul>
        {gameState.players
          .filter((p) => p.isAlive)
          .sort((a, b) => a.order - b.order)
          .map((player) => (
            <li key={player.id}>
              {player.name}
              <button onClick={() => decreaseVote(player.id)}>-</button>
              {` Votes: ${player.voteCount} `}
              <button onClick={() => increaseVote(player.id)}>+</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default VotingSession;
