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
  const { handleOpen } = useModal();
  const { gameState, updateGameState, increaseNightCount } = useGameContext();
  const [currentActionIndex, setCurrentActionIndex] = useState<number>(0);
  const [actionableRoles, setActionableRoles] = useState<any[]>([]);
  const [rolePlayers, setRolePlayers] = useState<{
    [key: string]: { name: string; isAlive: boolean };
  }>({});

  const [nightCompleted, setNightCompleted] = useState<boolean>(false);

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
  }, [gameState]);
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
      <button
        className="btn btn-ghost btn-outline btn-accent mt-2"
        onClick={handleStartNight}
      >
        Start Night {gameState.nightCount} <CarbonHazeNight />
      </button>
      <FlexibleModal modalId="night-actions" title="Night Actions">
        <>
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
              <button
                className="btn btn-ghost btn-outline btn-primary"
                onClick={handleNextAction}
              >
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
