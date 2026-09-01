import { Container } from "@/components/ui/container";
import { CONTROL_FEATURES } from "@/lib/landing";

export function ControlFeaturesSection() {
  return (
    <section className="bg-background py-8 lg:py-16">
      <Container>
        <div className="mx-auto max-w-172.25 space-y-4 text-center">
          <h2 className="font-georgia text-3xl font-bold text-[#003F3F] sm:text-4xl lg:text-[3.2rem]">
            More control over <br /> the money you&apos;ve earned.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Life doesn&apos;t always wait for payday. EarlyPay gives you more
            flexibility to manage important expenses without waiting until the
            end of your pay cycle.
          </p>
        </div>

        <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {CONTROL_FEATURES.map((feature) => (
            <li key={feature.number} className="text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#003F3F] text-2xl font-semibold text-white">
                {feature.number}
              </span>
              <h3 className="mt-6 font-sans text-lg font-semibold text-[#48484A] lg:text-2xl">
                {feature.title}
              </h3>
              <p className="mt-4 font-sans text-[16px] leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
