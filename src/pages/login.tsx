"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Link from "next/link";

import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { AUTH_INPUT_CLASS } from "@/components/auth/styles";
import { Button } from "@/components/ui/button";
import { FormField, PasswordInput } from "@/components/form";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/layout/logo";
import { mockLoginResponse, simulateDelay } from "@/lib/auth-simulate";
import { useAuthStore } from "@/store/useAuthStore";

const REMEMBER_KEY = "earlypay.remember.email";

export default function LoginPage() {
  const router = useRouter();
  const setTokensFromResponse = useAuthStore((s) => s.setTokensFromResponse);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_KEY);
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  const isValid = email.trim().length > 0 && password.length > 0;
  const isButtonDisabled = !isValid || isLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    setIsLoading(true);
    await simulateDelay();
    if (remember) localStorage.setItem(REMEMBER_KEY, email.trim());
    else localStorage.removeItem(REMEMBER_KEY);

    setTokensFromResponse(mockLoginResponse(email.trim()));
    toast.success("Welcome back!", {
      description: "You have successfully logged in.",
    });
    const redirectPath = sessionStorage.getItem("redirectPath") || "/dashboard";
    sessionStorage.removeItem("redirectPath");
    router.push(redirectPath);
    setIsLoading(false);
  };

  return (
    <AuthSplitLayout>
      <div className="mx-auto w-full max-w-md">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo />
          <div className="space-y-1">
            <h1 className="font-sans text-2xl font-bold text-[#48484A]">
              Sign in to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your account details to sign in
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
          <FormField label="Password" htmlFor="password">
            <PasswordInput
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className={AUTH_INPUT_CLASS}
            />
          </FormField>

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="inline-flex cursor-pointer items-center gap-2 text-[#48484A]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="size-4 accent-[#008B8B]"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="font-medium text-[#008B8B] hover:underline"
            >
              Forget Password?
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            className="h-12 w-full text-base"
            disabled={isButtonDisabled}
          >
            {isLoading ? "Signing in..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account ?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#008B8B] hover:underline"
          >
            Signup now
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}
