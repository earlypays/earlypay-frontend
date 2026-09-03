"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { AUTH_INPUT_CLASS } from "@/components/auth/styles";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/layout/logo";
import { setResetEmail } from "@/lib/auth-reset";
import { simulateDelay } from "@/lib/auth-simulate";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValid = email.trim().length > 0;
  const isButtonDisabled = !isValid || isLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    setIsLoading(true);
    await simulateDelay();
    setResetEmail(email.trim());
    toast.success("Code sent", {
      description: "Check your email for a 6 digit verification code.",
    });
    router.push("/forgot-password/otp");
    setIsLoading(false);
  };

  return (
    <AuthSplitLayout>
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo />
          <div className="space-y-2">
            <h1 className="font-sans text-2xl font-bold text-[#48484A]">
              Forgot Password
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Enter your email for the verification process, we will send 6
              digit code to your email.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <FormField label="Email Address" htmlFor="email">
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              className={AUTH_INPUT_CLASS}
            />
          </FormField>
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full text-base"
            disabled={isButtonDisabled}
          >
            {isLoading ? "Sending..." : "Continue"}
          </Button>
        </form>

        <div className="mt-6 flex justify-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#008B8B] hover:underline"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </Link>
        </div>
      </div>
    </AuthSplitLayout>
  );
}
