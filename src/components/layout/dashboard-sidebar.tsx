"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Users,
  Wallet,
  Banknote,
  Receipt,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Logo } from "@/components/layout/logo";
import { handleLogout } from "@/services/auth";
import { DASHBOARD_NAV } from "@/lib/routes";
import { cn } from "@/lib/utils";

const iconByHref: Record<string, typeof LayoutDashboard> = {
  "/dashboard": LayoutDashboard,
  "/dashboard/employees": Users,
  "/dashboard/wage-access": Wallet,
  "/dashboard/payroll": Banknote,
  "/dashboard/transactions": Receipt,
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
    <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center justify-between px-4">
        <Logo href="/dashboard" imageClassName="h-7 sm:h-8" />
        {showClose ? (
          <button
            type="button"
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-muted"
            aria-label="Close sidebar"
            onClick={onNavigate}
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
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
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5"
        >
          <LogOut className="size-4" />
          Logout
        </button>
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
