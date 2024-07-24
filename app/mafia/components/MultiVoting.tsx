import React, { useState, useRef, useEffect } from "react";
import { Player, useGameContext } from "../contexts/GameContext";
import { getPlayerNameById } from "../utils/get-from-fns";
import { useTranslations } from "next-intl";

type MultiVotingProps = {
  players: Player[];
  decreaseVote: (playerId: string) => void;
  increaseVote: (playerId: string) => void;
  onEndVoting: () => void;
};

const MultiVoting: React.FC<MultiVotingProps> = ({
  players,
  decreaseVote,
  increaseVote,
  onEndVoting,
}) => {
  const t = useTranslations("Mafia");
  const { addEvent } = useGameContext();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [lines, setLines] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([]);
  const gridRef = useRef<HTMLDivElement>(null);

  const availablePlayers = players.filter(
    (player) => player.id !== players[turnIndex].id
  );

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
    const currentPlayerPos = getItemPosition(turnIndex);
    const newLines = selectedPlayers.map((playerId) => {
      const targetIndex = players.findIndex((player) => player.id === playerId);
      const targetPos = getItemPosition(targetIndex);
      return {
        x1: currentPlayerPos.x,
        y1: currentPlayerPos.y,
        x2: targetPos.x,
        y2: targetPos.y,
      };
    });
    setLines(newLines);
  }, [selectedPlayers, turnIndex]);

  const handlePlayerClick = (playerId: string) => {
    if (playerId === players[turnIndex].id) return;

    setSelectedPlayers((prevPlayers) => {
      if (prevPlayers.includes(playerId)) {
        return prevPlayers.filter((id) => id !== playerId);
      } else {
        return [...prevPlayers, playerId];
      }
    });
  };

  const handleNextPlayer = () => {
    // Apply votes for the current player
    selectedPlayers.forEach((targetId) => {
      increaseVote(players[turnIndex].id);
      addEvent({
        type: "vote",
        description: `${getPlayerNameById({
          players,
          playerId: targetId,
        })} voted for ${players[turnIndex].name}.`,
      });
    });

    if (turnIndex < players.length - 1) {
      setTurnIndex(turnIndex + 1);
      setSelectedPlayers([]);
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
              className={`p-4 border rounded cursor-pointer ${
                index === turnIndex
                  ? "bg-primary text-primary-content"
                  : selectedPlayers.includes(player.id)
                  ? "bg-secondary text-secondary-content"
                  : "bg-base-200"
              } ${
                player.id === players[turnIndex].id ? "cursor-not-allowed" : ""
              }`}
              onClick={() => handlePlayerClick(player.id)}
            >
              <div className="font-bold">{player.name}</div>
              <div className="badge badge-outline">{player.voteCount}</div>
            </div>
          ))}
        </div>
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {lines.map((line, index) => (
            <line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent"
            />
          ))}
        </svg>
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

export default MultiVoting;
