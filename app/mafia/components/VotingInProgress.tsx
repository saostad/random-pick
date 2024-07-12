import { useGameContext } from "../contexts/GameContext";
import VotingButtons from "./VotingButtons";

const VotingInProgress: React.FC = () => {
  const { gameState, decreaseVote, increaseVote } = useGameContext();
  const { players, speakingOrder } = gameState;

  return speakingOrder
    .map((index) => players[index])
    .map((player) => (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 4fr",
          gap: "1rem",
          alignItems: "center",
          paddingBottom: "0.75rem",
        }}
        key={player.id}
      >
        <span style={{ marginRight: "1rem" }}>{player.name}</span>
        <VotingButtons
          player={player}
          decreaseVote={decreaseVote}
          increaseVote={increaseVote}
        />
      </div>
    ));
};

export default VotingInProgress;
