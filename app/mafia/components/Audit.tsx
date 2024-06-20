import { useEffect, useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { getAuditProblems } from "../utils/get-from-fns";
import ModalButton from "./ModalButton";

import CarbonUserIdentification from "~icons/carbon/user-identification";
import CarbonGroup from "~icons/carbon/group.jsx";
import CarbonUserRole from "~icons/carbon/user-role";
import { useModal } from "../contexts/ModalContext";

export default function Audit() {
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
              Assign Role
              <CarbonUserIdentification />
            </ModalButton>
          )}
          {error.code === 20 && (
            <div className="flex flex-col gap4">
              <ModalButton modalId="Players">
                + Players - <CarbonGroup />
              </ModalButton>
              <div className="my-1"></div>
              <ModalButton modalId="Roles">
                + Roles -
                <CarbonUserRole />
              </ModalButton>
            </div>
          )}
          {error.code === 30 && (
            <ModalButton modalId="Players">
              + Players - <CarbonGroup />
            </ModalButton>
          )}
          {error.code === 40 && (
            <ModalButton modalId="Roles">
              + Roles -
              <CarbonUserRole />
            </ModalButton>
          )}
        </div>
      ))}
      {unassignedRoles.length > 0 && (
        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="checkbox" />
          <div className="collapse-title">
            Unassigned Roles ({unassignedRoles.length})
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
            Players without Role ({unassignedPlayers.length})
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
          <button
            className="btn btn-success"
            onClick={() => {
              handleClose("audit");
            }}
          >
            Game is ready!
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
          </button>
        </div>
      )}
    </>
  );
}
