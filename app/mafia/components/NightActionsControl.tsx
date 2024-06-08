import React, { useState, useEffect, useRef } from "react";
import { GameState, useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";
import CarbonHazeNight from "~icons/carbon/haze-night";
import CarbonTouchInteraction from "~icons/carbon/touch-interaction";
import ModalButton from "./ModalButton";
import TagPlayers from "./TagPlayers";
import CarbonTag from "~icons/carbon/tag";
import Timer from "./Timer";
import DropdownButton from "./DropdownButton";
import MdiDead from "~icons/mdi/dead";
import PlayerTagsIndicator from "./PlayerTagsIndicator";
import CarbonPlayOutline from "~icons/carbon/play-outline";
import CarbonPauseOutline from "~icons/carbon/pause-outline";
import Animation from "./Animation";

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

  const handleStartNight = () => {
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

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "/mafia/Whispering20Shadows20ext20v1.2.1.1.1.mp3"
      );
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const mediaPlayerChange = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <>
      <Animation
        className=""
        src="mafia/animation/night.lottie"
        loop={false}
        autoplay={true}
      />
      <button
        className="btn btn-ghost btn-outline btn-accent mt-2"
        onClick={handleStartNight}
      >
        Start Night {gameState.nightCount} <CarbonHazeNight />
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
                <Timer
                  challengeMode={false}
                  currentSpeakerIndex={actionableRoles[currentActionIndex].id}
                  resetTrigger={true}
                />
                <label className="swap">
                  <input type="checkbox" onChange={mediaPlayerChange} />
                  <div className="swap-on">
                    <CarbonPauseOutline className="min-h-8 min-w-10" />
                  </div>
                  <div className="swap-off">
                    <CarbonPlayOutline className="min-h-8 min-w-10" />
                  </div>
                </label>
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
                className="btn btn-ghost btn-outline btn-primary mr-4"
                onClick={handleNextAction}
              >
                Next Role <CarbonTouchInteraction />
              </button>
              <DropdownButton title={<>Actions</>}>
                <ModalButton modalId="TagPlayers">
                  Tag <CarbonTag />
                </ModalButton>
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
    </>
  );
};

export default NightActionsControl;
