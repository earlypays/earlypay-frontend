import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_SHARP } from "@/lib/image-quality";
import { EMPLOYER_ATTENDANCE_FEATURES } from "@/lib/landing";

export function EmployersAttendanceSection() {
  return (
    <section className="bg-background py-8 lg:py-16" data-aos="fade-up">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-georgia text-3xl leading-tight font-bold text-[#003F3F] sm:text-4xl lg:text-[3.2rem]">
              Track attendance when you need to.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              For organizations without existing HR software, EarlyPay can
              provide employee clock-in and clock-out functionality with
              location verification.
            </p>

            <ul className="mt-8 space-y-4">
              {EMPLOYER_ATTENDANCE_FEATURES.map((feature) => (
                <li key={feature.title} className="flex items-start gap-3">
                  <img
                    src="/landing/employers/icons/checkmark-badge.png"
                    alt=""
                    width={24}
                    height={24}
                    className="mt-0.5 size-6 shrink-0"
                  />
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-[#003F3F] sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base font-normal">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <OptimizedImage
              src="/landing/employers/attendance-globe.png"
              alt="Illustration of geo-fenced attendance tracking across locations"
              width={709}
              height={595}
              quality={IMAGE_QUALITY_SHARP}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
