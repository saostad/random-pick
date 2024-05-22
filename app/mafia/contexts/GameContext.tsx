import React, { createContext, useContext, ReactNode } from "react";
import useLocalStorageState from "use-local-storage-state";

export const tags = ["Shot", "Silenced", "Saved"] as const;
export type Tags = (typeof tags)[number];

export const tagExpirations = [
  "this-night",
  "next-day",
  "permanent",
  "this-day",
  "next-night",
] as const;
export type TagExpiration = (typeof tagExpirations)[number];

export type Player = {
  id: string;
  name: string;
  roleId?: string;
  isAlive: boolean;
  voteCount: number;
  order: number;
  tags: {
    tag: Tags;
    assignedBy: string;
    assignedAt: string;
    expires: TagExpiration;
  }[];
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
  dayCount?: number;
  nightCount?: number;
};

export type GameState = {
  players: Player[];
  gameRoles: GameRole[];
  nightCount: number;
  dayCount: number;
  startingPlayerId: string;
  events: GameEvent[];
  votingStatus: "not_started" | "in_progress" | "finished";
  currentStepIndex: number;
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
  setVotingStatus: (status: "not_started" | "in_progress" | "finished") => void;
  setCurrentStepIndex: (index: number) => void;
  assignTagToPlayer: (
    playerId: string,
    tag: Tags,
    assignedBy: string,
    expires: TagExpiration
  ) => void;
  unassignTagFromPlayer: (playerId: string, tag: Tags) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialState: GameState = {
    players: [],
    gameRoles: [],
    nightCount: 0,
    dayCount: 0,
    startingPlayerId: "",
    events: [],
    votingStatus: "not_started",
    currentStepIndex: 0,
  };

  const [gameState, setGameState] = useLocalStorageState<GameState>(
    "gameState",
    { defaultValue: initialState }
  );

  const getCurrentEvent = (): string => {
    const { dayCount, nightCount } = gameState;
    if (dayCount > nightCount) {
      return `Day${dayCount}`;
    } else if (nightCount === dayCount) {
      return `Day${nightCount}`;
    }
    return `Night${nightCount}`;
  };

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...newState }));
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

  const unassignRoleFromPlayer = (playerId: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId ? { ...player, roleId: undefined } : player
      ),
    }));
  };

  const resetGameState = () => {
    setGameState(initialState);
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
        player.id === playerId
          ? { ...player, voteCount: player.voteCount - 1 }
          : player
      ),
    }));
  };

  const resetVotes = () => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) => ({ ...player, voteCount: 0 })),
      events: [
        ...prev.events,
        {
          type: "votesReset",
          description: "Votes reset",
          timestamp: new Date(),
          dayCount: prev.dayCount,
          nightCount: prev.nightCount,
        },
      ],
    }));
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
          nightCount: prevState.nightCount + 1,
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
          dayCount: prevState.dayCount + 1,
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

  const setVotingStatus = (
    status: "not_started" | "in_progress" | "finished"
  ) => {
    setGameState((prev) => ({
      ...prev,
      votingStatus: status,
    }));
  };

  const setCurrentStepIndex = (index: number) => {
    setGameState((prev) => ({
      ...prev,
      currentStepIndex: index,
    }));
  };

  const assignTagToPlayer = (
    playerId: string,
    tag: Tags,
    assignedBy: string,
    expires: TagExpiration
  ) => {
    const assignedAt = getCurrentEvent();
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId
          ? {
              ...player,
              tags: [...player.tags, { tag, assignedBy, assignedAt, expires }],
            }
          : player
      ),
    }));
  };

  const unassignTagFromPlayer = (playerId: string, tag: Tags) => {
    // remove just the last tag that matches the given tag, leaving other tags intact. This is to handle the case where a tag is assigned multiple times.
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) => {
        if (player.id === playerId) {
          const index = player.tags.map((el) => el.tag).indexOf(tag); // Find the first occurrence of the item
          if (index !== -1) {
            player.tags.splice(index, 1); // Remove one instance of the item
            return player;
          } else {
            return player;
          }
        } else {
          return player;
        }
      }),
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
    setVotingStatus,
    setCurrentStepIndex,
    assignTagToPlayer,
    unassignTagFromPlayer,
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
