import React from "react";
import { useGameContext } from "../contexts/GameContext";
import { useTranslations } from "next-intl";

const TimerSettings: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const {
    challengeTime,
    challengeTimeEnabled,
    speakingTime,
    speakingTimeEnabled,
  } = gameState;

  const t = useTranslations("Mafia");

  const handleChallengeTimeToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateGameState({
      challengeTimeEnabled: event.target.checked,
    });
  };

  const handleChallengeTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      updateGameState({
        challengeTime: value !== "" ? parseInt(value, 10) : 0,
      });
    }
  };

  const handleSpeakingTimeToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateGameState({
      speakingTimeEnabled: event.target.checked,
    });
  };

  const handleSpeakingTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      updateGameState({
        speakingTime: value !== "" ? parseInt(value, 10) : 0,
      });
    }
  };

  return (
    <div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">
            {t("TimerSettings.playSoundInSpeakingTime")}
          </span>
          <input
            type="checkbox"
            checked={speakingTimeEnabled}
            onChange={handleSpeakingTimeToggle}
            className="checkbox checkbox-primary"
          />
        </label>
      </div>
      <label className="input input-bordered flex items-center gap-2">
        {t("TimerSettings.seconds")}
        <input
          type="number"
          className="grow"
          placeholder="seconds"
          value={speakingTime.toString()}
          onChange={handleSpeakingTimeChange}
          disabled={!speakingTimeEnabled}
        />
      </label>
      <div className="divider"></div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">
            {t("TimerSettings.playSoundInChallengeMode")}
          </span>
          <input
            type="checkbox"
            checked={challengeTimeEnabled}
            onChange={handleChallengeTimeToggle}
            className="checkbox checkbox-primary"
          />
        </label>
      </div>
      <label className="input input-bordered flex items-center gap-2">
        {t("TimerSettings.seconds")}
        <input
          type="number"
          className="grow"
          placeholder="seconds"
          value={challengeTime.toString()}
          onChange={handleChallengeTimeChange}
          disabled={!challengeTimeEnabled}
        />
      </label>
    </div>
  );
};

export default TimerSettings;
