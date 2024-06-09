import { HTMLAttributes, useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";
import ModalButton from "./ModalButton";
import StreamlineStartupSolid from "~icons/streamline/startup-solid";
import Animation from "./Animation";

interface ActionRecommenderProps extends HTMLAttributes<HTMLElement> {}

const ActionRecommender: React.FC<ActionRecommenderProps> = (props) => {
  const {
    gameState: { players, gameRoles },
    loading,
  } = useGameContext();
  const { handleOpen, modals } = useModal();

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

  return (
    <FlexibleModal modalId="ActionRecommender" title="Action Recommender">
      <div className="grid gap-6">
        {players.length === 0 ? (
          <ModalButton modalId="Players">+ Players -</ModalButton>
        ) : null}
        {gameRoles.length === 0 ? (
          <ModalButton modalId="Roles">+ Roles -</ModalButton>
        ) : null}
        {players.some((player) => !player.roleId && gameRoles.length !== 0) ? (
          <ModalButton modalId="RoleAssignment">Assign Roles</ModalButton>
        ) : null}
        {players.length !== 0 &&
        gameRoles.length !== 0 &&
        !players.some((player) => !player.roleId) ? (
          <div className="text-primary text-center">
            <p>Game is READY to begin!</p>
            <Animation
              className="max-w-md mx-auto"
              src="mafia/animation/group.lottie"
              loop={true}
              autoplay={true}
            />
          </div>
        ) : null}
      </div>
    </FlexibleModal>
  );
};

export default ActionRecommender;
