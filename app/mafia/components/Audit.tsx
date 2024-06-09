import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { getRolesWithoutPlayers } from "../utils/get-from-fns";

export default function Audit() {
  const { gameState } = useGameContext();
  const [unassignedRoles, setUnassignedRoles] = useState<any[]>([]);
  const [unassignedPlayers, setUnassignedPlayers] = useState<any[]>([]);

  useEffect(() => {
    const rolesWithoutPlayers = getRolesWithoutPlayers({
      gameRoles: gameState.gameRoles,
      players: gameState.players,
    });

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

      {unassignedRoles.length === 0 && unassignedPlayers.length === 0 && (
        <div className="alert alert-success">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="flex-1">
            <label>Game is ready to start!</label>
          </div>
        </div>
      )}
    </>
  );
}
