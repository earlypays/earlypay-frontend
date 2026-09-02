import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";
import { EMPLOYER_MANAGE_ITEMS } from "@/lib/landing";

export function EmployersManageSection() {
  return (
    <section className="bg-background py-16 lg:py-24" data-aos="fade-up">
      <Container>
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          <div className="relative aspect-[505/546] w-full max-w-[505px] shrink-0 overflow-hidden">
            <OptimizedImage
              src="/landing/employers/manage-keyboard.png"
              alt="Employer smiling at a desk while managing work on a computer"
              fill
              quality={IMAGE_QUALITY_PHOTO}
              className="object-cover object-center"
              sizes="505px"
            />
          </div>

          <div className="w-full flex-1">
            <h2 className="font-georgia text-3xl leading-tight font-bold text-[#003F3F] sm:text-4xl lg:text-[3.5rem]">
              Manage your employees with ease.
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[#48484A] sm:text-xl">
              Keep your employee information organized and maintain control over
              who can access earned wages.
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {EMPLOYER_MANAGE_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-1 text-sm font-medium text-[#003F3F] sm:text-base"
                >
                  <img
                    src="/landing/employers/icons/checkmark-badge.png"
                    alt=""
                    width={24}
                    height={24}
                    className="mt-0.5 size-6 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-3 text-base font-semibold text-[#008B8B] hover:opacity-80"
            >
              <span className="flex size-4 items-center justify-center rounded-full border border-[#008B8B] text-[#008B8B]">
                <ArrowRight className="size-3 font-bold text-[#008B8B]" />
              </span>
              Get started for free
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
