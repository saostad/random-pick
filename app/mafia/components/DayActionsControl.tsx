import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";
import CarbonSun from "~icons/carbon/sun";
import Timer from "./Timer";
import Speaker from "./Speaker";
import Challenge from "./Challenge";
import CarbonShuffle from "~icons/carbon/shuffle"; // Assuming you have an icon for shuffle

const DayActionsControl: React.FC = () => {
  const { gameState, updateGameState, increaseDayCount } = useGameContext();
  const { handleOpen } = useModal();
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>(0);
  const [allPlayersCompleted, setAllPlayersCompleted] =
    useState<boolean>(false);
  const [selectedStartingPlayer, setSelectedStartingPlayer] = useState<string>(
    gameState.startingPlayerId || ""
  );
  const [selectedChallenger, setSelectedChallenger] = useState<string>("");
  const [challengeMode, setChallengeMode] = useState<boolean>(false);
  const [speakingOrder, setSpeakingOrder] = useState<number[]>([]);
  const [challengedPlayers, setChallengedPlayers] = useState<Set<string>>(
    new Set()
  );
  const [currentChallenger, setCurrentChallenger] = useState<string | null>(
    null
  );
  const [speakerChallenged, setSpeakerChallenged] = useState<Set<string>>(
    new Set()
  );
  const [resetTrigger, setResetTrigger] = useState<boolean>(false);

  const handleNextSpeaker = () => {
    const nextIndex = (currentSpeakerIndex + 1) % speakingOrder.length;
    if (nextIndex === 0) {
      setAllPlayersCompleted(true);
      increaseDayCount();
    } else {
      setCurrentSpeakerIndex(nextIndex);
      setChallengeMode(false);
      setSelectedChallenger("");
      setCurrentChallenger(null);
      setResetTrigger((prev) => !prev); // Trigger timer reset
    }
  };

  const handleStartDay = () => {
    handleOpen("day-actions");
    const alivePlayers = gameState.players.filter((player) => player.isAlive);
    const startingIndex = alivePlayers.findIndex(
      (player) => player.id === selectedStartingPlayer
    );

    if (startingIndex !== -1) {
      const order = [
        ...alivePlayers.slice(startingIndex),
        ...alivePlayers.slice(0, startingIndex),
      ].map((player) => gameState.players.findIndex((p) => p.id === player.id));

      setSpeakingOrder(order);
      setCurrentSpeakerIndex(0);
      setAllPlayersCompleted(false);
      setChallengedPlayers(new Set());
      setSpeakerChallenged(new Set());

      updateGameState({ startingPlayerId: selectedStartingPlayer });
      setResetTrigger((prev) => !prev); // Trigger timer reset
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
    setResetTrigger((prev) => !prev); // Trigger timer reset
  };

  const handleEndChallenge = () => {
    setChallengeMode(false);
    setSelectedChallenger("");
    setSpeakerChallenged((prev) =>
      new Set(prev).add(
        gameState.players[speakingOrder[currentSpeakerIndex]].id
      )
    );
    setResetTrigger((prev) => !prev); // Trigger timer reset
  };

  const handleRandomSelect = () => {
    const alivePlayers = gameState.players.filter((player) => player.isAlive);
    if (alivePlayers.length > 0) {
      const randomPlayer =
        alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
      setSelectedStartingPlayer(randomPlayer.id);
    }
  };

  const lastStartingPlayer = gameState.players.find(
    (player) => player.id === gameState.startingPlayerId
  );
  const alivePlayers = gameState.players.filter((player) => player.isAlive);
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

  return (
    <>
      <h2>
        Day Actions <small>(Day {gameState.dayCount})</small>
      </h2>
      {gameState.dayCount !== 0 && lastStartingPlayer && (
        <p>Last day&apos;s starter was: {lastStartingPlayer.name}</p>
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
          className="btn btn-secondary ml-2"
          onClick={handleRandomSelect}
          title="Randomly select a player"
        >
          <CarbonShuffle />
        </button>
      </div>
      <button
        className="btn btn-ghost btn-outline btn-accent mb-4"
        onClick={handleStartDay}
        disabled={!selectedStartingPlayer}
      >
        Start Day {gameState.dayCount} <CarbonSun />
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
                    <Timer
                      currentSpeakerIndex={currentSpeakerIndex}
                      challengeMode={challengeMode}
                      resetTrigger={resetTrigger}
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
