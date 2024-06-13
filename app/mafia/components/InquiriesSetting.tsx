import React from "react";
import { useGameContext } from "../contexts/GameContext";

const InquiriesSetting: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const { inquiries, offerInquiries } = gameState;

  const handleOfferInquiriesToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateGameState({
      offerInquiries: event.target.checked,
    });
  };

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
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Offer inquiries before day begins?</span>
          <input
            type="checkbox"
            checked={offerInquiries}
            onChange={handleOfferInquiriesToggle}
            className="checkbox checkbox-primary"
          />
        </label>
      </div>
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
    </div>
  );
};

export default InquiriesSetting;
