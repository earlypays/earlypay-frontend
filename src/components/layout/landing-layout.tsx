"use client";

import type { ReactNode } from "react";

import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { LandingMotion } from "@/components/layout/landing-motion";

export function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <LandingMotion>
        <main className="flex-1">{children}</main>
        <Footer />
      </LandingMotion>
    </div>
  );
}
