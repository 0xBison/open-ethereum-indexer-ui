import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StorageSegment {
  name: string;
  percentage: number;
  color: string;
}

interface StorageBarProps {
  segments: StorageSegment[];
  className?: string;
}

export function StorageBar({ segments, className }: StorageBarProps) {
  // Calculate total used percentage
  const totalUsed = segments.reduce(
    (acc, segment) => acc + segment.percentage,
    0
  );

  return (
    <div className={cn("space-y-3", className)}>
      <TooltipProvider delayDuration={0}>
        <div className="h-4 w-full rounded-full bg-muted overflow-hidden flex">
          {segments.map((segment, index) => (
            <Tooltip key={segment.name}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "h-full transition-all cursor-pointer",
                    segment.color,
                    "hover:brightness-110 hover:scale-y-105 relative"
                  )}
                  style={{ width: `${segment.percentage}%` }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">
                  <div className="font-semibold">{segment.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {segment.percentage}% of total storage
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="h-full transition-all cursor-pointer hover:bg-muted/80 hover:scale-y-105"
                style={{ width: `${100 - totalUsed}%` }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                <div className="font-semibold">Available Space</div>
                <div className="text-xs text-muted-foreground">
                  {100 - totalUsed}% of total storage
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div className="flex flex-wrap gap-4 text-sm">
        {segments.map((segment) => (
          <div key={segment.name} className="flex items-center gap-2">
            <div className={cn("h-3 w-3 rounded-sm", segment.color)} />
            <span className="font-medium">{segment.name}</span>
            <span className="text-muted-foreground">{segment.percentage}%</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-muted" />
          <span className="font-medium">Available</span>
          <span className="text-muted-foreground">{100 - totalUsed}%</span>
        </div>
      </div>
    </div>
  );
}
