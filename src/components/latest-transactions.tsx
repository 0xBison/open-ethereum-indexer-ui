import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: string;
}

export function LatestTransactions({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Latest Transactions</h3>
      </div>
      <div className="divide-y">
        {transactions.map((tx) => (
          <div key={tx.hash} className="p-4 flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ArrowRight className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <a
                  href={`/tx/${tx.hash}`}
                  className="font-medium text-blue-500 hover:text-blue-600 truncate"
                >
                  {tx.hash}
                </a>
                <span className="text-sm text-muted-foreground">
                  {tx.timestamp}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                From{" "}
                <a
                  href={`/address/${tx.from}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {tx.from}
                </a>{" "}
                To{" "}
                <a
                  href={`/address/${tx.to}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {tx.to}
                </a>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{tx.value} ETH</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
