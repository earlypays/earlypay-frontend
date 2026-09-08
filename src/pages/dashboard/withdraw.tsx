"use client";

import { useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  DEMO_BANK,
  DEMO_WITHDRAW_AVAILABLE,
  WITHDRAW_FEE,
  WITHDRAW_QUICK_AMOUNTS,
  formatNaira,
} from "@/lib/dashboard-demo";
import { cn } from "@/lib/utils";

function parseAmount(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return 0;
  return Number(digits);
}

export default function WithdrawPage() {
  const [available, setAvailable] = useState(DEMO_WITHDRAW_AVAILABLE);
  const [hideBalance, setHideBalance] = useState(false);
  const [amount, setAmount] = useState(0);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [lastSent, setLastSent] = useState(0);

  const fee = WITHDRAW_FEE;
  const receive = amount;
  const deducted = amount + fee;
  const canContinue = amount > 0 && deducted <= available;

  const destination = `${DEMO_BANK.name.replace(" ", "")} **** ${DEMO_BANK.last4}`;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-sans text-xl font-bold text-[#48484A] sm:text-2xl">
          Withdraw Fund
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Move money from your earned balance straight to your bank account.
        </p>
      </div>

      <section className="relative overflow-hidden rounded-2xl bg-[#008B8B] px-6 py-6 text-white sm:px-8 sm:py-7">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-120%] left-[-28%] h-[280%] w-[82%] rounded-full bg-white/16"
        />
        <div className="relative z-10 flex min-h-28 flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase">
              Available to access
              <button
                type="button"
                className="cursor-pointer text-white/80 hover:text-white"
                aria-label={hideBalance ? "Show balance" : "Hide balance"}
                onClick={() => setHideBalance((value) => !value)}
              >
                {hideBalance ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            <p className="mt-8 text-4xl font-semibold tracking-tight">
              {hideBalance ? "••••••" : formatNaira(available)}
            </p>
          </div>
          <p className="max-w-70 text-sm leading-relaxed text-white/90 sm:text-right">
            Reflects up to 50% of wages earned so far this pay cycle.
          </p>
        </div>
      </section>

      <section className="mr-auto max-w-138 rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(16,70,64,0.06)] sm:p-6">
        <p className="text-sm font-medium text-[#1B1B1B]">Send to</p>
        <div className="mt-2 flex items-center gap-3 rounded-md border border-[#008B8B] bg-[#E6F3F3] px-5 py-2.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#008B8B] text-xs font-bold text-white">
            GT
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#1B1B1B]">
              {DEMO_BANK.name}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              **** {DEMO_BANK.last4} · {DEMO_BANK.holder}
            </p>
          </div>
        </div>

        <label
          className="mt-5 block text-sm font-medium text-[#1B1B1B]"
          htmlFor="withdraw-amount"
        >
          Amount
        </label>
        <div className="relative mt-2">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
            ₦
          </span>
          <Input
            id="withdraw-amount"
            inputMode="numeric"
            placeholder="0.00"
            value={amount ? amount.toLocaleString("en-NG") : ""}
            onChange={(event) => setAmount(parseAmount(event.target.value))}
            className="h-12 rounded-md pl-7 text-base"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {WITHDRAW_QUICK_AMOUNTS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAmount(value)}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                amount === value
                  ? "border-[#008B8B] bg-[#E6F3F3] text-[#008B8B]"
                  : "border-[#D5E6E2] bg-white text-[#1B1B1B] hover:border-[#008B8B]/50",
              )}
            >
              {formatNaira(value)}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-2.5 rounded-md bg-[#EAECED] px-4 py-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Transaction fee</span>
            <span className="font-medium text-[#1B1B1B]">
              {formatNaira(fee, true)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">You&apos;ll receive</span>
            <span className="font-medium text-[#1B1B1B]">
              {formatNaira(receive, true)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Deducted from balance</span>
            <span className="font-medium text-[#1B1B1B]">
              {formatNaira(deducted, true)}
            </span>
          </div>
        </div>

        <Button
          size="lg"
          className="mt-5 h-12 w-full"
          disabled={!canContinue}
          onClick={() => setReviewOpen(true)}
        >
          Continue
        </Button>
      </section>

      <Modal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        title="Review withdrawal"
        widthClass="max-w-md"
      >
        <p className="text-sm text-muted-foreground">
          Confirm the details before we send this.
        </p>
        <dl className="mt-5 space-y-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">Amount</dt>
            <dd className="font-medium text-[#1B1B1B]">
              {formatNaira(amount, true)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">Fee</dt>
            <dd className="font-medium text-[#1B1B1B]">
              {formatNaira(fee, true)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">To</dt>
            <dd className="font-medium text-[#1B1B1B]">{destination}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">Deducted from balance</dt>
            <dd className="font-semibold text-[#1B1B1B]">
              {formatNaira(deducted, true)}
            </dd>
          </div>
        </dl>
        <Button
          size="lg"
          className="mt-6 h-12 w-full"
          onClick={() => {
            setLastSent(amount);
            setAvailable((value) => value - deducted);
            setReviewOpen(false);
            setSuccessOpen(true);
            setAmount(0);
          }}
        >
          Continue
        </Button>
      </Modal>

      <Modal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        widthClass="max-w-md"
      >
        <div className="flex flex-col items-center px-2 pt-2 pb-1 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-[#E6F3F3] text-[#008B8B]">
            <Check className="size-7" strokeWidth={2.5} />
          </span>
          <h3 className="mt-5 text-xl font-semibold text-[#1B1B1B]">
            {formatNaira(lastSent, true)} sent
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Sent to {destination}. Your new available balance is{" "}
            {formatNaira(available, true)}.
          </p>
          <Button
            size="lg"
            className="mt-6 h-12 w-full"
            onClick={() => setSuccessOpen(false)}
          >
            View Receipt
          </Button>
        </div>
      </Modal>
    </div>
  );
}
