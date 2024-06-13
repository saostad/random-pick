import React, { useEffect, useRef } from "react";
import { useGameContext } from "../contexts/GameContext";
import DayActionsControl from "./DayActionsControl";
import VotingSession from "./VotingSession";
import NightActionsControl from "./NightActionsControl";
import Animation from "./Animation";

const Wizard: React.FC = () => {
  const { gameState, setCurrentStepIndex } = useGameContext();
  const { dayCount, nightCount, votingStatus, currentStepIndex } = gameState;

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
      <div ref={stepsContainerRef} className="overflow-x-auto pb-4">
        <ul className="steps">
          {sequence.map((step, index) => {
            let dataContent: string = "?";
            if (index < currentStepIndex) {
              dataContent = "✓";
            } else if (index === currentStepIndex) {
              dataContent = "★";
            }

            return (
              <li
                key={index}
                className={`step ${
                  index === currentStepIndex
                    ? "step-warning"
                    : (index >= currentStepIndex && "step-neutral") ||
                      "step-success"
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
            className="btn relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 mt-4 ml-4"
            onClick={handleNextPhase}
            disabled={
              !isCurrentStepFinished() ||
              currentStepIndex >= sequence.length - 1
            }
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Let&apos;s Go!
            </span>
          </button>
        </>
      )}
      <div className="step-content">{renderStep()}</div>
    </div>
  );
};

export default Wizard;
