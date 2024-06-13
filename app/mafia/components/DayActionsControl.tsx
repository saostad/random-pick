import React, { useEffect, useRef, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";
import Timer from "./Timer";
import Speaker from "./Speaker";
import Challenge from "./Challenge";
import CarbonShuffle from "~icons/carbon/shuffle";
import { getAlivePlayers } from "../utils/get-from-fns";
import Animation from "./Animation";
import MediaPlayer, { MediaPlayerRef } from "./MediaPlayer";

const DayActionsControl: React.FC = () => {
  const { gameState, updateGameState, increaseDayCount, setSpeakingOrder } =
    useGameContext();
  const {
    players,
    speakingOrder,
    startingPlayerId,
    speakingTime,
    speakingTimeEnabled,
    challengeTime,
    challengeTimeEnabled,
  } = gameState;
  const { handleOpen } = useModal();
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

  const handleNextSpeaker = () => {
    const nextIndex = (currentSpeakerIndex + 1) % speakingOrder.length;
    if (nextIndex === 0) {
      setAllPlayersCompleted(true);
      increaseDayCount();
      setIsTimerRunning(false);
    } else {
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

  const handleStartDay = () => {
    handleOpen("day-actions");
    const alivePlayers = getAlivePlayers({ players });
    const startingIndex = alivePlayers.findIndex(
      (player) => player.id === selectedStartingPlayer
    );

    if (startingIndex !== -1) {
      const order = [
        ...alivePlayers.slice(startingIndex),
        ...alivePlayers.slice(0, startingIndex),
      ].map((player) => players.findIndex((p) => p.id === player.id));

      setSpeakingOrder(order);
      setCurrentSpeakerIndex(0);
      setAllPlayersCompleted(false);
      setChallengedPlayers(new Set());
      setSpeakerChallenged(new Set());
      setIsTimerRunning(true);

      updateGameState({ startingPlayerId: selectedStartingPlayer });
    } else {
      console.error(
        "Selected starting player not found in the list of players"
      );
    }
  };

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

  const handleRandomSelect = () => {
    const alivePlayers = getAlivePlayers({ players: gameState.players });
    if (alivePlayers.length > 0) {
      const randomPlayer =
        alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
      setSelectedStartingPlayer(randomPlayer.id);
    }
  };

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
    if (mediaPlayerRef.current) {
      mediaPlayerRef.current.play();
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

  return (
    <>
      <div className="text-2xl text-center font-bold mt-4">
        <Animation
          className="mask mask-circle"
          src="mafia/animation/day.lottie"
          loop={false}
          autoplay={true}
        />
        Day Actions <small>(Day {gameState.dayCount})</small>
      </div>
      {gameState.dayCount !== 0 && lastStartingPlayer && (
        <p className="my-4">
          Last day&apos;s starter was:{" "}
          <span className="font-bold">{lastStartingPlayer.name}</span>
        </p>
      )}
      <div className="mb-2 flex items-center">
        <label htmlFor="starting-player" className="mr-2">
          Starting Player:{" "}
        </label>
        <select
          className="select select-secondary w-full max-w-xs my-2"
          id="starting-player"
          value={selectedStartingPlayer}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Select Player
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
      <button
        className="btn my-3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        onClick={handleStartDay}
        disabled={!selectedStartingPlayer}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Start Day {gameState.dayCount}
        </span>
      </button>
      <FlexibleModal modalId="day-actions" title="Day Actions">
        <>
          {allPlayersCompleted ? (
            <p>All players have spoken.</p>
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
