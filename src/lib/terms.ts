import { FOOTER_EMAIL, CONTACT_PHONE } from "@/lib/routes";

export const TERMS_LAST_UPDATED = "13th July 2026";

export type TermClause = {
  id: string;
  text: string;
};

export type TermSection = {
  id: string;
  title: string;
  intro?: string;
  clauses?: TermClause[];
  bullets?: string[];
  paragraphs?: string[];
};

export const TERMS_SECTIONS: TermSection[] = [
  {
    id: "eligibility",
    title: "Eligibility and Account Registration",
    clauses: [
      {
        id: "1.1",
        text: "To use the Platform, you must provide accurate information, including your name, a valid email address, and a secure password. Employers must also provide valid organization and payroll details as requested during onboarding.",
      },
      {
        id: "1.2",
        text: "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.",
      },
      {
        id: "1.3",
        text: "Each email address may be associated with only one account unless EarlyPay expressly permits otherwise.",
      },
      {
        id: "1.4",
        text: "You must be at least 18 years of age to create an account. If you are registering on behalf of an organization, you confirm that you have authority to bind that organization to these Terms.",
      },
    ],
  },
  {
    id: "user-roles",
    title: "User Roles",
    clauses: [
      {
        id: "2.1",
        text: "Employees who have been enabled by their employer may view earned wages, request access to a portion of wages already earned, withdraw to a linked bank account, and pay for supported services, subject to eligibility and these Terms.",
      },
      {
        id: "2.2",
        text: "Employers may create an organization, add and manage employees, configure eligibility, provide payroll and attendance information, monitor activity, and suspend or restrict access where necessary.",
      },
      {
        id: "2.3",
        text: "EarlyPay may verify, adjust, or suspend any role or account where we reasonably believe these Terms have been breached or the integrity of the Platform is at risk.",
      },
    ],
  },
  {
    id: "earned-wage-access",
    title: "Earned Wage Access",
    clauses: [
      {
        id: "3.1",
        text: "EarlyPay allows eligible employees to access up to 50% of wages already earned in the current pay cycle, as determined from payroll and attendance information provided by the employer.",
      },
      {
        id: "3.2",
        text: "Access is only available for wages already earned. EarlyPay is not a loan, credit facility, or salary advance against future unearned wages.",
      },
      {
        id: "3.3",
        text: "Amounts accessed during a pay cycle are reconciled against the employee's regular salary at the end of that cycle. Employers remain responsible for payroll processing and deductions as applicable.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments",
    clauses: [
      {
        id: "4.1",
        text: "Withdrawals and bill payments on the Platform may be processed through third-party payment providers. EarlyPay does not store your full card or bank security details.",
      },
      {
        id: "4.2",
        text: "Available balances, limits, fees, and supported services are as displayed in the Platform at the time of a request.",
      },
      {
        id: "4.3",
        text: "You agree not to attempt to bypass, defraud, or manipulate payment, withdrawal, eligibility, or payroll reconciliation systems in any way.",
      },
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    intro: "By using the Platform, you agree that you will not:",
    bullets: [
      "Share your account credentials or allow another person to access the Platform using your account;",
      "Attempt to access employer, employee, payroll, or transaction data that you are not authorized to view;",
      "Submit false payroll, attendance, identity, or bank information;",
      "Upload or post any content that is unlawful, defamatory, obscene, harassing, discriminatory, or infringes the intellectual property or privacy rights of others;",
      "Attempt to interfere with, disrupt, reverse-engineer, or gain unauthorized access to the Platform, its servers, or related infrastructure;",
      "Use automated means (bots, scrapers) to access or extract data from the Platform without written permission;",
      "Use the Platform for money laundering, fraud, or any other unlawful purpose.",
    ],
  },
  {
    id: "attendance-payroll",
    title: "Attendance and Payroll Information",
    clauses: [
      {
        id: "6.1",
        text: "Employers may configure pay cycles, upload payroll information, and enable attendance features (including geo-fenced clock-in and clock-out) to support earned-wage calculations.",
      },
      {
        id: "6.2",
        text: "You must ensure that payroll, salary, and attendance information submitted to the Platform is accurate and up to date. EarlyPay relies on this information to determine eligibility and available amounts.",
      },
      {
        id: "6.3",
        text: "Employees must not falsify attendance records or attempt to inflate earned wages.",
      },
    ],
  },
  {
    id: "withdrawals",
    title: "Withdrawals and Bill Payments",
    clauses: [
      {
        id: "7.1",
        text: "Eligible employees may withdraw available funds to a linked bank account or use their balance for supported services such as airtime, data, electricity, TV subscriptions, and supported school fees.",
      },
      {
        id: "7.2",
        text: "Transaction outcomes depend on third-party processors, banks, and billers. EarlyPay is not responsible for delays or failures outside its reasonable control.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    clauses: [
      {
        id: "8.1",
        text: "The Platform, including its software, design, text, logos, and materials, is the property of EarlyPay or its licensors and is provided for your authorized use of the Platform only.",
      },
      {
        id: "8.2",
        text: "You may not copy, redistribute, resell, or publicly share Platform content without prior written permission from EarlyPay.",
      },
      {
        id: "8.3",
        text: "Information you submit (including payroll data, attendance records, and support messages) remains subject to your and your organization's rights, but by submitting it you grant EarlyPay a license to store, process, and use it to operate the Platform.",
      },
    ],
  },
  {
    id: "data-privacy",
    title: "Data and Privacy",
    clauses: [
      {
        id: "9.1",
        text: "Personal data (name, email, employment details, payroll information, attendance, and transactions) is collected and processed to operate the Platform, communicate with you, and complete earned wage access and bill payments.",
      },
      {
        id: "9.2",
        text: "We use third-party services as needed to operate the Platform, including payment processors and communications providers. These providers process data as necessary to perform their function.",
      },
      {
        id: "9.3",
        text: "We will not sell your personal data to third parties.",
      },
    ],
  },
  {
    id: "suspension",
    title: "Account Suspension and Termination",
    clauses: [
      {
        id: "10.1",
        text: "EarlyPay reserves the right to suspend or terminate your account, with or without notice, if you violate these Terms, engage in fraudulent activity, or misuse the Platform in a way that harms other users, employers, employees, or the integrity of payroll processes.",
      },
      {
        id: "10.2",
        text: `You may request account deletion at any time by contacting ${FOOTER_EMAIL}. Certain records (for example payment and payroll history) may be retained as required by law or for reconciliation and verification purposes.`,
      },
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers and Limitation of Liability",
    clauses: [
      {
        id: "11.1",
        text: 'The Platform is provided "as is." While we strive for continuous availability, EarlyPay does not guarantee uninterrupted or error-free access.',
      },
      {
        id: "11.2",
        text: "EarlyPay is not liable for indirect, incidental, or consequential damages arising from your use of the Platform, to the maximum extent permitted by applicable law.",
      },
      {
        id: "11.3",
        text: "EarlyPay is not a bank, lender, or employer. Access to earned wages depends on employer participation, eligibility, attendance, and payroll data. Employment outcomes and payroll decisions remain the responsibility of the employer.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. Continued use of the Platform after changes take effect constitutes acceptance of the revised Terms. Material changes will be communicated via email or an in-app notice.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from your use of the Platform shall be subject to the exclusive jurisdiction of the courts of Nigeria.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      `For questions about these Terms, please contact EarlyPay at ${FOOTER_EMAIL} or ${CONTACT_PHONE}.`,
    ],
  },
];
