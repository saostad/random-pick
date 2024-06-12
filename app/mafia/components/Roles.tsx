import React, { useState } from "react";
import { useGameContext, GameRole } from "../contexts/GameContext";
import PredefinedRoles from "./PredefinedRoles";
import RoleSuggestion from "./RoleSuggestion";
import CarbonAdd from "~icons/carbon/add";

const Roles: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [newRoleName, setNewRoleName] = useState("");
  const [hasAction, setHasAction] = useState(false);
  const [nativeName, setNativeName] = useState("");
  const [actionOrder, setActionOrder] = useState<number | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "addRole" | "predefinedRoles" | "suggestRoles"
  >("suggestRoles");

  // Function to add a new role
  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    if (
      hasAction &&
      gameState.gameRoles.some((role) => role.actionOrder === actionOrder)
    ) {
      setError("Duplicate action order");
      return;
    }
    setError(null);
    const newRole: GameRole = {
      id: new Date().toISOString(), // Generating a unique ID based on the current time
      name: newRoleName,
      hasAction: hasAction,
      persianName: nativeName,
      actionOrder: hasAction ? actionOrder : undefined, // Assign actionOrder only if hasAction is true
    };
    updateGameState({ gameRoles: [...gameState.gameRoles, newRole] });
    setNewRoleName(""); // Reset input after adding
    setNativeName(""); // Reset input after adding
    setHasAction(false); // Reset hasAction
    setActionOrder(undefined); // Reset actionOrder
  };

  // Function to remove a role by ID
  const handleRemoveRole = (roleId: string) => {
    updateGameState({
      gameRoles: gameState.gameRoles.filter((role) => role.id !== roleId),
      players: gameState.players.map((player) => {
        // Unassign the role from any players who might have it
        if (player.roleId === roleId) {
          return { ...player, roleId: undefined };
        }
        return player;
      }),
    });
  };

  // Function to update a role's name
  const handleUpdateRoleName = (roleId: string, newName: string) => {
    const updatedRoles = gameState.gameRoles.map((role) =>
      role.id === roleId ? { ...role, name: newName } : role
    );
    updateGameState({ gameRoles: updatedRoles });
  };

  // Function to update a role's action status
  const handleUpdateRoleAction = (roleId: string, hasAction: boolean) => {
    const updatedRoles = gameState.gameRoles.map((role) =>
      role.id === roleId
        ? {
            ...role,
            hasAction,
            actionOrder: hasAction ? role.actionOrder : undefined,
          }
        : role
    );
    updateGameState({ gameRoles: updatedRoles });
  };

  // Function to update a role's action order
  const handleUpdateActionOrder = (
    roleId: string,
    newOrder: number | undefined
  ) => {
    if (
      newOrder !== undefined &&
      gameState.gameRoles.some(
        (role) => role.id !== roleId && role.actionOrder === newOrder
      )
    ) {
      setError("Duplicate action order");
      return;
    }
    setError(null);
    const updatedRoles = gameState.gameRoles.map((role) =>
      role.id === roleId ? { ...role, actionOrder: newOrder } : role
    );
    updateGameState({ gameRoles: updatedRoles });
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="join mb-4">
          <input
            className={`join-item btn ${
              activeTab === "addRole" ? "btn-active btn-primary" : ""
            }`}
            type="radio"
            name="options"
            aria-label="Add a Role"
            checked={activeTab === "addRole"}
            onChange={() => setActiveTab("addRole")}
          />
          <input
            className={`join-item btn ${
              activeTab === "suggestRoles" ? "btn-active btn-primary" : ""
            }`}
            type="radio"
            name="options"
            aria-label="Suggest"
            checked={activeTab === "suggestRoles"}
            onChange={() => setActiveTab("suggestRoles")}
          />
          <input
            className={`join-item btn ${
              activeTab === "predefinedRoles" ? "btn-active btn-primary" : ""
            }`}
            type="radio"
            name="options"
            aria-label="Predefined"
            checked={activeTab === "predefinedRoles"}
            onChange={() => setActiveTab("predefinedRoles")}
          />
        </div>
      </div>

      {activeTab === "addRole" && (
        <div>
          <input
            type="text"
            className="input input-bordered input-primary w-full max-w-xs mb-2"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
            placeholder="Role name"
          />
          <input
            type="text"
            className="input input-bordered input-primary w-full max-w-xs mb-2"
            value={nativeName}
            onChange={(e) => setNativeName(e.target.value)}
            placeholder="Role alt name"
          />
          <div className="grid grid-cols-2 gap-2 m-2">
            <div className="form-control w-32">
              <label className="cursor-pointer label">
                <span className="label-text">Action?</span>
                <input
                  type="checkbox"
                  checked={hasAction}
                  onChange={(e) => setHasAction(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </label>
            </div>
            {hasAction && (
              <input
                type="number"
                className="input input-bordered input-primary w-full max-w-xs"
                value={actionOrder ?? ""}
                onChange={(e) => setActionOrder(Number(e.target.value))}
                placeholder="Action order"
              />
            )}
          </div>
          <button className="btn btn-primary" onClick={handleAddRole}>
            Add <CarbonAdd />
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      )}

      {activeTab === "predefinedRoles" && <PredefinedRoles />}
      {activeTab === "suggestRoles" && <RoleSuggestion />}

      <div className="divider"></div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr auto",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        {gameState.gameRoles
          .slice() // Create a copy of the roles array to avoid mutating the original state
          .sort(
            (a, b) => (a.actionOrder ?? Infinity) - (b.actionOrder ?? Infinity)
          ) // Sort roles by action order
          .map((role) => (
            <React.Fragment key={role.id}>
              <input
                type="text"
                className="input input-sm input-primary w-full max-w-xs"
                value={role.name}
                onChange={(e) => handleUpdateRoleName(role.id, e.target.value)}
                placeholder="Role name"
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <small>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sx"
                      checked={role.hasAction}
                      onChange={(e) =>
                        handleUpdateRoleAction(role.id, e.target.checked)
                      }
                    />
                    Action?
                  </label>
                </small>
                {role.hasAction && (
                  <input
                    type="number"
                    className="input input-sm input-bordered input-primary w-full max-w-xs"
                    value={role.actionOrder ?? ""}
                    onChange={(e) =>
                      handleUpdateActionOrder(role.id, Number(e.target.value))
                    }
                    placeholder="Enter action order"
                    style={{ marginLeft: "0.5rem" }}
                  />
                )}
              </div>
              <button
                onClick={() => handleRemoveRole(role.id)}
                className="btn btn-circle btn-outline btn-error btn-sm"
              >
                &#x2715;
              </button>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Roles;
