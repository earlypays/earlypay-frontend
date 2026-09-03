import Link from "next/link";
import { ArrowUp, ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { TERMS_LAST_UPDATED, TERMS_SECTIONS } from "@/lib/terms";

export function TermsSection() {
  return (
    <>
      <div id="top" className="bg-hero">
        <Container className="flex h-30 items-center gap-2 font-sans text-[16px] leading-6 text-muted-foreground">
          <Link
            href="/"
            className="font-normal text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          >
            Home
          </Link>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          <span className="font-semibold">Terms of use</span>
        </Container>
      </div>

      <section className="bg-white py-12 lg:py-16" data-aos="fade-up">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-georgia text-[2.35rem] leading-[1.15] font-bold tracking-tight text-[#003F3F] lg:text-[56px] lg:leading-16">
              Terms of Acceptable Use
            </h1>
            <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
              Please read the legal information about EarlyPay to ensure you are
              under the terms of use.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_16.5rem] lg:gap-16">
            <article className="min-w-0">
              <p className="font-sans text-base font-semibold text-muted-foreground sm:text-lg">
                Last updated: {TERMS_LAST_UPDATED}
              </p>
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                <p>
                  Welcome to EarlyPay. These Terms of Acceptable Use
                  (&ldquo;Terms&rdquo;) govern your registration and use of the
                  EarlyPay earned wage access platform (the
                  &ldquo;Platform&rdquo;).
                </p>
                <p>
                  By creating an account or using the Platform, you confirm that
                  you have read, understood, and agree to be bound by these
                  Terms. If you do not agree, you must not use the Platform.
                </p>
              </div>

              <div className="mt-12 space-y-12">
                {TERMS_SECTIONS.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <h2 className="font-georgia text-xl font-bold text-[#003F3F] sm:text-2xl">
                      {index + 1}. {section.title}
                    </h2>
                    {section.intro ? (
                      <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                        {section.intro}
                      </p>
                    ) : null}
                    {section.clauses ? (
                      <div className="mt-4 space-y-4">
                        {section.clauses.map((clause) => (
                          <p
                            key={clause.id}
                            className="font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8"
                          >
                            <span className="font-medium">{clause.id} </span>
                            {clause.text}
                          </p>
                        ))}
                      </div>
                    ) : null}
                    {section.bullets ? (
                      <ul className="mt-4 list-disc space-y-3 pl-8 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                        {section.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {section.paragraphs ? (
                      <div className="mt-4 space-y-4">
                        {section.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 40)}
                            className="font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </section>
                ))}
              </div>
            </article>

            <aside className="order-first lg:sticky lg:top-28 lg:order-last">
              <h2 className="font-sans text-lg font-semibold text-[#48484A] sm:text-xl">
                Table of contents
              </h2>
              <div className="relative mt-5">
                <ol
                  data-lenis-prevent
                  className="max-h-48 space-y-4 overflow-y-auto overscroll-contain font-sans text-sm text-[#48484A] sm:text-base"
                >
                  {TERMS_SECTIONS.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block transition-colors hover:text-[#008B8B]"
                      >
                        {index + 1}. {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-white to-transparent"
                />
              </div>
              <div className="mt-6 border-t border-[#E6E6E6] pt-5">
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium text-[#008B8B] hover:opacity-80 sm:text-base"
                >
                  <ArrowUp className="size-4" />
                  Back to top
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
