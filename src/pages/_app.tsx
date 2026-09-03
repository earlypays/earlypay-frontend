import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Nata_Sans } from "next/font/google";
import { AnimatePresence } from "framer-motion";

import { Toaster } from "sonner";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LandingLayout } from "@/components/layout/landing-layout";
import { useAuthStore } from "@/store/useAuthStore";

const nataSans = Nata_Sans({
  subsets: ["latin"],
  variable: "--font-nata-sans",
  display: "swap",
  adjustFontFallback: false,
});

const STANDALONE_PATHS = ["/login", "/signup", "/forgot-password", "/404"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith("/dashboard");
  const isStandalone = STANDALONE_PATHS.some((path) =>
    router.pathname.startsWith(path),
  );
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className={`${nataSans.variable} font-sans`}>
        <AnimatePresence mode="wait">
          {isDashboard ? (
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          ) : isStandalone ? (
            <Component {...pageProps} />
          ) : (
            <LandingLayout>
              <Component {...pageProps} />
            </LandingLayout>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
