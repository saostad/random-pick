import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import FlexibleModal from "./FlexibleModal";

const VotingSession: React.FC = () => {
  const { gameState, decreaseVote, increaseVote, resetVotes } =
    useGameContext();
  const [showVoting, setShowVoting] = useState(false);

  // Calculate the maximum votes and the players who have the maximum votes
  const alivePlayers = gameState.players.filter((p) => p.isAlive);
  const maxVotes = Math.max(...alivePlayers.map((player) => player.voteCount));
  const playersWithMaxVotes = alivePlayers.filter(
    (player) => player.voteCount === maxVotes && maxVotes > 0
  );

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
      <div className="collapse collapse-arrow bg-base-200">
        <input
          type="checkbox"
          checked={showVoting}
          onChange={() => setShowVoting((prev) => !prev)}
        />
        <div className="collapse-title">
          {showVoting ? "Hide " : "Show "} Voting Session
        </div>
        <div className="collapse-content">
          <div className="mb-4">
            <button className="btn btn-primary" onClick={resetVotes}>
              Reset Votes
            </button>
          </div>
          {alivePlayers
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
                  <button
                    className="btn btn-circle btn-outline"
                    onClick={() => decreaseVote(player.id)}
                  >
                    -
                  </button>
                  {` Votes: ${player.voteCount} `}
                  <button
                    className="btn btn-circle btn-outline"
                    onClick={() => increaseVote(player.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          {playersWithMaxVotes.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <h3>Leading Players</h3>
              {playersWithMaxVotes.map((player) => (
                <p key={player.id}>
                  {player.name} with {player.voteCount} vote
                  {player.voteCount > 1 ? "s" : ""}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingSession;
