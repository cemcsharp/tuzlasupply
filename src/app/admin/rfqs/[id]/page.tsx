import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import styles from "../../admin.module.css";
import Link from "next/link";
import StatusButtons from "./StatusButtons";
import QuotePanel from "./QuotePanel";

export default async function RFQDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rfq = await prisma.rfqRequest.findUnique({
    where: { id },
    include: { 
      items: true,
      auditLogs: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!rfq) {
    notFound();
  }

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
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/admin/rfqs" style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
          ← Tüm Taleplere Dön
        </Link>
      </div>

      <div className={styles.pageHeader} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className={styles.pageTitle}>Talep Detayı #{rfq.id.split('-')[0].toUpperCase()}</h1>
          <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className={getBadgeStyle(rfq.status)} style={{ fontSize: "0.85rem", padding: "0.35rem 1rem" }}>
              {getStatusText(rfq.status)}
            </span>
            <span style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
              Tarih: {new Date(rfq.createdAt).toLocaleString('tr-TR')}
            </span>
          </div>
        </div>
        
        <StatusButtons id={rfq.id} currentStatus={rfq.status} />
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        <div className={styles.statCard} style={{ padding: "1.25rem", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#94A3B8", textTransform: "uppercase" }}>Talep Yaşı</span>
          <div style={{ fontSize: "1.25rem", fontWeight: "800", marginTop: "0.25rem" }}>
            {Math.floor((new Date().getTime() - new Date(rfq.createdAt).getTime()) / (1000 * 60 * 60 * 24))} Gün
          </div>
        </div>
        <div className={styles.statCard} style={{ padding: "1.25rem", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#94A3B8", textTransform: "uppercase" }}>Toplam Kalem</span>
          <div style={{ fontSize: "1.25rem", fontWeight: "800", marginTop: "0.25rem" }}>
            {rfq.items.length} Ürün
          </div>
        </div>
        <div className={styles.statCard} style={{ padding: "1.25rem", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#94A3B8", textTransform: "uppercase" }}>Dosya Sayısı</span>
          <div style={{ fontSize: "1.25rem", fontWeight: "800", marginTop: "0.25rem" }}>
            {rfq.attachmentUrls.length} Ek
          </div>
        </div>
        <div className={styles.statCard} style={{ padding: "1.25rem", border: "none", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "#94A3B8", textTransform: "uppercase" }}>Son Güncelleme</span>
          <div style={{ fontSize: "1rem", fontWeight: "700", marginTop: "0.25rem" }}>
            {new Date(rfq.updatedAt).toLocaleDateString('tr-TR')}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
        {/* Sol Kolon: Firma ve İletişim Bilgileri */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className={styles.tableCard} style={{ padding: "1.5rem" }}>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "1rem", fontSize: "1.1rem" }}>Firma Bilgileri</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.95rem" }}>
              <div>
                <strong style={{ color: "var(--color-text-muted)" }}>Firma / Gemi Adı:</strong>
                <div style={{ fontWeight: "600", marginTop: "0.25rem" }}>{rfq.companyName}</div>
              </div>
              <div>
                <strong style={{ color: "var(--color-text-muted)" }}>Yetkili Kişi:</strong>
                <div style={{ marginTop: "0.25rem" }}>{rfq.contactName}</div>
              </div>
              <div>
                <strong style={{ color: "var(--color-text-muted)" }}>E-posta:</strong>
                <div style={{ marginTop: "0.25rem" }}>
                  <a href={`mailto:${rfq.email}`} style={{ color: "var(--color-accent)" }}>{rfq.email}</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.tableCard} style={{ padding: "1.5rem" }}>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "1rem", fontSize: "1.1rem" }}>Teslimat Bilgisi</h3>
            <div style={{ padding: "1rem", backgroundColor: "var(--color-surface-hover)", borderRadius: "0.5rem", border: "1px solid var(--color-border)" }}>
              {rfq.deliveryPoint}
            </div>
          </div>

          {rfq.attachmentUrls && rfq.attachmentUrls.length > 0 && (
            <div className={styles.tableCard} style={{ padding: "1.5rem", border: "1px solid var(--color-accent)", backgroundColor: "rgba(0, 163, 255, 0.02)" }}>
              <h3 style={{ color: "var(--color-accent)", marginBottom: "1rem", fontSize: "1.1rem" }}>Dosya Ekleri ({rfq.attachmentUrls.length})</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {rfq.attachmentUrls.map((url: string, index: number) => (
                  <a 
                    key={index}
                    href={url} 
                    target="_blank" 
                    className="btn-secondary" 
                    style={{ width: "100%", display: "inline-block", textAlign: "left", textDecoration: "none", fontSize: "0.85rem", padding: "0.75rem" }}
                  >
                    📁 Dosya {index + 1}: {url.split('/').pop()}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sağ Kolon: Malzeme Listesi */}
        <div className={styles.tableCard} style={{ padding: "1.5rem", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "var(--color-primary)", fontSize: "1.25rem" }}>Malzeme Listesi</h3>
            <Link href={`/admin/rfqs/${rfq.id}/print`} target="_blank" className="btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
              Yazdır / PDF
            </Link>
          </div>
          
          {rfq.items && rfq.items.length > 0 && (
            <div style={{ marginBottom: "1.5rem", border: "1px solid var(--color-border)", borderRadius: "8px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead style={{ backgroundColor: "var(--color-surface-hover)" }}>
                  <tr>
                    <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Katalog Ürünü</th>
                    <th style={{ textAlign: "center", padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Miktar</th>
                    <th style={{ textAlign: "right", padding: "0.75rem", borderBottom: "1px solid var(--color-border)" }}>Birim</th>
                  </tr>
                </thead>
                <tbody>
                  {rfq.items.map((item: any) => (
                    <tr key={item.id}>
                      <td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)", fontWeight: "600" }}>{item.name}</td>
                      <td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)", textAlign: "center" }}>{item.quantity}</td>
                      <td style={{ padding: "0.75rem", borderBottom: "1px solid var(--color-border)", textAlign: "right" }}>{item.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ 
            flex: 1, 
            backgroundColor: "var(--color-background)", 
            padding: "1.5rem", 
            borderRadius: "0.5rem", 
            border: "1px solid var(--color-border)",
            whiteSpace: "pre-wrap",
            lineHeight: "1.8",
            color: "var(--color-text-main)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.95rem"
          }}>
            {rfq.details}
          </div>
        </div>

        <div style={{ gridColumn: "1 / -1", marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* Internal Notes */}
          <div className={styles.tableCard} style={{ padding: "1.5rem" }}>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "1.5rem", fontSize: "1.1rem" }}>İç Notlar (Admin Sadece)</h3>
            <form action={async (formData) => {
              "use server";
              const { updateInternalNotes } = await import("@/app/actions/rfq-admin");
              await updateInternalNotes(rfq.id, formData.get("notes") as string);
            }}>
              <textarea 
                name="notes"
                defaultValue={rfq.internalNotes || ""}
                placeholder="Bu talep hakkında ekip arkadaşlarınız için not bırakın..."
                style={{ 
                  width: "100%", height: "150px", padding: "1rem", borderRadius: "12px",
                  border: "1.5px solid #E2E8F0", backgroundColor: "#F8FAFC",
                  resize: "none", marginBottom: "1rem", fontSize: "0.95rem"
                }}
              />
              <button type="submit" className="btn-primary" style={{ width: "100%" }}>Notu Kaydet</button>
            </form>
          </div>

          {/* Audit Log / History */}
          <div className={styles.tableCard} style={{ padding: "1.5rem" }}>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "1.5rem", fontSize: "1.1rem" }}>İşlem Geçmişi</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "250px", overflowY: "auto", paddingRight: "0.5rem" }}>
              {rfq.auditLogs.length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "2rem" }}>Kayıt bulunmuyor.</div>
              ) : (
                rfq.auditLogs.map((log: any) => (
                  <div key={log.id} style={{ display: "flex", gap: "1rem", borderLeft: "2px solid #E2E8F0", paddingLeft: "1rem", position: "relative" }}>
                    <div style={{ 
                      position: "absolute", left: "-6px", top: "0", width: "10px", height: "10px", 
                      borderRadius: "50%", backgroundColor: "#CBD5E1" 
                    }} />
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: "700" }}>
                        {new Date(log.createdAt).toLocaleString('tr-TR')}
                      </div>
                      <div style={{ fontSize: "0.85rem", fontWeight: "800", color: "var(--color-primary)", marginTop: "0.1rem" }}>
                        {log.action}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "var(--color-text-main)", marginTop: "0.1rem" }}>
                        {log.details}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Fiyat Teklifi Paneli */}
        <div style={{ gridColumn: "1 / -1", marginTop: "2rem" }}>
          <QuotePanel rfqId={rfq.id} items={rfq.items} customerEmail={rfq.email} />
        </div>
      </div>
    </div>
  );
}
