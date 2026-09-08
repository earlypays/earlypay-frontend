"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  ArrowUpRight,
  Check,
  CircleDot,
  Eye,
  EyeOff,
  Lightbulb,
  Smartphone,
  Tv,
  Wifi,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  BETTING_BILLERS,
  BILL_FEE,
  BILL_NETWORKS,
  BILL_QUICK_AMOUNTS,
  CABLE_BILLERS,
  CABLE_PRODUCTS,
  DATA_BUNDLES,
  DEMO_EMPLOYEE,
  DEMO_WITHDRAW_AVAILABLE,
  POWER_BILLERS,
  formatNaira,
} from "@/lib/dashboard-demo";
import { cn } from "@/lib/utils";

const SERVICES = [
  { id: "airtime", label: "Airtime", icon: Smartphone },
  { id: "data", label: "Data", icon: Wifi },
  { id: "cable", label: "Cable TV", icon: Tv },
  { id: "betting", label: "Betting", icon: CircleDot },
  { id: "electricity", label: "Electricity", icon: Lightbulb },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

const SERVICE_FROM_QUERY: Record<string, ServiceId> = {
  airtime: "airtime",
  data: "data",
  tv: "cable",
  cable: "cable",
  betting: "betting",
  power: "electricity",
  electricity: "electricity",
};

const FIELD_CLASS = "h-12 w-full rounded-lg";
const SELECT_CLASS = cn(
  FIELD_CLASS,
  "border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
);

function parseAmount(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

function formatPhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 11);
}

