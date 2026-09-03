import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function EmployersHeroSection() {
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
          <span className="font-semibold">For Employers</span>
        </Container>
      </div>

      <section className="bg-white pt-8 lg:pt-12">
        <Container>
          <motion.div
            className="mx-auto max-w-212.25 space-y-5 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="font-georgia text-[2.35rem] leading-[1.15] font-bold tracking-tight text-[#003F3F] lg:text-[56px] lg:leading-17.5">
              Empower your workforce without disrupting your payroll.
            </h1>
            <p className="mx-auto max-w-3xl font-sans text-base leading-8 text-muted-foreground sm:text-xl">
              EarlyPay helps employers give employees secure access to a portion
              of their earned wages while maintaining visibility and control
              over payroll, eligibility, attendance, and payday reconciliation.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <Button
                asChild
                size="xl"
                className="h-auto rounded-lg p-2.5 text-[16px] font-semibold has-[>svg]:px-2.5"
              >
                <Link href="/login">
                  Partner With EarlyPay
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outlineDark"
                size="xl"
                className="h-auto rounded-lg border-[#008B8B] p-2.5 text-[16px] font-semibold text-muted-foreground"
              >
                <Link href="#how-it-works">See How it works</Link>
              </Button>
            </div>
          </motion.div>
        </Container>

        <motion.div
          className="mt-10 flex justify-center px-5 sm:px-8 lg:mt-24"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src="/landing/employers/dashboard.png"
            alt="EarlyPay employer dashboard showing payroll visibility and workforce activity"
            width={734}
            height={330}
            className="h-auto w-full max-w-183.5"
          />
        </motion.div>
      </section>
    </>
  );
}
