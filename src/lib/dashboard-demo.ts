export const DEMO_EMPLOYEE = {
  firstName: "Patrick",
  lastName: "Chukwudifu",
  fullName: "Patrick Chukwudifu",
  employeeId: "EMP-10245",
  email: "patrick@earlypay.demo",
} as const;

export function formatNaira(amount: number, withKobo = false) {
  const formatted = new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: withKobo ? 2 : 0,
    maximumFractionDigits: withKobo ? 2 : 0,
  }).format(amount);
  return `₦${formatted}`;
}

export function formatDashboardDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function greetingForHour(hour = new Date().getHours()) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export const DEMO_OVERVIEW = {
  clockInLabel: "You clocked in at 9:02 AM",
  todayEstimate: 85000,
  available: 85000,
  payCycle: {
    range: "1 Aug - 31 Aug 2026",
    total: 150000,
    dailyRate: 8500,
  },
  startElapsedSeconds: 2 * 3600 + 14 * 60 + 36,
} as const;

export const QUICK_ACTIONS = [
  { label: "Airtime", href: "/dashboard/bills", icon: "airtime" },
  { label: "Data", href: "/dashboard/bills", icon: "data" },
  { label: "Cable TV", href: "/dashboard/bills", icon: "tv" },
  { label: "Betting", href: "/dashboard/bills", icon: "betting" },
  { label: "Electricity", href: "/dashboard/bills", icon: "power" },
  { label: "Withdraw", href: "/dashboard/withdraw", icon: "withdraw" },
] as const;

export const DEMO_ACTIVITY = [
  {
    id: "1",
    title: "Airtime purchase",
    at: "Aug 16 at 4:17pm",
    amount: -2000,
    type: "debit" as const,
  },
  {
    id: "2",
    title: "Daily earnings",
    at: "Aug 16 at 4:17pm",
    amount: 8500,
    type: "credit" as const,
  },
];
