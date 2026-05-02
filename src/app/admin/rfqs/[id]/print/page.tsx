import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import styles from "./print.module.css";
import PrintButton from "./PrintButton";
import PDFExportButton from "./PDFExportButton";

export default async function PrintRFQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [rfq, settings] = await Promise.all([
    prisma.rfqRequest.findUnique({ 
      where: { id },
      include: { items: true }
    }),
    prisma.settings.findFirst({ where: { id: 1 } })
  ]);

  if (!rfq) {
    notFound();
  }

  const shortId = rfq.id.split('-')[0].toUpperCase();
  const dateStr = new Date(rfq.createdAt).toLocaleDateString('tr-TR');
  const companyName = settings?.companyName || "Tuzla Supply";

  return (
    <div className={styles.printContainer}>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "2rem" }} className="no-print">
        <PrintButton />
        <PDFExportButton fileName={`teklif-${shortId}.pdf`} elementId="printable-quote" />
      </div>
      
      <div className={styles.document} id="printable-quote">
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            {companyName.split(' ')[0]} <span>{companyName.split(' ').slice(1).join(' ')}</span>
          </div>
          <div className={styles.docInfo}>
            <div className={styles.docTitle}>Teklif Formu (Proforma)</div>
            <div><strong>Tarih:</strong> {dateStr}</div>
            <div><strong>Ref No:</strong> TZS-{shortId}</div>
          </div>
        </header>

        {/* Client & Delivery Info */}
        <div className={styles.clientSection}>
          <div className={styles.clientBox}>
            <div className={styles.boxTitle}>Müşteri / Gemi Bilgileri</div>
            <div className={styles.clientDetails}>
              <strong>{rfq.companyName}</strong><br />
              Dikkatine: {rfq.contactName}<br />
              E-posta: {rfq.email}<br />
              {rfq.phone && `Tel: ${rfq.phone}`}
            </div>
          </div>
          
          <div className={styles.clientBox}>
            <div className={styles.boxTitle}>Teslimat Şartları</div>
            <div className={styles.clientDetails}>
              <strong>Teslimat Yeri:</strong><br />
              {rfq.deliveryPoint}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className={styles.itemsSection}>
          <div className={styles.boxTitle}>Talep Edilen Malzemeler</div>
          <table className={styles.itemsTable}>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>No</th>
                <th style={{ width: "65%" }}>Malzeme Tanımı</th>
                <th style={{ width: "15%" }}>Miktar</th>
                <th style={{ width: "15%" }}>Birim Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {rfq.items && rfq.items.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{item.name}</td>
                  <td style={{ textAlign: "center" }}>{item.quantity} {item.unit}</td>
                  <td style={{ textAlign: "right" }}>-</td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} className={styles.detailsCell} style={{ padding: "1.5rem" }}>
                  <div style={{ marginBottom: "0.5rem" }}><strong>Ek Detaylar / Teknik Notlar:</strong></div>
                  <div style={{ whiteSpace: "pre-wrap", color: "#475569" }}>{rfq.details}</div>
                  
                  {settings?.bankDetails && (
                    <div style={{ marginTop: "2rem", borderTop: "1px dashed #E2E8F0", paddingTop: "1rem" }}>
                      <strong>Banka Bilgileri:</strong><br />
                      <div style={{ fontSize: "0.85rem", color: "#64748B" }}>{settings.bankDetails}</div>
                    </div>
                  )}
                </td>
              </tr>
              {/* Total Row */}
              <tr>
                <td colSpan={3} style={{ textAlign: "right", fontWeight: "700", padding: "1rem" }}>ARA TOPLAM:</td>
                <td style={{ textAlign: "right", padding: "1rem" }}>-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer / Signature */}
        <footer className={styles.footer} style={{ marginTop: "4rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center", width: "200px" }}>
              <div style={{ marginBottom: "3rem", fontSize: "0.9rem" }}>Müşteri Onayı</div>
              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "0.5rem" }}>İmza / Kaşe</div>
            </div>
            <div style={{ textAlign: "center", width: "200px" }}>
              <div style={{ marginBottom: "3rem", fontSize: "0.9rem" }}>Tuzla Supply Onayı</div>
              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "0.5rem" }}>Kaşe</div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem", fontSize: "0.8rem", color: "#94A3B8" }}>
            Bu belge sistem tarafından otomatik oluşturulmuştur.
          </div>
        </footer>
      </div>
    </div>
  );
}
