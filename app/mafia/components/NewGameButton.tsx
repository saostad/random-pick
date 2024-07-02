import React from "react";
import { useGameContext } from "../contexts/GameContext";
import FlexibleModal from "./FlexibleModal";
import CarbonRenew from "~icons/carbon/renew.jsx";
import { useModal } from "../contexts/ModalContext";
import DropdownButton from "./DropdownButton"; // Import the new DropdownButton component
import { useTranslations } from "next-intl";

const NewGameButton: React.FC = () => {
  const { resetGameState, softResetGameState } = useGameContext();
  const { handleOpen } = useModal();

  const handleSoftReset = () => {
    softResetGameState();
    handleOpen("soft-reset");
  };

  const handleHardReset = () => {
    resetGameState();
    handleOpen("hard-reset");
  };

  const t = useTranslations("Mafia");

  return (
    <>
      <FlexibleModal modalId="soft-reset" title="Next Round">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {t("gameResetSuccessful")}
        </h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          <li className="flex items-center">
            <svg
              className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            {t("NewGameButton.playerStatusesReset")}
          </li>
          <li className="flex items-center">
            <svg
              className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            {t("NewGameButton.votesReset")}
          </li>
          <li className="flex items-center">
            <svg
              className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            {t("NewGameButton.rolesUnassigned")}
          </li>
          <li className="flex items-center">
            <svg
              className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            {t("NewGameButton.lastActionsReset")}
          </li>
          <li className="flex items-center">
            <svg
              className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            {t("NewGameButton.inquiriesSet")}
          </li>
        </ul>
      </FlexibleModal>
      <FlexibleModal modalId="hard-reset" title="Game Reset">
        {t("everythingCleanedUpLetsStartFresh")}
      </FlexibleModal>
      <DropdownButton
        title={
          <>
            <CarbonRenew /> {t("NewGameButton.resetGame")}
          </>
        }
      >
        <button
          className="btn btn-ghost btn-outline btn-secondary btn-sm mb-3"
          onClick={handleSoftReset}
        >
          {t("NewGameButton.nextRound")}
        </button>

        <button
          className="btn btn-ghost btn-outline btn-secondary btn-sm mb-2"
          onClick={handleHardReset}
        >
          {t("NewGameButton.hardReset")}
        </button>
      </DropdownButton>
    </>
  );
};

export default NewGameButton;
