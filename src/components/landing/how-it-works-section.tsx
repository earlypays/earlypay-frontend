"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { HOW_IT_WORKS_STEPS } from "@/lib/landing";
import { cn } from "@/lib/utils";

const STEP_COUNT = HOW_IT_WORKS_STEPS.length;

export function HowItWorksSection() {
  const pinRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      setMaxX(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start 80px", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 0.88], [0, -maxX]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      STEP_COUNT - 1,
      Math.max(0, Math.round(value * (STEP_COUNT - 1))),
    );
    setActiveIndex(next);
  });

  return (
    <section
      ref={pinRef}
      id="how-it-works"
      className={cn(
        "relative bg-hero",
        reduceMotion ? "py-16 lg:py-24" : "h-[520vh]",
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-center overflow-hidden bg-hero",
          reduceMotion
            ? "relative"
            : "sticky top-18 h-[calc(100dvh-4.5rem)] lg:top-20 lg:h-[calc(100dvh-5rem)]",
        )}
      >
        <Container className="shrink-0">
          <div className="max-w-145 space-y-4 font-georgia">
            <h2 className="font-serif text-3xl font-bold text-[#003F3F] sm:text-4xl lg:text-[3.2rem]">
              How EarlyPay works
            </h2>
            <p className="text-base text-muted-foreground sm:text-2xl">
              Your journey with EarlyPay starts here! Just follow these easy
              steps
            </p>
          </div>
        </Container>

        <div
          ref={viewportRef}
          className="relative mt-8 overflow-hidden lg:mt-10"
        >
          <motion.div
            ref={trackRef}
            style={reduceMotion ? undefined : { x }}
            className="flex w-max will-change-transform"
          >
            <div
              aria-hidden
              className={cn(
                "shrink-0",
                reduceMotion
                  ? "w-5 sm:w-8 lg:w-12"
                  : "w-[58vw] sm:w-[62vw] lg:w-[65vw]",
              )}
            />
            <ol className="relative flex w-max list-none gap-10 pb-4 [--step:240px] sm:gap-16 sm:[--step:280px] lg:gap-24 lg:[--step:320px]">
              <div
                aria-hidden
                className="absolute top-6 right-[calc(var(--step)*0.5)] left-[calc(var(--step)*0.5)] h-px bg-black/10"
              >
                <motion.div
                  className="h-full origin-left bg-heading"
                  style={{ scaleX: reduceMotion ? 1 : scrollYProgress }}
                />
              </div>

              {HOW_IT_WORKS_STEPS.map((step, index) => {
                const active = reduceMotion || index <= activeIndex;
                return (
                  <li
                    key={step.number}
                    className="relative w-(--step) shrink-0 text-center"
                  >
                    <div
                      className={cn(
                        "relative z-10 mx-auto flex size-14 items-center justify-center rounded-full text-[24px] font-semibold transition-colors duration-300",
                        active
                          ? "bg-heading text-white"
                          : "border-2 border-black/15 bg-white text-heading",
                      )}
                    >
                      {step.number}
                    </div>
                    <h3 className="mt-3.5 text-[20px] font-semibold text-heading">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </li>
                );
              })}
            </ol>
            <div
              aria-hidden
              className={cn(
                "shrink-0",
                reduceMotion
                  ? "w-5 sm:w-8 lg:w-12"
                  : "w-[70vw] sm:w-[72vw] lg:w-[75vw]",
              )}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
