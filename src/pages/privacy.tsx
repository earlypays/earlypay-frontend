import Head from "next/head";

import { PrivacySection } from "@/components/landing/privacy-section";
import { APP_NAME } from "@/lib/constants";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>{`Privacy Policy | ${APP_NAME}`}</title>
      </Head>
      <PrivacySection />
    </>
  );
}
