import React, { FC } from "react";
import { Player, useGameContext } from "../contexts/GameContext";
import CarbonOutage from "~icons/carbon/outage";
import FlexibleModal from "./FlexibleModal";
import { useModal } from "../contexts/ModalContext";
import { getAlivePlayers } from "../utils/get-from-fns";
import Animation from "./Animation";
import GlowingButton from "./GlowingButton";
import IconoirEmojiPuzzled from "~icons/iconoir/emoji-puzzled";
import VotingInProgress from "./VotingInProgress";
import { useTranslations } from "next-intl";

const VotingSession: React.FC = () => {
  const { gameState, resetVotes, markPlayerAsDead, setVotingStatus } =
    useGameContext();
  const { votingStatus, players, lastActionsActive } = gameState;
  const { handleOpen, handleClose } = useModal();

  const alivePlayers = getAlivePlayers({ players });
  const sortedPlayers = [...alivePlayers].sort(
    (a, b) => b.voteCount - a.voteCount
  );

  const t = useTranslations("Mafia");

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
              <span className="mr-4">{t("VotingSession.startVoting")}</span>
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
            {t("VotingSession.resumeVoting")}
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
            {t("VotingSession.resumeLastAction")}
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
              {t("VotingSession.endVoting")}
            </GlowingButton>
          )}
          {votingStatus === "ousting" && (
            <div className="grid grid-cols-2 gap-4 my-4">
              <button
                className="btn btn-ghost btn-outline btn-primary"
                onClick={startVoting}
              >
                {t("VotingSession.startAgain")}
              </button>
              <button
                className="btn btn-outline btn-warning"
                onClick={() => {
                  votingOustingEnd();
                }}
              >
                {t("VotingSession.endWithoutOusting")}
              </button>
            </div>
          )}
        </div>
        {votingStatus === "in_progress" && (
          <VotingInProgress endVoting={endVoting} />
        )}
        {votingStatus === "ousting" && (
          <div style={{ marginBottom: "1rem" }}>
            <h3 className="font-semibold text-xl my-4">
              {t("VotingSession.votingResults")}
            </h3>
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
                  {t("VotingSession.markAsDead")} <CarbonOutage />
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
