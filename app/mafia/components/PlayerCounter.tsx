import { useGameContext } from "../contexts/GameContext";
import { getAlivePlayers } from "../utils/get-from-fns";

const PlayerCounter: React.FC = () => {
  const { gameState } = useGameContext();
  const { players } = gameState;

  const alivePlayers = getAlivePlayers({ players });

  return (
    <div className="grid grid-flow-col justify-center gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-primary rounded-box text-primary-content">
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
      </div>
    </div>
  );
};

export default PlayerCounter;
