import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Truck, Warehouse, Clock, Globe, PackageCheck } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default function ShipyardLogisticsPage() {
  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)" }}>
        <div className="container">
          <span style={{ color: "#34d399", fontWeight: 700, letterSpacing: "2px" }}>TUZLA SHIPYARD LOGISTICS</span>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginTop: "1rem" }}>Tersane Lojistiği & Gemi Parçası Depolama Tuzla</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            Tuzla ve Yalova tersaneler bölgesinde gümrüklü parça transferi, depolama çözümleri ve son mil liman teslimatı.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div>
            <h2 style={{ color: "#0f172a", fontSize: "2rem", marginBottom: "1.5rem" }}>Kusursuz Lojistik: Gümrükten Gemiye Güvenli Transfer</h2>
            <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "2.5rem" }}>
              Yurt dışından gelen kritik yedek parçalarınızın gümrükleme sonrası tersanedeki geminize ulaşma sürecini yönetiyoruz. 
              <strong> Tuzla ve Gebze </strong> antrepolarına yakınlığımız sayesinde parçalarınızı güvenle depoluyor ve tam zamanında gemiye teslim ediyoruz.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ padding: "2rem", border: "1px solid #d1fae5", borderRadius: "1.5rem", background: "#f0fdf4" }}>
                <Warehouse color="#10b981" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>Depolama Çözümleri</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Gemi yedek parçaları için güvenli, organize ve takip edilebilir depo alanı.</p>
              </div>
              <div style={{ padding: "2rem", border: "1px solid #d1fae5", borderRadius: "1.5rem", background: "#f0fdf4" }}>
                <Truck color="#10b981" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>Ekspres Teslimat</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Tersane sahasına ve demirdeki gemilere hızlı ve sorunsuz nakliye.</p>
              </div>
            </div>

            <div style={{ marginTop: "4rem", background: "#ecfdf5", padding: "3rem", borderRadius: "2rem", borderLeft: "4px solid #10b981" }}>
              <h3 style={{ color: "#065f46", marginBottom: "1.5rem" }}>Lojistik Hizmet Portföyümüz</h3>
              <ul style={{ color: "#065f46", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <li>✓ Gümrüklü Parça Transferi (Transit)</li>
                <li>✓ Tuzla Tersane İçi Lojistik Destek</li>
                <li>✓ Ağır Yük ve Vinç Organizasyonu</li>
                <li>✓ Uzun Süreli Parça Depolama</li>
                <li>✓ Liman ve Demir Bölgesi Teslimatı</li>
                <li>✓ Envanter Yönetimi ve Raporlama</li>
              </ul>
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#064e3b" }}>
              <h4>Lojistik Çözüm Ortağı</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Parçalarınızın gümrükten gemiye olan yolculuğunu profesyonelce planlayalım.</p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem", background: "#10b981" }}>
                Lojistik Teklifi Alın
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
