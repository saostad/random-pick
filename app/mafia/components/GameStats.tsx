import { useGameContext } from "../contexts/GameContext";
import { getAlivePlayers, getDeadPlayers } from "../utils/get-from-fns";

const GameStats: React.FC = () => {
  const { gameState } = useGameContext();
  return (
    <div className="stats container max-w-lg">
      <div className="stat">
        <div className="stat-title">Players</div>
        <div className="stat-value text-primary">
          {getAlivePlayers({ players: gameState.players }).length}
        </div>
        <div className="stat-desc">out of {gameState.players.length}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Dead</div>
        <div className="stat-value text-warning">
          {getDeadPlayers({ players: gameState.players }).length}
        </div>
        <div className="stat-desc">out of {gameState.players.length}</div>
      </div>
    </div>
  );
};

export default GameStats;
