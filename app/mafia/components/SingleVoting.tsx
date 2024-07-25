import React, { useState, useRef, useEffect } from "react";
import { Player, useGameContext } from "../contexts/GameContext";
import { getPlayerNameById } from "../utils/get-from-fns";
import { useTranslations } from "next-intl";

type SingleVotingProps = {
  players: Player[];
  increaseVote: (playerId: string) => void;
  onEndVoting: () => void;
};

const SingleVoting: React.FC<SingleVotingProps> = ({
  players,
  increaseVote,
  onEndVoting,
}) => {
  const t = useTranslations("Mafia");
  const { addEvent } = useGameContext();
  const [chosenPlayer, setChosenPlayer] = useState<string>("");
  const [turnIndex, setTurnIndex] = useState(0);
  const [line, setLine] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const getItemPosition = (index: number) => {
    if (!gridRef.current) return { x: 0, y: 0 };
    const gridItem = gridRef.current.children[index] as HTMLElement;
    const rect = gridItem.getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();
    return {
      x: rect.left - gridRect.left + rect.width / 2,
      y: rect.top - gridRect.top + rect.height / 2,
    };
  };

  useEffect(() => {
    if (chosenPlayer) {
      const currentPlayerPos = getItemPosition(turnIndex);
      const targetIndex = players.findIndex(
        (player) => player.id === chosenPlayer
      );
      const targetPos = getItemPosition(targetIndex);
      setLine({
        x1: currentPlayerPos.x,
        y1: currentPlayerPos.y,
        x2: targetPos.x,
        y2: targetPos.y,
      });
    } else {
      setLine(null);
    }
  }, [chosenPlayer, turnIndex]);

  const handlePlayerSelection = (targetId: string) => {
    setChosenPlayer((prevChosen) => (prevChosen === targetId ? "" : targetId));
  };

  const handleNextPlayer = () => {
    if (chosenPlayer) {
      addEvent({
        type: "vote",
        description: `${players[turnIndex].name} voted for ${getPlayerNameById({
          players,
          playerId: chosenPlayer,
        })}.`,
      });
      increaseVote(chosenPlayer);
    }

    if (turnIndex < players.length - 1) {
      setTurnIndex(turnIndex + 1);
      setChosenPlayer("");
    } else {
      onEndVoting();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative">
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`p-2 border rounded-3xl cursor-pointer ${
                index === turnIndex
                  ? "bg-primary text-primary-content"
                  : player.id === chosenPlayer
                  ? "bg-secondary text-secondary-content"
                  : "bg-base-200"
              } ${
                player.id === players[turnIndex].id ? "cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (player.id !== players[turnIndex].id) {
                  handlePlayerSelection(player.id);
                }
              }}
            >
              <div className="font-bold">{player.name}</div>
              <div className="badge">{player.voteCount}</div>
            </div>
          ))}
        </div>
        {line && (
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent"
            />
          </svg>
        )}
      </div>
      <div className="mt-4 flex justify-center">
        <button className="btn btn-primary btn-wide" onClick={handleNextPlayer}>
          {turnIndex < players.length - 1
            ? t("nextPlayer")
            : t("VotingSession.endVoting")}
        </button>
      </div>
    </div>
  );
};

export default SingleVoting;
