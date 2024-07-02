import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { getDeadPlayers, getRoleByPlayerId } from "../utils/get-from-fns";
import { useModal } from "../contexts/ModalContext";
import { useTranslations } from "next-intl";

const Inquiries: React.FC = () => {
  const { gameState, decreaseInquiries } = useGameContext();
  const { inquiries, players, gameRoles } = gameState;

  const { handleClose, modals } = useModal();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const deadPlayers = getDeadPlayers({ players });

  // Group dead players by their role's side
  const groupedDeadPlayers = deadPlayers.reduce((acc, player) => {
    const role = getRoleByPlayerId({ player, gameRoles });
    if (role) {
      if (!acc[role.side]) {
        acc[role.side] = [];
      }
      acc[role.side].push({ player, role });
    }
    return acc;
  }, {} as Record<string, { player: (typeof players)[0]; role: (typeof gameRoles)[0] }[]>);

  // hide inquiry information when modal is closed
  useEffect(() => {
    if (modals["Inquiries"] === false) setIsVisible(false);
  }, [modals]);

  const t = useTranslations("Mafia");

  return (
    <div>
      {inquiries === 0 && (
        <p className="my-4 text-info">{t("Inquiries.noInquiriesLeft")}</p>
      )}
      {!isVisible && inquiries > 0 ? (
        <>
          <p className="my-4 text-info ">
            {inquiries} {inquiries === 1 ? "inquiry" : "inquiries"}{" "}
            {t("leftDoYouWantToUseOne")}
          </p>
          <button
            className="btn btn-primary btn-outline"
            onClick={() => {
              if (inquiries === 0) return;
              decreaseInquiries();
              setIsVisible(true);
            }}
          >
            {t("Inquiries.showStatusOfDeadPlayers")}
          </button>
        </>
      ) : (
        isVisible && (
          <>
            <button
              className="btn btn-primary btn-outline"
              onClick={() => {
                setIsVisible(false);
                handleClose("Inquiries");
              }}
            >
              {t("gotItClose")}
            </button>
            <div className="divider"></div>
            {deadPlayers.length > 0 && (
              <>
                <div className="font-bold mb-4">
                  {t("Inquiries.outOfGameRoles")} ({deadPlayers.length})
                </div>
                {Object.entries(groupedDeadPlayers).map(([side, players]) => (
                  <div key={side} className="mb-4">
                    <h3 className="font-semibold text-lg">{side}</h3>
                    <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                      {players.map(({ player, role }) => (
                        <li key={player.id} className="flex items-center">
                          <svg
                            className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                          </svg>
                          {role.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
            <div className="collapse bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title font-bold">
                {t("Inquiries.rolesStillInGame")} (
                {players.length - deadPlayers.length})
              </div>
              <div className="collapse-content">
                {players.map((player) => {
                  if (deadPlayers.some((dead) => dead.id === player.id))
                    return null;
                  const role = getRoleByPlayerId({ player, gameRoles });
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
                        {role?.name ?? "Unknown"}
                      </li>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Inquiries;
