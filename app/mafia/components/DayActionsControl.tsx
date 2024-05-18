import React, { useState, useEffect, useRef } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";
import CarbonSun from "~icons/carbon/sun";
import CarbonUserSpeaker from "~icons/carbon/user-speaker";

const DayActionsControl: React.FC = () => {
  const { gameState, updateGameState, increaseDayCount } = useGameContext();
  const { handleOpen } = useModal();
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentSpeakerIndex, challengeMode]);

  const handleNextSpeaker = () => {
    const nextIndex = (currentSpeakerIndex + 1) % speakingOrder.length;
    if (nextIndex === 0) {
      setAllPlayersCompleted(true);
      increaseDayCount();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } else {
      setCurrentSpeakerIndex(nextIndex);
      setElapsedTime(0);
      setChallengeMode(false);
      setSelectedChallenger("");
      setCurrentChallenger(null);
    }
  };

  const handleStartDay = () => {
    console.log("Starting day actions");

    handleOpen("day-actions");

    const alivePlayers = gameState.players.filter((player) => player.isAlive);
    const startingIndex = alivePlayers.findIndex(
      (player) => player.id === selectedStartingPlayer
    );

    if (startingIndex !== -1) {
      // Create the speaking order array for alive players
      const order = [
        ...alivePlayers.slice(startingIndex),
        ...alivePlayers.slice(0, startingIndex),
      ].map((player) => gameState.players.findIndex((p) => p.id === player.id));

      setSpeakingOrder(order);
      setCurrentSpeakerIndex(0);
      setElapsedTime(0);
      setAllPlayersCompleted(false);
      setChallengedPlayers(new Set());
      setSpeakerChallenged(new Set());

      // Update the starting player for the new day
      updateGameState({
        startingPlayerId: selectedStartingPlayer,
      });
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
    setElapsedTime(0);
    setChallengedPlayers((prev) => new Set(prev).add(selectedChallenger));
    setCurrentChallenger(selectedChallenger);
  };

  const handleEndChallenge = () => {
    setChallengeMode(false);
    setSelectedChallenger("");
    setElapsedTime(0);
    setSpeakerChallenged((prev) =>
      new Set(prev).add(
        gameState.players[speakingOrder[currentSpeakerIndex]].id
      )
    );
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
      {lastStartingPlayer && (
        <p>Last day&apos;s starter was: {lastStartingPlayer.name}</p>
      )}
      <div className="mb-2">
        <label htmlFor="starting-player">Select Starting Player: </label>
        <select
          className="select select-secondary w-full max-w-xs"
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
      </div>
      <button
        className="btn btn-accent mb-4"
        onClick={handleStartDay}
        disabled={!selectedStartingPlayer}
      >
        Start Day {gameState.dayCount} <CarbonSun />
      </button>
      <FlexibleModal modalId="day-actions">
        <>
          <h2>Day Actions</h2>
          {allPlayersCompleted ? (
            <p>All players have spoken.</p>
          ) : (
            <>
              {alivePlayers.length > 0 &&
                speakingOrder.length > 0 &&
                currentSpeaker && (
                  <>
                    <p>
                      <b>Current Speaker:</b>{" "}
                      {currentSpeaker?.name || "Unknown"}
                    </p>
                    {challengeMode && currentChallengerName && (
                      <p>
                        <b>Challenger:</b> {currentChallengerName} is
                        challenging on the time of {currentSpeaker?.name}
                      </p>
                    )}
                    <p>
                      <b>Elapsed Time:</b> {elapsedTime}s
                    </p>
                    <div className="mb-2">
                      <label htmlFor="challenger">Select Challenger: </label>
                      <select
                        className="select select-secondary w-full max-w-xs"
                        id="challenger"
                        value={selectedChallenger}
                        onChange={handleChallengerChange}
                        disabled={
                          challengeMode ||
                          currentSpeakerHasChallenged ||
                          availableChallengers.length === 0
                        }
                      >
                        <option value="" disabled>
                          Select Challenger
                        </option>
                        {availableChallengers.map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="btn btn-warning mb-2"
                      onClick={handleStartChallenge}
                      disabled={challengeMode || !selectedChallenger}
                    >
                      Start Challenge
                    </button>
                    <button
                      className="btn btn-success mb-2"
                      onClick={handleEndChallenge}
                      disabled={!challengeMode}
                    >
                      End Challenge
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleNextSpeaker}
                      disabled={challengeMode}
                    >
                      Next Speaker <CarbonUserSpeaker />
                    </button>
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
