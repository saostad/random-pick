import React from "react";
import { Player } from "../contexts/GameContext";
import PlayerTagsIndicator from "./PlayerTagsIndicator";
import GlowingButton from "./GlowingButton";

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
  return (
    <>
      <div className="my-4">
        <b>Current Speaker:</b>{" "}
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
          <b>Challenger:</b> {currentChallengerName} is challenging{" "}
          {currentSpeaker?.name}
        </p>
      )}
      <GlowingButton
        onClick={handleNextSpeaker}
        disabled={challengeModeDisabled}
      >
        Next Speaker
      </GlowingButton>
    </>
  );
};

export default Speaker;
