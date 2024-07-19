import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import CarbonShuffle from "~icons/carbon/shuffle"; // Assuming you have an icon for shuffle
import { useTranslations } from "next-intl";

const RoleAssignment: React.FC = () => {
  const { gameState, assignRoleToPlayer, unassignRoleFromPlayer } =
    useGameContext();
  const [assignBy, setAssignBy] = useState<"players" | "roles">("players");

  const handleRoleChange = (playerId: string, roleId: string) => {
    const currentRoleHolder = gameState.players.find(
      (player) => player.roleId === roleId
    );
    if (currentRoleHolder && currentRoleHolder.id !== playerId) {
      unassignRoleFromPlayer(currentRoleHolder.id);
    }
    assignRoleToPlayer(playerId, roleId);
  };

  const handlePlayerChange = (roleId: string, playerId: string) => {
    const currentRoleOfPlayer = gameState.players.find(
      (player) => player.id === playerId
    )?.roleId;
    if (currentRoleOfPlayer) {
      unassignRoleFromPlayer(playerId);
    }
    const currentRoleHolder = gameState.players.find(
      (player) => player.roleId === roleId
    );
    if (currentRoleHolder && currentRoleHolder.id !== playerId) {
      unassignRoleFromPlayer(currentRoleHolder.id);
    }
    assignRoleToPlayer(playerId, roleId);
  };

  const handleUnassignRole = (playerId: string) => {
    unassignRoleFromPlayer(playerId);
  };

  const getAssignedRoles = () => {
    return gameState.players.reduce((assignedRoles, player) => {
      if (player.roleId) assignedRoles.push(player.roleId);
      return assignedRoles;
    }, [] as string[]);
  };

  const getAssignedPlayers = () => {
    return gameState.players
      .filter((player) => player.roleId)
      .map((player) => player.id);
  };

  const assignedRoles = getAssignedRoles();
  const assignedPlayers = getAssignedPlayers();

  const handleRandomAssignment = () => {
    // Unassign all roles first
    gameState.players.forEach((player) => unassignRoleFromPlayer(player.id));

    const availableRoles = [...gameState.gameRoles];
    const players = [...gameState.players];

    players.forEach((player) => {
      if (availableRoles.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableRoles.length);
        const role = availableRoles.splice(randomIndex, 1)[0];
        assignRoleToPlayer(player.id, role.id);
      }
    });
  };

  const t = useTranslations("Mafia");

  return (
    <>
      <div role="tablist" className="tabs tabs-boxed mb-4">
        <a
          role="tab"
          className={`tab ${assignBy === "players" ? "tab-active" : ""}`}
          onClick={() => setAssignBy("players")}
        >
          {t("RoleAssignment.byPlayers")}
        </a>
        <a
          role="tab"
          className={`tab ${assignBy === "roles" ? "tab-active" : ""}`}
          onClick={() => setAssignBy("roles")}
        >
          {t("RoleAssignment.byRoles")}
        </a>
      </div>

      <button
        className="btn btn-ghost btn-outline btn-secondary mb-2"
        onClick={handleRandomAssignment}
        title="Randomly select a player"
      >
        {t("RoleAssignment.shuffle")} <CarbonShuffle />
      </button>

      {assignBy === "players"
        ? gameState.players
            .sort((a, b) => a.order - b.order)
            .map((player) => (
              <div
                key={player.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 3fr 1fr",
                  alignItems: "center",
                  marginBottom: "0.25rem",
                  gap: "0.5rem",
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
                    {t("RoleAssignment.selectRole")}
                  </option>
                  {gameState.gameRoles
                    .filter(
                      (role) =>
                        !assignedRoles.includes(role.id) ||
                        role.id === player.roleId
                    )
                    .map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </select>
                {player.roleId && (
                  <button
                    onClick={() => handleUnassignRole(player.id)}
                    className="btn btn-circle btn-outline btn-error"
                  >
                    &#x2715;
                  </button>
                )}
              </div>
            ))
        : gameState.gameRoles.map((role) => (
            <div
              key={role.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 3fr 1fr",
                alignItems: "center",
                marginBottom: "0.25rem",
              }}
            >
              <span>{role.name}</span>
              <select
                className="select w-full select-primary max-w-xs"
                value={
                  gameState.players.find((player) => player.roleId === role.id)
                    ?.id || ""
                }
                onChange={(e) => handlePlayerChange(role.id, e.target.value)}
                title="Select a player"
              >
                <option disabled value="">
                  {t("RoleAssignment.selectPlayer")}
                </option>
                {gameState.players
                  .filter(
                    (player) =>
                      !assignedPlayers.includes(player.id) ||
                      player.roleId === role.id
                  )
                  .map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.order}-{player.name}
                    </option>
                  ))}
              </select>
              {gameState.players.find(
                (player) => player.roleId === role.id
              ) && (
                <button
                  className="btn btn-circle btn-outline btn-error ml-2"
                  onClick={() =>
                    handleUnassignRole(
                      gameState.players.find(
                        (player) => player.roleId === role.id
                      )?.id!
                    )
                  }
                >
                  &#x2715;
                </button>
              )}
            </div>
          ))}
    </>
  );
};

export default RoleAssignment;
