"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUp,
  ArrowUpFromLine,
  ArrowUpRight,
  CircleDot,
  Eye,
  EyeOff,
  Lightbulb,
  LineChart,
  Phone,
  Smartphone,
  Tv,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DEMO_ACTIVITY,
  DEMO_OVERVIEW,
  QUICK_ACTIONS,
  formatNaira,
} from "@/lib/dashboard-demo";
import { cn } from "@/lib/utils";

function formatElapsed(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

const ACTION_ICONS = {
  airtime: Phone,
  data: Smartphone,
  tv: Tv,
  betting: CircleDot,
  power: Lightbulb,
  withdraw: ArrowUpRight,
} as const;

const OVERVIEW_ACTIVITY = DEMO_ACTIVITY.filter(
  (item) => item.id === "1" || item.id === "4",
);

export default function DashboardPage() {
  const [elapsed, setElapsed] = useState(0);
  const [clockedIn, setClockedIn] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);

  useEffect(() => {
    if (!clockedIn) return;
    const id = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [clockedIn]);

  function toggleClock() {
    if (clockedIn) {
      setClockedIn(false);
      setElapsed(0);
      toast.success("Clocked out");
      return;
    }
    setElapsed(0);
    setClockedIn(true);
    toast.success("Clocked in");
  }

  return (
    <div className="space-y-5">
      <h1 className="hidden text-lg font-semibold text-[#1B1B1B] md:block">
        Overview
      </h1>

      <section className="flex flex-col justify-between rounded-2xl bg-[#0B3D40] p-5 text-white sm:p-6 md:h-53">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium">
            Available to Access
            <button
              type="button"
              className="cursor-pointer text-white/80 hover:text-white"
              aria-label={hideBalance ? "Show balance" : "Hide balance"}
              onClick={() => setHideBalance((value) => !value)}
            >
              {hideBalance ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {hideBalance
              ? "••••••"
              : formatNaira(DEMO_OVERVIEW.available, true)}
          </p>
        </div>
        <div className="mt-6 flex flex-col items-end gap-3 md:mt-0">
          <p className="text-xl font-medium tabular-nums sm:text-2xl">
            {formatElapsed(elapsed)}
          </p>
          <Button
            className="h-11 w-28 bg-[#008B8B] p-2.5! text-white hover:bg-[#008B8B]/90"
            onClick={toggleClock}
          >
            {clockedIn ? (
              <ArrowUpFromLine className="size-4" />
            ) : (
              <ArrowDownToLine className="size-4" />
            )}
            {clockedIn ? "Clock Out" : "Clock In"}
          </Button>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-[#1B1B1B]">
          Quick Actions
        </h2>
        <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-6">
          {QUICK_ACTIONS.map((action) => {
            const Icon = ACTION_ICONS[action.icon];
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white px-2 py-4 text-center shadow-[0_8px_24px_rgba(16,70,64,0.06)] transition-colors hover:bg-[#F7FBFB] sm:px-3 sm:py-5"
              >
                <span className="flex size-10 items-center justify-center rounded-full sm:size-11 sm:bg-[#E6F3F3]">
                  <Icon
                    className="size-5 text-[#1B1B1B] sm:size-6"
                    strokeWidth={1.5}
                  />
                </span>
                <span className="text-[11px] font-medium text-[#1B1B1B] sm:text-sm">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(16,70,64,0.06)]">
        <div className="flex items-center justify-between bg-[#112F39] px-5 py-3 text-white">
          <div className="flex items-center gap-2">
            <LineChart className="size-4" />
            <h2 className="text-sm font-semibold">Recent activity</h2>
          </div>
          <Link
            href="/dashboard/transactions"
            className="text-sm font-medium text-[#5EE0E0] hover:underline"
          >
            See more
          </Link>
        </div>
        <ul>
          {OVERVIEW_ACTIVITY.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 border-b border-[#F0F0F0] px-5 py-4 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#EEEFF3]">
                  {item.type === "debit" ? (
                    <ArrowUp className="size-4 text-[#1B1B1B]" />
                  ) : (
                    <ArrowDown className="size-4 text-[#1B1B1B]" />
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
    </div>
  );
}
