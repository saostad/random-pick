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
  const [winner, setWinner] = useState<"Town" | "Mafia" | "ThirdParty" | null>(
    null
  );
  const [isLylo, setIsLylo] = useState(false);
  const { handleOpen, handleClose } = useModal();

  useEffect(() => {
    if (loading || currentStepIndex < 2) return;

    const alivePlayers = getAlivePlayers({ players });
    const mafiaCount = alivePlayers.filter((player) => {
      const role = gameRoles.find((role) => role.id === player.roleId);
      return role?.side === "Mafia";
    }).length;
    const townCount = alivePlayers.filter((player) => {
      const role = gameRoles.find((role) => role.id === player.roleId);
      return role?.side === "Town";
    }).length;
    const thirdPartyCount = alivePlayers.filter((player) => {
      const role = gameRoles.find((role) => role.id === player.roleId);
      return role?.side === "ThirdParty";
    }).length;

    // Check for game end conditions
    if (mafiaCount === 0 && thirdPartyCount === 0) {
      setGameEnded(true);
      setWinner("Town");
      handleOpen("end-game");
    } else if (mafiaCount >= townCount && thirdPartyCount === 0) {
      setGameEnded(true);
      setWinner("Mafia");
      handleOpen("end-game");
    } else if (alivePlayers.length === 3 && thirdPartyCount === 1) {
      setGameEnded(true);
      setWinner("ThirdParty");
      handleOpen("end-game");
    } else if (mafiaCount === 1 && townCount === 2 && thirdPartyCount === 0) {
      setIsLylo(true);
      handleOpen("lylo-warning");
    } else {
      setIsLylo(false);
    }
  }, [players, gameRoles, loading, currentStepIndex]);

  if (loading && (!gameEnded || currentStepIndex < 2)) {
    return null;
  }

  return (
    <>
      <FlexibleModal modalId="end-game" title="Game Over">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">
            {winner === "Town"
              ? "Town Wins!"
              : winner === "Mafia"
              ? "Mafia Wins!"
              : "Third Party Wins!"}
          </h2>
          <Animation
            className="max-w-56 max-h-56"
            src={
              winner === "Town"
                ? "/mafia/animation/town-wins.lottie"
                : winner === "Mafia"
                ? "/mafia/animation/mafia-wins.lottie"
                : "/mafia/animation/third-party-wins.lottie"
            }
            loop={true}
            autoplay={true}
          />
          <p className="mt-4 text-lg">
            {winner === "Town"
              ? "All Mafia and Third Party members have been eliminated!"
              : winner === "Mafia"
              ? "The Mafia has taken control of the town!"
              : "The Third Party has achieved their goal!"}
          </p>
          <button
            className="btn btn-primary mt-6"
            onClick={() => handleClose("end-game")}
          >
            Close
          </button>
        </div>
      </FlexibleModal>

      <FlexibleModal modalId="lylo-warning" title="LYLO Situation">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">LYLO: Lynch or Lose!</h2>
          <p className="mt-4 text-lg text-center">
            The game has reached a critical point. There are only 3 players
            left: 2 Town and 1 Mafia. This situation is known as LYLO (Lynch or
            Lose). The Town must correctly identify the Mafia member now, or
            they will lose in the night phase!
          </p>
          <Animation
            className="max-w-56 max-h-56"
            src="/mafia/animation/lylo-warning.lottie"
            loop={true}
            autoplay={true}
          />
          <button
            className="btn btn-primary mt-6"
            onClick={() => handleClose("lylo-warning")}
          >
            Understood
          </button>
        </div>
      </FlexibleModal>
    </>
  );
};

export default EndGame;
