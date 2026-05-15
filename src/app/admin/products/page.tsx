import { prisma } from "@/lib/prisma";
import styles from "../admin.module.css";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { category: "asc" }
  });

  return (
    <div>
      <div className={styles.pageHeader} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 className={styles.pageTitle}>Ürün Kataloğu & Envanter</h1>
          <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem" }}>
            Tüm tedarik portföyünüzü buradan yönetebilir, fiyat güncelleyebilir ve yeni malzemeler ekleyebilirsiniz.
          </p>
        </div>
        <ProductForm />
      </div>

      <ProductList initialProducts={products} />
    </div>
  );
}
