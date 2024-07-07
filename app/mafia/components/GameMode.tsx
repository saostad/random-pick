import { CldImage } from "next-cloudinary";
import { useGameContext } from "../contexts/GameContext";
import { useTranslations } from "next-intl";

const GameMode: React.FC = () => {
  const { gameState, setGameMode } = useGameContext();
  const { gameMode } = gameState;

  function handleGameModeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      // set game mode to pro
      setGameMode("pro");
    } else {
      // set game mode to nob
      setGameMode("beginner");
    }
  }

  const t = useTranslations("Mafia");

  return (
    <div className="flex flex-col justify-center">
      <div className="flex gap-4 my-4">
        <div className="flex flex-col">
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">
                {t("GameMode.professionalMode")}
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={gameMode === "pro" ? true : false}
                onChange={handleGameModeChange}
              />
            </label>
          </div>
        </div>
        <label className="swap swap-flip">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            checked={gameMode === "pro" ? true : false}
            onChange={handleGameModeChange}
          />

          <div className="swap-on">{t("GameMode.pro")} 😈</div>
          <div className="swap-off">{t("GameMode.simple")} 😇</div>
        </label>
      </div>
      {gameMode === "pro" ? (
        <CldImage
          className="m-0 self-center h-auto"
          src="mafia/all-roles"
          alt="all-roles"
          priority={true}
          width="300"
          height="200"
        />
      ) : (
        <CldImage
          className="m-0 self-center h-auto"
          src="mafia/all-roles-beginner"
          alt="all-roles"
          priority={true}
          width="300"
          height="200"
        />
      )}
    </div>
  );
};

export default GameMode;
