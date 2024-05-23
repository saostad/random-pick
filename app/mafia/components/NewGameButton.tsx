import React, { useRef } from "react";
import { useGameContext } from "../contexts/GameContext";
import FlexibleModal from "./FlexibleModal";
import CarbonRenew from "~icons/carbon/renew.jsx";
import { useModal } from "../contexts/ModalContext";

const NewGameButton: React.FC = () => {
  const { resetGameState, softResetGameState } = useGameContext();
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const { handleOpen } = useModal();

  const handleSoftReset = () => {
    softResetGameState();
    if (dropdownRef.current) {
      dropdownRef.current.open = false;
    }
  };

  const handleHardReset = () => {
    resetGameState();
    if (dropdownRef.current) {
      dropdownRef.current.open = false;
    }
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
      <details className="dropdown" ref={dropdownRef}>
        <summary className="btn p4 btn-outline">
          New <CarbonRenew />
        </summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box ">
          <button
            className="btn btn-ghost btn-outline btn-secondary btn-sm mb-3"
            onClick={() => {
              handleSoftReset();
              handleOpen("soft-reset");
            }}
          >
            Next Round!
          </button>

          <button
            className="btn btn-ghost btn-outline btn-secondary btn-sm mb-2"
            onClick={() => {
              handleHardReset();
              handleOpen("hard-reset");
            }}
          >
            Hard Reset
          </button>
        </ul>
      </details>
    </>
  );
};

export default NewGameButton;
