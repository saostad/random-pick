import React, { useState } from "react";
import { useGameContext, Player } from "../contexts/GameContext";

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

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Generate Players</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name Prefix</span>
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
            <span className="label-text-alt">Used as a base for names</span>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Start Number</span>
            <span className="label-text-alt">First player number</span>
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
            <span className="label-text">Number of Players</span>
            <span className="label-text-alt">How many to generate</span>
          </div>
          <input
            type="number"
            placeholder="Enter count"
            className="input input-bordered w-full max-w-xs"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
          />
          <div className="label">
            <span className="label-text-alt">Total players to add</span>
          </div>
        </label>
      </div>
      <button className="btn btn-primary" onClick={generatePlayers}>
        Generate Players
      </button>
    </div>
  );
};

export default GeneratePlayerNames;
