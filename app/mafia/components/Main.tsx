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
import CarbonUserRole from "~icons/carbon/user-role";
import PlayerRoleCarousel from "./PlayerRoleCarousel";
import EventTimeline from "./EventTimeline";
import CarbonEventSchedule from "~icons/carbon/event-schedule";
import CarbonGroup from "~icons/carbon/group.jsx";
import CarbonUserIdentification from "~icons/carbon/user-identification";
import Wizard from "./Wizard";

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
              title="Add/Remove Players"
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
            <FlexibleModal
              title="Role Viewer"
              modalId="RoleViewer"
              component={PlayerRoleCarousel}
            />
            <FlexibleModal
              title="Event Timeline"
              modalId="EventTimeline"
              component={EventTimeline}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "0.5rem",
              }}
            >
              <NewGameButton />
              <ModalButton modalId="RoleViewer">
                Player&apos;s Cards
                <CarbonUserRole className="hidden sm:block" />
              </ModalButton>
              <ModalButton modalId="EventTimeline">
                Events Timeline
                <CarbonEventSchedule className="hidden sm:block" />
              </ModalButton>
            </div>

            <div className="divider" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.5rem",
              }}
            >
              <ModalButton modalId="Players">
                + Players - <CarbonGroup />
              </ModalButton>
              <ModalButton modalId="Roles">
                + Roles -
                <CarbonUserRole />
              </ModalButton>
              <ModalButton modalId="RoleAssignment">
                Role Assignment
                <CarbonUserIdentification />
              </ModalButton>
              <PlayerStatusManager />
            </div>
            {/* <DayActionsControl />
            <VotingSession />
            <NightActionsControl /> */}
            <Wizard />
            <div className="divider" />
          </div>
        </GameProvider>
      </ModalProvider>
    </main>
  );
};

export default Main;
