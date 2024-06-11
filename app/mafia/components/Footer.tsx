import React from "react";
import { useGameContext } from "../contexts/GameContext";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { updateGameState, gameState } = useGameContext();

  const onNavigate = (tab: string) => {
    updateGameState({ ...gameState, activeTab: tab });
  };

  const { activeTab } = gameState;

  return (
    <div className="btm-nav container mx-auto max-w-lg">
      <button
        onClick={() => onNavigate("home")}
        className={`text-primary ${
          activeTab === "home" ? "active" : ""
        } transition duration-500 ease-in-out transform ${
          activeTab === "home" ? "scale-110" : "scale-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </button>
      <button
        onClick={() => onNavigate("about")}
        className={`text-primary ${
          activeTab === "about" ? "active" : ""
        } transition duration-500 ease-in-out transform ${
          activeTab === "about" ? "scale-110" : "scale-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button
        onClick={() => onNavigate("contact")}
        className={`text-primary ${
          activeTab === "contact" ? "active" : ""
        } transition duration-500 ease-in-out transform ${
          activeTab === "contact" ? "scale-110" : "scale-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Footer;
