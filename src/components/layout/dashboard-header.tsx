"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, LogOut, Menu } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { handleLogout } from "@/services/auth";
import { DEMO_EMPLOYEE, formatDashboardDate } from "@/lib/dashboard-demo";
import { cn } from "@/lib/utils";

type DashboardHeaderProps = {
  onToggleSidebar?: () => void;
};

export function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useAuthStore();
  const dateLabel = useMemo(() => formatDashboardDate(), []);
  const fullName =
    [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
    DEMO_EMPLOYEE.fullName;
  const employeeId = user?.employee_id || DEMO_EMPLOYEE.employeeId;
  const initials = fullName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 bg-transparent px-4 md:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-foreground hover:bg-white md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </button>
        <p className="text-sm font-medium text-[#48484A] sm:text-base">
          {dateLabel}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-[#48484A] shadow-sm"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-[#E53935]" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-white py-1 pr-2 pl-1 shadow-sm"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#008B8B] text-xs font-semibold text-white">
              {initials}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-semibold text-[#1B1B1B]">
                {fullName}
              </span>
              <span className="block text-[11px] text-muted-foreground">
                {employeeId}
              </span>
            </span>
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform",
                profileOpen && "rotate-180",
              )}
            />
          </button>

          {profileOpen ? (
            <>
              <div
                className="fixed inset-0 z-40"
                aria-hidden
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute top-full right-0 z-50 mt-1 w-48 rounded-lg border border-border bg-white py-1 shadow-lg">
                <Link
                  href="/dashboard/settings"
                  className="block px-3 py-2 text-sm text-foreground hover:bg-muted"
                  onClick={() => setProfileOpen(false)}
                >
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/5"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
