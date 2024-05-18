import React, { useState, useEffect, useRef } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";

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
  const [speakingOrder, setSpeakingOrder] = useState<number[]>([]);
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
  }, [currentSpeakerIndex]); // Reset timer when the current speaker changes

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
    }
  };

  const handleStartDay = () => {
    console.log("Starting day actions");

    handleOpen("day-actions");

    const startingIndex = gameState.players.findIndex(
      (player) => player.id === selectedStartingPlayer
    );

    if (startingIndex !== -1) {
      // Create the speaking order array
      const order = [
        ...gameState.players.slice(startingIndex),
        ...gameState.players.slice(0, startingIndex),
      ].map((player) => gameState.players.findIndex((p) => p.id === player.id));

      setSpeakingOrder(order);
      setCurrentSpeakerIndex(0);
      setElapsedTime(0);
      setAllPlayersCompleted(false);

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

  const lastStartingPlayer = gameState.players.find(
    (player) => player.id === gameState.startingPlayerId
  );

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
          id="starting-player"
          value={selectedStartingPlayer}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Select Player
          </option>
          {gameState.players.map((player) => (
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
        Start Day {gameState.dayCount}
      </button>
      <FlexibleModal modalId="day-actions">
        <>
          <h2>Day Actions</h2>
          {allPlayersCompleted ? (
            <p>All players completed.</p>
          ) : (
            <>
              {gameState.players.length > 0 && speakingOrder.length > 0 && (
                <>
                  <p>
                    <b>Current Speaker:</b>{" "}
                    {gameState.players[speakingOrder[currentSpeakerIndex]]
                      ?.name || "Unknown"}
                  </p>
                  <p>
                    <b>Elapsed Time:</b> {elapsedTime}s
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={handleNextSpeaker}
                  >
                    Next Speaker
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
