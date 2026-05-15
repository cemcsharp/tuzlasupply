import { getDashboardStats } from "../actions/analytics";
import DashboardCharts from "./DashboardCharts";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const data = await getDashboardStats();

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700", color: "var(--color-primary)" }}>Yönetim Paneli (Analytics)</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
          Sistemdeki genel durum, talep yoğunluğu ve operasyonel veriler.
        </p>
      </div>

      <DashboardCharts data={data} />
    </div>
  );
}
