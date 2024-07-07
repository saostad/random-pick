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
import MediaPlayer, { MediaPlayerRef } from "./MediaPlayer";
import GlowingButton from "./GlowingButton";
import MaterialSymbolsChipExtraction from "~icons/material-symbols/chip-extraction";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useTranslations } from "next-intl";

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

  const mediaPlayerRef = useRef<MediaPlayerRef>(null);

  const mediaPlayerStop = () => {
    if (mediaPlayerRef.current) {
      mediaPlayerRef.current.stop();
    }
  };

  useEffect(() => {
    if (
      currentActionIndex >= actionableRoles.length &&
      actionableRoles.length > 0 &&
      !nightCompleted
    ) {
      mediaPlayerStop();
      increaseNightCount();
      setNightCompleted(true);
    }
  }, [
    currentActionIndex,
    actionableRoles.length,
    increaseNightCount,
    nightCompleted,
  ]);

  const t = useTranslations("Mafia");

  return (
    <div className="flex flex-col items-center mt-6">
      <GlowingButton onClick={handleStartNight} className="my-4 btn-wide">
        Start Night {gameState.nightCount}
      </GlowingButton>
      <Animation
        className=""
        src="mafia/animation/night.lottie"
        loop={false}
        autoplay={true}
      />

      <FlexibleModal
        modalId="TagPlayers"
        component={TagPlayers}
        title="Tag Management"
      />
      <FlexibleModal modalId="night-actions" title="Night Actions">
        <div className="min-h-64">
          <div className="flex justify-between">
            <Timer isRunning={isTimerRunning} />
            <MediaPlayer
              loop={true}
              mediaUrl="/mafia/Whispering20Shadows20ext20v1.2.1.1.1.mp3"
              ref={mediaPlayerRef}
            />
          </div>
          {actionableRoles.length > 0 &&
          currentActionIndex < actionableRoles.length ? (
            <>
              <div className="flex flex-col my-6">
                <div className="flex">
                  <b className="text-2xl flex-none">
                    {actionableRoles[currentActionIndex].name}
                  </b>
                  <div className="grow dropdown dropdown-end ">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-circle btn-ghost btn-xs text-info"
                    >
                      <svg
                        tabIndex={0}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div
                      tabIndex={0}
                      className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"
                    >
                      <div tabIndex={0} className="card-body">
                        <p>{actionableRoles[currentActionIndex].description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {!actionableRoles[currentActionIndex].image ? null : (
                  <>
                    {actionableRoles[currentActionIndex].image.startsWith(
                      "http"
                    ) ? (
                      <Image
                        className="m-0 self-center"
                        src={actionableRoles[currentActionIndex].image}
                        unoptimized={true}
                        loader={() => {
                          return actionableRoles[currentActionIndex].image;
                        }}
                        alt={""}
                        style={{ width: "100%", height: "auto" }}
                        width={214}
                        height={123}
                      />
                    ) : (
                      <CldImage
                        className="m-0 self-center"
                        src={actionableRoles[currentActionIndex].image || ""}
                        alt={""}
                        priority={true}
                        style={{ width: "100%", height: "auto" }}
                        width={214}
                        height={123}
                      />
                    )}
                  </>
                )}

                <div className="self-center">
                  (Player:
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
                  )
                </div>
              </div>
              <DropdownButton title="Actions" location="top">
                <ModalButton modalId="TagPlayers">
                  Tag <CarbonTag />
                </ModalButton>
                <div className="my-2"></div>
                <ModalButton modalId="playersStatus">
                  Kill <MdiDead />
                </ModalButton>
              </DropdownButton>

              <GlowingButton onClick={handleNextAction} className="ml-4">
                <div className="flex">
                  <span className="mr-2">Next Role</span>
                  <MaterialSymbolsChipExtraction />
                </div>
              </GlowingButton>
            </>
          ) : (
            <>
              <p>{t("NightActions.allActionsCompleted")}</p>
            </>
          )}
        </div>
      </FlexibleModal>
    </div>
  );
};

export default NightActionsControl;
