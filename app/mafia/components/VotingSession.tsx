import React from "react";
import { useGameContext } from "../contexts/GameContext";
import CarbonOutage from "~icons/carbon/outage";
import FlexibleModal from "./FlexibleModal";
import { useModal } from "../contexts/ModalContext";
import { getAlivePlayers } from "../utils/get-from-fns";
import Animation from "./Animation";
import GlowingButton from "./GlowingButton";
import IconoirEmojiPuzzled from "~icons/iconoir/emoji-puzzled";

const VotingSession: React.FC = () => {
  const {
    gameState,
    decreaseVote,
    increaseVote,
    resetVotes,
    markPlayerAsDead,
    setVotingStatus,
  } = useGameContext();
  const { votingStatus, players, speakingOrder, lastActionsActive } = gameState;
  const { handleOpen, handleClose } = useModal();

  const alivePlayers = getAlivePlayers({ players });
  const sortedPlayers = [...alivePlayers].sort(
    (a, b) => b.voteCount - a.voteCount
  );

  const startVoting = () => {
    resetVotes();
    setVotingStatus("in_progress");
  };

  const endVoting = () => {
    setVotingStatus("ousting");
  };

  const votingOustingEnd = (playerId?: string) => {
    if (playerId) {
      markPlayerAsDead({ playerId, reason: "vote" });

      if (lastActionsActive) {
        setVotingStatus("lastAction");
        handleOpen("LastActionPlayer");
      } else {
        setVotingStatus("finished");
      }
    } else {
      setVotingStatus("finished");
    }
    handleClose("voting-session");
  };

  return (
    <div>
      {votingStatus === "not_started" && (
        <div className="flex flex-col items-center mt-6">
          <GlowingButton
            className="btn-wide"
            onClick={() => {
              startVoting();
              handleOpen("voting-session");
            }}
          >
            <div className="flex">
              <span className="mr-4">Start Voting</span>
              <IconoirEmojiPuzzled />
            </div>
          </GlowingButton>
          <Animation
            className=""
            src="mafia/animation/think.lottie"
            loop={false}
            autoplay={true}
          />
        </div>
      )}
      {(votingStatus === "in_progress" || votingStatus === "ousting") && (
        <div className="flex flex-col items-center mt-6">
          <GlowingButton
            onClick={() => {
              handleOpen("voting-session");
            }}
            className="btn-wide"
          >
            Resume Voting
          </GlowingButton>
          <Animation
            className=""
            src="mafia/animation/think.lottie"
            loop={false}
            autoplay={true}
          />
        </div>
      )}
      {votingStatus === "lastAction" && (
        <div className="flex flex-col items-center mt-6">
          <Animation
            className=""
            src="mafia/animation/last-act.lottie"
            loop={false}
            autoplay={true}
          />
          <button
            className="btn btn-ghost btn-outline btn-primary"
            onClick={() => {
              handleOpen("LastActionPlayer");
            }}
          >
            Resume Last Action!
          </button>
        </div>
      )}

      <FlexibleModal modalId="voting-session" title="Voting Session">
        <div className="mb-5 grid place-items-center">
          <p className="text-center text-success my-4">
            {alivePlayers.length} Player{alivePlayers.length > 1 ? "s" : ""} in
            the game. Count/2 = {Math.ceil(alivePlayers.length / 2)}
          </p>
          {votingStatus === "in_progress" && (
            <GlowingButton onClick={endVoting} className="btn-wide">
              End Voting
            </GlowingButton>
          )}
          {votingStatus === "ousting" && (
            <div className="grid grid-cols-2 gap-4 my-4">
              <button
                className="btn btn-ghost btn-outline btn-primary"
                onClick={startVoting}
              >
                Start Again!
              </button>
              <button
                className="btn btn-outline btn-warning"
                onClick={() => {
                  votingOustingEnd();
                }}
              >
                End without Ousting!
              </button>
            </div>
          )}
        </div>
        {votingStatus === "in_progress" &&
          speakingOrder
            .map((index) => players[index])
            .map((player) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 4fr",
                  gap: "1rem",
                  alignItems: "center",
                  paddingBottom: "0.75rem",
                }}
                key={player.id}
              >
                <span style={{ marginRight: "1rem" }}>{player.name}</span>
                <div>
                  <button
                    className="btn btn-square btn-outline"
                    onClick={() => decreaseVote(player.id)}
                  >
                    -
                  </button>
                  {` Votes: ${player.voteCount} `}
                  <button
                    className="btn btn-square btn-outline"
                    onClick={() => increaseVote(player.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
        {votingStatus === "ousting" && (
          <div style={{ marginBottom: "1rem" }}>
            <h3 className="font-semibold text-xl my-4">Voting Results</h3>
            {sortedPlayers.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between my-2"
              >
                <p>
                  {player.name}: {player.voteCount} vote
                  {player.voteCount !== 1 ? "s" : ""}
                </p>
                <button
                  className="btn btn-outline btn-error ml-2"
                  onClick={() => {
                    votingOustingEnd(player.id);
                  }}
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
