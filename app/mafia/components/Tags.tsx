import React, { useState } from "react";
import { useGameContext } from "../contexts/GameContext";
import { TagsType } from "../data/predefinedTags";

const Tags: React.FC = () => {
  const {
    gameState: { tags },
    updateGameState,
  } = useGameContext();
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag as TagsType)) {
      updateGameState({ tags: [...tags, newTag as TagsType] });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: TagsType) => {
    updateGameState({ tags: tags.filter((t) => t !== tag) });
  };

  return (
    <div>
      <ul>
        {tags.map((tag, index) => (
          <li key={index} className="grid grid-cols-2 items-center">
            <span style={{ marginRight: "1rem" }}>{tag}</span>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="btn btn-circle btn-outline btn-error"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="input input-bordered input-primary w-full max-w-xs mb-2"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value as TagsType)}
      />
      <button className="btn btn-primary btn-outline" onClick={handleAddTag}>
        Add Tag
      </button>
    </div>
  );
};

export default Tags;
