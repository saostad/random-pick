import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import FlexibleModal from "./FlexibleModal";

const VotingSession: React.FC = () => {
  const { gameState, decreaseVote, increaseVote, resetVotes } =
    useGameContext();
  const [showVoting, setShowVoting] = useState(false);

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
        onToggle={() => {
          setShowVoting((prev) => !prev);
        }}
      >
        <summary className="secondary" role="button">
          {showVoting ? "Hide " : "Show "} Voting Session
        </summary>
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <button onClick={resetVotes}>Reset Votes</button>
          </div>
          {gameState.players
            .filter((p) => p.isAlive)
            .sort((a, b) => a.order - b.order)
            .map((player) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 3fr",
                  gap: "1rem",
                  alignItems: "center",
                  paddingBottom: "0.5rem",
                }}
                key={player.id}
              >
                <span style={{ marginRight: "1rem" }}>{player.name}</span>
                <div>
                  <button onClick={() => decreaseVote(player.id)}>-</button>
                  {` Votes: ${player.voteCount} `}
                  <button onClick={() => increaseVote(player.id)}>+</button>
                </div>
              </div>
            ))}
        </div>
      </details>
    </div>
  );
};

export default VotingSession;
