import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";

const AUDIENCE_CARDS = [
  {
    id: "employees",
    title: "For Employees",
    description:
      "Access a portion of your earned wages before payday and pay for essential services with ease.",
    href: "/#how-it-works",
    linkLabel: "Explore Employee Benefits",
    image: "/landing/employees-office.jpg",
    imageAlt:
      "Team of professionals collaborating around a laptop in an office",
  },
  {
    id: "employers",
    title: "For Employers",
    description:
      "Give your employees greater financial flexibility while maintaining visibility and control over payroll advances.",
    href: "/#book-demo",
    linkLabel: "Explore Employer Benefits",
    image: "/landing/employers-office.jpg",
    imageAlt: "Two colleagues meeting at a desk in a bright office",
  },
] as const;

export function AudienceSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-background py-16 lg:py-24">
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="w-full max-w-109.75">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E6F3F3] p-2.5 text-[16px] font-normal text-[#008B8B]">
              <span className="size-2 rounded-full bg-primary" />
              Your earnings, when you need them.
            </span>
            <h2 className="mt-5 font-sans text-3xl leading-tight font-semibold tracking-tight text-heading uppercase sm:text-[20px] lg:text-[24px]">
              One platform, more financial flexibility
            </h2>
          </div>
          <div className="">
            <p className="font-sans text-[16px] leading-relaxed font-normal text-muted-foreground sm:text-[20px]">
              A simple and secure platform that helps employees access their
              earned wages before payday, pay essential bills, and manage their
              money with greater flexibility.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-4 rounded-md p-2.5 text-[16px] font-semibold text-[#FFFFFF]"
            >
              <Link href="/login">
                Get started for free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:mt-16 lg:grid-cols-2">
          {AUDIENCE_CARDS.map((card) => (
            <article
              key={card.id}
              id={card.id}
              className="scroll-mt-28 space-y-4 rounded-md border border-black/5 bg-white p-4 shadow-[0_12px_40px_rgba(16,70,64,0.08)] sm:p-6.25"
            >
              <h3 className="text-[24px] font-semibold text-muted-foreground">
                {card.title}
              </h3>
              <p className="max-w-md text-[10px] leading-relaxed font-normal text-muted-foreground sm:text-[16px]">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#008B8B] hover:opacity-80"
              >
                {card.linkLabel}
                <ArrowRight className="size-4" />
              </Link>
              <div className="relative mt-6 aspect-16/10 overflow-hidden rounded-md">
                <OptimizedImage
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  quality={IMAGE_QUALITY_PHOTO}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
