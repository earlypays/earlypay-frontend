"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/router";

import { tokenStorage } from "@/lib/token-storage";
import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!tokenStorage.isAuthenticated()) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>

      {isSidebarOpen ? (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64">
            <DashboardSidebar
              onNavigate={() => setIsSidebarOpen(false)}
              showClose
            />
          </div>
          <button
            type="button"
            className="flex-1 cursor-pointer bg-black/30"
            aria-label="Close sidebar"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/30 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
