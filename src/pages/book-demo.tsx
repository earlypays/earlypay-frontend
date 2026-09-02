import Head from "next/head";

import { BookDemoContactSection } from "@/components/landing/book-demo-contact-section";
import { APP_NAME } from "@/lib/constants";

export default function BookDemoPage() {
  return (
    <>
      <Head>
        <title>Book a Demo | {APP_NAME}</title>
      </Head>
      <BookDemoContactSection />
    </>
  );
}
