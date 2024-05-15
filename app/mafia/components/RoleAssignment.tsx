import React from "react";
import { useGameContext } from "../contexts/GameContext";

const RoleAssignment: React.FC = () => {
  const { gameState, assignRoleToPlayer } = useGameContext();

  const handleRoleChange = (playerId: string, roleId: string) => {
    assignRoleToPlayer(playerId, roleId);
  };

  return (
    <>
      <h2>Assign Roles to Players</h2>
      {gameState.players.map((player) => (
        <div key={player.id} style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              marginRight: "1rem",
              flex: "0 1 auto",
              paddingBottom: "1rem",
            }}
          >
            {player.name}
          </span>
          <span style={{ flex: "1", alignSelf: "flex-start" }}>
            <select
              className="select w-full max-w-xs"
              value={player.roleId || ""}
              onChange={(e) => handleRoleChange(player.id, e.target.value)}
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
          </span>
        </div>
      ))}
    </>
  );
};

export default RoleAssignment;
