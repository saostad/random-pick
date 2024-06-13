import { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { getAlivePlayers, getDeadPlayers } from "../utils/get-from-fns";
import FlexibleModal from "./FlexibleModal";
import { useModal } from "../contexts/ModalContext";

const GameStats: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const { handleOpen } = useModal();
  const { gameState } = useGameContext();
  const {
    challengeTime,
    challengeTimeEnabled,
    speakingTime,
    speakingTimeEnabled,
    players,
  } = gameState;
  return (
    <>
      <FlexibleModal modalId="StatList">
        <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </FlexibleModal>
      <div className="stats container max-w-lg">
        <div className="stat">
          <div className="stat-title">Players</div>
          <div
            className="stat-value text-primary"
            onClick={() => {
              setItems(getAlivePlayers({ players }).map((p) => p.name));
              handleOpen("StatList");
            }}
          >
            {getAlivePlayers({ players }).length}
          </div>
          <div className="stat-desc">
            <span>out of {players.length}</span>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Dead</div>
          <div
            className="stat-value text-warning"
            onClick={() => {
              setItems(getDeadPlayers({ players }).map((p) => p.name));
              handleOpen("StatList");
            }}
          >
            {getDeadPlayers({ players }).length}
          </div>
          <div className="stat-desc">
            <span>out of {players.length}</span>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Inquiry</div>
          <div
            className="stat-value text-success"
            onClick={() => {
              handleOpen("Inquiries");
            }}
          >
            {gameState.inquiries}
          </div>
          <div className="stat-desc">left.</div>
        </div>

        <div className="stat">
          <div className="stat-title">Timers</div>
          <div
            onClick={() => {
              handleOpen("TimerSettings");
            }}
            className="stat-desc text-info"
          >
            {speakingTimeEnabled && (
              <p className="my-4">Speaker: {speakingTime}s</p>
            )}
            {challengeTimeEnabled && <p>Challenger: {challengeTime}s</p>}
            {!speakingTimeEnabled && !challengeTimeEnabled && "Not timer set"}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameStats;
