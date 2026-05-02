import styles from "./rfq.module.css";
import Link from "next/link";
import RFQForm from "./RFQForm";
import HomeNavbar from "@/components/HomeNavbar";
import { ArrowLeft } from "lucide-react";

export default function RFQPage() {
  return (
    <main className={styles.rfqContainer}>
      <HomeNavbar />
      <div className="container">
        
        <Link href="/" style={{ color: "var(--color-accent)", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", fontWeight: "600" }}>
          <ArrowLeft size={18} /> Ana Sayfaya Dön
        </Link>

        <div className={styles.rfqHeader}>
          <h1 className="title-section">Hızlı Teklif Talebi (RFQ)</h1>
          <p>
            İhtiyaç listenizi dosya olarak yükleyin veya aşağıdaki alana yazın. 
            Uzman ekibimiz talebinizi inceleyerek en kısa sürede fiyatlandırma ile size dönüş yapacaktır.
          </p>
        </div>

        <RFQForm />
      </div>
    </main>
  );
}
