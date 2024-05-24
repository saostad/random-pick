import React, { useState } from "react";
import {
  TagExpiration,
  Tags,
  tagExpirations,
  tags,
  useGameContext,
} from "../contexts/GameContext";
import * as changeCase from "change-case";
import { useModal } from "../contexts/ModalContext";

const TagPlayers: React.FC = () => {
  const { gameState, assignTagToPlayer, unassignTagFromPlayer } =
    useGameContext();
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<Tags>("Shot");
  const [assignedBy, setAssignedBy] = useState<string>("");
  const [expires, setExpires] = useState<TagExpiration>("this-night");
  const [actionType, setActionType] = useState<string>("");
  const { handleClose } = useModal();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedPlayer) {
      if (actionType === "assign" && assignedBy) {
        assignTagToPlayer(selectedPlayer, selectedTag, assignedBy, expires);
        handleClose("TagPlayerInNight");
      } else if (actionType === "unassign") {
        unassignTagFromPlayer(selectedPlayer, selectedTag);
        handleClose("TagPlayerInNight");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Select an Action</span>
        </div>
        <select
          className="select select-bordered"
          value={actionType}
          onChange={(e) => setActionType(e.target.value)}
        >
          <option value="" disabled>
            Pick one
          </option>
          <option value="assign">Assign Tag</option>
          <option value="unassign">Unassign Tag</option>
        </select>
      </label>
      {actionType && (
        <>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Select a Player</span>
            </div>
            <select
              className="select select-bordered"
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
            >
              <option value="">Pick one</option>
              {gameState.players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
          </label>
          {selectedPlayer && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Tag</span>
                </div>
                <select
                  className="select select-bordered"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value as Tags)}
                >
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </label>
              {actionType === "assign" && (
                <>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Assigned By</span>
                    </div>
                    <select
                      className="select select-bordered"
                      value={assignedBy}
                      onChange={(e) => setAssignedBy(e.target.value)}
                    >
                      <option value="">Pick one</option>
                      {gameState.players
                        .filter((player) => player.id !== selectedPlayer)
                        .map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name}
                          </option>
                        ))}
                    </select>
                  </label>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Expires</span>
                    </div>
                    <select
                      className="select select-bordered"
                      value={expires}
                      onChange={(e) =>
                        setExpires(e.target.value as TagExpiration)
                      }
                    >
                      {tagExpirations.map((expiration) => (
                        <option key={expiration} value={expiration}>
                          {changeCase.capitalCase(expiration)}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}
              <button className="btn btn-primary mt-4" type="submit">
                {actionType === "assign" ? "Assign Tag" : "Unassign Tag"}
              </button>
            </>
          )}
        </>
      )}
    </form>
  );
};

export default TagPlayers;
