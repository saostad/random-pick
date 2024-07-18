import React, { HTMLAttributes, useEffect } from "react";
import PlayerStatusManager from "./PlayerStatusManager";
import Players from "./Players";
import RoleAssignment from "./RoleAssignment";
import Roles from "./Roles";
import FlexibleModal from "./FlexibleModal";
import PlayerRoleCarousel from "./PlayerRoleCarousel";
import EventTimeline from "./EventTimeline";
import TagPlayers from "./TagPlayers";
import Settings from "./Settings";
import Audit from "./Audit";
import Tags from "./Tags";
import ActionRecommender from "./ActionRecommender";
import LastActions from "./LastActions";
import { useGameContext } from "../contexts/GameContext";
import Home from "./Home";
import About from "./About";
import TimerSettings from "./TimerSettings";
import InquiriesSetting from "./InquiriesSetting";
import Inquiries from "./Inquiries";
import LastActionPlayer from "./LastActionPlayer";
import GameMode from "./GameMode";
import EndGame from "./EndGame";
import Landing from "./Landing";
import { useModal } from "../contexts/ModalContext";

// Define the props expected by the Main component, extending standard HTML attributes for <main>
interface MainProps extends HTMLAttributes<HTMLElement> {}

const Main: React.FC<MainProps> = (props) => {
  const { loading, gameState } = useGameContext();
  const { handleOpen } = useModal();
  const { activeTab, hasLandingShown } = gameState;

  useEffect(() => {
    if (loading) return;
    if (!hasLandingShown) {
      setTimeout(() => handleOpen("Landing"), 1000); // Open the Landing modal after 1 second to make sure it's on top of other modals
    }
  }, [handleOpen, loading]);

  return (
    <div className="px-4" {...props}>
      {activeTab === "settings" && <Settings />}
      {activeTab === "timeline" && <EventTimeline />}
      {activeTab === "home" && <Home />}

      <FlexibleModal
        modalId="InquiriesSetting"
        component={InquiriesSetting}
        title="Inquiries"
      />
      <FlexibleModal
        modalId="GameMode"
        component={GameMode}
        title="Game Mode"
      />
      <FlexibleModal
        modalId="LastActionPlayer"
        component={LastActionPlayer}
        title="Last Action for Player"
      />
      <FlexibleModal
        modalId="Inquiries"
        component={Inquiries}
        title="Inquiry"
      />
      <FlexibleModal
        modalId="TimerSettings"
        component={TimerSettings}
        title="Timer Settings"
      />
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
        title="Players Status"
        modalId="playersStatus"
        component={PlayerStatusManager}
      />
      <FlexibleModal title="Audit" modalId="audit" component={Audit} />
      <FlexibleModal title="Tags" modalId="Tags" component={Tags} />
      <FlexibleModal title="About" modalId="About" component={About} />
      <FlexibleModal
        title="Last Actions"
        modalId="LastActs"
        component={LastActions}
      />
      <FlexibleModal
        title="Welcome to Mafia"
        modalId="Landing"
        component={Landing}
        closeButtons={false}
      />

      <ActionRecommender />
      <EndGame />
      <div className="my-24" />
    </div>
  );
};

export default Main;
