import * as React from "react";
import { ChevronDown, ChevronUp, Settings2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Column {
  key: string;
  header: string;
  cell: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  pageSize?: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortDirection: "asc" | "desc";
  onSortChange: () => void;
}

export function DataTable({
  columns,
  data,
  pageSize = 10,
  currentPage,
  totalPages,
  onPageChange,
  sortDirection,
  onSortChange,
}: DataTableProps) {
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>(
    columns.map((col) => col.key)
  );

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns((current) =>
      current.includes(columnKey)
        ? current.filter((key) => key !== columnKey)
        : [...current, columnKey]
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              <Settings2 className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.key}
                className="capitalize"
                checked={visibleColumns.includes(column.key)}
                onCheckedChange={() => toggleColumn(column.key)}
              >
                {column.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border w-full overflow-auto">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50 w-[100px] whitespace-nowrap"
                onClick={onSortChange}
              >
                Block #
                {sortDirection === "asc" ? (
                  <ChevronUp className="ml-2 h-4 w-4 inline" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4 inline" />
                )}
              </TableHead>
              {columns
                .filter((column) => visibleColumns.includes(column.key))
                .map((column) => (
                  <TableHead
                    key={column.key}
                    className="whitespace-nowrap w-full"
                  >
                    {column.header}
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium whitespace-nowrap">
                  <a
                    href={`/block/${row.blockNumber}`}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {row.blockNumber}
                  </a>
                </TableCell>
                {columns
                  .filter((column) => visibleColumns.includes(column.key))
                  .map((column) => (
                    <TableCell
                      key={column.key}
                      className="whitespace-nowrap w-full"
                    >
                      {column.cell(row)}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="hover:bg-primary/10 hover:text-primary disabled:hover:bg-transparent"
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
                className={
                  currentPage === page
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-primary/10 hover:text-primary"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="hover:bg-primary/10 hover:text-primary disabled:hover:bg-transparent"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
