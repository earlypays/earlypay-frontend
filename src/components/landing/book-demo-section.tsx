import Link from "next/link";

import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";

export function BookDemoSection() {
  return (
    <section
      id="book-demo"
      className="relative scroll-mt-24 overflow-hidden bg-[#1a1f1e]"
    >
      <div className="grid min-h-105 lg:min-h-120 lg:grid-cols-3">
        <div className="relative z-10 col-span-2 flex flex-col items-center justify-center space-y-4 px-5 py-16 text-center sm:px-10 lg:px-16 xl:px-24">
          <h2 className="font-serif text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-[3.5rem]">
            You&apos;ve earned it. Access it when you need it.
          </h2>
          <p className="text-base leading-relaxed font-normal text-white sm:text-xl">
            Get more flexibility with your earned wages and take care of
            life&apos;s important expenses before payday.
          </p>
          <div className="">
            <Button
              asChild
              size="lg"
              className="rounded-lg p-2.5 font-sans text-[16px] font-semibold text-[#FFFFFF]"
            >
              <Link href="/login">Book a Demo</Link>
            </Button>
          </div>
        </div>

        <div className="relative min-h-70 lg:min-h-full">
          <OptimizedImage
            src="/landing/cta-laptop.jpg"
            alt="Professional using a laptop in an office"
            fill
            quality={IMAGE_QUALITY_PHOTO}
            className="object-cover object-[center_20%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#1a1f1e] via-[#1a1f1e]/35 to-transparent lg:bg-linear-to-r lg:from-[#1a1f1e] lg:via-[#1a1f1e]/50 lg:to-transparent" />
        </div>
      </div>
    </section>
  );
}
