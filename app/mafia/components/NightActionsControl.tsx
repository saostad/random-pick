import React, { useState, useEffect, useRef } from "react";
import { GameState, useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";
import ModalButton from "./ModalButton";
import TagPlayers from "./TagPlayers";
import CarbonTag from "~icons/carbon/tag";
import Timer from "./Timer";
import DropdownButton from "./DropdownButton";
import MdiDead from "~icons/mdi/dead";
import PlayerTagsIndicator from "./PlayerTagsIndicator";
import Animation from "./Animation";
import MediaPlayer from "./MediaPlayer";

const handleNightActions = (gameState: GameState): GameState => {
  gameState.gameRoles
    .map((role) => role) // clone the array to avoid mutation
    .filter((role) => role.hasAction)
    .sort((a, b) => a.actionOrder! - b.actionOrder!);

  return gameState;
};
const NightActionsControl: React.FC = () => {
  const { handleOpen } = useModal();
  const { gameState, updateGameState, increaseNightCount } = useGameContext();
  const [currentActionIndex, setCurrentActionIndex] = useState<number>(0);
  const [actionableRoles, setActionableRoles] = useState<any[]>([]);
  const [rolePlayers, setRolePlayers] = useState<{
    [key: string]: { name: string; isAlive: boolean; id: string };
  }>({});
  const [nightCompleted, setNightCompleted] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const handleStartNight = () => {
    const rolesWithActions = gameState.gameRoles
      .filter((role) => role.hasAction)
      .sort((a, b) => a.actionOrder! - b.actionOrder!);
    setActionableRoles(rolesWithActions);

    handleOpen("night-actions");

    setCurrentActionIndex(0);
    setIsTimerRunning(true);

    const updatedState = handleNightActions(gameState);
    updateGameState({ ...updatedState });

    setNightCompleted(false);
  };

  const handleNextAction = () => {
    setCurrentActionIndex((prevIndex) => prevIndex + 1);
    setIsTimerRunning(false);
    setTimeout(() => {
      setIsTimerRunning(true);
    }, 0);
  };

  useEffect(() => {
    const roleToPlayerMap: {
      [key: string]: { name: string; isAlive: boolean; id: string };
    } = {};

    gameState.players.forEach((player) => {
      if (player.roleId) {
        roleToPlayerMap[player.roleId] = {
          name: player.name,
          isAlive: player.isAlive,
          id: player.id,
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
    <div className="flex flex-col items-center mt-6">
      <Animation
        className=""
        src="mafia/animation/night.lottie"
        loop={false}
        autoplay={true}
      />
      <button
        className="btn mt-2 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        onClick={handleStartNight}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Start Night {gameState.nightCount}
        </span>
      </button>
      <FlexibleModal
        modalId="TagPlayers"
        component={TagPlayers}
        title="Tag Management"
      />
      <FlexibleModal modalId="night-actions" title="Night Actions">
        <div className="min-h-52">
          {actionableRoles.length > 0 &&
          currentActionIndex < actionableRoles.length ? (
            <>
              <div className="flex justify-between">
                <Timer isRunning={isTimerRunning} />
                <MediaPlayer
                  loop={true}
                  mediaUrl="/mafia/Whispering20Shadows20ext20v1.2.1.1.1.mp3"
                />
              </div>
              <div className="my-4">
                <b>
                  <u>{actionableRoles[currentActionIndex].name}</u>
                </b>{" "}
                (Player:
                <b>
                  {rolePlayers[actionableRoles[currentActionIndex].id] ? (
                    <PlayerTagsIndicator
                      key={actionableRoles[currentActionIndex].id}
                      playerId={
                        rolePlayers[actionableRoles[currentActionIndex].id].id
                      }
                    />
                  ) : (
                    "Unassigned"
                  )}

                  {!rolePlayers[actionableRoles[currentActionIndex].id]
                    ?.isAlive && <mark> (Dead)</mark>}
                </b>
                )
              </div>
              <button
                className="btn mr-4 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                onClick={handleNextAction}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Next Role
                </span>
              </button>
              <DropdownButton title={<>Actions</>}>
                <ModalButton modalId="TagPlayers">
                  Tag <CarbonTag />
                </ModalButton>
                <div className="my-2"></div>
                <ModalButton modalId="playersStatus">
                  Kill <MdiDead />
                </ModalButton>
              </DropdownButton>
            </>
          ) : (
            <>
              <p>All actions completed.</p>
            </>
          )}
        </div>
      </FlexibleModal>
    </div>
  );
};

export default NightActionsControl;
