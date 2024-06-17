import React from "react";
import { useGameContext } from "../contexts/GameContext";

import CarbonCloudAuditing from "~icons/carbon/cloud-auditing";
import CarbonSettingsCheck from "~icons/carbon/settings-check";
import IconParkOutlineGamePs from "~icons/icon-park-outline/game-ps";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { updateGameState, gameState } = useGameContext();

  const onNavigate = (tab: (typeof gameState)["activeTab"]) => {
    updateGameState({ activeTab: tab });
  };

  const { activeTab } = gameState;

  return (
    <div className="btm-nav container mx-auto max-w-lg">
      <button
        onClick={() => onNavigate("home")}
        className={`textarea-accent ${
          activeTab === "home" ? "active text-accent" : ""
        } transition duration-500 ease-in-out transform ${
          activeTab === "home" ? "scale-110" : "scale-100"
        }`}
      >
        <IconParkOutlineGamePs />
        Game
      </button>
      <button
        onClick={() => onNavigate("timeline")}
        className={`textarea-accent ${
          activeTab === "timeline" ? "active text-accent" : ""
        } transition duration-500 ease-in-out transform ${
          activeTab === "timeline" ? "scale-110" : "scale-100"
        }`}
      >
        <CarbonCloudAuditing />
        Timeline
      </button>
      <button
        onClick={() => onNavigate("settings")}
        className={`textarea-accent ${
          activeTab === "settings" ? "active text-accent" : ""
        } transition duration-500 ease-in-out transform ${
          activeTab === "settings" ? "scale-110" : "scale-100"
        }`}
      >
        <CarbonSettingsCheck />
        Settings
      </button>
    </div>
  );
};

export default Footer;
