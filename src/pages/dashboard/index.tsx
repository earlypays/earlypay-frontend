import { Banknote, Users, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KPIS = [
  {
    title: "Active employees",
    value: "—",
    icon: Users,
  },
  {
    title: "Wage access this month",
    value: "—",
    icon: Wallet,
  },
  {
    title: "Payroll synced",
    value: "—",
    icon: Banknote,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-heading">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Employer overview will appear here once the API is connected.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {KPIS.map((kpi) => (
          <Card key={kpi.title} className="border border-border py-5">
            <CardHeader className="flex flex-row items-center justify-between px-5">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="size-4 text-primary" />
            </CardHeader>
            <CardContent className="px-5">
              <p className="text-2xl font-semibold text-heading">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
