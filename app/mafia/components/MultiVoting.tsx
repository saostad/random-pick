import { useState } from "react";
import { Player } from "../contexts/GameContext";

type MultiVotingProps = {
  players: Player[];
  decreaseVote: (playerId: string) => void;
  increaseVote: (playerId: string) => void;
};

const MultiVoting: React.FC<MultiVotingProps> = ({
  players,
  decreaseVote,
  increaseVote,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();

  return (
    <div className="grid grid-cols-2 justify-items-stretch place-content-between gap-y-4">
      {players.map((player, index) => (
        <div
          className={index % 2 !== 0 ? "justify-self-end" : ""}
          key={player.id}
        >
          <button className="btn">
            {player.name}
            <div className="badge badge-secondary">{player.voteCount}</div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default MultiVoting;
