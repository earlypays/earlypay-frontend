import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";

export function EmployeesCtaSection() {
  return (
    <section className="bg-[#003F3F] py-10 lg:py-16">
      <Container>
        <div className="relative min-h-80 overflow-hidden rounded-md lg:min-h-96">
          <div className="absolute inset-0 lg:left-[32%]">
            <OptimizedImage
              src="/landing/employees/cta-office.jpg"
              alt="Professional smiling at a laptop in an office"
              fill
              quality={IMAGE_QUALITY_PHOTO}
              className="object-cover object-[center_15%]"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-[#003B36] via-[#003B36]/75 to-[#003B36]/20 lg:bg-linear-to-r lg:from-[#003B36] lg:from-35% lg:via-[#003B36]/70 lg:to-transparent" />

          <div className="relative z-10 flex max-w-xl flex-col justify-center px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <h2 className="font-georgia text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-[3.25rem]">
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
        </div>
      </Container>
    </section>
  );
}
