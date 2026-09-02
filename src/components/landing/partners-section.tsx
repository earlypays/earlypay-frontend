import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_SHARP } from "@/lib/image-quality";
import { BILL_PARTNERS } from "@/lib/landing";
import { cn } from "@/lib/utils";

type Partner = (typeof BILL_PARTNERS)[number];

const ROW_FORWARD: Partner[] = [...BILL_PARTNERS];
const ROW_REVERSE: Partner[] = [...BILL_PARTNERS].reverse();

function PartnerCard({ name, src }: Partner) {
  return (
    <div className="flex h-24 w-40 shrink-0 items-center justify-center rounded-md bg-white px-4 shadow-[0_8px_24px_rgba(16,70,64,0.08)]">
      <OptimizedImage
        src={src}
        alt={name}
        width={160}
        height={80}
        quality={IMAGE_QUALITY_SHARP}
        className="h-12 w-auto max-w-full object-contain"
      />
    </div>
  );
}

function PartnerMarquee({
  partners,
  reverse = false,
}: {
  partners: Partner[];
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={cn(
          "flex w-max hover:paused motion-reduce:animate-none",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex gap-4 pr-4" aria-hidden={copy === 1}>
            {partners.map((partner) => (
              <li key={`${copy}-${partner.name}`}>
                <PartnerCard {...partner} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function PartnersSection() {
  return (
    <section className="bg-background py-16 lg:py-24" data-aos="fade-up">
      <Container>
        <div className="space-y-4 text-center">
          <h2 className="font-georgia text-[46px] font-bold text-[#003F3F] sm:text-[56px]">
            Your earned wages can do more.
          </h2>
          <p className="text-[16px] font-normal text-[#48484A] sm:text-[20px]">
            Use your available EarlyPay balance to take care of important
            everyday expenses.
          </p>
        </div>
      </Container>

      <div className="mt-8 space-y-6">
        <PartnerMarquee partners={ROW_FORWARD} />
        <PartnerMarquee partners={ROW_REVERSE} reverse />
      </div>
    </section>
  );
}
