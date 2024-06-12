import React from "react";
import { Player } from "../contexts/GameContext";
import PlayerTagsIndicator from "./PlayerTagsIndicator";

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
      <button
        className="btn relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        onClick={handleNextSpeaker}
        disabled={challengeModeDisabled}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Next Speaker
        </span>
      </button>
    </>
  );
};

export default Speaker;
