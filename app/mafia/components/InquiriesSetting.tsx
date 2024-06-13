import React from "react";
import { useGameContext } from "../contexts/GameContext";

const InquiriesSetting: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const { inquiries } = gameState;

  const handleInquiriesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      updateGameState({
        inquiries: value !== "" ? parseInt(value, 10) : 0,
      });
    }
  };

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        Inquiries
        <input
          type="number"
          className="grow"
          placeholder="seconds"
          value={inquiries.toString()}
          onChange={handleInquiriesChange}
        />
      </label>
    </div>
  );
};

export default InquiriesSetting;
