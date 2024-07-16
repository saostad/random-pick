import { useState } from "react";
import { Player } from "../contexts/GameContext";

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
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [turnIndex, setTurnIndex] = useState(0);
  const availablePlayers = players.filter(
    (player) => player.id !== players[turnIndex].id
  );

  const handleTargetedFromPlayer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetId = e.target.id;
    if (selectedPlayers.includes(targetId)) {
      setSelectedPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player !== targetId)
      );
      decreaseVote(players[turnIndex].id);
    } else {
      setSelectedPlayers((prevPlayers) => [...prevPlayers, targetId]);
      increaseVote(players[turnIndex].id);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 justify-items-stretch place-content-between gap-y-4">
        {players.map((player, index) => (
          <div
            className={index % 2 !== 0 ? "justify-self-end" : ""}
            key={player.id}
          >
            <div
              className={`dropdown dropdown-top ${
                index % 2 !== 0 ? "dropdown-end" : ""
              } ${player.id === players[turnIndex].id ? "dropdown-open" : ""}`}
            >
              <div
                tabIndex={0}
                role="button"
                className={`btn m-1 ${
                  player.id === players[turnIndex].id
                    ? "btn-outline"
                    : "btn-disabled"
                }`}
              >
                {player.name}
                <div className="badge badge-secondary">{player.voteCount}</div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                {availablePlayers.map((target) => (
                  <div key={target.id} className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">{target.name}</span>
                      <input
                        id={target.id}
                        type="checkbox"
                        checked={selectedPlayers.includes(target.id)}
                        onChange={handleTargetedFromPlayer}
                        className="checkbox checkbox-primary"
                      />
                    </label>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary btn-outline btn-wide"
        onClick={(e) => {
          if (turnIndex < players.length - 1) {
            setTurnIndex(turnIndex + 1);
            setSelectedPlayers([]);
            // close the dropdown
            const dropdowns = document.querySelectorAll(".dropdown-open");
            dropdowns.forEach((dropdown) => {
              dropdown.classList.remove("dropdown-open");
            });
          } else {
            // end voting
            onEndVoting();
          }
        }}
      >
        {turnIndex < players.length - 1 ? "Next Player" : "End Voting"}
      </button>
    </div>
  );
};

export default MultiVoting;
