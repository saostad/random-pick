import React, { useEffect, useRef } from "react";
import { useGameContext } from "../contexts/GameContext";
import DayActionsControl from "./DayActionsControl";
import VotingSession from "./VotingSession";
import NightActionsControl from "./NightActionsControl";
import Animation from "./Animation";
import { useModal } from "../contexts/ModalContext";
import GlowingButton from "./GlowingButton";

const Wizard: React.FC = () => {
  const { gameState, setCurrentStepIndex, getEventsByPhase } = useGameContext();
  const {
    dayCount,
    nightCount,
    votingStatus,
    currentStepIndex,
    offerInquiries,
    inquiries,
  } = gameState;

  const { handleOpen } = useModal();

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
    return "No more phases!";
  };

  // remove the space between sequence[currentStepIndex] like "Night 1" -> "Night1"
  const sequenceTrimmed = sequence[currentStepIndex]?.replace(/\s/g, "");
  const sequenceEvents = getEventsByPhase(sequenceTrimmed);

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
        <div>
          <div className="grid grid-cols-2 place-items-center mt-8">
            <span className="">{getNextPhaseInfo()}</span>
            <GlowingButton
              onClick={handleNextPhase}
              disabled={
                !isCurrentStepFinished() ||
                currentStepIndex >= sequence.length - 1
              }
              className=""
            >
              Let&apos;s Go! <span className="ml-2">🚀</span>
            </GlowingButton>
          </div>
          <Animation
            className="max-w-56 max-h-56 m-auto"
            src="mafia/animation/next.lottie"
            loop={true}
            autoplay={true}
          />
          {isCurrentStepFinished() &&
            sequence[currentStepIndex]?.startsWith("Night") && (
              <div className="my-4">
                {sequenceEvents.length > 0 ? (
                  <div className="flex flex-col">
                    <div className="text-xl font-bold">Last Night Events:</div>
                    <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                      {sequenceEvents.map((event) => (
                        <li key={event.timestamp} className="flex items-center">
                          <svg
                            className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                          </svg>
                          {event.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>No events happened last night</div>
                )}
              </div>
            )}
          {offerInquiries &&
            inquiries > 0 &&
            sequence[currentStepIndex + 1]?.startsWith("Day") && (
              <div className="flex justify-center">
                <button
                  className="btn btn-success btn-outline my-4"
                  onClick={() => handleOpen("Inquiries")}
                >
                  Do you want to inquiry?
                </button>
              </div>
            )}
        </div>
      )}
      <div className="step-content">{renderStep()}</div>
    </div>
  );
};

export default Wizard;
