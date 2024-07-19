import React, { useState } from "react";
import {
  TagExpiration,
  tagExpirations,
  useGameContext,
} from "../contexts/GameContext";
import * as changeCase from "change-case";
import { useModal } from "../contexts/ModalContext";
import { TagsType } from "../data/predefinedTags";
import { useTranslations } from "next-intl";

const TagPlayers: React.FC = () => {
  const { gameState, assignTagToPlayer, unassignTagFromPlayer } =
    useGameContext();
  const { players, tags } = gameState;
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<TagsType>("Defused");
  const [expires, setExpires] = useState<TagExpiration>("this-night");
  const [actionType, setActionType] = useState<"assign" | "unassign">("assign");
  const { handleClose } = useModal();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedPlayer) {
      if (actionType === "assign") {
        assignTagToPlayer(selectedPlayer, selectedTag, expires);
        handleClose("TagPlayers");
      } else if (actionType === "unassign") {
        unassignTagFromPlayer(selectedPlayer, selectedTag);
        handleClose("TagPlayers");
      }
    }
  };

  const t = useTranslations("Mafia");

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{t("selectAnAction")}</span>
        </div>
        <select
          className="select select-bordered"
          value={actionType}
          onChange={(e) =>
            setActionType(e.target.value as "assign" | "unassign")
          }
        >
          <option value="" disabled>
            {t("pickOne")}
          </option>
          <option value="assign">{t("assignTag")}</option>
          <option value="unassign">{t("unassignTag")}</option>
        </select>
      </label>
      {actionType && (
        <>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">{t("selectAPlayer")}</span>
            </div>
            <select
              className="select select-bordered"
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
            >
              <option value="">{t("pickOne")}</option>
              {players.map((player) => (
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
                  <span className="label-text">{t("NightActions.tag")}</span>
                </div>
                <select
                  className="select select-bordered"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value as TagsType)}
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
                      <span className="label-text">{t("expires")}</span>
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
              <button
                className="btn btn-ghost btn-outline btn-primary mt-4"
                type="submit"
              >
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
