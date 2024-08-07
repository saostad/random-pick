import { useContext, useEffect, useState } from "react";
import { Player, useGameContext } from "../contexts/GameContext";
import { getAlivePlayers } from "../utils/get-from-fns";
import { useTranslations } from "next-intl";
import { DirectionContext } from "../contexts/DirectionProvider";

type DayTargetsProps = {
  playerId: string;
  setTargets: (selectedTargets: Player[]) => void;
};

const DayTargets: React.FC<DayTargetsProps> = ({ playerId, setTargets }) => {
  const { direction } = useContext(DirectionContext);

  const t = useTranslations("Mafia");
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const {
    gameState: { players },
  } = useGameContext();

  const alivePlayers = getAlivePlayers({ players });
  const availableTargets = alivePlayers.filter(
    (target) => target.id !== playerId
  );

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayers((prevPlayers) => {
      if (prevPlayers?.some((p) => p.id === player.id)) {
        const targets = prevPlayers.filter((p) => p.id !== player.id);

        setTargets(targets);
        return targets;
      }
      const targets = [...(prevPlayers || []), player];
      setTargets(targets);
      return targets;
    });
  };

  useEffect(() => {
    // reset selected players when playerId changes
    setSelectedPlayers([]);
  }, [playerId]);

  return (
    <div className={`dropdown ${direction === "rtl" ? "dropdown-end" : ""}`}>
      <div tabIndex={0} role="button" className="btn m-1 btn-outline">
        {t("targets")}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {availableTargets.map((target) => (
          <div key={target.id} className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">{target.name}</span>
              <input
                type="checkbox"
                checked={selectedPlayers.some((p) => p.id === target.id)}
                onChange={() => handleSelectPlayer(target)}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DayTargets;
