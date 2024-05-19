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
import DayActionsControl from "./DayActionsControl";
import CarbonGroup from "~icons/carbon/group.jsx";
import CarbonUserRole from "~icons/carbon/user-role";
import CarbonUserIdentification from "~icons/carbon/user-identification";

// Define the props expected by the Main component, extending standard HTML attributes for <main>
interface MainProps extends HTMLAttributes<HTMLElement> {}

const Main: React.FC<MainProps> = (props) => {
  return (
    <main className="container" {...props}>
      <ModalProvider>
        <GameProvider>
          <div>
            <FlexibleModal
              modalId="Players"
              component={Players}
              title="Manage Players"
            />
            <FlexibleModal
              modalId="Roles"
              component={Roles}
              title="Manage Roles"
            />
            <FlexibleModal
              title="Role Assignment"
              modalId="RoleAssignment"
              component={RoleAssignment}
            />

            <NewGameButton />
            <div className="divider" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "0.5rem",
              }}
            >
              <ModalButton modalId="Players">Manage Players</ModalButton>
              <ModalButton modalId="Roles">Manage Roles</ModalButton>
              <ModalButton modalId="RoleAssignment">
                Role Assignment
              </ModalButton>
            </div>
            <PlayerStatusManager />
            <DayActionsControl />
            <VotingSession />
            <NightActionsControl />
            <div className="divider" />
          </div>
        </GameProvider>
      </ModalProvider>
    </main>
  );
};

export default Main;
