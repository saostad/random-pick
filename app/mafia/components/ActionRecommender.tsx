import { useEffect } from "react";
import { useGameContext } from "../contexts/GameContext";
import { useModal } from "../contexts/ModalContext";

export function ActionRecommender() {
  const {
    gameState: { players, gameRoles },
    loading,
  } = useGameContext();
  const { handleOpen, modals } = useModal();

  useEffect(() => {
    if (loading) return;

    if (players.some((player) => !player.roleId)) {
      if (!modals.RoleAssignment) {
        handleOpen("RoleAssignment");
      }
    }

    if (gameRoles.length === 0) {
      if (!modals.Roles) {
        handleOpen("Roles");
      }
    }

    if (players.length === 0) {
      if (!modals.Players) {
        handleOpen("Players");
      }
    }
  }, [loading]);

  return null;
}
