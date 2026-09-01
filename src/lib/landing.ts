export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Work & Earn",
    description:
      "Your earnings are calculated based on your current pay cycle.",
  },
  {
    number: "02",
    title: "What's Available",
    description:
      "View the amount you are eligible to access, up to 50% of your earned wages.",
  },
  {
    number: "03",
    title: "Access Your Money",
    description:
      "Withdraw to your linked bank account or use your balance to pay for supported services.",
  },
  {
    number: "04",
    title: "Payday Management",
    description:
      "Your access is reconciled against your regular salary at the end of the pay cycle.",
  },
] as const;

export const CONTROL_FEATURES = [
  {
    number: "01",
    title: "Access Earned Wages",
    description:
      "Access up to 50% of your eligible earned wages before payday.",
  },
  {
    number: "02",
    title: "Withdraw to Your Bank",
    description:
      "Send your available funds directly to your linked bank account.",
  },
  {
    number: "03",
    title: "Pay Essential Bills",
    description:
      "Use your available balance for airtime, data, electricity, TV subscriptions and supported school fees.",
  },
  {
    number: "04",
    title: "Stay in Control",
    description:
      "See your earnings, available balance and transaction history in one place.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "How much can I access?",
    answer:
      "Eligible employees can access up to 50% of wages already earned during their current pay cycle.",
  },
  {
    question: "Do I need to wait until payday?",
    answer:
      "No. Once wages are earned in the current cycle, you can request access without waiting for payday.",
  },
  {
    question: "Can I withdraw the money to my bank account?",
    answer:
      "Yes. You can send available funds directly to your linked bank account.",
  },
  {
    question: "What can I pay for using EarlyPay?",
    answer:
      "You can use your available balance for airtime, data, electricity, TV subscriptions, and supported school fees.",
  },
  {
    question: "What happens on payday?",
    answer:
      "Amounts accessed during the cycle are reconciled against your regular salary at the end of the pay period.",
  },
] as const;

export const BILL_PARTNERS = [
  { name: "EEDC", src: "/partners/eedc.png" },
  { name: "IBEDC", src: "/partners/ibedc.png" },
  { name: "PHED", src: "/partners/phed.png" },
  { name: "EKEDC", src: "/partners/ekedc.png" },
  { name: "Ikeja Electric", src: "/partners/ikeja-electric.png" },
  { name: "DStv", src: "/partners/dstv.png" },
  { name: "StarTimes", src: "/partners/startimes.png" },
  { name: "GOtv", src: "/partners/gotv.png" },
  { name: "MTN", src: "/partners/mtn.png" },
  { name: "Airtel", src: "/partners/airtel.png" },
  { name: "1XBET", src: "/partners/1xbet.png" },
] as const;
