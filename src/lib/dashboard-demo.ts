export const DEMO_EMPLOYEE = {
  firstName: "Patrick",
  lastName: "Chukwudifu",
  fullName: "Patrick Chukwudifu",
  employeeId: "EMP-10245",
  email: "patrick@earlypay.demo",
  phone: "08167000077",
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

export const DEMO_BANK = {
  name: "GT Bank",
  last4: "4521",
  holder: DEMO_EMPLOYEE.fullName,
} as const;

export const WITHDRAW_FEE = 200;
export const WITHDRAW_QUICK_AMOUNTS = [2000, 5000, 10000, 20000] as const;
export const DEMO_WITHDRAW_AVAILABLE = 40000;
export const BILL_FEE = 200;
export const BILL_QUICK_AMOUNTS = [500, 1000, 2000, 5000] as const;

export const BILL_NETWORKS = [
  { id: "airtel", label: "Airtel", logo: "/Airtel.svg" },
  { id: "mtn", label: "MTN", logo: "/MTN.svg" },
  { id: "9mobile", label: "9mobile", logo: "/9mobile.svg" },
  { id: "glo", label: "Glo", logo: "/GLO.svg" },
] as const;

export const DATA_BUNDLES = [
  { id: "1gb", label: "1GB - 30 days", amount: 500 },
  { id: "2gb", label: "2GB - 30 days", amount: 1000 },
  { id: "5gb", label: "5GB - 30 days", amount: 2000 },
  { id: "10gb", label: "10GB - 30 days", amount: 3500 },
] as const;

export const CABLE_BILLERS = ["DSTV", "GOTV", "Startimes"] as const;
export const CABLE_PRODUCTS = [
  { id: "compact", label: "Compact", amount: 10500 },
  { id: "confam", label: "Confam", amount: 6200 },
  { id: "pad", label: "Padi", amount: 2500 },
] as const;

export const BETTING_BILLERS = [
  { id: "bet9ja", label: "Bet9ja" },
  { id: "1xbet", label: "1XBET" },
  { id: "sportybet", label: "SportyBet" },
  { id: "nairabet", label: "nairabet" },
] as const;

export const POWER_BILLERS = ["AEDC", "IKEDC", "EKEDC", "PHED"] as const;

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
  {
    label: "Airtime",
    href: "/dashboard/bills?service=airtime",
    icon: "airtime",
  },
  { label: "Data", href: "/dashboard/bills?service=data", icon: "data" },
  { label: "Cable TV", href: "/dashboard/bills?service=cable", icon: "tv" },
  {
    label: "Betting",
    href: "/dashboard/bills?service=betting",
    icon: "betting",
  },
  {
    label: "Electricity",
    href: "/dashboard/bills?service=electricity",
    icon: "power",
  },
  { label: "Withdraw", href: "/dashboard/withdraw", icon: "withdraw" },
] as const;

export type AttendanceRecord = {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string;
  minutesWorked: number;
  earned: number;
  status: "credited";
};

export function formatHoursWorked(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${String(mins).padStart(2, "0")}m`;
}

export function formatAttendanceDay(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${isoDate}T12:00:00`));
}

