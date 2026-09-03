import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PRIVACY_DEFINITIONS, PRIVACY_LAST_UPDATED } from "@/lib/privacy";

export function PrivacySection() {
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
          <span className="font-semibold">Privacy Policy</span>
        </Container>
      </div>

      <section className="bg-white py-12 lg:py-16" data-aos="fade-up">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-georgia text-[2.35rem] leading-[1.15] font-bold tracking-tight text-[#003F3F] lg:text-[56px] lg:leading-16">
              Privacy Policy
            </h1>
            <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
              At EarlyPay, we are committed to protecting your personal
              information and being transparent about how we collect, use,
              store, and protect your data.
            </p>
          </div>

          <article className="mx-auto mt-12 max-w-4xl lg:mt-16">
            <p className="font-sans text-sm text-muted-foreground sm:text-base">
              Last Updated: {PRIVACY_LAST_UPDATED}
            </p>

            <h2 className="mt-8 font-sans text-2xl font-bold text-[#003F3F] sm:text-[2rem]">
              Your privacy matters to us.
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
              This Privacy Policy explains how EarlyPay handles your information
              when you use our website, platform, and related services.
            </p>

            <div className="mt-12 space-y-12">
              <section>
                <h3 className="font-sans text-xl font-bold text-[#003F3F] sm:text-2xl">
                  1. Information We Collect
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                  When you visit the EarlyPay website or use our Platform, we
                  collect information you provide to us and information
                  generated through your use of the service. This may include
                  account details, employment and payroll information needed to
                  provide earned wage access, transaction records, and technical
                  data such as device and usage information. It is your
                  responsibility to enquire with us directly to ascertain the
                  accuracy and adequacy of the information you seek to rely
                  upon.
                </p>
              </section>

              <section>
                <h3 className="font-sans text-xl font-bold text-[#003F3F] sm:text-2xl">
                  2. Definitions and Key Terms
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                  The following definitions apply for the privacy policy, terms
                  and conditions, and other agreements.
                </p>
                <dl className="mt-4 space-y-3 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                  {PRIVACY_DEFINITIONS.map((item) => (
                    <div key={item.term}>
                      <dt className="inline font-semibold text-[#003F3F]">
                        {item.term}:
                      </dt>{" "}
                      <dd className="inline">{item.text}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section>
                <h3 className="font-sans text-xl font-bold text-[#003F3F] sm:text-2xl">
                  3. Privacy
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                  We are committed to the user&apos;s privacy. Use of the
                  website, data and other information or material about you are
                  subject to this privacy policy, which explains how we use the
                  information submitted.
                </p>
              </section>

              <section>
                <h3 className="font-sans text-xl font-bold text-[#003F3F] sm:text-2xl">
                  4. Intellectual Property
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                  The information and materials on this website is owned and
                  licensed to us. This material includes, but is not limited to
                  the layout, design, look and graphics, and is protected by
                  Nigeria and international copyright, trademark and any other
                  intellectual property laws. Reproducing or modifying these
                  contents is prohibited and should not be done without
                  permission from us which forms parts of these terms and
                  conditions.
                </p>
              </section>

              <section>
                <h3 className="font-sans text-xl font-bold text-[#003F3F] sm:text-2xl">
                  5. Copyright and Infringement Notice
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                  All materials reproduced in this website, which are the
                  property of the owner, are acknowledged on the website.
                </p>
              </section>

              <section>
                <h3 className="font-sans text-xl font-bold text-[#003F3F] sm:text-2xl">
                  6. Updates to our Privacy Policy
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                  Services and policies of this website may be changed, and
                  improvements to the features of the services may be done from
                  time to time.
                </p>
              </section>

              <section>
                <h3 className="font-georgia text-2xl font-bold text-[#003F3F] sm:text-[2rem]">
                  Book a Demo
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
                  Do you feel the need to call? Have any questions or
                  recommendations about our service please endeavour to{" "}
                  <Link
                    href="/book-demo"
                    className="font-medium text-[#008B8B] hover:underline"
                  >
                    Book a Demo
                  </Link>
                </p>
              </section>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
