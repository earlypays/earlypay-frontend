"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, Headphones, LogOut } from "lucide-react";

import { Modal } from "@/components/ui/modal";
import { useAuthStore } from "@/store/useAuthStore";
import { handleLogout } from "@/services/auth";
import {
  DEMO_EMPLOYEE,
  DEMO_NOTIFICATIONS,
  formatDashboardDate,
} from "@/lib/dashboard-demo";
import { FOOTER_EMAIL } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
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
  const unreadCount = DEMO_NOTIFICATIONS.filter((item) => item.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 bg-white px-4 md:px-6">
      <button
        type="button"
        onClick={() => setProfileOpen((open) => !open)}
        className="flex min-w-0 cursor-pointer items-center gap-2.5 text-left md:hidden"
      >
        <Avatar initials={initials} />
        <Identity fullName={fullName} employeeId={employeeId} />
      </button>

      <p className="hidden text-sm font-medium text-[#48484A] sm:text-base md:block">
        {dateLabel}
      </p>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <a
          href={`mailto:${FOOTER_EMAIL}`}
          aria-label="Contact support"
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-[#1B1B1B] hover:bg-[#F5F6F7]"
        >
          <Headphones className="size-5" strokeWidth={1.75} />
        </a>
        <button
          type="button"
          className="relative inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-[#1B1B1B] hover:bg-[#F5F6F7]"
          aria-label="Notifications"
          onClick={() => {
            setProfileOpen(false);
            setNotificationsOpen(true);
          }}
        >
          <Bell className="size-5" strokeWidth={1.75} />
          {unreadCount > 0 ? (
            <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-[#E53935] text-[9px] font-semibold text-white">
              {unreadCount}
            </span>
          ) : null}
        </button>

        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            className="flex cursor-pointer items-center gap-2 rounded-full py-1 pr-2 pl-1 hover:bg-[#F5F6F7]"
          >
            <Avatar initials={initials} />
            <Identity fullName={fullName} employeeId={employeeId} />
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform",
                profileOpen && "rotate-180",
              )}
            />
          </button>
        </div>

        {profileOpen ? (
          <>
            <div
              className="fixed inset-0 z-40"
              aria-hidden
              onClick={() => setProfileOpen(false)}
            />
            <div className="absolute top-full right-4 z-50 mt-1 w-48 rounded-lg border border-border bg-white py-1 shadow-lg md:right-6">
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

      <Modal
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        title="Notifications"
        widthClass="max-w-md"
      >
        <ul className="-mx-1">
          {DEMO_NOTIFICATIONS.map((item) => (
            <li
              key={item.id}
              className="flex gap-3 rounded-xl px-2 py-3 hover:bg-[#F5F6F7]"
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E6F3F3] text-[#008B8B]">
                <Bell className="size-4" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-[#1B1B1B]">
                    {item.title}
                  </p>
                  {item.unread ? (
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#008B8B]" />
                  ) : null}
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {item.at}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </header>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#008B8B] text-xs font-semibold text-white">
      {initials}
    </span>
  );
}

function Identity({
  fullName,
  employeeId,
}: {
  fullName: string;
  employeeId: string;
}) {
  return (
    <span className="min-w-0 text-left">
      <span className="block truncate text-sm font-semibold text-[#1B1B1B]">
        {fullName}
      </span>
      <span className="block text-[11px] text-muted-foreground">
        {employeeId}
      </span>
    </span>
  );
}
