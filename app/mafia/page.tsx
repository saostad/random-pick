"use client";
import "@picocss/pico/css/pico.min.css";
import { GameProvider } from "./GameContext";
import PlayerStatusManager from "./components/PlayerStatusManager";
import Players from "./components/Players";
import RoleAssignment from "./components/RoleAssignment";
import Roles from "./components/Roles";
import NightActionsControl from "./components/NightActionsControl";
import NewGameButton from "./components/NewGameButton";
import VotingSession from "./components/VotingSession";

export default function Mafia() {
  return (
    <GameProvider>
      <h1>Mafia</h1>
      <NewGameButton />
      <hr />
      <Players />
      <hr />
      <Roles />
      <hr />
      <RoleAssignment />
      <hr />
      <PlayerStatusManager />
      <hr />
      <VotingSession />
      <hr />
      <NightActionsControl />
      <hr />
    </GameProvider>
  );
}
