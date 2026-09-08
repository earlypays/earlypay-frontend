"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Ellipsis,
  History,
  Hourglass,
  LayoutDashboard,
  LogOut,
  Receipt,
  Settings,
  Wallet,
  X,
} from "lucide-react";

import { handleLogout } from "@/services/auth";
import { DASHBOARD_BOTTOM_NAV, DASHBOARD_MORE_NAV } from "@/lib/routes";
import { cn } from "@/lib/utils";

const bottomIconByHref = {
  "/dashboard": LayoutDashboard,
  "/dashboard/attendance": Hourglass,
  "/dashboard/withdraw": Wallet,
  "/dashboard/bills": Receipt,
} as const;

const moreIconByHref = {
  "/dashboard/transactions": History,
  "/dashboard/settings": Settings,
} as const;

export function DashboardBottomNav() {
  const { pathname } = useRouter();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive =
    moreOpen ||
    DASHBOARD_MORE_NAV.some((item) => pathname.startsWith(item.href));

  useEffect(() => {
    if (!moreOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [moreOpen]);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E8E8E8] bg-white pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(16,70,64,0.06)] md:hidden"
        aria-label="Primary"
      >
        <ul className="flex items-stretch justify-around px-1">
          {DASHBOARD_BOTTOM_NAV.map((item) => {
            const Icon = bottomIconByHref[item.href];
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href} className="min-w-0 flex-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 px-1 py-1 text-[11px] font-medium",
                    active ? "text-[#008B8B]" : "text-[#48484A]",
                  )}
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setMoreOpen(true)}
              className={cn(
                "flex w-full cursor-pointer flex-col items-center gap-1 px-1 py-1 text-[11px] font-medium",
                moreActive ? "text-[#008B8B]" : "text-[#48484A]",
              )}
            >
              <Ellipsis className="size-5" strokeWidth={1.75} />
              <span className="truncate">More</span>
            </button>
          </li>
        </ul>
      </nav>

      {moreOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 cursor-pointer bg-black/40"
            aria-label="Close more menu"
            onClick={() => setMoreOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="More"
            className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white px-4 pt-2 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(16,70,64,0.12)]"
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-[#D9D9D9]" />
            <div className="mt-3 mb-2 flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#1B1B1B]">More</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setMoreOpen(false)}
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-[#48484A] hover:bg-[#F5F6F7]"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="pb-2">
              {DASHBOARD_MORE_NAV.map((item) => {
                const Icon = moreIconByHref[item.href];
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-2 py-3 text-sm font-medium",
                        active
                          ? "bg-[#E6F3F3] text-[#008B8B]"
                          : "text-[#1B1B1B] hover:bg-[#F5F6F7]",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-3 text-sm font-medium text-destructive hover:bg-destructive/5"
                >
                  <LogOut className="size-5" strokeWidth={1.75} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
