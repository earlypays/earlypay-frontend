import Head from "next/head";

import {
  EmployeesAccessSection,
  EmployeesBalanceWaysSection,
  EmployeesCtaSection,
  EmployeesFlexibilitySection,
  EmployeesHeroSection,
} from "@/components/landing/employees";
import { APP_NAME } from "@/lib/constants";

export default function EmployeesPage() {
  return (
    <>
      <Head>
        <title>For Employees | {APP_NAME}</title>
      </Head>
      <EmployeesHeroSection />
      <EmployeesFlexibilitySection />
      <EmployeesBalanceWaysSection />
      <EmployeesAccessSection />
      <EmployeesCtaSection />
    </>
  );
}
