"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import { AuthStageLayout } from "@/components/auth/auth-stage-layout";
import { PasswordRules } from "@/components/auth/password-rules";
import { AUTH_INPUT_CLASS } from "@/components/auth/styles";
import { Button } from "@/components/ui/button";
import { FormField, PasswordInput } from "@/components/form";
import { clearResetFlow, getResetEmail, getResetOtp } from "@/lib/auth-reset";
import { simulateDelay } from "@/lib/auth-simulate";
import { isPasswordStrong } from "@/lib/password-rules";
import { cn } from "@/lib/utils";

export default function ForgotPasswordResetPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!getResetEmail() || !getResetOtp()) {
      router.replace("/forgot-password");
    }
  }, [router]);

  const mismatch = confirm.length > 0 && password !== confirm;
  const showMismatch = submitted && mismatch;
  const isValid =
    isPasswordStrong(password) && confirm.length > 0 && password === confirm;
  const isButtonDisabled = !isValid || isLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid || isLoading) return;

    setIsLoading(true);
    await simulateDelay();
    clearResetFlow();
    toast.success("Password updated", {
      description: "You can now sign in with your new password.",
    });
    router.push("/login");
    setIsLoading(false);
  };

  return (
    <AuthStageLayout onBack={() => router.push("/forgot-password/otp")}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2 text-center">
          <h1 className="font-sans text-2xl font-bold text-[#48484A]">
            Create a New Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Your new password should be strong and easy to remember.
          </p>
        </div>

        <FormField
          label="New Password"
          htmlFor="password"
          error={showMismatch ? "Passwords do not match" : undefined}
        >
          <PasswordInput
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your new password"
            aria-invalid={showMismatch}
            className={cn(AUTH_INPUT_CLASS, showMismatch && "border-[#E53935]")}
          />
        </FormField>

        <PasswordRules value={password} />

        <FormField
          label="Confirm New Password"
          htmlFor="confirm"
          error={showMismatch ? "Passwords do not match" : undefined}
        >
          <PasswordInput
            id="confirm"
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            placeholder="Re-Enter your new password"
            aria-invalid={showMismatch}
            className={cn(AUTH_INPUT_CLASS, showMismatch && "border-[#E53935]")}
          />
        </FormField>

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full text-base"
          disabled={isButtonDisabled}
        >
          {isLoading ? "Saving..." : "Save new password"}
        </Button>
      </form>
    </AuthStageLayout>
  );
}
