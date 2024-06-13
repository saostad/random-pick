import { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { getDeadPlayers, getRoleByPlayerId } from "../utils/get-from-fns";

const Inquiries: React.FC = () => {
  const { gameState, decreaseInquiries } = useGameContext();
  const { inquiries, players } = gameState;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const deadPlayers = getDeadPlayers({ players });

  return (
    <div>
      {!isVisible ? (
        <>
          <p className="my-4 text-info ">{inquiries} inquiry left.</p>
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
