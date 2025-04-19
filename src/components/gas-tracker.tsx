import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import { Button } from "./ui/button";
import { RefreshCw, Play, Pause } from "lucide-react";
import { FEATURES } from "../config/features";

interface GasPrice {
  gasPrice: number;
  timestamp: number;
}

const fetchGasPrices = async (): Promise<GasPrice[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ROOT}/gas/prices?limit=${
      FEATURES.gas.historyPoints
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch gas prices");
  }
  const data = await response.json();
  console.log("Raw gas prices data:", data);
  return data;
};

export function GasTrackerPage() {
  const [autoUpdate, setAutoUpdate] = React.useState(true);
  const {
    data: gasPrices,
    isLoading,
    error,
    refetch,
  } = useQuery<GasPrice[]>({
    queryKey: ["gasPrices"],
    queryFn: fetchGasPrices,
    refetchInterval: autoUpdate ? 10000 : false,
  });

  // Log formatted data for debugging
  React.useEffect(() => {
    if (gasPrices) {
      console.log(
        "Formatted gas prices:",
        gasPrices.map((p) => ({
          timestamp: new Date(p.timestamp * 1000).toISOString(),
          gasPrice: p.gasPrice / 1e9, // Convert Wei to Gwei
        }))
      );
    }
  }, [gasPrices]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading gas prices...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Error fetching gas prices: {error.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 w-full gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Gas Tracker</h2>
        <p className="text-muted-foreground">Real-time gas prices.</p>
      </div>

      <div className="rounded-lg border bg-card p-6 h-[calc(100%-4rem)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold"></h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoUpdate(!autoUpdate)}
            >
              {autoUpdate ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause Updates
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Resume Updates
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Now
            </Button>
          </div>
        </div>
        <div className="h-[calc(100%-3rem)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gasPrices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                fontSize={12}
                tickFormatter={(value) =>
                  new Date(value * 1000).toLocaleTimeString()
                }
                type="number"
                domain={["dataMin", "dataMax"]}
                scale="time"
              />
              <YAxis
                fontSize={12}
                label={{
                  value: "Gwei",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => (value / 1e9).toFixed(1)}
              />
              <Tooltip
                labelFormatter={(value) =>
                  new Date(value * 1000).toLocaleString()
                }
                formatter={(value) => [
                  `${(Number(value) / 1e9).toFixed(2)} Gwei`,
                  "Gas Price",
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="gasPrice"
                stroke="#22c55e"
                name="Gas Price"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
