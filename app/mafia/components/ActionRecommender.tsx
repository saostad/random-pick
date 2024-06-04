import { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";

export function ActionRecommender() {
  const {
    gameState: { players, gameRoles },
  } = useGameContext();
  const { handleOpen, modals } = useModal();

  useEffect(() => {
    console.log(`File: ActionRecommender.tsx, Line: 12 =>`, modals);

    if (players.length === 0) {
      if (!modals.Players) {
        handleOpen("Players");
      }
      return;
    }

    // if (gameRoles.length === 0) {
    //   if (!modals.Roles) {
    //     handleOpen("Roles");
    //   }
    //   return;
    // }

    // if (players.some((player) => !player.roleId)) {
    //   if (!modals.RoleAssignment) {
    //     handleOpen("RoleAssignment");
    //   }
    //   return;
    // }
  }, [modals]);

  return null;
}
