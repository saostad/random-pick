import React, { useState, useEffect } from "react";
import { GameState, useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";
import CarbonHazeNight from "~icons/carbon/haze-night";
import CarbonTouchInteraction from "~icons/carbon/touch-interaction";

const handleNightActions = (gameState: GameState): GameState => {
  const actionableRoles = gameState.gameRoles
    .filter((role) => role.hasAction)
    .sort((a, b) => a.actionOrder! - b.actionOrder!);

  actionableRoles.forEach((role) => {
    console.log(`Processing action for ${role.name}`);
  });

  return gameState;
};

const NightActionsControl: React.FC = () => {
  const { handleOpen, handleClose } = useModal();
  const { gameState, updateGameState, increaseNightCount } = useGameContext();
  const [currentActionIndex, setCurrentActionIndex] = useState<number>(0);
  const [actionableRoles, setActionableRoles] = useState<any[]>([]);
  const [rolePlayers, setRolePlayers] = useState<{
    [key: string]: { name: string; isAlive: boolean };
  }>({});
  const [unassignedRoles, setUnassignedRoles] = useState<any[]>([]);
  const [unassignedPlayers, setUnassignedPlayers] = useState<any[]>([]);
  const [nightCompleted, setNightCompleted] = useState<boolean>(false);

  useEffect(() => {
    const mapRoleToPlayer = () => {
      const roleToPlayerMap: {
        [key: string]: { name: string; isAlive: boolean };
      } = {};

      gameState.players.forEach((player) => {
        if (player.roleId) {
          roleToPlayerMap[player.roleId] = {
            name: player.name,
            isAlive: player.isAlive,
          };
        }
      });

      setRolePlayers(roleToPlayerMap);

      const rolesWithoutPlayers = gameState.gameRoles.filter(
        (role) => !roleToPlayerMap[role.id]
      );

      setUnassignedRoles(rolesWithoutPlayers);

      const playersWithoutRoles = gameState.players.filter(
        (player) => !player.roleId
      );

      setUnassignedPlayers(playersWithoutRoles);
    };

    mapRoleToPlayer();
  }, [gameState]);

  const handleStartNight = () => {
    console.log("Starting night actions");

    const rolesWithActions = gameState.gameRoles
      .filter((role) => role.hasAction)
      .sort((a, b) => a.actionOrder! - b.actionOrder!);
    setActionableRoles(rolesWithActions);

    handleOpen("night-actions");

    setCurrentActionIndex(0);

    const updatedState = handleNightActions(gameState);
    updateGameState({ ...updatedState });

    setNightCompleted(false);
  };

  const handleNextAction = () => {
    setCurrentActionIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (
      currentActionIndex >= actionableRoles.length &&
      actionableRoles.length > 0 &&
      !nightCompleted
    ) {
      increaseNightCount();
      setNightCompleted(true);
    }
  }, [
    currentActionIndex,
    actionableRoles.length,
    increaseNightCount,
    nightCompleted,
  ]);

  return (
    <>
      <h2>
        Night Actions <small>(Night {gameState.nightCount})</small>
      </h2>
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
      <button className="btn btn-accent mt-2" onClick={handleStartNight}>
        Start Night {gameState.nightCount} <CarbonHazeNight />
      </button>
      <FlexibleModal modalId="night-actions">
        <>
          <h2>Night Actions</h2>
          {actionableRoles.length > 0 &&
          currentActionIndex < actionableRoles.length ? (
            <>
              <p>
                <b>
                  <u>{actionableRoles[currentActionIndex].name}</u>
                </b>{" "}
                (Player:{" "}
                <b>
                  {rolePlayers[actionableRoles[currentActionIndex].id]
                    ? rolePlayers[actionableRoles[currentActionIndex].id]?.name
                    : "Unassigned"}
                  {rolePlayers[actionableRoles[currentActionIndex].id] &&
                    !rolePlayers[actionableRoles[currentActionIndex].id]
                      ?.isAlive && <mark> (Dead)</mark>}
                </b>
                )
              </p>
              <button className="btn btn-primary" onClick={handleNextAction}>
                Next Action <CarbonTouchInteraction />
              </button>
            </>
          ) : (
            <>
              <p>All actions completed.</p>
            </>
          )}
        </>
      </FlexibleModal>
    </>
  );
};

export default NightActionsControl;
