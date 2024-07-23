import { useState } from "react";
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
  const availablePlayers = players.filter(
    (player) => player.id !== players[turnIndex].id
  );

  const handlePlayerSelection = (targetId: string) => {
    setChosenPlayer((prevChosen) => (prevChosen === targetId ? "" : targetId));
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
              className={`dropdown ${index % 2 !== 0 ? "dropdown-end" : ""} ${
                player.id === players[turnIndex].id ? "dropdown-open" : ""
              }`}
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
                        type="radio"
                        id={target.id}
                        className="radio checked:bg-blue-500"
                        checked={chosenPlayer === target.id}
                        onChange={() => {}} // Empty onChange to avoid React warning
                        onClick={() => handlePlayerSelection(target.id)}
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
          // register votes to events
          if (chosenPlayer) {
            addEvent({
              type: "vote",
              description: `${
                players[turnIndex].name
              } voted for ${getPlayerNameById({
                players: players,
                playerId: chosenPlayer,
              })}.`,
            });
            increaseVote(chosenPlayer);
          }

          if (turnIndex < players.length - 1) {
            setTurnIndex(turnIndex + 1);
            setChosenPlayer("");
            // close the dropdown
            const dropdowns = document.querySelectorAll(".dropdown-open");
            dropdowns.forEach((dropdown) => {
              dropdown.classList.remove("dropdown-open");
            });
          } else {
            onEndVoting();
          }
        }}
      >
        {turnIndex < players.length - 1 ? (
          <span>{t("nextPlayer")}</span>
        ) : (
          <span>{t("VotingSession.endVoting")}</span>
        )}
      </button>
    </div>
  );
};

export default SingleVoting;
