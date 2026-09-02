import { Lightbulb, Wallet } from "lucide-react";

import { Container } from "@/components/ui/container";
import Image from "next/image";

const SUMMARY_ROWS = [
  {
    label: "Monthly Salary",
    value: "₦300,000",
    icon: "/landing/employees/Wallet.svg",
  },
  {
    label: "Wages Earned",
    value: "₦150,000",
    icon: "/landing/employees/ChartLine.svg",
  },
  {
    label: "Maximum You Can Access",
    value: "₦75,000",
    icon: "/landing/employees/Clock.svg",
  },
] as const;

export function EmployeesAccessSection() {
  return (
    <section className="bg-background py-16 lg:py-24" data-aos="fade-up">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E6F3F3] px-3 py-2 text-sm font-medium text-[#008B8B]">
              <span className="size-2 rounded-full bg-primary" />
              Simple and Transparent
            </span>
            <h2 className="mt-5 font-georgia text-3xl leading-tight font-bold text-[#003F3F] sm:text-4xl lg:text-[3.5rem]">
              Know exactly what you can access.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              EarlyPay calculates your accessible amount based on the wages
              you&apos;ve already earned during your current pay cycle. Eligible
              employees can access up to{" "}
              <span className="font-semibold text-[#008B8B]">50%</span> of their
              earned wages.
            </p>

            <div className="mt-8 flex w-full max-w-108.25 items-start gap-4 rounded-md bg-[#EAECED] p-4 sm:p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#003F3F] text-white">
                <Lightbulb className="size-5" />
              </span>
              <div className="space-y-4">
                <h3 className="font-sans text-sm font-semibold text-[#48484A] sm:text-xl">
                  The 50% Access Rule
                </h3>
                <p className="text-sm leading-relaxed font-normal text-muted-foreground sm:text-base">
                  You can access up to 50% of the wages you have earned in the
                  current pay cycle.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-[0_12px_40px_rgba(16,70,64,0.08)] sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                Pay Cycle Summary
              </p>
              <span className="rounded-full bg-[#E6F3F3] px-3 py-1 text-[12px] font-medium text-[#008B8B]">
                Current Pay Cycle
              </span>
            </div>

            <ul className="mt-6">
              {SUMMARY_ROWS.map((row) => (
                <li key={row.label}>
                  <div className="flex w-full items-start gap-3.25">
                    <img
                      src={row.icon}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 shrink-0"
                    />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between rounded-md border border-[#C5C5C5] p-2.5">
                        <span className="flex-1 text-sm font-medium text-heading">
                          {row.label}
                        </span>
                        <span className="text-sm font-semibold text-heading">
                          {row.value}
                        </span>
                      </div>
                      <div className="flex justify-start py-1.5" aria-hidden>
                        <img
                          src="/landing/employees/arrow-down.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="size-6"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-4 rounded-md bg-[#EAECED] p-4 sm:p-5">
              <div className="flex items-start gap-2">
                <Image
                  src="/landing/employees/Wallet.svg"
                  alt="Wallet"
                  width={44}
                  height={44}
                />

                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#008B8B] sm:text-xl">
                      Available to access
                    </p>
                    <p className="text-lg font-semibold text-[#008B8B] sm:text-2xl">
                      ₦44,000
                    </p>
                  </div>
                  <p className="text-xs font-normal text-muted-foreground sm:text-base">
                    This is your current available balance
                  </p>
                  <div className="h-2 overflow-hidden rounded-full bg-white">
                    <div className="h-full w-[30%] rounded-full bg-[#008B8B]" />
                  </div>
                  <div className="flex items-center justify-between text-base font-normal">
                    <span className="text-[#008B8B]">30% used</span>
                    <span className="text-muted-foreground">70% Remaining</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