export function formatAttendanceReceiptTitle(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${isoDate}T12:00:00`));
}

export const DEMO_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "1",
    date: "2026-06-08",
    clockIn: "9:00 AM",
    clockOut: "5:10 PM",
    minutesWorked: 8 * 60 + 10,
    earned: 8500,
    status: "credited",
  },
  {
    id: "2",
    date: "2026-06-05",
    clockIn: "9:00 AM",
    clockOut: "5:50 PM",
    minutesWorked: 8 * 60 + 20,
    earned: 8500,
    status: "credited",
  },
  {
    id: "3",
    date: "2026-06-04",
    clockIn: "9:00 AM",
    clockOut: "5:40 PM",
    minutesWorked: 8 * 60,
    earned: 8500,
    status: "credited",
  },
  {
    id: "4",
    date: "2026-06-03",
    clockIn: "8:55 AM",
    clockOut: "5:05 PM",
    minutesWorked: 8 * 60 + 10,
    earned: 8500,
    status: "credited",
  },
  {
    id: "5",
    date: "2026-06-02",
    clockIn: "9:10 AM",
    clockOut: "5:15 PM",
    minutesWorked: 8 * 60 + 5,
    earned: 8500,
    status: "credited",
  },
  {
    id: "6",
    date: "2026-06-01",
    clockIn: "9:00 AM",
    clockOut: "5:00 PM",
    minutesWorked: 8 * 60,
    earned: 8500,
    status: "credited",
  },
  {
    id: "7",
    date: "2026-05-29",
    clockIn: "8:50 AM",
    clockOut: "5:20 PM",
    minutesWorked: 8 * 60 + 30,
    earned: 8500,
    status: "credited",
  },
  {
    id: "8",
    date: "2026-05-28",
    clockIn: "9:02 AM",
    clockOut: "5:12 PM",
    minutesWorked: 8 * 60 + 10,
    earned: 8500,
    status: "credited",
  },
  {
    id: "9",
    date: "2026-05-27",
    clockIn: "9:00 AM",
    clockOut: "5:30 PM",
    minutesWorked: 8 * 60 + 30,
    earned: 8500,
    status: "credited",
  },
  {
    id: "10",
    date: "2026-05-26",
    clockIn: "8:45 AM",
    clockOut: "4:55 PM",
    minutesWorked: 8 * 60 + 10,
    earned: 8500,
    status: "credited",
  },
  {
    id: "11",
    date: "2026-05-25",
    clockIn: "9:05 AM",
    clockOut: "5:08 PM",
    minutesWorked: 8 * 60 + 3,
    earned: 8500,
    status: "credited",
  },
  {
    id: "12",
    date: "2026-05-22",
    clockIn: "9:00 AM",
    clockOut: "5:00 PM",
    minutesWorked: 8 * 60,
    earned: 8500,
    status: "credited",
  },
];

export type TransactionRecord = {
  id: string;
  title: string;
  receiptTitle: string;
  at: string;
  receiptAt: string;
  amount: number;
  fee: number;
  type: "debit" | "credit";
  status: "Success";
  reference: string;
};

export const DEMO_ACTIVITY: TransactionRecord[] = [
  {
    id: "1",
    title: "Airtime purchase",
    receiptTitle: "Airtime purchase",
    at: "Aug 16 at 4:17pm",
    receiptAt: "16 Aug 2026, 4:17 PM",
    amount: -2000,
    fee: 200,
    type: "debit",
    status: "Success",
    reference: "AT-44182901",
  },
  {
    id: "2",
    title: "Electricity — Ikeja Electric",
    receiptTitle: "Electricity payment",
    at: "Aug 16 at 4:17pm",
    receiptAt: "16 Aug 2026, 4:17 PM",
    amount: -2000,
    fee: 200,
    type: "debit",
    status: "Success",
    reference: "EL-22819304",
  },
  {
    id: "3",
    title: "Withdrawal — GTBank **** 4521",
    receiptTitle: "Withdrawal",
    at: "Aug 15 at 11:02am",
    receiptAt: "15 Aug 2026, 11:02 AM",
    amount: -2000,
    fee: 200,
    type: "debit",
    status: "Success",
    reference: "WD-11029384",
  },
  {
    id: "4",
    title: "Daily earnings",
    receiptTitle: "Daily earnings credit",
    at: "Aug 15 at 12:00am",
    receiptAt: "15 Aug 2026, 12:00 AM",
    amount: 8500,
    fee: 0,
    type: "credit",
    status: "Success",
    reference: "DE-99310221",
  },
  {
    id: "5",
    title: "Data purchase",
    receiptTitle: "Data purchase",
    at: "Aug 14 at 8:41pm",
    receiptAt: "14 Aug 2026, 8:41 PM",
    amount: -1000,
    fee: 200,
    type: "debit",
    status: "Success",
    reference: "DT-67291033",
  },
  {
    id: "6",
    title: "Cable TV — DSTV",
    receiptTitle: "Cable TV payment",
    at: "Aug 13 at 6:20pm",
    receiptAt: "13 Aug 2026, 6:20 PM",
    amount: -10500,
    fee: 200,
    type: "debit",
    status: "Success",
    reference: "TV-44820119",
  },
  {
    id: "7",
    title: "Betting — Bet9ja",
    receiptTitle: "Betting wallet top-up",
    at: "Aug 12 at 9:15pm",
    receiptAt: "12 Aug 2026, 9:15 PM",
    amount: -5000,
    fee: 200,
    type: "debit",
    status: "Success",
    reference: "BT-33910287",
  },
  {
    id: "8",
    title: "Daily earnings",
    receiptTitle: "Daily earnings credit",
    at: "Aug 12 at 12:00am",
    receiptAt: "12 Aug 2026, 12:00 AM",
    amount: 8500,
    fee: 0,
    type: "credit",
    status: "Success",
    reference: "DE-99310222",
  },
  {
    id: "9",
    title: "Airtime purchase",
    receiptTitle: "Airtime purchase",
    at: "Aug 11 at 2:04pm",
    receiptAt: "11 Aug 2026, 2:04 PM",
    amount: -500,
    fee: 200,
    type: "debit",
    status: "Success",
    reference: "AT-44182902",
  },
  {
    id: "10",
    title: "Withdrawal — GTBank **** 4521",
    receiptTitle: "Withdrawal",
    at: "Aug 10 at 10:30am",
    receiptAt: "10 Aug 2026, 10:30 AM",
    amount: -20000,
    fee: 200,
    type: "debit",
    status: "Success",
    reference: "WD-11029385",
  },
  {
    id: "11",
    title: "Daily earnings",
    receiptTitle: "Daily earnings credit",
    at: "Aug 10 at 12:00am",
    receiptAt: "10 Aug 2026, 12:00 AM",
    amount: 8500,
    fee: 0,
    type: "credit",
    status: "Success",
    reference: "DE-99310223",
  },
  {
    id: "12",
    title: "Electricity — AEDC",
    receiptTitle: "Electricity payment",
    at: "Aug 8 at 7:12pm",
    receiptAt: "8 Aug 2026, 7:12 PM",
    amount: -3500,
    fee: 200,
    type: "debit",
    status: "Success",
    reference: "EL-22819305",
  },
];

export const DEMO_NOTIFICATIONS = [
  {
    id: "n1",
    title: "Clock-in recorded",
    body: "You clocked in at 9:02 AM. Today's estimate is ₦85,000.",
    at: "Today, 9:02 AM",
    unread: true,
  },
  {
    id: "n2",
    title: "Withdrawal successful",
    body: "₦2,000 was sent to GTBank **** 4521.",
    at: "Yesterday, 11:02 AM",
    unread: true,
  },
  {
    id: "n3",
    title: "Airtime purchase",
    body: "Your ₦2,000 Airtel airtime purchase was successful.",
    at: "16 Aug, 4:17 PM",
    unread: true,
  },
] as const;
