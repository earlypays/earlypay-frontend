import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_SHARP } from "@/lib/image-quality";

export function EmployeesHeroSection() {
  return (
    <>
      <div className="bg-hero">
        <Container className="flex h-30 items-center gap-2 font-sans text-[16px] leading-6 text-muted-foreground">
          <Link
            href="/"
            className="font-normal text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          >
            Home
          </Link>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          <span className="font-semibold">For Employees</span>
        </Container>
      </div>

      <section className="bg-background py-12 lg:py-16">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mb-10 space-y-5">
                <h1 className="font-georgia text-[2.35rem] leading-[1.15] font-bold tracking-tight text-muted-foreground lg:text-[56px] lg:leading-16">
                  Get more flexibility from the{" "}
                  <span className="text-[#008B8B]">
                    money you&apos;ve already earned.
                  </span>
                </h1>
                <p className="max-w-lg font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
                  EarlyPay gives eligible employees secure access to a portion
                  of their earned wages before payday, so you can handle
                  important expenses, withdraw funds, and pay essential bills
                  when you need to.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="xl"
                  className="rounded-lg p-2.5 text-[16px] font-semibold"
                >
                  <Link href="/login">
                    Get started for free
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outlineDark"
                  size="xl"
                  className="rounded-lg border-[#008B8B] p-2.5 text-[16px] font-semibold text-muted-foreground"
                >
                  <Link href="#how-it-works">See How it works</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <OptimizedImage
                src="/landing/employees/employee-hero.png"
                alt="EarlyPay employee app showing today's attendance and earnings"
                width={567}
                height={448}
                quality={IMAGE_QUALITY_SHARP}
                priority
                sizes="(max-width: 1024px) 90vw, 52vw"
                className="h-auto w-full"
              />
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
