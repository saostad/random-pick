import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import FlexibleModal from "./FlexibleModal";

const VotingSession: React.FC = () => {
  const { gameState, decreaseVote, increaseVote, resetVotes } =
    useGameContext();

  const [showVoting, setShowVoting] = useState(true);

  return (
    <div>
      <FlexibleModal modalId="votes-reset">
        <>
          <h2>Vote Reset</h2>
          <ul>
            <li>Votes reset successfully</li>
          </ul>
        </>
      </FlexibleModal>
      <details
        open={showVoting}
        onClick={() => {
          setShowVoting((prev) => !prev);
        }}
      >
        <summary className="secondary" role="button">
          {!showVoting ? "Hide " : "Show "} Voting Session
        </summary>

        <div style={{ marginBottom: "1rem" }}>
          <button onClick={resetVotes}>Reset Votes</button>
        </div>
        <ul>
          {gameState.players
            .filter((p) => p.isAlive)
            .sort((a, b) => a.order - b.order)
            .map((player) => (
              <li key={player.id}>
                <span style={{ marginRight: "1rem" }}>{player.name} </span>
                <button onClick={() => decreaseVote(player.id)}>-</button>
                {` Votes: ${player.voteCount} `}
                <button onClick={() => increaseVote(player.id)}>+</button>
              </li>
            ))}
        </ul>
      </details>
    </div>
  );
};

export default VotingSession;
