import { CldImage } from "next-cloudinary";
import { useGameContext } from "../contexts/GameContext";

const GameMode: React.FC = () => {
  const { gameState, setGameMode } = useGameContext();
  const { gameMode } = gameState;

  return (
    <div className="flex flex-col justify-center">
      <div className="flex gap-4 my-4">
        <span>Game Level:</span>
        <label className="swap swap-flip">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            checked={gameMode === "pro" ? true : false}
            onChange={(e) => {
              if (e.target.checked) {
                // set game mode to pro
                setGameMode("pro");
              } else {
                // set game mode to nob
                setGameMode("beginner");
              }
            }}
          />

          <div className="swap-on">Pro 😈</div>
          <div className="swap-off">Simple 😇</div>
        </label>
      </div>
      {gameMode === "pro" ? (
        <CldImage
          className="m-0 self-center"
          src="mafia/all-roles"
          alt="all-roles"
          width="300"
          height="200"
        />
      ) : (
        <CldImage
          className="m-0 self-center"
          src="mafia/all-roles-beginner"
          alt="all-roles"
          width="300"
          height="200"
        />
      )}
    </div>
  );
};

export default GameMode;
