import type { GameRole, Player } from "../contexts/GameContext";

export function getPlayerNameById({
  playerId,
  players,
}: {
  playerId: string;
  players: Player[];
}) {
  return players.find((player) => player.id === playerId)?.name;
}

export function getRolesWithoutPlayers({
  gameRoles,
  players,
}: {
  gameRoles: GameRole[];
  players: Player[];
}) {
  const roleToPlayerMap: {
    [key: string]: { name: string; isAlive: boolean };
  } = {};

  players.forEach((player) => {
    if (!player.roleId) return;
    roleToPlayerMap[player.roleId] = {
      name: player.name,
      isAlive: player.isAlive,
    };
  });

  return gameRoles.filter((role) => !roleToPlayerMap[role.id]);
}

export function getAlivePlayers({ players }: { players: Player[] }) {
  return players.filter((player) => player.isAlive);
}

export function getDeadPlayers({ players }: { players: Player[] }) {
  return players.filter((player) => !player.isAlive);
}

export function getPlayerByRoleIds({
  players,
  roleId,
}: {
  players: Player[];
  roleId: string;
}) {
  return players.find((player) => player.roleId === roleId);
}
