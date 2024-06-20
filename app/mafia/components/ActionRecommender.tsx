import { HTMLAttributes, useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";
import ModalButton from "./ModalButton";
import Animation from "./Animation";

import CarbonUserRole from "~icons/carbon/user-role";
import GameMode from "./GameMode";

interface ActionRecommenderProps extends HTMLAttributes<HTMLElement> {}

const ActionRecommender: React.FC<ActionRecommenderProps> = (props) => {
  const {
    gameState: { players, gameRoles },
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
          <ModalButton modalId="Players">+ Players -</ModalButton>
        ) : null}
        {gameRoles.length === 0 ? (
          <ModalButton modalId="Roles">+ Roles -</ModalButton>
        ) : null}
        {players.some((player) => !player.roleId && gameRoles.length !== 0) ? (
          <ModalButton modalId="RoleAssignment">Assign Roles</ModalButton>
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
              Game is READY to begin!
            </button>
            <div className="my-4 text-warning">Suggested Steps:</div>
            <div className=" grid grid-flow-col gap-4">
              <ModalButton modalId="RoleViewer">
                Show Player&apos;s Cards
                <CarbonUserRole className="hidden sm:block" />
              </ModalButton>
            </div>
          </>
        ) : null}
      </div>
    </FlexibleModal>
  );
};

export default ActionRecommender;
