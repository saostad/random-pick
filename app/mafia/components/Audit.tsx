import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { getAuditProblems } from "../utils/get-from-fns";
import ModalButton from "./ModalButton";

import CarbonUserIdentification from "~icons/carbon/user-identification";
import CarbonGroup from "~icons/carbon/group.jsx";
import CarbonUserRole from "~icons/carbon/user-role";
import { useModal } from "../contexts/ModalContext";
import { useTranslations } from "next-intl";
import GlowingButton from "./GlowingButton";

export default function Audit() {
  const t = useTranslations("Mafia");
  const { gameState } = useGameContext();
  const { handleClose } = useModal();
  const [unassignedRoles, setUnassignedRoles] = useState<any[]>([]);
  const [unassignedPlayers, setUnassignedPlayers] = useState<any[]>([]);

  useEffect(() => {
    const { isAuditFailed, problems } = getAuditProblems(gameState);

    if (isAuditFailed) {
      setUnassignedRoles(problems.rolesWithoutPlayers);
      setUnassignedPlayers(problems.playersWithoutRoles);
    } else {
      setUnassignedRoles([]);
      setUnassignedPlayers([]);
    }
  }, [gameState]);

  return (
    <>
      {getAuditProblems(gameState).errors.map((error) => (
        <div
          className="text-error p-4 flex items-center justify-between"
          key={error.code}
        >
          <span># {error.message} </span>
          {error.code === 10 && (
            <ModalButton modalId="RoleAssignment">
              {t("Settings.assignRoles")}
              <CarbonUserIdentification />
            </ModalButton>
          )}
          {error.code === 20 && (
            <div className="flex flex-col gap4">
              <ModalButton modalId="Players">
                + {t("Settings.players")} - <CarbonGroup />
              </ModalButton>
              <div className="my-1"></div>
              <ModalButton modalId="Roles">
                + {t("Settings.roles")} -
                <CarbonUserRole />
              </ModalButton>
            </div>
          )}
          {error.code === 30 && (
            <ModalButton modalId="Players">
              + {t("Settings.players")} - <CarbonGroup />
            </ModalButton>
          )}
          {error.code === 40 && (
            <ModalButton modalId="Roles">
              + {t("Settings.roles")} -
              <CarbonUserRole />
            </ModalButton>
          )}
        </div>
      ))}
      {unassignedRoles.length > 0 && (
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="checkbox" />
          <div className="collapse-title">
            {t("Audit.unassignedRoles")} ({unassignedRoles.length})
          </div>
          <div className="collapse-content">
            <ul>
              {unassignedRoles.map((role) => (
                <li key={role.id}>{role.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {unassignedPlayers.length > 0 && (
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="checkbox" />
          <div className="collapse-title">
            {t("Audit.playersWithoutRole")} ({unassignedPlayers.length})
          </div>
          <div className="collapse-content">
            <ul>
              {unassignedPlayers.map((player) => (
                <li key={player.id}>{player.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {!getAuditProblems(gameState).isAuditFailed && (
        <div className="flex justify-center">
          <GlowingButton
            className="btn-wide"
            onClick={() => {
              handleClose("audit");
            }}
          >
            <div className="flex items-center">
              {t("Audit.gameIsReady")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </GlowingButton>
        </div>
      )}
    </>
  );
}
