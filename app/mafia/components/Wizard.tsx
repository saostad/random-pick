import React, { useEffect, useRef, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import DayActionsControl from "./DayActionsControl";
import VotingSession from "./VotingSession";
import NightActionsControl from "./NightActionsControl";
import CarbonNextFilled from "~icons/carbon/next-filled";

const Wizard: React.FC = () => {
  const { gameState, setVotingStatus, setCurrentStepIndex } = useGameContext();
  const { dayCount, nightCount, votingStatus, currentStepIndex } = gameState;

  const sequence: string[] = [];
  for (let i = 0; i <= nightCount; i++) {
    sequence.push(`Day ${i}`);
    sequence.push(`Voting Session`);
    sequence.push(`Night ${i}`);
  }

  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the end of the steps container when new steps are added
    if (stepsContainerRef.current) {
      stepsContainerRef.current.scrollLeft =
        stepsContainerRef.current.scrollWidth;
    }
  }, [sequence.length]);

  useEffect(() => {
    // Reset voting status at the beginning of each voting session
    if (
      sequence[currentStepIndex] === "Voting Session" &&
      votingStatus === "not_started"
    ) {
      setVotingStatus("in_progress");
    }
  }, [currentStepIndex, sequence, setVotingStatus, votingStatus]);

  const handleNextPhase = () => {
    setCurrentStepIndex(Math.min(currentStepIndex + 1, sequence.length - 1));
  };

  const isCurrentStepFinished = () => {
    const currentStep = sequence[currentStepIndex];
    const currentDayIndex = Math.floor(currentStepIndex / 3);
    const currentNightIndex = Math.floor((currentStepIndex - 2) / 3);

    if (currentStep?.startsWith("Day")) {
      return dayCount > currentDayIndex;
    } else if (currentStep === "Voting Session") {
      return votingStatus === "finished";
    } else if (currentStep?.startsWith("Night")) {
      return nightCount > currentNightIndex;
    }
    return false;
  };

  const renderStep = () => {
    const currentStep = sequence[currentStepIndex];
    if (currentStep?.startsWith("Day")) {
      return isCurrentStepFinished() ? null : <DayActionsControl />;
    } else if (currentStep === "Voting Session") {
      return <VotingSession />;
    } else if (currentStep?.startsWith("Night")) {
      return isCurrentStepFinished() ? null : <NightActionsControl />;
    }
    return null;
  };

  const getNextPhaseInfo = () => {
    if (currentStepIndex < sequence.length - 1) {
      return `Next Phase: ${sequence[currentStepIndex + 1]}`;
    }
    return "No more phases";
  };

  return (
    <div>
      <div ref={stepsContainerRef} className="overflow-x-auto">
        <ul className="steps">
          {sequence.map((step, index) => {
            let dataContent = "?";
            if (index < currentStepIndex) {
              dataContent = "✓";
            } else if (index === currentStepIndex) {
              dataContent = "★";
            }

            return (
              <li
                key={index}
                className={`step ${
                  index <= currentStepIndex ? "step-info" : "step-error"
                }`}
                data-content={dataContent}
              >
                {step}
              </li>
            );
          })}
        </ul>
      </div>
      {(isCurrentStepFinished() ||
        sequence[currentStepIndex] === "Voting Session") && (
        <>
          {getNextPhaseInfo()}
          <button
            className="btn btn-ghost btn-outline btn-secondary mt-4 ml-4"
            onClick={handleNextPhase}
            disabled={
              !isCurrentStepFinished() ||
              currentStepIndex >= sequence.length - 1
            }
          >
            Let&apos;s Go! <CarbonNextFilled />
          </button>
        </>
      )}
      <div className="step-content">{renderStep()}</div>
    </div>
  );
};

export default Wizard;
