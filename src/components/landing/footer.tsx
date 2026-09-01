import Link from "next/link";
import { Mail } from "lucide-react";

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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.6L1 23l5.5-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.3.7.7-3.2-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.2-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.3 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3-.1-.4s-.6-1.5-.8-2-.4-.5-.6-.5h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a9.7 9.7 0 0 0 3.7 3.1c1.4.6 1.9.6 2.6.5.4-.1 1.6-.6 1.8-1.3s.2-1.1.2-1.2-.2-.2-.4-.3Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M6.5 9H4v11h2.5V9ZM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4ZM20 20h-2.5v-5.6c0-1.6-.6-2.2-1.6-2.2s-1.8.8-1.8 2.3V20H11.6V9h2.4v1.5c.5-.9 1.6-1.8 3.3-1.8 2.2 0 3.7 1.4 3.7 4.5V20Z" />
    </svg>
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
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:pr-6">
            <Logo
              src="/landing/footer-logo.png"
              width={206}
              height={48}
              imageClassName="h-10 w-auto sm:h-12"
            />
            <p className="mt-5 text-sm leading-relaxed text-white/85">
              {APP_NAME} is a secure and flexible earned wage access platform
              that empowers employees to access a portion of their earned wages
              before payday, pay for essential services, and manage their
              finances with greater confidence and convenience.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/90 transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/90 transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold">Support & Book a Demo</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={FOOTER_WHATSAPP_HREF}
                  className="inline-flex items-center gap-2 text-white/90 hover:opacity-70"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="flex size-5 items-center justify-center text-[#25D366]">
                    <WhatsAppIcon className="size-4" />
                  </span>
                  {FOOTER_WHATSAPP}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${FOOTER_EMAIL}`}
                  className="inline-flex items-center gap-2 text-white/90 hover:opacity-70"
                >
                  <Mail className="size-4 text-sky-400" />
                  {FOOTER_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/90">
                <span className="flex items-center gap-1.5 text-[#1877F2]">
                  <FacebookIcon className="size-4" />
                </span>
                <span className="text-[#E4405F]">
                  <InstagramIcon className="size-4" />
                </span>
                <span className="text-[#0A66C2]">
                  <LinkedInIcon className="size-4" />
                </span>
                <span>{FOOTER_SOCIAL}</span>
              </li>
            </ul>
            <p className="mt-5 text-sm">
              <span className="font-medium">Opening Hours:</span>
              <span className="mt-1 block text-white/90">{FOOTER_HOURS}</span>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6">
          <p className="text-center text-sm text-white/90">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
