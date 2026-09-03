export default function AttendanceHistoryPage() {
  return (
    <section className="rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(16,70,64,0.06)]">
      <h1 className="text-xl font-semibold text-[#1B1B1B]">
        Attendance History
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your clock-in and clock-out records will appear here. This view is
        simulated until the API is connected.
      </p>
    </section>
  );
}
