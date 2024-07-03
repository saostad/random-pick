import React, { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { getAlivePlayers } from "../utils/get-from-fns";
import FlexibleModal from "./FlexibleModal";
import { useModal } from "../contexts/ModalContext";
import Animation from "./Animation";

const EndGame: React.FC = () => {
  const { gameState, loading } = useGameContext();
  const { players, gameRoles, currentStepIndex } = gameState;
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState<"Town" | "Mafia" | null>(null);
  const { handleOpen, handleClose } = useModal();

  useEffect(() => {
    const alivePlayers = getAlivePlayers({ players });
    const mafiaCount = alivePlayers.filter((player) => {
      const role = gameRoles.find((role) => role.id === player.roleId);
      return role?.side === "Mafia";
    }).length;
    const townCount = alivePlayers.length - mafiaCount;

    if (mafiaCount === 0) {
      setGameEnded(true);
      setWinner("Town");
      handleOpen("end-game");
    } else if (mafiaCount >= townCount) {
      setGameEnded(true);
      setWinner("Mafia");
      handleOpen("end-game");
    }
  }, [players, gameRoles]);

  if (loading && (!gameEnded || currentStepIndex < 2)) {
    return null;
  }

  return (
    <FlexibleModal modalId="end-game" title="Game Over">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">
          {winner === "Town" ? "Town Wins!" : "Mafia Wins!"}
        </h2>
        <Animation
          className="max-w-56 max-h-56"
          src={
            winner === "Town"
              ? "/mafia/animation/town-wins.lottie"
              : "/mafia/animation/mafia-wins.lottie"
          }
          loop={true}
          autoplay={true}
        />
        <p className="mt-4 text-lg">
          {winner === "Town"
            ? "All Mafia members have been eliminated!"
            : "The Mafia has taken control of the town!"}
        </p>
        <button
          className="btn btn-primary mt-6"
          onClick={() => handleClose("end-game")}
        >
          Close
        </button>
      </div>
    </FlexibleModal>
  );
};

export default EndGame;
