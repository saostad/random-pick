import DropdownButton from "./DropdownButton";
import ModalButton from "./ModalButton";

import CarbonGroup from "~icons/carbon/group.jsx";
import CarbonUserIdentification from "~icons/carbon/user-identification";
import CarbonTag from "~icons/carbon/tag";
import MdiDead from "~icons/mdi/dead";
import LucideUserCog from "~icons/lucide/user-cog";
import CarbonCloudAuditing from "~icons/carbon/cloud-auditing";
import CilTags from "~icons/cil/tags";
import CarbonUserRole from "~icons/carbon/user-role";

const Settings = () => {
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
      <div className="divider divider-info">Other</div>
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
        <ModalButton modalId="LastActs">+ Last Acts -</ModalButton>

        <ModalButton modalId="audit">
          Audit
          <CarbonCloudAuditing />
        </ModalButton>
      </div>
    </>
  );
};

export default Settings;
