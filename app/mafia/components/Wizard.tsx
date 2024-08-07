import React, { useEffect, useRef } from "react";
import { useGameContext } from "../contexts/GameContext";
import DayActionsControl from "./DayActionsControl";
import VotingSession from "./VotingSession";
import NightActionsControl from "./NightActionsControl";
import Animation from "./Animation";
import { useModal } from "../contexts/ModalContext";
import GlowingButton from "./GlowingButton";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Mafia");

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
          <span className="font-bold">{t("Wizard.nextPhase")}</span>
          <span className="mx-2 underline">
            {sequence[currentStepIndex + 1]}
          </span>
        </span>
      );
    }
    return <span>{t("noMorePhases")}</span>;
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
            >
              {t("Wizard.letsGo")} <span className="ml-2">🚀</span>
            </GlowingButton>
          </div>
          <Animation
            className="max-w-64 max-h-64 m-auto"
            src="mafia/animation/next.lottie"
            loop={true}
            autoplay={true}
          />

          {isCurrentStepFinished() &&
            sequence[currentStepIndex]?.startsWith("Night") && (
              <div>
                <div className="my-4">
                  {sequenceEvents.length > 0 ? (
                    <>
                      <div>
                        {offerInquiries &&
                          inquiries > 0 &&
                          sequence[currentStepIndex + 1]?.startsWith("Day") && (
                            <div className="flex justify-center">
                              <button
                                className="btn btn-warning btn-outline btn-wide"
                                onClick={() => handleOpen("Inquiries")}
                              >
                                {t("Wizard.wantAnInquiry")} 🕵️‍♂️ ({inquiries}{" "}
                                left)
                              </button>
                            </div>
                          )}
                      </div>
                      <div className="flex flex-col my-4">
                        <div className="text-xl font-bold">
                          {t("Wizard.lastNightEvents")}
                        </div>
                        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                          {sequenceEvents.map((event) => (
                            <li
                              key={event.timestamp}
                              className="flex items-center"
                            >
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
                    </>
                  ) : (
                    <div role="alert" className="flex alert shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info shrink-0 w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>

                      <span className="">{t("Wizard.quiteNight")}</span>

                      <Animation
                        className="max-w-36 max-h-36 m-auto"
                        src="mafia/animation/sleepy-cat.lottie"
                        loop={true}
                        autoplay={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      )}
      <div className="step-content">{renderStep()}</div>
    </div>
  );
};

export default Wizard;
