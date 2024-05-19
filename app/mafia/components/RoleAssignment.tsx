import React from "react";
import { useGameContext } from "../contexts/GameContext";

const RoleAssignment: React.FC = () => {
  const { gameState, assignRoleToPlayer } = useGameContext();

  const handleRoleChange = (playerId: string, roleId: string) => {
    assignRoleToPlayer(playerId, roleId);
  };

  return (
    <>
      {gameState.players
        .sort((a, b) => a.order - b.order)
        .map((player) => (
          <div
            key={player.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr",
              alignItems: "center",
              marginBottom: "0.25rem",
            }}
          >
            <span>
              {player.order}-{player.name}
            </span>
            <select
              className="select w-full select-primary max-w-xs"
              value={player.roleId || ""}
              onChange={(e) => handleRoleChange(player.id, e.target.value)}
              title="Select a role"
            >
              <option disabled value="">
                Select a role
              </option>
              {gameState.gameRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        ))}
    </>
  );
};

export default RoleAssignment;
