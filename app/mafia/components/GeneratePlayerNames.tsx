import React, { useState } from "react";
import { useGameContext, Player } from "../contexts/GameContext";
import { useTranslations } from "next-intl";

const GeneratePlayerNames: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [prefix, setPrefix] = useState("Player");
  const [startNumber, setStartNumber] = useState(1);
  const [count, setCount] = useState(5);

  const generatePlayers = () => {
    const newPlayers: Player[] = [];
    const currentHighestOrder = Math.max(
      0,
      ...gameState.players.map((p) => p.order)
    );

    for (let i = 0; i < count; i++) {
      newPlayers.push({
        id: new Date().toISOString() + i,
        name: `${prefix} #${startNumber + i}`,
        voteCount: 0,
        order: currentHighestOrder + i + 1,
        isAlive: true,
        roleId: "",
        tags: [],
      });
    }

    updateGameState({ players: [...gameState.players, ...newPlayers] });
  };

  const t = useTranslations("Mafia");

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {t("Players.generatePlayers")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("namePrefix")}</span>
            <span className="label-text-alt">e.g., &quot;Player&quot;</span>
          </div>
          <input
            type="text"
            placeholder="Enter prefix"
            className="input input-bordered w-full max-w-xs"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
          <div className="label">
            <span className="label-text-alt">{t("usedAsABaseForNames")}</span>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("startNumber")}</span>
            <span className="label-text-alt">{t("firstPlayerNumber")}</span>
          </div>
          <input
            type="number"
            placeholder="Enter start number"
            className="input input-bordered w-full max-w-xs"
            value={startNumber}
            onChange={(e) => setStartNumber(parseInt(e.target.value))}
          />
          <div className="label">
            <span className="label-text-alt">
              e.g., 1 for &quot;Player #1&quot;
            </span>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">{t("numberOfPlayers")}</span>
            <span className="label-text-alt">{t("howManyToGenerate")}</span>
          </div>
          <input
            type="number"
            placeholder="Enter count"
            className="input input-bordered w-full max-w-xs"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
          />
          <div className="label">
            <span className="label-text-alt">{t("totalPlayersToAdd")}</span>
          </div>
        </label>
      </div>
      <button className="btn btn-primary" onClick={generatePlayers}>
        {t("generatePlayers")}
      </button>
    </div>
  );
};

export default GeneratePlayerNames;
