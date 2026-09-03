"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  CalendarDays,
  Wallet,
  Receipt,
  History,
  Settings,
  LogOut,
  X,
  Headphones,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Logo } from "@/components/layout/logo";
import { handleLogout } from "@/services/auth";
import {
  DASHBOARD_ACCOUNT_NAV,
  DASHBOARD_NAV,
  FOOTER_EMAIL,
} from "@/lib/routes";
import { cn } from "@/lib/utils";

const iconByHref: Record<string, typeof LayoutDashboard> = {
  "/dashboard": LayoutDashboard,
  "/dashboard/attendance": CalendarDays,
  "/dashboard/withdraw": Wallet,
  "/dashboard/bills": Receipt,
  "/dashboard/transactions": History,
  "/dashboard/settings": Settings,
};

type DashboardSidebarProps = {
  onNavigate?: () => void;
  showClose?: boolean;
};

export function DashboardSidebar({
  onNavigate,
  showClose,
}: DashboardSidebarProps) {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const pathname = router.pathname;

  return (
    <aside className="flex h-full w-68 flex-col bg-[#0B3D40] text-white">
      <div className="flex items-start justify-between gap-2 px-5 pt-6 pb-4">
        <div>
          <Logo
            href="/dashboard"
            src="/landing/footer-logo.png"
            imageClassName="h-8 sm:h-9"
          />
          <p className="mt-2 text-[11px] leading-snug text-white/70">
            Because life doesn&apos;t wait for payday.
          </p>
        </div>
        {showClose ? (
          <button
            type="button"
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-white hover:bg-white/10"
            aria-label="Close sidebar"
            onClick={onNavigate}
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {DASHBOARD_NAV.map((item) => {
          const Icon = iconByHref[item.href] ?? LayoutDashboard;
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#008B8B] text-white shadow-[inset_3px_0_0_0_#fff]"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}

        <p className="mt-6 px-3 pb-2 text-[11px] font-semibold tracking-wider text-white/45 uppercase">
          Account
        </p>
        {DASHBOARD_ACCOUNT_NAV.map((item) => {
          const Icon = iconByHref[item.href] ?? Settings;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#008B8B] text-white shadow-[inset_3px_0_0_0_#fff]"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </nav>

      <div className="p-3 pb-5">
        <div className="rounded-xl bg-[#082F32] p-4">
          <p className="text-sm font-semibold">Need Help?</p>
          <p className="mt-1 text-xs leading-relaxed text-white/70">
            We&apos;re here to help you with any issues.
          </p>
          <Button
            asChild
            size="sm"
            className="mt-3 h-9 w-full rounded-md bg-[#008B8B] text-xs font-semibold hover:bg-[#008B8B]/90"
          >
            <a href={`mailto:${FOOTER_EMAIL}`}>
              <Headphones className="size-3.5" />
              Contact Support
            </a>
          </Button>
        </div>
      </div>

      <Modal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Log out"
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to log out of EarlyPay?
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsLogoutModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </Modal>
    </aside>
  );
}
