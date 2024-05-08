import { GameState, useGameContext } from "../contexts/GameContext";

// A function to simulate the night phase
const handleNightActions = (gameState: GameState): GameState => {
  // Filter roles that have actions and sort them by their action order
  const actionableRoles = gameState.gameRoles
    .filter((role) => role.hasAction)
    .sort((a, b) => a.actionOrder! - b.actionOrder!);

  actionableRoles.forEach((role) => {
    // Implement actions for each role here
    console.log(`Processing action for ${role.name}`);
    window.alert(`Processing action for ${role.name}`);
    // Example: Mafia chooses a target, Detective investigates a player, etc.
  });

  return gameState; // Return the updated state after all actions
};

const NightActionsControl: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();

  const handleStartNight = () => {
    console.log("Starting night actions");
    const updatedState = handleNightActions(gameState);
    updateGameState({ ...updatedState });
  };

  return <button onClick={handleStartNight}>Start Night Phase</button>;
};

export default NightActionsControl;
