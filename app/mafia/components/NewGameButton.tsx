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
        <div>
          <ul>
            <li>Player statuses reset.</li>
            <li>Votes reset.</li>
            <li>Roles unassigned.</li>
          </ul>
        </div>
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
