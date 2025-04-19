import { Box, Clock, Fuel } from "lucide-react";
import { StatsCard } from "@/components/stats-card";
import { LatestBlocks } from "@/components/latest-blocks";
import { LatestTransactions } from "@/components/latest-transactions";
import { useSidebar } from "@/components/ui/sidebar";
import { FEATURES, BLOCK_FEATURES } from "@/config/features";

// Data generation - always generate complete data
const generateMockData = () => {
  const generateAddress = () =>
    `0x${Math.random().toString(16).slice(2, 10)}...${Math.random()
      .toString(16)
      .slice(2, 10)}`;

  const generateBlock = (index: number) => ({
    number: 21750119 - index,
    timestamp: `${(index + 1) * 13} secs ago`,
    miner: generateAddress(),
    txCount: Math.floor(Math.random() * 200) + 10,
  });

  const generateTransaction = (index: number) => ({
    hash: `0x${Math.random().toString(16).slice(2, 18)}...`,
    from: generateAddress(),
    to: generateAddress(),
    value: (Math.random() * 0.1).toFixed(5),
    timestamp: `${(index + 1) * 11} secs ago`,
  });

  return {
    blocks: Array.from({ length: 20 }, (_, i) => generateBlock(i)),
    transactions: Array.from({ length: 20 }, (_, i) => generateTransaction(i)),
  };
};

// Component
export function Dashboard() {
  const { open } = useSidebar();
  const mockData = generateMockData();

  // Apply feature flags to block data when passing to component
  const visibleBlocks = mockData.blocks.map((block) => ({
    number: block.number,
    timestamp: block.timestamp,
    ...(BLOCK_FEATURES.showMinerDetails ? { miner: block.miner } : {}),
    ...(BLOCK_FEATURES.showTransactionCount ? { txCount: block.txCount } : {}),
  }));

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] p-4 space-y-6 w-full">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of the chain.</p>
      </div>

      <div className="grid grid-cols-12 gap-4 w-full">
        <div
          className={`col-span-12 ${
            !open ? "md:col-span-6" : "md:col-span-12"
          } ${open ? "lg:col-span-6" : "lg:col-span-3"}`}
        >
          <StatsCard
            title="Current Block"
            value="21,750,096"
            icon={<Box className="h-4 w-4" />}
          />
        </div>
        <div
          className={`col-span-12 ${
            !open ? "md:col-span-6" : "md:col-span-12"
          } ${open ? "lg:col-span-6" : "lg:col-span-3"}`}
        >
          <StatsCard
            title="Current Block Time"
            value="13s ago"
            icon={<Clock className="h-4 w-4" />}
          />
        </div>
        <div
          className={`col-span-12 ${
            !open ? "md:col-span-6" : "md:col-span-12"
          } ${open ? "lg:col-span-6" : "lg:col-span-3"}`}
        >
          <StatsCard
            title="Last Indexed Block"
            value="21,750,096"
            icon={<Box className="h-4 w-4" />}
          />
        </div>
        <div
          className={`col-span-12 ${
            !open ? "md:col-span-6" : "md:col-span-12"
          } ${open ? "lg:col-span-6" : "lg:col-span-3"}`}
        >
          <StatsCard
            title="Gas Price"
            value="1.61 Gwei"
            icon={<Fuel className="h-4 w-4" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 w-full">
        <div
          className={`col-span-12 ${
            FEATURES.transactions.enabled
              ? `${!open ? "lg:col-span-6" : "lg:col-span-12"} xl:col-span-6`
              : ""
          }`}
        >
          <LatestBlocks blocks={visibleBlocks} />
        </div>
        {FEATURES.transactions.enabled && (
          <div
            className={`col-span-12 ${
              !open ? "lg:col-span-6" : "lg:col-span-12"
            } xl:col-span-6`}
          >
            <LatestTransactions transactions={mockData.transactions} />
          </div>
        )}
      </div>

      {/* Spacer to push content to full height */}
      <div className="flex-1"></div>
    </div>
  );
}
