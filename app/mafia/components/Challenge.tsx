import React from "react";
import { Player } from "../contexts/GameContext";
import { useTranslations } from "next-intl";

interface ChallengeProps {
  challengeMode: boolean;
  selectedChallenger: string;
  handleChallengerChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStartChallenge: () => void;
  handleEndChallenge: () => void;
  availableChallengers: Player[];
  challengeModeDisabled: boolean;
  speakerHasChallenged: boolean;
}

const Challenge: React.FC<ChallengeProps> = ({
  challengeMode,
  selectedChallenger,
  handleChallengerChange,
  handleStartChallenge,
  handleEndChallenge,
  availableChallengers,
  challengeModeDisabled,
  speakerHasChallenged,
}) => {
  const t = useTranslations("Mafia");

  return (
    <>
      <div className="my-4">
        <label htmlFor="challenger">{t("DayActions.challenger")}</label>
        <select
          className="select select-secondary w-full max-w-xs my-2"
          id="challenger"
          value={selectedChallenger}
          onChange={handleChallengerChange}
          disabled={
            challengeMode ||
            speakerHasChallenged ||
            availableChallengers.length === 0
          }
        >
          <option value="" disabled>
            {t("selectChallenger")}
          </option>
          {availableChallengers.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-ghost btn-outline btn-warning mb-2"
        onClick={handleStartChallenge}
        disabled={challengeModeDisabled || !selectedChallenger}
      >
        {t("DayActions.startChallenge")}
      </button>
      <button
        className="btn btn-ghost btn-outline btn-success mb-2 mx-2"
        onClick={handleEndChallenge}
        disabled={!challengeMode}
      >
        {t("DayActions.endChallenge")}
      </button>
    </>
  );
};

export default Challenge;
