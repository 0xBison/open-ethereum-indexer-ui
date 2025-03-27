import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { Clock, Flame } from "lucide-react";

const columns = [
  {
    key: "age",
    header: "Age",
    cell: (row: any) => (
      <span className="text-sm text-muted-foreground flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {row.age}
      </span>
    ),
  },
  {
    key: "miner",
    header: "Miner",
    cell: (row: any) => (
      <a
        href={`/address/${row.miner}`}
        className="text-blue-500 hover:text-blue-600"
      >
        {row.miner}
      </a>
    ),
  },
  {
    key: "txCount",
    header: "Txn Count",
    cell: (row: any) => row.txCount,
  },
  {
    key: "gasUsed",
    header: "Gas Used",
    cell: (row: any) => (
      <span className="flex items-center gap-1">
        <Flame className="h-3 w-3 text-orange-500" />
        {row.gasUsed.toLocaleString()}
      </span>
    ),
  },
  {
    key: "gasLimit",
    header: "Gas Limit",
    cell: (row: any) => row.gasLimit.toLocaleString(),
  },
  {
    key: "baseFee",
    header: "Base Fee",
    cell: (row: any) => `${row.baseFee} Gwei`,
  },
  {
    key: "value",
    header: "Value",
    cell: (row: any) => `${row.value} ETH`,
  },
];

// Helper function to generate random values
const generateMockBlock = (index: number) => ({
  blockNumber: 21750119 - index,
  age: `${Math.floor(index * 12)} secs ago`,
  miner: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random()
    .toString(16)
    .slice(2, 10)}`,
  txCount: Math.floor(Math.random() * 200) + 50,
  gasUsed: Math.floor(Math.random() * 20000000) + 10000000,
  gasLimit: 30000000,
  baseFee: (Math.random() * 20 + 10).toFixed(2),
  value: (Math.random() * 2).toFixed(4),
});

export function BlocksPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Generate 25 mock blocks with varied data
  const mockData = Array.from({ length: 25 }, (_, i) => generateMockBlock(i));

  return (
    <div className="w-full h-full p-4">
      <DataTable
        columns={columns}
        data={mockData}
        pageSize={25}
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
        sortDirection={sortDirection}
        onSortChange={() =>
          setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      />
    </div>
  );
}
