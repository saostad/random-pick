import React, { HTMLAttributes } from "react";
import ModalButton from "./ModalButton";
import NewGameButton from "./NewGameButton";
import PlayerStatusManager from "./PlayerStatusManager";
import Players from "./Players";
import RoleAssignment from "./RoleAssignment";
import Roles from "./Roles";
import FlexibleModal from "./FlexibleModal";
import CarbonUserRole from "~icons/carbon/user-role";
import PlayerRoleCarousel from "./PlayerRoleCarousel";
import EventTimeline from "./EventTimeline";
import CarbonEventSchedule from "~icons/carbon/event-schedule";
import CarbonGroup from "~icons/carbon/group.jsx";
import CarbonUserIdentification from "~icons/carbon/user-identification";
import Wizard from "./Wizard";
import TagPlayers from "./TagPlayers";
import CarbonTag from "~icons/carbon/tag";
import MdiDead from "~icons/mdi/dead";
import DropdownButton from "./DropdownButton";
import LucideUserCog from "~icons/lucide/user-cog";
import Audit from "./Audit";
import CarbonCloudAuditing from "~icons/carbon/cloud-auditing";
import Tags from "./Tags";
import CilTags from "~icons/cil/tags";
import ActionRecommender from "./ActionRecommender";
import LastActions from "./LastActions";

// Define the props expected by the Main component, extending standard HTML attributes for <main>
interface MainProps extends HTMLAttributes<HTMLElement> {}

const Main: React.FC<MainProps> = (props) => {
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
          <DropdownButton
            title={
              <>
                Manage Players <LucideUserCog />
              </>
            }
          >
            <ModalButton modalId="Players">
              + Players - <CarbonGroup />
            </ModalButton>
            <ModalButton modalId="Tags">
              + Tags - <CilTags />
            </ModalButton>
            <ModalButton modalId="LastActs">+ Last Acts -</ModalButton>
            <ModalButton modalId="TagPlayers">
              Tag Players
              <CarbonTag />
            </ModalButton>
            <ModalButton modalId="playersStatus">
              Dead/Alive
              <MdiDead />
            </ModalButton>
          </DropdownButton>
          <DropdownButton
            title={
              <>
                Manage Roles <CarbonUserRole />
              </>
            }
          >
            <ModalButton modalId="Roles">
              + Roles -
              <CarbonUserRole />
            </ModalButton>
            <ModalButton modalId="RoleAssignment">
              Assign Role
              <CarbonUserIdentification />
            </ModalButton>
            <ModalButton modalId="audit">
              Audit
              <CarbonCloudAuditing />
            </ModalButton>
          </DropdownButton>
        </div>
        <div className="my-6">
          <Wizard />
        </div>
        <ActionRecommender />
        <div className="my-4" />
      </div>
    </div>
  );
};

export default Main;
