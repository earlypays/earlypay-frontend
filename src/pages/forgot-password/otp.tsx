"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Mail, X } from "lucide-react";

import { AuthStageLayout } from "@/components/auth/auth-stage-layout";
import { OtpInput } from "@/components/auth/otp-input";
import { Button } from "@/components/ui/button";
import { getResetEmail, setResetOtp } from "@/lib/auth-reset";
import { simulateDelay } from "@/lib/auth-simulate";

export default function ForgotPasswordOtpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [expired, setExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const saved = getResetEmail();
    if (!saved) {
      router.replace("/forgot-password");
      return;
    }
    setEmail(saved);
    if (router.query.expired === "1") setExpired(true);
  }, [router]);

  const isValid = otp.length === 6;
  const isButtonDisabled = !isValid || isLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || isLoading) return;
    setIsLoading(true);
    setResetOtp(otp);
    await simulateDelay(400);
    router.push("/forgot-password/reset");
  };

  const handleResend = async () => {
    if (!email || isResending) return;
    setIsResending(true);
    await simulateDelay();
    setExpired(false);
    setOtp("");
    toast.success("Code resent", {
      description: "A new 6 digit code has been sent to your email.",
    });
    setIsResending(false);
  };

  return (
    <AuthStageLayout onBack={() => router.push("/forgot-password")}>
      <form onSubmit={handleSubmit} className="space-y-5 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#008B8B]">
          <Mail className="size-6 text-white" />
        </div>
        <div className="space-y-2">
          <h1 className="font-sans text-2xl font-bold text-[#48484A]">
            Enter 6 Digit code
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the 6 digit code that you received on your email.
          </p>
        </div>

        {expired ? (
          <div className="flex items-center gap-3 rounded-lg bg-[#E53935] px-3 py-2.5 text-left text-sm text-white">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-white">
              <X className="size-3" />
            </span>
            This code has expired click on resend code
          </div>
        ) : null}

        <OtpInput value={otp} onChange={setOtp} invalid={expired} />

        <p className="text-sm text-muted-foreground">
          Email not received?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="cursor-pointer font-semibold text-[#008B8B] hover:underline disabled:opacity-60"
          >
            {isResending ? "Sending..." : "Resend Code"}
          </button>
        </p>

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full text-base"
          disabled={isButtonDisabled}
        >
          Continue
        </Button>
      </form>
    </AuthStageLayout>
  );
}
