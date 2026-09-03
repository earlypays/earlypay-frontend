"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Link from "next/link";

import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { PasswordRules } from "@/components/auth/password-rules";
import { AUTH_INPUT_COMPACT_CLASS } from "@/components/auth/styles";
import { Button } from "@/components/ui/button";
import { FormField, PasswordInput } from "@/components/form";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/layout/logo";
import { isPasswordStrong } from "@/lib/password-rules";
import { simulateDelay } from "@/lib/auth-simulate";

export default function SignupPage() {
  const router = useRouter();
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValid =
    organization.trim() &&
    email.trim() &&
    phone.trim() &&
    isPasswordStrong(password) &&
    agreed;
  const isButtonDisabled = !isValid || isLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    setIsLoading(true);
    await simulateDelay();
    toast.success("Account created", {
      description: "You can now sign in with your employer account.",
    });
    router.push("/login");
    setIsLoading(false);
  };

  return (
    <AuthSplitLayout>
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col items-center gap-2 text-center">
          <Logo imageClassName="h-7 sm:h-8" />
          <div className="space-y-0.5">
            <h1 className="font-sans text-xl font-bold text-[#48484A]">
              Sign up to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your account details to sign up
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <FormField
            label="Organization Name"
            htmlFor="organization"
            className="space-y-1"
          >
            <Input
              id="organization"
              value={organization}
              onChange={(event) => setOrganization(event.target.value)}
              placeholder="Enter your organization name"
              className={AUTH_INPUT_COMPACT_CLASS}
            />
          </FormField>
          <FormField
            label="Work Email Address"
            htmlFor="email"
            className="space-y-1"
          >
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your work email address"
              className={AUTH_INPUT_COMPACT_CLASS}
            />
          </FormField>
          <FormField label="Phone Number" htmlFor="phone" className="space-y-1">
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter your phone number"
              className={AUTH_INPUT_COMPACT_CLASS}
            />
          </FormField>
          <FormField label="Password" htmlFor="password" className="space-y-1">
            <PasswordInput
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className={AUTH_INPUT_COMPACT_CLASS}
            />
          </FormField>

          <PasswordRules value={password} />

          <label className="flex cursor-pointer items-start gap-2 text-sm text-[#48484A]">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-[#008B8B]"
            />
            <span>
              I agree to EarlyPay&apos;s{" "}
              <Link href="/terms" className="text-[#008B8B] hover:underline">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#008B8B] hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <Button
            type="submit"
            size="lg"
            className="h-11 w-full text-base"
            disabled={isButtonDisabled}
          >
            {isLoading ? "Creating account..." : "Create Employer Account"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#008B8B] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}
