import styles from "../admin.module.css";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function RFQsPage() {
  // Veritabanından verileri çek
  const rfqs = await prisma.rfqRequest.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const getBadgeStyle = (status: string) => {
    switch(status) {
      case "pending": return `${styles.badge} ${styles.badgePending}`;
      case "priced": return `${styles.badge} ${styles.badgePriced}`;
      case "approved": return `${styles.badge} ${styles.badgeApproved}`;
      case "rejected": return `${styles.badge} ${styles.badgeRejected}`;
      default: return styles.badge;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "pending": return "Bekliyor";
      case "priced": return "Fiyat Verildi";
      case "approved": return "Onaylandı";
      case "rejected": return "Reddedildi";
      default: return "Bilinmiyor";
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Gelen Talepler (RFQs)</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
          Müşterilerden gelen tüm teklif taleplerini buradan yönetebilirsiniz.
        </p>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>Tüm Talepler Listesi ({rfqs.length})</div>
          <div style={{ display: "flex", gap: "1rem" }}>
             <input type="text" placeholder="Firma veya RFQ Ara..." className="btn-secondary" style={{ padding: "0.5rem", borderRadius: "0.25rem", fontSize: "0.85rem", width: "200px" }} />
             <button className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>Yeni RFQ Ekle (Manuel)</button>
          </div>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>RFQ ID</th>
                <th>Firma / Gemi Adı</th>
                <th>Tarih</th>
                <th>Teslimat Noktası</th>
                <th>Durum</th>
                <th>Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {rfqs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-muted)" }}>
                    Henüz gelen bir talep bulunmuyor.
                  </td>
                </tr>
              ) : (
                rfqs.map((rfq) => (
                  <tr key={rfq.id}>
                    <td style={{ fontWeight: "600" }}>#{rfq.id.split('-')[0].toUpperCase()}</td>
                    <td>{rfq.companyName}</td>
                    <td>{new Date(rfq.createdAt).toLocaleString('tr-TR')}</td>
                    <td>{rfq.deliveryPoint}</td>
                    <td><span className={getBadgeStyle(rfq.status)}>{getStatusText(rfq.status)}</span></td>
                    <td>
                      <Link href={`/admin/rfqs/${rfq.id}`} style={{ color: "var(--color-accent)", fontWeight: "600", marginRight: "1rem" }}>
                        Detay
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
