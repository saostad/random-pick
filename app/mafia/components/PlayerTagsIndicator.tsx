import React from "react";
import { TagExpiration, useGameContext } from "../contexts/GameContext";
import { useTranslations } from "next-intl";

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
  const { players, currentStepIndex } = gameState;
  const player = players.find((p) => p.id === playerId);

  const t = useTranslations("Mafia");

  if (!player) {
    return <div>{t("playerNotFound")}</div>;
  }

  /**
   * currentStepIndex
   * 0 => Day 0
   * 1 => Voting Session
   * 2 => Night 0
   * 3 => Day 1
   * 4 => Voting Session
   * 5 => Night 1
   *
   * what next-day means, when the currentStepIndex is:
   * - 0, it means the tag will expire on index 3
   * - 1, it means the tag will expire on index 3
   * - 2, it means the tag will expire on index 3
   */
  function getExpireAtIndex(
    expirationDate: TagExpiration,
    assignedAtIndex: number
  ) {
    if (expirationDate === "next-day") {
      return assignedAtIndex + (3 - (assignedAtIndex % 3));
    } else if (expirationDate === "this-night") {
      if (assignedAtIndex % 3 === 0) {
        return assignedAtIndex + 2;
      } else if (assignedAtIndex % 3 === 1) {
        return assignedAtIndex + 1;
      } else {
        return assignedAtIndex;
      }
    } else {
      throw new Error("Invalid expiration date");
    }
  }

  // just show not expired tags:
  // get getCurrentPhaseIndex from GameState
  // compare with tag.AssignedAt
  // show only if tag.AssignedAt > getCurrentPhaseIndex
  // or if tag.expires === "permanent"
  const activeTags = player.tags.filter((tag) => {
    if (tag.expires === "permanent") {
      return true;
    }
    return (
      getExpireAtIndex(tag.expires, tag.AssignedAtIndex) >= currentStepIndex
    );
  });

  return (
    <div className="indicator">
      {activeTags.map((tag, index) => (
        <span
          key={index}
          className={`indicator-item badge badge-primary ${
            positions[index % positions.length]
          }`}
        >
          {tag.tag}
        </span>
      ))}
      <div className="grid min-w-20 min-h-12 place-items-center">
        {player.name}
      </div>
    </div>
  );
};

export default PlayerTagsIndicator;
