import React, { createContext, useContext, ReactNode } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useModal } from "./ModalContext";

// Define the types for Player and GameRole
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

// Define the type for GameState
export type GameState = {
  players: Player[];
  gameRoles: GameRole[];
};

// Define the type for the GameContext
export type GameContextType = {
  gameState: GameState;
  updateGameState: (newState: Partial<GameState>) => void;
  markPlayerAsDead: (playerId: string) => void;
  assignRoleToPlayer: (playerId: string, roleId: string) => void;
  resetGameState: () => void;
  increaseVote: (playerId: string) => void;
  decreaseVote: (playerId: string) => void;
  resetVotes: () => void;
};

// Create the GameContext with an undefined default value
const GameContext = createContext<GameContextType | undefined>(undefined);

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { handleOpen } = useModal(); // Access the modal context

  // Initialize state from local storage or default to empty arrays
  const initialState: GameState = {
    players: [],
    gameRoles: [],
  };

  // Use local storage to persist game state
  const [gameState, setGameState] = useLocalStorageState<GameState>(
    "gameState",
    {
      defaultValue: initialState,
    }
  );

  // Update game state with new state values
  const updateGameState = (newState: Partial<GameState>) => {
    setGameState((prevState) => ({ ...prevState, ...newState }));
  };

  // Mark a player as dead by updating their isAlive status
  const markPlayerAsDead = (playerId: string) => {
    const updatedPlayers = gameState.players.map((player) =>
      player.id === playerId ? { ...player, isAlive: false } : player
    );
    setGameState((prevState) => ({ ...prevState, players: updatedPlayers }));
  };

  // Assign a role to a player and remove the role from any other player who has it
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

  // Reset the game state, setting all players to alive, without roles, and with zero votes
  const resetGameState = () => {
    const initPlayers = gameState.players.map((player) => ({
      ...player,
      roleId: undefined,
      voteCount: 0,
      isAlive: true,
    }));

    setGameState((prevState) => ({ ...prevState, players: initPlayers }));

    handleOpen("game-reset"); // Show a reset confirmation in a modal
  };

  // Increase the vote count for a specific player
  const increaseVote = (playerId: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId
          ? { ...player, voteCount: player.voteCount + 1 }
          : player
      ),
    }));
  };

  // Decrease the vote count for a specific player
  const decreaseVote = (playerId: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId && player.voteCount > 0
          ? { ...player, voteCount: player.voteCount - 1 }
          : player
      ),
    }));
  };

  // Reset the vote counts for all players
  const resetVotes = () => {
    setGameState((prev) => {
      const newPlayers = prev.players.map((player) => ({
        ...player,
        voteCount: 0,
      }));

      return { ...prev, players: newPlayers };
    });

    handleOpen("votes-reset"); // Show a reset confirmation in a modal
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

// Custom hook to use the GameContext
const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export { GameProvider, useGameContext };
