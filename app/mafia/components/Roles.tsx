import React, { useState } from "react";
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
      <ul>
        {gameState.gameRoles.map((role) => (
          <li key={role.id}>
            <span style={{ marginRight: "0.5rem" }}>{role.name}</span>
            <span style={{ marginRight: "0.5rem" }}>
              {role.hasAction
                ? ` - Action Order: ${role.actionOrder}`
                : " - No Action"}
            </span>
            <button
              className="secondary"
              onClick={() => handleRemoveRole(role.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roles;
