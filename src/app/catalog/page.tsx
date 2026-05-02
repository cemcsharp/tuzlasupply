import { prisma } from "@/lib/prisma";
import styles from "./catalog.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Package } from "lucide-react";
import CatalogClient from "./CatalogClient";

export default async function CatalogPage() {
  const products = await prisma.product.findMany({
    orderBy: { category: "asc" }
  });

  return (
    <main className={styles.catalogContainer}>
      <HomeNavbar />
      
      <div className="container">
        <header className={styles.header}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-accent)", fontWeight: "700", marginBottom: "1rem" }}>
            <Package size={20} /> ÜRÜN KATALOĞU
          </div>
          <h1>Denizcilik & Endüstriyel Çözümler</h1>
          <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
            İhtiyacınız olan tüm teknik malzemeleri "Ürün Ağacı" üzerinden kolayca bulun.
          </p>
        </header>

        <CatalogClient initialProducts={products} />
      </div>

      <footer style={{ marginTop: "5rem", padding: "3rem 0", borderTop: "1px solid #E2E8F0", textAlign: "center", color: "#94A3B8" }}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Tuzla Supply. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </main>
  );
}
