import React, { useState, createContext, useContext, ReactNode } from "react";
export type Player = {
  id: string;
  name: string;
  roleId?: string;
  isAlive: boolean; // Track whether the player is alive or dead
};

export type GameRole = {
  id: string;
  name: string;
  hasAction: boolean;
  actionOrder?: number;
};

export type GameState = {
  players: Player[];
  gameRoles: GameRole[];
};

export type GameContextType = {
  gameState: GameState;
  updateGameState: (newState: Partial<GameState>) => void;
  markPlayerAsDead: (playerId: string) => void; // Method to mark a player as dead
  assignRoleToPlayer: (playerId: string, roleId: string) => void; // Method to assign a role to a player
  handleNightActions: (gameState: GameState) => GameState; // Method to handle night actions
};
const GameContext = createContext<GameContextType | undefined>(undefined);

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    gameRoles: [],
  });

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState((prevState) => ({ ...prevState, ...newState }));
  };

  const markPlayerAsDead = (playerId: string) => {
    const updatedPlayers = gameState.players.map((player) =>
      player.id === playerId ? { ...player, isAlive: false } : player
    );
    setGameState((prevState) => ({ ...prevState, players: updatedPlayers }));
  };

  const assignRoleToPlayer = (playerId: string, roleId: string) => {
    const updatedPlayers = gameState.players.map((player) => {
      if (player.id === playerId) {
        return { ...player, roleId };
      } else if (player.roleId === roleId) {
        // Remove role if it was assigned to another player
        return { ...player, roleId: undefined };
      }
      return player;
    });

    setGameState((prevState) => ({ ...prevState, players: updatedPlayers }));
  };

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

  const value = {
    gameState,
    updateGameState,
    markPlayerAsDead,
    assignRoleToPlayer,
    handleNightActions,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export { GameProvider, useGameContext };
