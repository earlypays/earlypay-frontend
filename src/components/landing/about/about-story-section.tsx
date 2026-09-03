import { Container } from "@/components/ui/container";

const STORY_PARAGRAPHS = [
  "EarlyPay was created from a simple belief: people shouldn't always have to wait until payday to access money they have already worked for.",
  "Life doesn't always follow a schedule. Unexpected expenses, family responsibilities, emergencies, and important opportunities can arise at any time. For many employees, waiting until the end of the pay cycle can make managing these moments more difficult.",
  "We saw an opportunity to use technology to create a better way.",
  "EarlyPay gives eligible employees secure and flexible access to a portion of their earned wages before payday, while also helping them take care of essential expenses and manage their money with greater confidence. At the same time, we provide employers with the visibility and tools they need to support their workforce without losing control of their payroll processes.",
  "Our journey is about more than early access to earned wages. It's about creating a more transparent, flexible, and empowering financial experience for both employees and employers.",
  "As we grow, our mission remains clear: to build technology that gives people greater access, greater flexibility, and greater control over the money they have already earned.",
] as const;

export function AboutStorySection() {
  return (
    <section className="bg-white py-16 lg:py-24" data-aos="fade-up">
      <Container>
        <div className="mx-auto max-w-209">
          <h2 className="text-center font-georgia text-3xl leading-tight font-bold text-[#003F3F] sm:text-4xl lg:text-[3.2rem]">
            Our Story
          </h2>
          <p className="mt-4 text-center font-sans text-base text-muted-foreground sm:text-xl">
            Building a more flexible future for the money people earn.
          </p>

          <div className="mt-10 space-y-6 font-sans text-base leading-relaxed text-muted-foreground sm:mt-12 sm:text-lg sm:leading-8">
            {STORY_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
