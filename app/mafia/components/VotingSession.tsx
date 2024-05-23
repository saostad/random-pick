import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import CarbonOutage from "~icons/carbon/outage";
import FlexibleModal from "./FlexibleModal";
import { useModal } from "../contexts/ModalContext";

const VotingSession: React.FC = () => {
  const {
    gameState,
    decreaseVote,
    increaseVote,
    resetVotes,
    markPlayerAsDead,
    setVotingStatus,
  } = useGameContext();
  const [votingStarted, setVotingStarted] = useState(false);
  const [votingEnded, setVotingEnded] = useState(false);
  const { handleOpen } = useModal();

  // Calculate the maximum votes and the players who have the maximum votes
  const alivePlayers = gameState.players.filter((p) => p.isAlive);
  const maxVotes = Math.max(...alivePlayers.map((player) => player.voteCount));
  const playersWithMaxVotes = alivePlayers.filter(
    (player) => player.voteCount === maxVotes && maxVotes > 0
  );

  const startVoting = () => {
    resetVotes();
    setVotingStarted(true);
    setVotingEnded(false);
    setVotingStatus("in_progress");
  };

  const endVoting = () => {
    setVotingStarted(false);
    setVotingEnded(true);
    setVotingStatus("finished");
  };

  return (
    <div>
      {!votingStarted && !votingEnded && (
        <button
          className="btn btn-ghost btn-outline btn-primary"
          onClick={() => {
            startVoting();
            handleOpen("voting-session");
          }}
        >
          Start Voting
        </button>
      )}
      <FlexibleModal modalId="voting-session">
        <div className="mb-4">
          {votingStarted && (
            <button
              className="btn btn-ghost btn-outline btn-secondary"
              onClick={endVoting}
            >
              End Voting
            </button>
          )}
          {!votingStarted && votingEnded && (
            <button
              className="btn btn-ghost btn-outline btn-primary"
              onClick={startVoting}
            >
              Start Voting Again!
            </button>
          )}
        </div>
        {votingStarted &&
          alivePlayers
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
        {votingEnded && playersWithMaxVotes.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <h3>Leading Players</h3>
            {playersWithMaxVotes.map((player) => (
              <div
                key={player.id}
                style={{ display: "flex", alignItems: "center" }}
              >
                <p>
                  {player.name}: {player.voteCount} vote
                  {player.voteCount > 1 ? "s" : ""}
                </p>
                <button
                  className="btn btn-outline btn-error ml-2"
                  onClick={() => markPlayerAsDead(player.id)}
                >
                  Mark as Dead <CarbonOutage />
                </button>
              </div>
            ))}
          </div>
        )}
      </FlexibleModal>
    </div>
  );
};

export default VotingSession;
