import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { TagsType } from "../data/predefinedTags";

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
        Add Tag
      </button>
      <div className="divider"></div>

      <div className="grid grid-cols-2 gap-4">
        {tags.map((tag, index) => (
          <>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs input-sm"
              value={tag}
              onChange={(e) => handleUpdate(tag, e.target.value)}
              placeholder="Tag name"
            />

            <button
              onClick={() => handleRemove(tag)}
              className="btn btn-circle btn-outline btn-error btn-sm"
            >
              &#x2715;
            </button>
          </>
        ))}
      </div>
    </div>
  );
};

export default Tags;
