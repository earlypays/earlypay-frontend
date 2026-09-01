import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";
import { EMPLOYEE_BALANCE_WAYS } from "@/lib/landing";

export function EmployeesBalanceWaysSection() {
  return (
    <section className="bg-background">
      <Container>
        <div className="mx-auto max-w-208.5 space-y-4 text-center">
          <h2 className="font-georgia text-3xl leading-tight font-bold text-[#003F3F] sm:text-4xl lg:text-[3.2rem]">
            Two Ways to Use Your Balance
          </h2>
          <p className="text-base leading-relaxed font-normal text-muted-foreground sm:text-xl">
            When you have an available earned-wage balance, you can choose the
            option that works best for your immediate needs.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {EMPLOYEE_BALANCE_WAYS.map((way) => (
            <article
              key={way.title}
              className="overflow-hidden rounded-md bg-white p-6.25 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
            >
              <div className="space-y-4">
                <h3 className="font-sans text-lg font-semibold text-heading lg:text-xl">
                  {way.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {way.description}
                </p>
              </div>
              <div className="relative mt-6 aspect-16/10 overflow-hidden rounded-xl">
                <OptimizedImage
                  src={way.image}
                  alt={way.imageAlt}
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
