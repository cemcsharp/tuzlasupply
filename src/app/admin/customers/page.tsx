import styles from "../admin.module.css";
import { prisma } from "@/lib/prisma";

export default async function CustomersPage() {
  // Veritabanından benzersiz firmaları ve onların toplam talep sayılarını çekiyoruz
  const customers = await prisma.rfqRequest.groupBy({
    by: ['companyName'],
    _count: {
      id: true
    },
    _max: {
      createdAt: true
    }
  });

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Müşteri Rehberi</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
          Sistemde kayıtlı olan tüm firmalar ve etkileşim özetleri.
        </p>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Firma / Gemi Adı</th>
                <th>Toplam Talep Sayısı</th>
                <th>Son Etkileşim</th>
                <th>Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "3rem", color: "var(--color-text-muted)" }}>
                    Henüz kayıtlı müşteri bulunmuyor.
                  </td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: "600" }}>{customer.companyName}</td>
                    <td>{customer._count.id} Adet Talep</td>
                    <td>{customer._max.createdAt ? new Date(customer._max.createdAt).toLocaleDateString('tr-TR') : "-"}</td>
                    <td>
                      <button style={{ color: "var(--color-accent)", fontWeight: "600" }}>Geçmişi Gör</button>
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
