import { HTMLAttributes, useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";
import ModalButton from "./ModalButton";
import Animation from "./Animation";
import GameMode from "./GameMode";

import CarbonUserRole from "~icons/carbon/user-role";
import CilTags from "~icons/cil/tags";
import CarbonTimer from "~icons/carbon/timer";
import HugeiconsValidationApproval from "~icons/hugeicons/validation-approval";
import { useTranslations } from "next-intl";

interface ActionRecommenderProps extends HTMLAttributes<HTMLElement> {}

const ActionRecommender: React.FC<ActionRecommenderProps> = (props) => {
  const t = useTranslations("Mafia");

  const {
    gameState: { players, gameRoles, gameMode },
    loading,
  } = useGameContext();
  const { handleOpen, handleClose } = useModal();

  useEffect(() => {
    if (loading) return;

    /** if players array is empty,
     * OR if gameRoles array is empty,
     * OR if any player does not have a role assigned.
     * THEN open the ActionRecommender modal.
     */
    if (
      players.length === 0 ||
      gameRoles.length === 0 ||
      players.some((player) => !player.roleId)
    ) {
      handleOpen("ActionRecommender");
    }
  }, [loading]);

  function isGameReady() {
    return (
      players.length !== 0 &&
      gameRoles.length !== 0 &&
      !players.some((player) => !player.roleId)
    );
  }

  return (
    <FlexibleModal modalId="ActionRecommender" title="Setup your Game">
      <div className="grid gap-6">
        {!isGameReady() && <GameMode />}
        {players.length === 0 ? (
          <ModalButton modalId="Players">
            + {t("Settings.players")} -
          </ModalButton>
        ) : null}
        {gameRoles.length === 0 ? (
          <ModalButton modalId="Roles">+ {t("Settings.roles")} -</ModalButton>
        ) : null}
        {players.some((player) => !player.roleId && gameRoles.length !== 0) ? (
          <ModalButton modalId="RoleAssignment">
            {t("Settings.assignRoles")}
          </ModalButton>
        ) : null}
        {isGameReady() ? (
          <>
            <Animation
              className="max-w-md mx-auto"
              src="mafia/animation/group.lottie"
              loop={true}
              autoplay={true}
            />
            <button
              className="btn btn-success"
              onClick={() => {
                handleClose("ActionRecommender");
              }}
            >
              {t("Home.gameReady")}
            </button>
            <div className="mt-4 text-warning">{t("Home.suggestedSteps")}</div>
            {gameMode === "beginner" && (
              <div className="flex flex-col gap-4">
                <ModalButton modalId="RoleViewer">
                  {t("Home.showPlayerCards")}
                  <CarbonUserRole />
                </ModalButton>
              </div>
            )}
            {gameMode === "pro" && (
              <div className="flex flex-col gap-4">
                <ModalButton modalId="RoleViewer">
                  {t("Home.showPlayerCards")}
                  <CarbonUserRole />
                </ModalButton>
                <ModalButton modalId="TimerSettings">
                  {t("GameStats.timers")} <CarbonTimer />
                </ModalButton>
                <ModalButton modalId="Tags">
                  + {t("Home.tags")} - <CilTags />
                </ModalButton>
                <ModalButton modalId="LastActs">
                  + {t("Home.lastActions")} -
                </ModalButton>
                <ModalButton modalId="InquiriesSetting">
                  {t("Home.inquiries")} <HugeiconsValidationApproval />
                </ModalButton>
              </div>
            )}
          </>
        ) : null}
      </div>
    </FlexibleModal>
  );
};

export default ActionRecommender;
