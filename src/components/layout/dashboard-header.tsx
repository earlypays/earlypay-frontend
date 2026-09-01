"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, Menu } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { handleLogout } from "@/services/auth";
import { getGreetingName } from "@/lib/user-display-name";
import { cn } from "@/lib/utils";

type DashboardHeaderProps = {
  onToggleSidebar?: () => void;
};

export function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useAuthStore();
  const displayName = getGreetingName(user);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-card px-3 md:px-6">
      <div className="flex flex-1 items-center gap-2 md:gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-foreground hover:bg-muted md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted sm:gap-2"
        >
          <div
            className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/40 bg-primary/10"
            aria-hidden
          >
            <span className="text-xs font-bold text-primary/60 uppercase">
              {displayName.charAt(0)}
            </span>
          </div>
          <span className="hidden truncate text-sm font-medium text-foreground sm:inline">
            Hi, <span className="capitalize">{displayName}</span>
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
            <div className="fixed top-17 right-2 z-50 w-48 min-w-48 rounded-lg border border-border bg-card py-1 shadow-lg sm:absolute sm:top-full sm:right-0 sm:mt-1">
              {user?.email ? (
                <div className="border-b border-border px-3 py-2">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user.email}
                  </p>
                </div>
              ) : null}
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
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/5"
              >
                <LogOut className="size-4" />
                <span>Logout</span>
              </button>
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
}
