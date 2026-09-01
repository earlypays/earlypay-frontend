import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_SHARP } from "@/lib/image-quality";

export function HeroSection() {
  return (
    <section className="flex min-h-159 items-center bg-hero lg:min-h-157">
      <Container className="w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-[40px] space-y-5">
              <h1 className="font-georgia text-[2.35rem] leading-[1.15] font-bold tracking-tight text-heading lg:text-[55px] lg:leading-17.5">
                Access your earned wages before payday.
              </h1>
              <p className="max-w-lg font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
                You&apos;ve worked for it, so why wait until payday? EarlyPay
                gives eligible employees access to up to 50% of their earned
                wages, helping you handle important expenses when you need to.
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
                <Link href="/#how-it-works">See How it works</Link>
              </Button>
            </div>
            <p className="mt-4 text-[16px] font-normal text-muted-foreground">
              Start for free, cancel anytime.
            </p>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-170 lg:mx-0 lg:max-w-none lg:justify-self-end"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <OptimizedImage
              src="/landing/Hero-Mockup.svg"
              alt="EarlyPay dashboard"
              width={1600}
              height={1200}
              quality={IMAGE_QUALITY_SHARP}
              priority
              sizes="(max-width: 1024px) 90vw, 52vw"
              className="h-auto w-full drop-shadow-[0_24px_60px_rgba(16,70,64,0.16)]"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
