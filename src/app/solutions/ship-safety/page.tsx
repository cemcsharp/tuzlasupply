import styles from "@/app/page.module.css";
import HomeNavbar from "@/components/HomeNavbar";
import { ShieldAlert, ShieldCheck, Clock, LifeBuoy, Flame } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default function ShipSafetyPage() {
  return (
    <main className={styles.main}>
      <Suspense fallback={null}>
        <HomeNavbar />
      </Suspense>
      
      <div className={styles.serviceDetailHero} style={{ background: "linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%)" }}>
        <div className="container">
          <span style={{ color: "#f87171", fontWeight: 700, letterSpacing: "2px" }}>TUZLA MARINE SAFETY</span>
          <h1 style={{ color: "white", fontSize: "3.5rem", marginTop: "1rem" }}>Gemi Güvenlik Ekipmanları & FFA/LSA Tuzla</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", maxWidth: "800px", marginTop: "1.5rem" }}>
            Tuzla Tersaneler Bölgesi'nde SOLAS standartlarına uygun can kurtarma araçları, yangın söndürme sistemleri ve ISG ekipmanları tedariği.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "6rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem" }}>
          <div>
            <h2 style={{ color: "#0f172a", fontSize: "2rem", marginBottom: "1.5rem" }}>Denizde Güvenlik: Sertifikalı ve Güvenilir Çözümler</h2>
            <p style={{ color: "#475569", lineHeight: "1.8", marginBottom: "2.5rem" }}>
              Tuzla'daki operasyonlarınızda gemi güvenliğini en üst seviyede tutuyoruz. 
              <strong> Life-Saving Appliances (LSA) ve Fire Fighting Appliances (FFA) </strong> ekipmanlarında, uluslararası sertifikasyonlara (MED, SOLAS) uygun ürünlerle hizmet veriyoruz.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ padding: "2rem", border: "1px solid #fee2e2", borderRadius: "1.5rem", background: "#fffaf0" }}>
                <LifeBuoy color="#ef4444" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>Can Kurtarma (LSA)</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Can yelekleri, filika ekipmanları, işaret fişekleri ve can salları.</p>
              </div>
              <div style={{ padding: "2rem", border: "1px solid #fee2e2", borderRadius: "1.5rem", background: "#fffaf0" }}>
                <Flame color="#ef4444" style={{ marginBottom: "1rem" }} />
                <h4 style={{ color: "#0f172a" }}>Yangınla Mücadele (FFA)</h4>
                <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Yangın söndürücüler, hortumlar, nozzle sistemleri ve SCBA setleri.</p>
              </div>
            </div>

            <div style={{ marginTop: "4rem", background: "#fef2f2", padding: "3rem", borderRadius: "2rem", borderLeft: "4px solid #ef4444" }}>
              <h3 style={{ color: "#7f1d1d", marginBottom: "1.5rem" }}>Güvenlik & ISG Envanterimiz</h3>
              <ul style={{ color: "#7f1d1d", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <li>✓ Can Yeleği & Can Simidi İkmali</li>
                <li>✓ Yangın Söndürme Tüpü Dolum/Tedarik</li>
                <li>✓ Tuzla Gemi ISG Malzemeleri</li>
                <li>✓ EEBD ve Gaz Ölçüm Cihazları</li>
                <li>✓ Pilot ve Borda Merdivenleri</li>
                <li>✓ İmo Sembolleri ve Levhalar</li>
              </ul>
            </div>
          </div>

          <div className={styles.serviceSidebar}>
            <div className={styles.sidebarWidget} style={{ background: "#450a0a" }}>
              <h4>Sertifikalı Güvenlik Desteği</h4>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>Denetimler (Vetting) öncesi eksik güvenlik ekipmanlarınızın hızlı ikmali.</p>
              <Link href="/rfq" className="btn-primary" style={{ width: "100%", display: "block", textAlign: "center", marginTop: "1.5rem", background: "#ef4444" }}>
                Teklif İsteyin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
