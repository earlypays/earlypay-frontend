import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { APP_NAME } from "@/lib/constants";
import {
  FOOTER_EMAIL,
  FOOTER_HOURS,
  FOOTER_SOCIAL,
  FOOTER_WHATSAPP,
  FOOTER_WHATSAPP_HREF,
} from "@/lib/routes";

function FooterIcon({
  src,
  alt,
  className = "size-5",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={20}
      height={20}
      className={`shrink-0 object-contain ${className}`}
    />
  );
}

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#employees", label: "For Employees" },
  { href: "/#employers", label: "For Employers" },
];

const COMPANY_LINKS = [
  { href: "/#about", label: "About Us" },
  { href: "/#book-demo", label: "Book a Demo" },
  { href: "/#about", label: "Terms of Use" },
  { href: "/#about", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="bg-footer text-white">
      <Container className="py-16 lg:py-24">
        <div className="flex flex-col gap-12 sm:flex-row sm:flex-wrap sm:justify-between lg:flex-nowrap lg:items-start">
          <div className="w-full max-w-80 shrink-0">
            <Logo
              src="/landing/footer-logo.png"
              width={206}
              height={48}
              imageClassName="h-10 w-auto sm:h-12"
            />
            <p className="mt-8 text-justify text-sm leading-relaxed font-normal text-white lg:text-[16px]">
              {APP_NAME} is a secure and flexible earned wage access platform
              that empowers employees to access a portion of their earned wages
              before payday, pay for essential services, and manage their
              finances with greater confidence and convenience.
            </p>
          </div>

          <div className="shrink-0">
            <h3 className="font-sans text-base font-semibold whitespace-nowrap lg:text-[24px]">
              Quick Links
            </h3>
            <ul className="mt-8 space-y-5">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm font-normal text-white transition-opacity hover:opacity-70 lg:text-[16px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0">
            <h3 className="font-sans text-base font-semibold whitespace-nowrap lg:text-[24px]">
              Company
            </h3>
            <ul className="mt-8 space-y-5">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm font-normal text-white transition-opacity hover:opacity-70 lg:text-[16px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0">
            <h3 className="font-sans text-base font-semibold whitespace-nowrap lg:text-[24px]">
              Support & Book a Demo
            </h3>
            <ul className="mt-8 space-y-5 text-sm">
              <li>
                <a
                  href={FOOTER_WHATSAPP_HREF}
                  className="inline-flex items-center gap-2 font-sans text-sm font-normal whitespace-nowrap text-white hover:opacity-70 lg:text-[16px]"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center">
                    <FooterIcon src="/landing/logos_whatsapp-icon.svg" alt="" />
                  </span>
                  {FOOTER_WHATSAPP}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${FOOTER_EMAIL}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap text-white hover:opacity-70 lg:text-[16px]"
                >
                  <FooterIcon
                    src="/landing/mail-icon.svg"
                    alt=""
                    className="h-4 w-5"
                  />
                  {FOOTER_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2 whitespace-nowrap text-white lg:text-[16px]">
                <FooterIcon src="/landing/logos_facebook.svg" alt="" />
                <FooterIcon src="/landing/instagram.svg" alt="" />
                <FooterIcon src="/landing/skill-icons_linkedin.svg" alt="" />
                <span>{FOOTER_SOCIAL}</span>
              </li>
            </ul>
            <p className="mt-8 text-left">
              <span className="text-[20px] font-semibold">Opening Hours:</span>
              <span className="mt-2 block text-[16px] font-normal text-white">
                {FOOTER_HOURS}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white pt-10 lg:mt-20 lg:pt-12">
          <p className="text-center text-sm text-white">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
