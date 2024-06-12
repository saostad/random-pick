import React from "react";
import { useGameContext } from "../contexts/GameContext";
import FlexibleModal from "./FlexibleModal";
import CarbonRenew from "~icons/carbon/renew.jsx";
import { useModal } from "../contexts/ModalContext";
import DropdownButton from "./DropdownButton"; // Import the new DropdownButton component

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

  return (
    <>
      <FlexibleModal modalId="soft-reset" title="Next Round">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Game reset successful!:
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
            Player statuses reset.
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
            Votes reset.
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
            Roles unassigned.
          </li>
        </ul>
      </FlexibleModal>
      <FlexibleModal modalId="hard-reset" title="Game Reset">
        Everything cleaned up, Let&apos;s start fresh!
      </FlexibleModal>
      <DropdownButton
        title={
          <>
            <CarbonRenew /> New
          </>
        }
      >
        <button
          className="btn btn-ghost btn-outline btn-secondary btn-sm mb-3"
          onClick={handleSoftReset}
        >
          Next Round!
        </button>

        <button
          className="btn btn-ghost btn-outline btn-secondary btn-sm mb-2"
          onClick={handleHardReset}
        >
          Hard Reset
        </button>
      </DropdownButton>
    </>
  );
};

export default NewGameButton;
