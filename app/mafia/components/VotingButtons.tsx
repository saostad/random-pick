import { FC } from "react";
import { Player } from "../contexts/GameContext";

type VotingButtonsProps = {
  player: Player;
  decreaseVote: (playerId: string) => void;
  increaseVote: (playerId: string) => void;
};

const VotingButtons: FC<VotingButtonsProps> = ({
  player,
  decreaseVote,
  increaseVote,
}) => {
  return (
    <div>
      <button
        className="btn btn-square btn-outline"
        onClick={() => decreaseVote(player.id)}
      >
        -
      </button>
      {` Votes: ${player.voteCount} `}
      <button
        className="btn btn-square btn-outline"
        onClick={() => increaseVote(player.id)}
      >
        +
      </button>
    </div>
  );
};

export default VotingButtons;
