import { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { getDeadPlayers, getRoleByPlayerId } from "../utils/get-from-fns";
import { useModal } from "../contexts/ModalContext";

const Inquiries: React.FC = () => {
  const { gameState, decreaseInquiries } = useGameContext();
  const { inquiries, players } = gameState;

  const { handleClose } = useModal();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const deadPlayers = getDeadPlayers({ players });

  return (
    <div>
      {inquiries === 0 && (
        <p className="my-4 text-info">You have no inquiries left.</p>
      )}
      {!isVisible && inquiries > 0 ? (
        <>
          <p className="my-4 text-info ">
            {inquiries} inquiry left. do you want to use one?
          </p>
          <button
            className="btn btn-primary btn-outline"
            onClick={() => {
              if (inquiries === 0) return;
              decreaseInquiries();
              setIsVisible(true);
            }}
          >
            Show status of dead players
          </button>
        </>
      ) : (
        <>
          <button
            className="btn btn-primary btn-outline"
            onClick={() => {
              setIsVisible(false);
              handleClose("Inquiries");
            }}
          >
            Got it, CLose! 🚪
          </button>
          <div className="divider"></div>
          {deadPlayers.length > 0 && (
            <>
              <div className="text-xl font-bold mb-4">
                Dead Players ({deadPlayers.length})
              </div>
              <>
                {deadPlayers.map((player) => (
                  <div
                    key={player.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    (
                    {
                      getRoleByPlayerId({
                        player,
                        gameRoles: gameState.gameRoles,
                      })?.name
                    }
                    )
                  </div>
                ))}
              </>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Inquiries;
