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
import { useTranslations } from "next-intl";

// Define the props expected by the Main component, extending standard HTML attributes for <main>
interface MainProps extends HTMLAttributes<HTMLElement> {}

const Main: React.FC<MainProps> = (props) => {
  const { loading, gameState } = useGameContext();
  const t = useTranslations("Mafia");
  const { handleOpen, modals } = useModal();
  const { activeTab, hasLandingShown } = gameState;

  useEffect(() => {
    if (loading) return;
    if (!hasLandingShown) {
      setTimeout(() => {
        if (!modals["Landing"]) {
          handleOpen("Landing");
        }
      }, 1000); // Open the Landing modal after 1 second to make sure it's on top of other modals
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
        title={t("Home.inquiries")}
      />
      <FlexibleModal
        modalId="GameMode"
        component={GameMode}
        title={t("gameMode")}
      />
      <FlexibleModal
        modalId="LastActionPlayer"
        component={LastActionPlayer}
        title={t("lastActionForPlayer")}
      />
      <FlexibleModal
        modalId="Inquiries"
        component={Inquiries}
        title={t("GameStats.inquiry")}
      />
      <FlexibleModal
        modalId="TimerSettings"
        component={TimerSettings}
        title={t("timerSettings")}
      />
      <FlexibleModal
        modalId="Players"
        component={Players}
        title={t("addRemovePlayers")}
      />
      <FlexibleModal
        modalId="Roles"
        component={Roles}
        title={t("addRemoveRoles")}
      />
      <FlexibleModal
        title={t("roleAssignment")}
        modalId="RoleAssignment"
        component={RoleAssignment}
      />
      <FlexibleModal
        title={t("roleViewer")}
        modalId="RoleViewer"
        component={PlayerRoleCarousel}
      />
      <FlexibleModal
        title={t("eventTimeline")}
        modalId="EventTimeline"
        component={EventTimeline}
      />
      <FlexibleModal
        title={t("tagPlayers")}
        modalId="TagPlayers"
        component={TagPlayers}
      />
      <FlexibleModal
        title={t("playersStatus")}
        modalId="playersStatus"
        component={PlayerStatusManager}
      />
      <FlexibleModal
        title={t("Settings.audit")}
        modalId="audit"
        component={Audit}
      />
      <FlexibleModal title={t("Home.tags")} modalId="Tags" component={Tags} />
      <FlexibleModal title={t("about")} modalId="About" component={About} />
      <FlexibleModal
        title={t("Home.lastActions")}
        modalId="LastActs"
        component={LastActions}
      />
      <FlexibleModal
        title={t("welcomeToMafia")}
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
