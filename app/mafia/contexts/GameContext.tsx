import React, { createContext, useContext, ReactNode } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useModal } from "./ModalContext";

export type Player = {
  id: string;
  name: string;
  roleId?: string;
  isAlive: boolean;
  voteCount: number;
  order: number;
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
  nightCount: number;
  dayCount: number;
  startingPlayerId: string;
};

export type GameContextType = {
  gameState: GameState;
  updateGameState: (newState: Partial<GameState>) => void;
  markPlayerAsDead: (playerId: string) => void;
  markPlayerAsAlive: (playerId: string) => void;
  assignRoleToPlayer: (playerId: string, roleId: string) => void;
  resetGameState: () => void;
  increaseVote: (playerId: string) => void;
  decreaseVote: (playerId: string) => void;
  resetVotes: () => void;
  increaseNightCount: () => void;
  increaseDayCount: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { handleOpen } = useModal();

  const initialState: GameState = {
    players: [],
    gameRoles: [],
    nightCount: 0,
    dayCount: 0,
    startingPlayerId: "",
  };

  const [gameState, setGameState] = useLocalStorageState<GameState>(
    "gameState",
    {
      defaultValue: initialState,
    }
  );

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState((prevState) => ({ ...prevState, ...newState }));
  };

  const markPlayerAsDead = (playerId: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId ? { ...player, isAlive: false } : player
      ),
    }));
  };

  const markPlayerAsAlive = (playerId: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId ? { ...player, isAlive: true } : player
      ),
    }));
  };

  const assignRoleToPlayer = (playerId: string, roleId: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId ? { ...player, roleId } : player
      ),
    }));
  };

  const resetGameState = () => {
    const initPlayers = gameState.players.map((player) => ({
      ...player,
      roleId: undefined,
      voteCount: 0,
      isAlive: true,
    }));

    setGameState((prevState) => ({
      ...prevState,
      players: initPlayers,
      nightCount: 0,
      dayCount: 0,
    }));

    handleOpen("game-reset");
  };

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

  const resetVotes = () => {
    setGameState((prev) => {
      const newPlayers = prev.players.map((player) => ({
        ...player,
        voteCount: 0,
      }));

      return { ...prev, players: newPlayers };
    });

    handleOpen("votes-reset");
  };

  const increaseNightCount = () => {
    setGameState((prevState) => ({
      ...prevState,
      nightCount: prevState.nightCount + 1,
    }));
  };

  const increaseDayCount = () => {
    setGameState((prevState) => ({
      ...prevState,
      dayCount: prevState.dayCount + 1,
    }));
  };

  const value = {
    gameState,
    updateGameState,
    markPlayerAsDead,
    markPlayerAsAlive,
    assignRoleToPlayer,
    resetGameState,
    increaseVote,
    decreaseVote,
    resetVotes,
    increaseNightCount,
    increaseDayCount,
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
