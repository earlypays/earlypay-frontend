"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronRight, Globe, MailCheck, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FormField } from "@/components/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_HOURS,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  CONTACT_SOCIAL,
  FOOTER_EMAIL,
} from "@/lib/routes";

const fieldClass =
  "h-12 min-w-0 w-full rounded-md bg-[#FFFFFF] border border-[#C5C5C5] px-4 text-base shadow-none md:text-base";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export function BookDemoContactSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);

  const isValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.company.trim() &&
    form.message.trim();

  const setField = (key: keyof typeof EMPTY_FORM) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || isLoading) return;
    setIsLoading(true);
    window.setTimeout(() => {
      toast.success("Message sent", {
        description: "Thanks for reaching out. We'll get back to you shortly.",
      });
      setForm(EMPTY_FORM);
      setIsLoading(false);
    }, 400);
  };

  return (
    <>
      <div className="bg-hero">
        <Container className="flex h-30 items-center gap-2 font-sans text-[16px] leading-6 text-muted-foreground">
          <Link
            href="/"
            className="font-normal text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          >
            Home
          </Link>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          <span className="font-semibold">Book a Demo</span>
        </Container>
      </div>

      <section className="bg-white py-10 lg:py-16" data-aos="fade-up">
        <Container className="mx-auto max-w-283">
          <div className="grid w-full min-w-0 items-center gap-10 overflow-hidden rounded-xl bg-white p-2 shadow-[0_12px_40px_rgba(16,70,64,0.08)] sm:p-3 lg:grid-cols-[minmax(0,384px)_minmax(0,1fr)] lg:gap-16 lg:p-5">
            <div className="flex h-auto w-full min-w-0 flex-col gap-16 lg:h-107.75 lg:max-w-[384px]">
              <div className="flex items-start gap-4">
                <MailCheck className="mt-0.5 size-6 shrink-0 text-[#008B8B]" />
                <div>
                  <h2 className="font-sans text-lg font-semibold text-[#003F3F] sm:text-2xl">
                    Email
                  </h2>
                  <a
                    href={`mailto:${FOOTER_EMAIL}`}
                    className="mt-1 block text-xs font-normal text-muted-foreground hover:text-[#008B8B] sm:text-base"
                  >
                    {FOOTER_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 size-6 shrink-0 text-[#008B8B]" />
                <div>
                  <h2 className="font-sans text-lg font-semibold text-[#003F3F] sm:text-2xl">
                    Call
                  </h2>
                  <p className="mt-1 text-muted-foreground">{CONTACT_HOURS}</p>
                  <a
                    href={CONTACT_PHONE_HREF}
                    className="mt-1 block text-xs font-normal text-muted-foreground hover:text-[#008B8B] sm:text-base"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-4">
                  <Globe className="mt-0.5 size-6 shrink-0 text-[#008B8B]" />
                  <div>
                    <h2 className="font-sans text-lg font-semibold text-[#003F3F] sm:text-2xl">
                      Find us on social media
                    </h2>
                    <p className="mt-2 text-justify text-xs leading-relaxed font-normal text-muted-foreground sm:text-base">
                      Engage with our community and keep your business at the
                      forefront.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3 pl-10">
                  {CONTACT_SOCIAL.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.name}
                      className="inline-flex size-[35px] shrink-0 items-center justify-center"
                    >
                      <img
                        src={item.icon}
                        alt=""
                        width={35}
                        height={35}
                        className="size-[35px]"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex h-auto w-full max-w-172 min-w-0 flex-col justify-between gap-4 overflow-hidden lg:h-153"
            >
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  label="First name"
                  htmlFor="firstName"
                  className="min-w-0"
                >
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(event) =>
                      setField("firstName")(event.target.value)
                    }
                    placeholder="Enter first name"
                    className={fieldClass}
                    required
                  />
                </FormField>
                <FormField
                  label="Last name"
                  htmlFor="lastName"
                  className="min-w-0"
                >
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(event) =>
                      setField("lastName")(event.target.value)
                    }
                    placeholder="Enter last name"
                    className={fieldClass}
                    required
                  />
                </FormField>
              </div>

              <FormField
                label="Email address"
                htmlFor="email"
                className="min-w-0"
              >
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => setField("email")(event.target.value)}
                  placeholder="Enter email address"
                  className={fieldClass}
                  required
                />
              </FormField>

              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  label="Phone Number"
                  htmlFor="phone"
                  className="min-w-0"
                >
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setField("phone")(event.target.value)}
                    placeholder="Phone Number"
                    className={fieldClass}
                    required
                  />
                </FormField>
                <FormField
                  label="Company Name"
                  htmlFor="company"
                  className="min-w-0"
                >
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(event) =>
                      setField("company")(event.target.value)
                    }
                    placeholder="Company Name"
                    className={fieldClass}
                    required
                  />
                </FormField>
              </div>

              <FormField
                label="Description"
                htmlFor="message"
                className="flex min-h-0 min-w-0 flex-1 flex-col"
              >
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(event) => setField("message")(event.target.value)}
                  placeholder="Message"
                  className="min-h-24 w-full min-w-0 flex-1 rounded-md border border-[#C5C5C5] bg-[#FFFFFF] px-4 py-3 text-base shadow-none md:text-base"
                  required
                />
              </FormField>

              <Button
                type="submit"
                size="lg"
                className="h-auto w-fit rounded-md p-2.5 text-[16px] font-semibold"
                disabled={!isValid || isLoading}
              >
                {isLoading ? "Sending..." : "Send message"}
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </>
  );
}
