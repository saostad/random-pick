import React, { useEffect, useRef, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import DayActionsControl from "./DayActionsControl";
import VotingSession from "./VotingSession";
import NightActionsControl from "./NightActionsControl";
import CarbonNextFilled from "~icons/carbon/next-filled";
import Animation from "./Animation";
import PlayerCounter from "./PlayerCounter";

const Wizard: React.FC = () => {
  const { gameState, setCurrentStepIndex } = useGameContext();
  const { dayCount, nightCount, votingStatus, currentStepIndex, players } =
    gameState;

  const sequence: string[] = [];
  for (let i = 0; i <= nightCount; i++) {
    sequence.push(`Day ${i}`);
    sequence.push(`Voting`);
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

  const handleNextPhase = () => {
    setCurrentStepIndex(Math.min(currentStepIndex + 1, sequence.length - 1));
  };

  const isCurrentStepFinished = () => {
    const currentStep = sequence[currentStepIndex];
    const currentDayIndex = Math.floor(currentStepIndex / 3);
    const currentNightIndex = Math.floor((currentStepIndex - 2) / 3);

    if (currentStep?.startsWith("Day")) {
      return dayCount > currentDayIndex;
    } else if (currentStep === "Voting") {
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
    } else if (currentStep === "Voting") {
      return <VotingSession />;
    } else if (currentStep?.startsWith("Night")) {
      return isCurrentStepFinished() ? null : <NightActionsControl />;
    }
    return null;
  };

  const getNextPhaseInfo = () => {
    if (currentStepIndex < sequence.length - 1) {
      return (
        <span>
          <span className="font-bold">Next Phase:</span>
          <span className="ml-2 underline">
            {sequence[currentStepIndex + 1]}
          </span>
        </span>
      );
    }
    return "No more phases";
  };

  return (
    <div>
      <PlayerCounter />
      <div ref={stepsContainerRef} className="overflow-x-auto mb-4">
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
                  index <= currentStepIndex ? "step-primary" : "step-success"
                }`}
                data-content={dataContent}
              >
                <span className="text-sm">{step}</span>
              </li>
            );
          })}
        </ul>
      </div>
      {isCurrentStepFinished() && (
        <>
          <Animation
            className=""
            src="mafia/animation/next.lottie"
            loop={true}
            autoplay={true}
          />
          {getNextPhaseInfo()}
          <button
            className="btn btn-outline btn-accent mt-4 ml-4"
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
