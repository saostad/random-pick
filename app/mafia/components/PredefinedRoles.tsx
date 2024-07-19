import React, { useState } from "react";
import { GameRole, useGameContext } from "../contexts/GameContext";
import predefinedRoles from "../data/predefinedRoles";
import { useTranslations } from "next-intl";

const PredefinedRoles: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleAddPredefinedRoles = () => {
    const rolesToAdd = predefinedRoles.filter((role) =>
      selectedRoles.includes(role.id)
    );
    const newRoles: GameRole[] = rolesToAdd.map((role) => ({
      ...role,
      id: new Date().toISOString() + Math.random(),
      preDefinedRoleId: role.id,
      image: role.image,
      description: role.description,
    }));
    updateGameState({ gameRoles: [...gameState.gameRoles, ...newRoles] });
    setSelectedRoles([]);
  };

  const t = useTranslations("Mafia");

  return (
    <div className="mb-4">
      <h3>{t("predefinedRoles")}</h3>
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
              {role.name} ({role.roleLevel}, {role.side}): {role.description}
            </span>
          </label>
        ))}
      </div>
      <button
        className="btn btn-secondary mt-2"
        onClick={handleAddPredefinedRoles}
      >
        {t("addSelectedRoles")}
      </button>
    </div>
  );
};

export default PredefinedRoles;
