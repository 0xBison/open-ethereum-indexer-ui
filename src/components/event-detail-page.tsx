import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { Clock } from "lucide-react";
import React, { useState } from "react";

interface EventInstance {
  uniqueEventId: string;
  eventOriginAddress: string;
  createdDate: string;
  txIndex: string;
  logIndex: string;
  logData: string;
  blockHash: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
  topics: string[];
}

interface EventDetailColumn {
  key: string;
  header: string;
  cell: (row: EventInstance) => React.ReactNode;
}

const columnsDefinition: EventDetailColumn[] = [
  {
    key: "blockTimestamp",
    header: "Timestamp",
    cell: (row: EventInstance) => {
      const timestamp = row.blockTimestamp;
      const displayTime =
        timestamp && !isNaN(Date.parse(timestamp))
          ? new Date(timestamp).toLocaleString()
          : "Invalid Date";
      return (
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {displayTime}
        </span>
      );
    },
  },
  {
    key: "blockNumber",
    header: "Block #",
    cell: (row: EventInstance) => (
      <span className="font-medium">{row.blockNumber}</span>
    ),
  },
  {
    key: "transactionHash",
    header: "Transaction Hash",
    cell: (row: EventInstance) => (
      <span
        className="text-sm text-blue-500 hover:text-blue-600 font-mono truncate max-w-xs block"
        title={row.transactionHash}
      >
        {row.transactionHash}
      </span>
    ),
  },
  {
    key: "logIndex",
    header: "Log Index",
    cell: (row: EventInstance) => <span>{row.logIndex}</span>,
  },
];

const fetchEventInstances = async (
  eventId: string | undefined
): Promise<EventInstance[]> => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_ROOT}/events/${eventId}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch event ${eventId}: ${response.statusText}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error(
      `Unexpected response format for event ${eventId}. Expected an array.`
    );
  }
  return data;
};

const getEventTypeNameFromId = (eventId: string | undefined): string => {
  if (!eventId) return "Unknown Event";
  const parts = eventId.split("_");
  return parts[0] || eventId;
};

export function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const eventTypeName = getEventTypeNameFromId(eventId);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const {
    data: eventInstances,
    isLoading,
    isError,
    error,
  } = useQuery<EventInstance[], Error>({
    queryKey: ["eventInstances", eventId],
    queryFn: () => fetchEventInstances(eventId),
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000,
  });

  if (!eventId) {
    return <div className="p-4">Error: No Event ID provided in URL.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading event details for {eventTypeName} ({eventId})...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-red-600">
        Error fetching event details: {error?.message || "Unknown error"}
      </div>
    );
  }

  if (!eventInstances || eventInstances.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No data found for event {eventTypeName} ({eventId}).
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Event: {eventTypeName}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Instances recorded for Event ID: {eventId}
      </p>

      <DataTable
        columns={columnsDefinition}
        data={eventInstances}
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
        sortDirection={sortDirection}
        onSortChange={() =>
          setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
        }
      />
    </div>
  );
}
