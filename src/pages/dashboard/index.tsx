"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  Lightbulb,
  LineChart,
  LogIn,
  LogOut,
  Smartphone,
  Tv,
  Wallet,
  Wifi,
  CircleDot,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import {
  DEMO_ACTIVITY,
  DEMO_EMPLOYEE,
  DEMO_OVERVIEW,
  QUICK_ACTIONS,
  formatNaira,
  greetingForHour,
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
  airtime: Smartphone,
  data: Wifi,
  tv: Tv,
  betting: CircleDot,
  power: Lightbulb,
  withdraw: ArrowUpRight,
} as const;

export default function DashboardPage() {
  const { user } = useAuthStore();
  const firstName = user?.first_name || DEMO_EMPLOYEE.firstName;
  const [elapsed, setElapsed] = useState(DEMO_OVERVIEW.startElapsedSeconds);
  const [clockedIn, setClockedIn] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);

  useEffect(() => {
    if (!clockedIn) return;
    const id = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [clockedIn]);

  return (
    <div className="space-y-5">
      <h1 className="text-lg font-semibold text-[#1B1B1B]">Overview</h1>

      <section className="rounded-xl bg-white px-5 py-4 shadow-[0_8px_24px_rgba(16,70,64,0.06)]">
        <h2 className="text-xl font-semibold text-[#1B1B1B] sm:text-2xl">
          {greetingForHour()}, {firstName} 👋
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s your earnings and activity for today.
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="flex min-h-72 flex-col rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(16,70,64,0.06)]">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-sm font-semibold text-[#1B1B1B]">
              Today Attendance
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F3F3] px-2.5 py-1 text-[11px] font-medium text-[#008B8B]">
              <span className="size-1.5 rounded-full bg-[#008B8B]" />
              {clockedIn ? DEMO_OVERVIEW.clockInLabel : "You are clocked out"}
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {formatNaira(DEMO_OVERVIEW.todayEstimate)} earned so far today
            (estimate)
          </p>
          <p className="mt-3 font-sans text-4xl font-semibold tracking-tight text-[#1B1B1B] tabular-nums">
            {formatElapsed(elapsed)}
          </p>
          <Button
            className="mt-auto h-10 w-full"
            onClick={() => {
              setClockedIn((open) => !open);
              toast.success(clockedIn ? "Clocked out" : "Clocked in");
            }}
          >
            {clockedIn ? (
              <LogOut className="size-4" />
            ) : (
              <LogIn className="size-4" />
            )}
            {clockedIn ? "Clock Out" : "Clock In"}
          </Button>
        </article>

        <article className="flex min-h-72 flex-col rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(16,70,64,0.06)]">
          <h2 className="text-sm font-semibold text-[#008B8B]">
            Earned & Available
          </h2>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Available to Access</p>
            <button
              type="button"
              className="cursor-pointer text-muted-foreground hover:text-[#008B8B]"
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
          <p className="mt-2 text-3xl font-semibold text-[#1B1B1B]">
            {hideBalance
              ? "••••••"
              : formatNaira(DEMO_OVERVIEW.available, true)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Use your balance to access funds or pay bill.
          </p>
          <Button asChild className="mt-auto h-10 w-full">
            <Link href="/dashboard/withdraw">
              <Wallet className="size-4" />
              Withdraw Fund
            </Link>
          </Button>
        </article>

        <article className="flex min-h-72 flex-col rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(16,70,64,0.06)]">
          <h2 className="text-sm font-semibold text-[#008B8B]">
            Current PAY CYCLE
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            {DEMO_OVERVIEW.payCycle.range}
          </p>
          <p className="mt-2 text-3xl font-semibold text-[#1B1B1B]">
            {formatNaira(DEMO_OVERVIEW.payCycle.total)}
          </p>
          <div className="mt-auto flex items-center justify-between rounded-lg bg-[#F7F9F8] px-3 py-2.5">
            <div>
              <p className="text-xs text-muted-foreground">
                Daily Earnings Rate
              </p>
              <p className="text-sm font-semibold text-[#1B1B1B]">
                {formatNaira(DEMO_OVERVIEW.payCycle.dailyRate)}/ day
              </p>
            </div>
            <LineChart className="size-5 text-[#008B8B]" />
          </div>
        </article>
      </div>

      <section>
        <h2 className="mb-3 text-base font-semibold text-[#1B1B1B]">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {QUICK_ACTIONS.map((action) => {
            const Icon = ACTION_ICONS[action.icon];
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 rounded-xl bg-white px-3 py-5 text-center shadow-[0_8px_24px_rgba(16,70,64,0.06)] transition-colors hover:bg-[#F7FBFB]"
              >
                <Icon className="size-6 text-[#1B1B1B]" strokeWidth={1.5} />
                <span className="text-sm font-medium text-[#1B1B1B]">
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
    </div>
  );
}
