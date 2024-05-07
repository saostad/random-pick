"use client";
import "@picocss/pico/css/pico.min.css";
import { GameProvider } from "./GameContext";
import PlayerStatusManager from "./components/PlayerStatusManager";
import Players from "./components/Players";
import RoleAssignment from "./components/RoleAssignment";
import Roles from "./components/Roles";
import NightActionsControl from "./components/NightActionsControl";
import NewGameButton from "./components/NewGameButton";

export default function Mafia() {
  return (
    <GameProvider>
      <h1>Mafia</h1>
      <hr />
      <Players />
      <hr />
      <Roles />
      <hr />
      <RoleAssignment />
      <hr />
      <PlayerStatusManager />
      <hr />
      <NightActionsControl />
      <hr />
      <NewGameButton />
    </GameProvider>
  );
}
