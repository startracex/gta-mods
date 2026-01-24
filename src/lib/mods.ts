import { tagRules, TagScheme } from "./tags";
import { allMods, Mod } from "content-collections";

export interface ModScheme {
  id: string;
  name: string;
  description?: string;
  author?: string;
  tags: Record<string, TagScheme>;
  content: string;
}

function toMod(mod: Mod): ModScheme {
  const dirParts = mod._meta.directory.replace(/\\/g, "/").toLowerCase().split("/");

  const tags: Record<string, TagScheme> = {};

  for (const part of [...(mod.tags || []), ...dirParts]) {
    const tagRule = tagRules.get(part);
    if (!tagRule) {
      continue;
    }
    const key = tagRule._id;
    if (tags[key]) {
      continue;
    }
    tags[key] = tagRule;
  }

  const name = mod.name || mod._meta.fileName.replace(/\.[^.]+$/, "");
  return {
    id: mod.id || name.toLowerCase().replace(/\s+/g, "-") || "",
    name,
    description: mod.description,
    author: mod.author || "unknown",
    tags,
    content: mod.content,
  };
}

export const mods = new Map(
  allMods.map((m) => {
    const mod = toMod(m);
    return [mod.id, mod];
  }),
);
