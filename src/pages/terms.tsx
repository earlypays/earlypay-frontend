import Head from "next/head";

import { TermsSection } from "@/components/landing/terms-section";
import { APP_NAME } from "@/lib/constants";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>{`Terms of Use | ${APP_NAME}`}</title>
      </Head>
      <TermsSection />
    </>
  );
}
