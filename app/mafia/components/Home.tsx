import { useGameContext } from "../contexts/GameContext";
import { getAuditProblems } from "../utils/get-from-fns";
import GameStats from "./GameStats";
import ModalButton from "./ModalButton";
import NewGameButton from "./NewGameButton";
import Wizard from "./Wizard";

import CarbonCloudAuditing from "~icons/carbon/cloud-auditing";
import CarbonEventSchedule from "~icons/carbon/event-schedule";

const Home = () => {
  const { gameState } = useGameContext();
  return (
    <>
      <div className="flex justify-between items-center">
        <NewGameButton />
        <ModalButton
          modalId="audit"
          animate={getAuditProblems(gameState).isAuditFailed}
        >
          Audit
          <CarbonCloudAuditing />
        </ModalButton>
      </div>

      <div className="divider my-1"></div>
      <GameStats />

      <div className="divider my-2"></div>

      <Wizard />
    </>
  );
};

export default Home;
