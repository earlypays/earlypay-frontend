import { Container } from "@/components/ui/container";

export function AboutMissionSection() {
  return (
    <section className="bg-white pb-16 lg:pb-24" data-aos="fade-up">
      <Container>
        <h2 className="text-center font-georgia text-3xl leading-tight font-bold text-[#003F3F] sm:text-4xl lg:text-[3.5rem]">
          Our Mission
        </h2>
        <div className="mx-auto mt-8 max-w-full border-l-[5px] border-[#008B8B] pl-5 sm:pl-8 lg:mt-10">
          <p className="font-sans text-base leading-relaxed font-normal text-muted-foreground sm:text-xl sm:leading-8">
            To make earned wage access simple, secure, and accessible—helping
            employees gain more financial flexibility while enabling employers
            to support their workforce with greater visibility and control.
          </p>
        </div>
      </Container>
    </section>
  );
}
