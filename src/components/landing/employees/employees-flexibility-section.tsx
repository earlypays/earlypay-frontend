import { Container } from "@/components/ui/container";
import { EMPLOYEE_FEATURES } from "@/lib/landing";
import { cn } from "@/lib/utils";

export function EmployeesFlexibilitySection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-background py-8 lg:py-16"
    >
      <Container>
        <div className="mx-auto max-w-215.75 space-y-4 text-center">
          <h2 className="font-georgia text-3xl leading-tight font-bold text-[#003F3F] sm:text-4xl lg:text-[3.2rem]">
            Your work shouldn&apos;t
            <br />
            have to wait until payday.
          </h2>
          <p className="text-base leading-relaxed font-normal text-muted-foreground sm:text-xl">
            Unexpected expenses can happen at any time. EarlyPay gives you more
            flexibility by helping you access a portion of the money you&apos;ve
            already earned before your next payday.
          </p>
        </div>

        <ul className="mt-8 grid gap-5.5 sm:grid-cols-2">
          {EMPLOYEE_FEATURES.map((feature) => {
            const dark = feature.tone === "dark";
            return (
              <li
                key={feature.title}
                className={cn(
                  "rounded-md px-6.25 py-2.5",
                  dark
                    ? "bg-[#003F3F] text-white"
                    : "border border-[#003F3F] bg-white",
                )}
              >
                <h3
                  className={cn(
                    "font-sans text-lg font-semibold lg:text-xl",
                    dark ? "text-white" : "text-[#003F3F]",
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 text-[15px] leading-relaxed",
                    dark ? "text-white/90" : "text-muted-foreground",
                  )}
                >
                  {feature.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
