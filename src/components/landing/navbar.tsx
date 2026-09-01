"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { LANDING_NAV } from "@/lib/routes";
import { cn } from "@/lib/utils";

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
                    "relative text-[16px] font-semibold transition-colors hover:text-[#008B8B]",
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
              <Link href="/login">Get started for free</Link>
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

      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto bg-hero lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-6">
            {LANDING_NAV.map((item) => {
              const active = isActiveHref(router.pathname, hash, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10",
                    active ? "text-[#008B8B]" : "text-muted-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/login">Get started for free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </>
  );
}
