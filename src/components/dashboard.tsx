import { Box, Clock, Globe2, Gauge } from "lucide-react";
import { StorageBar } from "@/components/storage-bar";
import { StatsCard } from "@/components/stats-card";
import { LatestBlocks } from "@/components/latest-blocks";
import { LatestTransactions } from "@/components/latest-transactions";

// Sample data - replace with real data
const blocks = [
  {
    number: 21750119,
    miner: "0x1f9090daa...8e676c326",
    timestamp: "19 secs ago",
    txCount: 116,
    value: "0.01759",
  },
  // Add more blocks...
];

const transactions = [
  {
    hash: "0x14952bc3eaf...",
    from: "0x4838B106...B0BAD5f97",
    to: "0x388C818C...7ccB19297",
    value: "0.01867",
    timestamp: "19 secs ago",
  },
  // Add more transactions...
];

export function Dashboard() {
  const storageSegments = [
    {
      name: "System",
      percentage: 15,
      color: "bg-blue-500",
    },
    {
      name: "Apps",
      percentage: 25,
      color: "bg-green-500",
    },
    {
      name: "Documents",
      percentage: 10,
      color: "bg-yellow-500",
    },
    {
      name: "Media",
      percentage: 20,
      color: "bg-purple-500",
    },
    {
      name: "Other",
      percentage: 10,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Storage Usage</h2>
        <p className="text-muted-foreground">
          Overview of your storage allocation and usage.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Current Block"
          value="21,750,096"
          icon={<Box className="h-4 w-4" />}
        />
        <StatsCard
          title="Last Block Time"
          value="13s ago"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatsCard
          title="Market Cap"
          value="$396,918,646,697.00"
          icon={<Globe2 className="h-4 w-4" />}
        />
        <StatsCard
          title="Gas Price"
          value="1.61 Gwei"
          subtitle="($0.11)"
          icon={<Gauge className="h-4 w-4" />}
        />
      </div>

      <StorageBar segments={storageSegments} className="max-w-3xl" />

      <div className="grid gap-6 md:grid-cols-2">
        <LatestBlocks blocks={blocks} />
        <LatestTransactions transactions={transactions} />
      </div>
    </div>
  );
}
