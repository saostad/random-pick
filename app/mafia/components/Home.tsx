import { useGameContext } from "../contexts/GameContext";
import { getAuditProblems } from "../utils/get-from-fns";
import ModalButton from "./ModalButton";
import NewGameButton from "./NewGameButton";
import Wizard from "./Wizard";

import CarbonCloudAuditing from "~icons/carbon/cloud-auditing";
import CarbonEventSchedule from "~icons/carbon/event-schedule";

const Home = () => {
  const { gameState } = useGameContext();
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0.5rem",
        }}
      >
        <NewGameButton />
        <ModalButton
          modalId="audit"
          animate={getAuditProblems(gameState).isAuditFailed}
        >
          Audit
          <CarbonCloudAuditing />
        </ModalButton>
        <ModalButton modalId="EventTimeline">
          Timeline
          <CarbonEventSchedule className="hidden sm:block" />
        </ModalButton>
      </div>

      <div className="divider" />
      <Wizard />
    </>
  );
};

export default Home;
