import { useGameContext } from "../contexts/GameContext";
import { getAlivePlayers } from "../utils/get-from-fns";

const PlayerCounter: React.FC = () => {
  const { gameState } = useGameContext();
  const { players } = gameState;

  const alivePlayers = getAlivePlayers({ players });

  return (
    <div className="m-auto my-4 text-center w-full">
      <span className="text-xl font-mono">
        {alivePlayers.length} Players in the game!
      </span>
    </div>
  );
};

export default PlayerCounter;
