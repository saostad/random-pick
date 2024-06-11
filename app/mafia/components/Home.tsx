import ModalButton from "./ModalButton";
import NewGameButton from "./NewGameButton";
import Wizard from "./Wizard";

import CarbonUserRole from "~icons/carbon/user-role";
import CarbonEventSchedule from "~icons/carbon/event-schedule";

const Home = () => {
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
        <ModalButton modalId="RoleViewer">
          Player&apos;s Cards
          <CarbonUserRole className="hidden sm:block" />
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
