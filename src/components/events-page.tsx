import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { ArrowRight, Clock } from "lucide-react";

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
    key: "type",
    header: "Type",
    cell: (row: any) => <span className="font-medium">{row.type}</span>,
  },
  {
    key: "from",
    header: "From",
    cell: (row: any) => (
      <a
        href={`/address/${row.from}`}
        className="text-blue-500 hover:text-blue-600"
      >
        {row.from}
      </a>
    ),
  },
  {
    key: "to",
    header: "To",
    cell: (row: any) => (
      <a
        href={`/address/${row.to}`}
        className="text-blue-500 hover:text-blue-600"
      >
        {row.to}
      </a>
    ),
  },
  {
    key: "value",
    header: "Value",
    cell: (row: any) => `${row.value} ETH`,
  },
];

// Helper function to generate random event data
const generateMockEvent = (index: number) => ({
  blockNumber: 21750119 - Math.floor(index / 3), // Multiple events can be in the same block
  age: `${Math.floor(index * 4)} secs ago`,
  type: ["Transfer", "Approval", "Mint", "Burn", "Swap"][
    Math.floor(Math.random() * 5)
  ],
  from: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random()
    .toString(16)
    .slice(2, 10)}`,
  to: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random()
    .toString(16)
    .slice(2, 10)}`,
  value: (Math.random() * 5).toFixed(4),
});

export function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Generate 25 mock events
  const mockData = Array.from({ length: 25 }, (_, i) => generateMockEvent(i));

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
