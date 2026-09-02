import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";

export function EmployersCtaSection() {
  return (
    <section
      className="w-full overflow-x-hidden bg-[#112F39]"
      data-aos="fade-up"
    >
      <div className="flex w-full flex-col lg:flex-row lg:items-stretch">
        <div className="relative z-10 flex min-w-0 flex-1 flex-col items-center justify-center px-5 py-10 text-center sm:px-8 lg:px-16 lg:py-16">
          <h2 className="max-w-172.75 font-georgia text-3xl leading-tight font-bold wrap-break-word text-white sm:text-4xl lg:text-[3.25rem]">
            Give your employees more flexibility. Keep your business in control.
          </h2>
          <p className="mt-5 max-w-172.75 text-base leading-relaxed text-white/80 sm:text-lg">
            Partner with EarlyPay to provide a smarter earned wage access
            experience for your workforce while maintaining visibility over
            payroll and employee activity.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="h-auto rounded-md p-2.5 text-[16px] font-semibold has-[>svg]:px-2.5"
            >
              <Link href="/login">
                Partner With EarlyPay
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative aspect-592/576 w-full shrink-0 overflow-hidden lg:aspect-auto lg:h-auto lg:min-h-144 lg:w-148">
          <OptimizedImage
            src="/landing/employers/cta-handshake.png"
            alt="Business handshake representing a partnership with EarlyPay"
            fill
            quality={IMAGE_QUALITY_PHOTO}
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 592px"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#112F39] via-[#112F39]/30 to-transparent lg:bg-linear-to-r lg:from-[#112F39] lg:via-[#112F39]/40 lg:to-transparent" />
        </div>
      </div>
    </section>
  );
}
