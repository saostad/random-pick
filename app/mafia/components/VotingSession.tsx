import CarbonOutage from "~icons/carbon/outage";
import FlexibleModal from "./FlexibleModal";
import { useModal } from "../contexts/ModalContext";
import { useGameContext } from "../contexts/GameContext";
import { getAlivePlayers } from "../utils/get-from-fns";
import Animation from "./Animation";

const VotingSession: React.FC = () => {
  const {
    gameState,
    decreaseVote,
    increaseVote,
    resetVotes,
    markPlayerAsDead,
    setVotingStatus,
  } = useGameContext();
  const { votingStatus, players, speakingOrder, lastActionsActive } = gameState;
  const { handleOpen, handleClose } = useModal();

  // Calculate the maximum votes and the players who have the maximum votes
  const alivePlayers = getAlivePlayers({ players });
  const maxVotes = Math.max(...alivePlayers.map((player) => player.voteCount));
  const playersWithMaxVotes = alivePlayers.filter(
    (player) => player.voteCount === maxVotes && maxVotes > 0
  );

  const startVoting = () => {
    resetVotes();
    setVotingStatus("in_progress");
  };

  const endVoting = () => {
    if (playersWithMaxVotes.length === 0) {
      setVotingStatus("finished");
    } else {
      setVotingStatus("voting_elimination");
    }
  };

  const votingEliminationEnd = (playerId?: string) => {
    if (playerId) {
      markPlayerAsDead(playerId);
      if (lastActionsActive) {
        handleOpen("LastActionPlayer");
      }
    }
    setVotingStatus("finished");
    handleClose("voting-session");
  };

  return (
    <div>
      {votingStatus === "not_started" && (
        <div className="flex flex-col items-center mt-6">
          <Animation
            className=""
            src="mafia/animation/think.lottie"
            loop={false}
            autoplay={true}
          />
          <button
            className="btn mt-6 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={() => {
              startVoting();
              handleOpen("voting-session");
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Start Voting
            </span>
          </button>
        </div>
      )}
      {votingStatus === "in_progress" ||
      votingStatus === "voting_elimination" ? (
        <div className="flex flex-col items-center mt-6">
          <Animation
            className=""
            src="mafia/animation/think.lottie"
            loop={false}
            autoplay={true}
          />
          <button
            className="btn mt-6 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={() => {
              handleOpen("voting-session");
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Resume Voting
            </span>
          </button>
        </div>
      ) : null}

      <FlexibleModal modalId="voting-session" title="Voting Session">
        <div className="mb-4">
          <p className="text-center text-success my-4">
            {alivePlayers.length} Player{alivePlayers.length > 1 ? "s" : ""} in
            the game. Count/2 = {Math.ceil(alivePlayers.length / 2)}
          </p>
          {votingStatus === "in_progress" && (
            <button
              className="btn relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={endVoting}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                End Voting
              </span>
            </button>
          )}
          {votingStatus === "voting_elimination" && (
            <div className="grid grid-cols-2 gap-4 my-4">
              <button
                className="btn btn-ghost btn-outline btn-primary"
                onClick={startVoting}
              >
                Start Again!
              </button>
              <button
                className="btn btn-outline btn-warning"
                onClick={() => {
                  votingEliminationEnd();
                }}
              >
                End without elimination!
              </button>
            </div>
          )}
        </div>
        {votingStatus === "in_progress" &&
          speakingOrder
            .map((index) => players[index])
            .map((player) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 3fr",
                  gap: "1rem",
                  alignItems: "center",
                  paddingBottom: "0.5rem",
                }}
                key={player.id}
              >
                <span style={{ marginRight: "1rem" }}>{player.name}</span>
                <div>
                  <button
                    className="btn btn-circle btn-outline"
                    onClick={() => decreaseVote(player.id)}
                  >
                    -
                  </button>
                  {` Votes: ${player.voteCount} `}
                  <button
                    className="btn btn-circle btn-outline"
                    onClick={() => increaseVote(player.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
        {votingStatus === "voting_elimination" &&
        playersWithMaxVotes.length > 0 ? (
          <div style={{ marginBottom: "1rem" }}>
            <h3 className="font-semibold text-xl my-4">Leading Players</h3>
            {playersWithMaxVotes.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between my-2"
              >
                <p>
                  {player.name}: {player.voteCount} vote
                  {player.voteCount > 1 ? "s" : ""}
                </p>
                <button
                  className="btn btn-outline btn-error ml-2"
                  onClick={() => {
                    votingEliminationEnd(player.id);
                  }}
                >
                  Mark as Dead <CarbonOutage />
                </button>
              </div>
            ))}
          </div>
        ) : (
          votingStatus === "finished" && "No player has the most votes!"
        )}
      </FlexibleModal>
    </div>
  );
};

export default VotingSession;
