import React, { useState, useEffect } from "react";
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
  const [rolePlayers, setRolePlayers] = useState<{
    [key: string]: { name: string; isAlive: boolean };
  }>({});
  const [unassignedRoles, setUnassignedRoles] = useState<any[]>([]);
  const [unassignedPlayers, setUnassignedPlayers] = useState<any[]>([]);

  useEffect(() => {
    const mapRoleToPlayer = () => {
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

      // Identify roles without players assigned
      const rolesWithoutPlayers = gameState.gameRoles.filter(
        (role) => !roleToPlayerMap[role.id]
      );

      setUnassignedRoles(rolesWithoutPlayers);

      // Identify players without roles assigned
      const playersWithoutRoles = gameState.players.filter(
        (player) => !player.roleId
      );

      setUnassignedPlayers(playersWithoutRoles);
    };

    mapRoleToPlayer();
  }, [gameState]);

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
      <h2>Night Actions</h2>
      {unassignedRoles.length > 0 && (
        <div>
          <h3>Unassigned Roles</h3>
          <ul>
            {unassignedRoles.map((role) => (
              <li key={role.id}>{role.name}</li>
            ))}
          </ul>
        </div>
      )}
      {unassignedPlayers.length > 0 && (
        <div>
          <h3>Unassigned Players</h3>
          <ul>
            {unassignedPlayers.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleStartNight}>Start Night Phase</button>
      <FlexibleModal modalId="night-actions">
        <>
          <h2>Night Actions</h2>
          {actionableRoles.length > 0 &&
          currentActionIndex < actionableRoles.length ? (
            <>
              <p>
                <b>
                  <u>{actionableRoles[currentActionIndex].name}</u>
                </b>{" "}
                (Player:{" "}
                <b>
                  {rolePlayers[actionableRoles[currentActionIndex].id]?.name}
                  {!rolePlayers[actionableRoles[currentActionIndex].id]
                    ?.isAlive && <mark> (Dead)</mark>}
                </b>
                )
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
    </>
  );
};

export default NightActionsControl;
