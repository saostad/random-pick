import React, { HTMLAttributes } from "react";
import { ModalProvider } from "../contexts/ModalContext";
import ModalButton from "./ModalButton";
import { GameProvider } from "../contexts/GameContext";
import NewGameButton from "./NewGameButton";
import NightActionsControl from "./NightActionsControl";
import PlayerStatusManager from "./PlayerStatusManager";
import Players from "./Players";
import RoleAssignment from "./RoleAssignment";
import Roles from "./Roles";
import VotingSession from "./VotingSession";
import FlexibleModal from "./FlexibleModal";

// Define the props expected by the Main component, extending standard HTML attributes for <main>
interface MainProps extends HTMLAttributes<HTMLElement> {}

const Main: React.FC<MainProps> = (props) => {
  return (
    <main className="container" {...props}>
      <ModalProvider>
        <GameProvider>
          <h1>Mafia</h1>
          <FlexibleModal modalId="Players" component={Players} />
          <FlexibleModal modalId="Roles" component={Roles} />
          <FlexibleModal modalId="RoleAssignment" component={RoleAssignment} />

          <NewGameButton />
          <hr />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.5rem",
            }}
          >
            <ModalButton modalId="Players">Manage Players</ModalButton>
            <ModalButton modalId="Roles">Manage Roles</ModalButton>
            <ModalButton modalId="RoleAssignment">Role Assignment</ModalButton>
          </div>
          <hr />
          <PlayerStatusManager />
          <hr />
          <VotingSession />
          <hr />
          <NightActionsControl />
          <hr />
        </GameProvider>
      </ModalProvider>
    </main>
  );
};

export default Main;
