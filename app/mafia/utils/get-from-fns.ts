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
}: {
  gameRoles: GameRole[];
}) {
  // TODO: I don't know how it works
  const roleToPlayerMap: {
    [key: string]: { name: string; isAlive: boolean };
  } = {};

  const rolesWithoutPlayers = gameRoles.filter(
    (role) => !roleToPlayerMap[role.id]
  );

  return rolesWithoutPlayers;
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
