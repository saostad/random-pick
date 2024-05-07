"use client";
import "@picocss/pico/css/pico.min.css";
import { GameProvider } from "./GameContext";
import PlayerStatusManager from "./components/PlayerStatusManager";
import Players from "./components/Players";
import RoleAssignment from "./components/RoleAssignment";
import Roles from "./components/Roles";
import NightActionsControl from "./components/NightActionsControl";

export default function Mafia() {
  return (
    <GameProvider>
      <h1>Mafia</h1>
      <Players />
      <Roles />
      <RoleAssignment />
      <PlayerStatusManager />
      <NightActionsControl />
    </GameProvider>
  );
}
