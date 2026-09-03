"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { LANDING_NAV } from "@/lib/routes";
import { cn } from "@/lib/utils";

const MENU_EASE = [0.22, 1, 0.36, 1] as const;

function isActiveHref(pathname: string, hash: string, href: string) {
  if (href === "/") {
    return pathname === "/" && !hash;
  }
  if (href.startsWith("/#")) {
    return pathname === "/" && hash === href.slice(1);
  }
  return pathname === href;
}

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const hash = router.asPath.includes("#")
    ? `#${router.asPath.split("#")[1]}`
    : "";

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        <Container className="flex h-18 items-center justify-between gap-4 lg:h-20">
          <Logo />

          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Primary"
          >
            {LANDING_NAV.map((item) => {
              const active = isActiveHref(router.pathname, hash, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-[16px] font-semibold transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#008B8B]",
                    active
                      ? "text-[#008B8B] after:h-px after:w-full after:bg-[#008B8B]"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              asChild
              size="lg"
              className="rounded-md px-2.5 text-[16px] font-semibold"
            >
              <Link href="/signup">Get started for free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-md border-[#008B8B] px-2.5 text-[16px] font-semibold text-muted-foreground"
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg text-heading hover:bg-primary/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: MENU_EASE }}
            className="fixed inset-0 z-60 flex flex-col overflow-hidden rounded-t-2xl bg-hero lg:hidden"
          >
            <div className="bg-white">
              <Container className="flex h-18 items-center justify-between gap-4">
                <Logo />
                <button
                  type="button"
                  className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border border-[#C5C5C5] text-heading hover:bg-primary/10"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" />
                </button>
              </Container>
            </div>

            <Container className="flex flex-1 flex-col gap-1 overflow-y-auto py-8">
              {LANDING_NAV.map((item) => {
                const active = isActiveHref(router.pathname, hash, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-medium transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-primary/10",
                      active ? "text-[#008B8B]" : "text-muted-foreground",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-5 flex flex-col gap-3">
                <Button asChild size="lg" className="w-full">
                  <Link href="/signup">Get started for free</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
