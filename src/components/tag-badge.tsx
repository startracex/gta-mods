import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TagScheme, getTagColor } from "@/lib/tags";

export function TagBadge({
  className,
  tag,
  disabled,
  children = tag.name,
  ...props
}: {
  disabled?: boolean;
  tag: TagScheme;
} & Parameters<typeof Badge>[0]) {
  return (
    <Badge
      variant="outline"
      title={tag.description}
      className={cn("rounded-xs", !disabled && getTagColor(tag._id), className)}
      {...props}
    >
      {children}
    </Badge>
  );
}
