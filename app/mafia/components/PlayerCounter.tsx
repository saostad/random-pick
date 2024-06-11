import { useGameContext } from "../contexts/GameContext";
import { getAlivePlayers } from "../utils/get-from-fns";

const PlayerCounter: React.FC = () => {
  const { gameState } = useGameContext();
  const { players } = gameState;

  const alivePlayers = getAlivePlayers({ players });

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center my-4">
      <div className="flex flex-col p-2 bg-primary rounded-box text-primary-content">
        <span className="countdown font-mono text-5xl">
          <span
            style={{ "--value": alivePlayers.length } as React.CSSProperties}
          ></span>
        </span>
        Players
      </div>
      <div className="flex flex-col p-2 bg-primary rounded-box text-primary-content">
        <span className="countdown font-mono text-5xl">
          <span
            style={
              {
                "--value": players.length - alivePlayers.length,
              } as React.CSSProperties
            }
          ></span>
        </span>
        Dead
      </div>
    </div>
  );
};

export default PlayerCounter;
