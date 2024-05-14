import React, { useState } from "react";
import { GameState, useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";

// A function to simulate the night phase
const handleNightActions = (gameState: GameState): GameState => {
  // Filter roles that have actions and sort them by their action order
  const actionableRoles = gameState.gameRoles
    .filter((role) => role.hasAction)
    .sort((a, b) => a.actionOrder! - b.actionOrder!);

  actionableRoles.forEach((role) => {
    // Implement actions for each role here
    console.log(`Processing action for ${role.name}`);
    // Example: Mafia chooses a target, Detective investigates a player, etc.
  });

  return gameState; // Return the updated state after all actions
};

const NightActionsControl: React.FC = () => {
  const { handleOpen, handleClose } = useModal();
  const { gameState, updateGameState } = useGameContext();
  const [currentActionIndex, setCurrentActionIndex] = useState<number>(0);
  const [actionableRoles, setActionableRoles] = useState<any[]>([]);

  const handleStartNight = () => {
    console.log("Starting night actions");

    // Filter and sort actionable roles
    const rolesWithActions = gameState.gameRoles
      .filter((role) => role.hasAction)
      .sort((a, b) => a.actionOrder! - b.actionOrder!);
    setActionableRoles(rolesWithActions);

    // Show the modal
    handleOpen("night-actions");

    // Start the action display
    setCurrentActionIndex(0);

    // Update the game state
    const updatedState = handleNightActions(gameState);
    updateGameState({ ...updatedState });
  };

  const handleNextAction = () => {
    setCurrentActionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      <FlexibleModal modalId="night-actions">
        <>
          <h2>Night Actions</h2>
          {actionableRoles.length > 0 &&
          currentActionIndex < actionableRoles.length ? (
            <>
              <p>
                Processing action for{" "}
                <b>
                  <u>{actionableRoles[currentActionIndex].name}</u>
                </b>
              </p>
              <button onClick={handleNextAction}>Next Action</button>
            </>
          ) : (
            <>
              <p>All actions completed.</p>
            </>
          )}
        </>
      </FlexibleModal>
      <button onClick={handleStartNight}>Start Night Phase</button>
    </>
  );
};

export default NightActionsControl;
