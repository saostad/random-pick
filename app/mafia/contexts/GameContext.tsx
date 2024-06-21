import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useLocalStorageState from "use-local-storage-state";
import { getAlivePlayers, getPlayerNameById } from "../utils/get-from-fns";
import { TagsType, tags } from "../data/predefinedTags";
import { useModal } from "./ModalContext";

export const tagExpirations = ["this-night", "next-day", "permanent"] as const;
export type TagExpiration = (typeof tagExpirations)[number];

export type GameMode = "pro" | "beginner";

export type VotingStatus =
  | "not_started"
  | "in_progress"
  | "ousting"
  | "lastAction"
  | "finished";

type AssignedTag = {
  tag: TagsType;
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
  persianName: string;
  hasAction: boolean;
  actionOrder?: number;
  preDefinedRoleId?: string;
};

export type LastActType = {
  id: string;
  title: string;
  titleFa: string;
  description: string;
  descriptionFa: string;
};

export type GameEvent = {
  type: string;
  description: string;
  timestamp: string;
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
  speakingOrder: number[];
  tags: TagsType[];
  lastActions: LastActType[];
  playedLastActions: string[];
  lastActionsActive: boolean;
  activeTab: "home" | "settings" | "timeline";
  challengeTime: number;
  challengeTimeEnabled: boolean;
  speakingTime: number;
  speakingTimeEnabled: boolean;
  inquiries: number;
  offerInquiries: boolean;
  gameMode: GameMode;
};

export type GameContextType = {
  loading: boolean;
  gameState: GameState;
  updateGameState: (newState: Partial<GameState>) => void;
  markPlayerAsDead: ({
    playerId,
    reason,
  }: {
    playerId: string;
    reason?: "vote" | "breaking game rules";
  }) => void;
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
    tag: TagsType,
    expires: TagExpiration
  ) => void;
  unassignTagFromPlayer: (playerId: string, tag: TagsType) => void;
  getCurrentPhaseIndex: () => string;
  setSpeakingOrder: (speakingOrder: number[]) => void;
  decreaseInquiries: () => void;
  addEvent: (event: Omit<GameEvent, "eventAt" | "timestamp">) => void;
  getEventsByPhase: (phase: string) => GameEvent[];
  setGameMode: (mode: GameMode) => void;
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
    speakingOrder: [],
    tags: [...tags],
    lastActions: [],
    playedLastActions: [],
    lastActionsActive: false,
    activeTab: "home",
    challengeTime: 30,
    challengeTimeEnabled: true,
    speakingTime: 60,
    speakingTimeEnabled: true,
    inquiries: 2,
    offerInquiries: true,
    gameMode: "beginner",
  };

  const [gameState, setGameState] = useLocalStorageState<GameState>(
    "gameState",
    { defaultValue: initialState }
  );
  const [loading, setLoading] = useState(true);
  const { handleOpen } = useModal();

  useEffect(() => {
    if (gameState) {
      setLoading(false);
    }
  }, [gameState]);

  const updateGameState = (newState: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...newState }));
  };

  const markPlayerAsDead = ({
    playerId,
    reason,
  }: {
    playerId: string;
    reason?: "vote" | "breaking game rules";
  }) => {
    // find player index id
    const playerIndex = getAlivePlayers({
      players: gameState.players,
    }).findIndex((player) => player.id === playerId);

    // remove player from speaking order
    const speakingOrder = gameState.speakingOrder.filter(
      (order) => order !== playerIndex
    );

    // update speaking order
    setSpeakingOrder(speakingOrder);

    // get the player's name
    const playerName = gameState.players.find(
      (player) => player.id === playerId
    )?.name;
    if (!playerName) {
      console.error(`Player ${playerId} not found to mark as dead.`);
    }

    switch (reason) {
      case "vote":
        addEvent({
          type: "player-ousted",
          description: `Player ${playerName} was ousted by vote.`,
        });
        break;
      case "breaking game rules":
        // TODO: implement the UI for this
        addEvent({
          type: "player-ousted",
          description: `Player ${playerName} was ousted for breaking game rules.`,
        });
        break;
      default:
        addEvent({
          type: "player-killed",
          description: `Player ${playerName} was killed.`,
        });
        break;
    }

    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId ? { ...player, isAlive: false } : player
      ),
    }));
  };

  const decreaseInquiries = () => {
    setGameState((prev) => ({
      ...prev,
      inquiries: prev.inquiries === 0 ? 0 : prev.inquiries - 1,
    }));
  };

  const markPlayerAsAlive = (playerId: string) => {
    const playerName = getPlayerNameById({
      playerId,
      players: gameState.players,
    });

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
    handleOpen("ActionRecommender");
  };

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
      speakingOrder: [],
      inquiries: 2,
      playedLastActions: [],
    }));
    handleOpen("ActionRecommender");
  };

  const increaseVote = (playerId: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId
          ? {
              ...player,
              voteCount:
                player.voteCount ===
                getAlivePlayers({ players: gameState.players }).length
                  ? player.voteCount
                  : player.voteCount + 1,
            }
          : player
      ),
    }));
  };

  const decreaseVote = (playerId: string) => {
    setGameState((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId
          ? {
              ...player,
              voteCount: player.voteCount === 0 ? 0 : player.voteCount - 1,
            }
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
          timestamp: new Date().toDateString(),
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

  function getCurrentPhaseIndex(): string {
    const { dayCount, nightCount, votingStatus } = gameState;

    // if dayCount === nightCount, it means the game is in the day phase
    // if dayCount > nightCount, and  voting session is not finished, it means the game is in the voting phase
    // if dayCount > nightCount, and  voting session is finished, it means the game is in the night phase
    if (dayCount === nightCount) {
      return `Day${dayCount}`;
    } else if (
      dayCount > nightCount &&
      (votingStatus === "in_progress" || votingStatus === "ousting")
    ) {
      return `Voting${nightCount}`;
    } else if (dayCount > nightCount && votingStatus === "finished") {
      return `Night${nightCount}`;
    }
    return "Unknown";
  }

  const assignTagToPlayer = (
    playerId: string,
    tag: TagsType,
    expires: TagExpiration
  ) => {
    const playerName = getPlayerNameById({
      playerId,
      players: gameState.players,
    });

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

  const unassignTagFromPlayer = (playerId: string, tag: TagsType) => {
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

  const setSpeakingOrder = (speakingOrder: number[]) => {
    setGameState((prev) => ({
      ...prev,
      speakingOrder,
    }));
  };

  const getEventsByPhase = (phase: string) => {
    return gameState.events.filter((event) => event.eventAt === phase);
  };

  const setGameMode = (mode: GameMode) => {
    if (mode === "beginner") {
      setGameState((prev) => ({
        ...prev,
        gameMode: mode,
        speakingTimeEnabled: false,
        challengeTimeEnabled: false,
        offerInquiries: false,
        lastActionsActive: false,
      }));
    } else if (mode === "pro") {
      setGameState((prev) => ({
        ...prev,
        gameMode: mode,
        speakingTimeEnabled: true,
        challengeTimeEnabled: true,
        offerInquiries: true,
        lastActionsActive: true,
      }));
    } else {
      console.error(`Invalid game mode ${mode} provided.`);
    }
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
    setSpeakingOrder,
    loading,
    decreaseInquiries,
    addEvent,
    getEventsByPhase,
    setGameMode,
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
