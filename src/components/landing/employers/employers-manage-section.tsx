import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";
import { EMPLOYER_MANAGE_ITEMS } from "@/lib/landing";

function FeatureCheck() {
  return (
    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#E6F3F3] text-[#008B8B]">
      <Check className="size-3.5" strokeWidth={2.75} />
    </span>
  );
}

export function EmployersManageSection() {
  return (
    <section className="bg-background py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl lg:aspect-[5/6]">
            <OptimizedImage
              src="/landing/employers/manage-keyboard.png"
              alt="Employer smiling at a desk while managing work on a computer"
              fill
              quality={IMAGE_QUALITY_PHOTO}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <h2 className="font-georgia text-3xl leading-tight font-bold text-[#003F3F] sm:text-4xl lg:text-[3.2rem]">
              Manage your employees with ease.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Keep your employee information organized and maintain control over
              who can access earned wages.
            </p>

            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {EMPLOYER_MANAGE_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-medium text-[#003F3F] sm:text-base"
                >
                  <FeatureCheck />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-3 text-base font-semibold text-[#008B8B] hover:opacity-80"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-[#008B8B] text-white">
                <ArrowRight className="size-4" />
              </span>
              Get started for free
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
