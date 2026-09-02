import Head from "next/head";

import {
  EmployersAttendanceSection,
  EmployersCtaSection,
  EmployersHeroSection,
  EmployersManageSection,
  EmployersSetupSection,
  EmployersSupportSection,
} from "@/components/landing/employers";
import { APP_NAME } from "@/lib/constants";

export default function EmployersPage() {
  return (
    <>
      <Head>
        <title>For Employers | {APP_NAME}</title>
      </Head>
      <EmployersHeroSection />
      <EmployersSupportSection />
      <EmployersSetupSection />
      <EmployersManageSection />
      <EmployersAttendanceSection />
      <EmployersCtaSection />
    </>
  );
}
