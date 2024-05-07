import { useGameContext } from "../GameContext";

const NightActionsControl: React.FC = () => {
  const { gameState, updateGameState, handleNightActions } = useGameContext();

  const handleStartNight = () => {
    const updatedState = handleNightActions(gameState);
    updateGameState({ ...updatedState });
  };

  return <button onClick={handleStartNight}>Start Night Phase</button>;
};

export default NightActionsControl;
