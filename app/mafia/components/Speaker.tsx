import React from "react";
import { Player } from "../contexts/GameContext";
import PlayerTagsIndicator from "./PlayerTagsIndicator";
import GlowingButton from "./GlowingButton";
import { useTranslations } from "next-intl";

interface SpeakerProps {
  currentSpeaker: Player | null;
  challengeMode: boolean;
  currentChallengerName: string | null;
  handleNextSpeaker: () => void;
  challengeModeDisabled: boolean;
}

const Speaker: React.FC<SpeakerProps> = ({
  currentSpeaker,
  challengeMode,
  currentChallengerName,
  handleNextSpeaker,
  challengeModeDisabled,
}) => {
  const t = useTranslations("Mafia");

  return (
    <>
      <div className="my-4">
        <b>{t("DayActions.currentSpeaker")}</b>{" "}
        {currentSpeaker ? (
          <>
            <PlayerTagsIndicator playerId={currentSpeaker.id} />
          </>
        ) : (
          "Unknown"
        )}
      </div>
      {challengeMode && currentChallengerName && (
        <p>
          <b>{t("DayActions.challenger")}</b> {currentChallengerName}{" "}
          {t("isChallenging")} {currentSpeaker?.name}
        </p>
      )}
      <GlowingButton
        onClick={handleNextSpeaker}
        disabled={challengeModeDisabled}
      >
        {t("DayActions.nextSpeaker")}
      </GlowingButton>
    </>
  );
};

export default Speaker;
