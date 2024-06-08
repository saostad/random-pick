import React, { use, useEffect, useState } from "react";
import CarbonOutage from "~icons/carbon/outage";
import FlexibleModal from "./FlexibleModal";
import { useModal } from "../contexts/ModalContext";
import { useGameContext } from "../contexts/GameContext";
import { getAlivePlayers } from "../utils/get-from-fns";
import Animation from "./Animation";

const VotingSession: React.FC = () => {
  const {
    gameState,
    decreaseVote,
    increaseVote,
    resetVotes,
    markPlayerAsDead,
    setVotingStatus,
  } = useGameContext();
  const { handleOpen, handleClose } = useModal();
  const { votingStatus, players, speakingOrder } = gameState;

  // Calculate the maximum votes and the players who have the maximum votes
  const alivePlayers = getAlivePlayers({ players });
  const maxVotes = Math.max(...alivePlayers.map((player) => player.voteCount));
  const playersWithMaxVotes = alivePlayers.filter(
    (player) => player.voteCount === maxVotes && maxVotes > 0
  );

  const startVoting = () => {
    resetVotes();
    setVotingStatus("in_progress");
  };

  const endVoting = () => {
    if (playersWithMaxVotes.length === 0) {
      setVotingStatus("finished");
    } else {
      setVotingStatus("voting_elimination");
    }
  };

  const votingEliminationEnd = () => {
    setVotingStatus("finished");
    handleClose("voting-session");
  };

  const endVotingWithoutElimination = () => {
    setVotingStatus("finished");
    handleClose("voting-session");
  };

  return (
    <div>
      {votingStatus === "not_started" && (
        <>
          <Animation
            className=""
            src="mafia/animation/think.lottie"
            loop={false}
            autoplay={true}
          />
          <button
            className="btn btn-ghost btn-outline btn-primary"
            onClick={() => {
              startVoting();
              handleOpen("voting-session");
            }}
          >
            Start Voting
          </button>
        </>
      )}
      {votingStatus === "in_progress" ||
      votingStatus === "voting_elimination" ? (
        <button
          className="btn btn-ghost btn-outline btn-primary"
          onClick={() => {
            handleOpen("voting-session");
          }}
        >
          Resume Voting
        </button>
      ) : null}
      <FlexibleModal modalId="voting-session" title="Voting Session">
        <div className="mb-4">
          <p className="text-center text-success">
            {alivePlayers.length} Player{alivePlayers.length > 1 ? "s" : ""} in
            the game. Count/2 = {Math.ceil(alivePlayers.length / 2)}
          </p>
          {votingStatus === "in_progress" && (
            <button
              className="btn btn-ghost btn-outline btn-primary"
              onClick={endVoting}
            >
              End Voting
            </button>
          )}
          {votingStatus === "voting_elimination" && (
            <>
              <button
                className="btn btn-ghost btn-outline btn-primary"
                onClick={startVoting}
              >
                Start Voting Again!
              </button>
            </>
          )}
        </div>
        {votingStatus === "in_progress" &&
          speakingOrder
            .map((index) => players[index])
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
        {votingStatus === "voting_elimination" &&
        playersWithMaxVotes.length > 0 ? (
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
                  onClick={() => {
                    markPlayerAsDead(player.id);
                    votingEliminationEnd();
                  }}
                >
                  Mark as Dead <CarbonOutage />
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline btn-warning my-4"
              onClick={() => {
                endVotingWithoutElimination();
              }}
            >
              End voting without elimination!
            </button>
          </div>
        ) : (
          votingStatus === "finished" && "No player has the most votes!"
        )}
      </FlexibleModal>
    </div>
  );
};

export default VotingSession;
