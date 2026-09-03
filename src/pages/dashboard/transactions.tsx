import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { DEMO_ACTIVITY, formatNaira } from "@/lib/dashboard-demo";
import { cn } from "@/lib/utils";

export default function TransactionsPage() {
  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(16,70,64,0.06)]">
      <div className="border-b border-[#F0F0F0] px-5 py-4">
        <h1 className="text-xl font-semibold text-[#1B1B1B]">
          Transaction History
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A simulated list of your recent credits and debits.
        </p>
      </div>
      <ul>
        {DEMO_ACTIVITY.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 border-b border-[#F0F0F0] px-5 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full",
                  item.type === "debit" ? "bg-[#FDECEC]" : "bg-[#E7F6EE]",
                )}
              >
                {item.type === "debit" ? (
                  <ArrowUpRight className="size-4 text-[#E53935]" />
                ) : (
                  <ArrowDownLeft className="size-4 text-[#2E7D32]" />
                )}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1B1B1B]">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">{item.at}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-[#1B1B1B]">
                {item.amount > 0 ? "+" : "-"}
                {formatNaira(Math.abs(item.amount))}
              </p>
              <span
                className={cn(
                  "mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium",
                  item.type === "debit"
                    ? "bg-[#FDECEC] text-[#E53935]"
                    : "bg-[#E7F6EE] text-[#2E7D32]",
                )}
              >
                {item.type === "debit" ? "Debit" : "Credit"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
