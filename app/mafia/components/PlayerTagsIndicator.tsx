import React from "react";
import { useGameContext } from "../contexts/GameContext";

type PlayerTagsIndicatorProps = {
  playerId: string;
};

const positions = [
  "indicator-top indicator-start",
  "indicator-top indicator-end",
  "indicator-bottom indicator-start",
  "indicator-bottom indicator-end",
  "indicator-top indicator-center",
  "indicator-bottom indicator-center",
];

const PlayerTagsIndicator: React.FC<PlayerTagsIndicatorProps> = ({
  playerId,
}) => {
  const { gameState } = useGameContext();
  const player = gameState.players.find((p) => p.id === playerId);

  if (!player) {
    return <div>Player not found</div>;
  }

  return (
    <div className="indicator">
      {player.tags.map((tag, index) => (
        <span
          key={index}
          className={`indicator-item badge badge-primary ${
            positions[index % positions.length]
          }`}
        >
          {tag.tag}
        </span>
      ))}
      <div className="grid min-w-24 min-h-12 place-items-center">
        {player.name}
      </div>
    </div>
  );
};

export default PlayerTagsIndicator;
