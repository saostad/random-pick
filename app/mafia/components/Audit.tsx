import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";

export default function Audit() {
  const { gameState } = useGameContext();
  const [unassignedRoles, setUnassignedRoles] = useState<any[]>([]);
  const [unassignedPlayers, setUnassignedPlayers] = useState<any[]>([]);

  useEffect(() => {
    const roleToPlayerMap: {
      [key: string]: { name: string; isAlive: boolean };
    } = {};

    const rolesWithoutPlayers = gameState.gameRoles.filter(
      (role) => !roleToPlayerMap[role.id]
    );

    setUnassignedRoles(rolesWithoutPlayers);

    const playersWithoutRoles = gameState.players.filter(
      (player) => !player.roleId
    );

    setUnassignedPlayers(playersWithoutRoles);
  }, [gameState]);

  return (
    <>
      {unassignedRoles.length > 0 && (
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="checkbox" />
          <div className="collapse-title">
            Unassigned Roles ({unassignedRoles.length})
          </div>
          <div className="collapse-content">
            <ul>
              {unassignedRoles.map((role) => (
                <li key={role.id}>{role.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {unassignedPlayers.length > 0 && (
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="checkbox" />
          <div className="collapse-title">
            Players without Role ({unassignedPlayers.length})
          </div>
          <div className="collapse-content">
            <ul>
              {unassignedPlayers.map((player) => (
                <li key={player.id}>{player.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
