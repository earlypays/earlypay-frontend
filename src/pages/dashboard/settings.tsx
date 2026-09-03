import { DEMO_EMPLOYEE } from "@/lib/dashboard-demo";

export default function SettingsPage() {
  return (
    <section className="rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(16,70,64,0.06)]">
      <h1 className="text-xl font-semibold text-[#1B1B1B]">Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Profile and notification preferences will live here. For now this is a
        simulated employee account.
      </p>
      <dl className="mt-6 space-y-3 text-sm">
        <div>
          <dt className="text-muted-foreground">Name</dt>
          <dd className="font-medium text-[#1B1B1B]">
            {DEMO_EMPLOYEE.fullName}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Employee ID</dt>
          <dd className="font-medium text-[#1B1B1B]">
            {DEMO_EMPLOYEE.employeeId}
          </dd>
        </div>
      </dl>
    </section>
  );
}
