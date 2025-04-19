import { Clock, Box } from "lucide-react";
import { BLOCK_FEATURES } from "@/config/features";

interface Block {
  number: number;
  miner?: string;
  timestamp: string;
  txCount?: number;
}

export function LatestBlocks({ blocks }: { blocks: Block[] }) {
  const displayBlocks = blocks.slice(0, BLOCK_FEATURES.blockCount);

  return (
    <div className="rounded-lg border bg-card h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Latest Blocks</h3>
        <a href="/blocks" className="text-sm text-blue-500 hover:text-blue-600">
          View all blocks →
        </a>
      </div>
      <div className="divide-y overflow-auto flex-1">
        {displayBlocks.map((block) => (
          <div
            key={block.number}
            className={`p-4 flex items-center gap-4 ${
              BLOCK_FEATURES.showMinerDetails ? "h-[76px]" : "h-[56px]"
            }`}
          >
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <Box className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0 flex">
              <div className="flex-1">
                <a
                  href={`/block/${block.number}`}
                  className="font-medium text-blue-500 hover:text-blue-600"
                >
                  {block.number}
                </a>
                {BLOCK_FEATURES.showMinerDetails && block.miner && (
                  <div className="text-sm text-muted-foreground truncate mt-1">
                    Miner{" "}
                    <a
                      href={`/address/${block.miner}`}
                      className="text-blue-500 hover:text-blue-600 truncate max-w-[200px] inline-block align-middle"
                    >
                      {block.miner}
                    </a>
                  </div>
                )}
              </div>

              <div className="text-right flex flex-col justify-center">
                <span className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                  <Clock className="h-3 w-3" />
                  {block.timestamp}
                </span>
                {BLOCK_FEATURES.showTransactionCount &&
                  block.txCount !== undefined && (
                    <div className="text-sm font-medium mt-1">
                      {block.txCount} txns
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
