import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";

export function AboutHeroSection() {
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
          <span className="font-semibold">About</span>
        </Container>
      </div>

      <section className="bg-white py-12 lg:py-16">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              className="max-w-161.25"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <h1 className="font-georgia text-[2.35rem] leading-[1.15] font-bold tracking-tight text-[#003F3F] lg:text-[56px] lg:leading-16">
                We&apos;re making earned wage access simple, secure, and
                flexible.
              </h1>
              <p className="mt-5 font-sans text-base leading-relaxed text-muted-foreground sm:text-[20px]">
                EarlyPay is built to give employees greater financial
                flexibility by providing secure access to a portion of the wages
                they have already earned before payday. At the same time, we
                help employers maintain visibility and control over payroll,
                employee eligibility, and workforce activity.
              </p>
            </motion.div>

            <motion.div
              className="relative mx-auto w-full max-w-xl pb-10 lg:mx-0 lg:max-w-none lg:pb-16"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                aria-hidden
                className="absolute -top-6 -right-4 size-36 rounded-full bg-[#E6EBEB] sm:size-48 lg:-right-8 lg:size-56"
              />
              <div
                aria-hidden
                className="absolute -bottom-2 -left-6 size-28 rounded-full bg-[#EEF1F1] sm:size-40 lg:-left-10"
              />

              <div className="relative overflow-hidden rounded-4xl">
                <div className="relative aspect-4/5 w-full">
                  <OptimizedImage
                    src="/landing/about/hero.png"
                    alt="Professional in a suit standing with arms crossed"
                    fill
                    priority
                    quality={IMAGE_QUALITY_PHOTO}
                    className="object-cover object-[center_18%]"
                    sizes="(max-width: 1024px) 90vw, 480px"
                  />
                </div>
              </div>

              <div className="relative z-10 mx-4 -mt-14 max-w-100 rounded-2xl bg-white px-5.5 py-4 shadow-[0_12px_40px_rgba(16,70,64,0.12)] sm:p-5 lg:absolute lg:-right-4 lg:-bottom-4 lg:mx-0 lg:mt-0">
                <div className="flex items-start gap-2.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E6F3F3]">
                    <ShieldCheck className="size-5 text-[#008B8B]" />
                  </span>
                  <p className="pt-1 font-sans text-base leading-snug font-bold text-muted-foreground">
                    Secure. Transparent. Employee focused
                  </p>
                </div>
                <p className="mt-3 font-sans text-xs leading-relaxed text-muted-foreground sm:text-base">
                  We are committed to building a trusted financial experience
                  that gives people more confidence and flexibility with the
                  money they have already earned.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
