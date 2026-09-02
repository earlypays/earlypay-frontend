import { Container } from "@/components/ui/container";
import { EMPLOYER_SETUP_STEPS } from "@/lib/landing";
import { cn } from "@/lib/utils";

export function EmployersSetupSection() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-hero py-6 lg:py-11.75">
      <Container>
        <div className="max-w-215.75 space-y-4">
          <h2 className="font-georgia text-3xl leading-tight font-bold text-[#003F3F] sm:text-4xl lg:text-[3.5rem]">
            Set up once. Manage with confidence.
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-2xl">
            EarlyPay works alongside your organization by using payroll and
            attendance information to calculate eligible employee access and
            provide clear visibility throughout every pay cycle.
          </p>
        </div>

        <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div
            aria-hidden
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-[#008B8B]/30 lg:block"
          />
          {EMPLOYER_SETUP_STEPS.map((step, index) => {
            const active = index === 0;
            return (
              <li key={step.number} className="relative text-center">
                <div
                  className={cn(
                    "relative z-10 mx-auto flex size-14 items-center justify-center rounded-full text-[24px] font-semibold",
                    active
                      ? "bg-[#003F3F] text-white"
                      : "border-2 border-[#003F3F]/20 bg-white text-[#003F3F]",
                  )}
                >
                  {step.number}
                </div>
                <h3 className="mt-4 font-sans text-[20px] font-semibold text-[#003F3F]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
