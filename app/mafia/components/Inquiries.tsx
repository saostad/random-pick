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
              <div className="font-bold mb-4">
                Out of game roles: ({deadPlayers.length})
              </div>
              <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
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
                    <li className="flex items-center">
                      <svg
                        className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      {
                        getRoleByPlayerId({
                          player,
                          gameRoles: gameState.gameRoles,
                        })?.name
                      }
                    </li>
                  </div>
                ))}
              </ul>
            </>
          )}
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title font-bold">
              Roles still in game: ({players.length - deadPlayers.length})
            </div>
            <div className="collapse-content">
              {players.map((player) => {
                if (deadPlayers.some((dead) => dead.id === player.id)) return;
                return (
                  <div
                    key={player.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <li className="flex items-center">
                      <svg
                        className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                      </svg>
                      {
                        getRoleByPlayerId({
                          player,
                          gameRoles: gameState.gameRoles,
                        })?.name
                      }
                    </li>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Inquiries;
