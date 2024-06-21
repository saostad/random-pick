import ModalButton from "./ModalButton";

import CarbonGroup from "~icons/carbon/group.jsx";
import CarbonUserIdentification from "~icons/carbon/user-identification";
import CarbonTag from "~icons/carbon/tag";
import MdiDead from "~icons/mdi/dead";
import CarbonCloudAuditing from "~icons/carbon/cloud-auditing";
import CilTags from "~icons/cil/tags";
import CarbonUserRole from "~icons/carbon/user-role";
import { getAuditProblems } from "../utils/get-from-fns";
import { useGameContext } from "../contexts/GameContext";
import CarbonTimer from "~icons/carbon/timer";
import HugeiconsValidationApproval from "~icons/hugeicons/validation-approval";
import MdiProfessionalHexagon from "~icons/mdi/professional-hexagon";
import IcOutlineHistoryToggleOff from "~icons/ic/outline-history-toggle-off";

const Settings = () => {
  const { gameState } = useGameContext();
  return (
    <>
      <div className="divider divider-info">Players</div>
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

        <ModalButton modalId="TagPlayers">
          Tag Players
          <CarbonTag />
        </ModalButton>
        <ModalButton modalId="playersStatus">
          Dead/Alive
          <MdiDead />
        </ModalButton>
        <ModalButton modalId="RoleViewer">
          Player&apos;s Cards
          <CarbonUserRole />
        </ModalButton>
      </div>

      <div className="divider divider-info">Roles</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
        }}
      >
        <ModalButton modalId="Roles">
          + Roles -
          <CarbonUserRole />
        </ModalButton>
        <ModalButton modalId="RoleAssignment">
          Assign Role
          <CarbonUserIdentification />
        </ModalButton>
      </div>

      <div className="divider divider-info">Actions</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
        }}
      >
        <ModalButton modalId="Tags">
          + Tags - <CilTags />
        </ModalButton>
        <ModalButton modalId="LastActs">+ Last Actions -</ModalButton>
        <ModalButton modalId="InquiriesSetting">
          Inquiries <HugeiconsValidationApproval />
        </ModalButton>
        <ModalButton modalId="GameMode">
          GameMode <MdiProfessionalHexagon />
        </ModalButton>
      </div>

      <div className="divider divider-info">Timer</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
        }}
      >
        <ModalButton modalId="TimerSettings">
          Timers <CarbonTimer />
        </ModalButton>
      </div>

      <div className="divider divider-info">Audit</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
        }}
      >
        <ModalButton modalId="EventTimeline">
          Event Timeline <IcOutlineHistoryToggleOff />
        </ModalButton>
        <ModalButton
          modalId="audit"
          animate={getAuditProblems(gameState).isAuditFailed}
        >
          Audit
          <CarbonCloudAuditing />
        </ModalButton>
      </div>

      <div className="divider divider-info">About Me!</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.5rem",
        }}
      >
        <ModalButton modalId="About">About Me!</ModalButton>
      </div>
    </>
  );
};

export default Settings;
