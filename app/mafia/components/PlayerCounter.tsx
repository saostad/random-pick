import { useGameContext } from "../contexts/GameContext";
import { getAlivePlayers } from "../utils/get-from-fns";

const PlayerCounter: React.FC = () => {
  const { gameState } = useGameContext();
  const { players } = gameState;

  const alivePlayers = getAlivePlayers({ players });

  return (
    <span className="countdown font-mono text-2xl">
      <span
        className="m-auto my-4"
        style={
          {
            "--value": alivePlayers.length,
          } as React.CSSProperties
        }
      ></span>
    </span>
  );
};

export default PlayerCounter;
