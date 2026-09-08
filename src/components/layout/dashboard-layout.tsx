"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/router";

import { tokenStorage } from "@/lib/token-storage";
import { DashboardBottomNav } from "./dashboard-bottom-nav";
import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!tokenStorage.isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F6F7]">
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 pb-24 md:p-6">
          {children}
        </main>
        <DashboardBottomNav />
      </div>
    </div>
  );
}
