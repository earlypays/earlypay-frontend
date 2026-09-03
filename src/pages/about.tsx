import Head from "next/head";

import {
  AboutFounderSection,
  AboutHeroSection,
  AboutMissionSection,
  AboutStorySection,
} from "@/components/landing/about";
import { APP_NAME } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>{`About | ${APP_NAME}`}</title>
      </Head>
      <AboutHeroSection />
      <AboutMissionSection />
      <AboutFounderSection />
      <AboutStorySection />
    </>
  );
}
