import React from "react";
import { Player } from "../contexts/GameContext";

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
      <p>
        <b>Current Speaker:</b> {currentSpeaker?.name || "Unknown"}
      </p>
      {challengeMode && currentChallengerName && (
        <p>
          <b>Challenger:</b> {currentChallengerName} is challenging{" "}
          {currentSpeaker?.name}
        </p>
      )}
      <button
        className="btn btn-ghost btn-outline btn-primary"
        onClick={handleNextSpeaker}
        disabled={challengeModeDisabled}
      >
        Next Speaker
      </button>
    </>
  );
};

export default Speaker;
