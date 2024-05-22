import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";

const AssignTagForm: React.FC = () => {
  const { gameState, assignTagToPlayer, unassignTagFromPlayer } =
    useGameContext();
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("Shot");
  const [assignedBy, setAssignedBy] = useState<string>("");
  const [expires, setExpires] = useState<string>("this-day");
  const [actionType, setActionType] = useState<string>("assign");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedPlayer) {
      if (actionType === "assign" && assignedBy) {
        assignTagToPlayer(
          selectedPlayer,
          selectedTag as "Shot" | "Silenced",
          assignedBy,
          expires as
            | "this-day"
            | "this-night"
            | "permanent"
            | "next-night"
            | "next-day"
        );
      } else if (actionType === "unassign") {
        unassignTagFromPlayer(
          selectedPlayer,
          selectedTag as "Shot" | "Silenced"
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Action:</label>
        <select
          value={actionType}
          onChange={(e) => setActionType(e.target.value)}
        >
          <option value="assign">Assign Tag</option>
          <option value="unassign">Unassign Tag</option>
        </select>
      </div>
      <div>
        <label>Player:</label>
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          <option value="">Select a player</option>
          {gameState.players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Tag:</label>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="Shot">Shot</option>
          <option value="Silenced">Silenced</option>
        </select>
      </div>
      {actionType === "assign" && (
        <>
          <div>
            <label>Assigned By:</label>
            <input
              type="text"
              value={assignedBy}
              onChange={(e) => setAssignedBy(e.target.value)}
            />
          </div>
          <div>
            <label>Expires:</label>
            <select
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
            >
              <option value="this-day">This Day</option>
              <option value="this-night">This Night</option>
              <option value="permanent">Permanent</option>
              <option value="next-night">Next Night</option>
              <option value="next-day">Next Day</option>
            </select>
          </div>
        </>
      )}
      <button type="submit">
        {actionType === "assign" ? "Assign Tag" : "Unassign Tag"}
      </button>
    </form>
  );
};

export default AssignTagForm;
