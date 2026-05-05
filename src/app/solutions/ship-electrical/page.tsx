import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { Zap, ShieldCheck, Clock, Settings, Cpu } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default function ShipElectricalPage() {
  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)" }}>
        <div className="container">
          <span style={{ color: "#38bdf8", fontWeight: 700, letterSpacing: "2px" }}>TUZLA MARİNE ELECTRICAL</span>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginTop: "1rem" }}>Tuzla Gemi Elektriği & Otomasyon Çözümleri</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            Tuzla tersaneler bölgesinde gemi elektrik sistemleri, otomasyon arızaları ve yedek parça tedariğinde 7/24 profesyonel destek.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div>
            <h2 style={{ color: "#0f172a", fontSize: "2rem", marginBottom: "1.5rem" }}>Tuzla'da Gemi Elektriği Bizim İşimiz</h2>
            <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "2.5rem" }}>
              Denizcilik sektörünün kalbi Tuzla'da, gemilerinizin elektrik ve otomasyon ihtiyaçlarına anında yanıt veriyoruz. 
              <strong> Sedef Tersanesi, TK Tuzla, Gemak ve Desan </strong> gibi bölgedeki tüm ana tersanelerde aktif hizmet sunmaktayız.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Cpu color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>Otomasyon Sistemleri</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Alarm izleme, kontrol sistemleri ve sensor değişimi.</p>
              </div>
              <div style={{ padding: "2rem", border: "1px solid #e2e8f0", borderRadius: "1.5rem" }}>
                <Zap color="#38bdf8" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>Pano & Kablaj</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Güç panoları, aydınlatma ve kablo yenileme hizmetleri.</p>
              </div>
            </div>

            <div style={{ marginTop: "4rem", background: "#f0f9ff", padding: "3rem", borderRadius: "2rem" }}>
              <h3 style={{ color: "#0c4a6e", marginBottom: "1.5rem" }}>Hedeflediğimiz Çözümler</h3>
              <ul style={{ color: "#0c4a6e", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <li>✓ Jeneratör Kontrol Sistemleri</li>
                <li>✓ Navigasyon Ekipmanları Elektriği</li>
                <li>✓ Motor Kontrol Üniteleri (ECU)</li>
                <li>✓ Tuzla Acil Elektrik Arıza Servisi</li>
                <li>✓ Gemi Elektrik Yedek Parça İkmal</li>
                <li>✓ UPS ve Batarya Sistemleri</li>
              </ul>
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#0f172a" }}>
              <h4>Acil Elektrik Destek</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Tuzla bölgesindeki geminiz için acil elektrik ve otomasyon desteği.</p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem" }}>
                Hemen Ulaşın
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
