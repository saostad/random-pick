import { HTMLAttributes, useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";
import FlexibleModal from "./FlexibleModal";
import ModalButton from "./ModalButton";
import Animation from "./Animation";

import CarbonUserRole from "~icons/carbon/user-role";
import GameMode from "./GameMode";
import { CldImage } from "next-cloudinary";

interface ActionRecommenderProps extends HTMLAttributes<HTMLElement> {}

const ActionRecommender: React.FC<ActionRecommenderProps> = (props) => {
  const {
    gameState: { players, gameRoles, gameMode },
    loading,
  } = useGameContext();
  const { handleOpen } = useModal();

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
        <CldImage
          className="m-0 justify-self-center"
          src="mafia/all-roles"
          alt="all-roles"
          width="300"
          height="200"
        />
        {gameMode === undefined && <GameMode />}
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
            <div className="my-4 text-success">Suggested Steps:</div>
            <div className=" grid grid-flow-col gap-4">
              <ModalButton modalId="RoleViewer">
                Player&apos;s Cards
                <CarbonUserRole className="hidden sm:block" />
              </ModalButton>
            </div>
          </div>
        ) : null}
      </div>
    </FlexibleModal>
  );
};

export default ActionRecommender;
