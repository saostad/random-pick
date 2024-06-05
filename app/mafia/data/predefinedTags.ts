export const tags = [
  // When someone fires a gun
  "Fired",
  // When someone got shot with a gun
  "Wounded",
  "Silenced",
  // when a player lost their ability
  "Defused",
  // when a magician applied a spell or trick on someone
  "Enchanted",
  // when psychiatrist applied a trick on someone
  "Treated",
] as const;
export type TagsType = (typeof tags)[number];
