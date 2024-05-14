import React, { useState, useEffect } from "react";
import { useGameContext, GameRole } from "../contexts/GameContext";

// Component for displaying and managing the list of roles
const Roles: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [newRoleName, setNewRoleName] = useState("");
  const [hasAction, setHasAction] = useState(false);
  const [actionOrder, setActionOrder] = useState<number | undefined>();

  // Function to add a new role
  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    const newRole: GameRole = {
      id: new Date().toISOString(), // Generating a unique ID based on the current time
      name: newRoleName,
      hasAction: hasAction,
      actionOrder: hasAction ? actionOrder : undefined, // Assign actionOrder only if hasAction is true
    };
    updateGameState({ gameRoles: [...gameState.gameRoles, newRole] });
    setNewRoleName(""); // Reset input after adding
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
    const updatedRoles = gameState.gameRoles.map((role) =>
      role.id === roleId ? { ...role, actionOrder: newOrder } : role
    );
    updateGameState({ gameRoles: updatedRoles });
  };

  return (
    <div>
      <h2>Game Roles</h2>
      <div>
        <input
          type="text"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          placeholder="Enter new role name"
        />
        <div>
          <label>
            <input
              type="checkbox"
              checked={hasAction}
              onChange={(e) => setHasAction(e.target.checked)}
            />{" "}
            Has Action?
          </label>
          {hasAction && (
            <input
              type="number"
              value={actionOrder ?? ""}
              onChange={(e) => setActionOrder(Number(e.target.value))}
              placeholder="Enter action order"
            />
          )}
        </div>
        <button onClick={handleAddRole}>Add Role</button>
      </div>
      <hr />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr auto",
          gap: "0.75rem",
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
                value={role.name}
                onChange={(e) => handleUpdateRoleName(role.id, e.target.value)}
                placeholder="Enter role name"
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <small>
                  <label>
                    <input
                      type="checkbox"
                      checked={role.hasAction}
                      onChange={(e) =>
                        handleUpdateRoleAction(role.id, e.target.checked)
                      }
                    />
                    Has Action?
                  </label>
                </small>
                {role.hasAction && (
                  <input
                    type="number"
                    value={role.actionOrder ?? ""}
                    onChange={(e) =>
                      handleUpdateActionOrder(role.id, Number(e.target.value))
                    }
                    placeholder="Enter action order"
                    style={{ marginLeft: "1rem" }}
                  />
                )}
              </div>
              <button
                onClick={() => handleRemoveRole(role.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
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
