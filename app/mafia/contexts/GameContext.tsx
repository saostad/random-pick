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

export type GameEvent = {
  type: string;
  description: string;
  timestamp: Date;
};

export type GameState = {
  players: Player[];
  gameRoles: GameRole[];
  nightCount: number;
  dayCount: number;
  startingPlayerId: string;
  events: GameEvent[];
};

export type GameContextType = {
  gameState: GameState;
  updateGameState: (newState: Partial<GameState>) => void;
  markPlayerAsDead: (playerId: string) => void;
  markPlayerAsAlive: (playerId: string) => void;
  assignRoleToPlayer: (playerId: string, roleId: string) => void;
  unassignRoleFromPlayer: (playerId: string) => void;
  resetGameState: () => void;
  increaseVote: (playerId: string) => void;
  decreaseVote: (playerId: string) => void;
  resetVotes: () => void;
  increaseNightCount: () => void;
  increaseDayCount: () => void;
  addEvent: (event: GameEvent) => void;
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
    events: [],
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
    const player = gameState.players.find((player) => player.id === playerId);
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId ? { ...player, isAlive: false } : player
      ),
      events: [
        ...prev.events,
        {
          type: "death",
          description: `${player?.name} died`,
          timestamp: new Date(),
        },
      ],
    }));
  };

  const markPlayerAsAlive = (playerId: string) => {
    const player = gameState.players.find((player) => player.id === playerId);
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId ? { ...player, isAlive: true } : player
      ),
      events: [
        ...prev.events,
        {
          type: "revival",
          description: `${player?.name} revived`,
          timestamp: new Date(),
        },
      ],
    }));
  };

  const assignRoleToPlayer = (playerId: string, roleId: string) => {
    const player = gameState.players.find((player) => player.id === playerId);
    const role = gameState.gameRoles.find((role) => role.id === roleId);
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId ? { ...player, roleId } : player
      ),
      events: [
        ...prev.events,
        {
          type: "roleAssignment",
          description: `${player?.name} assigned to ${role?.name}`,
          timestamp: new Date(),
        },
      ],
    }));
  };

  const unassignRoleFromPlayer = (playerId: string) => {
    const player = gameState.players.find((player) => player.id === playerId);
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId ? { ...player, roleId: undefined } : player
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
      events: [],
      startingPlayerId: "",
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
      events: [
        ...prev.events,
        {
          type: "voteIncrease",
          description: `Vote increased for ${playerId}`,
          timestamp: new Date(),
        },
      ],
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
      events: [
        ...prev.events,
        {
          type: "voteDecrease",
          description: `Vote decreased for ${playerId}`,
          timestamp: new Date(),
        },
      ],
    }));
  };

  const resetVotes = () => {
    setGameState((prev) => {
      const newPlayers = prev.players.map((player) => ({
        ...player,
        voteCount: 0,
      }));

      return {
        ...prev,
        players: newPlayers,
        events: [
          ...prev.events,
          {
            type: "votesReset",
            description: "Votes reset",
            timestamp: new Date(),
          },
        ],
      };
    });
  };

  const increaseNightCount = () => {
    setGameState((prevState) => ({
      ...prevState,
      nightCount: prevState.nightCount + 1,
      events: [
        ...prevState.events,
        {
          type: "nightIncrement",
          description: "Night count increased",
          timestamp: new Date(),
        },
      ],
    }));
  };

  const increaseDayCount = () => {
    setGameState((prevState) => ({
      ...prevState,
      dayCount: prevState.dayCount + 1,
      events: [
        ...prevState.events,
        {
          type: "dayIncrement",
          description: "Day count increased",
          timestamp: new Date(),
        },
      ],
    }));
  };

  const addEvent = (event: GameEvent) => {
    setGameState((prev) => ({
      ...prev,
      events: [...prev.events, event],
    }));
  };

  const value = {
    gameState,
    updateGameState,
    markPlayerAsDead,
    markPlayerAsAlive,
    assignRoleToPlayer,
    unassignRoleFromPlayer,
    resetGameState,
    increaseVote,
    decreaseVote,
    resetVotes,
    increaseNightCount,
    increaseDayCount,
    addEvent,
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
