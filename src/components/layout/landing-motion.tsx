"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import AOS from "aos";
import { ReactLenis, useLenis } from "lenis/react";
import "aos/dist/aos.css";

import "lenis/dist/lenis.css";

const ANCHOR_OFFSET = 80;
const SCROLL_DURATION = 1.25;

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

const LENIS_OPTIONS = {
  duration: SCROLL_DURATION,
  easing: easeOutQuart,
  lerp: 0.085,
  smoothWheel: true,
  autoRaf: true,
  anchors: false,
};

function AosSync() {
  const router = useRouter();
  const lenis = useLenis();

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    AOS.init({
      disable: reduce,
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 72,
      delay: 40,
    });

    const refresh = () => AOS.refreshHard();
    requestAnimationFrame(refresh);

    router.events.on("routeChangeComplete", refresh);
    return () => {
      router.events.off("routeChangeComplete", refresh);
    };
  }, [router.events]);

  useEffect(() => {
    if (!lenis) return;

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash) return;

      const el = document.querySelector(url.hash);
      if (!(el instanceof HTMLElement)) return;

      event.preventDefault();
      lenis.scrollTo(el, {
        offset: -ANCHOR_OFFSET,
        duration: SCROLL_DURATION,
        easing: easeOutQuart,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [lenis]);

  return null;
}

export function LandingMotion({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <AosSync />
      <motion.div
        key={router.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </ReactLenis>
  );
}
