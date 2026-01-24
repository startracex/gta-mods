export interface TagScheme {
  name: string;
  order: number;
  aliases?: string[];
  category: string;
  description?: string;
  _id: string;
  [key: `_${string}`]: any;
}

class Tags {
  keyMap: Map<string, TagScheme> = new Map();
  categoryMap: Map<string, TagScheme[]> = new Map();
  ordered: TagScheme[];
  constructor(tags: Record<string, Partial<TagScheme>>) {
    let index = 0;
    this.ordered = [];

    for (const key in tags) {
      const value = tags[key];
      const target = {
        _id: key,
        ...value,
        order: index,
        category: value.category?.length ? value.category : "default",
      } as TagScheme;
      this.keyMap.set(key, target);

      const { aliases } = target;
      if (aliases?.length) {
        aliases.forEach((a) => {
          this.keyMap.set(a, target);
        });
      }
      this.ordered.push(target);
      index++;
    }
    this.ordered.sort((a, b) => {
      const indexA = a.order ?? -1;
      const indexB = b.order ?? -1;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    for (const tag of this.ordered) {
      const category = tag.category;
      let arr = this.categoryMap.get(category);
      if (!arr) {
        arr = [];
        this.categoryMap.set(category, arr);
      }
      arr.push(tag);
    }
  }

  keys() {
    return [...this.keyMap.keys()];
  }

  categories() {
    return [...this.categoryMap.keys()];
  }

  get(id: string) {
    return this.keyMap.get(id);
  }

  getByCategory(category: string) {
    return this.categoryMap.get(category);
  }
}

export const tagRules = new Tags({
  standalone: {
    name: "Standalone",
    category: "installation",
  },
  override: {
    name: "Override",
    category: "installation",
  },
  installer: {
    name: "Installer",
    category: "installation",
  },
  gta3: {
    name: "Grand Theft Auto III",
    category: "game",
    aliases: ["iii"],
  },
  gtavc: {
    name: "Grand Theft Auto: Vice City",
    category: "game",
    aliases: ["vc"],
  },
  gtasa: {
    name: "Grand Theft Auto: San Andreas",
    category: "game",
    aliases: ["sa"],
  },
  gta4: {
    name: "Grand Theft Auto IV",
    category: "game",
    aliases: ["gtaiv"],
  },
  gta5: {
    name: "Grand Theft Auto V",
    category: "game",
    aliases: ["gtav"],
  },
  gta6: {
    name: "Grand Theft Auto VI",
    category: "game",
    aliases: ["gtavi"],
  },
  fixes: {
    name: "Fixes",
    description: "Fix bugs in the game",
  },
  improvements: {
    name: "Improvements",
    description: "Improve existing features in the game",
  },
  effects: {
    name: "Effects",
    description: "Modify game effects",
  },
  vehicles: {
    name: "Vehicles",
    description: "Modify vehicles",
  },
  weapons: {
    name: "Weapons",
    description: "Modify weapons or ammo",
  },
  maps: {
    name: "Maps",
    description: "Modify maps or objects on the map",
  },
  textures: {
    name: "Textures",
    description: "Modify textures",
  },
  audio: {
    name: "Audio",
    description: "Modify audio",
  },
  missions: {
    name: "Missions",
    description: "Modify missions",
  },
  gameplay: {
    name: "Gameplay",
    description: "Modify the gameplay",
  },
  ui: {
    name: "UI",
    description: "Modify the user interfaces",
  },
  graphics: {
    name: "Graphics",
    description: "Modify graphics and visuals",
  },
  animations: {
    name: "Animations",
    description: "Modify animations",
  },
  story: {
    name: "Story",
    description: "Modify the story line",
  },
  npcs: {
    name: "NPCs",
    description: "Modify NPCs and their behavior",
  },
});

const colorMapping: Record<string, string> = {
  // Games
  gta3: "bg-blue-900 text-blue-100 hover:bg-blue-800",
  gtavc: "bg-pink-600 text-pink-100 hover:bg-pink-700",
  gtasa: "bg-green-900 text-green-100 hover:bg-green-800",
  gta4: "bg-indigo-900 text-indigo-100 hover:bg-indigo-800",
  gta5: "bg-red-900 text-red-100 hover:bg-red-800",
  gta6: "bg-violet-900 text-violet-100 hover:bg-violet-800",

  // Installation / distribution
  standalone: "bg-slate-700 text-slate-100 hover:bg-slate-600",
  override: "bg-amber-800 text-amber-100 hover:bg-amber-700",
  installer: "bg-cyan-800 text-cyan-100 hover:bg-cyan-700",

  // Mod types
  fixes: "bg-yellow-800 text-yellow-100 hover:bg-yellow-700",
  improvements: "bg-lime-800 text-lime-100 hover:bg-lime-700",
  effects: "bg-purple-900 text-purple-100 hover:bg-purple-800",
  vehicles: "bg-teal-800 text-teal-100 hover:bg-teal-700",
  weapons: "bg-rose-800 text-rose-100 hover:bg-rose-700",
  maps: "bg-emerald-900 text-emerald-100 hover:bg-emerald-800",
  textures: "bg-fuchsia-900 text-fuchsia-100 hover:bg-fuchsia-800",
  audio: "bg-sky-800 text-sky-100 hover:bg-sky-700",
  missions: "bg-orange-800 text-orange-100 hover:bg-orange-700",
  gameplay: "bg-blue-800 text-blue-100 hover:bg-blue-700",
  ui: "bg-gray-800 text-gray-100 hover:bg-gray-700",
  graphics: "bg-violet-800 text-violet-100 hover:bg-violet-700",
  animations: "bg-indigo-800 text-indigo-100 hover:bg-indigo-700",
  story: "bg-red-800 text-red-100 hover:bg-red-700",
  npc: "bg-emerald-800 text-emerald-100 hover:bg-emerald-700",
};

export const getTagColor = (tagId: string): string => {
  return colorMapping[tagId] || "bg-gray-700 text-gray-100 hover:bg-gray-600";
};
