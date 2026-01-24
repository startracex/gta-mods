"use client";

import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { User } from "lucide-react";
import { TagBadge } from "./tag-badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { tagRules } from "@/lib/tags";
import type { ModScheme } from "@/lib/mods";

interface ModCardProps {
  mod: ModScheme;
  onTagClick: (tag: string) => void;
}

function formatAuthor(author: string): string {
  if (!author.includes("\n")) {
    return author;
  }
  return author
    .split("\n")
    .map((line) => line.replace(/.*?: /, ""))
    .filter(Boolean)
    .join(", ");
}

export function ModCard({ mod, onTagClick }: ModCardProps) {
  return (
    <Card
      id={mod.id}
      className="py-4 group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50"
    >
      <CardContent className="flex-1 space-y-3">
        <div className="flex flex-col gap-2">
          <CardTitle className="text-lg text-balance line-clamp-1">{mod.name}</CardTitle>
          {mod.author && (
            <CardDescription className="flex items-center gap-2">
              <User className="h-3 w-3 min-w-3" />
              <div className="truncate w-full" title={mod.author}>
                {formatAuthor(mod.author)}
              </div>
            </CardDescription>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {mod.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {Object.keys(mod.tags).map((tag) => (
            <TagBadge
              tag={tagRules.get(tag)!}
              key={tag}
              className="cursor-pointer text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
            />
          ))}
        </div>
        {mod.content && (
          <div className="markdown-body">
            <Markdown remarkPlugins={[remarkGfm]}>{mod.content}</Markdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
