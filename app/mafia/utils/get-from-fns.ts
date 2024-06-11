import type { GameRole, GameState, Player } from "../contexts/GameContext";

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

export function getPlayerByRoleId({
  players,
  roleId,
}: {
  players: Player[];
  roleId: string;
}) {
  return players.find((player) => player.roleId === roleId);
}

export function getRoleByPlayerId({
  player,
  gameRoles,
}: {
  player: Player;
  gameRoles: GameRole[];
}) {
  return gameRoles.find((role) => role.id === player.roleId);
}

export function getAuditProblems(gameState: GameState) {
  let isAuditFailed = false;
  const errors: { message: string; code: number }[] = [];

  const rolesWithoutPlayers = getRolesWithoutPlayers({
    gameRoles: gameState.gameRoles,
    players: gameState.players,
  });

  const playersWithoutRoles = gameState.players.filter(
    (player) => !player.roleId
  );

  if (gameState.players.length === 0) {
    isAuditFailed = true;
    errors.push({
      code: 30,
      message: "No players found.",
    });
  }

  if (gameState.gameRoles.length === 0) {
    isAuditFailed = true;
    errors.push({
      code: 40,
      message: "No roles found.",
    });
  }

  if (rolesWithoutPlayers.length > 0 || playersWithoutRoles.length > 0) {
    isAuditFailed = true;
    errors.push({
      code: 10,
      message: "Roles without players or players without roles.",
    });
  } else if (rolesWithoutPlayers.length !== playersWithoutRoles.length) {
    isAuditFailed = true;
    errors.push({
      code: 20,
      message: `Roles and players count mismatch. Roles: ${gameState.gameRoles.length}, Players: ${gameState.players.length}`,
    });
  }

  return {
    isAuditFailed,
    errors,
    problems: { rolesWithoutPlayers, playersWithoutRoles },
  };
}
