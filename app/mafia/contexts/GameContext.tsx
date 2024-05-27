import React, { createContext, useContext, ReactNode } from "react";
import useLocalStorageState from "use-local-storage-state";

export const tags = [
  // When someone fires a gun
  "Fired",
  // When someone got shot with a gun
  "Wounded",
  "Silenced",
  // when a player lost their ability
  "Defused",
  // when a magician applied a spell or trick on someone
  "Enchanted",
] as const;
export type Tags = (typeof tags)[number];

export const tagExpirations = ["this-night", "next-day", "permanent"] as const;
export type TagExpiration = (typeof tagExpirations)[number];

export type VotingStatus =
  | "not_started"
  | "in_progress"
  | "voting_elimination"
  | "finished";

type AssignedTag = {
  tag: Tags;
  AssignedAtIndex: number;
  expires: TagExpiration;
};

export type Player = {
  id: string;
  name: string;
  roleId?: string;
  isAlive: boolean;
  voteCount: number;
  order: number;
  tags: AssignedTag[];
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
  eventAt: string;
};

export type GameState = {
  players: Player[];
  gameRoles: GameRole[];
  nightCount: number;
  dayCount: number;
  startingPlayerId: string;
  events: GameEvent[];
  votingStatus: VotingStatus;
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
  softResetGameState: () => void;
  increaseVote: (playerId: string) => void;
  decreaseVote: (playerId: string) => void;
  resetVotes: () => void;
  increaseNightCount: () => void;
  increaseDayCount: () => void;
  setVotingStatus: (status: VotingStatus) => void;
  setCurrentStepIndex: (index: number) => void;
  assignTagToPlayer: (
    playerId: string,
    tag: Tags,
    expires: TagExpiration
  ) => void;
  unassignTagFromPlayer: (playerId: string, tag: Tags) => void;
  getCurrentPhaseIndex: () => string;
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

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...newState }));
  };

  const markPlayerAsDead = (playerId: string) => {
    // get the player's name
    const playerName = gameState.players.find(
      (player) => player.id === playerId
    )?.name;
    if (!playerName) {
      return;
    }

    addEvent({
      type: "player-killed",
      description: `Player ${playerName} was killed.`,
    });

    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId ? { ...player, isAlive: false } : player
      ),
    }));
  };

  const markPlayerAsAlive = (playerId: string) => {
    const playerName = getPlayerNameById(playerId);

    addEvent({
      type: "player-resurrected",
      description: `Player ${playerName} was resurrected`,
    });

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

  /** reset the game state except the player-names and roles */
  const softResetGameState = () => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) => ({
        ...player,
        isAlive: true,
        roleId: undefined,
        voteCount: 0,
        tags: [],
      })),
      nightCount: 0,
      dayCount: 0,
      events: [],
      votingStatus: "not_started",
      currentStepIndex: 0,
    }));
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
    }));
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
      votingStatus: "not_started",
    }));
  };

  const addEvent = (event: Omit<GameEvent, "eventAt" | "timestamp">) => {
    setGameState((prev) => ({
      ...prev,
      events: [
        ...prev.events,
        {
          ...event,
          eventAt: getCurrentPhaseIndex(),
          timestamp: new Date(),
        },
      ],
    }));
  };

  const setVotingStatus = (status: VotingStatus) => {
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

  function getPlayerNameById(playerId: string) {
    return gameState.players.find((player) => player.id === playerId)?.name;
  }

  function getCurrentPhaseIndex(): string {
    const { dayCount, nightCount, votingStatus } = gameState;

    // if dayCount === nightCount, it means the game is in the day phase
    // if dayCount > nightCount, and  voting session is not finished, it means the game is in the voting phase
    // if dayCount > nightCount, and  voting session is finished, it means the game is in the night phase
    if (dayCount === nightCount) {
      return `Day${dayCount}`;
    } else if (
      dayCount > nightCount &&
      (votingStatus === "in_progress" || votingStatus === "voting_elimination")
    ) {
      return `Voting${nightCount}`;
    } else if (dayCount > nightCount && votingStatus === "finished") {
      return `Night${nightCount}`;
    }
    return "Unknown";
  }

  const assignTagToPlayer = (
    playerId: string,
    tag: Tags,
    expires: TagExpiration
  ) => {
    const playerName = getPlayerNameById(playerId);

    addEvent({
      type: "player-tagged",
      description: `Player ${playerName} was tagged with ${tag}.`,
    });

    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId
          ? {
              ...player,
              tags: [
                ...player.tags,
                {
                  tag,
                  AssignedAtIndex: prev.currentStepIndex,
                  expires,
                },
              ],
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
    softResetGameState,
    increaseVote,
    decreaseVote,
    resetVotes,
    increaseNightCount,
    increaseDayCount,
    setVotingStatus,
    setCurrentStepIndex,
    assignTagToPlayer,
    unassignTagFromPlayer,
    getCurrentPhaseIndex,
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
