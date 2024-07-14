import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Player, useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";
import Timer from "./Timer";
import Speaker from "./Speaker";
import Challenge from "./Challenge";
import CarbonShuffle from "~icons/carbon/shuffle";
import { getAlivePlayers, getPlayerNameById } from "../utils/get-from-fns";
import Animation from "./Animation";
import MediaPlayer, { MediaPlayerRef } from "./MediaPlayer";
import { ToastContext } from "../contexts/ToastContext";
import GlowingButton from "./GlowingButton";
import { useTranslations } from "next-intl";
import DayTargets from "./DayTargets";

const DayActionsControl: React.FC = () => {
  const {
    gameState,
    updateGameState,
    increaseDayCount,
    setSpeakingOrder,
    addEvent,
  } = useGameContext();
  const {
    players,
    speakingOrder,
    startingPlayerId,
    speakingTime,
    speakingTimeEnabled,
    challengeTime,
    challengeTimeEnabled,
  } = gameState;
  const { handleOpen, modals } = useModal();
  const { addToast } = useContext(ToastContext);
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>(0);
  const [allPlayersCompleted, setAllPlayersCompleted] =
    useState<boolean>(false);
  const [selectedStartingPlayer, setSelectedStartingPlayer] = useState<string>(
    startingPlayerId || ""
  );
  const [selectedChallenger, setSelectedChallenger] = useState<string>("");
  const [challengeMode, setChallengeMode] = useState<boolean>(false);
  const [challengedPlayers, setChallengedPlayers] = useState<Set<string>>(
    new Set()
  );
  const [currentChallenger, setCurrentChallenger] = useState<string | null>(
    null
  );
  const [speakerChallenged, setSpeakerChallenged] = useState<Set<string>>(
    new Set()
  );
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const [selectedTargets, setSelectedTargets] = useState<Player[]>([]);

  const handleNextSpeaker = () => {
    const nextIndex = (currentSpeakerIndex + 1) % speakingOrder.length;
    if (nextIndex === 0) {
      setAllPlayersCompleted(true);
      increaseDayCount();
      setIsTimerRunning(false);
    } else {
      // register the selected targets in events
      if (selectedTargets.length > 0) {
        const playerName = challengeMode
          ? getPlayerNameById({ playerId: selectedChallenger, players })
          : gameState.players[speakingOrder[currentSpeakerIndex]].name;

        addEvent({
          type: "dayTargets",
          description: `Player ${playerName} targeted: ${selectedTargets
            .map((player) => player.name)
            .join(", ")}`,
        });
      }

      setSelectedTargets([]);
      setCurrentSpeakerIndex(nextIndex);
      setChallengeMode(false);
      setSelectedChallenger("");
      setCurrentChallenger(null);
      setIsTimerRunning(false);
      setTimeout(() => {
        setIsTimerRunning(true);
      }, 0);
    }
  };

  const handleRandomSelect = () => {
    const alivePlayers = getAlivePlayers({ players: gameState.players });
    if (alivePlayers.length > 0) {
      const randomPlayer =
        alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
      setSelectedStartingPlayer(randomPlayer.id);
      addToast({
        message: `${getPlayerNameById({
          playerId: randomPlayer.id,
          players,
        })} selected as starting player.`,
        type: "info",
      });
    }
  };

  const handleStartDay = useCallback(() => {
    const alivePlayers = getAlivePlayers({ players });
    let startingIndex = alivePlayers.findIndex(
      (player) => player.id === selectedStartingPlayer
    );

    if (startingIndex !== -1) {
      handleOpen("day-actions");
      const order = [
        ...alivePlayers.slice(startingIndex),
        ...alivePlayers.slice(0, startingIndex),
      ].map((player) => players.findIndex((p) => p.id === player.id));

      updateGameState({
        speakingOrder: order,
        startingPlayerId: selectedStartingPlayer,
      });

      setCurrentSpeakerIndex(0);
      setAllPlayersCompleted(false);
      setChallengedPlayers(new Set());
      setSpeakerChallenged(new Set());
      setIsTimerRunning(true);
    } else {
      addToast({
        message: `Error: Selected starting player not found. Please select again.`,
        type: "error",
      });
      handleRandomSelect();
    }
  }, [players, selectedStartingPlayer, handleOpen, updateGameState, addToast]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStartingPlayer(e.target.value);
  };

  const handleChallengerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChallenger(e.target.value);
  };

  const handleStartChallenge = () => {
    setChallengeMode(true);
    setChallengedPlayers((prev) => new Set(prev).add(selectedChallenger));
    setCurrentChallenger(selectedChallenger);
    setIsTimerRunning(false);
    setTimeout(() => {
      setIsTimerRunning(true);
    }, 0);
  };

  const handleEndChallenge = () => {
    setChallengeMode(false);
    setSelectedChallenger("");
    setSpeakerChallenged((prev) =>
      new Set(prev).add(
        gameState.players[speakingOrder[currentSpeakerIndex]].id
      )
    );
    setIsTimerRunning(false);
    setTimeout(() => {
      setIsTimerRunning(true);
    }, 0);
  };

  useEffect(() => {
    const alivePlayers = getAlivePlayers({ players });
    let startingIndex = alivePlayers.findIndex(
      (player) => player.id === selectedStartingPlayer
    );

    if (startingIndex === -1) {
      // it means the selected player is not alive
      // randomly select a player
      handleRandomSelect();
    }
  }, [selectedStartingPlayer]);

  const lastStartingPlayer = gameState.players.find(
    (player) => player.id === gameState.startingPlayerId
  );
  const alivePlayers = getAlivePlayers({ players: gameState.players });

  const currentSpeaker =
    speakingOrder.length > 0
      ? gameState.players[speakingOrder[currentSpeakerIndex]]
      : null;

  const availableChallengers = alivePlayers.filter(
    (player) =>
      currentSpeaker &&
      player.id !== currentSpeaker.id &&
      !challengedPlayers.has(player.id)
  );
  const currentSpeakerHasChallenged =
    currentSpeaker && speakerChallenged.has(currentSpeaker.id);

  const currentChallengerName = currentChallenger
    ? gameState.players.find((player) => player.id === currentChallenger)?.name
    : null;

  const mediaPlayerRef = useRef<MediaPlayerRef>(null);

  const handleStartAudio = () => {
    if (modals["day-actions"]) {
      if (mediaPlayerRef.current) {
        mediaPlayerRef.current.play();
      }
    }
  };

  useEffect(() => {
    if (challengeMode) {
      if (challengeTimeEnabled && elapsedTime === challengeTime) {
        handleStartAudio();
      }
    } else {
      if (speakingTimeEnabled && elapsedTime === speakingTime) {
        handleStartAudio();
      }
    }
  }, [
    elapsedTime,
    speakingTimeEnabled,
    speakingTime,
    challengeTimeEnabled,
    challengeTime,
    challengeMode,
  ]);

  const t = useTranslations("Mafia");

  return (
    <>
      <div className="text-center my-4">
        <GlowingButton
          onClick={handleStartDay}
          disabled={!selectedStartingPlayer}
          className="my-4 btn-wide"
        >
          {t("DayActions.startDay")} {gameState.dayCount}
        </GlowingButton>
      </div>
      {gameState.dayCount !== 0 && lastStartingPlayer && (
        <p className="my-4">
          {t("lastDayStarterWas")}{" "}
          <span className="font-bold">{lastStartingPlayer.name}</span>
        </p>
      )}
      <div className="mb-2 flex items-center">
        <label htmlFor="starting-player" className="mr-2">
          {t("DayActions.startingPlayer")}{" "}
        </label>
        <select
          className="select select-secondary w-full max-w-xs my-2"
          id="starting-player"
          value={selectedStartingPlayer}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            {t("DayActions.selectPlayer")}
          </option>
          {alivePlayers.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-ghost btn-outline btn-secondary ml-2"
          onClick={handleRandomSelect}
          title="Randomly select a player"
        >
          <CarbonShuffle />
        </button>
      </div>
      <Animation
        className="mask mask-circle max-w-48 max-h-48 m-auto"
        src="mafia/animation/day.lottie"
        loop={false}
        autoplay={true}
      />

      <FlexibleModal modalId="day-actions" title={t("dayActions")}>
        <>
          {allPlayersCompleted ? (
            <p>{t("allPlayersHaveSpoken")}</p>
          ) : (
            <>
              {alivePlayers.length > 0 &&
                speakingOrder.length > 0 &&
                currentSpeaker && (
                  <>
                    <div className="flex justify-between">
                      <Timer
                        isRunning={isTimerRunning}
                        onElapsedTimeChange={setElapsedTime}
                      />
                      <MediaPlayer
                        mediaUrl="/mafia/ding-101492.mp3"
                        loop={false}
                        ref={mediaPlayerRef}
                      />
                    </div>

                    <Speaker
                      currentSpeaker={currentSpeaker}
                      challengeMode={challengeMode}
                      currentChallengerName={currentChallengerName ?? null}
                      handleNextSpeaker={handleNextSpeaker}
                      challengeModeDisabled={challengeMode}
                    />
                    <Challenge
                      challengeMode={challengeMode}
                      selectedChallenger={selectedChallenger}
                      handleChallengerChange={handleChallengerChange}
                      handleStartChallenge={handleStartChallenge}
                      handleEndChallenge={handleEndChallenge}
                      availableChallengers={availableChallengers}
                      challengeModeDisabled={challengeMode}
                      speakerHasChallenged={
                        currentSpeakerHasChallenged ?? false
                      }
                    />
                    <DayTargets
                      playerId={
                        challengeMode ? selectedChallenger : currentSpeaker.id
                      }
                      setTargets={setSelectedTargets}
                    />
                  </>
                )}
            </>
          )}
        </>
      </FlexibleModal>
    </>
  );
};

export default DayActionsControl;
