import { Container } from "@/components/ui/container";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { IMAGE_QUALITY_PHOTO } from "@/lib/image-quality";

export function AboutFounderSection() {
  return (
    <section className="bg-hero py-16 lg:py-24" data-aos="fade-up">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <div className="relative mx-auto aspect-square w-full max-w-105 overflow-hidden rounded-2xl lg:mx-0">
            <OptimizedImage
              src="/landing/about/founder.png"
              alt="Portrait of EarlyPay leadership"
              fill
              quality={IMAGE_QUALITY_PHOTO}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 90vw, 420px"
            />
          </div>

          <div className="max-w-2xl">
            <p className="font-sans text-base leading-relaxed text-muted-foreground sm:text-2xl sm:leading-9">
              &ldquo;EarlyPay was built on a simple belief: if you&apos;ve
              earned the money, you should have more flexibility in accessing
              it. We&apos;re using technology to give employees greater
              financial control while helping employers better support their
              workforce.&rdquo;
            </p>
            <p className="mt-6 font-sans text-base font-semibold text-muted-foreground sm:text-xl">
              — Anthony Ikechukwu Ohanyerem
            </p>
            <p className="mt-1 font-sans text-sm text-muted-foreground sm:text-base">
              Founder of EarlyPay
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
