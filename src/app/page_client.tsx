"use client";

import Masonry from "react-masonry-css";
import { useState, useMemo } from "react";
import { ModCard } from "@/components/mod-card";
import { ModFilters } from "@/components/mod-filters";
import type { ModScheme } from "@/lib/mods";
import { type TagScheme } from "@/lib/tags";

export default function HomePageClient({ mods }: { mods: ModScheme[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filteredMods = useMemo(() => {
    const filterSearch =
      searchTerm === ""
        ? mods
        : mods.filter((mod) => {
            return mod.name.toLowerCase().includes(searchTerm.toLowerCase());
          });
    return selectedTags.length
      ? filterSearch.filter((mod) => {
          const selectedCategories = [
            ...new Set(selectedTags.map((tag) => mod.tags[tag]?.category)),
          ];
          const allCategoriesMatched = selectedCategories.every((category) => {
            return selectedTags.some((tag) => {
              const tagInfo = mod.tags[tag];
              return tagInfo && tagInfo.category === category;
            });
          });

          return allCategoriesMatched;
        })
      : filterSearch;
  }, [mods, searchTerm, selectedTags]);

  const allTags = useMemo(() => {
    const tagCounts = new Map<string, TagScheme>();
    mods.forEach((mod) => {
      for (const tag in mod.tags) {
        const withCount = tagCounts.get(tag);
        if (withCount) {
          withCount._count += 1;
        } else {
          tagCounts.set(tag, { ...mod.tags[tag]!, _count: 1 });
        }
      }
    });
    return [...tagCounts.values()].sort((a, b) => b._count - a._count);
  }, [mods]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card sticky top-0 z-10">
        <div className="container mx-auto">
          <ModFilters
            tags={allTags}
            selectedTags={selectedTags}
            onToggle={handleTagToggle}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            onClear={() => {
              setSearchTerm("");
              setSelectedTags([]);
            }}
          />
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8">
        <div className="mx-4 flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {filteredMods.length} {filteredMods.length === 1 ? "Mod" : "Mods"}
          </h2>
        </div>

        {filteredMods.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No mods found</p>
          </div>
        ) : (
          <Masonry
            breakpointCols={{
              default: 3,
              1100: 2,
              700: 1,
            }}
            className="flex"
            // columnClassName="space-y-6"
          >
            {filteredMods.map((mod) => (
              <div key={mod.id} className="m-4">
                <ModCard mod={mod} onTagClick={handleTagToggle} />
              </div>
            ))}
          </Masonry>
        )}
      </main>

      <footer className="border-t border-border py-4">
        <div className="mx-auto text-center text-sm text-muted-foreground">
          <p>Made by Shiro Wang</p>
        </div>
      </footer>
    </div>
  );
}
