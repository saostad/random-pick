import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { TagsType } from "../data/predefinedTags";
import { useTranslations } from "next-intl";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Tags: React.FC<Props> = (props) => {
  const {
    gameState: { tags },
    updateGameState,
  } = useGameContext();
  const [newTag, setNewTag] = useState("");

  const handleAdd = () => {
    if (newTag && !tags.includes(newTag as TagsType)) {
      updateGameState({ tags: [...tags, newTag as TagsType] });
      setNewTag("");
    }
  };

  const handleRemove = (tag: TagsType) => {
    updateGameState({ tags: tags.filter((t) => t !== tag) });
  };

  function handleUpdate(tag: TagsType, value: string): void {
    const updatedTags = tags.map((t) => (t === tag ? value : t));
    updateGameState({ tags: updatedTags as TagsType[] });
  }

  const t = useTranslations("Mafia");

  return (
    <div {...props}>
      <input
        type="text"
        placeholder="Enter a new tag"
        className="input input-bordered input-primary w-full max-w-xs mb-2"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value as TagsType)}
      />
      <button className="btn btn-primary btn-outline" onClick={handleAdd}>
        {t("addTag")}
      </button>
      <div className="divider"></div>

      <div>
        {tags.map((tag) => (
          <div key={tag} className="grid grid-cols-4 gap-4 my-2">
            <input
              type="text"
              className="input input-bordered w-full max-w-xs col-span-3"
              value={tag}
              onChange={(e) => handleUpdate(tag, e.target.value)}
              placeholder="Tag name"
            />

            <button
              onClick={() => handleRemove(tag)}
              className="btn btn-circle btn-outline btn-error"
            >
              &#x2715;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
