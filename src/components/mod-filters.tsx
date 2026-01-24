"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TagScheme } from "@/lib/tags";
import { TagBadge } from "./tag-badge";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TagCloudProps {
  tags: TagScheme[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
  onClear?: () => void;
  searchTerm: string;
  onSearch: (term: string) => void;
}

export function ModFilters({
  tags,
  selectedTags,
  onToggle,
  onClear,
  searchTerm,
  onSearch,
}: TagCloudProps) {
  const maxCount = Math.max(...tags.map((t) => t._count));

  const getTagSize = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.7) return "text-base";
    if (ratio > 0.4) return "text-sm";
    return "text-xs";
  };

  const [open, setOpen] = useState(false);

  return (
    <Card className={cn(!open && "h-3", "p-0 reactive")}>
      <Badge
        style={{
          transform: "translate(-50%, 50%)",
        }}
        className="h-4 absolute bg-background left-1/2 bottom-0 cursor-pointer"
        variant="outline"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close filters" : "Open filters"}
      </Badge>

      <CardContent className={cn(!open && "hidden", "my-4 space-y-4")}>
        <div className="flex justify-between gap-2">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mods..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button onClick={onClear} variant="outline" size="icon-sm">
            <X />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(Object.groupBy(tags, (t) => t.category)).map(([category, tags]) => {
            return (
              <div key={category} className="flex flex-wrap gap-2">
                {tags?.map((tag) => {
                  return (
                    <TagBadge
                      tag={tag}
                      key={tag._id}
                      disabled={!selectedTags.includes(tag._id)}
                      className={`cursor-pointer hover:scale-105 transition-transform ${getTagSize(tag._count)}`}
                      onClick={() => onToggle(tag._id)}
                    >
                      {tag.name} ({tag._count})
                    </TagBadge>
                  );
                })}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
