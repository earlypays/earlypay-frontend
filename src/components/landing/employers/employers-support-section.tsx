import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";
import { EMPLOYER_SUPPORT_FEATURES } from "@/lib/landing";

export function EmployersSupportSection() {
  return (
    <section className="bg-background py-16 lg:py-16" data-aos="fade-up">
      <Container>
        <div className="mx-auto w-full max-w-217 space-y-4 text-center">
          <h2 className="mx-auto w-full max-w-157 font-georgia text-3xl leading-tight font-bold text-[#003F3F] sm:text-4xl lg:text-[3.2rem]">
            A better way to support your employees.
          </h2>
          <p className="text-base leading-relaxed font-normal text-muted-foreground sm:text-xl">
            Financial flexibility can make a meaningful difference to your
            employees. EarlyPay gives your team access to wages they have
            already earned while providing your organization with the tools
            needed to maintain clear payroll oversight.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-start gap-2 lg:flex-row lg:gap-5.5">
          <div className="relative aspect-400/532 w-full max-w-100 shrink-0 overflow-hidden rounded-md">
            <OptimizedImage
              src="/landing/employers/support-tablet.png"
              alt="Smiling professional reviewing information on a tablet"
              fill
              quality={IMAGE_QUALITY_PHOTO}
              className="object-cover object-center"
              sizes="400px"
            />
          </div>

          <ul className="grid w-full flex-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:min-h-133">
            {EMPLOYER_SUPPORT_FEATURES.map((feature) => (
              <li
                key={feature.title}
                className="w-full max-w-99.5 space-y-4 text-left"
              >
                <img
                  src={feature.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="size-14"
                />
                <h3 className="font-sans text-lg font-semibold text-muted-foreground lg:text-2xl">
                  {feature.title}
                </h3>
                <p className="text-justify font-sans text-sm leading-relaxed font-normal text-muted-foreground sm:text-xl">
                  {feature.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
