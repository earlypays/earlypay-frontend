import type { ReactNode } from "react";

import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

export function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
