import { Clock, Box } from "lucide-react";
import { cn } from "@/lib/utils";

interface Block {
  number: number;
  miner: string;
  timestamp: string;
  txCount: number;
  value: string;
}

export function LatestBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Latest Blocks</h3>
        <a href="/blocks" className="text-sm text-blue-500 hover:text-blue-600">
          View all blocks →
        </a>
      </div>
      <div className="divide-y">
        {blocks.map((block) => (
          <div key={block.number} className="p-4 flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Box className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <a
                  href={`/block/${block.number}`}
                  className="font-medium text-blue-500 hover:text-blue-600"
                >
                  {block.number}
                </a>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {block.timestamp}
                </span>
              </div>
              <div className="text-sm text-muted-foreground truncate">
                Miner{" "}
                <a
                  href={`/address/${block.miner}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {block.miner}
                </a>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{block.txCount} txns</div>
              <div className="text-sm text-muted-foreground">
                {block.value} ETH
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
