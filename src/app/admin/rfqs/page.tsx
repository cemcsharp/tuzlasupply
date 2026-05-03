import styles from "../admin.module.css";
import { prisma } from "@/lib/prisma";
import RFQListClient from "./RFQListClient";

export const dynamic = "force-dynamic";

export default async function RFQsPage() {
  const rfqs = await prisma.rfqRequest.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Teklif Talepleri (RFQs)</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
          Müşterilerden gelen tüm teknik ve ticari talepleri bu panelden yönetin.
        </p>
      </div>

      <RFQListClient initialRfqs={rfqs} />
    </div>
  );
}
