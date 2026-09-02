"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

import { Container } from "@/components/ui/container";
import { EMPLOYER_SETUP_STEPS } from "@/lib/landing";
import { cn } from "@/lib/utils";

const STEP_COUNT = EMPLOYER_SETUP_STEPS.length;

export function EmployersSetupSection() {
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
        <Container className="shrink-0" data-aos="fade-up">
          <div className="max-w-215.75 space-y-4">
            <h2 className="font-georgia text-3xl leading-tight font-bold text-[#003F3F] sm:text-4xl lg:text-[3.5rem]">
              Set up once. Manage with confidence.
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-2xl">
              EarlyPay works alongside your organization by using payroll and
              attendance information to calculate eligible employee access and
              provide clear visibility throughout every pay cycle.
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
                  className="h-full origin-left bg-[#003F3F]"
                  style={{ scaleX: reduceMotion ? 1 : scrollYProgress }}
                />
              </div>

              {EMPLOYER_SETUP_STEPS.map((step, index) => {
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
                          ? "bg-[#003F3F] text-white"
                          : "border-2 border-[#003F3F]/20 bg-white text-[#003F3F]",
                      )}
                    >
                      {step.number}
                    </div>
                    <h3 className="mt-4 font-sans text-[20px] font-semibold text-[#003F3F]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