export default function PayBillsPage() {
  const router = useRouter();
  const queryService =
    typeof router.query.service === "string"
      ? SERVICE_FROM_QUERY[router.query.service]
      : undefined;

  const [service, setService] = useState<ServiceId>(queryService ?? "airtime");
  const [available, setAvailable] = useState(DEMO_WITHDRAW_AVAILABLE);
  const [hideBalance, setHideBalance] = useState(false);
  const [network, setNetwork] =
    useState<(typeof BILL_NETWORKS)[number]["id"]>("airtel");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [bundleId, setBundleId] = useState(DATA_BUNDLES[0].id);
  const [cableBiller, setCableBiller] =
    useState<(typeof CABLE_BILLERS)[number]>("DSTV");
  const [smartCard, setSmartCard] = useState("");
  const [cableProductId, setCableProductId] = useState("");
  const [bettingBiller, setBettingBiller] = useState<
    (typeof BETTING_BILLERS)[number]["id"]
  >(BETTING_BILLERS[0].id);
  const [userId, setUserId] = useState("");
  const [powerBiller, setPowerBiller] =
    useState<(typeof POWER_BILLERS)[number]>("AEDC");
  const [meter, setMeter] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [lastSent, setLastSent] = useState(0);
  const [lastRecipient, setLastRecipient] = useState("");

  useEffect(() => {
    if (queryService) setService(queryService);
  }, [queryService]);

  const bundle = DATA_BUNDLES.find((item) => item.id === bundleId);
  const cableProduct = CABLE_PRODUCTS.find(
    (item) => item.id === cableProductId,
  );
  const networkLabel =
    BILL_NETWORKS.find((item) => item.id === network)?.label ?? "Airtel";
  const bettingLabel =
    BETTING_BILLERS.find((item) => item.id === bettingBiller)?.label ??
    "Bet9ja";

  const resolvedAmount =
    service === "data"
      ? (bundle?.amount ?? 0)
      : service === "cable"
        ? (cableProduct?.amount ?? amount)
        : amount;

  const fee = BILL_FEE;
  const deducted = resolvedAmount + fee;
  const showCustomerName =
    (service === "betting" && userId.trim().length >= 3) ||
    (service === "electricity" && meter.trim().length >= 6);

  const canContinue = (() => {
    if (resolvedAmount <= 0 || deducted > available) return false;
    if (service === "airtime" || service === "data") return phone.length >= 10;
    if (service === "cable")
      return Boolean(smartCard.trim() && cableProductId && phone.length >= 10);
    if (service === "betting")
      return Boolean(userId.trim() && phone.length >= 10);
    return Boolean(meter.trim() && phone.length >= 10);
  })();

  const reviewItem = {
    airtime: `Airtime · ${networkLabel}`,
    data: `Data · ${networkLabel}`,
    cable: `Cable TV · ${cableBiller}`,
    betting: `Betting · ${bettingLabel}`,
    electricity: `Electricity · ${powerBiller}`,
  }[service];

  const recipient = {
    airtime: phone,
    data: phone,
    cable: smartCard || phone,
    betting: userId || phone,
    electricity: meter || phone,
  }[service];

  function resetAmountFields() {
    setAmount(0);
    setPhone("");
    setSmartCard("");
    setUserId("");
    setMeter("");
    setCableProductId("");
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-sans text-xl font-bold text-[#48484A] sm:text-2xl">
          Pay Bills
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Pay for essentials using your earned-wage balance.
        </p>
      </div>

      <section className="flex flex-col justify-between gap-4 rounded-xl bg-[#008B8B] px-5 py-5 text-white sm:flex-row sm:items-end sm:px-6 sm:py-6">
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
          <p className="mt-2 text-4xl font-semibold tracking-tight">
            {hideBalance ? "••••••" : formatNaira(available)}
          </p>
        </div>
        <p className="max-w-70 text-sm leading-relaxed text-white/85 sm:text-right">
          Every payment here is deducted from this balance, fee included.
        </p>
      </section>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SERVICES.map((item) => {
          const Icon = item.icon;
          const active = service === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setService(item.id);
                resetAmountFields();
              }}
              className={cn(
                "flex cursor-pointer flex-col items-center gap-2 rounded-xl bg-white px-3 py-4 text-center shadow-[0_8px_24px_rgba(16,70,64,0.06)] transition-colors",
                active
                  ? "border border-[#008B8B] bg-[#E6F3F3] text-[#48484A]"
                  : "border border-transparent text-[#1B1B1B] hover:bg-[#F7FBFB]",
              )}
            >
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-full",
                  active ? "bg-white" : "bg-[#E6F3F3]",
                )}
              >
                <Icon className="size-6" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
        <Link
          href="/dashboard/withdraw"
          className="flex flex-col items-center gap-2 rounded-xl border border-transparent bg-white px-3 py-4 text-center text-[#1B1B1B] shadow-[0_8px_24px_rgba(16,70,64,0.06)] hover:bg-[#F7FBFB]"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-[#E6F3F3]">
            <ArrowUpRight className="size-6" strokeWidth={1.5} />
          </span>
          <span className="text-sm font-medium">Withdraw</span>
        </Link>
      </div>

      <section className="mr-auto max-w-138 rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(16,70,64,0.06)] sm:p-6">
        {service === "airtime" || service === "data" ? (
          <>
            <p className="text-sm font-medium text-[#1B1B1B]">Network</p>
            <div className="mt-2 flex flex-wrap gap-2 sm:gap-3">
              {BILL_NETWORKS.map((item) => (
                <ProviderTile
                  key={item.id}
                  label={item.label}
                  selected={network === item.id}
                  logo={item.logo}
                  onSelect={() => setNetwork(item.id)}
                />
              ))}
            </div>
            <Field label="Phone number" htmlFor="bill-phone">
              <Input
                id="bill-phone"
                inputMode="numeric"
                placeholder="enter your phone number"
                value={phone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
                className={FIELD_CLASS}
              />
            </Field>
            {service === "airtime" ? (
              <>
                <Field label="Amount" htmlFor="bill-amount">
                  <AmountInput amount={amount} onChange={setAmount} />
                </Field>
                <QuickAmounts amount={amount} onSelect={setAmount} />
              </>
            ) : (
              <Field label="Choose a bundle" htmlFor="bill-bundle">
                <select
                  id="bill-bundle"
                  className={SELECT_CLASS}
                  value={bundleId}
                  onChange={(event) =>
                    setBundleId(event.target.value as typeof bundleId)
                  }
                >
                  {DATA_BUNDLES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label} · {formatNaira(item.amount)}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </>
        ) : null}

        {service === "cable" ? (
          <>
            <Field label="Select a biller" htmlFor="cable-biller">
              <select
                id="cable-biller"
                className={SELECT_CLASS}
                value={cableBiller}
                onChange={(event) =>
                  setCableBiller(event.target.value as typeof cableBiller)
                }
              >
                {CABLE_BILLERS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Smart Card Number" htmlFor="smart-card">
              <Input
                id="smart-card"
                placeholder="Enter your smart card number"
                value={smartCard}
                onChange={(event) => setSmartCard(event.target.value)}
                className={FIELD_CLASS}
              />
            </Field>
            <Field label="Select a product" htmlFor="cable-product">
              <select
                id="cable-product"
                className={SELECT_CLASS}
                value={cableProductId}
                onChange={(event) => {
                  setCableProductId(event.target.value);
                  const next = CABLE_PRODUCTS.find(
                    (item) => item.id === event.target.value,
                  );
                  setAmount(next?.amount ?? 0);
                }}
              >
                <option value="">Select a product</option>
                {CABLE_PRODUCTS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label} · {formatNaira(item.amount)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Mobile number" htmlFor="cable-phone">
              <Input
                id="cable-phone"
                inputMode="numeric"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
                className={FIELD_CLASS}
              />
            </Field>
            <Field label="Amount" htmlFor="cable-amount">
              <AmountInput amount={resolvedAmount} onChange={setAmount} />
            </Field>
          </>
        ) : null}

        {service === "betting" ? (
          <>
            <p className="text-sm font-medium text-[#1B1B1B]">
              Select a biller
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {BETTING_BILLERS.map((item) => (
                <ProviderTile
                  key={item.id}
                  label={item.label}
                  selected={bettingBiller === item.id}
                  onSelect={() => setBettingBiller(item.id)}
                />
              ))}
            </div>
            <Field label="User ID" htmlFor="user-id">
              <Input
                id="user-id"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                className={FIELD_CLASS}
              />
              {showCustomerName ? (
                <p className="mt-1.5 text-xs text-[#008B8B]">
                  {DEMO_EMPLOYEE.fullName}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-[#008B8B]">
                  Customer name display here
                </p>
              )}
            </Field>
            <Field label="Mobile number" htmlFor="bet-phone">
              <Input
                id="bet-phone"
                inputMode="numeric"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
                className={FIELD_CLASS}
              />
            </Field>
            <Field label="Amount" htmlFor="bet-amount">
              <AmountInput amount={amount} onChange={setAmount} />
            </Field>
          </>
        ) : null}

        {service === "electricity" ? (
          <>
            <Field label="Select a biller" htmlFor="power-biller">
              <select
                id="power-biller"
                className={SELECT_CLASS}
                value={powerBiller}
                onChange={(event) =>
                  setPowerBiller(event.target.value as typeof powerBiller)
                }
              >
                {POWER_BILLERS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Meter Number" htmlFor="meter">
              <Input
                id="meter"
                placeholder="Enter your meter number"
                value={meter}
                onChange={(event) => setMeter(event.target.value)}
                className={FIELD_CLASS}
              />
            </Field>
            <Field label="Mobile number" htmlFor="power-phone">
              <Input
                id="power-phone"
                inputMode="numeric"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
                className={FIELD_CLASS}
              />
              <p className="mt-1.5 text-xs text-[#008B8B]">
                {showCustomerName
                  ? DEMO_EMPLOYEE.fullName
                  : "Customer name display here"}
              </p>
            </Field>
            <Field label="Amount" htmlFor="power-amount">
              <AmountInput amount={amount} onChange={setAmount} />
            </Field>
          </>
        ) : null}

        <div className="mt-5 space-y-2.5 rounded-lg bg-[#F4F5F7] px-4 py-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Transaction fee</span>
            <span className="font-medium text-[#1B1B1B]">
              {formatNaira(fee, true)}
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
        title="Review payment"
        widthClass="max-w-md"
      >
        <p className="text-sm text-muted-foreground">
          Confirm the details before we send this.
        </p>
        <dl className="mt-5 space-y-4 text-sm">
          <ReviewRow label="Item" value={reviewItem} />
          <ReviewRow label="Recipient" value={recipient || "—"} />
          <ReviewRow label="Amount" value={formatNaira(resolvedAmount, true)} />
          <ReviewRow label="Fee" value={formatNaira(fee, true)} />
          <ReviewRow
            label="Total from balance"
            value={formatNaira(deducted, true)}
            strong
          />
        </dl>
        <Button
          size="lg"
          className="mt-6 h-12 w-full"
          onClick={() => {
            setLastSent(resolvedAmount);
            setLastRecipient(recipient);
            setAvailable((value) => value - deducted);
            setReviewOpen(false);
            setSuccessOpen(true);
            resetAmountFields();
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
            Sent to {lastRecipient}. Your new available balance is{" "}
            {formatNaira(available, true)}.
          </p>
          <Button
            size="lg"
            className="mt-6 h-12 w-full"
            onClick={() => setSuccessOpen(false)}
          >
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[#1B1B1B]"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function AmountInput({
  amount,
  onChange,
}: {
  amount: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
        ₦
      </span>
      <Input
        inputMode="numeric"
        placeholder="0.00"
        value={amount ? amount.toLocaleString("en-NG") : ""}
        onChange={(event) => onChange(parseAmount(event.target.value))}
        className={cn(FIELD_CLASS, "pl-7")}
      />
    </div>
  );
}

function QuickAmounts({
  amount,
  onSelect,
}: {
  amount: number;
  onSelect: (value: number) => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {BILL_QUICK_AMOUNTS.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onSelect(value)}
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
  );
}

function ProviderTile({
  label,
  selected,
  logo,
  onSelect,
}: {
  label: string;
  selected: boolean;
  logo?: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={label}
      className={cn(
        "relative flex cursor-pointer items-center justify-center text-center text-xs font-semibold transition-colors",
        logo ? "size-26.25" : "h-18 w-full flex-col",
      )}
    >
      {logo ? (
        <span className="relative size-26.25">
          <OptimizedImage
            src={logo}
            alt=""
            width={105}
            height={105}
            unoptimized
            className="size-26.25 rounded-lg object-cover"
          />
          {selected ? (
            <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-[#008B8B] text-white">
              <Check className="size-3" strokeWidth={3} />
            </span>
          ) : null}
        </span>
      ) : selected ? (
        <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-[#008B8B] text-white">
          <Check className="size-3" strokeWidth={3} />
        </span>
      ) : null}
      <span className={logo ? "sr-only" : undefined}>{label}</span>
    </button>
  );
}

function ReviewRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "text-right text-[#1B1B1B]",
          strong ? "font-semibold" : "font-medium",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
