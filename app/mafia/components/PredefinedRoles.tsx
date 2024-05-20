import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import predefinedRoles from "../data/predefinedRoles";

const PredefinedRoles: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showPredefinedRoles, setShowPredefinedRoles] = useState(false);

  // Function to add predefined roles
  const handleAddPredefinedRoles = () => {
    const rolesToAdd = predefinedRoles.filter((role) =>
      selectedRoles.includes(role.id)
    );
    const newRoles = rolesToAdd.map((role) => ({
      ...role,
      id: new Date().toISOString() + Math.random(), // Ensure unique ID
    }));
    updateGameState({ gameRoles: [...gameState.gameRoles, ...newRoles] });
    setSelectedRoles([]); // Reset selected roles
  };

  return (
    <div>
      <button
        className="btn btn-secondary mt-2"
        onClick={() => setShowPredefinedRoles(!showPredefinedRoles)}
      >
        {showPredefinedRoles ? "Hide" : "Show"} Predefined Roles
      </button>
      {showPredefinedRoles && (
        <div className="mb-4">
          <h3>Predefined Roles</h3>
          <div className="grid grid-cols-1 gap-2">
            {predefinedRoles.map((role) => (
              <label key={role.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedRoles.includes(role.id)}
                  onChange={(e) =>
                    setSelectedRoles((prev) =>
                      e.target.checked
                        ? [...prev, role.id]
                        : prev.filter((id) => id !== role.id)
                    )
                  }
                  className="checkbox checkbox-primary"
                />
                <span className="ml-2">
                  {role.name} ({role.roleLevel}, {role.side}):{" "}
                  {role.description}
                </span>
              </label>
            ))}
          </div>
          <button
            className="btn btn-secondary mt-2"
            onClick={handleAddPredefinedRoles}
          >
            Add Selected Roles
          </button>
        </div>
      )}
    </div>
  );
};

export default PredefinedRoles;
