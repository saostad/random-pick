import React, { HTMLAttributes } from "react";
import ModalButton from "./ModalButton";
import NewGameButton from "./NewGameButton";
import PlayerStatusManager from "./PlayerStatusManager";
import Players from "./Players";
import RoleAssignment from "./RoleAssignment";
import Roles from "./Roles";
import FlexibleModal from "./FlexibleModal";
import PlayerRoleCarousel from "./PlayerRoleCarousel";
import EventTimeline from "./EventTimeline";
import Wizard from "./Wizard";
import TagPlayers from "./TagPlayers";
import Settings from "./Settings";
import Audit from "./Audit";
import Tags from "./Tags";
import ActionRecommender from "./ActionRecommender";
import LastActions from "./LastActions";
import { useGameContext } from "../contexts/GameContext";

import CarbonUserRole from "~icons/carbon/user-role";
import CarbonEventSchedule from "~icons/carbon/event-schedule";

// Define the props expected by the Main component, extending standard HTML attributes for <main>
interface MainProps extends HTMLAttributes<HTMLElement> {}

const Main: React.FC<MainProps> = (props) => {
  const { gameState } = useGameContext();
  const { activeTab } = gameState;

  return (
    <div className="px-4" {...props}>
      <div>
        <FlexibleModal
          modalId="Players"
          component={Players}
          title="Add/Remove Players"
        />
        <FlexibleModal
          modalId="Roles"
          component={Roles}
          title="Add/Remove Roles"
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
        <FlexibleModal
          title="Tag Players"
          modalId="TagPlayers"
          component={TagPlayers}
        />
        <FlexibleModal
          modalId="playersStatus"
          component={PlayerStatusManager}
          title="Players Status"
        />
        <FlexibleModal modalId="audit" component={Audit} title="Audit" />
        <FlexibleModal title="Tags" modalId="Tags" component={Tags} />
        <FlexibleModal
          title="Last Acts"
          modalId="LastActs"
          component={LastActions}
        />

        {activeTab === "settings" && <Settings />}
        {activeTab === "home" && (
          <>
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
            <Wizard />
          </>
        )}
      </div>
      <ActionRecommender />
      <div className="my-4" />
    </div>
  );
};

export default Main;
