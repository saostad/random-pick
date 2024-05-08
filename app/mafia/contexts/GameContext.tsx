import React, { useState, createContext, useContext, ReactNode } from "react";

export type Player = {
  id: string;
  name: string;
  roleId?: string;
  isAlive: boolean; // Track whether the player is alive or dead
  voteCount: number; // To track the number of votes a player has
  order: number; // To define their physical location or order in voting
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
  resetGameState: () => void; // Method to reset the game role assignments and player statuses
  increaseVote: (playerId: string) => void;
  decreaseVote: (playerId: string) => void;
  resetVotes: () => void;
};
const GameContext = createContext<GameContextType | undefined>(undefined);

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from local storage or default to empty arrays
  const initialState: GameState = {
    players: [],
    gameRoles: [],
  };

  const [gameState, setGameState] = useState<GameState>(initialState);

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

  /** Method to reset the game role-assignments and player-statuses */
  const resetGameState = () => {
    const initPlayers = gameState.players.map((player) => ({
      ...player,
      roleId: undefined,
      voteCount: 0,
      isAlive: true,
    }));

    setGameState((prevState) => ({ ...prevState, players: initPlayers }));
  };

  const increaseVote = (playerId: string) => {
    setGameState((prev) => {
      return {
        ...prev,
        players: prev.players.map((player) =>
          player.id === playerId
            ? { ...player, voteCount: player.voteCount + 1 }
            : player
        ),
      };
    });
  };

  // Function to decrease vote count for a player
  const decreaseVote = (playerId: string) => {
    setGameState((prev) => {
      return {
        ...prev,
        players: prev.players.map((player) =>
          player.id === playerId && player.voteCount > 0
            ? { ...player, voteCount: player.voteCount - 1 }
            : player
        ),
      };
    });
  };

  const resetVotes = () => {
    setGameState((prev) => {
      const newPlayers = prev.players.map((player) => ({
        ...player,
        voteCount: 0,
      }));
      return { ...prev, players: newPlayers };
    });
  };

  const value = {
    gameState,
    updateGameState,
    markPlayerAsDead,
    assignRoleToPlayer,
    resetGameState,
    increaseVote,
    decreaseVote,
    resetVotes,
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
