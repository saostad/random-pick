/** each player can vote for multiple players
 * players are displayed in a 2-column grid
 * each player has a button with their name and a badge with their vote count
 * each player goes to voting mode based on players order in the array
 * when a player is in voting mode, other players can vote for them by clicking the button
 * each player can vote for multiple players
 * each vote shows with an arrow pointing to the player who is voted for
 */
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
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [votes, setVotes] = useState<{ [voterId: string]: string[] }>({});

  const handleVote = (voterId: string, voteForId: string) => {
    setVotes((prevVotes) => {
      const playerVotes = prevVotes[voterId] || [];
      if (!playerVotes.includes(voteForId)) {
        return {
          ...prevVotes,
          [voterId]: [...playerVotes, voteForId],
        };
      }
      return prevVotes;
    });
    increaseVote(voteForId);
  };

  const handleUnvote = (voterId: string, voteForId: string) => {
    setVotes((prevVotes) => {
      const playerVotes = prevVotes[voterId] || [];
      if (playerVotes.includes(voteForId)) {
        return {
          ...prevVotes,
          [voterId]: playerVotes.filter((id) => id !== voteForId),
        };
      }
      return prevVotes;
    });
    decreaseVote(voteForId);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {players.map((player, index) => (
        <div
          key={player.id}
          className={
            index % 2 === 0 ? "justify-self-start" : "justify-self-end"
          }
        >
          <button
            onClick={() => setSelectedPlayer(player)}
            className={`btn ${
              selectedPlayer?.id === player.id ? "btn-warning btn-outline" : ""
            }`}
          >
            {player.name}
            <div className="badge badge-secondary">{player.voteCount}</div>
          </button>

          {selectedPlayer?.id === player.id && (
            <div className="mt-2">
              {players
                .filter((p) => p.id !== player.id)
                .map((p) => (
                  <div key={p.id} className="flex items-center">
                    <button
                      className={`btn btn-sm ${
                        votes[player.id]?.includes(p.id)
                          ? "btn-success"
                          : "btn-primary"
                      }`}
                      onClick={() =>
                        votes[player.id]?.includes(p.id)
                          ? handleUnvote(player.id, p.id)
                          : handleVote(player.id, p.id)
                      }
                    >
                      Vote {p.name}
                    </button>
                    {votes[player.id]?.includes(p.id) && (
                      <span className="ml-2">→ {p.name}</span>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiVoting;
