import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";

export function EmployeesCtaSection() {
  return (
    <section
      className="overflow-x-hidden bg-[#003F3F] py-10 lg:py-16"
      data-aos="fade-up"
    >
      <Container>
        <div className="relative mx-auto flex min-h-112.5 w-full max-w-310 flex-col overflow-hidden rounded-xl bg-[#112F39] lg:flex-row">
          <div className="relative z-10 flex w-full min-w-0 flex-col justify-center px-5 py-10 sm:px-8 lg:max-w-xl lg:shrink-0 lg:px-12 lg:py-12">
            <h2 className="font-georgia text-3xl leading-tight font-bold wrap-break-word text-white sm:text-4xl lg:text-[3.25rem]">
              You&apos;ve already earned it. Now get more flexibility from it.
            </h2>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="rounded-md p-2.5 text-[16px] font-semibold"
              >
                <Link href="/login">Create an Account</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-56 w-full min-w-0 sm:h-72 lg:h-auto lg:min-h-112.5 lg:flex-1">
            <OptimizedImage
              src="/landing/employees/cta-office.png"
              alt="Professional smiling at a laptop in an office"
              fill
              quality={IMAGE_QUALITY_PHOTO}
              className="object-cover object-[center_20%] lg:object-left"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#112F39] via-[#112F39]/30 to-transparent lg:bg-linear-to-r lg:from-[#112F39] lg:via-[#112F39]/40 lg:to-transparent" />
          </div>
        </div>
      </Container>
    </section>
  );
}
