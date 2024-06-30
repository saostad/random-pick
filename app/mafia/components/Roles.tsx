import React, { useState } from "react";
import { useGameContext, GameRole, RoleSide } from "../contexts/GameContext";
import PredefinedRoles from "./PredefinedRoles";
import RoleSuggestion from "./RoleSuggestion";
import CarbonAdd from "~icons/carbon/add";
import DraggableItems from "./DraggableItems";

const Roles: React.FC = () => {
  const { gameState, updateGameState } = useGameContext();
  const [newRoleName, setNewRoleName] = useState("");
  const [hasAction, setHasAction] = useState(false);
  const [nativeName, setNativeName] = useState("");
  const [side, setSide] = useState<RoleSide>("Town");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "addRole" | "predefinedRoles" | "suggestRoles"
  >("suggestRoles");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    setError(null);
    const newRole: GameRole = {
      id: new Date().toISOString(),
      name: newRoleName,
      hasAction: hasAction,
      persianName: nativeName,
      actionOrder: gameState.gameRoles.length + 1,
      side: side,
      image: image,
      description: description,
    };
    updateGameState({ gameRoles: [...gameState.gameRoles, newRole] });
    setNewRoleName("");
    setNativeName("");
    setHasAction(false);
    setSide("Town");
    setImage("");
    setDescription("");
  };

  const handleRemoveRole = (roleId: string) => {
    updateGameState({
      gameRoles: gameState.gameRoles.filter((role) => role.id !== roleId),
      players: gameState.players.map((player) => {
        if (player.roleId === roleId) {
          return { ...player, roleId: undefined };
        }
        return player;
      }),
    });
  };

  const handleUpdateRoleName = (roleId: string, newName: string) => {
    const updatedRoles = gameState.gameRoles.map((role) =>
      role.id === roleId ? { ...role, name: newName } : role
    );
    updateGameState({ gameRoles: updatedRoles });
  };

  const handleUpdateRoleAction = (roleId: string, hasAction: boolean) => {
    const updatedRoles = gameState.gameRoles.map((role) =>
      role.id === roleId ? { ...role, hasAction } : role
    );
    updateGameState({ gameRoles: updatedRoles });
  };

  const handleUpdateRoleSide = (roleId: string, newSide: RoleSide) => {
    const updatedRoles = gameState.gameRoles.map((role) =>
      role.id === roleId ? { ...role, side: newSide } : role
    );
    updateGameState({ gameRoles: updatedRoles });
  };

  const moveRole = (dragIndex: number, hoverIndex: number) => {
    const draggedRole = gameState.gameRoles[dragIndex];
    const updatedRoles = [...gameState.gameRoles];
    updatedRoles.splice(dragIndex, 1);
    updatedRoles.splice(hoverIndex, 0, draggedRole);

    // Update the actionOrder for each role based on its new position
    updatedRoles.forEach((role, index) => {
      role.actionOrder = index + 1;
    });

    updateGameState({ gameRoles: updatedRoles });
  };

  const renderRole = (role: GameRole, index: number) => (
    <div className="grid grid-cols-10 gap-2 content-center">
      <div className="col-span-3 flex items-center">
        <input
          type="text"
          className="input input-sm input-primary w-full"
          value={role.name}
          onChange={(e) => handleUpdateRoleName(role.id, e.target.value)}
          placeholder="Role name"
        />
      </div>
      <div className="col-span-3 flex items-center">
        <select
          className="select select-sm select-primary w-full"
          value={role.side}
          onChange={(e) =>
            handleUpdateRoleSide(role.id, e.target.value as RoleSide)
          }
        >
          <option value="Town">Town</option>
          <option value="Mafia">Mafia</option>
          <option value="ThirdParty">Third Party</option>
        </select>
      </div>
      <div className="col-span-3 flex items-center">
        <div className="form-control">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              className="checkbox checkbox-sx"
              checked={role.hasAction}
              onChange={(e) =>
                handleUpdateRoleAction(role.id, e.target.checked)
              }
            />
            <span className="label-text text-xs ml-2">Night action?</span>
          </label>
        </div>
      </div>
      <div className="col-span-1 flex items-center">
        <button
          onClick={() => handleRemoveRole(role.id)}
          className="btn btn-circle btn-outline btn-error btn-sm"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );

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
          <select
            className="select select-bordered select-primary w-full max-w-xs mb-2"
            value={side}
            onChange={(e) =>
              setSide(e.target.value as "Town" | "Mafia" | "ThirdParty")
            }
          >
            <option value="Town">Town</option>
            <option value="Mafia">Mafia</option>
            <option value="ThirdParty">Third Party</option>
          </select>
          <input
            type="text"
            className="input input-bordered input-primary w-full max-w-xs mb-2"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
          />
          <textarea
            className="textarea textarea-bordered textarea-primary w-full max-w-xs mb-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Role description"
          />
          <div className="m-2">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Night action?</span>
                <input
                  type="checkbox"
                  checked={hasAction}
                  onChange={(e) => setHasAction(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </label>
            </div>
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

      <DraggableItems
        items={gameState.gameRoles.slice().sort((a, b) => {
          if (a.actionOrder === b.actionOrder)
            return a.name.localeCompare(b.name);
          if (a.actionOrder === undefined || b.actionOrder === undefined)
            return 1;
          return a.actionOrder - b.actionOrder;
        })}
        moveItem={moveRole}
        renderItem={renderRole as any}
      />
    </div>
  );
};

export default Roles;
