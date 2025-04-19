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
    <div className="rounded-lg border bg-card h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Latest Transactions</h3>
      </div>
      <div className="divide-y overflow-auto flex-1">
        {transactions.map((tx) => (
          <div key={tx.hash} className="p-4 flex items-center gap-4 h-[76px]">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <ArrowRight className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <a
                  href={`/tx/${tx.hash}`}
                  className="font-medium text-blue-500 hover:text-blue-600 truncate max-w-[150px]"
                >
                  {tx.hash}
                </a>
                <span className="text-sm text-muted-foreground">
                  {tx.timestamp}
                </span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center flex-wrap">
                <span className="inline-flex items-center">
                  From{" "}
                  <a
                    href={`/address/${tx.from}`}
                    className="text-blue-500 hover:text-blue-600 truncate max-w-[100px] mx-1"
                  >
                    {tx.from}
                  </a>
                </span>
                <span className="inline-flex items-center">
                  To{" "}
                  <a
                    href={`/address/${tx.to}`}
                    className="text-blue-500 hover:text-blue-600 truncate max-w-[100px] mx-1"
                  >
                    {tx.to}
                  </a>
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm font-medium">{tx.value} ETH</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
