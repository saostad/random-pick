import React from "react";
import { useGameContext } from "../GameContext";

const RoleAssignment: React.FC = () => {
  const { gameState, assignRoleToPlayer } = useGameContext();

  const handleRoleChange = (playerId: string, roleId: string) => {
    assignRoleToPlayer(playerId, roleId);
  };

  return (
    <div>
      <h2>Assign Roles to Players</h2>
      <ul>
        {gameState.players.map((player) => (
          <li key={player.id}>
            {player.name}
            <select
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleAssignment;
