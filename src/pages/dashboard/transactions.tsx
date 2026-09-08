"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Receipt,
} from "lucide-react";

import { Modal } from "@/components/ui/modal";
import {
  DEMO_ACTIVITY,
  formatNaira,
  type TransactionRecord,
} from "@/lib/dashboard-demo";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 5;

function paginationItems(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: Array<number | "ellipsis"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("ellipsis");
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < total - 1) items.push("ellipsis");
  items.push(total);
  return items;
}

function signedAmount(amount: number, withKobo = false) {
  return `${amount > 0 ? "+" : "-"}${formatNaira(Math.abs(amount), withKobo)}`;
}

export default function TransactionsPage() {
  const records = DEMO_ACTIVITY;
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<TransactionRecord | null>(null);

  const pageCount = Math.max(1, Math.ceil(records.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageRecords = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return records.slice(start, start + PAGE_SIZE);
  }, [currentPage, records]);

  const rangeStart =
    records.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, records.length);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-sans text-xl font-bold text-[#48484A] sm:text-2xl">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Every withdrawal and bill payment made from your earned-wage balance.
        </p>
      </div>

      {records.length === 0 ? (
        <section className="flex min-h-80 flex-col items-center justify-center rounded-xl bg-white px-6 py-16 text-center shadow-[0_8px_24px_rgba(16,70,64,0.06)]">
          <span className="flex size-16 items-center justify-center rounded-full bg-[#E6F3F3] text-[#008B8B]">
            <Receipt className="size-7" strokeWidth={1.5} />
          </span>
          <h2 className="mt-5 text-lg font-semibold text-[#1B1B1B]">
            No activity yet
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Withdrawals and bill payments you make will show up here, each with
            a receipt you can revisit any time.
          </p>
        </section>
      ) : (
        <section className="overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(16,70,64,0.06)]">
          <ul>
            {pageRecords.map((item) => (
              <li
                key={item.id}
                className="border-b border-[#F0F0F0] last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => setSelected(item)}
                  className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-[#F7FBFB]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full",
                        item.type === "debit" ? "bg-[#FDECEC]" : "bg-[#E7F6EE]",
                      )}
                    >
                      {item.type === "debit" ? (
                        <ArrowUpRight className="size-4 text-[#E53935]" />
                      ) : (
                        <ArrowDownLeft className="size-4 text-[#2E7D32]" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#1B1B1B]">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.at}</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-[#1B1B1B]">
                      {signedAmount(item.amount)}
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
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 border-t border-[#F0F0F0] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {rangeStart}–{rangeEnd} of {records.length} entries
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-[#1B1B1B] hover:bg-[#F3F1F7] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
              </button>
              {paginationItems(currentPage, pageCount).map((item, index) =>
                item === "ellipsis" ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-1 text-sm text-muted-foreground"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    aria-current={item === currentPage ? "page" : undefined}
                    onClick={() => setPage(item)}
                    className={cn(
                      "inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-sm font-medium",
                      item === currentPage
                        ? "bg-[#E8E8E8] text-[#1B1B1B]"
                        : "text-[#1B1B1B] hover:bg-[#F3F1F7]",
                    )}
                  >
                    {item}
                  </button>
                ),
              )}
              <button
                type="button"
                aria-label="Next page"
                disabled={currentPage === pageCount}
                onClick={() =>
                  setPage((value) => Math.min(pageCount, value + 1))
                }
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md bg-[#008B8B] text-white hover:bg-[#008B8B]/90 disabled:cursor-not-allowed disabled:bg-[#E8E8E8] disabled:text-[#9CA3AF]"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.receiptTitle}
        widthClass="max-w-md"
      >
        {selected ? (
          <div>
            <p className="text-sm text-muted-foreground">
              {selected.receiptAt}
            </p>
            <dl className="mt-5 divide-y divide-[#F0F0F0] text-sm">
              <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
                <dt className="text-muted-foreground">Amount</dt>
                <dd className="font-semibold text-[#1B1B1B]">
                  {signedAmount(selected.amount, true)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Fee</dt>
                <dd className="font-medium text-[#1B1B1B]">
                  {formatNaira(selected.fee, true)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-muted-foreground">Status</dt>
                <dd className="font-medium text-[#1B1B1B]">
                  {selected.status}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 last:pb-0">
                <dt className="text-muted-foreground">Reference</dt>
                <dd className="font-medium text-[#1B1B1B]">
                  {selected.reference}
                </dd>
              </div>
            </dl>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
