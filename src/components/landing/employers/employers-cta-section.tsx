import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";

export function EmployersCtaSection() {
  return (
    <section className="overflow-x-hidden bg-background py-10 lg:py-16" data-aos="fade-up">
      <Container>
        <div className="relative flex w-full flex-col overflow-hidden rounded-xl bg-[#112F39] lg:w-fit lg:flex-row lg:items-center">
          <div className="relative z-10 flex w-full flex-col justify-center items-center  text-center px-5 py-10 sm:px-8 lg:w-[691px] lg:shrink-0 lg:px-12 lg:py-0">
            <h2 className="font-georgia text-3xl leading-tight font-bold wrap-break-word text-white sm:text-4xl lg:text-[3.25rem]">
              Give your employees more flexibility. Keep your business in
              control.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
              Partner with EarlyPay to provide a smarter earned wage access
              experience for your workforce while maintaining visibility over
              payroll and employee activity.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="rounded-md h-auto p-2.5 text-[16px] font-semibold has-[>svg]:px-2.5"
              >
                <Link href="/login">
                  Partner With EarlyPay
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative aspect-[592/576] w-full max-w-[592px] shrink-0 overflow-hidden lg:h-[576px] lg:w-[592px] lg:max-w-none lg:aspect-auto">
            <OptimizedImage
              src="/landing/employers/cta-handshake.png"
              alt="Business handshake representing a partnership with EarlyPay"
              fill
              quality={IMAGE_QUALITY_PHOTO}
              className="object-cover object-center"
              sizes="592px"
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#112F39] via-[#112F39]/30 to-transparent lg:bg-linear-to-r lg:from-[#112F39] lg:via-[#112F39]/40 lg:to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
