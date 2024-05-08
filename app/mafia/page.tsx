"use client";
import "@picocss/pico/css/pico.min.css";
import PlayerStatusManager from "./components/PlayerStatusManager";
import Players from "./components/Players";
import RoleAssignment from "./components/RoleAssignment";
import Roles from "./components/Roles";
import NightActionsControl from "./components/NightActionsControl";
import NewGameButton from "./components/NewGameButton";
import VotingSession from "./components/VotingSession";
import { GameProvider } from "./contexts/GameContext";

import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";
import Main from "./components/Main";

export default function Mafia() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}
