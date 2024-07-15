import { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import VotingButtons from "./VotingButtons";
import MultiVoting from "./MultiVoting";

type VotingInProgressProps = {
  endVoting: () => void;
};

const VotingInProgress: React.FC<VotingInProgressProps> = ({ endVoting }) => {
  const { gameState, decreaseVote, increaseVote } = useGameContext();
  const { players, speakingOrder } = gameState;

  const [activeTab, setActiveTab] = useState<
    "simple" | "multi-voting" | "single-voting"
  >("simple");

  const playerVoters = speakingOrder.map((index) => players[index]);

  return (
    <>
      <div className="flex justify-center">
        <div className="join mb-4">
          <input
            className={`join-item btn ${
              activeTab === "simple" ? "btn-active btn-primary" : ""
            }`}
            type="radio"
            name="options"
            aria-label="Simple"
            checked={activeTab === "simple"}
            onChange={() => setActiveTab("simple")}
          />
          <input
            className={`join-item btn ${
              activeTab === "multi-voting" ? "btn-active btn-primary" : ""
            }`}
            type="radio"
            name="options"
            aria-label="Multi Voting"
            checked={activeTab === "multi-voting"}
            onChange={() => setActiveTab("multi-voting")}
          />
          <input
            className={`join-item btn ${
              activeTab === "single-voting" ? "btn-active btn-primary" : ""
            }`}
            type="radio"
            name="options"
            aria-label="Single Voting"
            checked={activeTab === "single-voting"}
            onChange={() => setActiveTab("single-voting")}
          />
        </div>
      </div>

      {activeTab === "simple" ? (
        <div>
          {playerVoters.map((player) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 4fr",
                gap: "1rem",
                alignItems: "center",
                paddingBottom: "0.75rem",
              }}
              key={player.id}
            >
              <span style={{ marginRight: "1rem" }}>{player.name}</span>
              <VotingButtons
                player={player}
                decreaseVote={decreaseVote}
                increaseVote={increaseVote}
              />
            </div>
          ))}
        </div>
      ) : null}

      {activeTab === "multi-voting" ? (
        <MultiVoting
          decreaseVote={decreaseVote}
          increaseVote={increaseVote}
          players={playerVoters}
          onEndVoting={endVoting}
        />
      ) : null}

      {activeTab === "single-voting" ? (
        <Line start={{ x: 0, y: 0 }} end={{ x: 100, y: 100 }} />
      ) : null}
    </>
  );
};

export default VotingInProgress;

import { useSpring, animated } from "@react-spring/web";

type LineProps = {
  start: { x: number; y: number };
  end: { x: number; y: number };
};

const Line: React.FC<LineProps> = ({ start, end }) => {
  const animatedLine = useSpring({
    from: { x2: start.x, y2: start.y },
    to: { x2: end.x, y2: end.y },
    config: { duration: 500 }, // Animation duration
  });

  return (
    <svg width="200" height="200">
      <animated.line
        x1={start.x}
        y1={start.y}
        x2={animatedLine.x2}
        y2={animatedLine.y2}
        stroke="black"
      />
    </svg>
  );
};
