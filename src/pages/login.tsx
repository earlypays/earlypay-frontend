"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { FormField, PasswordInput } from "@/components/form";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/layout/logo";
import { getApiErrorMessage } from "@/lib/api-error";
import { login as loginRequest } from "@/services/auth";
import { useAuthStore } from "@/store/useAuthStore";
import type { LoginResponse } from "@/types/app/response";

export default function LoginPage() {
  const router = useRouter();
  const setTokensFromResponse = useAuthStore((s) => s.setTokensFromResponse);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValid = email.trim().length > 0 && password.length > 0;
  const isButtonDisabled = !isValid || isLoading;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    setIsLoading(true);
    try {
      const { data } = await loginRequest({
        email: email.trim(),
        password,
      });
      const payload = data as LoginResponse;
      if (!payload?.access || !payload?.refresh) {
        toast.error("Login failed", {
          description: "Unexpected response from server. Please try again.",
        });
        return;
      }
      setTokensFromResponse(payload);
      toast.success("Welcome back!", {
        description: "You have successfully logged in.",
      });
      const redirectPath =
        sessionStorage.getItem("redirectPath") || "/dashboard";
      sessionStorage.removeItem("redirectPath");
      router.push(redirectPath);
    } catch (err) {
      toast.error("Login failed", {
        description: getApiErrorMessage(err),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-hero px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo />
          <div className="space-y-1">
            <h1 className="font-serif text-2xl font-bold text-heading">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access your EarlyPay account.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField label="Email" htmlFor="email">
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@company.com"
            />
          </FormField>
          <FormField label="Password" htmlFor="password">
            <PasswordInput
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </FormField>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isButtonDisabled}
          >
            {isLoading ? "Signing in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          New to EarlyPay?{" "}
          <Link href="/" className="font-medium text-primary hover:underline">
            Go to homepage
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
